import type { PaginateFunction } from 'astro';
import { getCollection, render } from 'astro:content';
import type { CollectionEntry } from 'astro:content';
import type { Post } from '~/types';
import { APP_BLOG } from 'astrowind:config';
import { defaultLang, type Lang } from '~/i18n/ui';
import { cleanSlug, trimSlash, BLOG_BASE, POST_PERMALINK_PATTERN, CATEGORY_BASE, TAG_BASE } from './permalinks';

const generatePermalink = async ({
  id,
  slug,
  publishDate,
  category,
}: {
  id: string;
  slug: string;
  publishDate: Date;
  category: string | undefined;
}) => {
  const year = String(publishDate.getFullYear()).padStart(4, '0');
  const month = String(publishDate.getMonth() + 1).padStart(2, '0');
  const day = String(publishDate.getDate()).padStart(2, '0');
  const hour = String(publishDate.getHours()).padStart(2, '0');
  const minute = String(publishDate.getMinutes()).padStart(2, '0');
  const second = String(publishDate.getSeconds()).padStart(2, '0');

  const permalink = POST_PERMALINK_PATTERN.replace('%slug%', slug)
    .replace('%id%', id)
    .replace('%category%', category || '')
    .replace('%year%', year)
    .replace('%month%', month)
    .replace('%day%', day)
    .replace('%hour%', hour)
    .replace('%minute%', minute)
    .replace('%second%', second);

  return permalink
    .split('/')
    .map((el) => trimSlash(el))
    .filter((el) => !!el)
    .join('/');
};

const getNormalizedPost = async (post: CollectionEntry<'post'>): Promise<Post> => {
  const { id, data } = post;
  const { Content, remarkPluginFrontmatter } = await render(post);

  const {
    publishDate: rawPublishDate = new Date(),
    updateDate: rawUpdateDate,
    title,
    excerpt,
    image,
    tags: rawTags = [],
    category: rawCategory,
    author,
    draft = false,
    metadata = {},
    slug: frontmatterSlug,
    lang: rawLang = defaultLang,
  } = data;

  const lang = rawLang as Lang;
  const slugSource = frontmatterSlug ?? id;
  const slug = cleanSlug(slugSource);
  const publishDate = new Date(rawPublishDate);
  const updateDate = rawUpdateDate ? new Date(rawUpdateDate) : undefined;

  const category = rawCategory
    ? {
        slug: cleanSlug(rawCategory),
        title: rawCategory,
      }
    : undefined;

  const tags = rawTags.map((tag: string) => ({
    slug: cleanSlug(tag),
    title: tag,
  }));

  return {
    id: id,
    slug: slug,
    permalink: await generatePermalink({ id, slug, publishDate, category: category?.slug }),

    publishDate: publishDate,
    updateDate: updateDate,

    title: title,
    excerpt: excerpt,
    image: image,

    category: category,
    tags: tags,
    author: author,

    draft: draft,

    metadata,

    lang,

    Content: Content,
    // or 'content' in case you consume from API

    readingTime: remarkPluginFrontmatter?.readingTime,
  };
};

const load = async function (): Promise<Array<Post>> {
  const posts = await getCollection('post');
  const normalizedPosts = posts.map(async (post) => await getNormalizedPost(post));

  const results = (await Promise.all(normalizedPosts))
    .sort((a, b) => b.publishDate.valueOf() - a.publishDate.valueOf())
    .filter((post) => !post.draft);

  return results;
};

let _posts: Array<Post>;

/** */
export const isBlogEnabled = APP_BLOG.isEnabled;
export const isRelatedPostsEnabled = APP_BLOG.isRelatedPostsEnabled;
export const isBlogListRouteEnabled = APP_BLOG.list.isEnabled;
export const isBlogPostRouteEnabled = APP_BLOG.post.isEnabled;
export const isBlogCategoryRouteEnabled = APP_BLOG.category.isEnabled;
export const isBlogTagRouteEnabled = APP_BLOG.tag.isEnabled;

export const blogListRobots = APP_BLOG.list.robots;
export const blogPostRobots = APP_BLOG.post.robots;
export const blogCategoryRobots = APP_BLOG.category.robots;
export const blogTagRobots = {
  index: true, // Allow indexing for tag pages
  follow: true,
};

export const blogPostsPerPage = APP_BLOG?.postsPerPage;

/** */
export const fetchPosts = async (): Promise<Array<Post>> => {
  if (!_posts) {
    _posts = await load();
  }

  return _posts;
};

const resolveLang = (lang?: Lang) => (lang ?? defaultLang) as Lang;
const filterPostsByLang = (posts: Array<Post>, lang: Lang) => posts.filter((post) => resolveLang(post.lang) === lang);
const collectLanguages = (posts: Array<Post>): Array<Lang> =>
  Array.from(new Set(posts.map((post) => resolveLang(post.lang)))) as Array<Lang>;

/** */
export const findPostsBySlugs = async (slugs: Array<string>, lang?: Lang): Promise<Array<Post>> => {
  if (!Array.isArray(slugs)) return [];

  const posts = await fetchPosts();
  const source = lang ? filterPostsByLang(posts, resolveLang(lang)) : posts;

  return slugs.reduce(function (r: Array<Post>, slug: string) {
    source.some(function (post: Post) {
      return slug === post.slug && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findPostsByIds = async (ids: Array<string>, lang?: Lang): Promise<Array<Post>> => {
  if (!Array.isArray(ids)) return [];

  const posts = await fetchPosts();
  const source = lang ? filterPostsByLang(posts, resolveLang(lang)) : posts;

  return ids.reduce(function (r: Array<Post>, id: string) {
    source.some(function (post: Post) {
      return id === post.id && r.push(post);
    });
    return r;
  }, []);
};

/** */
export const findLatestPosts = async ({ count, lang }: { count?: number; lang?: Lang }): Promise<Array<Post>> => {
  const _count = count || 4;
  const posts = await fetchPosts();
  const targetLang = resolveLang(lang);
  const filtered = filterPostsByLang(posts, targetLang);

  return filtered ? filtered.slice(0, _count) : [];
};

/** */
export const getStaticPathsBlogList = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogListRouteEnabled) return [];
  const posts = await fetchPosts();
  const languages = collectLanguages(posts);

  return languages.flatMap((lang) => {
    const localizedPosts = filterPostsByLang(posts, lang);
    if (!localizedPosts.length) return [];

    const segments = [] as Array<string>;
    if (lang !== defaultLang) {
      segments.push(lang);
    }
    if (BLOG_BASE) {
      segments.push(BLOG_BASE);
    }

    const blogParam = segments.length ? segments.join('/') : undefined;

    return paginate(localizedPosts, {
      params: { blog: blogParam },
      pageSize: blogPostsPerPage,
      props: { lang },
    });
  });
};

/** */
export const getStaticPathsBlogPost = async () => {
  if (!isBlogEnabled || !isBlogPostRouteEnabled) return [];
  return (await fetchPosts()).flatMap((post) => ({
    params: {
      blog: post.permalink,
    },
    props: { post },
  }));
};

/** */
export const getStaticPathsBlogCategory = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogCategoryRouteEnabled) return [];

  const posts = await fetchPosts();
  const languages = collectLanguages(posts);

  return languages.flatMap((lang) => {
    const localizedPosts = filterPostsByLang(posts, lang);
    if (!localizedPosts.length) return [];

    const categories = new Map<string, NonNullable<Post['category']>>();
    localizedPosts.forEach((post) => {
      if (post.category?.slug) {
        categories.set(post.category.slug, post.category);
      }
    });

    const segments = [] as Array<string>;
    if (lang !== defaultLang) {
      segments.push(lang);
    }
    if (CATEGORY_BASE) {
      segments.push(CATEGORY_BASE);
    }

    const blogParam = segments.length ? segments.join('/') : undefined;

    return Array.from(categories.entries()).flatMap(([categorySlug, category]) =>
      paginate(
        localizedPosts.filter((post) => post.category?.slug === categorySlug),
        {
          params: { category: categorySlug, blog: blogParam },
          pageSize: blogPostsPerPage,
          props: { category, lang },
        }
      )
    );
  });
};

/** */
export const getStaticPathsBlogTag = async ({ paginate }: { paginate: PaginateFunction }) => {
  if (!isBlogEnabled || !isBlogTagRouteEnabled) return [];

  const posts = await fetchPosts();
  const languages = collectLanguages(posts);

  return languages.flatMap((lang) => {
    const localizedPosts = filterPostsByLang(posts, lang);
    if (!localizedPosts.length) return [];

    const tags = new Map<string, NonNullable<Post['tags']>[number]>();
    localizedPosts.forEach((post) => {
      if (Array.isArray(post.tags)) {
        post.tags.forEach((tag) => {
          tags.set(tag.slug, tag);
        });
      }
    });

    const segments = [] as Array<string>;
    if (lang !== defaultLang) {
      segments.push(lang);
    }
    if (TAG_BASE) {
      segments.push(TAG_BASE);
    }

    const blogParam = segments.length ? segments.join('/') : undefined;

    return Array.from(tags.entries()).flatMap(([tagSlug, tag]) =>
      paginate(
        localizedPosts.filter(
          (post) => Array.isArray(post.tags) && post.tags.find((elem) => elem.slug === tagSlug)
        ),
        {
          params: { tag: tagSlug, blog: blogParam },
          pageSize: blogPostsPerPage,
          props: { tag, lang },
        }
      )
    );
  });
};

/** */
export async function getRelatedPosts(originalPost: Post, maxResults: number = 4): Promise<Post[]> {
  const targetLang = resolveLang(originalPost.lang);
  const allPosts = filterPostsByLang(await fetchPosts(), targetLang);
  const originalTagsSet = new Set(originalPost.tags ? originalPost.tags.map((tag) => tag.slug) : []);

  const postsWithScores = allPosts.reduce((acc: { post: Post; score: number }[], iteratedPost: Post) => {
    if (iteratedPost.slug === originalPost.slug) return acc;

    let score = 0;
    if (iteratedPost.category && originalPost.category && iteratedPost.category.slug === originalPost.category.slug) {
      score += 5;
    }

    if (iteratedPost.tags) {
      iteratedPost.tags.forEach((tag) => {
        if (originalTagsSet.has(tag.slug)) {
          score += 1;
        }
      });
    }

    acc.push({ post: iteratedPost, score });
    return acc;
  }, []);

  postsWithScores.sort((a, b) => b.score - a.score);

  const selectedPosts: Post[] = [];
  let i = 0;
  while (selectedPosts.length < maxResults && i < postsWithScores.length) {
    selectedPosts.push(postsWithScores[i].post);
    i++;
  }

  return selectedPosts;
}

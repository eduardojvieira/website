---
publishDate: 2025-05-16T00:00:00Z
author: Eduardo Vieira
title: 'Developing Custom Web Applications on ThingsBoard'
excerpt: 'Extend ThingsBoard with custom web apps, widgets, and APIs to meet unique industrial automation requirements.'
image: '~/assets/images/thingsboard.jpg'
category: IIoT
tags:
  - thingsboard
  - web development
metadata:
  canonical: https://eduardovieira.dev/thingsboard-web-application-development
---

# Developing Custom Web Applications on ThingsBoard

ThingsBoard offers a robust UI out of the box, but many projects need custom functionality. Here’s how I extend ThingsBoard safely without breaking maintainability.

## 1. Decide When to Extend

- **Custom workflows:** e.g., multi-step maintenance approvals.
- **Specialized visualizations:** heatmaps, 3D models, or AR overlays.
- **Integration bridges:** embedding MES/ERP functionality directly in ThingsBoard dashboards.

If a requirement fits within existing widgets, configure rather than customize. Only build when the ROI is clear.

## 2. Widget Development Workflow

1. Scaffold widgets using the ThingsBoard Widget SDK.
2. Develop in a local Angular/TypeScript environment with hot reload.
3. Use REST APIs to test data sources.
4. Package widgets and deploy via the ThingsBoard UI or REST API.

## 3. Example Widget Snippet

```typescript
self.onInit = () => {
  self.ctx.defaultSubscription.subscribe((data) => {
    self.level = data.data[0].value;
  });
};

self.getLevelColor = () => {
  if (self.level > 80) {
    return '#ff5f56';
  }
  if (self.level > 50) {
    return '#ffbd2e';
  }
  return '#27c93f';
};
```

## 4. Authentication and APIs

- Use ThingsBoard’s REST API for CRUD operations on assets, telemetry, and alarms.
- Authenticate via JWT tokens; refresh tokens securely in client apps.
- Respect tenant boundaries and rate limits to avoid disrupting production users.

## 5. Deployment and CI/CD

- Store widget bundles and custom code in Git.
- Automate deployment with CI pipelines that call ThingsBoard APIs.
- Version widgets; maintain compatibility notes for dashboards using older versions.

## 6. Security and Governance

- Validate user input to prevent injection attacks.
- Restrict custom widgets to trusted developers and review code regularly.
- Monitor audit logs for widget creation, updates, and deletions.

## 7. Performance Considerations

- Optimize data subscriptions; unsubscribe when widgets are destroyed.
- Cache heavy computations and reuse datasets across widgets when possible.
- Test performance under production-like data volumes.

Extending ThingsBoard thoughtfully lets you deliver tailored operator experiences while keeping the platform supportable. Treat custom code with the same rigor as any production application.

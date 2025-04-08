---
title: "Modernizing PLC Development: Converting Structured Text to Plain Text for Version Control and AI Programming"
excerpt: "Learn how to bridge the gap between industrial automation programming and modern software development practices with this tool that converts PLC code to plain text files for Git version control and AI-assisted programming."
image: ~/assets/images/9. ide.png
category: Industrial Automation
tags:
  - plc programming
  - codesys
  - version control
  - git
  - structured text
  - industrial automation
  - ai programming
metadata:
  canonical: https://eduardovieira.dev/plc-structured-text-to-plain-text-converter
author: Eduardo Vieira
publishDate: 2025-04-08T00:00:00Z
---

## The Missing Link in PLC Development

Industrial automation programmers have long faced a significant challenge: while the rest of the software development world enjoys robust version control systems, collaborative tools, and AI-assisted programming, PLC development remains largely isolated in proprietary environments. This disconnect creates numerous problems:

1. **Limited Version Control**: PLCs typically store their code in binary files that aren't meaningfully trackable in Git or other VCS systems
2. **No Diff Visualization**: Identifying what changed between versions is unnecessarily difficult
3. **Team Collaboration Barriers**: Multiple engineers can't easily work on different parts of the same project
4. **AI Programming Gap**: Modern AI coding assistants can't read or modify binary PLC project files

To bridge this gap, I've developed the **PLC Structured Text to Plain Text Converter** - an open-source tool that transforms CODESYS and ABB Automation Builder projects into plain text files for version control and AI-assisted programming.

## Unlocking Modern Development Workflows for Industrial Automation

This tool creates a bidirectional conversion path between your PLC development environment and plain text files:

![IDE Integration](~/assets/images/9. ide.png)

The converter supports exporting and importing:
- Program Organization Units (POUs)
- Data Unit Types (DUTs) 
- Methods, Functions, and Function Blocks
- Task Configurations
- Properties, Actions, and Transitions

By extracting the source code to plain text, you unlock several key capabilities:

### 1. True Version Control with Git

With your PLC code in plain text format, you can leverage Git's full feature set:
- Track meaningful changes rather than binary file differences
- Create feature branches for parallel development
- Review changes with clear diffs before merging
- Maintain a complete history of your codebase

![Git Integration](~/assets/images/12. git.png)

### 2. AI-Assisted PLC Programming

Perhaps most exciting is the ability to use modern AI coding assistants with your PLC code:
- Get intelligent code completion suggestions
- Refactor complex control logic with AI assistance
- Generate documentation automatically
- Identify potential bugs and optimization opportunities

![AI Programming](~/assets/images/10. ai.png)

### 3. Simplified Project Templating

The tool provides additional capabilities for template management:
- Generate reusable project templates
- Update projects from templates
- Standardize code structure across multiple machines

## Setting Up the PLC-to-Text Converter

Getting started with the converter is straightforward:

### Installation

1. Copy the Script Commands folder to your CODESYS or Automation Builder installation:
   - For CODESYS: `C:\Program Files\CODESYS 3.5.20.50\CODESYS\Script Commands`
   - For Automation Builder: `C:\Program Files\ABB\AB2.8\AutomationBuilder\Script Commands`

2. Open your PLC programming environment without opening a project

3. Select **Tools → Customize** from the menu:
   ![Customize Menu](~/assets/images/1. codesys.png)

4. Select or create a toolbar, then click **Add Command...**:
   ![Toolbar Configuration](~/assets/images/2. toolbar.png)

5. In categories, select **ScriptEngine Commands** and add the **Export to Files** and **Import From Files** commands:
   ![Adding Commands](~/assets/images/3. commands.png)

6. You should now have export and import buttons in your toolbar:
   ![Export/Import Buttons](~/assets/images/4. buttons.png)

## Using the Converter: A Practical Workflow

Here's how to integrate the converter into your development workflow:

### Step 1: Organize Your Project Structure

First, create a folder under your Application to contain all elements that will be synchronized:

![Project Organization](~/assets/images/6. src.png)

**Important**: Only elements inside this folder will be exported/imported. Keep communication configurations and system components outside this folder as they're not supported by the converter.

### Step 2: Export to Plain Text

With your project organized, click the **Export to Files** button to extract everything to your filesystem:

![Export Process](~/assets/images/7. export.png)

The files will be generated in a path structure that matches your project:
`<Project Name>/<Device Name>/<Application Name>/src/`

![Generated Files](~/assets/images/8. files.png)

### Step 3: Edit With Modern Tools

Now you can open and edit these files with any text editor or IDE:

![IDE Editing](~/assets/images/9. ide.png)

**Important**: Don't remove the line `// --- BEGIN IMPLEMENTATION ---` as it helps the script distinguish between variable declarations and implementation code.

### Step 4: Import Back to PLC Environment

When you're ready, use the **Import from Files** command to bring the modified code back into your project:

![Imported Code](~/assets/images/11. imported.png)

### Step 5: Leverage Version Control

With your code in text format, you can commit changes to Git and track the evolution of your industrial control logic:

![Git Commits](~/assets/images/12. git.png)

Always keep the binary project file in your repository as well for completeness.

## Best Practices and Limitations

While this tool significantly improves the PLC development workflow, there are some important considerations:

### Best Practices
- Create a consistent folder structure across projects
- Commit both text files and binary project files to your repository
- Add meaningful commit messages describing control logic changes
- Use branching for feature development and testing

### Current Limitations
- Does not support exporting/importing visualization elements
- Communication devices may have limited support
- Recipe management should remain outside the export folder
- Tested extensively with CODESYS V3.5 SP20

## Conclusion: Bringing PLC Programming into the Modern Era

The PLC Structured Text to Plain Text Converter represents a critical bridge between traditional industrial automation programming and modern software development practices. By enabling version control, team collaboration, and AI-assisted programming for PLC code, we can accelerate development, improve code quality, and reduce the skills gap in industrial automation.

The tool is available on [GitHub](https://github.com/eduardojvieira/PLC-Structured-Text-to-Plain-Text-for-Version-Control-and-AI) and welcomes contributions from the industrial automation community.

For more technical details, you can also reference the [CODESYS Scripting Documentation](https://help.codesys.com/webapp/idx-scriptingengine) or the local documentation at `C:\<CODESYS INSTALL LOCATION>\CODESYS\Online Help\en\ScriptEngine.chm`.

---
title: "我的 Codex Workspace 配置"
description: "整理我日常使用 Codex 的插件、Skills、MCP 与子 Agent 配置，以及它们各自适合承担的任务。"
pubDate: 2026-07-02
tags:
  - Codex
  - AI
draft: false
---

最近 Claude 又经历了一波封号，我的账号也没能幸免。既然已经全面转向 Codex，我就顺手把自己的 workspace 配置整理出来，主要包括 Plugins、Skills、MCP 和子 Agent。

## Plugins

和 Claude Code 类似，Codex 也有插件市场。使用 GUI 时，可以直接浏览热门插件。我目前保留了这几类：

- `spreadsheets`、`pdf`
- `github`
- `build-web-apps`
- `browser`、`chrome`

文件操作类插件里，我只留下了 `spreadsheets` 和 `pdf`。平时处理最多的是 Markdown 和 HTML，Word、PPT 相关插件暂时用不上，所以已经卸载。

`github` 基本属于必装。GitHub 的价值不只是托管代码，它也是问题、方案和工程经验的集中入口。无论是查思路、看实现，还是处理仓库里的 PR、CI 和 issue，交给 Codex 都很自然。

`browser` 和 `chrome` 也很实用。`browser` 足以覆盖大多数页面测试场景：打开本地站点、截图、点击、填写表单、检查前端表现。遇到依赖真实登录态的页面时，`chrome` 更合适，因为它可以利用你本机 Chrome 里已有的会话状态，例如访问内部系统、管理后台或登录后才可见的调试页面。我前几天就用 `chrome` 插件完成了一个公司内部的 AI 考试，全程没有浪费一分钟时间，全部由 Codex 帮我答题。

开发类插件里，我目前重点使用 `build-web-apps`。它不只是“生成前端页面”的插件，更适合从 0 到 1 搭建完整网站。它内部还带了 React、Supabase、Stripe 等最佳实践 Skills，即使不使用整个插件，这些 Skills 在特定场景下也很有价值。

## Skills

Skills 的来源比较分散，我按来源分成三类。

Codex 自带的 Skills 包括：

- `imagegen`
- `openai-docs`
- `plugin-creator`
- `skill-creator`
- `skill-installer`

插件附带的 Skills 包括：

- `pdf` 插件：`pdf`
- `spreadsheets` 插件：`Spreadsheets`
- `browser` 插件：`control-in-app-browser`
- `chrome` 插件：`control-chrome`
- `build-web-apps` 插件：`frontend-app-builder`、`frontend-testing-debugging`、`react-best-practices`、`shadcn`、`stripe-best-practices`、`supabase-postgres-best-practices`
- `github` 插件：`github`、`gh-fix-ci`、`gh-address-comments`、`yeet`

我自己安装的 Skills 主要是：

- `brainstorming`
- `playwright`
- `design-taste-frontend`
- `redesign-existing-projects`
- `gpt-taste`

其中，`pdf`、`spreadsheets`、`browser`、`chrome`、`github` 这几类插件附带的 Skills 不一定需要提前研究。遇到对应任务时，直接选中插件或者让 Codex 调用相关能力即可。

`build-web-apps` 里的部分 Skills 值得单独看一眼。例如 `supabase-postgres-best-practices`，它不一定只服务于完整网站搭建；只要涉及 Postgres 查询、表结构或性能问题，就可以单独使用。

我尤其关注设计相关的 Skills。现在常用的有 `design-taste-frontend`、`gpt-taste` 和 `build-web-apps:frontend-app-builder`。它们都有“减少 AI 模板感”的目标，但侧重点不同：

- `design-taste-frontend` 更适合落地页、作品集和视觉改造。
- `gpt-taste` 风格更大胆，更适合需要强动画、强视觉张力的页面。
- `build-web-apps:frontend-app-builder` 更像完整建站流程的一环，适合统一多个页面的风格，保证最终实现符合设计契约。

## MCP

目前我唯一自安装的 MCP 是 `context7`。

对写代码的人来说，它几乎是必装项。很多库、框架和云服务的用法变化很快，只靠模型训练数据很容易过时。`context7` 可以把问题拉回到较新的文档和 API 用法上，减少“凭印象写代码”的概率。

## 子 Agent

我暂时没有自定义或导入子 Agent。

Codex 默认带有 `default`、`explorer`、`worker` 三类子 Agent。我的理解是：`explorer` 更适合探索代码、梳理上下文；`worker` 更适合执行边界清晰的具体任务。现阶段默认配置已经够用。

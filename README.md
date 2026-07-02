# ithkeen 的博客

一个以写作为中心的 Astro 静态博客，视觉方向是「踏雪寻梅」：冷白雪面、石墨文字、梅红点缀和克制的编辑感。

## 技术栈

- Astro + Markdown/MDX 内容集合
- React islands for motion-heavy home sections
- GSAP ScrollTrigger for reduced, isolated scroll motion
- RSS and sitemap output for GitHub Pages

## 本地开发

```sh
pnpm install
pnpm run dev
```

默认开发地址是 `http://localhost:4321/blog/`。

## 验证

```sh
pnpm run check
pnpm run build
pnpm run preview
```

`pnpm run check` 会验证 Astro 类型和内容集合；`pnpm run build` 会生成静态站点、RSS 和 sitemap。

## 内容

文章放在 `src/content/blog/`，支持 Markdown 和 MDX。文件路径决定文章 slug，例如：

```text
src/content/blog/hello-world.md -> /blog/posts/hello-world/
```

Frontmatter:

```yaml
title: "文章标题"
description: "一段简短摘要"
pubDate: 2026-07-02
updatedDate: 2026-07-02
tags:
  - 技术
draft: false
```

必填字段是 `title`、`description`、`pubDate`、`tags`。生产构建会过滤 `draft: true` 的文章。

## 部署

仓库包含 `.github/workflows/deploy.yml`。推送到默认分支后，GitHub Actions 会安装依赖、运行检查、构建 Astro，并发布 `dist/` 到 GitHub Pages。

import { getCollection, type CollectionEntry } from "astro:content";

export type BlogPost = CollectionEntry<"blog">;

export type PostSummary = {
  id: string;
  title: string;
  description: string;
  pubDate: Date;
  tags: string[];
};

export async function getAllPosts() {
  const posts = await getCollection("blog", ({ data }) => {
    return import.meta.env.PROD ? data.draft !== true : true;
  });

  return sortPosts(posts);
}

export function sortPosts(posts: BlogPost[]) {
  return [...posts].sort((a, b) => {
    return b.data.pubDate.getTime() - a.data.pubDate.getTime();
  });
}

export function summarizePost(post: BlogPost): PostSummary {
  return {
    id: post.id,
    title: post.data.title,
    description: post.data.description,
    pubDate: post.data.pubDate,
    tags: post.data.tags,
  };
}

export function formatDate(date: Date) {
  return new Intl.DateTimeFormat("zh-CN", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(date);
}

export function getRecentPosts(posts: BlogPost[], limit = 3) {
  return posts.slice(0, limit);
}

export function getTagCounts(posts: BlogPost[]) {
  const counts = new Map<string, number>();

  for (const post of posts) {
    for (const tag of post.data.tags) {
      counts.set(tag, (counts.get(tag) ?? 0) + 1);
    }
  }

  return [...counts.entries()]
    .map(([tag, count]) => ({ tag, count }))
    .sort((a, b) => {
      if (b.count !== a.count) return b.count - a.count;
      return a.tag.localeCompare(b.tag, "zh-CN");
    });
}

export function getPostsByTag(posts: BlogPost[], tag: string) {
  return posts.filter((post) => post.data.tags.includes(tag));
}

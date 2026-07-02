import rss from "@astrojs/rss";
import { getAllPosts } from "../lib/posts";
import { SITE_DESCRIPTION, SITE_TITLE, absoluteUrl, withBase } from "../lib/site";

export async function GET() {
  const posts = await getAllPosts();

  return rss({
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    site: absoluteUrl("/"),
    items: posts.map((post) => ({
      title: post.data.title,
      pubDate: post.data.pubDate,
      description: post.data.description,
      link: withBase(`/posts/${post.id}/`),
    })),
    customData: `<language>zh-CN</language>`,
  });
}

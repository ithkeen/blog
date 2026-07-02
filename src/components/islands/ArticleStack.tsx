import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { withBase } from "../../lib/site";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type StackPost = {
  id: string;
  title: string;
  description: string;
  tags: string[];
};

type Props = {
  posts: StackPost[];
};

export default function ArticleStack({ posts }: Props) {
  const scope = useRef<HTMLElement | null>(null);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const cards = gsap.utils.toArray<HTMLElement>(".stack-card");

      cards.forEach((card, index) => {
        gsap.fromTo(
          card,
          { y: 90 + index * 16, scale: 0.94, opacity: 0.5 },
          {
            y: index * -24,
            scale: 1 - index * 0.025,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: card,
              start: "top 86%",
              end: "bottom 38%",
              scrub: true,
            },
          },
        );
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="stack-section section-pad" aria-labelledby="stack-title">
      <div className="container stack-layout">
        <div className="stack-copy">
          <h2 className="eyeless-title" id="stack-title">
            纸页从雪面升起，留下清晰的脚印。
          </h2>
          <p className="lede">
            近期文章像一叠轻薄的纸。向下阅读时，它们逐层靠近，让路径、主题和语气慢慢浮现。
          </p>
        </div>
        <div className="stack-list">
          {posts.map((post) => (
            <a className="stack-card" href={withBase(`/posts/${post.id}/`)} key={post.id}>
              <span className="meta">{post.tags.join(" / ")}</span>
              <h3>{post.title}</h3>
              <p>{post.description}</p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

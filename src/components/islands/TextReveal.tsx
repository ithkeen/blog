import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useMemo, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type Props = {
  text: string;
};

export default function TextReveal({ text }: Props) {
  const scope = useRef<HTMLElement | null>(null);
  const words = useMemo(() => Array.from(text).filter(Boolean), [text]);

  useGSAP(
    () => {
      const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      if (reduceMotion) return;

      const wordNodes = gsap.utils.toArray<HTMLElement>(".reveal-word");
      gsap.to(wordNodes, {
        opacity: 1,
        stagger: 0.08,
        ease: "none",
        scrollTrigger: {
          trigger: scope.current,
          start: "top 68%",
          end: "bottom 42%",
          scrub: true,
        },
      });
    },
    { scope },
  );

  return (
    <section ref={scope} className="reveal-section" aria-label="写作理念">
      <p className="reveal-copy">
        {words.map((word, index) =>
          /^\s+$/.test(word) ? (
            word
          ) : (
            <span className="reveal-word" key={`${word}-${index}`}>
              {word}
            </span>
          ),
        )}
      </p>
    </section>
  );
}

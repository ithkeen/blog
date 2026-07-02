import { ArrowLeftIcon, ArrowRightIcon } from "@phosphor-icons/react";
import { useMemo, useState } from "react";

type Props = {
  notes: string[];
};

export default function ReadingNotesCarousel({ notes }: Props) {
  const safeNotes = useMemo(() => (notes.length > 0 ? notes : ["继续阅读，沿雪寻梅。"]), [notes]);
  const [index, setIndex] = useState(0);
  const active = safeNotes[index];

  function move(delta: number) {
    setIndex((current) => (current + delta + safeNotes.length) % safeNotes.length);
  }

  return (
    <div className="carousel-panel" aria-label="阅读札记轮播">
      <div>
        <span className="quote-mark" aria-hidden="true">
          “
        </span>
        <h2>{active}</h2>
      </div>
      <div className="button-row" style={{ justifyContent: "space-between" }}>
        <span className="meta">
          {index + 1} / {safeNotes.length}
        </span>
        <span style={{ display: "inline-flex", gap: "0.4rem" }}>
          <button
            type="button"
            className="button button-secondary"
            aria-label="上一条阅读札记"
            onClick={() => move(-1)}
            style={{ minHeight: 38, width: 42, padding: 0 }}
          >
            <ArrowLeftIcon size={18} weight="regular" aria-hidden="true" />
          </button>
          <button
            type="button"
            className="button button-secondary"
            aria-label="下一条阅读札记"
            onClick={() => move(1)}
            style={{ minHeight: 38, width: 42, padding: 0 }}
          >
            <ArrowRightIcon size={18} weight="regular" aria-hidden="true" />
          </button>
        </span>
      </div>
    </div>
  );
}

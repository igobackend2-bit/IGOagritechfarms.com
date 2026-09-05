import React from "react";

/**
 * Renders long-form SEO article copy (supplied by the marketing team) on a
 * project detail page. Content is plain text: consecutive non-empty lines are
 * paragraphs, short lines (no trailing punctuation) are treated as subheadings,
 * and lines starting with "* " are grouped into a bullet list. Purely additive —
 * does not alter any other component's behaviour. Renders nothing if no text
 * is supplied for the current route.
 */
export default function ProjectArticleSection({ text }: { text?: string }) {
  if (!text) return null;

  const rawLines = text.split("\n").map((l) => l.trim()).filter(Boolean);

  type Block =
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] };

  const blocks: Block[] = [];
  let bulletBuffer: string[] = [];
  const flushBullets = () => {
    if (bulletBuffer.length) {
      blocks.push({ type: "ul", items: bulletBuffer });
      bulletBuffer = [];
    }
  };

  rawLines.forEach((line, idx) => {
    if (line.startsWith("* ")) {
      bulletBuffer.push(line.slice(2).trim());
      return;
    }
    flushBullets();

    const isFirstLine = idx === 0;
    const wordCount = line.split(/\s+/).length;
    const looksLikeHeading =
      !isFirstLine &&
      line.length <= 90 &&
      wordCount <= 12 &&
      !/[.,;:]$/.test(line);

    if (isFirstLine) {
      blocks.push({ type: "h2", text: line });
    } else if (looksLikeHeading) {
      blocks.push({ type: "h3", text: line });
    } else {
      blocks.push({ type: "p", text: line });
    }
  });
  flushBullets();

  return (
    <section className="py-20 md:py-28 bg-white border-t border-agri-green-800/10">
      <div className="container mx-auto px-6 max-w-3xl">
        {blocks.map((block, i) => {
          if (block.type === "h2") {
            return (
              <h2
                key={i}
                className="text-3xl md:text-4xl font-serif text-agri-earth-900 mb-8 leading-tight"
              >
                {block.text}
              </h2>
            );
          }
          if (block.type === "h3") {
            return (
              <h3
                key={i}
                className="text-xl md:text-2xl font-serif text-agri-earth-900 mt-10 mb-4"
              >
                {block.text}
              </h3>
            );
          }
          if (block.type === "ul") {
            return (
              <ul key={i} className="list-disc pl-6 space-y-2 mb-6 text-black/60 leading-relaxed">
                {block.items.map((item, j) => (
                  <li key={j}>{item}</li>
                ))}
              </ul>
            );
          }
          return (
            <p key={i} className="text-black/60 leading-relaxed mb-4">
              {block.text}
            </p>
          );
        })}
      </div>
    </section>
  );
}

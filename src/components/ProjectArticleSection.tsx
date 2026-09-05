import React from "react";

/**
 * Renders long-form SEO article copy (supplied by the marketing team) on a
 * project detail page. Content is plain text: the first line is the article
 * title, "* " lines become a bullet list, short Title-Case lines become
 * subheadings, and everything else is a paragraph.
 *
 * Styled to match the site's existing long-form article pattern (see the
 * FEATURE_ARTICLE block above in ProjectRouter.tsx) — same "prose" typography,
 * same gold eyebrow label, same green serif headings — so this reads as part
 * of the page rather than a plain dump of text. Purely additive: does not
 * alter any other component's behaviour, and renders nothing if no text is
 * supplied for the current route.
 */
export default function ProjectArticleSection({ text }: { text?: string }) {
  if (!text) return null;

  const rawLines = text
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean);

  type Block =
    | { type: "h2"; text: string }
    | { type: "h3"; text: string }
    | { type: "p"; text: string }
    | { type: "ul"; items: string[] };

  // Small connector words are skipped when judging whether a line is
  // "Title Case" (headings in the source copy are consistently written like
  // "Why Choose Dragon Fruit Farming in India?", while ordinary sentences
  // are normal sentence case) — this is a much more reliable heading signal
  // than line length alone, which used to misfire on short plain sentences.
  const SMALL_WORDS = new Set([
    "a", "an", "the", "and", "or", "for", "of", "in", "on", "to", "with",
    "is", "are", "vs", "&", "your", "you", "at", "by", "from", "into",
  ]);

  const looksTitleCase = (line: string): boolean => {
    const words = line.replace(/[?!]$/, "").split(/\s+/).filter(Boolean);
    if (words.length < 2) return false;
    let capitalCount = 0;
    let countable = 0;
    words.forEach((w, i) => {
      const bare = w.replace(/[^A-Za-z]/g, "");
      if (!bare) return;
      if (i > 0 && SMALL_WORDS.has(bare.toLowerCase())) return;
      countable++;
      if (/^[A-Z]/.test(bare)) capitalCount++;
    });
    if (countable === 0) return false;
    return capitalCount / countable >= 0.7;
  };

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
    const shortEnough = line.length <= 90 && wordCount <= 12;
    const noTrailingPunct = !/[.,;:]$/.test(line);
    const looksLikeHeading =
      !isFirstLine && shortEnough && noTrailingPunct && looksTitleCase(line);

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
    <section className="py-24 md:py-32 bg-white border-t border-agri-green-800/10">
      <div className="container mx-auto px-6 max-w-4xl">
        <div className="flex items-center gap-3 mb-12">
          <div className="w-10 h-[1px] bg-agri-gold-500" />
          <p className="text-agri-gold-500 font-bold text-[10px] uppercase tracking-[0.35em]">
            In-Depth Guide
          </p>
        </div>

        <div className="prose prose-lg max-w-none prose-headings:font-serif prose-headings:text-agri-green-800 prose-h2:text-4xl prose-h2:md:text-5xl prose-h2:leading-tight prose-h2:mb-8 prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-4 prose-a:text-agri-green-800 prose-p:text-black/60 prose-p:leading-relaxed prose-li:text-black/60 prose-ul:my-6">
          {blocks.map((block, i) => {
            if (block.type === "h2") {
              return <h2 key={i}>{block.text}</h2>;
            }
            if (block.type === "h3") {
              return <h3 key={i}>{block.text}</h3>;
            }
            if (block.type === "ul") {
              return (
                <ul key={i}>
                  {block.items.map((item, j) => (
                    <li key={j}>{item}</li>
                  ))}
                </ul>
              );
            }
            return <p key={i}>{block.text}</p>;
          })}
        </div>
      </div>
    </section>
  );
}

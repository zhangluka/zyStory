"use client";

import { useRef, useState } from "react";
import Image from "next/image";
import { MapPin, Heart } from "lucide-react";
import { TypewriterText } from "@/components/TypewriterText";
import type { Memory, GalleryItem, PaperContent } from "@/lib/types";

/** 照片项：先打字展示 caption，再以「出纸」动画展示图片 */
function GalleryPaperContent({ item }: { item: GalleryItem }) {
  const [captionDone, setCaptionDone] = useState(false);
  const [imageReveal, setImageReveal] = useState(false);

  const handleCaptionComplete = () => {
    setCaptionDone(true);
    requestAnimationFrame(() => setImageReveal(true));
  };

  return (
    <article className="space-y-4">
      <p className="font-serif text-typewriter-accent font-semibold">
        <TypewriterText
          text={item.caption}
          charDelayMs={40}
          onComplete={handleCaptionComplete}
          showSkipButton
        />
      </p>
      <div
        className="relative w-full aspect-video rounded border-2 border-typewriter-border overflow-hidden bg-typewriter-paper shadow-inner"
        style={{
          clipPath: imageReveal ? "inset(0 0 0 0)" : "inset(100% 0 0 0)",
          transition: "clip-path 0.7s ease-out",
        }}
      >
        {captionDone && (
          <Image
            src={item.src}
            alt={item.caption}
            fill
            className="object-cover"
            unoptimized
          />
        )}
      </div>
    </article>
  );
}

const DEFAULT_PLACEHOLDER = "选一个回忆或照片，让它在这里被「打印」出来。";

interface PaperAreaProps {
  content?: PaperContent | null;
  placeholder?: string;
  className?: string;
}

function formatMemoryForTypewriter(m: Memory): string {
  const meta = [m.location, m.tag].filter(Boolean).join(" · ");
  return `${m.date}\n${m.title}\n\n${m.content}${meta ? `\n\n${meta}` : ""}`;
}

export function PaperArea({
  content = null,
  placeholder = DEFAULT_PLACEHOLDER,
  className = "",
}: PaperAreaProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const body =
    content?.type === "memory" ? (
      <article className="space-y-4">
        <div className="whitespace-pre-line font-serif text-typewriter-ink">
          <TypewriterText
            text={formatMemoryForTypewriter(content.data)}
            charDelayMs={45}
            showSkipButton
            className="block"
          />
        </div>
        {content.data.location != null || content.data.tag != null ? (
          <div className="flex gap-5 text-sm text-typewriter-ink/60 mt-4">
            {content.data.location && (
              <span className="flex items-center gap-1">
                <MapPin className="w-4 h-4 shrink-0" />
                {content.data.location}
              </span>
            )}
            <span className="flex items-center gap-1">
              <Heart className="w-4 h-4 shrink-0" />
              {content.data.tag}
            </span>
          </div>
        ) : null}
      </article>
    ) : content?.type === "gallery" ? (
      <GalleryPaperContent item={content.data} />
    ) : (
      <p className="text-typewriter-ink/70 text-center py-12 font-serif">
        {placeholder}
      </p>
    );

  return (
    <section
      ref={containerRef}
      aria-label="纸面内容区"
      className={`typewriter-paper rounded-lg border-2 border-typewriter-border shadow-md min-h-[320px] p-6 md:p-8 ${className}`}
    >
      <div className="font-serif text-typewriter-ink min-h-[200px]">{body}</div>
    </section>
  );
}

"use client";

import { useTypewriter } from "@/hooks/useTypewriter";

interface TypewriterTextProps {
  text: string;
  charDelayMs?: number;
  onComplete?: () => void;
  className?: string;
  /** 是否显示「立即显示」按钮 */
  showSkipButton?: boolean;
}

export function TypewriterText({
  text,
  charDelayMs = 50,
  onComplete,
  className = "",
  showSkipButton = true,
}: TypewriterTextProps) {
  const { displayText, isComplete, skip, cursorVisible } = useTypewriter(text, {
    charDelayMs,
    onComplete,
  });

  return (
    <span className={className}>
      {displayText}
      {cursorVisible && (
        <span
          className="inline-block w-0.5 h-[1em] bg-typewriter-ink ml-0.5 align-baseline animate-pulse"
          aria-hidden
        />
      )}
      {showSkipButton && !isComplete && (
        <button
          type="button"
          onClick={skip}
          aria-label="立即显示全部内容，跳过打字动画"
          className="ml-3 text-typewriter-accent underline font-serif text-sm focus:outline-none focus:ring-2 focus:ring-typewriter-accent focus:ring-offset-2 rounded"
        >
          立即显示
        </button>
      )}
    </span>
  );
}

"use client";

import { useState, useEffect, useCallback, useRef } from "react";

const DEFAULT_CHAR_MS = 50;

function prefersReducedMotion(): boolean {
  if (typeof window === "undefined") return false;
  return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

interface UseTypewriterOptions {
  charDelayMs?: number;
  onComplete?: () => void;
}

export function useTypewriter(
  fullText: string,
  options: UseTypewriterOptions = {},
) {
  const { charDelayMs = DEFAULT_CHAR_MS, onComplete } = options;
  const [displayLength, setDisplayLength] = useState(0);
  const [isComplete, setIsComplete] = useState(false);
  const skipRequested = useRef(false);
  const reducedMotion = useRef(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const fullLength = fullText.length;
  const displayText = fullText.slice(0, displayLength);

  const skip = useCallback(() => {
    skipRequested.current = true;
  }, []);

  useEffect(() => {
    const reduced = prefersReducedMotion();
    reducedMotion.current = reduced;
    if (reduced || fullLength === 0) {
      setDisplayLength(fullLength);
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }
    setDisplayLength(0);
    setIsComplete(false);
    skipRequested.current = false;
  }, [fullText, fullLength]);

  useEffect(() => {
    if (reducedMotion.current || isComplete || fullLength === 0) return;
    if (displayLength >= fullLength) {
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }
    if (skipRequested.current) {
      setDisplayLength(fullLength);
      setIsComplete(true);
      onCompleteRef.current?.();
      return;
    }
    const t = setTimeout(() => {
      setDisplayLength((n) => Math.min(n + 1, fullLength));
    }, charDelayMs);
    return () => clearTimeout(t);
  }, [displayLength, fullLength, isComplete, charDelayMs]);

  return {
    displayText,
    isComplete,
    skip,
    cursorVisible: !isComplete,
  };
}

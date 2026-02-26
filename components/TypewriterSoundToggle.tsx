"use client";

import { Volume2, VolumeX } from "lucide-react";
import { useTypewriterSound } from "@/contexts/TypewriterSoundContext";

export function TypewriterSoundToggle() {
  const { soundEnabled, toggleSound } = useTypewriterSound();

  return (
    <button
      type="button"
      onClick={toggleSound}
      aria-label={soundEnabled ? "关闭打字音效" : "开启打字音效"}
      className="p-2 rounded-md text-typewriter-ink/70 hover:text-typewriter-ink hover:bg-typewriter-paper/50 focus:outline-none focus:ring-2 focus:ring-typewriter-accent focus:ring-offset-2 focus:ring-offset-typewriter-bg transition-colors"
    >
      {soundEnabled ? (
        <Volume2 className="w-5 h-5" aria-hidden />
      ) : (
        <VolumeX className="w-5 h-5" aria-hidden />
      )}
    </button>
  );
}

"use client";

import { Plus } from "lucide-react";
import { cn } from "@/lib/utils";

interface AddMemoryFabProps {
  onClick: () => void;
  className?: string;
}

export function AddMemoryFab({ onClick, className }: AddMemoryFabProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="添加回忆"
      className={cn(
        "fixed bottom-10 right-10 md:bottom-10 md:right-10 z-[100] w-14 h-14 rounded-full bg-typewriter-accent text-typewriter-paper flex items-center justify-center text-2xl shadow-lg border-2 border-typewriter-border transition-all duration-300 hover:scale-110 hover:rotate-90 hover:shadow-xl cursor-pointer",
        className,
      )}
    >
      <Plus className="w-6 h-6" />
    </button>
  );
}

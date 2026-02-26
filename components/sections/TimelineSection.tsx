"use client";

import { MapPin, Heart } from "lucide-react";
import type { Memory } from "@/lib/types";

interface TimelineSectionProps {
  memories: Memory[];
  onSelectMemory?: (memory: Memory) => void;
}

export function TimelineSection({
  memories,
  onSelectMemory,
}: TimelineSectionProps) {
  return (
    <section className="py-20 px-5 bg-typewriter-bg relative">
      <div className="text-center mb-20">
        <h2 className="font-serif text-4xl text-typewriter-ink mb-4">
          我们的时光
        </h2>
      </div>
      <div className="max-w-6xl mx-auto relative">
        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-typewriter-border" />
        <div className="space-y-0">
          {memories.map((memory, index) => {
            const isEven = index % 2 === 0;
            const content = (
              <div
                role={onSelectMemory ? "button" : undefined}
                tabIndex={onSelectMemory ? 0 : undefined}
                onClick={() => onSelectMemory?.(memory)}
                onKeyDown={(e) => {
                  if (onSelectMemory && (e.key === "Enter" || e.key === " ")) {
                    e.preventDefault();
                    onSelectMemory(memory);
                  }
                }}
                className="w-[calc(100%-60px)] ml-[60px] md:ml-0 md:w-[45%] bg-typewriter-paper p-8 md:p-10 rounded-[20px] shadow-md border border-typewriter-border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl typewriter-paper cursor-pointer"
              >
                <div className="text-sm text-typewriter-accent font-semibold mb-2 font-serif">
                  {memory.date}
                </div>
                <h3 className="font-serif font-semibold text-2xl text-typewriter-ink mb-4">
                  {memory.title}
                </h3>
                <p className="text-typewriter-ink/80 leading-relaxed mb-4 font-serif">
                  {memory.content}
                </p>
                <div className="flex gap-5 text-sm text-typewriter-ink/60 font-serif">
                  {memory.location && (
                    <span className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 shrink-0" />
                      {memory.location}
                    </span>
                  )}
                  <span className="flex items-center gap-1">
                    <Heart className="w-4 h-4 shrink-0" />
                    {memory.tag}
                  </span>
                </div>
              </div>
            );
            return (
              <div
                key={`${memory.date}-${memory.title}-${index}`}
                className="relative flex flex-col md:flex-row md:items-center md:justify-between mb-16 md:mb-20 last:mb-0"
              >
                {isEven ? (
                  content
                ) : (
                  <div className="hidden md:block md:w-[45%]" />
                )}
                <div className="absolute left-[30px] md:left-1/2 w-5 h-5 -translate-x-1/2 rounded-full bg-typewriter-accent border-4 border-typewriter-paper shadow-[0_0_0_4px] shadow-typewriter-border z-10 md:relative md:flex-shrink-0" />
                {isEven ? (
                  <div className="hidden md:block md:w-[45%]" />
                ) : (
                  content
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

import { MapPin, Heart } from "lucide-react";
import type { Memory } from "@/lib/types";

interface TimelineSectionProps {
  memories: Memory[];
}

export function TimelineSection({ memories }: TimelineSectionProps) {
  return (
    <section className="py-20 px-5 bg-background relative">
      <div className="text-center mb-20">
        <h2 className="font-archivo text-4xl text-text mb-4">我们的时光</h2>
      </div>
      <div className="max-w-6xl mx-auto relative">
        <div className="absolute left-[30px] md:left-1/2 top-0 bottom-0 w-0.5 md:-translate-x-1/2 bg-gradient-to-b from-primary to-secondary" />
        <div className="space-y-0">
          {memories.map((memory, index) => {
            const isEven = index % 2 === 0;
            const content = (
              <div className="w-[calc(100%-60px)] ml-[60px] md:ml-0 md:w-[45%] bg-card-bg p-8 md:p-10 rounded-[20px] shadow-md border border-border transition-all duration-300 hover:scale-[1.02] hover:shadow-xl">
                <div className="text-sm text-primary font-semibold mb-2">
                  {memory.date}
                </div>
                <h3 className="font-archivo font-medium text-2xl text-text mb-4">
                  {memory.title}
                </h3>
                <p className="text-text/80 leading-relaxed mb-4">
                  {memory.content}
                </p>
                <div className="flex gap-5 text-sm text-text/60">
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
                {isEven ? content : <div className="hidden md:block md:w-[45%]" />}
                <div className="absolute left-[30px] md:left-1/2 w-5 h-5 -translate-x-1/2 rounded-full bg-primary border-4 border-card-bg shadow-[0_0_0_4px] shadow-border z-10 md:relative md:flex-shrink-0" />
                {isEven ? <div className="hidden md:block md:w-[45%]" /> : content}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

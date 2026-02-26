"use client";

import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { PaperArea } from "@/components/PaperArea";
import { TypewriterSoundToggle } from "@/components/TypewriterSoundToggle";
import { AddMemoryFab } from "@/components/AddMemoryFab";
import { AddMemoryDialog } from "@/components/AddMemoryDialog";
import { INITIAL_MEMORIES } from "@/lib/seed-memories";
import { GALLERY_ITEMS } from "@/lib/seed-gallery";
import { useState, useCallback } from "react";
import type { Memory, GalleryItem, PaperContent } from "@/lib/types";

export default function Home() {
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [paperContent, setPaperContent] = useState<PaperContent>(null);

  const handleAddMemory = (memory: Memory) => {
    setMemories((prev) => [memory, ...prev]);
    setDialogOpen(false);
  };

  const handleSelectMemory = useCallback((memory: Memory) => {
    setPaperContent({ type: "memory", data: memory });
  }, []);

  const handleSelectGalleryItem = useCallback((item: GalleryItem) => {
    setPaperContent({ type: "gallery", data: item });
  }, []);

  return (
    <main className="min-h-screen bg-typewriter-bg">
      {/* 1. 顶盖/品牌区 */}
      <header aria-label="打字机顶盖" className="typewriter-lid relative">
        <Hero />
        <div className="absolute top-4 right-4">
          <TypewriterSoundToggle />
        </div>
      </header>

      {/* 2. 主题入口区：统计 + 时间线 + 照片墙 */}
      <section aria-label="主题入口" className="typewriter-entries">
        <StatsSection
          memoriesCount={memories.length}
          photosCount={GALLERY_ITEMS.length}
        />
        <TimelineSection
          memories={memories}
          onSelectMemory={handleSelectMemory}
        />
        <GallerySection
          items={GALLERY_ITEMS}
          onSelectItem={handleSelectGalleryItem}
        />
      </section>

      {/* 3. 中央纸面展示区 */}
      <section
        aria-label="纸面内容"
        className="max-w-4xl mx-auto px-4 py-8 md:py-12"
      >
        <PaperArea content={paperContent} />
      </section>

      {/* 4. 底座区 */}
      <footer
        aria-label="打字机底座"
        className="typewriter-base border-t border-typewriter-border py-4 text-center"
      >
        <span className="font-serif text-typewriter-ink/60 text-sm">
          Love Diary
        </span>
      </footer>

      <AddMemoryFab onClick={() => setDialogOpen(true)} />
      <AddMemoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={handleAddMemory}
      />
    </main>
  );
}

"use client";

import { Hero } from "@/components/sections/Hero";
import { StatsSection } from "@/components/sections/StatsSection";
import { TimelineSection } from "@/components/sections/TimelineSection";
import { GallerySection } from "@/components/sections/GallerySection";
import { AddMemoryFab } from "@/components/AddMemoryFab";
import { AddMemoryDialog } from "@/components/AddMemoryDialog";
import { INITIAL_MEMORIES } from "@/lib/seed-memories";
import { GALLERY_ITEMS } from "@/lib/seed-gallery";
import { useState } from "react";
import type { Memory } from "@/lib/types";

export default function Home() {
  const [memories, setMemories] = useState<Memory[]>(INITIAL_MEMORIES);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleAddMemory = (memory: Memory) => {
    setMemories((prev) => [memory, ...prev]);
    setDialogOpen(false);
  };

  return (
    <main>
      <Hero />
      <StatsSection
        memoriesCount={memories.length}
        photosCount={GALLERY_ITEMS.length}
      />
      <TimelineSection memories={memories} />
      <GallerySection items={GALLERY_ITEMS} />
      <AddMemoryFab onClick={() => setDialogOpen(true)} />
      <AddMemoryDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        onAdd={handleAddMemory}
      />
    </main>
  );
}

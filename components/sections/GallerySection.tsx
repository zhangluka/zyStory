"use client";

import Image from "next/image";
import type { GalleryItem } from "@/lib/types";

interface GallerySectionProps {
  items: GalleryItem[];
  onSelectItem?: (item: GalleryItem) => void;
}

export function GallerySection({ items, onSelectItem }: GallerySectionProps) {
  return (
    <section className="py-20 px-5 bg-typewriter-bg">
      <div className="text-center mb-16">
        <h2 className="font-serif text-4xl text-typewriter-ink mb-4">照片墙</h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 auto-rows-fr">
        {items.map((item, i) => (
          <div
            key={item.id}
            role={onSelectItem ? "button" : undefined}
            tabIndex={onSelectItem ? 0 : undefined}
            onClick={() => onSelectItem?.(item)}
            onKeyDown={(e) => {
              if (onSelectItem && (e.key === "Enter" || e.key === " ")) {
                e.preventDefault();
                onSelectItem(item);
              }
            }}
            className={`group relative overflow-hidden rounded-[20px] shadow-md border border-typewriter-border transition-all duration-300 hover:scale-105 hover:shadow-xl cursor-pointer ${
              (i + 1) % 3 === 1 ? "sm:row-span-2" : ""
            } ${(i + 1) % 4 === 0 ? "sm:col-span-2" : ""}`}
          >
            <div className="relative w-full h-full min-h-[200px] sm:min-h-[280px]">
              <Image
                src={item.src}
                alt={item.caption}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-110"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                unoptimized
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-5">
                <span className="text-white text-lg font-medium font-serif">
                  {item.caption}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

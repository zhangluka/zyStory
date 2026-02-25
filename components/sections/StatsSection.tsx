"use client";

import { useEffect, useState } from "react";

const START_DATE = new Date("2023-01-01");

function getDaysTogether(): number {
  const now = new Date();
  const diff = now.getTime() - START_DATE.getTime();
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

interface StatsSectionProps {
  memoriesCount: number;
  photosCount: number;
}

export function StatsSection({ memoriesCount, photosCount }: StatsSectionProps) {
  const [days, setDays] = useState(0);

  useEffect(() => {
    setDays(getDaysTogether());
    const t = setInterval(() => setDays(getDaysTogether()), 60000);
    return () => clearInterval(t);
  }, []);

  const stats = [
    { value: days, label: "天在一起" },
    { value: memoriesCount, label: "珍贵回忆" },
    { value: photosCount, label: "美好照片" },
    { value: "∞", label: "未来可期", isInfinity: true },
  ];

  return (
    <section className="py-20 px-5 bg-white relative">
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 text-center">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="py-10 px-5 bg-card-bg rounded-[20px] shadow-sm border border-border transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
          >
            <div
              className={`font-archivo font-bold text-4xl text-primary mb-2 ${
                stat.isInfinity ? "text-4xl" : ""
              }`}
            >
              {stat.value}
            </div>
            <div className="text-text/70 text-lg">{stat.label}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

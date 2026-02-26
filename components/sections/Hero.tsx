export function Hero() {
  return (
    <section className="min-h-[40vh] flex items-center justify-center relative bg-typewriter-bg border-b border-typewriter-border">
      <div className="text-center z-10 max-w-3xl px-5">
        <h1 className="font-serif font-semibold text-4xl sm:text-5xl md:text-6xl mb-3 text-typewriter-ink">
          Love Diary
        </h1>
        <p className="font-serif text-lg sm:text-xl text-typewriter-ink/80">
          记录我们的美好瞬间
        </p>
      </div>
    </section>
  );
}

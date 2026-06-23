"use client";

import React, { useState, useEffect, useCallback, useRef } from "react";
import dynamic from "next/dynamic";

const HTMLFlipBook = dynamic(
  async () => {
    const module = await import("react-pageflip");
    return module.default || module;
  },
  {
    ssr: false,
    loading: () => (
      <div
        className="flex items-center justify-center border border-(--border-color) bg-white shadow-sm"
        style={{ width: "840px", height: "560px" }}
      >
        Loading book...
      </div>
    ),
  },
);

const Page = React.forwardRef((props, ref) => {
  return (
    <div className="overflow-hidden relative bg-white" ref={ref}>
      {props.children}
    </div>
  );
});
Page.displayName = "Page";

export default function BookReader({ pages, title }) {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = pages.length;
  const totalSpreads = Math.ceil(totalPages / 2);
  const currentSpread = Math.floor(currentPage / 2);

  const onPage = (e) => {
    setCurrentPage(e.data);
  };

  const goNext = useCallback(() => {
    bookRef.current?.pageFlip()?.flipNext();
  }, []);

  const goPrev = useCallback(() => {
    bookRef.current?.pageFlip()?.flipPrev();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [goNext, goPrev]);

  const bookPages = pages.map((p, i) => (
    <Page key={i}>
      <img
        src={p}
        alt={`Page ${i + 1}`}
        className="w-full h-full object-contain block bg-white"
        draggable={false}
      />
    </Page>
  ));

  if (pages.length % 2 !== 0) {
    bookPages.push(
      <Page key="empty-end">
        <div className="w-full h-full bg-(--gray-100) flex items-center justify-center">
          <span className="text-xs tracking-[0.15em] uppercase text-(--gray-400)">End</span>
        </div>
      </Page>,
    );
  }

  const navBtnBase =
    "flex-shrink-0 w-12 h-12 flex items-center justify-center border border-(--border-color) bg-transparent text-black text-[1.2rem] cursor-pointer transition-all duration-300 hover:bg-black hover:text-white hover:border-black disabled:opacity-30 disabled:cursor-default max-md:hidden";

  return (
    <div className="max-w-[1100px] mx-auto px-5">
      <div className="flex items-center justify-between pb-6 border-b border-(--border-color) mb-10">
        <h2 className="text-base">{title}</h2>
      </div>

      <div className="flex items-center gap-5 justify-center">
        <button
          className={navBtnBase}
          onClick={goPrev}
          disabled={currentPage === 0}
          aria-label="Previous page"
        >
          ←
        </button>

        <HTMLFlipBook
          width={420}
          height={560}
          size="stretch"
          minWidth={300}
          maxWidth={420}
          minHeight={400}
          maxHeight={560}
          maxShadowOpacity={0.5}
          showCover={false}
          mobileScrollSupport={true}
          onFlip={onPage}
          className="flex border border-(--border-color) bg-white shadow-[0_2px_20px_rgba(0,0,0,0.08)] relative overflow-hidden"
          ref={bookRef}
        >
          {bookPages}
        </HTMLFlipBook>

        <button
          className={navBtnBase}
          onClick={goNext}
          disabled={currentPage >= totalPages - 2}
          aria-label="Next page"
        >
          →
        </button>
      </div>

      <div className="flex items-center justify-center gap-6 mt-10 pt-6 border-t border-(--border-color) max-md:flex-col max-md:gap-4">
        <button
          className="inline-block py-3 px-8 w-[250px] text-center border border-black bg-transparent text-black font-[var(--font-body)] text-xs tracking-[0.12em] uppercase cursor-pointer transition-all duration-300 hover:bg-black hover:text-white hover:opacity-100 disabled:opacity-30 disabled:cursor-default disabled:pointer-events-none max-md:hidden"
          onClick={goPrev}
          disabled={currentPage === 0}
        >
          Previous
        </button>
        <div className="flex gap-1.5">
          {Array.from({ length: totalSpreads }).map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 border cursor-pointer transition-colors duration-300 p-0 ${
                i === currentSpread
                  ? "bg-black border-black"
                  : "bg-transparent border-(--gray-300)"
              }`}
              onClick={() => {
                bookRef.current?.pageFlip()?.flip(i * 2);
              }}
              aria-label={`Go to spread ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="inline-block py-3 px-8 w-[250px] text-center border border-black bg-transparent text-black font-[var(--font-body)] text-xs tracking-[0.12em] uppercase cursor-pointer transition-all duration-300 hover:bg-black hover:text-white hover:opacity-100 disabled:opacity-30 disabled:cursor-default disabled:pointer-events-none max-md:hidden"
          onClick={goNext}
          disabled={currentPage >= totalPages - 2}
        >
          Next
        </button>
      </div>
    </div>
  );
}

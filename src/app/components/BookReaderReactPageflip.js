"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import HTMLFlipBook from "react-pageflip";
import styles from "./BookReader.module.css";

const Page = React.forwardRef((props, ref) => {
  return (
    <div className={styles.page} ref={ref}>
      {props.children}
    </div>
  );
});
Page.displayName = "Page";

export default function BookReader({ pages, title }) {
  const bookRef = useRef(null);
  const [currentPage, setCurrentPage] = useState(0);

  const totalPages = pages.length;

  const onPage = (e) => {
    setCurrentPage(e.data); // data is the current page index
  };

  const goNext = () => {
    bookRef.current?.pageFlip()?.flipNext();
  };

  const goPrev = () => {
    bookRef.current?.pageFlip()?.flipPrev();
  };

  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, []);

  // Determine left/right pages for the display counting
  // HTMLFlipBook automatically shows two pages at a time, index `currentPage` and `currentPage + 1`.
  // Wait, if it's the first page (cover), it might just be page 0 on the right and blank on the left?
  // By default, `showCover` could be set, but let's just let it be.
  const leftIdx = currentPage;
  const rightIdx = currentPage + 1;

  // For the dots we group by spreads. A spread is every 2 pages if no cover.
  const totalSpreads = Math.ceil(pages.length / 2);
  const currentSpread = Math.floor(currentPage / 2);

  return (
    <div className={styles.reader}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        <span className={styles.pageCount}>
          Pages {leftIdx + 1}
          {rightIdx < pages.length ? `–${rightIdx + 1}` : ""} of {pages.length}
        </span>
      </div>

      <div className={styles.bookWrapper}>
        <button
          className={`${styles.navBtn} ${styles.navBtnLeft}`}
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
          className={styles.flipBook}
          ref={bookRef}
        >
          {pages.map((p, i) => (
            <Page key={i}>
              <img
                src={p}
                alt={`Page ${i + 1}`}
                className={styles.pageImage}
                draggable={false}
              />
            </Page>
          ))}
          {/* Add a blank page if odd number of pages */}
          {pages.length % 2 !== 0 && (
            <Page>
              <div className={styles.emptyPage}>
                <span className={styles.endText}>End</span>
              </div>
            </Page>
          )}
        </HTMLFlipBook>

        <button
          className={`${styles.navBtn} ${styles.navBtnRight}`}
          onClick={goNext}
          disabled={currentPage >= pages.length - 2}
          aria-label="Next page"
        >
          →
        </button>
      </div>

      <div className={styles.controls}>
        <button className="btn" onClick={goPrev} disabled={currentPage === 0}>
          Previous
        </button>
        <div className={styles.spreadDots}>
          {Array.from({ length: totalSpreads }).map((_, i) => (
            <button
              key={i}
              className={`${styles.dot} ${
                i === currentSpread ? styles.dotActive : ""
              }`}
              onClick={() => {
                bookRef.current?.pageFlip()?.turnToPage(i * 2);
              }}
              aria-label={`Go to spread ${i + 1}`}
            />
          ))}
        </div>
        <button
          className="btn"
          onClick={goNext}
          disabled={currentPage >= pages.length - 2}
        >
          Next
        </button>
      </div>
    </div>
  );
}

"use client";

import HTMLFlipBook from "react-pageflip";
import { useState, useRef, useEffect } from "react";
import styles from "./BookReader.module.css";

export default function BookReaderTest({ pages, title }) {
  return (
    <HTMLFlipBook width={420} height={560}>
      {pages.map((p, i) => (
        <div key={i} className="page">
          <img
            src={p}
            alt={`Page ${i + 1}`}
            style={{ width: "100%", height: "100%" }}
          />
        </div>
      ))}
    </HTMLFlipBook>
  );
}

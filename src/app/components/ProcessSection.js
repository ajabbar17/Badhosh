"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const processVideos = [
  {
    id: 1,
    title: "Process I",
    description:
      "This video documents the development of the first performance, including movement experimentation, character construction, and the exploration of themes related to guilt, self-surveillance, and emotional restraint.",
    embedId: "9u8HMLh9d9w",
    thumbnail: "/process1.png",
  },
  {
    id: 2,
    title: "Process II",
    description:
      "This video captures the creative process behind the second performance, focusing on visual storytelling, costume development, and the construction of themes surrounding desire, intimacy, and longing.",
    embedId: "SRWiDbQhjGk",
    thumbnail: "/process2.png",
  },
  {
    id: 3,
    title: "Process III",
    description:
      "This video follows the making of the final performance, documenting rehearsals, staging decisions, and collaborative processes that contributed to themes of acceptance, collective presence, and belonging.",
    embedId: "w0Tp48uuGag",
    thumbnail: "/process3.png",
  },
];

export default function ProcessSection() {
  const [activeId, setActiveId] = useState(null);
  const activeProc = processVideos.find((p) => p.id === activeId);

  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = "hidden";
      const onKey = (e) => { if (e.key === "Escape") setActiveId(null); };
      document.addEventListener("keydown", onKey);
      return () => {
        document.body.style.overflow = "";
        document.removeEventListener("keydown", onKey);
      };
    } else {
      document.body.style.overflow = "";
    }
  }, [activeId]);

  return (
    <section className="py-20 border-t-2 border-(--border-color)">
      <div className="max-w-300 mx-auto px-10 max-md:px-5">
        <div className="section-header">
          <h2>Process</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7.5 max-md:gap-10">
          {processVideos.map((proc) => (
            <div key={proc.id} className="flex flex-col">
              {/* Thumbnail */}
              <div
                className="w-full aspect-9/16 bg-(--gray-100) border border-(--border-color) overflow-hidden relative cursor-pointer"
                onClick={() => setActiveId(proc.id)}
              >
                <Image
                  src={proc.thumbnail}
                  alt={proc.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <span className="text-4xl text-white drop-shadow-lg">▶</span>
                </div>
              </div>

              {/* Card info */}
              <div className="pt-4 border-t border-(--border-color) mt-3 flex flex-col flex-1">
                <h3 className="mb-2">{proc.title}</h3>
                <p className="mb-4 text-[0.8rem] flex-1">{proc.description}</p>
                <button className="btn" onClick={() => setActiveId(proc.id)}>
                  Watch Video
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {activeProc && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative h-[90vh] aspect-9/16 max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activeProc.embedId}?autoplay=1&rel=0&modestbranding=1`}
              title={activeProc.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      )}
    </section>
  );
}

"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

const performances = [
  {
    id: 1,
    title: "Performance I — Internalized Guilt",
    description:
      "The first performance reflects on the process through which social expectations become internalized. Through repetitive movement, bodily restraint, and acts of self-transformation, the work explores the emotional burden of conformity and the ways individuals learn to monitor, suppress, and reshape themselves in response to external pressures.",
    embedId: "8ggO1lO7hnU",
    thumbnail: "/performance1.png",
  },
  {
    id: 2,
    title: "Performance II — Desire and Longing",
    description:
      "The second performance centers on desire, intimacy, and imagined connection. Through movement, projection, and symbolic gestures, it examines the relationship between longing and illusion, reflecting on the ways individuals construct emotional realities in their search for affection, recognition, and belonging.",
    embedId: "guLUwhJXdtk",
    thumbnail: "/performance2.png",
  },
  {
    id: 3,
    title: "Performance III — Acceptance and Becoming",
    description:
      "The final performance explores acceptance, self-reconciliation, and collective belonging. Bringing together the emotional journeys established in the earlier works, it reflects on the possibility of embracing fragmented aspects of the self and moving toward connection, understanding, and shared existence.",
    embedId: "rYoTsD1DP_8",
    thumbnail: "/performance3.png",
  },
];

export default function PerformancesSection() {
  const [activeId, setActiveId] = useState(null);
  const activePerf = performances.find((p) => p.id === activeId);

  useEffect(() => {
    if (activeId) {
      document.body.style.overflow = "hidden";
      const onKey = (e) => {
        if (e.key === "Escape") setActiveId(null);
      };
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
    <section id="performances" className="py-20">
      <div className="max-w-300 mx-auto px-10 max-md:px-5">
        <div className="section-header">
          <h2>Performances</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-7.5 max-md:gap-10">
          {performances.map((perf) => (
            <div key={perf.id} className="flex flex-col">
              {/* Thumbnail */}
              <div
                className="w-full aspect-9/16 bg-(--gray-100) border border-(--border-color) overflow-hidden relative cursor-pointer"
                onClick={() => setActiveId(perf.id)}
              >
                <Image
                  src={perf.thumbnail}
                  alt={perf.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/25">
                  <span className="text-4xl text-white drop-shadow-lg">▶</span>
                </div>
              </div>

              {/* Card info */}
              <div className="pt-4 flex flex-col justify-between gap-4 border-t border-(--border-color) mt-3 flex-1">
                <div>
                  <h3 className="mb-2 text-sm">{perf.title}</h3>
                  <p className="mb-4 text-[0.9rem]">{perf.description}</p>
                </div>

                <button className="btn" onClick={() => setActiveId(perf.id)}>
                  Watch Video
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox modal */}
      {activePerf && (
        <div
          className="fixed inset-0 z-50 bg-black/92 flex items-center justify-center"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative h-[90vh] aspect-9/16 max-w-[95vw]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* <button
              className="absolute -top-9 right-0 text-white text-[0.7rem] tracking-[0.15em] uppercase opacity-70 hover:opacity-100 transition-opacity"
              onClick={() => setActiveId(null)}
            >
              Close ×
            </button> */}

            <iframe
              className="w-full h-full"
              src={`https://www.youtube.com/embed/${activePerf.embedId}?autoplay=1&rel=0&modestbranding=1`}
              title={activePerf.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />

            {/* YouTube branding masks */}
            {/* <div className="absolute top-0 left-0 right-0 h-[10%] bg-black pointer-events-none" /> */}
            {/* <div className="absolute bottom-0 left-0 right-0 h-[10%] bg-black pointer-events-none" /> */}
          </div>
        </div>
      )}
    </section>
  );
}

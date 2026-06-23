import Link from "next/link";

const zines = [
  {
    id: "zine1",
    title: "Zine I — Fragments",
    description:
      "The first volume in the series explores fragmented narratives and the construction of identity through collage, photography, and handwritten text. It draws on field research and personal archives to create a visual essay that resists linear reading.",
    year: "2024",
    pages: 22,
    cover: "/zine1.png",
  },
  {
    id: "zine2",
    title: "Zine II — Echoes",
    description:
      "The second volume examines repetition and transformation, tracing how stories change as they move through different bodies and contexts. Combining interviews, illustration, and documentary photography.",
    year: "2024",
    pages: 20,
    cover: "/zine2.png",
  },
  {
    id: "zine3",
    title: "Zine III — Residue",
    description:
      "The final volume gathers what remains after the performances are complete — traces, remnants, and afterimages. It functions as both documentation and its own independent work.",
    year: "2025",
    pages: 20,
    cover: "/zine3.png",
  },
];

export default function ZinesSection() {
  return (
    <section className="py-20 border-t-2 border-(--border-color)">
      <div className="max-w-300 mx-auto px-10 max-md:px-5">
        <div className="section-header">
          <h2>Zines</h2>
        </div>

        <div className="flex flex-col">
          {zines.map((zine, index) => (
            <div key={zine.id}>
              <article className="grid grid-cols-1 md:grid-cols-2 gap-7.5 md:gap-15 items-center py-15 max-md:py-10">
                <div className="flex flex-col gap-4">
                  <h3 className="text-base tracking-widest">{zine.title}</h3>
                  <div className="flex items-center gap-2 text-xs text-(--gray-400) tracking-[0.08em] uppercase">
                    <span>{zine.year}</span>
                    <span className="text-(--gray-300)">·</span>
                    <span>{zine.pages} Pages</span>
                  </div>
                  <p className="text-[0.85rem] max-w-120">{zine.description}</p>
                  <Link href={`/zines/${zine.id}`} className="btn w-37.5">
                    Read
                  </Link>
                </div>
                <div className="flex justify-end max-md:order-first max-md:justify-center">
                  <div
                    className="w-full max-w-85 max-md:max-w-65 aspect-3/4 bg-(--gray-100) bg-cover bg-center border border-(--border-color) flex items-center justify-center"
                    style={{ backgroundImage: `url(${zine.cover})` }}
                  >
                    <span className="text-xs text-(--gray-400) tracking-widest uppercase">
                      Cover
                    </span>
                  </div>
                </div>
              </article>
              {index < zines.length - 1 && <hr className="divider" />}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

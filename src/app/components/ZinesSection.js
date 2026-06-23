import Link from "next/link";

const zines = [
  {
    id: "zine1",
    title: "Zine I — Internalized Guilt",
    description:
      "This publication documents the first stage of Badhosh, where identity is shaped through fear, observation, and social expectation. Through performance stills and visual narratives, it reflects on the ways silence, shame, and self-surveillance become embedded within everyday experience.",
    year: "2024",
    pages: 22,
    cover: "/zine1.png",
  },
  {
    id: "zine2",
    title: "Zine II — Desire and Longing",
    description:
      "The second publication shifts toward intimacy, desire, and imagined connection. Through symbolic performances and constructed narratives, it captures the emotional tension between longing and reality, exploring the search for affection, belonging, and recognition.",
    year: "2024",
    pages: 20,
    cover: "/zine2.png",
  },
  {
    id: "zine3",
    title: "Zine III — Acceptance and Belonging",
    description:
      "The final publication brings together themes of self-acceptance, resilience, and collective belonging. It documents a movement away from isolation and toward community, considering how identity can be reclaimed through connection, understanding, and shared experience.",
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

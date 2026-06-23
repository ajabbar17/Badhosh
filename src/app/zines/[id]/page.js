import Link from "next/link";
import BookReader from "../../components/BookReader";

const zineData = {
  zine1: {
    title: "Zine I — Fragments",
    pageCount: 22,
    folder: "/zine1",
  },
  zine2: {
    title: "Zine II — Echoes",
    pageCount: 20,
    folder: "/zine2",
  },
  zine3: {
    title: "Zine III — Residue",
    pageCount: 20,
    folder: "/zine3",
  },
};

export function generateStaticParams() {
  return [{ id: "zine1" }, { id: "zine2" }, { id: "zine3" }];
}

export default async function ZineReaderPage({ params }) {
  const { id } = await params;
  const zine = zineData[id];

  if (!zine) {
    return (
      <main className="pt-25 pb-20 min-h-screen">
        <div className="max-w-300 mx-auto px-10 max-md:px-5">
          <h2>Zine not found</h2>
          <Link href="/zines" className="btn">
            Back to Zines
          </Link>
        </div>
      </main>
    );
  }

  const pages = Array.from({ length: zine.pageCount }, (_, i) => {
    return `${zine.folder}/page-${String(i + 1).padStart(2, "0")}.png`;
  });

  return (
    <main className="pt-25 pb-20 min-h-screen">
      <div className="max-w-300 mx-auto px-10 max-md:px-5">
        <div className="mb-10">
          <Link
            href="/zines"
            className="text-xs tracking-[0.1em] uppercase text-(--gray-500) no-underline transition-colors duration-300 hover:text-black hover:opacity-100"
          >
            ← Back to Zines
          </Link>
        </div>
        <BookReader pages={pages} title={zine.title} />
      </div>
    </main>
  );
}

import Image from "next/image";
import aboutImg from "../../../public/about.webp";

export default function AboutSection() {
  return (
    <section className="py-20 border-t border-b-2 border-(--border-color)">
      <div className="max-w-300 mx-auto px-10 max-md:px-5 grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-20 items-center">
        <div className="flex flex-col">
          <h2 className="mb-6">About the Project</h2>
          <p className="mb-5  text-justify">
            Badhosh is a practice-based research project that explores how
            social, cultural, and religious expectations shape queer experiences
            in Pakistan. Through performance art, moving image, sculpture,
            publication, and digital archiving, the project investigates themes
            of internalized guilt, self-surveillance, desire, belonging, and
            becoming. Drawing from interviews, personal narratives, and
            theoretical research, Badhosh examines how external systems of
            judgement gradually become internalized, influencing the ways
            individuals understand themselves and inhabit their bodies. Rather
            than presenting identity as fixed, the project approaches it as an
            ongoing process shaped by memory, social structures, relationships,
            and acts of resistance. Functioning as both an artistic practice and
            a research archive, Badhosh seeks to create space for reflection,
            visibility, and dialogue surrounding queer experience within
            contemporary Pakistan.
          </p>
          <a href="#performances" className="btn">
            Explore Work
          </a>
        </div>
        <div className="flex justify-end order-first md:order-none">
          <Image src={aboutImg} alt="About Badhosh" className="w-full h-auto" />
        </div>
      </div>
    </section>
  );
}

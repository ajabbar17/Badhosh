"use client";

import { useState, useEffect, useRef } from "react";

const characters = [
  {
    id: 1,
    name: "The Devotee",
    description:
      "The Devotee represents longing, faith, and emotional surrender. Standing beneath the pillar of light, the figure looks toward something greater than itself, believing that meaning and acceptance exist beyond the self. The red garment symbolizes desire, vulnerability, and devotion, while the covered form reflects a state of waiting rather than arrival. A body searching for answers in the light.",
    video: "/characters/1.mp4",
  },
  {
    id: 2,
    name: "The Performer",
    description:
      "The Performer embodies longing, aspiration, and emotional surrender. Positioned between visibility and concealment, the character navigates the tension between personal desire and external expectation. The covered face removes individual identity, allowing the body and its gestures to become the primary mode of expression. Through stillness, posture, and movement, the character reflects the experience of continuously reaching toward something that remains just beyond grasp. The hooded garment obscures recognizable features, emphasizing anonymity and universality. The ghungroo-adorned veil references South Asian performance traditions while symbolizing the histories, memories, and expectations carried by the body. The flowing silhouette softens individuality, transforming the performer into a symbolic presence rather than a specific person.",
    video: "/characters/2.mp4",
  },
  {
    id: 3,
    name: "The Idol",
    description:
      "The Idol represents an imagined presence shaped by longing and desire. Rather than a real person, it embodies the hopes, fantasies, and emotional projections that the self continuously reaches toward.",
    video: "/characters/3.mp4",
  },
  {
    id: 4,
    name: "The Sleeper",
    description:
      "The Sleeper represents emotional exhaustion and the desire to escape. Positioned on the bed, the character exists between reality and fantasy, searching for comfort in imagined spaces when the outside world becomes overwhelming. Costume The red garment symbolizes vulnerability, desire, and emotional intensity. In contrast to the white bed, it highlights the tension between inner turmoil and the longing for peace. The bed becomes a metaphorical space where dreams, fears, and unresolved emotions gather.",
    video: "/characters/4.mp4",
  },
  {
    id: 5,
    name: "The Wanderer",
    description:
      "The Wanderer represents a state of continuous searching. The dark robe symbolizes uncertainty, isolation, and the burden of carrying unanswered questions. Unlike other characters, this figure is defined not by arrival but by movement itself. The hood conceals individual identity, allowing the character to embody a universal experience rather than a specific person. The contrast between the dark garment and the glowing pillar reflects the tension between doubt and hope, distance and desire. The character exists in a space between belonging and becoming, endlessly drawn toward a light that remains just out of reach",
    video: "/characters/5.mp4",
  },
  {
    id: 6,
    name: "The Sculptor",
    description:
      "The Sculptor represents the desire to reshape oneself in response to social expectations. Working with clay, the figure attempts to mould an acceptable version of the self, removing what is perceived as undesirable and constructing what is considered worthy. The clay symbolizes identity as something constantly altered rather than naturally expressed. The ghungroos attached to the body act as a metaphor for emotional weight, memory, and societal pressure, making every movement visible and audible. The circular light surrounding the figure represents the cycle of self-correction and the endless pursuit of perfection.",
    video: "/characters/6.mp4",
  },
  {
    id: 7,
    name: "The Drowning Figure",
    description:
      "The Drowning Figure represents the struggle to survive beneath accumulated emotional pressure. Suspended within water, the character exists between sinking and rising, symbolizing the conflict between suppression and expression. Water functions as a metaphor for overwhelming emotions, isolation, and internal turmoil. The figure’s attempts to emerge reflect the desire to reclaim agency and breath within an environment that continuously pulls them downward. Rather than depicting defeat, the character embodies persistence, resilience, and the refusal to disappear beneath the weight of silence.",
    video: "/characters/7.mp4",
  },
  {
    id: 8,
    name: "The Double-Faced Figure",
    description:
      "The Double-Faced Figure represents the fragmentation of identity caused by living between multiple realities. One face reflects the self presented to the world, while the other embodies the self that remains concealed. The red sculptural masks symbolize desire, shame, memory, and emotional intensity. Their duplication suggests that identity is not singular but composed of competing narratives and expectations. The black garment removes individuality, allowing the figure to stand as a representation of internal conflict rather than a specific person. Together, the two faces embody the tension between visibility and concealment, authenticity and performance.",
    video: "/characters/8.mp4",
  },
  {
    id: 9,
    name: "The White Body",
    description:
      "This character represents a presence that emerges after exhaustion, conflict, and repetition. The white costume symbolizes openness, renewal, and the possibility of existing without concealment. Unlike the darker figures, the character is not defined by struggle but by endurance and transformation. The flowing fabric extending from the body reflects the experiences, memories, and emotional weight carried throughout the journey. Rather than being a burden, these histories become part of the character’s identity. The figure embodies resilience, hope, and the ability to move forward while remaining connected to the self.",
    video: "/characters/11.mp4",
  },
];

const FADE_DURATION = 300;

export default function CharactersCarousel() {
  const [current, setCurrent] = useState(0);
  const [visible, setVisible] = useState(true);
  const pendingIndex = useRef(null);

  const navigate = (newIndex) => {
    if (newIndex === current || pendingIndex.current !== null) return;
    pendingIndex.current = newIndex;
    setVisible(false);
  };

  useEffect(() => {
    if (!visible && pendingIndex.current !== null) {
      const t = setTimeout(() => {
        setCurrent(pendingIndex.current);
        pendingIndex.current = null;
        setVisible(true);
      }, FADE_DURATION);
      return () => clearTimeout(t);
    }
  }, [visible]);

  const prev = () =>
    navigate(current === 0 ? characters.length - 1 : current - 1);

  const next = () =>
    navigate(current === characters.length - 1 ? 0 : current + 1);

  const char = characters[current];

  const arrowBase =
    "flex-shrink-0 flex items-center justify-center border border-(--border-color) text-black text-[1.2rem] cursor-pointer transition-all duration-300 hover:bg-black hover:text-white hover:border-black";

  const slideClass = `flex-1 grid grid-cols-1 md:grid-cols-2 gap-7.5 md:gap-15 items-center md:min-h-100 transition-all ease-in-out duration-300 ${
    visible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2"
  }`;

  return (
    <section className="py-20 border-t-2 border-(--border-color)">
      <div className="max-w-300 mx-auto px-10 max-md:px-5">
        <div className="section-header">
          <h2>Characters</h2>
        </div>

        <div className="relative flex flex-col gap-5 md:flex-row md:items-center md:gap-10">
          <button
            className={`${arrowBase} w-10 h-10 md:w-12 md:h-12 absolute top-1/2 left-0 -translate-y-1/2 z-2 bg-white md:static md:translate-y-0 md:bg-transparent`}
            onClick={prev}
            aria-label="Previous character"
          >
            ←
          </button>

          <div className={slideClass}>
            <div className="w-full">
              <video
                key={char.video}
                className="w-full aspect-3/4 object-cover border border-(--border-color)"
                autoPlay
                muted
                loop
                playsInline
              >
                <source src={char.video} type="video/mp4" />
              </video>
            </div>
            <div className="flex flex-col gap-4">
              <h3 className="text-base tracking-[0.1em]">{char.name}</h3>
              <p className="text-[0.85rem] max-w-100">{char.description}</p>
              <div className="text-xs tracking-[0.15em] text-(--gray-400) [font-variant-numeric:tabular-nums]">
                {String(current + 1).padStart(2, "0")} /{" "}
                {String(characters.length).padStart(2, "0")}
              </div>
            </div>
          </div>

          <button
            className={`${arrowBase} w-10 h-10 md:w-12 md:h-12 absolute top-1/2 right-0 -translate-y-1/2 z-2 bg-white md:static md:translate-y-0 md:bg-transparent`}
            onClick={next}
            aria-label="Next character"
          >
            →
          </button>
        </div>

        <div className="flex justify-center gap-2 mt-10">
          {characters.map((_, i) => (
            <button
              key={i}
              className={`w-2 h-2 border cursor-pointer transition-colors duration-300 p-0 ${
                i === current
                  ? "bg-black border-black"
                  : "bg-transparent border-(--gray-300)"
              }`}
              onClick={() => navigate(i)}
              aria-label={`Go to character ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

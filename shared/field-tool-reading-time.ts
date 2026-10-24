type ReadingSection = {
  title?: string;
  intro?: string;
  sections?: { title: string; body: string }[];
  cards?: { title: string; body: string }[];
  callout?: string;
  takeaway?: string;
  table?: string[][];
  reflectionTime?: string;
};

// A conservative planning estimate for the text on this section only.
// Linked readings, the Lab, and the real conversation are not included.
export function readingTimeLabel(...parts: (string | undefined)[]) {
  const words = parts
    .filter(Boolean)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  return `About ${Math.max(1, Math.ceil(words / 180))} min read`;
}

export function guideReadingTime(section: ReadingSection) {
  const reading = readingTimeLabel(
    section.title,
    section.intro,
    ...[...(section.sections ?? []), ...(section.cards ?? [])].flatMap(part => [
      part.title,
      part.body,
    ]),
    ...(section.table ?? []).flat(),
    section.callout,
    section.takeaway
  );
  return section.reflectionTime
    ? `${reading} · ${section.reflectionTime}`
    : reading;
}

export function sceneReadingTime(scene: {
  title: string;
  move: string;
  question: string;
  dialogue?: { speaker: string; words: string }[];
}) {
  return readingTimeLabel(
    scene.title,
    scene.move,
    scene.question,
    ...(scene.dialogue?.map(line => line.words) ?? [])
  );
}

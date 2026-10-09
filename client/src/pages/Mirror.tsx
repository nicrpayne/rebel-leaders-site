import ComingSoon from "@/components/ComingSoon";

import { usePageTracker } from "@/hooks/usePageTracker";

const RPG_OFFICE = "/assets/legacy/manus/zlNQJQinSxaqyYjB.png";

export default function Mirror() {
  usePageTracker("mirror");
  return (
    <ComingSoon
      chapter="THE MIRROR"
      title="Diagnosis Tools"
      subtitle="See yourself clearly."
      description="A set of diagnostic instruments designed to help you see what's actually going on beneath the surface. Not another personality assessment. A mirror that shows you the gap between who you're performing and who you actually are. Built on the Enneagram, Spiral Dynamics, and the Holistic Impact Depth orbital system."
      teaser="The mirror is being polished. Subscribe to be notified when it's ready."
      bgImage={RPG_OFFICE}
    />
  );
}

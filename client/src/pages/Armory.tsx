import ComingSoon from "@/components/ComingSoon";

import { usePageTracker } from "@/hooks/usePageTracker";

const BOOKSHELF = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/yIOHdhgRJwHhvBLy.png";

export default function Armory() {
  usePageTracker("armory");
  return (
    <ComingSoon
      chapter="THE ARMORY"
      title="Digital Downloads"
      subtitle="Equip yourself."
      description="Lenses, guides, worksheets, and micro-experiments in courage. Free to download, with an optional 'pay what it's worth' model. Because the best tools should be accessible to everyone, and generosity is its own rebellion."
      teaser="The armory is being stocked. Subscribe to be notified when it opens."
      bgImage={BOOKSHELF}
    />
  );
}

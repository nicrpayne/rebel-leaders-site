import ComingSoon from "@/components/ComingSoon";

const SCROLL_MAP = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/LJSaRbdurtjnmgoI.png";

export default function Book() {
  return (
    <ComingSoon
      chapter="THE MANUSCRIPT"
      title="The Book"
      subtitle="A rebellion in print."
      description="The Rebel Leaders philosophy, distilled into a single volume. Part manifesto, part field guide, part love letter to the leaders who refuse to go numb. Currently being written. Subscribe to follow the journey."
      teaser="The manuscript is being written. Follow along on Substack."
      bgImage={SCROLL_MAP}
    />
  );
}

import ComingSoon from "@/components/ComingSoon";

const TAVERN = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/ZrwcxbsbnbgzlVax.png";

export default function Community() {
  return (
    <ComingSoon
      chapter="THE TAVERN"
      title="Community"
      subtitle="Where rebels find each other."
      description="A gathering place for leaders who feel the ache of the world and refuse to harden their hearts. Not a networking group. Not a mastermind. A place where you can say what you actually think and not feel crazy. Coming to Discord or a platform that serves the mission."
      teaser="The tavern is being built. Subscribe to be the first to enter."
      bgImage={TAVERN}
    />
  );
}

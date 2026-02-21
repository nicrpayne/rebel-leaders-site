import ComingSoon from "@/components/ComingSoon";

const RPG_BANNER = "https://files.manuscdn.com/user_upload_by_module/session_file/310419663030438402/NOhnYtwgYOzpzngc.png";

export default function Game() {
  return (
    <ComingSoon
      chapter="THE GAME"
      title="The Leader Video Game"
      subtitle="You've been grinding XP on the wrong skill tree."
      description="An interactive experience that reframes leadership as an RPG. Choose your character. Discover your stats. Find out which skill tree you've been leveling — and which one actually matters. This isn't a personality quiz. It's a mirror disguised as a game."
      teaser="The game is being forged. Subscribe to be notified when it launches."
      bgImage={RPG_BANNER}
    />
  );
}

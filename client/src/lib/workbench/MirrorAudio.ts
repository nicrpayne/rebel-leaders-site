// Mirror audio engine — synthesized sounds for the basin experience
class MirrorAudioEngine {
  private ctx: AudioContext | null = null;

  constructor() {
    if (typeof window !== "undefined") {
      window.addEventListener("click", () => this.init(), { once: true });
      window.addEventListener("keydown", () => this.init(), { once: true });
    }
  }

  private init() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  resume() {
    this.init();
  }

  // Question appears — subtle water surface disturbed
  playQuestionReveal() {
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const ctx = this.ctx;

    // Soft shimmer — high sine wave fading in and out
    const shimmer = ctx.createOscillator();
    const shimmerGain = ctx.createGain();
    shimmer.type = "sine";
    shimmer.frequency.setValueAtTime(1200, t);
    shimmer.frequency.exponentialRampToValueAtTime(900, t + 0.4);
    shimmerGain.gain.setValueAtTime(0, t);
    shimmerGain.gain.linearRampToValueAtTime(0.04, t + 0.05);
    shimmerGain.gain.exponentialRampToValueAtTime(0.001, t + 0.5);
    shimmer.connect(shimmerGain);
    shimmerGain.connect(ctx.destination);
    shimmer.start(t);
    shimmer.stop(t + 0.55);

    // Low resonant undertone
    const tone = ctx.createOscillator();
    const toneGain = ctx.createGain();
    tone.type = "sine";
    tone.frequency.setValueAtTime(180, t);
    toneGain.gain.setValueAtTime(0, t);
    toneGain.gain.linearRampToValueAtTime(0.06, t + 0.1);
    toneGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    tone.connect(toneGain);
    toneGain.connect(ctx.destination);
    tone.start(t);
    tone.stop(t + 0.9);
  }

  // Answer selected — crystal bowl resonance
  playAnswerSelect() {
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const ctx = this.ctx;

    // Crystal bowl fundamental
    const bowl = ctx.createOscillator();
    const bowlGain = ctx.createGain();
    bowl.type = "sine";
    bowl.frequency.setValueAtTime(528, t); // 528hz — resonant, warm
    bowlGain.gain.setValueAtTime(0, t);
    bowlGain.gain.linearRampToValueAtTime(0.12, t + 0.01);
    bowlGain.gain.exponentialRampToValueAtTime(0.001, t + 1.2);
    bowl.connect(bowlGain);
    bowlGain.connect(ctx.destination);
    bowl.start(t);
    bowl.stop(t + 1.3);

    // Harmonic overtone
    const overtone = ctx.createOscillator();
    const overtoneGain = ctx.createGain();
    overtone.type = "sine";
    overtone.frequency.setValueAtTime(1056, t);
    overtoneGain.gain.setValueAtTime(0, t);
    overtoneGain.gain.linearRampToValueAtTime(0.04, t + 0.01);
    overtoneGain.gain.exponentialRampToValueAtTime(0.001, t + 0.8);
    overtone.connect(overtoneGain);
    overtoneGain.connect(ctx.destination);
    overtone.start(t);
    overtone.stop(t + 0.9);
  }

  // Knob turn — subtle water movement
  playKnobTurn() {
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const ctx = this.ctx;

    const ripple = ctx.createOscillator();
    const rippleGain = ctx.createGain();
    ripple.type = "sine";
    ripple.frequency.setValueAtTime(400, t);
    ripple.frequency.exponentialRampToValueAtTime(300, t + 0.08);
    rippleGain.gain.setValueAtTime(0.03, t);
    rippleGain.gain.exponentialRampToValueAtTime(0.001, t + 0.1);
    ripple.connect(rippleGain);
    rippleGain.connect(ctx.destination);
    ripple.start(t);
    ripple.stop(t + 0.12);
  }

  // Reading complete — basin going still, deep resonance
  playReadingReveal() {
    this.init();
    if (!this.ctx) return;
    const t = this.ctx.currentTime;
    const ctx = this.ctx;

    // Deep bowl strike
    const deep = ctx.createOscillator();
    const deepGain = ctx.createGain();
    deep.type = "sine";
    deep.frequency.setValueAtTime(220, t);
    deepGain.gain.setValueAtTime(0, t);
    deepGain.gain.linearRampToValueAtTime(0.15, t + 0.02);
    deepGain.gain.exponentialRampToValueAtTime(0.001, t + 2.0);
    deep.connect(deepGain);
    deepGain.connect(ctx.destination);
    deep.start(t);
    deep.stop(t + 2.2);

    // Mid harmonic
    const mid = ctx.createOscillator();
    const midGain = ctx.createGain();
    mid.type = "sine";
    mid.frequency.setValueAtTime(440, t + 0.05);
    midGain.gain.setValueAtTime(0, t);
    midGain.gain.linearRampToValueAtTime(0.08, t + 0.07);
    midGain.gain.exponentialRampToValueAtTime(0.001, t + 1.5);
    mid.connect(midGain);
    midGain.connect(ctx.destination);
    mid.start(t + 0.05);
    mid.stop(t + 1.8);

    // High shimmer
    const high = ctx.createOscillator();
    const highGain = ctx.createGain();
    high.type = "sine";
    high.frequency.setValueAtTime(880, t + 0.1);
    highGain.gain.setValueAtTime(0, t);
    highGain.gain.linearRampToValueAtTime(0.05, t + 0.12);
    highGain.gain.exponentialRampToValueAtTime(0.001, t + 1.0);
    high.connect(highGain);
    highGain.connect(ctx.destination);
    high.start(t + 0.1);
    high.stop(t + 1.2);
  }
}

export const mirrorAudio = new MirrorAudioEngine();
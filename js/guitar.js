/**
 * GuitarEngine - Handles audio synthesis and string physics
 */
const GuitarEngine = {
  audioContext: null,
  
  // Standard Tuning Frequencies (E2, A2, D3, G3, B3, E4)
  tuning: [82.41, 110.00, 146.83, 196.00, 246.94, 329.63],
  
  init() {
    if (!this.audioContext) {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    }
  },

  /**
   * Calculate frequency for a specific string and fret
   * @param {number} stringIndex - 0 to 5 (6th string to 1st string)
   * @param {number} fret - Fret number (0-24)
   * @returns {number} Frequency in Hz
   */
  getFrequency(stringIndex, fret) {
    if (stringIndex < 0 || stringIndex >= this.tuning.length) return 0;
    const baseFreq = this.tuning[stringIndex];
    // Frequency formula: f = f0 * 2^(n/12)
    return baseFreq * Math.pow(2, fret / 12);
  },

  /**
   * Play a specific tone using Oscillator
   * @param {number} frequency - Frequency in Hz
   * @param {number} startTime - When to start playing (context time)
   * @param {number} duration - Duration in seconds
   */
  playTone(frequency, startTime = 0, duration = 1.5) {
    if (!this.audioContext) this.init();
    
    const ctx = this.audioContext;
    const t = startTime || ctx.currentTime;
    
    const osc = ctx.createOscillator();
    const gainNode = ctx.createGain();
    
    osc.type = 'triangle'; // Guitar-like wave
    osc.frequency.value = frequency;
    
    // Envelope for plucking sound
    gainNode.gain.setValueAtTime(0, t);
    gainNode.gain.linearRampToValueAtTime(0.8, t + 0.02); // Attack
    gainNode.gain.exponentialRampToValueAtTime(0.01, t + duration); // Decay
    
    osc.connect(gainNode);
    gainNode.connect(ctx.destination);
    
    osc.start(t);
    osc.stop(t + duration);
  },

  /**
   * Play a specific string at a specific fret
   * @param {number} stringIndex - 0-5
   * @param {number} fret - Fret number
   */
  playString(stringIndex, fret) {
    const freq = this.getFrequency(stringIndex, fret);
    this.playTone(freq);
  },

  /**
   * Strum a chord
   * @param {Array<number|null>} chordData - Array of 6 values (fret numbers or null for muted)
   * e.g., [null, 3, 2, 0, 1, 0] for C Major (Strings 6 to 1)
   */
  strum(chordData) {
    if (!this.audioContext) this.init();
    const ctx = this.audioContext;
    const now = ctx.currentTime;
    
    chordData.forEach((fret, stringIndex) => {
      if (fret !== null && fret !== -1) { // -1 or null means muted/not played
        // Strumming delay: ~50ms between strings
        const timeOffset = stringIndex * 0.05; 
        const freq = this.getFrequency(stringIndex, fret);
        this.playTone(freq, now + timeOffset);
      }
    });
  }
};

// Export for module usage (if using modules) or global window object
if (typeof window !== 'undefined') {
  window.GuitarEngine = GuitarEngine;
}

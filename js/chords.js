/**
 * Chord Database
 * Format: { name: "Chord Name", fingering: [String6, String5, String4, String3, String2, String1] }
 * null = muted, number = fret
 */
const ChordDB = [
    // Major Chords
    { name: "C Major", fingering: [null, 3, 2, 0, 1, 0] },
    { name: "D Major", fingering: [null, null, 0, 2, 3, 2] },
    { name: "E Major", fingering: [0, 2, 2, 1, 0, 0] },
    { name: "F Major", fingering: [1, 3, 3, 2, 1, 1] }, // Bar styling might be tricky, treat as individual frets for now
    { name: "G Major", fingering: [3, 2, 0, 0, 0, 3] },
    { name: "A Major", fingering: [null, 0, 2, 2, 2, 0] },
    { name: "B Major", fingering: [null, 2, 4, 4, 4, 2] },

    // Minor Chords
    { name: "Cm", fingering: [null, 3, 5, 5, 4, 3] },
    { name: "Dm", fingering: [null, null, 0, 2, 3, 1] },
    { name: "Em", fingering: [0, 2, 2, 0, 0, 0] },
    { name: "Fm", fingering: [1, 3, 3, 1, 1, 1] },
    { name: "Gm", fingering: [3, 5, 5, 3, 3, 3] },
    { name: "Am", fingering: [null, 0, 2, 2, 1, 0] },
    { name: "Bm", fingering: [null, 2, 4, 4, 3, 2] }
];

if (typeof window !== 'undefined') {
    window.ChordDB = ChordDB;
}

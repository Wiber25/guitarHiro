/**
 * Chord Database
 * Structure: { Root: { Type: [String6, String5, String4, String3, String2, String1] } }
 * null = muted, number = fret
 */
const ChordDB = {
    "C": {
        "Major": [null, 3, 2, 0, 1, 0],
        "Minor": [null, 3, 5, 5, 4, 3],
        "7": [null, 3, 2, 3, 1, 0],
        "dim7": [null, null, 1, 2, 1, 2],
        "aug7": [null, 3, 2, 3, 1, 4], // Caug7
        "mM7": [null, 3, 5, 4, 4, 3],
        "m7b5": [null, 3, 4, 3, 4, null]
    },
    "C#": {
        "Major": [null, 4, 3, 1, 2, 1],
        "Minor": [null, 4, 6, 6, 5, 4],
        "7": [null, 4, 3, 4, 2, 1], // Db7ish
        "dim7": [null, null, 2, 3, 2, 3],
        "aug7": [null, 4, 3, 4, 2, 4],
        "mM7": [null, 4, 6, 5, 5, 4],
        "m7b5": [null, 4, 5, 4, 5, null]
    },
    "D": {
        "Major": [null, null, 0, 2, 3, 2],
        "Minor": [null, null, 0, 2, 3, 1],
        "7": [null, null, 0, 2, 1, 2],
        "dim7": [null, null, 0, 1, 0, 1],
        "aug7": [null, null, 0, 3, 1, 2],
        "mM7": [null, null, 0, 2, 2, 1],
        "m7b5": [null, null, 0, 1, 1, 1]
    },
    "D#": {
        "Major": [null, 6, 5, 3, 4, 3],
        "Minor": [null, 6, 8, 8, 7, 6],
        "7": [null, 6, 5, 6, 4, 3],
        "dim7": [null, null, 1, 2, 1, 2], // Same shape moved? No, D#dim7 = D# F# A C
        "aug7": [null, 6, 5, 6, 4, 7],
        "mM7": [null, 6, 8, 7, 7, 6],
        "m7b5": [null, 6, 7, 6, 7, null]
    },
    "E": {
        "Major": [0, 2, 2, 1, 0, 0],
        "Minor": [0, 2, 2, 0, 0, 0],
        "7": [0, 2, 0, 1, 0, 0],
        "dim7": [null, null, 2, 3, 2, 3], // Edim7
        "aug7": [0, 3, 0, 1, 3, 0],
        "mM7": [0, 2, 1, 0, 0, 0],
        "m7b5": [0, 1, 2, 0, 3, null]
    },
    "F": {
        "Major": [1, 3, 3, 2, 1, 1],
        "Minor": [1, 3, 3, 1, 1, 1],
        "7": [1, 3, 1, 2, 1, 1],
        "dim7": [null, null, 3, 4, 3, 4],
        "aug7": [null, null, 3, 6, 4, 5],
        "mM7": [null, null, 3, 5, 5, 4],
        "m7b5": [1, null, 1, 1, 0, null]
    },
    "F#": {
        "Major": [2, 4, 4, 3, 2, 2],
        "Minor": [2, 4, 4, 2, 2, 2],
        "7": [2, 4, 2, 3, 2, 2],
        "dim7": [null, null, 4, 5, 4, 5],
        "aug7": [2, 5, 2, 3, 2, 2],
        "mM7": [2, 4, 3, 2, 2, 2],
        "m7b5": [2, null, 2, 2, 1, null]
    },
    "G": {
        "Major": [3, 2, 0, 0, 0, 3],
        "Minor": [3, 5, 5, 3, 3, 3],
        "7": [3, 2, 0, 0, 0, 1],
        "dim7": [null, null, 5, 6, 5, 6],
        "aug7": [3, 2, 1, 0, 0, 3], // Gaug7?
        "mM7": [3, 5, 4, 3, 3, 3],
        "m7b5": [3, null, 3, 3, 2, null]
    },
    "G#": {
        "Major": [4, 6, 6, 5, 4, 4],
        "Minor": [4, 6, 6, 4, 4, 4],
        "7": [4, 6, 4, 5, 4, 4],
        "dim7": [null, null, 6, 7, 6, 7],
        "aug7": [4, 7, 4, 5, 4, 4],
        "mM7": [4, 6, 5, 4, 4, 4],
        "m7b5": [4, null, 4, 4, 3, null]
    },
    "A": {
        "Major": [null, 0, 2, 2, 2, 0],
        "Minor": [null, 0, 2, 2, 1, 0],
        "7": [null, 0, 2, 0, 2, 0],
        "dim7": [null, null, 1, 2, 1, 2], // Adim7
        "aug7": [null, 0, 3, 0, 2, 1],
        "mM7": [null, 0, 2, 1, 2, 0],
        "m7b5": [null, 0, 1, 0, 1, null]
    },
    "A#": {
        "Major": [null, 1, 3, 3, 3, 1],
        "Minor": [null, 1, 3, 3, 2, 1],
        "7": [null, 1, 3, 1, 3, 1],
        "dim7": [null, null, 2, 3, 2, 3],
        "aug7": [null, 1, 4, 1, 3, 2],
        "mM7": [null, 1, 3, 2, 3, 1],
        "m7b5": [null, 1, 2, 1, 2, 1]
    },
    "B": {
        "Major": [null, 2, 4, 4, 4, 2],
        "Minor": [null, 2, 4, 4, 3, 2],
        "7": [null, 2, 1, 2, 0, 2],
        "dim7": [null, 2, 0, 1, 0, 1],
        "aug7": [null, 2, 5, 2, 4, 3],
        "mM7": [null, 2, 4, 3, 4, 2],
        "m7b5": [null, 2, 3, 2, 3, null]
    }
};

if (typeof window !== 'undefined') {
    window.ChordDB = ChordDB;
}

/**
 * QuizModule - Handles quiz logic and scoring
 */
const QuizModule = {
    currentMode: null, // 'audio' or 'fingering'
    score: 0,
    currentQuestion: null,
    isQuizActive: false,

    init() {
        console.log("Quiz Module Initialized");
    },

    startQuiz(mode) {
        if (!window.ChordDB) return;
        this.currentMode = mode;
        this.score = 0;
        this.isQuizActive = true;
        return this.nextQuestion();
    },

    nextQuestion() {
        if (!this.isQuizActive) return null;

        // Flatten ChordDB partially or pick Random Root -> Random Type
        const roots = Object.keys(ChordDB);
        const randomRoot = roots[Math.floor(Math.random() * roots.length)];

        const types = Object.keys(ChordDB[randomRoot]);
        const randomType = types[Math.floor(Math.random() * types.length)];

        const chordFingering = ChordDB[randomRoot][randomType];
        const chordName = `${randomRoot} ${randomType}`;

        // Generate options (for audio quiz)
        const options = [];
        if (this.currentMode === 'audio') {
            options.push(chordName); // Correct answer
            while (options.length < 4) {
                const rRoot = roots[Math.floor(Math.random() * roots.length)];
                const rTypes = Object.keys(ChordDB[rRoot]);
                const rType = rTypes[Math.floor(Math.random() * rTypes.length)];
                const rName = `${rRoot} ${rType}`;

                if (!options.includes(rName)) {
                    options.push(rName);
                }
            }
            // Shuffle options
            options.sort(() => Math.random() - 0.5);
        }

        this.currentQuestion = {
            chord: {
                name: chordName,
                fingering: chordFingering
            },
            options: options
        };

        return this.currentQuestion;
    },

    checkAnswer(answer) {
        if (!this.currentQuestion) return false;

        let isCorrect = false;

        if (this.currentMode === 'audio') {
            // Answer is string (chord name)
            isCorrect = (answer === this.currentQuestion.chord.name);
        } else if (this.currentMode === 'fingering') {
            // Answer is array of numbers (fingering)
            // Compare arrays
            const target = this.currentQuestion.chord.fingering;
            // answer should be [fret, fret, ...]
            if (JSON.stringify(answer) === JSON.stringify(target)) {
                isCorrect = true;
            }
        }

        if (isCorrect) {
            this.score += 10;
        }

        return isCorrect;
    },

    stopQuiz() {
        this.isQuizActive = false;
        this.currentQuestion = null;
    }
};

if (typeof window !== 'undefined') {
    window.QuizModule = QuizModule;
}

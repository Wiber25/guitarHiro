document.addEventListener('DOMContentLoaded', () => {
    console.log('ChordMaster Pro Popup Loaded');

    // Initialize Modules
    if (window.GuitarEngine) {
        GuitarEngine.init();
        console.log('Guitar Engine Initialized');
    }

    // UI Elements
    const container = document.getElementById('fretboard-container');
    const strumBtn = document.getElementById('test-strum-btn');
    const eStringBtn = document.getElementById('test-e-string-btn');
    const statusDisplay = document.getElementById('status-display');

    /**
     * Render SVG Fretboard
     */
    /**
     * Render SVG Fretboard
     * @param {Array<number|null>} activeNotes - Array of 6 values representing fret positions (index 0=Low E)
     */
    function renderFretboard(activeNotes = []) {
        if (!container) return;

        container.innerHTML = '';
        const strings = 6;
        const frets = 12; // 0 to 12
        const width = container.clientWidth || 360;
        const height = 220;
        const padding = { top: 20, bottom: 20, left: 30, right: 10 };

        // Calculate spacing
        const stringSpacing = (height - padding.top - padding.bottom) / (strings - 1);
        const fretWidth = (width - padding.left - padding.right) / frets;

        // Create SVG Namespace
        const svgNS = "http://www.w3.org/2000/svg";
        const svg = document.createElementNS(svgNS, "svg");
        svg.setAttribute("class", "fretboard-svg");
        svg.setAttribute("viewBox", `0 0 ${width} ${height}`);

        // 1. Draw Frets (Vertical lines)
        for (let f = 0; f <= frets; f++) {
            const x = padding.left + (f * fretWidth);
            // Nut (Fret 0) is thicker
            const line = document.createElementNS(svgNS, "line");
            line.setAttribute("x1", x);
            line.setAttribute("y1", padding.top);
            line.setAttribute("x2", x);
            line.setAttribute("y2", height - padding.bottom);
            line.setAttribute("class", f === 0 ? "nut" : "fret-line");
            svg.appendChild(line);

            // Fret Numbers
            if (f > 0) {
                const text = document.createElementNS(svgNS, "text");
                text.setAttribute("x", x - (fretWidth / 2));
                text.setAttribute("y", height - 5);
                text.setAttribute("fill", "#666");
                text.setAttribute("font-size", "10");
                text.setAttribute("text-anchor", "middle");
                text.textContent = f;
                svg.appendChild(text);
            }
        }

        // 2. Draw Inlays (Single dots at 3, 5, 7, 9, Double at 12)
        [3, 5, 7, 9, 12].forEach(f => {
            const x = padding.left + (f * fretWidth) - (fretWidth / 2);
            const y = height / 2;
            if (f === 12) {
                [y - 15, y + 15].forEach(dy => {
                    const circle = document.createElementNS(svgNS, "circle");
                    circle.setAttribute("cx", x);
                    circle.setAttribute("cy", dy);
                    circle.setAttribute("r", 4);
                    circle.setAttribute("class", "inlay");
                    svg.appendChild(circle);
                });
            } else {
                const circle = document.createElementNS(svgNS, "circle");
                circle.setAttribute("cx", x);
                circle.setAttribute("cy", y);
                circle.setAttribute("r", 4);
                circle.setAttribute("class", "inlay");
                svg.appendChild(circle);
            }
        });

        // 3. Draw Strings (Horizontal lines)
        for (let i = 0; i < strings; i++) {
            const y = padding.top + (i * stringSpacing);
            const stringIndex = 5 - i; // 5=High E(top visual), 0=Low E(bottom visual)

            // String Line
            const line = document.createElementNS(svgNS, "line");
            line.setAttribute("x1", padding.left);
            line.setAttribute("y1", y);
            line.setAttribute("x2", width - padding.right);
            line.setAttribute("y2", y);
            line.setAttribute("class", "string");
            line.setAttribute("stroke-width", 1 + (i * 0.4));
            svg.appendChild(line);

            // Active Note Marker handling
            // activeNotes maps to stringIndex [LowE, A, D, G, B, HighE]
            // We are iterating strings 0->5 (Visual Top->Bottom, HighE->LowE)
            // So stringIndex is correct for Engine (5,4,3,2,1,0).
            // Check if this string has an active note in activeNotes
            const activeFret = activeNotes[stringIndex];

            if (activeFret !== undefined && activeFret !== null && activeFret !== -1) {
                // Determine X position
                let markerX;
                if (activeFret === 0) {
                    markerX = padding.left / 2; // Open string mark, maybe left of nut
                } else {
                    markerX = padding.left + ((activeFret - 1) * fretWidth) + (fretWidth / 2);
                }

                const circle = document.createElementNS(svgNS, "circle");
                circle.setAttribute("cx", markerX);
                circle.setAttribute("cy", y);
                circle.setAttribute("r", 7);
                circle.setAttribute("fill", "var(--accent-color)"); // Persistent marker
                circle.setAttribute("stroke", "white");
                circle.setAttribute("stroke-width", "2");
                svg.appendChild(circle);

                // Muted strings? (If activeNotes has null, we usually don't draw anything, or draw X?)
                // Current logic: null means nothing drawn.
            }

            // Click Areas
            // Open String
            const hitZero = document.createElementNS(svgNS, "rect");
            hitZero.setAttribute("x", 0);
            hitZero.setAttribute("y", y - (stringSpacing / 2));
            hitZero.setAttribute("width", padding.left);
            hitZero.setAttribute("height", stringSpacing);
            hitZero.setAttribute("class", "string-hover-area");
            hitZero.onclick = () => handleNoteClick(stringIndex, 0, padding.left - 10, y);
            svg.appendChild(hitZero);

            // Frets 1-12
            for (let f = 1; f <= frets; f++) {
                const fx = padding.left + ((f - 1) * fretWidth);
                const hit = document.createElementNS(svgNS, "rect");
                hit.setAttribute("x", fx);
                hit.setAttribute("y", y - (stringSpacing / 2));
                hit.setAttribute("width", fretWidth);
                hit.setAttribute("height", stringSpacing);
                hit.setAttribute("class", "string-hover-area");
                hit.onclick = () => handleNoteClick(stringIndex, f, fx + (fretWidth / 2), y);
                svg.appendChild(hit);
            }
        }

        container.appendChild(svg);
    }

    function handleNoteClick(stringIndex, fret, x, y) {
        // Play sound
        if (window.GuitarEngine) {
            GuitarEngine.playString(stringIndex, fret);
        }

        // Visual Feedback
        showVisualFeedback(x, y, fret);

        // Update Status
        statusDisplay.textContent = `Played: String ${stringIndex + 1} | Fret ${fret}`;
    }

    function showVisualFeedback(x, y, label) {
        const svg = container.querySelector('svg');
        const svgNS = "http://www.w3.org/2000/svg";

        // Create group for note indicator
        const g = document.createElementNS(svgNS, "g");

        const circle = document.createElementNS(svgNS, "circle");
        circle.setAttribute("cx", x);
        circle.setAttribute("cy", y);
        circle.setAttribute("r", 8);
        circle.setAttribute("class", "active-note-circle");

        const text = document.createElementNS(svgNS, "text");
        text.setAttribute("x", x);
        text.setAttribute("y", y);
        text.setAttribute("dy", "0.3em");
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("class", "active-note-text");
        text.textContent = label;

        g.appendChild(circle);
        g.appendChild(text);
        svg.appendChild(g);

        // Remove after animation
        setTimeout(() => {
            g.remove();
        }, 500);
    }

    // Initial Render
    renderFretboard();

    // Event Listeners
    if (strumBtn) {
        strumBtn.remove(); // Remove old test button
    }
    if (eStringBtn) {
        eStringBtn.remove(); // Remove old test button
    }

    const chordSelector = document.getElementById('chord-selector');
    const playChordBtn = document.getElementById('play-chord-btn');

    // Populate Chord Selector
    if (window.ChordDB && chordSelector) {
        ChordDB.forEach((chord, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.textContent = chord.name;
            chordSelector.appendChild(option);
        });

        chordSelector.addEventListener('change', (e) => {
            const index = e.target.value;
            const chord = ChordDB[index];
            if (chord) {
                statusDisplay.textContent = `Selected: ${chord.name}`;
                renderFretboard(chord.fingering);
                // Optional: Auto-play when selected?
                // GuitarEngine.strum(chord.fingering);
            }
        });
    }

    if (playChordBtn) {
        playChordBtn.addEventListener('click', () => {
            const index = chordSelector.value;
            if (index !== "" && window.ChordDB) {
                const chord = ChordDB[index];
                if (chord) {
                    statusDisplay.textContent = `Playing: ${chord.name}`;
                    GuitarEngine.strum(chord.fingering);
                }
            } else {
                statusDisplay.textContent = "Select a chord first!";
            }
        });
    }
});

/*
Gal. Eden
© 2026 ふる. This file is part of this project.
*/

// Data/mechanics.js
//  問題データ - 科学史　- 力学 (Mechanics)

if (!window.GenProblems) {
    window.GenProblems = {};
}

const mechanics = [

    // Galileo Galilei に関する問題
    {
        q: "In what year was Galileo born?",
        choices: ["1543", "1564", "1609", "1687"],
        answer: 1,
        explanation: "1564 was also the birth year of Shakespeare.",
        difficulty: "easy"
    },
    {
        q: "What model of the universe did Galileo support?",
        choices: ["Geocentric", "Heliocentric", "Flat Earth", "Dual-sphere"],
        answer: 1,
        explanation: "He supported the Sun-centered model.",
        difficulty: "easy"
    },
    {
        q: "Which planet’s moons did Galileo observe in 1610?",
        choices: ["Mars", "Jupiter", "Saturn", "Venus"],
        answer: 1,
        explanation: "Galileo discovered four major moons of Jupiter, now called the Galilean moons.",
        difficulty: "easy"
    },
    {
        q: "In which year did Galileo publish 'Two New Sciences'?",
        choices: ["1610", "1623", "1632", "1638"],
        answer: 3,
        explanation: "'Two New Sciences' (1638) summarized his work on kinematics and strength of materials.",
        difficulty: "normal"
    },
    {
        q: "What principle did Galileo propose about falling bodies?",
        choices: [
            "Heavier objects fall faster",
            "Objects fall at the same rate in a vacuum",
            "Objects float without air",
            "Speed depends on shape only"
        ],
        answer: 1,
        explanation: "Galileo argued that without air resistance, all bodies fall with the same acceleration.",
        difficulty: "easy"
    },
    {
        q: "According to Galileo, how does distance fallen relate to time?",
        choices: [
            "Distance is proportional to time",
            "Distance is proportional to time squared",
            "Distance is proportional to mass",
            "Distance is constant"
        ],
        answer: 1,
        explanation: "Galileo showed that falling distance increases with the square of time (d ∝ t²).",
        difficulty: "normal"
    },
    {
        q: "Which concept did Galileo help develop that later became Newton’s First Law?",
        choices: [
            "Universal gravitation",
            "Relativity",
            "Inertia",
            "Thermodynamics"
        ],
        answer: 2,
        explanation: "Galileo proposed that motion continues unless disturbed — an early concept of inertia.",
        difficulty: "normal"
    },
    {
        q: "What did Galileo discover about projectiles?",
        choices: [
            "They move in straight lines only",
            "They follow circular paths",
            "They follow parabolic paths",
            "They stop immediately without force"
        ],
        answer: 2,
        explanation: "Galileo demonstrated that projectile motion forms a parabola.",
        difficulty: "normal"
    },
    {
        q: "What experimental method did Galileo use to study acceleration?",
        choices: [
            "Vacuum chambers",
            "Inclined planes",
            "Water clocks in rivers",
            "Astronomical telescopes"
        ],
        answer: 1,
        explanation: "Galileo used inclined planes to slow motion and measure acceleration more precisely.",
        difficulty: "easy"
    },
    {
        q: "In what year did Galileo publish 'Sidereus Nuncius'?",
        choices: ["1609", "1610", "1620", "1638"],
        answer: 1,
        explanation: "Published in 1610, it reported discoveries like Jupiter’s moons.",
        difficulty: "easy"
    },

    {
        q: "Which mathematical relationship did Galileo establish for uniformly accelerated motion?",
        choices: [
            "v ∝ t²",
            "d ∝ t²",
            "a ∝ d",
            "v ∝ 1/t"
        ],
        answer: 1,
        explanation: "Galileo demonstrated that distance traveled under constant acceleration is proportional to the square of time (d ∝ t²).",
        difficulty: "hard"
    },
    {
        q: "Why were Galileo’s inclined plane experiments important?",
        choices: [
            "They proved Earth is flat",
            "They eliminated friction completely",
            "They allowed precise measurement of slow acceleration",
            "They showed gravity does not exist"
        ],
        answer: 2,
        explanation: "Inclined planes reduced acceleration, making motion slow enough to measure accurately.",
        difficulty: "hard"
    },
    {
        q: "Which of the following ideas directly contradicted Aristotelian physics?",
        choices: [
            "Heavier objects fall faster",
            "Motion requires continuous force",
            "Natural motion is circular",
            "Objects maintain motion without force"
        ],
        answer: 3,
        explanation: "Galileo argued that motion continues without force unless resisted — opposing Aristotle’s idea that force is required to sustain motion.",
        difficulty: "hard"
    },
    {
        q: "Galileo’s work on inertia most directly influenced which scientist?",
        choices: [
            "Johannes Kepler",
            "Isaac Newton",
            "Tycho Brahe",
            "René Descartes"
        ],
        answer: 1,
        explanation: "Newton later formalized inertia as his First Law of Motion.",
        difficulty: "hard"
    },
    {
        q: "What shape results when horizontal uniform motion combines with vertical uniformly accelerated motion?",
        choices: [
            "Circle",
            "Ellipse",
            "Parabola",
            "Hyperbola"
        ],
        answer: 2,
        explanation: "Galileo showed that projectile motion is the combination of constant horizontal velocity and vertical acceleration, forming a parabola.",
        difficulty: "hard"
    },


];

window.GenProblems.mechanics = mechanics;

// ================================
// STUDYHUB - GRADE CALCULATOR
// ================================

function calculateGrade() {
    const scoreInput = document.getElementById("score");
    const gradingSystem = document.getElementById("gradingSystem");
    const result = document.getElementById("gradeResult");

    if (!scoreInput || !gradingSystem || !result) return;

    const score = Number(scoreInput.value);
    const system = gradingSystem.value;

    // Check input
    if (scoreInput.value === "" || isNaN(score)) {
        result.textContent = "Please enter a score.";
        return;
    }

    if (score < 0 || score > 100) {
        result.textContent = "Score must be between 0 and 100.";
        return;
    }

    let grade;

    // General percentage scale
    if (system === "general") {

        if (score >= 80) {
            grade = "A";
        } else if (score >= 70) {
            grade = "B";
        } else if (score >= 60) {
            grade = "C";
        } else if (score >= 50) {
            grade = "D";
        } else if (score >= 40) {
            grade = "E";
        } else {
            grade = "F";
        }

        result.textContent = `General Grade: ${grade}`;

    }

    // Cameroon GCE O/L
    else if (system === "gce-ol") {

        if (score >= 75) {
            grade = "A";
        } else if (score >= 65) {
            grade = "B";
        } else if (score >= 55) {
            grade = "C";
        } else if (score >= 45) {
            grade = "D";
        } else if (score >= 35) {
            grade = "E";
        } else {
            grade = "F";
        }

        result.textContent = `GCE O/L Grade: ${grade}`;

    }

    // Cameroon GCE A/L
    else if (system === "gce-al") {

        if (score >= 75) {
            grade = "A";
        } else if (score >= 65) {
            grade = "B";
        } else if (score >= 55) {
            grade = "C";
        } else if (score >= 45) {
            grade = "D";
        } else if (score >= 35) {
            grade = "E";
        } else {
            grade = "F";
        }

        result.textContent = `GCE A/L Grade: ${grade}`;

    }
}
// ================================
// STUDYHUB - EXAM COUNTDOWN
// ================================

let countdownTimer;

function startCountdown() {
    const examName = document.getElementById("examName");
    const examDate = document.getElementById("examDate");
    const result = document.getElementById("countdownResult");

    if (!examName || !examDate || !result) return;

    const name = examName.value.trim();
    const date = examDate.value;

    if (name === "") {
        result.textContent = "Please enter an exam name.";
        return;
    }

    if (date === "") {
        result.textContent = "Please choose an exam date.";
        return;
    }

    const targetDate = new Date(date).getTime();

    if (isNaN(targetDate)) {
        result.textContent = "Please choose a valid date.";
        return;
    }

    clearInterval(countdownTimer);

    function updateCountdown() {
        const now = new Date().getTime();
        const difference = targetDate - now;

        if (difference <= 0) {
            clearInterval(countdownTimer);

            result.innerHTML = `
                <strong>${name}</strong><br>
                🎉 The exam date has arrived!
            `;

            return;
        }

        const days = Math.floor(
            difference / (1000 * 60 * 60 * 24)
        );

        const hours = Math.floor(
            (difference / (1000 * 60 * 60)) % 24
        );

        const minutes = Math.floor(
            (difference / (1000 * 60)) % 60
        );

        const seconds = Math.floor(
            (difference / 1000) % 60
        );

        result.innerHTML = `
            <strong>${name}</strong><br>
            ${days} Days ·
            ${hours} Hours ·
            ${minutes} Minutes ·
            ${seconds} Seconds
        `;
    }

    updateCountdown();

    countdownTimer = setInterval(
        updateCountdown,
        1000
    );
}
function calculateMagnification() {

    const imageInput = document.getElementById("magnification-image");
    const actualInput = document.getElementById("magnification-actual");
    const magnificationInput = document.getElementById("magnification-value");

    const imageUnit = document.getElementById("magnification-image-unit").value;
    const actualUnit = document.getElementById("magnification-actual-unit").value;

    const calculation = document.getElementById("magnification-calculate").value;
    const result = document.getElementById("magnification-result");

    const image = parseFloat(imageInput.value);
    const actual = parseFloat(actualInput.value);
    const magnification = parseFloat(magnificationInput.value);


    if (calculation === "magnification") {

        if (!image || !actual || image <= 0 || actual <= 0) {
            result.textContent = "Please enter a valid image size and actual size.";
            return;
        }

        let imageInMicrometres = image;
        let actualInMicrometres = actual;

        if (imageUnit === "mm") {
            imageInMicrometres = image * 1000;
        }

        if (actualUnit === "mm") {
            actualInMicrometres = actual * 1000;
        }

        const answer = imageInMicrometres / actualInMicrometres;

        magnificationInput.value = answer;

        result.textContent = "Magnification = ×" + answer;
    }


    else if (calculation === "actual") {

        if (!image || !magnification || image <= 0 || magnification <= 0) {
            result.textContent = "Please enter a valid image size and magnification.";
            return;
        }

        let imageInMicrometres = image;

        if (imageUnit === "mm") {
            imageInMicrometres = image * 1000;
        }

        const answer = imageInMicrometres / magnification;

        actualInput.value = answer;

        result.textContent = "Actual size = " + answer + " μm";
    }


    else if (calculation === "image") {

        if (!actual || !magnification || actual <= 0 || magnification <= 0) {
            result.textContent = "Please enter a valid actual size and magnification.";
            return;
        }

        let actualInMicrometres = actual;

        if (actualUnit === "mm") {
            actualInMicrometres = actual * 1000;
        }

        const answer = actualInMicrometres * magnification;

        imageInput.value = answer;

        result.textContent = "Image size = " + answer + " μm";
    }
}
// ================================
// STUDYHUB - CELL BIOLOGY QUIZ
// ================================

const cellBiologyQuestions = [
    {
        question: "What is the basic structural and functional unit of life?",
        options: ["Tissue", "Cell", "Organ", "Organ system"],
        answer: 1
    },

    {
        question: "Which type of cell has a membrane-bound nucleus?",
        options: ["Prokaryotic cell", "Eukaryotic cell", "Bacterial cell", "None"],
        answer: 1
    },

    {
        question: "Which organelle is mainly responsible for aerobic respiration?",
        options: ["Nucleus", "Ribosome", "Mitochondrion", "Chloroplast"],
        answer: 2
    },

    {
        question: "Which structure controls what enters and leaves a cell?",
        options: ["Cell wall", "Cell membrane", "Vacuole", "Cytoplasm"],
        answer: 1
    },

    {
        question: "Which structure is responsible for photosynthesis in plant cells?",
        options: ["Mitochondrion", "Nucleus", "Chloroplast", "Ribosome"],
        answer: 2
    },

    {
        question: "What is the main function of a root hair cell?",
        options: [
            "Transport oxygen",
            "Absorb water and mineral ions",
            "Produce sperm",
            "Carry out digestion"
        ],
        answer: 1
    },

    {
        question: "Which cell is specialized for transporting oxygen?",
        options: [
            "Root hair cell",
            "Palisade cell",
            "Red blood cell",
            "Guard cell"
        ],
        answer: 2
    },

    {
        question: "What is the formula for magnification?",
        options: [
            "Actual size ÷ Image size",
            "Image size × Actual size",
            "Image size ÷ Actual size",
            "Image size + Actual size"
        ],
        answer: 2
    },

    {
        question: "How many micrometres are in 1 millimetre?",
        options: ["10", "100", "1,000", "10,000"],
        answer: 2
    },

    {
        question: "Which microscope adjustment knob is used for fine focusing?",
        options: [
            "Stage knob",
            "Fine adjustment knob",
            "Light knob",
            "Objective knob"
        ],
        answer: 1
    }
];

let currentQuizQuestion = 0;
let quizScore = 0;
let quizAnswered = false;


function startQuiz() {

    currentQuizQuestion = 0;
    quizScore = 0;
    quizAnswered = false;

    const score = document.getElementById("quiz-score");
    const restart = document.getElementById("quiz-restart");

    if (score) score.textContent = "";
    if (restart) restart.style.display = "none";

    showQuizQuestion();
}


function showQuizQuestion() {

    const questionElement = document.getElementById("quiz-question");
    const optionsElement = document.getElementById("quiz-options");
    const feedbackElement = document.getElementById("quiz-feedback");
    const nextButton = document.getElementById("quiz-next");

    if (!questionElement || !optionsElement) return;

    quizAnswered = false;

    const question = cellBiologyQuestions[currentQuizQuestion];

    questionElement.innerHTML = `
        <h3>
            Question ${currentQuizQuestion + 1}
            of ${cellBiologyQuestions.length}
        </h3>

        <p>
            <strong>${question.question}</strong>
        </p>
    `;

    optionsElement.innerHTML = "";

    question.options.forEach((option, index) => {

        const button = document.createElement("button");

        button.textContent = option;

        button.onclick = function () {
            checkQuizAnswer(index);
        };

        optionsElement.appendChild(button);
    });

    if (feedbackElement) {
        feedbackElement.textContent = "";
    }

    if (nextButton) {
        nextButton.style.display = "none";
    }
}


function checkQuizAnswer(selectedAnswer) {

    if (quizAnswered) return;

    quizAnswered = true;

    const question = cellBiologyQuestions[currentQuizQuestion];

    const feedbackElement = document.getElementById("quiz-feedback");
    const nextButton = document.getElementById("quiz-next");

    if (selectedAnswer === question.answer) {

        quizScore++;

        feedbackElement.textContent =
            "✅ Correct! Well done.";

    } else {

        feedbackElement.textContent =
            "❌ Not quite. The correct answer is: " +
            question.options[question.answer];
    }

    if (nextButton) {
        nextButton.style.display = "block";
    }
}


function nextQuestion() {

    currentQuizQuestion++;

    if (currentQuizQuestion >= cellBiologyQuestions.length) {

        finishQuiz();

    } else {

        showQuizQuestion();
    }
}


function finishQuiz() {

    const questionElement = document.getElementById("quiz-question");
    const optionsElement = document.getElementById("quiz-options");
    const feedbackElement = document.getElementById("quiz-feedback");
    const nextButton = document.getElementById("quiz-next");
    const scoreElement = document.getElementById("quiz-score");
    const restartButton = document.getElementById("quiz-restart");

    if (questionElement) {
        questionElement.innerHTML = `
            <h3>🎉 Quiz Complete!</h3>
        `;
    }

    if (optionsElement) {
        optionsElement.innerHTML = "";
    }

    if (feedbackElement) {
        feedbackElement.textContent = "";
    }

    if (nextButton) {
        nextButton.style.display = "none";
    }

    if (scoreElement) {
        scoreElement.textContent =
            `Your Score: ${quizScore}/${cellBiologyQuestions.length}`;
    }

    if (restartButton) {
        restartButton.style.display = "block";
    }
}


// Start the quiz when the Cell Biology page loads

if (document.getElementById("quiz-question")) {
    startQuiz();
}
// =====================================================
// STUDYHUB — CELL BIOLOGY & MICROSCOPY QUIZ
// =====================================================

const cellBiologyQuestions = [

    {
        question: "What is a cell?",
        options: [
            "The basic structural and functional unit of life",
            "A group of organs",
            "A type of tissue",
            "A chemical substance"
        ],
        answer: 0
    },

    {
        question: "Which statement is part of cell theory?",
        options: [
            "All cells contain chloroplasts",
            "All living organisms are made of one or more cells",
            "All cells have a cell wall",
            "All cells are the same size"
        ],
        answer: 1
    },

    {
        question: "What is a unicellular organism?",
        options: [
            "An organism made of many tissues",
            "An organism made of many organs",
            "An organism consisting of one cell",
            "An organism without cells"
        ],
        answer: 2
    },

    {
        question: "Which organism is prokaryotic?",
        options: [
            "Human",
            "Maize plant",
            "Bacterium",
            "Mushroom"
        ],
        answer: 2
    },

    {
        question: "Which structure contains the genetic material in a typical eukaryotic cell?",
        options: [
            "Vacuole",
            "Nucleus",
            "Ribosome",
            "Cell wall"
        ],
        answer: 1
    },

    {
        question: "What is the main function of mitochondria?",
        options: [
            "Photosynthesis",
            "Protein synthesis",
            "Aerobic respiration and energy release",
            "Controlling substances entering the cell"
        ],
        answer: 2
    },

    {
        question: "What is the function of ribosomes?",
        options: [
            "Protein synthesis",
            "Photosynthesis",
            "Storage of cell sap",
            "Cell movement"
        ],
        answer: 0
    },

    {
        question: "Which structure is present in plant cells but absent from typical animal cells?",
        options: [
            "Nucleus",
            "Cytoplasm",
            "Cell wall",
            "Cell membrane"
        ],
        answer: 2
    },

    {
        question: "What is the main function of chloroplasts?",
        options: [
            "Aerobic respiration",
            "Photosynthesis",
            "Protein synthesis",
            "Cell division"
        ],
        answer: 1
    },

    {
        question: "What is the function of the cell membrane?",
        options: [
            "Controls movement of substances into and out of the cell",
            "Produces chlorophyll",
            "Stores genetic material",
            "Produces antibodies"
        ],
        answer: 0
    },

    {
        question: "Which structure provides support to a plant cell?",
        options: [
            "Cell wall",
            "Ribosome",
            "Nucleus",
            "Cytoplasm"
        ],
        answer: 0
    },

    {
        question: "What does the large permanent vacuole of a plant cell contain?",
        options: [
            "Haemoglobin",
            "Cell sap",
            "DNA only",
            "Chlorophyll only"
        ],
        answer: 1
    },

    {
        question: "Which structure is found in both typical plant and animal cells?",
        options: [
            "Cell wall",
            "Chloroplast",
            "Cell membrane",
            "Large permanent vacuole"
        ],
        answer: 2
    },

    {
        question: "What is a specialized cell?",
        options: [
            "A cell adapted to perform a particular function",
            "A cell that cannot reproduce",
            "A cell without a nucleus",
            "A dead cell"
        ],
        answer: 0
    },

    {
        question: "What is the main function of a root hair cell?",
        options: [
            "Transport oxygen",
            "Absorb water and mineral ions",
            "Carry out nerve impulses",
            "Produce sperm"
        ],
        answer: 1
    },

    {
        question: "Why does a root hair cell have a long extension?",
        options: [
            "To reduce surface area",
            "To increase surface area for absorption",
            "To store starch",
            "To produce oxygen"
        ],
        answer: 1
    },

    {
        question: "Why do palisade cells contain many chloroplasts?",
        options: [
            "To increase photosynthesis",
            "To store genetic material",
            "To absorb mineral ions",
            "To transport blood"
        ],
        answer: 0
    },

    {
        question: "What is the function of guard cells?",
        options: [
            "Control the opening and closing of stomata",
            "Transport oxygen",
            "Digest food",
            "Produce red blood cells"
        ],
        answer: 0
    },

    {
        question: "Which feature of a red blood cell helps it transport oxygen efficiently?",
        options: [
            "Large permanent vacuole",
            "Biconcave shape",
            "Cell wall",
            "Chloroplasts"
        ],
        answer: 1
    },

    {
        question: "What substance in red blood cells combines with oxygen?",
        options: [
            "Chlorophyll",
            "Cellulose",
            "Haemoglobin",
            "Starch"
        ],
        answer: 2
    },

    {
        question: "Which structure allows a sperm cell to move?",
        options: [
            "Flagellum",
            "Cell wall",
            "Vacuole",
            "Chloroplast"
        ],
        answer: 0
    },

    {
        question: "Why does a sperm cell contain many mitochondria?",
        options: [
            "To produce energy for movement",
            "To store water",
            "To make chlorophyll",
            "To absorb minerals"
        ],
        answer: 0
    },

    {
        question: "What is the main purpose of a microscope?",
        options: [
            "To make small objects appear larger",
            "To change cells into tissues",
            "To produce food",
            "To measure temperature"
        ],
        answer: 0
    },

    {
        question: "Which microscope part is used to view the specimen?",
        options: [
            "Stage",
            "Eyepiece lens",
            "Stage clip",
            "Diaphragm"
        ],
        answer: 1
    },

    {
        question: "What is the function of the stage?",
        options: [
            "Supports the microscope slide",
            "Produces DNA",
            "Controls cell division",
            "Magnifies the specimen"
        ],
        answer: 0
    },

    {
        question: "What is the function of the stage clips?",
        options: [
            "Hold the slide in position",
            "Produce light",
            "Magnify the specimen",
            "Control respiration"
        ],
        answer: 0
    },

    {
        question: "What is the function of the diaphragm?",
        options: [
            "Controls the amount of light passing through the specimen",
            "Holds the slide",
            "Stores the specimen",
            "Produces the image"
        ],
        answer: 0
    },

    {
        question: "Which adjustment knob makes large focusing adjustments?",
        options: [
            "Fine adjustment knob",
            "Coarse adjustment knob",
            "Diaphragm",
            "Stage clip"
        ],
        answer: 1
    },

    {
        question: "Which adjustment knob is used for fine focusing?",
        options: [
            "Coarse adjustment knob",
            "Fine adjustment knob",
            "Stage",
            "Eyepiece"
        ],
        answer: 1
    },

    {
        question: "Which objective lens should normally be used first?",
        options: [
            "Highest-power objective",
            "Lowest-power objective",
            "No objective",
            "Oil-immersion objective"
        ],
        answer: 1
    },

    {
        question: "Which is a rule for a good biological drawing?",
        options: [
            "Use heavy shading",
            "Use clear single lines",
            "Draw decorative details",
            "Use many colours"
        ],
        answer: 1
    },

    {
        question: "What should biological drawings represent?",
        options: [
            "An artistic version of the specimen",
            "What is actually observed",
            "An imaginary specimen",
            "Only the largest structure"
        ],
        answer: 1
    },

    {
        question: "What is the formula for magnification?",
        options: [
            "Actual size ÷ image size",
            "Image size ÷ actual size",
            "Image size × actual size",
            "Image size + actual size"
        ],
        answer: 1
    },

    {
        question: "What is 1 mm equal to?",
        options: [
            "10 μm",
            "100 μm",
            "1,000 μm",
            "10,000 μm"
        ],
        answer: 2
    },

    {
        question: "What is 1 μm equal to?",
        options: [
            "10 nm",
            "100 nm",
            "1,000 nm",
            "10,000 nm"
        ],
        answer: 2
    },

    {
        question: "An image is 5 mm long and the actual specimen is 25 μm long. What is the magnification?",
        options: [
            "20×",
            "100×",
            "200×",
            "500×"
        ],
        answer: 2
    },

    {
        question: "Why must units be converted before some magnification calculations?",
        options: [
            "To make the specimen larger",
            "Because the units must be compatible",
            "To change the magnification",
            "Because microscopes only use millimetres"
        ],
        answer: 1
    },

    {
        question: "Which sequence represents increasing biological organization?",
        options: [
            "Organ → cell → tissue → organism",
            "Cell → tissue → organ → organ system → organism",
            "Tissue → cell → organ → organism",
            "Organism → organ → tissue → cell"
        ],
        answer: 1
    },

    {
        question: "Which statement correctly describes a tissue?",
        options: [
            "A group of similar cells working together",
            "A single organelle",
            "A complete organism",
            "A group of unrelated organisms"
        ],
        answer: 0
    },

    {
        question: "Which statement best distinguishes eukaryotic cells from prokaryotic cells?",
        options: [
            "Eukaryotic cells have no DNA",
            "Eukaryotic cells have a membrane-bound nucleus",
            "Prokaryotic cells have chloroplasts",
            "Prokaryotic cells are always multicellular"
        ],
        answer: 1
    },

    {
        question: "Where is the DNA of a prokaryotic cell mainly located?",
        options: [
            "Inside a membrane-bound nucleus",
            "In the nucleoid region",
            "Inside a chloroplast",
            "Inside a vacuole"
        ],
        answer: 1
    },

    {
        question: "Which structure is NOT a membrane-bound organelle?",
        options: [
            "Nucleus",
            "Mitochondrion",
            "Chloroplast",
            "Ribosome"
        ],
        answer: 3
    },

    {
        question: "Which organelle is mainly responsible for controlling the activities of a eukaryotic cell?",
        options: [
            "Nucleus",
            "Ribosome",
            "Vacuole",
            "Cell wall"
        ],
        answer: 0
    },

    {
        question: "Why is the cell membrane important?",
        options: [
            "It is completely impermeable to all substances",
            "It helps control substances entering and leaving the cell",
            "It produces all the cell's energy",
            "It contains chlorophyll"
        ],
        answer: 1
    },

    {
        question: "Which structure helps a plant cell maintain turgidity?",
        options: [
            "Large permanent vacuole",
            "Ribosome",
            "Nucleus",
            "Centromere"
        ],
        answer: 0
    },

    {
        question: "Which structure contains chlorophyll?",
        options: [
            "Mitochondrion",
            "Chloroplast",
            "Nucleus",
            "Ribosome"
        ],
        answer: 1
    },

    {
        question: "Why is a biological drawing normally made large enough?",
        options: [
            "To make the specimen look artistic",
            "To show important structures clearly",
            "To change its magnification",
            "To hide structures"
        ],
        answer: 1
    },

    {
        question: "Which equation can be used to calculate actual size?",
        options: [
            "Actual size = image size × magnification",
            "Actual size = image size ÷ magnification",
            "Actual size = magnification ÷ image size",
            "Actual size = image size + magnification"
        ],
        answer: 1
    },

    {
        question: "Which equation can be used to calculate image size?",
        options: [
            "Image size = actual size × magnification",
            "Image size = actual size ÷ magnification",
            "Image size = magnification ÷ actual size",
            "Image size = actual size + magnification"
        ],
        answer: 0
    }

];


// =====================================================
// QUIZ VARIABLES
// =====================================================

let cellQuizQuestions = [];
let cellQuizCurrent = 0;
let cellQuizScore = 0;
let cellQuizTotal = 10;


// =====================================================
// START QUIZ
// =====================================================

function startCellQuiz(numberOfQuestions) {

    cellQuizTotal = numberOfQuestions;

    cellQuizQuestions = [...cellBiologyQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, numberOfQuestions);

    cellQuizCurrent = 0;
    cellQuizScore = 0;

    showCellQuizQuestion();
}


// =====================================================
// SHOW QUESTION
// =====================================================

function showCellQuizQuestion() {

    const quizBox = document.getElementById("cellQuizBox");

    if (!quizBox) return;

    const question = cellQuizQuestions[cellQuizCurrent];

    quizBox.innerHTML = `

        <div class="quiz-progress">
            Question ${cellQuizCurrent + 1} of ${cellQuizTotal}
        </div>

        <h3>
            ${question.question}
        </h3>

        <div class="quiz-options">

            ${question.options.map((option, index) => `

                <button
                    class="quiz-option"
                    onclick="answerCellQuiz(${index})"
                >
                    ${option}
                </button>

            `).join("")}

        </div>

    `;
}


// =====================================================
// ANSWER QUESTION
// =====================================================

function answerCellQuiz(selectedAnswer) {

    const question = cellQuizQuestions[cellQuizCurrent];

    const quizBox = document.getElementById("cellQuizBox");

    const buttons = quizBox.querySelectorAll(".quiz-option");

    buttons.forEach(button => {
        button.disabled = true;
    });


    if (selectedAnswer === question.answer) {

        cellQuizScore++;

        buttons[selectedAnswer].classList.add("correct");

    } else {

        buttons[selectedAnswer].classList.add("wrong");

        buttons[question.answer].classList.add("correct");

    }


    setTimeout(() => {

        cellQuizCurrent++;

        if (cellQuizCurrent < cellQuizTotal) {

            showCellQuizQuestion();

        } else {

            showCellQuizResult();

        }

    }, 700);
}


// =====================================================
// QUIZ RESULT
// =====================================================

function showCellQuizResult() {

    const quizBox = document.getElementById("cellQuizBox");

    if (!quizBox) return;

    const percentage =
        Math.round((cellQuizScore / cellQuizTotal) * 100);

    let message;

    if (percentage >= 80) {

        message = "🔥 Excellent work!";

    } else if (percentage >= 60) {

        message = "👏 Good job! Keep revising.";

    } else if (percentage >= 40) {

        message = "📚 Good attempt. More revision will help.";

    } else {

        message = "💪 Keep studying. You can improve!";

    }


    quizBox.innerHTML = `

        <div class="quiz-result">

            <h2>🎉 Quiz Complete!</h2>

            <p>
                You scored
                <strong>
                    ${cellQuizScore}/${cellQuizTotal}
                </strong>
            </p>

            <p>
                <strong>${percentage}%</strong>
            </p>

            <p>
                ${message}
            </p>

            <button onclick="startCellQuiz(${cellQuizTotal})">
                🔄 Try Again
            </button>

        </div>

    `;
}

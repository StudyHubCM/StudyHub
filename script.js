// =====================================================
// STUDYHUB - GRADE CALCULATOR
// =====================================================

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


// =====================================================
// STUDYHUB - EXAM COUNTDOWN
// =====================================================

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


// =====================================================
// STUDYHUB - MAGNIFICATION CALCULATOR
// =====================================================

function calculateMagnification() {

    const imageInput =
        document.getElementById("magnification-image");

    const actualInput =
        document.getElementById("magnification-actual");

    const magnificationInput =
        document.getElementById("magnification-value");

    const imageUnitElement =
        document.getElementById("magnification-image-unit");

    const actualUnitElement =
        document.getElementById("magnification-actual-unit");

    const calculationElement =
        document.getElementById("magnification-calculate");

    const result =
        document.getElementById("magnification-result");

    if (
        !imageInput ||
        !actualInput ||
        !magnificationInput ||
        !imageUnitElement ||
        !actualUnitElement ||
        !calculationElement ||
        !result
    ) {
        return;
    }

    const imageUnit = imageUnitElement.value;
    const actualUnit = actualUnitElement.value;
    const calculation = calculationElement.value;

    const image = parseFloat(imageInput.value);
    const actual = parseFloat(actualInput.value);
    const magnification = parseFloat(magnificationInput.value);


    // -------------------------------------------------
    // CALCULATE MAGNIFICATION
    // -------------------------------------------------

    if (calculation === "magnification") {

        if (
            isNaN(image) ||
            isNaN(actual) ||
            image <= 0 ||
            actual <= 0
        ) {
            result.textContent =
                "Please enter a valid image size and actual size.";

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

        const answer =
            imageInMicrometres / actualInMicrometres;

        magnificationInput.value =
            Number.isInteger(answer)
                ? answer
                : answer.toFixed(2);

        result.textContent =
            "Magnification = ×" +
            (Number.isInteger(answer)
                ? answer
                : answer.toFixed(2));
    }


    // -------------------------------------------------
    // CALCULATE ACTUAL SIZE
    // -------------------------------------------------

    else if (calculation === "actual") {

        if (
            isNaN(image) ||
            isNaN(magnification) ||
            image <= 0 ||
            magnification <= 0
        ) {
            result.textContent =
                "Please enter a valid image size and magnification.";

            return;
        }

        let imageInMicrometres = image;

        if (imageUnit === "mm") {
            imageInMicrometres = image * 1000;
        }

        const answer =
            imageInMicrometres / magnification;

        actualInput.value =
            Number.isInteger(answer)
                ? answer
                : answer.toFixed(2);

        result.textContent =
            "Actual size = " +
            (Number.isInteger(answer)
                ? answer
                : answer.toFixed(2)) +
            " μm";
    }


    // -------------------------------------------------
    // CALCULATE IMAGE SIZE
    // -------------------------------------------------

    else if (calculation === "image") {

        if (
            isNaN(actual) ||
            isNaN(magnification) ||
            actual <= 0 ||
            magnification <= 0
        ) {
            result.textContent =
                "Please enter a valid actual size and magnification.";

            return;
        }

        let actualInMicrometres = actual;

        if (actualUnit === "mm") {
            actualInMicrometres = actual * 1000;
        }

        const answer =
            actualInMicrometres * magnification;

        imageInput.value =
            Number.isInteger(answer)
                ? answer
                : answer.toFixed(2);

        result.textContent =
            "Image size = " +
            (Number.isInteger(answer)
                ? answer
                : answer.toFixed(2)) +
            " μm";
    }
}


// =====================================================
// STUDYHUB - CELL BIOLOGY QUIZ
// =====================================================
// ONE QUIZ SYSTEM ONLY
// Works with the current cells & microscopy HTML.
// =====================================================

const cellBiologyQuestions = [

    {
        question: "What is the basic structural and functional unit of life?",
        options: [
            "Tissue",
            "Cell",
            "Organ",
            "Organ system"
        ],
        answer: 1
    },

    {
        question: "Which statement is part of cell theory?",
        options: [
            "All cells contain chloroplasts",
            "All living organisms are made of one or more cells",
            "All cells have a cell wall",
            "All cells are visible to the naked eye"
        ],
        answer: 1
    },

    {
        question: "Which type of cell does not have a membrane-bound nucleus?",
        options: [
            "Animal cell",
            "Plant cell",
            "Eukaryotic cell",
            "Prokaryotic cell"
        ],
        answer: 3
    },

    {
        question: "Where is the genetic material found in a typical prokaryotic cell?",
        options: [
            "Nucleoid region",
            "Chloroplast",
            "Vacuole",
            "Golgi apparatus"
        ],
        answer: 0
    },

    {
        question: "Which organelle is the main site of aerobic respiration?",
        options: [
            "Ribosome",
            "Nucleus",
            "Mitochondrion",
            "Chloroplast"
        ],
        answer: 2
    },

    {
        question: "What is the main function of ribosomes?",
        options: [
            "Photosynthesis",
            "Protein synthesis",
            "Aerobic respiration",
            "Storage of cell sap"
        ],
        answer: 1
    },

    {
        question: "Which structure controls the movement of substances into and out of a cell?",
        options: [
            "Cell membrane",
            "Cell wall",
            "Nucleus",
            "Vacuole"
        ],
        answer: 0
    },

    {
        question: "Which structure is present in a typical plant cell but absent from an animal cell?",
        options: [
            "Cytoplasm",
            "Nucleus",
            "Cellulose cell wall",
            "Cell membrane"
        ],
        answer: 2
    },

    {
        question: "What is the main function of chloroplasts?",
        options: [
            "Protein synthesis",
            "Photosynthesis",
            "Cell division",
            "Digestion"
        ],
        answer: 1
    },

    {
        question: "Which structure contains cell sap in a typical plant cell?",
        options: [
            "Large permanent vacuole",
            "Nucleus",
            "Ribosome",
            "Mitochondrion"
        ],
        answer: 0
    },

    {
        question: "Which cell is specialized for absorbing water and mineral ions from the soil?",
        options: [
            "Palisade cell",
            "Root hair cell",
            "Red blood cell",
            "Sperm cell"
        ],
        answer: 1
    },

    {
        question: "Why does a root hair cell have a long extension?",
        options: [
            "To increase surface area for absorption",
            "To produce hormones",
            "To store genetic material",
            "To reduce absorption"
        ],
        answer: 0
    },

    {
        question: "Which specialized cell contains many chloroplasts for photosynthesis?",
        options: [
            "Palisade cell",
            "Red blood cell",
            "Sperm cell",
            "Root hair cell"
        ],
        answer: 0
    },

    {
        question: "What is the function of guard cells?",
        options: [
            "Transport oxygen",
            "Control the opening and closing of stomata",
            "Absorb mineral ions",
            "Produce red blood cells"
        ],
        answer: 1
    },

    {
        question: "Which feature of a mature mammalian red blood cell provides more space for haemoglobin?",
        options: [
            "Presence of a nucleus",
            "Absence of a nucleus",
            "Presence of chloroplasts",
            "Large permanent vacuole"
        ],
        answer: 1
    },

    {
        question: "What is the function of the flagellum of a sperm cell?",
        options: [
            "Store food",
            "Allow movement",
            "Carry oxygen",
            "Produce chlorophyll"
        ],
        answer: 1
    },

    {
        question: "Which microscope part supports the microscope slide?",
        options: [
            "Stage",
            "Eyepiece",
            "Diaphragm",
            "Fine adjustment knob"
        ],
        answer: 0
    },

    {
        question: "What is the function of the eyepiece lens?",
        options: [
            "Hold the slide",
            "Provide the lens through which the specimen is viewed",
            "Control the amount of light",
            "Support the microscope"
        ],
        answer: 1
    },

    {
        question: "What is the function of the coarse adjustment knob?",
        options: [
            "Make large focusing adjustments",
            "Hold the slide",
            "Control light intensity",
            "Produce chlorophyll"
        ],
        answer: 0
    },

    {
        question: "Which microscope part makes small adjustments to obtain a sharper image?",
        options: [
            "Stage",
            "Fine adjustment knob",
            "Eyepiece",
            "Stage clip"
        ],
        answer: 1
    },

    {
        question: "What is the main function of the diaphragm?",
        options: [
            "Control the amount of light passing through the specimen",
            "Magnify the specimen",
            "Hold the slide",
            "Move the specimen"
        ],
        answer: 0
    },

    {
        question: "Which objective lens should normally be used first when focusing a specimen?",
        options: [
            "Highest-power objective",
            "Lowest-power objective",
            "Oil-immersion objective only",
            "No objective lens"
        ],
        answer: 1
    },

    {
        question: "What is magnification?",
        options: [
            "Actual size divided by image size",
            "Image size divided by actual size",
            "Image size multiplied by actual size",
            "Actual size added to image size"
        ],
        answer: 1
    },

    {
        question: "What is the correct formula for calculating actual size?",
        options: [
            "Actual size = image size × magnification",
            "Actual size = image size ÷ magnification",
            "Actual size = magnification ÷ image size",
            "Actual size = image size + magnification"
        ],
        answer: 1
    },

    {
        question: "What is the correct formula for calculating image size?",
        options: [
            "Image size = actual size × magnification",
            "Image size = actual size ÷ magnification",
            "Image size = magnification ÷ actual size",
            "Image size = actual size − magnification"
        ],
        answer: 0
    },

    {
        question: "How many micrometres are in 1 millimetre?",
        options: [
            "10",
            "100",
            "1,000",
            "10,000"
        ],
        answer: 2
    },

    {
        question: "How many nanometres are in 1 micrometre?",
        options: [
            "10",
            "100",
            "1,000",
            "10,000"
        ],
        answer: 2
    },

    {
        question: "A specimen has an actual size of 50 μm and an image size of 10 mm. What is its magnification?",
        options: [
            "20",
            "100",
            "200",
            "500"
        ],
        answer: 2
    },

    {
        question: "Which structure controls the activities of a eukaryotic cell by containing its genetic material?",
        options: [
            "Nucleus",
            "Ribosome",
            "Vacuole",
            "Cell wall"
        ],
        answer: 0
    },

    {
        question: "Which statement correctly compares prokaryotic and eukaryotic cells?",
        options: [
            "Both always have membrane-bound nuclei",
            "Prokaryotic cells have a membrane-bound nucleus",
            "Eukaryotic cells have a membrane-bound nucleus",
            "Eukaryotic cells never contain ribosomes"
        ],
        answer: 2
    },

    {
        question: "Which structure gives a plant cell additional support and helps maintain its shape?",
        options: [
            "Cell wall",
            "Ribosome",
            "Nucleus",
            "Mitochondrion"
        ],
        answer: 0
    },

    {
        question: "Which structure is responsible for many chemical reactions within the cell?",
        options: [
            "Cytoplasm",
            "Cell wall",
            "Capsule",
            "Flagellum"
        ],
        answer: 0
    },

    {
        question: "Which structure is found in both typical plant and animal cells?",
        options: [
            "Cellulose cell wall",
            "Chloroplast",
            "Mitochondrion",
            "Large permanent vacuole"
        ],
        answer: 2
    },

    {
        question: "Which structure is characteristic of many bacteria?",
        options: [
            "Membrane-bound nucleus",
            "Cell wall",
            "Chloroplast",
            "Large permanent central vacuole"
        ],
        answer: 1
    },

    {
        question: "Which cell is adapted to transport oxygen around the body?",
        options: [
            "Red blood cell",
            "Root hair cell",
            "Guard cell",
            "Palisade cell"
        ],
        answer: 0
    },

    {
        question: "Why are red blood cells flexible?",
        options: [
            "To pass through narrow blood vessels",
            "To carry out photosynthesis",
            "To absorb mineral ions",
            "To produce antibodies"
        ],
        answer: 0
    },

    {
        question: "Which structure helps a plant cell remain firm by maintaining internal pressure?",
        options: [
            "Large permanent vacuole",
            "Ribosome",
            "Nucleus",
            "Flagellum"
        ],
        answer: 0
    },

    {
        question: "Which feature of a palisade cell is directly related to absorbing light?",
        options: [
            "Many chloroplasts",
            "Long flagellum",
            "Biconcave shape",
            "Lack of cytoplasm"
        ],
        answer: 0
    },

    {
        question: "Which microscope component holds the slide securely in position?",
        options: [
            "Stage clips",
            "Eyepiece",
            "Objective lens",
            "Diaphragm"
        ],
        answer: 0
    },

    {
        question: "Which of the following is NOT a membrane-bound organelle?",
        options: [
            "Mitochondrion",
            "Chloroplast",
            "Ribosome",
            "Nucleus"
        ],
        answer: 2
    },

    {
        question: "Which statement about biological drawings is correct?",
        options: [
            "They should be heavily shaded",
            "They should represent what is actually observed",
            "They should contain decorative colouring",
            "They should exaggerate structures"
        ],
        answer: 1
    },

    {
        question: "A biological drawing should normally use:",
        options: [
            "Clear single lines",
            "Heavy artistic shading",
            "Multiple coloured effects",
            "Three-dimensional rendering"
        ],
        answer: 0
    },

    {
        question: "Which statement about a specimen's image size is correct?",
        options: [
            "It is always equal to the actual size",
            "It can be larger than the actual specimen when magnified",
            "It must always be smaller than the specimen",
            "It has no relationship with magnification"
        ],
        answer: 1
    },

    {
        question: "A microscope has an eyepiece of ×10 and an objective of ×40. What is the total magnification?",
        options: [
            "×40",
            "×50",
            "×400",
            "×4,000"
        ],
        answer: 2
    },

    {
        question: "Which process allows mineral ions to enter a root hair cell when their concentration is lower in the soil than inside the cell?",
        options: [
            "Active transport",
            "Photosynthesis",
            "Transpiration",
            "Respiration only"
        ],
        answer: 0
    },

    {
        question: "Which feature of a root hair cell provides a large surface area for absorption?",
        options: [
            "Long extension",
            "Thick cellulose wall",
            "Large nucleus",
            "Absence of cytoplasm"
        ],
        answer: 0
    },

    {
        question: "Which organelle contains chlorophyll?",
        options: [
            "Mitochondrion",
            "Chloroplast",
            "Ribosome",
            "Nucleus"
        ],
        answer: 1
    },

    {
        question: "Which structure separates the contents of a cell from its surroundings?",
        options: [
            "Cell membrane",
            "Cell wall only",
            "Nucleus",
            "Vacuole"
        ],
        answer: 0
    },

    {
        question: "Which statement best describes specialized cells?",
        options: [
            "They have adaptations that help them perform particular functions",
            "They all have exactly the same structure",
            "They cannot perform specific functions",
            "They are found only in bacteria"
        ],
        answer: 0
    },

    {
        question: "Which structure is absent from a typical animal cell?",
        options: [
            "Cell membrane",
            "Cytoplasm",
            "Cellulose cell wall",
            "Mitochondria"
        ],
        answer: 2
    },

    {
        question: "Which structure is responsible for protein synthesis?",
        options: [
            "Ribosome",
            "Vacuole",
            "Chloroplast",
            "Cell wall"
        ],
        answer: 0
    },

    {
        question: "Which statement correctly describes the relationship between cell structure and function?",
        options: [
            "Cell structures have no relationship to their functions",
            "Specialized structures can help cells perform particular functions",
            "All cells have identical structures and functions",
            "Only plant cells have specialized structures"
        ],
        answer: 1
    }

];


// =====================================================
// QUIZ VARIABLES
// =====================================================

let cellQuizQuestions = [];
let currentCellQuestion = 0;
let cellQuizScore = 0;


// =====================================================
// START CELL BIOLOGY QUIZ
// =====================================================

function startCellBiologyQuiz() {

    const questionCountElement =
        document.getElementById("quizQuestionCount");

    const quizElement =
        document.getElementById("cellQuiz");

    const finalElement =
        document.getElementById("quizFinal");

    if (
        !questionCountElement ||
        !quizElement ||
        !finalElement
    ) {
        return;
    }

    const requestedCount =
        Number(questionCountElement.value);

    // Never request more questions than exist
    const count =
        Math.min(
            requestedCount,
            cellBiologyQuestions.length
        );

    // Shuffle questions and select requested amount
    cellQuizQuestions =
        [...cellBiologyQuestions]
        .sort(() => Math.random() - 0.5)
        .slice(0, count);

    currentCellQuestion = 0;
    cellQuizScore = 0;

    quizElement.style.display = "block";
    finalElement.style.display = "none";

    showCellQuestion();
}


// =====================================================
// SHOW CELL QUESTION
// =====================================================

function showCellQuestion() {

    const question =
        cellQuizQuestions[currentCellQuestion];

    if (!question) return;

    const progress =
        document.getElementById("quizProgress");

    const score =
        document.getElementById("quizScore");

    const questionElement =
        document.getElementById("quizQuestion");

    const options =
        document.getElementById("quizOptions");

    const feedback =
        document.getElementById("quizFeedback");

    const nextButton =
        document.getElementById("nextQuestionButton");


    if (
        !progress ||
        !score ||
        !questionElement ||
        !options ||
        !feedback ||
        !nextButton
    ) {
        return;
    }


    progress.textContent =
        `Question ${currentCellQuestion + 1} of ${cellQuizQuestions.length}`;

    score.textContent =
        `Score: ${cellQuizScore}`;

    questionElement.textContent =
        question.question;

    options.innerHTML = "";

    feedback.textContent = "";

    nextButton.style.display = "none";


    question.options.forEach(
        (option, index) => {

            const button =
                document.createElement("button");

            button.textContent =
                option;

            button.className =
                "quiz-option";

            button.type = "button";

            button.onclick =
                function () {
                    checkCellAnswer(index);
                };

            options.appendChild(button);
        }
    );
}


// =====================================================
// CHECK ANSWER
// =====================================================

function checkCellAnswer(selectedAnswer) {

    const question =
        cellQuizQuestions[currentCellQuestion];

    if (!question) return;

    const buttons =
        document.querySelectorAll(
            "#quizOptions .quiz-option"
        );

    buttons.forEach(button => {
        button.disabled = true;
    });


    if (selectedAnswer === question.answer) {

        cellQuizScore++;

        document.getElementById(
            "quizFeedback"
        ).textContent =
            "✅ Correct!";

    } else {

        document.getElementById(
            "quizFeedback"
        ).textContent =
            `❌ Not quite. The correct answer is: ${question.options[question.answer]}`;
    }


    document.getElementById(
        "quizScore"
    ).textContent =
        `Score: ${cellQuizScore}`;


    document.getElementById(
        "nextQuestionButton"
    ).style.display =
        "block";
}


// =====================================================
// NEXT QUESTION
// =====================================================

function nextCellQuestion() {

    currentCellQuestion++;

    if (
        currentCellQuestion >=
        cellQuizQuestions.length
    ) {

        finishCellBiologyQuiz();

        return;
    }

    showCellQuestion();
}


// =====================================================
// FINISH QUIZ
// =====================================================

function finishCellBiologyQuiz() {

    const quizElement =
        document.getElementById("cellQuiz");

    const finalElement =
        document.getElementById("quizFinal");

    const finalScore =
        document.getElementById("finalScore");


    if (
        !quizElement ||
        !finalElement ||
        !finalScore
    ) {
        return;
    }


    quizElement.style.display =
        "none";

    finalElement.style.display =
        "block";


    const total =
        cellQuizQuestions.length;

    const percentage =
        total > 0
            ? Math.round(
                (cellQuizScore / total) * 100
            )
            : 0;


    finalScore.innerHTML = `
        You scored
        <strong>
            ${cellQuizScore}/${total}
        </strong>
        (${percentage}%)
    `;
}

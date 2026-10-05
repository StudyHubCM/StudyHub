// =====================================================
// STUDYHUB - MAIN JAVASCRIPT
// =====================================================


// =====================================================
// SHARED HELPERS
// =====================================================

function formatNumber(value) {
    if (!Number.isFinite(value)) {
        return "0";
    }

    if (Number.isInteger(value)) {
        return String(value);
    }

    return value.toFixed(2).replace(/\.?0+$/, "");
}


function setResult(element, message) {
    if (!element) return;

    element.textContent = message;
}


function isValidPositiveNumber(value) {
    return Number.isFinite(value) && value > 0;
}


// =====================================================
// STUDYHUB - GRADE CALCULATOR
// =====================================================

function calculateGrade() {

    const scoreInput = document.getElementById("score");
    const gradingSystem = document.getElementById("gradingSystem");
    const result = document.getElementById("gradeResult");

    if (!scoreInput || !gradingSystem || !result) {
        return;
    }

    const rawScore = scoreInput.value.trim();
    const score = Number(rawScore);
    const system = gradingSystem.value;

    // -------------------------------------------------
    // CHECK INPUT
    // -------------------------------------------------

    if (rawScore === "" || !Number.isFinite(score)) {
        setResult(result, "Please enter a valid score.");
        return;
    }

    if (score < 0 || score > 100) {
        setResult(result, "Score must be between 0 and 100.");
        return;
    }


    // -------------------------------------------------
    // GRADING SCALES
    // -------------------------------------------------

    const gradingScales = {

        // General percentage scale
        general: [
            { min: 80, grade: "A" },
            { min: 70, grade: "B" },
            { min: 60, grade: "C" },
            { min: 50, grade: "D" },
            { min: 40, grade: "E" },
            { min: 0, grade: "F" }
        ],

        // Cameroon GCE O/L
        "gce-ol": [
            { min: 75, grade: "A" },
            { min: 65, grade: "B" },
            { min: 55, grade: "C" },
            { min: 45, grade: "D" },
            { min: 35, grade: "E" },
            { min: 0, grade: "F" }
        ],

        // Cameroon GCE A/L
        "gce-al": [
            { min: 75, grade: "A" },
            { min: 65, grade: "B" },
            { min: 55, grade: "C" },
            { min: 45, grade: "D" },
            { min: 35, grade: "E" },
            { min: 0, grade: "F" }
        ]
    };


    const scale = gradingScales[system];


    // -------------------------------------------------
    // CHECK GRADING SYSTEM
    // -------------------------------------------------

    if (!scale) {
        setResult(result, "Please select a valid grading system.");
        return;
    }


    // -------------------------------------------------
    // FIND GRADE
    // -------------------------------------------------

    const gradeEntry = scale.find(item => score >= item.min);

    if (!gradeEntry) {
        setResult(result, "Unable to calculate grade.");
        return;
    }

    const grade = gradeEntry.grade;


    // -------------------------------------------------
    // DISPLAY RESULT
    // -------------------------------------------------

    const systemNames = {
        general: "General Grade",
        "gce-ol": "GCE O/L Grade",
        "gce-al": "GCE A/L Grade"
    };

    const systemName = systemNames[system];

    setResult(
        result,
        `${systemName}: ${grade}`
    );
}


// =====================================================
// STUDYHUB - EXAM COUNTDOWN
// =====================================================

let countdownTimer = null;


function startCountdown() {

    const examNameInput = document.getElementById("examName");
    const examDateInput = document.getElementById("examDate");
    const result = document.getElementById("countdownResult");

    if (!examNameInput || !examDateInput || !result) {
        return;
    }

    const name = examNameInput.value.trim();
    const date = examDateInput.value;


    // -------------------------------------------------
    // CHECK EXAM NAME
    // -------------------------------------------------

    if (name === "") {
        setResult(result, "Please enter an exam name.");
        return;
    }


    // -------------------------------------------------
    // CHECK DATE
    // -------------------------------------------------

    if (date === "") {
        setResult(result, "Please choose an exam date.");
        return;
    }


    // -------------------------------------------------
    // CREATE LOCAL DATE
    // -------------------------------------------------
    // Using T00:00:00 prevents the browser from treating
    // the date-only value as UTC and causing timezone bugs.
    // -------------------------------------------------

    const targetDate = new Date(`${date}T00:00:00`).getTime();

    if (!Number.isFinite(targetDate)) {
        setResult(result, "Please choose a valid exam date.");
        return;
    }


    // -------------------------------------------------
    // STOP PREVIOUS COUNTDOWN
    // -------------------------------------------------

    if (countdownTimer !== null) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }


    // -------------------------------------------------
    // UPDATE COUNTDOWN
    // -------------------------------------------------

    function updateCountdown() {

        const now = Date.now();
        const difference = targetDate - now;


        // -------------------------------------------------
        // EXAM DATE REACHED
        // -------------------------------------------------

        if (difference <= 0) {

            if (countdownTimer !== null) {
                clearInterval(countdownTimer);
                countdownTimer = null;
            }

            // IMPORTANT:
            // Do NOT use innerHTML with user-entered text.
            // This prevents HTML/script injection.
            result.replaceChildren();

            const nameElement = document.createElement("strong");
            nameElement.textContent = name;

            const messageElement = document.createElement("span");
            messageElement.textContent =
                "🎉 The exam date has arrived!";

            result.appendChild(nameElement);
            result.appendChild(document.createElement("br"));
            result.appendChild(messageElement);

            return;
        }


        // -------------------------------------------------
        // CALCULATE TIME
        // -------------------------------------------------

        const totalSeconds = Math.floor(difference / 1000);

        const days = Math.floor(
            totalSeconds / (60 * 60 * 24)
        );

        const hours = Math.floor(
            (totalSeconds % (60 * 60 * 24)) / (60 * 60)
        );

        const minutes = Math.floor(
            (totalSeconds % (60 * 60)) / 60
        );

        const seconds =
            totalSeconds % 60;


        // -------------------------------------------------
        // DISPLAY COUNTDOWN SAFELY
        // -------------------------------------------------

        result.replaceChildren();

        const nameElement = document.createElement("strong");
        nameElement.textContent = name;

        const countdownElement = document.createElement("span");

        countdownElement.textContent =
            `${days} Days · ` +
            `${hours} Hours · ` +
            `${minutes} Minutes · ` +
            `${seconds} Seconds`;

        result.appendChild(nameElement);
        result.appendChild(document.createElement("br"));
        result.appendChild(countdownElement);
    }


    // Run immediately
    updateCountdown();


    // Update every second
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


    // -------------------------------------------------
    // CHECK REQUIRED ELEMENTS
    // -------------------------------------------------

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


    // -------------------------------------------------
    // GET VALUES
    // -------------------------------------------------

    const image = Number(imageInput.value);
    const actual = Number(actualInput.value);
    const magnification = Number(magnificationInput.value);

    const imageUnit = imageUnitElement.value;
    const actualUnit = actualUnitElement.value;
    const calculation = calculationElement.value;


    // -------------------------------------------------
    // UNIT CONVERSION HELPERS
    // -------------------------------------------------
    // Everything is converted to micrometres (μm)
    // internally for accurate calculations.
    // -------------------------------------------------

    function toMicrometres(value, unit) {

        if (unit === "mm") {
            return value * 1000;
        }

        // Default: μm
        return value;
    }


    function fromMicrometres(value, unit) {

        if (unit === "mm") {
            return value / 1000;
        }

        // Default: μm
        return value;
    }


    function unitLabel(unit) {

        if (unit === "mm") {
            return "mm";
        }

        return "μm";
    }


    // =================================================
    // CALCULATE MAGNIFICATION
    // =================================================

    if (calculation === "magnification") {

        if (
            !isValidPositiveNumber(image) ||
            !isValidPositiveNumber(actual)
        ) {
            setResult(
                result,
                "Please enter valid image and actual sizes greater than 0."
            );
            return;
        }


        const imageInMicrometres =
            toMicrometres(image, imageUnit);

        const actualInMicrometres =
            toMicrometres(actual, actualUnit);


        if (
            !isValidPositiveNumber(imageInMicrometres) ||
            !isValidPositiveNumber(actualInMicrometres)
        ) {
            setResult(
                result,
                "Please enter valid measurements."
            );
            return;
        }


        const answer =
            imageInMicrometres /
            actualInMicrometres;


        const formattedAnswer =
            formatNumber(answer);


        // Update magnification input
        magnificationInput.value =
            formattedAnswer;


        // Display result
        setResult(
            result,
            `Magnification = ×${formattedAnswer}`
        );

        return;
    }


    // =================================================
    // CALCULATE ACTUAL SIZE
    // =================================================

    if (calculation === "actual") {

        if (
            !isValidPositiveNumber(image) ||
            !isValidPositiveNumber(magnification)
        ) {
            setResult(
                result,
                "Please enter a valid image size and magnification."
            );
            return;
        }


        const imageInMicrometres =
            toMicrometres(image, imageUnit);


        const actualInMicrometres =
            imageInMicrometres /
            magnification;


        const answer =
            fromMicrometres(
                actualInMicrometres,
                actualUnit
            );


        const formattedAnswer =
            formatNumber(answer);


        // Keep the answer in the unit selected
        // for actual size.
        actualInput.value =
            formattedAnswer;


        setResult(
            result,
            `Actual size = ${formattedAnswer} ${unitLabel(actualUnit)}`
        );

        return;
    }


    // =================================================
    // CALCULATE IMAGE SIZE
    // =================================================

    if (calculation === "image") {

        if (
            !isValidPositiveNumber(actual) ||
            !isValidPositiveNumber(magnification)
        ) {
            setResult(
                result,
                "Please enter a valid actual size and magnification."
            );
            return;
        }


        const actualInMicrometres =
            toMicrometres(actual, actualUnit);


        const imageInMicrometres =
            actualInMicrometres *
            magnification;


        const answer =
            fromMicrometres(
                imageInMicrometres,
                imageUnit
            );


        const formattedAnswer =
            formatNumber(answer);


        // Keep the answer in the unit selected
        // for image size.
        imageInput.value =
            formattedAnswer;


        setResult(
            result,
            `Image size = ${formattedAnswer} ${unitLabel(imageUnit)}`
        );

        return;
    }


    // =================================================
    // INVALID CALCULATION TYPE
    // =================================================

    setResult(
        result,
        "Please select a valid calculation type."
    );
}


// =====================================================
// STUDYHUB - CLEANUP
// =====================================================

// Stop the countdown if the user leaves the page.
// This prevents an unnecessary timer from continuing
// while the page is being unloaded.
window.addEventListener("pagehide", function () {

    if (countdownTimer !== null) {
        clearInterval(countdownTimer);
        countdownTimer = null;
    }

});

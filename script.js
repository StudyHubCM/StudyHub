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

    const scoreInput =
        document.getElementById("score");

    const gradingSystem =
        document.getElementById("gradingSystem");

    const result =
        document.getElementById("gradeResult");


    if (
        !scoreInput ||
        !gradingSystem ||
        !result
    ) {
        return;
    }


    const rawScore =
        scoreInput.value.trim();

    const score =
        Number(rawScore);

    const system =
        gradingSystem.value;


    // -------------------------------------------------
    // CHECK INPUT
    // -------------------------------------------------

    if (
        rawScore === "" ||
        !Number.isFinite(score)
    ) {

        setResult(
            result,
            "Please enter a valid score."
        );

        return;
    }


    if (
        score < 0 ||
        score > 100
    ) {

        setResult(
            result,
            "Score must be between 0 and 100."
        );

        return;
    }


    // -------------------------------------------------
    // GRADING SCALES
    // -------------------------------------------------

    const gradingScales = {

        general: [
            { min: 80, grade: "A" },
            { min: 70, grade: "B" },
            { min: 60, grade: "C" },
            { min: 50, grade: "D" },
            { min: 40, grade: "E" },
            { min: 0, grade: "F" }
        ],


        "gce-ol": [
            { min: 75, grade: "A" },
            { min: 65, grade: "B" },
            { min: 55, grade: "C" },
            { min: 45, grade: "D" },
            { min: 35, grade: "E" },
            { min: 0, grade: "F" }
        ],


        "gce-al": [
            { min: 75, grade: "A" },
            { min: 65, grade: "B" },
            { min: 55, grade: "C" },
            { min: 45, grade: "D" },
            { min: 35, grade: "E" },
            { min: 0, grade: "F" }
        ]

    };


    const scale =
        gradingScales[system];


    // -------------------------------------------------
    // CHECK GRADING SYSTEM
    // -------------------------------------------------

    if (!scale) {

        setResult(
            result,
            "Please select a valid grading system."
        );

        return;
    }


    // -------------------------------------------------
    // FIND GRADE
    // -------------------------------------------------

    const gradeEntry =
        scale.find(
            item => score >= item.min
        );


    if (!gradeEntry) {

        setResult(
            result,
            "Unable to calculate grade."
        );

        return;
    }


    const grade =
        gradeEntry.grade;


    // -------------------------------------------------
    // DISPLAY RESULT
    // -------------------------------------------------

    const systemNames = {

        general: "General Grade",

        "gce-ol":
            "GCE O/L Grade",

        "gce-al":
            "GCE A/L Grade"

    };


    const systemName =
        systemNames[system];


    setResult(
        result,
        `${systemName}: ${grade}`
    );
}


// =====================================================
// STUDYHUB - EXAM COUNTDOWN
// =====================================================

let countdownTimer = null;


// =====================================================
// CREATE EXAM DATE SAFELY
// =====================================================

function getExamTimestamp(dateValue) {

    if (!dateValue) {
        return NaN;
    }


    /*
        datetime-local normally gives:

        YYYY-MM-DDTHH:mm

        We intentionally use the value directly
        instead of adding another T00:00:00.

        This preserves the exact date AND time
        selected by the student.
    */

    const timestamp =
        new Date(dateValue).getTime();


    return timestamp;
}


// =====================================================
// DISPLAY COUNTDOWN
// =====================================================

function runCountdown(
    name,
    targetDate,
    result
) {

    if (!result) {
        return;
    }


    // -------------------------------------------------
    // STOP ANY OLD TIMER
    // -------------------------------------------------

    if (countdownTimer !== null) {

        clearInterval(countdownTimer);

        countdownTimer = null;
    }


    // -------------------------------------------------
    // UPDATE COUNTDOWN
    // -------------------------------------------------

    function updateCountdown() {

        const now =
            Date.now();

        const difference =
            targetDate - now;


        // -------------------------------------------------
        // EXAM DATE REACHED
        // -------------------------------------------------

        if (difference <= 0) {

            if (countdownTimer !== null) {

                clearInterval(
                    countdownTimer
                );

                countdownTimer = null;
            }


            result.replaceChildren();


            const nameElement =
                document.createElement(
                    "strong"
                );

            nameElement.textContent =
                name;


            const messageElement =
                document.createElement(
                    "span"
                );

            messageElement.textContent =
                "🎉 The exam date has arrived!";


            result.appendChild(
                nameElement
            );

            result.appendChild(
                document.createElement("br")
            );

            result.appendChild(
                messageElement
            );


            return;
        }


        // -------------------------------------------------
        // CALCULATE REMAINING TIME
        // -------------------------------------------------

        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        const days =
            Math.floor(
                totalSeconds /
                (60 * 60 * 24)
            );


        const hours =
            Math.floor(
                (
                    totalSeconds %
                    (60 * 60 * 24)
                ) /
                (60 * 60)
            );


        const minutes =
            Math.floor(
                (
                    totalSeconds %
                    (60 * 60)
                ) /
                60
            );


        const seconds =
            totalSeconds % 60;


        // -------------------------------------------------
        // DISPLAY COUNTDOWN SAFELY
        // -------------------------------------------------

        result.replaceChildren();


        const nameElement =
            document.createElement(
                "strong"
            );

        nameElement.textContent =
            name;


        const countdownElement =
            document.createElement(
                "span"
            );


        countdownElement.textContent =
            `${days} Days · ` +
            `${hours} Hours · ` +
            `${minutes} Minutes · ` +
            `${seconds} Seconds`;


        result.appendChild(
            nameElement
        );


        result.appendChild(
            document.createElement("br")
        );


        result.appendChild(
            countdownElement
        );
    }


    // Run immediately
    updateCountdown();


    // Continue updating every second
    countdownTimer =
        setInterval(
            updateCountdown,
            1000
        );
}


// =====================================================
// START / SAVE EXAM COUNTDOWN
// =====================================================

function startCountdown() {

    const examNameInput =
        document.getElementById("examName");

    const examDateInput =
        document.getElementById("examDate");

    const result =
        document.getElementById(
            "countdownResult"
        );


    if (
        !examNameInput ||
        !examDateInput ||
        !result
    ) {
        return;
    }


    const name =
        examNameInput.value.trim();

    const date =
        examDateInput.value;


    // -------------------------------------------------
    // CHECK EXAM NAME
    // -------------------------------------------------

    if (name === "") {

        setResult(
            result,
            "Please enter an exam name."
        );

        return;
    }


    // -------------------------------------------------
    // CHECK DATE
    // -------------------------------------------------

    if (date === "") {

        setResult(
            result,
            "Please choose an exam date."
        );

        return;
    }


    // -------------------------------------------------
    // CREATE VALID TIMESTAMP
    // -------------------------------------------------

    const targetDate =
        getExamTimestamp(date);


    if (!Number.isFinite(targetDate)) {

        setResult(
            result,
            "Please choose a valid exam date."
        );

        return;
    }


    // -------------------------------------------------
    // SAVE EXAM
    // -------------------------------------------------

    localStorage.setItem(
        "studyhub_exam_name",
        name
    );


    localStorage.setItem(
        "studyhub_exam_date",
        date
    );


    // -------------------------------------------------
    // RUN COUNTDOWN
    // -------------------------------------------------

    runCountdown(
        name,
        targetDate,
        result
    );


    // -------------------------------------------------
    // UPDATE HOMEPAGE EXAM INFORMATION
    // -------------------------------------------------

    updateHomeExamInfo();
}


// =====================================================
// STUDYHUB - RESTORE SAVED COUNTDOWN
// =====================================================

function restoreSavedCountdown() {

    const examNameInput =
        document.getElementById("examName");

    const examDateInput =
        document.getElementById("examDate");

    const result =
        document.getElementById(
            "countdownResult"
        );


    if (
        !examNameInput ||
        !examDateInput ||
        !result
    ) {
        return;
    }


    const savedName =
        localStorage.getItem(
            "studyhub_exam_name"
        );


    const savedDate =
        localStorage.getItem(
            "studyhub_exam_date"
        );


    // -------------------------------------------------
    // NOTHING SAVED
    // -------------------------------------------------

    if (
        !savedName ||
        !savedDate
    ) {
        return;
    }


    // -------------------------------------------------
    // RESTORE INPUTS
    // -------------------------------------------------

    examNameInput.value =
        savedName;

    examDateInput.value =
        savedDate;


    // -------------------------------------------------
    // RESTORE COUNTDOWN
    // -------------------------------------------------

    const targetDate =
        getExamTimestamp(savedDate);


    if (!Number.isFinite(targetDate)) {

        setResult(
            result,
            "Please choose a valid exam date."
        );

        return;
    }


    runCountdown(
        savedName,
        targetDate,
        result
    );
}


// =====================================================
// STUDYHUB - HOMEPAGE EXAM INFORMATION
// =====================================================

function updateHomeExamInfo() {

    const examNameElement = document.getElementById("homeExamName");
    const countdownElement = document.getElementById("homeExamCountdown");

    if (!examNameElement || !countdownElement) {
        return;
    }

    const savedExamName = localStorage.getItem("studyhub_exam_name");
    const savedExamDate = localStorage.getItem("studyhub_exam_date");

    if (!savedExamName || !savedExamDate) {

        examNameElement.textContent = "No exam set yet";

        countdownElement.textContent =
            "Set your exam in Tools";

        return;
    }

    examNameElement.textContent = savedExamName;

    const targetDate = new Date(savedExamDate).getTime();

    if (isNaN(targetDate)) {

        countdownElement.textContent =
            "Set your exam in Tools";

        return;
    }

    function updateCountdown() {

        const now = Date.now();
        const difference = targetDate - now;

        if (difference <= 0) {

            countdownElement.textContent =
                "🎉 EXAM DAY";

            clearInterval(homeCountdownInterval);

            return;
        }

        const totalSeconds = Math.floor(difference / 1000);

        const days = Math.floor(totalSeconds / 86400);

        const hours = Math.floor(
            (totalSeconds % 86400) / 3600
        );

        const minutes = Math.floor(
            (totalSeconds % 3600) / 60
        );

        const seconds = totalSeconds % 60;

        countdownElement.textContent =
            `${days} DAYS ${hours} HOURS ${minutes} MINUTES ${String(seconds).padStart(2, "0")} SECONDS`;
    }

    updateCountdown();

    if (window.homeCountdownInterval) {
        clearInterval(window.homeCountdownInterval);
    }

    window.homeCountdownInterval =
        setInterval(updateCountdown, 1000);
}


    const examName =
        localStorage.getItem(
            "studyhub_exam_name"
        );


    const examDate =
        localStorage.getItem(
            "studyhub_exam_date"
        );


    // -------------------------------------------------
    // NO EXAM SAVED
    // -------------------------------------------------

    if (
        !examName ||
        !examDate
    ) {

        examNameElement.textContent =
            "No exam set yet";


        examDateElement.textContent =
            "Set your exam in Tools";


        return;
    }


    // -------------------------------------------------
    // FORMAT DATE
    // -------------------------------------------------

    const savedDate =
        new Date(examDate);


    if (
        Number.isNaN(
            savedDate.getTime()
        )
    ) {

        examNameElement.textContent =
            examName;


        examDateElement.textContent =
            "Exam date saved";


        return;
    }


    const formattedDate =
        savedDate.toLocaleString(
            undefined,
            {
                day: "numeric",
                month: "long",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit"
            }
        );


    // -------------------------------------------------
    // DISPLAY EXAM
    // -------------------------------------------------

    examNameElement.textContent =
        examName;


    examDateElement.textContent =
        `📅 ${formattedDate}`;
}


// =====================================================
// STUDYHUB - MAGNIFICATION CALCULATOR
// =====================================================

function calculateMagnification() {

    const imageInput =
        document.getElementById(
            "magnification-image"
        );

    const actualInput =
        document.getElementById(
            "magnification-actual"
        );

    const magnificationInput =
        document.getElementById(
            "magnification-value"
        );

    const imageUnitElement =
        document.getElementById(
            "magnification-image-unit"
        );

    const actualUnitElement =
        document.getElementById(
            "magnification-actual-unit"
        );

    const calculationElement =
        document.getElementById(
            "magnification-calculate"
        );

    const result =
        document.getElementById(
            "magnification-result"
        );


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

    const image =
        Number(imageInput.value);

    const actual =
        Number(actualInput.value);

    const magnification =
        Number(magnificationInput.value);


    const imageUnit =
        imageUnitElement.value;

    const actualUnit =
        actualUnitElement.value;

    const calculation =
        calculationElement.value;


    // -------------------------------------------------
    // UNIT CONVERSION HELPERS
    // -------------------------------------------------

    function toMicrometres(
        value,
        unit
    ) {

        if (unit === "mm") {

            return value * 1000;
        }


        return value;
    }


    function fromMicrometres(
        value,
        unit
    ) {

        if (unit === "mm") {

            return value / 1000;
        }


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

    if (
        calculation === "magnification"
    ) {

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
            toMicrometres(
                image,
                imageUnit
            );


        const actualInMicrometres =
            toMicrometres(
                actual,
                actualUnit
            );


        if (
            !isValidPositiveNumber(
                imageInMicrometres
            ) ||
            !isValidPositiveNumber(
                actualInMicrometres
            )
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


        magnificationInput.value =
            formattedAnswer;


        setResult(
            result,
            `Magnification = ×${formattedAnswer}`
        );


        return;
    }


    // =================================================
    // CALCULATE ACTUAL SIZE
    // =================================================

    if (
        calculation === "actual"
    ) {

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
            toMicrometres(
                image,
                imageUnit
            );


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

    if (
        calculation === "image"
    ) {

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
            toMicrometres(
                actual,
                actualUnit
            );


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
// STUDYHUB - PAGE INITIALIZATION
// =====================================================

document.addEventListener(
    "DOMContentLoaded",
    function () {

        // Update the homepage exam information
        updateHomeExamInfo();


        // Restore the saved countdown
        restoreSavedCountdown();

    }
);


// =====================================================
// STUDYHUB - CLEANUP
// =====================================================

// Stop the countdown if the user leaves the page.

window.addEventListener(
    "pagehide",
    function () {

        if (countdownTimer !== null) {

            clearInterval(
                countdownTimer
            );

            countdownTimer = null;
        }

    }
);

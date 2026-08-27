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

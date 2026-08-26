// ================================
// STUDYHUB - GRADE CALCULATOR
// ================================

function calculateGrade() {
    const scoreInput = document.getElementById("score");
    const result = document.getElementById("gradeResult");

    if (!scoreInput || !result) return;

    const score = Number(scoreInput.value);

    if (scoreInput.value === "" || isNaN(score)) {
        result.textContent = "Please enter a score.";
        return;
    }

    if (score < 0 || score > 100) {
        result.textContent = "Score must be between 0 and 100.";
        return;
    }

    let grade;

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

    result.textContent = `Your grade is ${grade}`;
}

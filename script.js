/* =====================================================
   STUDYHUB CM
   Main JavaScript
   Dashboard + Navigation + Calculators
   ===================================================== */


/* =====================================================
   SHARED HELPERS
   ===================================================== */

function formatNumber(value) {
    return Number(value).toLocaleString();
}


function setResult(element, message) {
    if (element) {
        element.textContent = message;
    }
}


function isValidPositiveNumber(value) {
    return Number.isFinite(value) && value > 0;
}


/* =====================================================
   INITIALIZATION
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeMenu();
    initializeGreeting();
    initializeDashboardCountdown();
    initializeContinueStudying();
    initializeSelectedSubjects();

});


/* =====================================================
   SIDE MENU
   ===================================================== */

function initializeMenu() {

    const menuButton = document.getElementById("menuButton");
    const menuClose = document.getElementById("menuClose");
    const menuOverlay = document.getElementById("menuOverlay");
    const sideMenu = document.getElementById("sideMenu");

    if (!menuButton || !menuClose || !menuOverlay || !sideMenu) {
        return;
    }


    function openMenu() {

        menuOverlay.hidden = false;

        requestAnimationFrame(() => {
            menuOverlay.classList.add("active");
            sideMenu.classList.add("active");
        });

        menuButton.setAttribute("aria-expanded", "true");

        sideMenu.setAttribute("aria-hidden", "false");
        menuOverlay.setAttribute("aria-hidden", "false");

        document.body.classList.add("menu-open");
    }


    function closeMenu() {

        menuOverlay.classList.remove("active");
        sideMenu.classList.remove("active");

        menuButton.setAttribute("aria-expanded", "false");

        sideMenu.setAttribute("aria-hidden", "true");
        menuOverlay.setAttribute("aria-hidden", "true");

        document.body.classList.remove("menu-open");

        setTimeout(() => {

            if (!menuOverlay.classList.contains("active")) {
                menuOverlay.hidden = true;
            }

        }, 250);
    }


    menuButton.addEventListener("click", openMenu);

    menuClose.addEventListener("click", closeMenu);

    menuOverlay.addEventListener("click", closeMenu);


    document.addEventListener("keydown", (event) => {

        if (event.key === "Escape") {
            closeMenu();
        }

    });


    sideMenu.querySelectorAll("a").forEach((link) => {

        link.addEventListener("click", closeMenu);

    });

}


/* =====================================================
   STUDENT GREETING
   ===================================================== */

function initializeGreeting() {

    const greetingElement = document.getElementById("studentGreeting");

    if (!greetingElement) {
        return;
    }


    const hour = new Date().getHours();

    let greeting = "Good evening";


    if (hour < 12) {
        greeting = "Good morning";
    } else if (hour < 18) {
        greeting = "Good afternoon";
    }


    const savedName =
        localStorage.getItem("studyhub_student_name");


    const studentName =
        savedName && savedName.trim()
            ? savedName.trim()
            : "Student";


    greetingElement.textContent =
        `${greeting}, ${studentName} 👋`;
}


/* =====================================================
   SAVE STUDENT NAME
   ===================================================== */

function saveStudyHubStudentName(name) {

    const cleanedName =
        typeof name === "string"
            ? name.trim()
            : "";


    if (cleanedName) {

        localStorage.setItem(
            "studyhub_student_name",
            cleanedName
        );

    } else {

        localStorage.removeItem(
            "studyhub_student_name"
        );

    }

}


/* =====================================================
   DASHBOARD EXAM COUNTDOWN
   ===================================================== */

let dashboardCountdownInterval = null;


function initializeDashboardCountdown() {

    const examNameElement =
        document.getElementById("homeExamName");

    const examDaysElement =
        document.getElementById("homeExamDays");


    if (!examNameElement || !examDaysElement) {
        return;
    }


    function updateDashboardCountdown() {

        const examName =
            localStorage.getItem("studyhub_exam_name");

        const examDate =
            localStorage.getItem("studyhub_exam_date");


        if (!examDate) {

            examNameElement.textContent =
                "GCE A Level Examination";

            examDaysElement.textContent =
                "EXAM DATE NEEDED";

            return;
        }


        const targetDate =
            new Date(`${examDate}T00:00:00`);


        if (Number.isNaN(targetDate.getTime())) {

            examDaysElement.textContent =
                "EXAM DATE NEEDED";

            return;
        }


        const difference =
            targetDate.getTime() - Date.now();


        const dayMs =
            24 * 60 * 60 * 1000;


        const days =
            Math.ceil(difference / dayMs);


        examNameElement.textContent =
            examName && examName.trim()
                ? examName.trim()
                : "GCE A Level Examination";


        if (days > 0) {

            examDaysElement.textContent =
                `${formatNumber(days)} DAYS LEFT`;

        } else if (days === 0) {

            examDaysElement.textContent =
                "EXAM DAY 🎓";

        } else {

            examDaysElement.textContent =
                "EXAM DATE PASSED";

        }

    }


    updateDashboardCountdown();


    if (dashboardCountdownInterval) {
        clearInterval(dashboardCountdownInterval);
    }


    dashboardCountdownInterval =
        setInterval(
            updateDashboardCountdown,
            60 * 1000
        );

}


/* =====================================================
   CONTINUE STUDYING
   ===================================================== */

function initializeContinueStudying() {

    const subjectElement =
        document.getElementById("continueSubject");

    const topicElement =
        document.getElementById("continueTopic");

    const buttonElement =
        document.getElementById("continueButton");


    if (
        !subjectElement ||
        !topicElement ||
        !buttonElement
    ) {
        return;
    }


    const savedSubject =
        localStorage.getItem("studyhub_last_subject");

    const savedTopic =
        localStorage.getItem("studyhub_last_topic");

    const savedLink =
        localStorage.getItem("studyhub_last_link");


    if (savedSubject && savedSubject.trim()) {

        subjectElement.textContent =
            savedSubject.trim();

    }


    if (savedTopic && savedTopic.trim()) {

        topicElement.textContent =
            savedTopic.trim();

    }


    if (savedLink && savedLink.trim()) {

        buttonElement.href =
            savedLink.trim();

    }

}


/* =====================================================
   SAVE LAST STUDIED
   ===================================================== */

function saveLastStudied(
    subject,
    topic,
    link
) {

    if (subject) {

        localStorage.setItem(
            "studyhub_last_subject",
            String(subject).trim()
        );

    }


    if (topic) {

        localStorage.setItem(
            "studyhub_last_topic",
            String(topic).trim()
        );

    }


    if (link) {

        localStorage.setItem(
            "studyhub_last_link",
            String(link).trim()
        );

    }

}


/* =====================================================
   SELECTED SUBJECTS
   ===================================================== */

function initializeSelectedSubjects() {

    const subjectContainer =
        document.getElementById("selectedSubjects");


    if (!subjectContainer) {
        return;
    }


    const savedSubjects =
        localStorage.getItem(
            "studyhub_selected_subjects"
        );


    /*
     * If the student has never selected subjects,
     * keep the default subjects from index.html.
     */

    if (!savedSubjects) {
        return;
    }


    let selectedSubjects;


    try {

        selectedSubjects =
            JSON.parse(savedSubjects);

    } catch (error) {

        localStorage.removeItem(
            "studyhub_selected_subjects"
        );

        return;
    }


    if (!Array.isArray(selectedSubjects)) {

        localStorage.removeItem(
            "studyhub_selected_subjects"
        );

        return;
    }


    const normalizedSubjects =
        selectedSubjects
            .map(subject =>
                String(subject).trim().toLowerCase()
            )
            .filter(Boolean);


    subjectContainer
        .querySelectorAll("a[data-subject]")
        .forEach((link) => {

            const subject =
                String(
                    link.dataset.subject || ""
                )
                .trim()
                .toLowerCase();


            if (
                !normalizedSubjects.includes(subject)
            ) {

                link.closest("li")?.remove();

            }

        });

}


/* =====================================================
   SAVE SELECTED SUBJECTS
   ===================================================== */

function saveSelectedSubjects(subjects) {

    if (!Array.isArray(subjects)) {
        return;
    }


    const cleanedSubjects =
        subjects
            .map(subject =>
                String(subject).trim().toLowerCase()
            )
            .filter(Boolean);


    localStorage.setItem(
        "studyhub_selected_subjects",
        JSON.stringify(cleanedSubjects)
    );

}


/* =====================================================
   GRADE CALCULATOR
   ===================================================== */

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


    const score =
        Number(scoreInput.value);


    if (
        !Number.isFinite(score) ||
        score < 0 ||
        score > 100
    ) {

        setResult(
            result,
            "Enter a score between 0 and 100."
        );

        return;
    }


    /*
     * These are StudyHub-configured percentage bands.
     * They must not be presented as official GCE
     * Board grade thresholds unless verified.
     */

    const gradingScales = {

        general: [
            [80, "A"],
            [70, "B"],
            [60, "C"],
            [50, "D"],
            [40, "E"],
            [0, "F"]
        ],

        "gce-ol": [
            [75, "A"],
            [65, "B"],
            [55, "C"],
            [45, "D"],
            [35, "E"],
            [0, "F"]
        ],

        "gce-al": [
            [75, "A"],
            [65, "B"],
            [55, "C"],
            [45, "D"],
            [35, "E"],
            [0, "F"]
        ]

    };


    const scale =
        gradingScales[gradingSystem.value]
        || gradingScales.general;


    const grade =
        scale.find(
            ([minimum]) => score >= minimum
        )[1];


    const systemName = {

        general: "General",

        "gce-ol": "GCE O/L",

        "gce-al": "GCE A/L"

    }[gradingSystem.value]
        || "General";


    result.textContent =
        `${systemName} Grade: ${grade}`;

}


/* =====================================================
   EXAM COUNTDOWN TOOL
   ===================================================== */

let countdownInterval = null;


function startCountdown() {

    const examNameInput =
        document.getElementById("examName");

    const examDateInput =
        document.getElementById("examDate");

    const result =
        document.getElementById("countdownResult");


    if (
        !examNameInput ||
        !examDateInput ||
        !result
    ) {
        return;
    }


    const examName =
        examNameInput.value.trim();

    const examDate =
        examDateInput.value;


    if (!examName) {

        setResult(
            result,
            "Enter an exam name."
        );

        return;
    }


    if (!examDate) {

        setResult(
            result,
            "Select an exam date."
        );

        return;
    }


    const targetDate =
        new Date(`${examDate}T00:00:00`);


    if (Number.isNaN(targetDate.getTime())) {

        setResult(
            result,
            "Enter a valid exam date."
        );

        return;
    }


    localStorage.setItem(
        "studyhub_exam_name",
        examName
    );


    localStorage.setItem(
        "studyhub_exam_date",
        examDate
    );


    function updateCountdown() {

        const difference =
            targetDate.getTime() - Date.now();


        if (difference <= 0) {

            result.textContent =
                "🎓 EXAM DAY";

            return;
        }


        const totalSeconds =
            Math.floor(
                difference / 1000
            );


        const days =
            Math.floor(
                totalSeconds / 86400
            );


        const hours =
            Math.floor(
                (totalSeconds % 86400) / 3600
            );


        const minutes =
            Math.floor(
                (totalSeconds % 3600) / 60
            );


        const seconds =
            totalSeconds % 60;


        result.textContent =
            `${formatNumber(days)} days • ` +
            `${hours}h ${minutes}m ${seconds}s`;
    }


    if (countdownInterval) {
        clearInterval(countdownInterval);
    }


    updateCountdown();


    countdownInterval =
        setInterval(
            updateCountdown,
            1000
        );

}


/* =====================================================
   MAGNIFICATION CALCULATOR
   ===================================================== */

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

    const imageUnit =
        document.getElementById(
            "magnification-image-unit"
        );

    const actualUnit =
        document.getElementById(
            "magnification-actual-unit"
        );

    const calculation =
        document.getElementById(
            "magnification-calculation"
        );

    const result =
        document.getElementById(
            "magnification-result"
        );


    if (
        !imageInput ||
        !actualInput ||
        !magnificationInput ||
        !imageUnit ||
        !actualUnit ||
        !calculation ||
        !result
    ) {
        return;
    }


    const unitToMicrometres = {

        mm: 1000,

        μm: 1,

        um: 1

    };


    const imageValue =
        Number(imageInput.value);

    const actualValue =
        Number(actualInput.value);

    const magnificationValue =
        Number(magnificationInput.value);


    function convertToMicrometres(
        value,
        unit
    ) {

        return value *
            (
                unitToMicrometres[unit]
                || 1
            );

    }


    function formatMagnification(value) {

        if (!Number.isFinite(value)) {
            return "—";
        }

        return `×${formatNumber(value)}`;

    }


    switch (calculation.value) {

        case "magnification": {

            if (
                !isValidPositiveNumber(imageValue) ||
                !isValidPositiveNumber(actualValue)
            ) {

                setResult(
                    result,
                    "Enter valid image and actual sizes."
                );

                return;
            }


            const image =
                convertToMicrometres(
                    imageValue,
                    imageUnit.value
                );


            const actual =
                convertToMicrometres(
                    actualValue,
                    actualUnit.value
                );


            const answer =
                image / actual;


            result.textContent =
                `Magnification = ${formatMagnification(answer)}`;

            break;
        }


        case "actual": {

            if (
                !isValidPositiveNumber(imageValue) ||
                !isValidPositiveNumber(magnificationValue)
            ) {

                setResult(
                    result,
                    "Enter valid image size and magnification."
                );

                return;
            }


            const image =
                convertToMicrometres(
                    imageValue,
                    imageUnit.value
                );


            const answer =
                image / magnificationValue;


            result.textContent =
                `Actual size = ${formatNumber(answer)} μm`;

            break;
        }


        case "image": {

            if (
                !isValidPositiveNumber(actualValue) ||
                !isValidPositiveNumber(magnificationValue)
            ) {

                setResult(
                    result,
                    "Enter valid actual size and magnification."
                );

                return;
            }


            const actual =
                convertToMicrometres(
                    actualValue,
                    actualUnit.value
                );


            const answer =
                actual * magnificationValue;


            result.textContent =
                `Image size = ${formatNumber(answer)} μm`;

            break;
        }


        default:

            setResult(
                result,
                "Select a calculation."
            );

    }

}


/* =====================================================
   PAGE CLEANUP
   ===================================================== */

window.addEventListener("pagehide", () => {

    if (dashboardCountdownInterval) {

        clearInterval(
            dashboardCountdownInterval
        );

        dashboardCountdownInterval = null;

    }


    if (countdownInterval) {

        clearInterval(
            countdownInterval
        );

        countdownInterval = null;

    }

});

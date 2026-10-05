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
   STUDYHUB STORAGE KEYS
   ===================================================== */

const STUDYHUB_KEYS = {

    studentName: "studyhub_student_name",

    gceLevel: "studyhub_gce_level",

    selectedSubjects: "studyhub_selected_subjects",

    examName: "studyhub_exam_name",

    examDate: "studyhub_exam_date",

    lastSubject: "studyhub_last_subject",

    lastTopic: "studyhub_last_topic",

    lastLink: "studyhub_last_link"

};


/* =====================================================
   INITIALIZATION
   ===================================================== */

document.addEventListener("DOMContentLoaded", () => {

    initializeMenu();

    initializeGreeting();

    initializeStudentLevel();

    initializeDashboardCountdown();

    initializeContinueStudying();

    initializeSelectedSubjects();

    initializeGradeCalculator();

});


/* =====================================================
   SIDE MENU
   ===================================================== */

function initializeMenu() {

    const menuButton =
        document.getElementById("menuButton");

    const menuClose =
        document.getElementById("menuClose");

    const menuOverlay =
        document.getElementById("menuOverlay");

    const sideMenu =
        document.getElementById("sideMenu");


    if (
        !menuButton ||
        !menuClose ||
        !menuOverlay ||
        !sideMenu
    ) {
        return;
    }


    function openMenu() {

        menuOverlay.hidden = false;

        requestAnimationFrame(() => {

            menuOverlay.classList.add("active");

            sideMenu.classList.add("active");

        });


        menuButton.setAttribute(
            "aria-expanded",
            "true"
        );

        sideMenu.setAttribute(
            "aria-hidden",
            "false"
        );

        menuOverlay.setAttribute(
            "aria-hidden",
            "false"
        );

        document.body.classList.add(
            "menu-open"
        );

    }


    function closeMenu() {

        menuOverlay.classList.remove("active");

        sideMenu.classList.remove("active");


        menuButton.setAttribute(
            "aria-expanded",
            "false"
        );

        sideMenu.setAttribute(
            "aria-hidden",
            "true"
        );

        menuOverlay.setAttribute(
            "aria-hidden",
            "true"
        );

        document.body.classList.remove(
            "menu-open"
        );


        setTimeout(() => {

            if (
                !menuOverlay.classList.contains(
                    "active"
                )
            ) {

                menuOverlay.hidden = true;

            }

        }, 250);

    }


    menuButton.addEventListener(
        "click",
        openMenu
    );

    menuClose.addEventListener(
        "click",
        closeMenu
    );

    menuOverlay.addEventListener(
        "click",
        closeMenu
    );


    document.addEventListener(
        "keydown",
        (event) => {

            if (event.key === "Escape") {
                closeMenu();
            }

        }
    );


    sideMenu
        .querySelectorAll("a")
        .forEach((link) => {

            link.addEventListener(
                "click",
                closeMenu
            );

        });

}


/* =====================================================
   STUDENT GREETING
   ===================================================== */

function initializeGreeting() {

    const greetingElement =
        document.getElementById(
            "studentGreeting"
        );


    if (!greetingElement) {
        return;
    }


    const hour =
        new Date().getHours();


    let greeting =
        "Good evening";


    if (hour < 12) {

        greeting =
            "Good morning";

    } else if (hour < 18) {

        greeting =
            "Good afternoon";

    }


    const savedName =
        localStorage.getItem(
            STUDYHUB_KEYS.studentName
        );


    const studentName =
        savedName &&
        savedName.trim()
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
            STUDYHUB_KEYS.studentName,
            cleanedName
        );

    } else {

        localStorage.removeItem(
            STUDYHUB_KEYS.studentName
        );

    }

}


/* =====================================================
   GCE LEVEL
   ===================================================== */

/*
 * Valid values:
 *
 * "gce-ol" = GCE Ordinary Level
 * "gce-al" = GCE Advanced Level
 *
 * StudyHub never assumes one automatically.
 */

function getStudyHubGceLevel() {

    const level =
        localStorage.getItem(
            STUDYHUB_KEYS.gceLevel
        );


    if (
        level === "gce-ol" ||
        level === "gce-al"
    ) {
        return level;
    }


    return null;

}


function getStudyHubGceLabel() {

    const level =
        getStudyHubGceLevel();


    if (level === "gce-ol") {
        return "GCE ORDINARY LEVEL";
    }


    if (level === "gce-al") {
        return "GCE ADVANCED LEVEL";
    }


    return null;

}


/* =====================================================
   SAVE GCE LEVEL
   ===================================================== */

function saveStudyHubGceLevel(level) {

    if (
        level !== "gce-ol" &&
        level !== "gce-al"
    ) {
        return false;
    }


    localStorage.setItem(
        STUDYHUB_KEYS.gceLevel,
        level
    );


    return true;

}


/* =====================================================
   STUDENT LEVEL ON DASHBOARD
   ===================================================== */

function initializeStudentLevel() {

    const levelElement =
        document.getElementById(
            "studentLevel"
        );


    if (!levelElement) {
        return;
    }


    const level =
        getStudyHubGceLabel();


    if (!level) {

        levelElement.textContent =
            "SET UP YOUR GCE LEVEL TO GET STARTED";

        return;

    }


    levelElement.textContent =
        level;

}


/* =====================================================
   DASHBOARD EXAM COUNTDOWN
   ===================================================== */

let dashboardCountdownInterval = null;


function initializeDashboardCountdown() {

    const examNameElement =
        document.getElementById(
            "homeExamName"
        );

    const examDaysElement =
        document.getElementById(
            "homeExamDays"
        );

    const examButton =
        document.getElementById(
            "viewExamButton"
        );


    if (
        !examNameElement ||
        !examDaysElement
    ) {
        return;
    }


    function updateDashboardCountdown() {

        const level =
            getStudyHubGceLevel();


        const examName =
            localStorage.getItem(
                STUDYHUB_KEYS.examName
            );


        const examDate =
            localStorage.getItem(
                STUDYHUB_KEYS.examDate
            );


        /*
         * The student has not selected
         * O/L or A/L yet.
         */

        if (!level) {

            examNameElement.textContent =
                "Set up your GCE examination";

            examDaysElement.textContent =
                "GCE LEVEL NEEDED";


            if (examButton) {

                examButton.textContent =
                    "Set Up Exam →";

            }

            return;

        }


        /*
         * The GCE level is known but the
         * student has not configured a date.
         */

        const defaultExamName =
            level === "gce-ol"
                ? "GCE Ordinary Level Examination"
                : "GCE Advanced Level Examination";


        if (!examDate) {

            examNameElement.textContent =
                examName && examName.trim()
                    ? examName.trim()
                    : defaultExamName;

            examDaysElement.textContent =
                "EXAM DATE NEEDED";


            if (examButton) {

                examButton.textContent =
                    "Set Exam Date →";

            }

            return;

        }


        const targetDate =
            new Date(
                `${examDate}T00:00:00`
            );


        if (
            Number.isNaN(
                targetDate.getTime()
            )
        ) {

            examNameElement.textContent =
                defaultExamName;

            examDaysElement.textContent =
                "EXAM DATE NEEDED";

            return;

        }


        const difference =
            targetDate.getTime() -
            Date.now();


        const dayMs =
            24 * 60 * 60 * 1000;


        const days =
            Math.ceil(
                difference / dayMs
            );


        examNameElement.textContent =
            examName && examName.trim()
                ? examName.trim()
                : defaultExamName;


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


        if (examButton) {

            examButton.textContent =
                "Manage Exam Countdown →";

        }

    }


    updateDashboardCountdown();


    if (dashboardCountdownInterval) {

        clearInterval(
            dashboardCountdownInterval
        );

    }


    dashboardCountdownInterval =
        setInterval(
            updateDashboardCountdown,
            60 * 1000
        );

}


/* =====================================================
   SAVE EXAM SETUP
   ===================================================== */

function saveStudyHubExam(
    examName,
    examDate
) {

    const cleanedName =
        typeof examName === "string"
            ? examName.trim()
            : "";


    const cleanedDate =
        typeof examDate === "string"
            ? examDate.trim()
            : "";


    if (cleanedName) {

        localStorage.setItem(
            STUDYHUB_KEYS.examName,
            cleanedName
        );

    } else {

        localStorage.removeItem(
            STUDYHUB_KEYS.examName
        );

    }


    if (cleanedDate) {

        localStorage.setItem(
            STUDYHUB_KEYS.examDate,
            cleanedDate
        );

    } else {

        localStorage.removeItem(
            STUDYHUB_KEYS.examDate
        );

    }

}


/* =====================================================
   CONTINUE STUDYING
   ===================================================== */

function initializeContinueStudying() {

    const subjectElement =
        document.getElementById(
            "continueSubject"
        );

    const topicElement =
        document.getElementById(
            "continueTopic"
        );

    const buttonElement =
        document.getElementById(
            "continueButton"
        );


    if (
        !subjectElement ||
        !topicElement ||
        !buttonElement
    ) {
        return;
    }


    const savedSubject =
        localStorage.getItem(
            STUDYHUB_KEYS.lastSubject
        );


    const savedTopic =
        localStorage.getItem(
            STUDYHUB_KEYS.lastTopic
        );


    const savedLink =
        localStorage.getItem(
            STUDYHUB_KEYS.lastLink
        );


    /*
     * IMPORTANT:
     *
     * No saved study session means
     * we do NOT invent one.
     */

    if (
        !savedSubject ||
        !savedSubject.trim() ||
        !savedTopic ||
        !savedTopic.trim() ||
        !savedLink ||
        !savedLink.trim()
    ) {

        subjectElement.textContent =
            "Start your first lesson";

        topicElement.textContent =
            "Choose a subject and begin studying.";

        buttonElement.textContent =
            "Start Studying →";

        buttonElement.href =
            "study.html";

        return;

    }


    subjectElement.textContent =
        savedSubject.trim();


    topicElement.textContent =
        savedTopic.trim();


    buttonElement.textContent =
        "Continue Studying →";


    buttonElement.href =
        savedLink.trim();

}


/* =====================================================
   SAVE LAST STUDIED
   ===================================================== */

/*
 * Topic pages can call:
 *
 * saveLastStudied(
 *     "Biology",
 *     "The Living World",
 *     "living-world.html"
 * );
 *
 * StudyHub will then remember the REAL page
 * the student opened.
 */

function saveLastStudied(
    subject,
    topic,
    link
) {

    const cleanedSubject =
        typeof subject === "string"
            ? subject.trim()
            : "";


    const cleanedTopic =
        typeof topic === "string"
            ? topic.trim()
            : "";


    const cleanedLink =
        typeof link === "string"
            ? link.trim()
            : "";


    if (!cleanedSubject) {
        return;
    }


    if (!cleanedTopic) {
        return;
    }


    if (!cleanedLink) {
        return;
    }


    localStorage.setItem(
        STUDYHUB_KEYS.lastSubject,
        cleanedSubject
    );


    localStorage.setItem(
        STUDYHUB_KEYS.lastTopic,
        cleanedTopic
    );


    localStorage.setItem(
        STUDYHUB_KEYS.lastLink,
        cleanedLink
    );

}


/* =====================================================
   CLEAR LAST STUDIED
   ===================================================== */

function clearLastStudied() {

    localStorage.removeItem(
        STUDYHUB_KEYS.lastSubject
    );

    localStorage.removeItem(
        STUDYHUB_KEYS.lastTopic
    );

    localStorage.removeItem(
        STUDYHUB_KEYS.lastLink
    );

}


/* =====================================================
   SELECTED SUBJECTS
   ===================================================== */

function initializeSelectedSubjects() {

    const subjectContainer =
        document.getElementById(
            "selectedSubjects"
        );


    if (!subjectContainer) {
        return;
    }


    const savedSubjects =
        localStorage.getItem(
            STUDYHUB_KEYS.selectedSubjects
        );


    /*
     * No saved selection:
     *
     * Do not pretend these are the
     * student's selected subjects.
     */

    if (!savedSubjects) {

        subjectContainer
            .querySelectorAll("li")
            .forEach((item) => {

                item.hidden = true;

            });

        return;

    }


    let selectedSubjects;


    try {

        selectedSubjects =
            JSON.parse(savedSubjects);

    } catch (error) {

        localStorage.removeItem(
            STUDYHUB_KEYS.selectedSubjects
        );

        subjectContainer
            .querySelectorAll("li")
            .forEach((item) => {

                item.hidden = true;

            });

        return;

    }


    if (!Array.isArray(selectedSubjects)) {

        localStorage.removeItem(
            STUDYHUB_KEYS.selectedSubjects
        );

        subjectContainer
            .querySelectorAll("li")
            .forEach((item) => {

                item.hidden = true;

            });

        return;

    }


    const normalizedSubjects =
        selectedSubjects
            .map((subject) =>
                String(subject)
                    .trim()
                    .toLowerCase()
            )
            .filter(Boolean);


    subjectContainer
        .querySelectorAll(
            "a[data-subject]"
        )
        .forEach((link) => {

            const subject =
                String(
                    link.dataset.subject || ""
                )
                .trim()
                .toLowerCase();


            const listItem =
                link.closest("li");


            if (!listItem) {
                return;
            }


            listItem.hidden =
                !normalizedSubjects.includes(
                    subject
                );

        });

}


/* =====================================================
   SAVE SELECTED SUBJECTS
   ===================================================== */

function saveSelectedSubjects(subjects) {

    if (!Array.isArray(subjects)) {
        return false;
    }


    const cleanedSubjects =
        subjects
            .map((subject) =>
                String(subject)
                    .trim()
                    .toLowerCase()
            )
            .filter(Boolean);


    if (!cleanedSubjects.length) {

        localStorage.removeItem(
            STUDYHUB_KEYS.selectedSubjects
        );

        return false;

    }


    localStorage.setItem(
        STUDYHUB_KEYS.selectedSubjects,
        JSON.stringify(cleanedSubjects)
    );


    return true;

}


/* =====================================================
   GRADE CALCULATOR INITIALIZATION
   ===================================================== */

function initializeGradeCalculator() {

    const gradingSystem =
        document.getElementById(
            "gradingSystem"
        );


    if (!gradingSystem) {
        return;
    }


    const savedLevel =
        getStudyHubGceLevel();


    /*
     * If the student has already selected
     * O/L or A/L, use that automatically.
     *
     * Otherwise leave the calculator's
     * existing selection untouched.
     */

    if (
        savedLevel &&
        (
            gradingSystem.value === "" ||
            gradingSystem.value === "general"
        )
    ) {

        gradingSystem.value =
            savedLevel;

    }

}


/* =====================================================
   GRADE CALCULATOR
   ===================================================== */

function calculateGrade() {

    const scoreInput =
        document.getElementById(
            "score"
        );


    const gradingSystem =
        document.getElementById(
            "gradingSystem"
        );


    const result =
        document.getElementById(
            "gradeResult"
        );


    if (
        !scoreInput ||
        !gradingSystem ||
        !result
    ) {
        return;
    }


    const score =
        Number(
            scoreInput.value
        );


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
     * These are StudyHub-configured bands.
     *
     * They are NOT being presented here as
     * official Cameroon GCE Board grade thresholds.
     *
     * Official GCE grading rules should be verified
     * before StudyHub labels these bands as official.
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
        gradingScales[
            gradingSystem.value
        ] ||
        gradingScales.general;


    const matchingGrade =
        scale.find(
            ([minimum]) =>
                score >= minimum
        );


    const grade =
        matchingGrade
            ? matchingGrade[1]
            : "—";


    const systemName = {

        general: "General",

        "gce-ol": "GCE O/L",

        "gce-al": "GCE A/L"

    }[
        gradingSystem.value
    ] || "General";


    result.textContent =
        `${systemName} Grade: ${grade}`;

}


/* =====================================================
   EXAM COUNTDOWN TOOL
   ===================================================== */

let countdownInterval = null;


function startCountdown() {

    const examNameInput =
        document.getElementById(
            "examName"
        );


    const examDateInput =
        document.getElementById(
            "examDate"
        );


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
        new Date(
            `${examDate}T00:00:00`
        );


    if (
        Number.isNaN(
            targetDate.getTime()
        )
    ) {

        setResult(
            result,
            "Enter a valid exam date."
        );

        return;

    }


    /*
     * Save the student's exam setup.
     */

    saveStudyHubExam(
        examName,
        examDate
    );


    /*
     * If the student has not yet chosen
     * O/L or A/L, we do not guess.
     *
     * The exam page should provide the
     * level selection and call
     * saveStudyHubGceLevel().
     */


    function updateCountdown() {

        const difference =
            targetDate.getTime() -
            Date.now();


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

        clearInterval(
            countdownInterval
        );

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
        Number(
            imageInput.value
        );


    const actualValue =
        Number(
            actualInput.value
        );


    const magnificationValue =
        Number(
            magnificationInput.value
        );


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


    function formatMagnification(
        value
    ) {

        if (
            !Number.isFinite(value)
        ) {

            return "—";

        }


        return `×${formatNumber(value)}`;

    }


    switch (calculation.value) {

        case "magnification": {

            if (
                !isValidPositiveNumber(
                    imageValue
                ) ||
                !isValidPositiveNumber(
                    actualValue
                )
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
                `Magnification = ${
                    formatMagnification(answer)
                }`;

            break;

        }


        case "actual": {

            if (
                !isValidPositiveNumber(
                    imageValue
                ) ||
                !isValidPositiveNumber(
                    magnificationValue
                )
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
                image /
                magnificationValue;


            result.textContent =
                `Actual size = ${
                    formatNumber(answer)
                } μm`;

            break;

        }


        case "image": {

            if (
                !isValidPositiveNumber(
                    actualValue
                ) ||
                !isValidPositiveNumber(
                    magnificationValue
                )
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
                actual *
                magnificationValue;


            result.textContent =
                `Image size = ${
                    formatNumber(answer)
                } μm`;

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

window.addEventListener(
    "pagehide",
    () => {

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

    }
);

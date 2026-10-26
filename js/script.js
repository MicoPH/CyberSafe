

// Total number of lessons
const totalLessons = lessons.length; // 30

const modulesNames = [
    "Introduction to Cybersecurity",
    "Phishing, Fake Websites, and Scam Activities",
    "Passwords, Privacy, and Account Guides",
    "Device Safety Lessons and Reminders",
    "Practical Scenarios and Response Guides"
]

const state = JSON.parse(localStorage.getItem("cybersafeState") || "null") || {
    completedLessons: [],
  completedModuleQuizzes: [],
    quizBestScore: 0,
  quizBestScores: {},
    points: 0,
    passwordChecks: 0,
    wordHuntBestScore: 0,
    wordHuntFoundWords: 0,
    activity: []
};
  state.completedLessons ??= [];
  state.completedModuleQuizzes ??= [];
  state.quizBestScores ??= {};
  state.quizProgress ??= null;
  state.phishingProgress ??= null;
  state.phishingLastOrder ??= null;
  state.phishingBestScore = Math.max(0, Math.min(100, Number(state.phishingBestScore) || 0));
  for (let moduleId = 1; moduleId <= 6; moduleId++) {
    state.quizBestScores[moduleId] = Number(state.quizBestScores[moduleId]) || 0;
  }

const activeTime = document.getElementById("datetime");

function saveState() {
    localStorage.setItem("cybersafeState", JSON.stringify(state));
    updateUI();
}

function addActivity(text) {
    state.activity.unshift({ text, time: new Date().toLocaleString() });
    state.activity = state.activity.slice(0, 8);
}

function toast(message) {
    const el = document.getElementById("toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

function navigate(page) {
    document.querySelectorAll(".page").forEach(p => p.classList.toggle("active", p.id === page));
    document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.page === page));
    document.getElementById("breadcrumb").textContent = document.querySelector(`.nav-item[data-page="${page}"]`)?.textContent.trim() || page;
    document.getElementById("sidebar").classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page === "quiz") renderQuiz();
    if (page === "results") renderResults();
    if (document.getElementById("overlay").classList.contains("activetask")){
      document.getElementById("overlay").classList.remove("activetask")
    }
    updateNavIcons()
}

function progressPercent() {
    return Math.round((state.completedLessons.length / lessons.length) * 100);
}

function isFinalBossCompleted() {
    return state.completedModuleQuizzes.includes(6) || Number(state.quizBestScores[6]) > 0;
}

function updateHeroContinueLearning() {
    const button = document.getElementById("heroContinueLearning");
    const completedAllQuizzes = Array.from({ length: 5 }, (_, index) => index + 1)
        .every(moduleId => state.completedModuleQuizzes.includes(moduleId)) && isFinalBossCompleted();
    const showGameActions = completedAllQuizzes && !state.quizProgress;
    const title = document.getElementById("heroTitle");
    const description = document.getElementById("heroDescription");
    const gameActions = document.getElementById("heroGameActions");

    if (button) {
        button.classList.toggle("hidden", showGameActions);
        button.textContent = state.quizProgress
            ? "Resume Quiz →"
            : "Continue Learning →";
    }
    title.textContent = showGameActions
        ? "Enjoy with other games"
        : "Build your cyber awareness.";
    description.textContent = showGameActions
        ? "You completed all quizzes, including the Final Boss. Keep practicing with these games."
        : "Learn how to recognize phishing, scams, unsafe links, weak passwords, and other common online threats.";
    gameActions.classList.toggle("hidden", !showGameActions);
}

function updateUI() {
    const progress = progressPercent();
    updateHeroContinueLearning();
    updatePhishingStartButton();
    updateLessonQuizAction();
    document.getElementById("sideProgress").textContent = progress + "%";
    document.getElementById("sideProgressBar").style.width = progress + "%";
    document.getElementById("dashProgressText").textContent = progress + "% complete";
    document.getElementById("dashProgressBar").style.width = progress + "%";
    document.getElementById("resultPercent").textContent = progress + "%";
    document.getElementById("resultProgressBar").style.width = progress + "%";
    document.getElementById("completedLessons").textContent = `${state.completedLessons.length}/${lessons.length}`;
    document.getElementById("whbestScore").textContent = state.wordHuntBestScore + "%";
    document.getElementById("passwordChecks").textContent = state.passwordChecks;
    document.getElementById("points").textContent = state.points;
    const blastHighScore = Math.max(0, Number(localStorage.getItem("blastScore")) || 0);
    document.getElementById("blastHighScore").textContent = blastHighScore.toLocaleString();
    document.getElementById("resultLessons").textContent = state.completedLessons.length;
    document.getElementById("resultBestWH").textContent = state.wordHuntBestScore + "%";
    document.getElementById("resultPhishingBestScore").textContent = state.phishingBestScore + "%";
    document.getElementById("resultPoints").textContent = state.points;
    document.getElementById("resultBlastHighScore").textContent =
        Math.max(0, Number(localStorage.getItem("blastScore")) || 0).toLocaleString();
    document.getElementById("topbar-exp").textContent = state.points + " XP"
    renderQuizBestScoreChart("dashboardQuizScores");
    renderQuizBestScoreChart("resultsQuizScores");
    document.querySelectorAll("[data-module-quiz]").forEach(button => {
      const moduleId = Number(button.dataset.moduleQuiz);
      const unlocked = isModuleQuizUnlocked(moduleId);
      button.disabled = !unlocked;
      button.closest(".activity-card")?.classList.toggle("hidden", !unlocked);
      button.textContent = state.completedModuleQuizzes.includes(moduleId)
        ? "Retake Quiz"
        : "Start Quiz";
    });
    const finalQuizButton = document.querySelector("[data-final-quiz]");
    if (finalQuizButton) {
      const unlocked = lessons.every(lesson =>
        state.completedModuleQuizzes.includes(Number(lesson.moduleId))
      ) && state.completedLessons.length >= lessons.length;
      finalQuizButton.disabled = !unlocked;
      finalQuizButton.closest(".activity-card")?.classList.toggle("hidden", !unlocked);
    }
    const finalBossCompleted = isFinalBossCompleted();
    const hypeBlastButton = document.getElementById("startHypeBlast");
    hypeBlastButton.disabled = !finalBossCompleted;
    hypeBlastButton.textContent = finalBossCompleted
        ? "Start HYPE BLAST"
        : "Locked — complete Final Boss";
    document.getElementById("hypeBlastLockMessage").classList.toggle("hidden", finalBossCompleted);
    document.getElementById("heroHypeBlastButton").disabled = !finalBossCompleted;
    renderLearningPath();
    renderLessons();
}

// Word Hunt Games


function renderResults() {
    const badges = [
        ["📘 First Lesson", state.completedLessons.length >= 1],
        ["🎓 Course Explorer", state.completedLessons.length >= 3],
        ["📘 Half on a Lesson Journey", state.completedLessons.length >= 6],
        ["🛡️ Cyber Aware", state.completedLessons.length === lessons.length],
        ["🌟 Points King", state.points >= 10000],
        ["🌟 Points Diamond", state.points >= 5000],
        ["🌟 Points Ruby", state.points >= 8000],
        ["🏆 Quiz Master", state.quizBestScore >= 100],
        ["🔐 Password Practice", state.passwordChecks >= 1],
        ["🏔️ Word Hunt Master", state.wordHuntFoundWords >= 8]
    ];
    document.getElementById("badges").innerHTML = badges.map(b => `<div class="badge-item ${b[1] ? "unlocked" : ""}">${b[0]} ${b[1] ? "✓" : "🔒"}</div>`).join("");
    document.getElementById("activityLog").innerHTML = state.activity.length
        ? state.activity.map(a => `<div class="activity-item"><strong>${a.text}</strong><span>${a.time}</span></div>`).join("")
        : `<p style="color:var(--muted)">No activity yet. Complete a lesson or quiz to see your activity here.</p>`;
}
let themeDark;
function applyTheme(value) {
    const dark = value === "dark" || (value === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.body.classList.toggle("dark", dark);
    if (dark){
        document.getElementById("favicon").href = "img/icons/cybersecurity_dark.png";
        document.getElementById("mainicon").src = "img/icons/cybersecurity_dark.png";
    } else {
        
        document.getElementById("favicon").href = "img/icons/cybersecurity_white.png";
        document.getElementById("mainicon").src = "img/icons/cybersecurity_white.png";
    }
    document.querySelectorAll("img.close-card").forEach(image => {
      image.src = dark ? "img/vector/exit_dark.svg" : "img/vector/exit.svg";
    });
    document.querySelectorAll("img.vector-nav").forEach(image => {
      
      const active = image.parentElement.classList.contains("active");
      if (dark) {
          image.src = active
              ? "img/vector/" + image.dataset.image + "_dark.svg"
              : "img/vector/" + image.dataset.image + "_dark_muted.svg";
      } else {
          image.src = active
              ? "img/vector/" + image.dataset.image + ".svg"
              : "img/vector/" + image.dataset.image + "_muted.svg";
      }
    });
    document.getElementById("themeSelect").value = value;
    themeDark = dark
}
function updateNavIcons() {
    document.querySelectorAll(".nav-item").forEach(item => {
        const image = item.querySelector("img.vector-nav");
        if (!image) return;

        const active = item.classList.contains("active");
        const hovered = window.matchMedia("(hover: hover) and (pointer: fine)").matches
            && item.matches(":hover");

        const highlighted = active || hovered;
        const name = image.dataset.image;

        if (themeDark) {
            image.src = highlighted
                ? `img/vector/${name}_dark.svg`
                : `img/vector/${name}_dark_muted.svg`;
        } else {
            image.src = highlighted
                ? `img/vector/${name}.svg`
                : `img/vector/${name}_muted.svg`;
        }
    });
}

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("mouseenter", updateNavIcons);
    item.addEventListener("mouseleave", updateNavIcons);
    item.addEventListener("click", () => {
        document.querySelectorAll(".nav-item.active").forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");
        updateNavIcons();
    });
});


document.querySelectorAll(".nav-item").forEach(btn => btn.addEventListener("click", () => navigate(btn.dataset.page)));

document.querySelectorAll("[data-go]").forEach(btn => btn.addEventListener("click", () => {
  if (btn.id === "heroContinueLearning" && state.quizProgress) {
    restoreQuizProgress(state.quizProgress);
    return;
  }
  navigate(btn.dataset.go);
}));

document.getElementById("menuBtn").addEventListener("click", () => {
  document.getElementById("sidebar").classList.toggle("open")
  document.getElementById("overlay").classList.add("activetask")

});

document.getElementById("overlay").addEventListener("click", () => {
  if (document.getElementById("overlay").classList.contains("activetask")){
    document.getElementById("sidebar").classList.toggle("open") 
    document.getElementById("overlay").classList.remove("activetask")
  }
})

document.getElementById("passwordInput").addEventListener("input", checkPassword);

document.getElementById("togglePassword").addEventListener("click", () => {
const input = document.getElementById("passwordInput");

input.type = input.type === "password" ? "text" : "password";
document.getElementById("togglePassword").textContent = input.type === "password" ? "Show" : "Hide";
});
document.getElementById("lengthRange").addEventListener("input", () => document.getElementById("lengthValue").textContent = document.getElementById("lengthRange").value);
document.getElementById("generatePassword").addEventListener("click", generatePassword);
document.getElementById("copyPassword").addEventListener("click", async () => {
const text = document.getElementById("generatedPassword").textContent;
if (text !== "Click Generate") {
    try { await navigator.clipboard.writeText(text); toast("Generated password copied."); }
    catch { toast("Copy was blocked by the browser."); }
}
});
document.getElementById("themeSelect").addEventListener("change", e => {
    localStorage.setItem("cybersafeTheme", e.target.value);
    applyTheme(e.target.value);
});
document.getElementById("resetData").addEventListener("click", () => {
    if (confirm("Reset all CyberSafe prototype data?")) {
        localStorage.removeItem("cybersafeState");
        localStorage.removeItem("hypeBlastProgress");
        state.completedLessons = [],
        state.completedModuleQuizzes = [],
        state.quizProgress = null,
        state.quizBestScore = 0,
        state.quizBestScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        state.points = 0,
        state.passwordChecks = 0,
        state.wordHuntBestScore = 0,
        state.wordHuntFoundWords = 0,
        state.phishingBestScore = 0,
        state.phishingProgress = null,
        state.phishingLastOrder = null,
        state.activity = [],
        saveState();
        renderResults();
        toast("Prototype data reset.");
    }
});




function resizepos(){
    document.getElementById("heightmargin").style.height = document.getElementById("topbar").offsetHeight + "px"
}
// resize 
document.body.addEventListener("resize", resizepos)
resizepos()
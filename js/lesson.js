function updateLessonQuizAction() {
    const action = document.getElementById("lessonQuizAction");
    const scoreboard = document.getElementById("quizScoreboard");
    const button = document.getElementById("lessonQuizActionButton");
    const title = document.getElementById("lessonQuizActionTitle");
    const message = document.getElementById("lessonQuizActionMessage");
    if (!button || !title || !message) return;

    action?.classList.remove("hidden");
    button.disabled = false;
    button.onclick = null;

    if (state.quizProgress) {
        scoreboard?.classList.add("hidden");
        const savedModule = state.quizProgress.module;
        title.textContent = "Resume latest quiz";
        message.textContent = `Resume your saved ${savedModule === 6 ? "Final Boss" : `Module ${savedModule}`} quiz where you left off.`;
        button.textContent = "Resume Quiz →";
        button.onclick = () => restoreQuizProgress(state.quizProgress);
        return;
    }

    const nextModule = modulesNames.findIndex((_, index) =>
        !state.completedModuleQuizzes.includes(index + 1)
    ) + 1;
    if (nextModule > 0) {
        if (!isModuleQuizUnlocked(nextModule)) {
            action?.classList.add("hidden");
            scoreboard?.classList.add("hidden");
            return;
        }
        title.textContent = "Latest quiz";
        message.textContent = `Take the Module ${nextModule} quiz to unlock the next module.`;
        button.textContent = `Take Module ${nextModule} Quiz →`;
        button.onclick = () => startQuiz(nextModule);
        return;
    }

    const allLessonsComplete = lessons.every(lesson =>
        state.completedLessons.includes(lesson.id)
    );
    if (!allLessonsComplete) {
        action?.classList.add("hidden");
        scoreboard?.classList.add("hidden");
        return;
    }

    if (isFinalBossCompleted()) {
        title.textContent = "All quizzes completed";
        message.textContent = "You have completed every quiz. Retaking quizzes is disabled.";
        button.textContent = "Quiz completed";
        button.disabled = true;
        scoreboard?.classList.add("hidden");
        return;
    }

    title.textContent = "Final Boss quiz";
    message.textContent = "All module quizzes are complete. Take the Final Boss quiz!";
    button.textContent = "Take Final Boss →";
    button.onclick = () => startQuiz(false);
}

  function renderQuizBestScoreChart(containerId) {
    const container = document.getElementById(containerId);
    const labels = ["Module 1", "Module 2", "Module 3", "Module 4", "Module 5", "Final Boss"];
    container.innerHTML = labels.map((label, index) => {
      const score = Math.max(0, Math.min(100, Number(state.quizBestScores[index + 1]) || 0));
      return `<div class="quiz-best-score">
        <span>${label}</span>
        <div class="quiz-best-score-track" role="img" aria-label="${label} best score: ${score}%">
          <div class="quiz-best-score-fill" style="width: ${score}%"></div>
        </div>
        <strong>${score}%</strong>
      </div>`;
    }).join("");
  }

function renderLearningPath() {
    document.getElementById("learningPath").innerHTML = lessons.map(l => {
    const done = state.completedLessons.includes(l.id);
    return `<div class="path-item ${done ? "done" : ""}">
        <div class="path-check">${l.id}</div><strong>${l.title}</strong>
        <span style="margin-left:auto;color:var(--muted);font-size:12px">${done ? "Completed" : "Start"}</span>
        </div>`;
    }).join("");
}


const completedLessons = {
  has: lessonId => state.completedLessons.includes(lessonId)
};

function getModuleProgress(moduleId) {
  const moduleLessons = lessons.filter(
    lesson => lesson.moduleId === moduleId
  );

  const total = moduleLessons.length;

  const completed = moduleLessons.filter(
    lesson => completedLessons.has(lesson.id)
  ).length;

  return {
    completed,
    total,
    percentage: total ? (completed / total) * 100 : 0
  };
}

function isModuleUnlocked(moduleId) {
  return moduleId === 1 || state.completedModuleQuizzes.includes(moduleId - 1);
}

function isModuleQuizUnlocked(moduleId) {
  const moduleLessons = lessons.filter(lesson => Number(lesson.moduleId) === moduleId);
  return isModuleUnlocked(moduleId) && moduleLessons.length > 0 &&
    moduleLessons.every(lesson => state.completedLessons.includes(lesson.id));
}

function createModuleProgress(moduleId) {
  const progress = getModuleProgress(moduleId);

  const container = document.createElement("div");
  container.className = "module-progress";

  const text = document.createElement("span");
  text.className = "module-progress-text";
  text.textContent = `${progress.completed} of ${progress.total}`;

  const track = document.createElement("div");
  track.className = "module-progress-track";

  const fill = document.createElement("div");
  fill.className = "module-progress-fill";
  fill.style.width = `${progress.percentage}%`;

  track.appendChild(fill);
  container.append(text, track);

  return container;
}

function renderLessons() {
    const lessonsContainer = document.getElementById("lessons");

    // Remove previously rendered module sections.
    lessonsContainer
        .querySelectorAll(".module-section")
        .forEach(section => section.remove());

    // Create each module section in the correct order.
    [...modulesNames].reverse().forEach((name, index) => {
      const moduleId = modulesNames.length - index;
      const moduleUnlocked = isModuleUnlocked(moduleId);


        const moduleSection = document.createElement("section");
        moduleSection.classList.add("module-section");
        moduleSection.style.overflow = "hidden"
        if (!moduleUnlocked) moduleSection.style.display = "none";

        const modtxt = document.createElement("div");
        modtxt.classList.add("modtitletxt")
        const moduleTitle = document.createElement("h3");
        moduleTitle.textContent = `Module ${moduleId}: ${name}`;
        moduleTitle.style.display = "block"
        moduleTitle.style.width = "100%"  
        moduleTitle.style.textWrap = 'nowrap'
        moduleTitle.style.textOverflow = "ellipsis"
        moduleTitle.style.overflow = "hidden"
        modtxt.appendChild(moduleTitle);

        // Calculate progress for this module.
        const moduleLessons = lessons.filter(
            lesson => Number(lesson.moduleId) === moduleId
        );

        const completed = moduleLessons.filter(
            lesson => state.completedLessons.includes(lesson.id)
        ).length;

        const total = moduleLessons.length;
        const percentage = total ? (completed / total) * 100 : 0;

        // Create module progress indicator.
        const moduleprog = document.createElement("div");
        moduleprog.classList.add("module-progress");

        const moduleprogtext = document.createElement("span");
        moduleprogtext.classList.add("module-progress-text");
        moduleprogtext.textContent = `${completed} of ${total}`;


        const moduleprogtrack = document.createElement("div");
        moduleprogtrack.classList.add("module-progress-track");

        const moduleprogtrackfill = document.createElement("div");
        moduleprogtrackfill.classList.add("module-progress-fill");
        moduleprogtrackfill.style.width = `${percentage}%`;

        moduleprogtrack.appendChild(moduleprogtrackfill);
        moduleprog.append(moduleprogtext, moduleprogtrack);

        const lessonGrid = document.createElement("div");
        lessonGrid.classList.add("lesson-grid");
        lessonGrid.id = `module${moduleId}`;

        moduleSection.appendChild(modtxt);

        const moduleStatus = document.createElement("span");
        moduleStatus.classList.add("module-status");
        moduleStatus.textContent = !moduleUnlocked
          ? `Locked: complete Module ${moduleId - 1} quiz first`
          : state.completedModuleQuizzes.includes(moduleId)
            ? "Module quiz completed"
            : completed === total
              ? "Module quiz unlocked"
              : "Complete all lessons and activities";
        moduleSection.appendChild(moduleStatus);

        const btns = document.createElement("div");
        btns.classList.add("button-layout");
        const autoPlayButton = document.createElement("img");
        autoPlayButton.classList.add("autoplay-btn");
        autoPlayButton.width = "70"
        autoPlayButton.height = "70"
        autoPlayButton.src = "img/vector/play.svg"
        autoPlayButton.dataset.autoModule = moduleId;
        autoPlayButton.disabled = autoLessonModuleId === moduleId;
        autoPlayButton.textContent = autoLessonModuleId === moduleId
          ? "Auto-play in progress..."
          : `Auto-play Module ${moduleId}`;
        autoPlayButton.addEventListener("click", () => startAutoLessonSequence(moduleId));
        btns.appendChild(autoPlayButton);
        moduleSection.appendChild(btns);
        moduleSection.appendChild(moduleprog);
        moduleSection.appendChild(lessonGrid);
        let nolessons = 0;

        // Add this module to the lessons container.
        lessonsContainer.appendChild(moduleSection);
        moduleLessons.forEach(l => {
            nolessons += 1;
            const done = state.completedLessons.includes(l.id);

            const card = document.createElement("article");
            card.classList.add("lesson-card");

            card.innerHTML = `
                <div class="lesson-number">
                    LESSON ${String(nolessons).padStart(2, "0")}
                </div>

                <div class="lesson-icon"
                     style="">
                    ${l.icon}
                </div>

                <h3></h3>
                <p></p>

                <div class="card-footer">
                    <span class="badge ${done ? "done" : ""}">
                        ${done ? "✓" : "〇"}
                    </span>

                    <button class="primary-btn" type="button">
                      ${!moduleUnlocked ? "Locked" : done ? "Review" : "Learn"}
                    </button>
                </div>
            `;

            // Safely insert lesson text.
            card.querySelector("h3").textContent = l.title;
            card.querySelector("p").textContent = l.description;

            card.querySelector("button").disabled = !moduleUnlocked;
            card.querySelector("button").addEventListener("click", () => {
                openLesson(l.id);
            });

            lessonGrid.appendChild(card);
        });
    });
}


let lessonCountdown;
let remainingSeconds = 30;
let autoLessonQueue = null;
let autoLessonAdvanceTimer;
let autoLessonModuleId = null;

function startAutoLessonSequence(moduleId) {
  if (autoLessonQueue) return;

  const moduleLessons = lessons.filter(lesson => Number(lesson.moduleId) === moduleId);
  if (!isModuleUnlocked(moduleId) || moduleLessons.length === 0) return;

  autoLessonModuleId = moduleId;
  autoLessonQueue = lessons
    .filter(lesson => Number(lesson.moduleId) === moduleId)
    .map(lesson => lesson.id);
  const button = document.querySelector(`[data-auto-module="${moduleId}"]`);
  if (button) {
    button.disabled = true;
    button.textContent = "Auto-play in progress...";
  }

  navigate("lessons");
  advanceAutoLessonSequence();
}

function advanceAutoLessonSequence() {
  if (!autoLessonQueue) return;

  const nextLessonId = autoLessonQueue.shift();
  if (nextLessonId === undefined) {
    const finishedModuleId = autoLessonModuleId;
    autoLessonQueue = null;
    autoLessonModuleId = null;
    const button = document.querySelector(`[data-auto-module="${finishedModuleId}"]`);
    if (button) {
      button.disabled = false;
      button.textContent = `Auto-play Module ${finishedModuleId}`;
    }
    closelesson();
    toast(`Module ${finishedModuleId} lessons completed.`);
    return;
  }

  openLesson(nextLessonId);
}

function recordLessonCompletion(id) {
  if (state.completedLessons.some(completedId => Number(completedId) === Number(id))) {
    return false;
  }

  const lesson = lessons.find(item => Number(item.id) === Number(id));
  if (!lesson) return false;

  state.completedLessons.push(id);
  state.points += 20;
  addActivity(`Completed lesson: ${lesson.title}`);
  saveState();
  return true;
}

function completeAutoLesson(id) {
  recordLessonCompletion(id);
  clearTimeout(autoLessonAdvanceTimer);
  autoLessonAdvanceTimer = setTimeout(advanceAutoLessonSequence, 20000);
}

function advanceAutoLessonFromButton(id) {
  if (!autoLessonQueue) return;
  recordLessonCompletion(id);
  clearInterval(lessonCountdown);
  clearTimeout(autoLessonAdvanceTimer);
  advanceAutoLessonSequence();
}


function openLesson(id) {
    clearInterval(lessonCountdown);

    const lesson = lessons.find(l => Number(l.id) === Number(id));
    if (!lesson) return;
    if (!isModuleUnlocked(Number(lesson.moduleId))) {
      toast(`Complete Module ${lesson.moduleId - 1} quiz to unlock this module.`);
      return;
    }
    pushAppModalHistory("lesson", closeLessonWindow);

    const detail = document.getElementById("lessonDetail");
    const overlay = document.getElementById("overlay");
    const moduleLessonNumber = lessons
        .filter(item => item.moduleId === lesson.moduleId)
        .findIndex(item => item.id === lesson.id) + 1;

    remainingSeconds = 5;

    const alreadyCompleted = state.completedLessons.some(
        completedId => Number(completedId) === Number(id)
    );

    overlay.classList.add("active");
    detail.style.animation = "";
    detail.classList.remove("hidden");

    detail.innerHTML = `

        <div class="lesson-height" style="--navbar-height: ${navbarheight}px"></div>
        <span class="eyebrow">Lesson ${String(moduleLessonNumber).padStart(2, "0")}</span>
        <div class="panel-title">
            <h2>${lesson.title}</h2>
            <img height="30" src="${themeDark ? "img/vector/exit_dark.svg" : "img/vector/exit.svg"}" class="close-card" onclick="closelesson()">
        </div>
        <div class="lesson-icon">${lesson.icon}</div>

        ${lesson.content}

        ${
            lesson.miniactivity && !alreadyCompleted
                ? `
                    <section class="mini-activity">
                        <h3>Mini Activity</h3>
                        <p>${lesson.miniquestion}</p>

                        <div id="miniAnswers">
                            ${lesson.minianswers.map((answer, index) => `
                                <label class="mini-option">
                                    <input
                                        type="radio"
                                        name="miniAnswer"
                                        value="${index}"
                                    >
                                    <span>${answer}</span>
                                </label>
                            `).join("")}
                        </div>

                        <button
                            type="button"
                            class="primary-btn"
                            id="checkMiniAnswer"
                        >
                            Check Answer
                        </button>

                        <p id="miniFeedback" aria-live="polite">
                            Choose an answer, then check it.
                        </p>
                    </section>
                `
                : lesson.miniactivity
                    ? ""
                : `
                    <div class="lesson-timer">
                        <span>Time remaining:</span>
                        <strong id="countdown">${remainingSeconds}s</strong>
                    </div>

                    <p id="timerMessage" aria-live="polite">
                        Finish the countdown to complete this lesson.
                    </p>
                `
        }

        <button
            id="completeLessonButton"
            class="primary-btn"
            ${!alreadyCompleted ? "disabled" : ""}
            onclick="${autoLessonQueue ? `advanceAutoLessonFromButton(${lesson.id})` : `completeLesson(${lesson.id})`}"
        >
            ${autoLessonQueue
                ? autoLessonQueue.length > 0 ? "Next Lesson →" : "End Module"
                : alreadyCompleted ? "Completed ✓" : "Mark as completed"}
        </button>
    `;

    detail.scrollIntoView({ behavior: "smooth", block: "start" });

    if (alreadyCompleted) {
      if (autoLessonQueue) {
        autoLessonAdvanceTimer = setTimeout(advanceAutoLessonSequence, 5000);
      }
      return;
    }

    // Mini-activity lessons require a correct answer.
    if (lesson.miniactivity) {
        const checkButton = document.getElementById("checkMiniAnswer");
        const feedback = document.getElementById("miniFeedback");
        const completeButton = document.getElementById("completeLessonButton");

        checkButton.addEventListener("click", () => {
            const selected = detail.querySelector(
                'input[name="miniAnswer"]:checked'
            );

            if (!selected) {
                feedback.textContent = "Please select an answer first.";
                return;
            }

            const correct = Number(selected.value) === Number(lesson.answer);

            if (correct) {
                feedback.textContent = "Correct! Lesson completed.";
                feedback.style.color = "green";

                completeButton.disabled = false;
                checkButton.disabled = true;

                detail.querySelectorAll(
                    'input[name="miniAnswer"]'
                ).forEach(input => {
                    input.disabled = true;
                });

                if (autoLessonQueue) {
                    completeAutoLesson(id);
                } else {
                    if (recordLessonCompletion(id)) {
                        toast("Lesson completed! +20 XP");
                    }
                    closelesson();
                }
            } else {
                feedback.textContent = "Not quite. Try another answer.";
                feedback.style.color = "crimson";
            }
        });

        return;
    }

    // Lessons without mini-activities use the countdown.
    lessonCountdown = setInterval(() => {
        remainingSeconds--;

        const countdown = document.getElementById("countdown");

        if (!countdown) {
            clearInterval(lessonCountdown);
            return;
        }

        countdown.textContent = `${remainingSeconds}s`;

        if (remainingSeconds <= 0) {
            clearInterval(lessonCountdown);

            countdown.textContent = "0s";

            document.getElementById("timerMessage").textContent =
                "Time is up! You can now complete this lesson.";

            const button = document.getElementById("completeLessonButton");
            button.disabled = false;

            if (autoLessonQueue) {
              completeAutoLesson(id);
            }
        }
    }, 1000);
}


function closelesson() {
    closeAppModalHistory("lesson", closeLessonWindow);
}

function closeLessonWindow() {
    clearInterval(lessonCountdown);
        clearTimeout(autoLessonAdvanceTimer);
        if (autoLessonQueue) {
          const moduleId = autoLessonModuleId;
          autoLessonQueue = null;
          autoLessonModuleId = null;
          const button = document.querySelector(`[data-auto-module="${moduleId}"]`);
          if (button) {
            button.disabled = false;
            button.textContent = `Auto-play Module ${moduleId}`;
          }
        }
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('lessonDetail').style.animation = 'lesson-detail-animationOut 0.3s ease forwards';
    setTimeout(() => {
        document.getElementById('lessonDetail').classList.add('hidden');
    }, 300);
}
function completeLesson(id) {
    if (recordLessonCompletion(id)) {
        toast("Lesson completed! +20 XP");
    } else {
        toast("This lesson is already completed.");
    }

      if (autoLessonQueue) {
        clearInterval(lessonCountdown);
        autoLessonAdvanceTimer = setTimeout(advanceAutoLessonSequence, 5000);
        return;
      }

    openLesson(id);
    closelesson();
}
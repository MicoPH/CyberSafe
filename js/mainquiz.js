// Quiz Game
let currentQuiz = 0;
let quizScore = 0;
let quizAnswered = false;
let quizTimerId;
let quizTimeRemaining = 15;
const quizQuestionTime = 15;
const quizAdvanceDelay = 5;

function startQuiz(number) {
  const requestedModule = number || 6;
  if (state.quizProgress?.module === requestedModule) {
    quizLaunchPage = document.querySelector(".page.active")?.id || state.quizProgress.launchPage || "interactive";
    restoreQuizProgress(state.quizProgress);
    return;
  }

  if (number && !isModuleQuizUnlocked(number)) {
    const previousModule = number > 1 && !isModuleUnlocked(number)
      ? ` Complete Module ${number - 1} quiz first.`
      : " Complete all lessons and activities in this module first.";
    toast(`Module ${number} quiz is locked.${previousModule}`);
    return;
  }

    const moduleLessons = lessons.filter(
        lesson => Number(lesson.moduleId) === number
    );

    const completed = moduleLessons.filter(
        lesson => state.completedLessons.includes(lesson.id)
    ).length;
    
    const total = moduleLessons.length
    if (number){
        if (completed < total) {
            toast(`You need to complete all lessons in module ${number} before taking the quiz.`);
            return;
        } else {
          quizLaunchPage = document.querySelector(".page.active")?.id || "interactive";
          document.getElementById("quizScoreboard").classList.add("hidden");
            document.getElementById("overlay").classList.add("active");
            document.getElementById("quizCard").style.display = "block";
            document.getElementById("quizCard").classList.remove("hidden");
            prepareQuizQuestions(number);
            renderQuiz(number);
        }
    } else {
        const allModuleQuizzesCompleted = modulesNames.every((_, index) =>
          state.completedModuleQuizzes.includes(index + 1)
        );
        if (allModuleQuizzesCompleted && state.completedLessons.length >= lessons.length) {
          quizLaunchPage = document.querySelector(".page.active")?.id || "interactive";
          document.getElementById("quizScoreboard").classList.add("hidden");
            document.getElementById("overlay").classList.add("active");
            document.getElementById("quizCard").style.display = "block";
            document.getElementById("quizCard").classList.remove("hidden");
            prepareQuizQuestions(6);
            renderQuiz(6);
        } else {
            toast("You need to complete all lessons before taking the quiz.");
            return;
        }
    }
}
let currquizmodule = 0;
let quizQuestions;
let quizLaunchPage = "interactive";
function shuffleQuizItems(items) {
    const shuffled = [...items];
    for (let index = shuffled.length - 1; index > 0; index--) {
        const randomIndex = Math.floor(Math.random() * (index + 1));
        [shuffled[index], shuffled[randomIndex]] = [shuffled[randomIndex], shuffled[index]];
    }
    return shuffled;
}

function prepareQuizQuestions(number) {
    const sourceQuestions = number >= 1 && number <= 5
        ? [module1, module2, module3, module4, module5][number - 1]
        : quizQuestionsFull;
    quizQuestions = shuffleQuizItems(sourceQuestions.map(question => {
        const answers = shuffleQuizItems(question.answers.map((answer, index) => ({
            answer,
            isCorrect: index === question.correct
        })));
        return {
            ...question,
            answers: answers.map(item => item.answer),
            correct: answers.findIndex(item => item.isCorrect)
        };
    }));
    currentQuiz = 0;
    quizScore = 0;
    currquizmodule = number;
}

function persistQuizProgress(phase, deadline, selectedAnswer = null) {
    state.quizProgress = {
        module: currquizmodule,
        questions: quizQuestions,
        currentQuestion: currentQuiz,
        score: quizScore,
        phase,
        deadline,
        selectedAnswer,
        launchPage: quizLaunchPage
    };
    localStorage.setItem("cybersafeState", JSON.stringify(state));
    updateHeroContinueLearning();
    updateLessonQuizAction();
}

function clearQuizTimers() {
    clearInterval(quizTimerId);
}

function startQuizTimer(phase, deadline, selectedAnswer = null) {
    clearQuizTimers();
    const timer = document.getElementById("quizTimer");
    const updateCountdown = () => {
        quizTimeRemaining = Math.max(0, Math.ceil((deadline - Date.now()) / 1000));
        timer.textContent = phase === "cooldown"
            ? `Next in ${quizTimeRemaining}s`
            : `${quizTimeRemaining}s`;
        timer.classList.toggle("is-urgent", phase === "question" && quizTimeRemaining <= 5);
        if (quizTimeRemaining <= 0) {
            clearInterval(quizTimerId);
            if (phase === "question") {
                answerQuiz(null);
            } else {
                nextQuestion();
            }
        }
    };
    persistQuizProgress(phase, deadline, selectedAnswer);
    updateCountdown();
    if (quizTimeRemaining > 0 && state.quizProgress?.phase === phase) {
        quizTimerId = setInterval(() => {
            updateCountdown();
        }, 250);
    }
}

function startQuizQuestionTimer(deadline = Date.now() + quizQuestionTime * 1000) {
    startQuizTimer("question", deadline);
}

function showQuizAnswer(index) {
    const q = quizQuestions[currentQuiz];
    const buttons = document.querySelectorAll(".answer");
    buttons[q.correct].classList.add("correct");
    if (index === q.correct) {
        buttons[index].classList.add("correct");
        document.getElementById("quizFeedback").innerHTML = `<div class="feedback good"><strong>Correct!</strong> ${q.why}</div>`;
    } else if (index === null) {
        document.getElementById("quizFeedback").innerHTML = `<div class="feedback bad"><strong>Time's up!</strong> ${q.why}</div>`;
    } else {
        buttons[index].classList.add("wrong");
        document.getElementById("quizFeedback").innerHTML = `<div class="feedback bad"><strong>Not quite.</strong> ${q.why}</div>`;
    }
    buttons.forEach(button => button.disabled = true);
    document.getElementById("quizScore").textContent = `Score: ${quizScore}`;
}

function renderQuiz(number, resumeProgress = null) {
  number = number ?? currquizmodule;
  if (!quizQuestions || number !== currquizmodule) {
      prepareQuizQuestions(number);
  }
  const q = quizQuestions[currentQuiz];
    currquizmodule = number;

    document.getElementById("quizNumber").textContent = `Question ${currentQuiz + 1} of ${quizQuestions.length}`;
    document.getElementById("quizScore").textContent = `Score: ${quizScore}`;
    document.getElementById("quizProgress").style.width = `${((currentQuiz + 1) / quizQuestions.length) * 100}%`;
    quizAnswered = false;
    document.getElementById("quizContent").innerHTML = `<h2 class="question">${q.q}</h2>
        <div class="scenario"><strong>Scenario:</strong> ${q.scenario}</div>
        <div class="answers">${q.answers.map((a, i) => `<button class="answer" onclick="answerQuiz(${i}, ${number})">${String.fromCharCode(65+i)}. ${a}</button>`).join("")}</div>
        <div id="quizFeedback"></div>`;
    if (resumeProgress?.phase === "cooldown") {
        quizAnswered = true;
        showQuizAnswer(resumeProgress.selectedAnswer);
        startQuizTimer("cooldown", resumeProgress.deadline, resumeProgress.selectedAnswer);
    } else {
        startQuizQuestionTimer(resumeProgress?.deadline);
    }
}

function answerQuiz(index) {
    if (quizAnswered) return;
    quizAnswered = true;
    clearInterval(quizTimerId);
    if (index === quizQuestions[currentQuiz].correct) quizScore++;
    showQuizAnswer(index);
    startQuizTimer("cooldown", Date.now() + quizAdvanceDelay * 1000, index);
}

function nextQuestion() {
    clearQuizTimers();
    if (currentQuiz < quizQuestions.length - 1) {
        currentQuiz++;
        renderQuiz();
    } else {
        const percent = Math.round((quizScore / quizQuestions.length) * 100);
      const correctAnswers = quizScore;
      const questionCount = quizQuestions.length;
      const completedModule = currquizmodule;
        if (currquizmodule >= 1 && currquizmodule <= modulesNames.length + 1 &&
          !state.completedModuleQuizzes.includes(currquizmodule)) {
          state.completedModuleQuizzes.push(currquizmodule);
        }
        state.quizBestScores[currquizmodule] = Math.max(
          state.quizBestScores[currquizmodule] || 0,
          percent
        );
        state.quizBestScore = Math.max(state.quizBestScore, percent);
        state.points += percent;
        addActivity(`Completed quiz: ${percent}% (${quizScore}/${quizQuestions.length})`);
        state.quizProgress = null;
        saveState();
        toast(`Quiz complete: ${percent}%`);
        currentQuiz = 0;
        quizScore = 0;
        
        document.getElementById('overlay').classList.remove('active');
        document.getElementById('quizCard').style.animation = 'lesson-detail-animationOut 0.3s ease forwards';
        setTimeout(() => {
            document.getElementById('quizCard').classList.add('hidden');
            document.getElementById('quizCard').style.animation = '';
          if (quizLaunchPage === "lessons") {
            if (completedModule === 5) {
              toast("Module 5 complete! Starting the Final Boss quiz.");
              startQuiz(false);
            } else if (document.getElementById("lessonQuizAction").classList.contains("hidden")) {
              document.getElementById("quizScoreboard").classList.add("hidden");
            } else {
              showQuizScoreboard(completedModule, percent, correctAnswers, questionCount);
            }
          } else {
            navigate("results");
          }
        }, 300);
    }
}

function showQuizScoreboard(moduleId, percent, correctAnswers, questionCount) {
  const scoreboard = document.getElementById("quizScoreboard");
  const pointsEarned = percent;
  scoreboard.innerHTML = `
    <div class="panel-title">
      <h2>Quiz Scoreboard</h2>
      <strong>${percent}%</strong>
    </div>
    <p>Module ${moduleId === 6 ? "Final" : moduleId} quiz complete.</p>
    <div class="scoreboard-chart" role="img" aria-label="Quiz score: ${percent}%">
      <div class="scoreboard-chart-fill" style="width: ${percent}%"></div>
    </div>
    <div class="scoreboard-stats">
      <div><strong>${correctAnswers}/${questionCount}</strong><span>Correct answers</span></div>
      <div><strong>${percent}%</strong><span>Quiz score</span></div>
      <div><strong>+${pointsEarned}</strong><span>Points earned</span></div>
    </div>
  `;
  scoreboard.classList.remove("hidden");
  scoreboard.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function closeQuiz() {
    clearQuizTimers();
    if (state.quizProgress) {
        state.quizProgress.deadline = Date.now() + Math.max(1, quizTimeRemaining) * 1000;
    }
    localStorage.setItem("cybersafeState", JSON.stringify(state));
    
    document.getElementById('overlay').classList.remove('active');
    document.getElementById('quizCard').style.animation = 'lesson-detail-animationOut 0.3s ease forwards';
    setTimeout(() => {
        document.getElementById('quizCard').classList.add('hidden');
        document.getElementById('quizCard').style.animation = '';
    }, 300);
}

function restoreQuizProgress(progress) {
    const isValid = Number.isInteger(progress.module)
        && progress.module >= 1
        && progress.module <= 6
        && Array.isArray(progress.questions)
        && progress.questions.length > 0
        && Number.isInteger(progress.currentQuestion)
        && progress.currentQuestion >= 0
        && progress.currentQuestion < progress.questions.length
        && Number.isFinite(progress.deadline)
        && ["question", "cooldown"].includes(progress.phase)
        && (progress.phase !== "cooldown"
            || progress.selectedAnswer === null
            || (Number.isInteger(progress.selectedAnswer)
                && progress.selectedAnswer >= 0
                && Array.isArray(progress.questions[progress.currentQuestion].answers)
                && progress.selectedAnswer < progress.questions[progress.currentQuestion].answers.length));
    if (!isValid) {
        state.quizProgress = null;
        localStorage.setItem("cybersafeState", JSON.stringify(state));
        return;
    }

    currentQuiz = progress.currentQuestion;
    quizScore = Number(progress.score) || 0;
    currquizmodule = progress.module;
    quizQuestions = progress.questions;
    quizLaunchPage = document.getElementById(progress.launchPage)?.classList.contains("page")
        ? progress.launchPage
        : "interactive";
    navigate(quizLaunchPage);
    document.getElementById("quizScoreboard").classList.add("hidden");
    document.getElementById("overlay").classList.add("active");
    document.getElementById("quizCard").style.display = "block";
    document.getElementById("quizCard").classList.remove("hidden");
    renderQuiz(currquizmodule, progress);
}
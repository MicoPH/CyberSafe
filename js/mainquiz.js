// Quiz Game
let currentQuiz = 0;
let quizScore = 0;
let quizAnswered = false;
let quizTimerId;
let quizTimeRemaining = 15;
const quizQuestionTime = 15;
const quizAdvanceDelay = 5;
let uploadedQuizMode = false;
let uploadedQuizVersion = null;
let uploadedQuizUid = null;
let uploadedQuizAnswers = [];
let isSubmittingUploadedQuiz = false;

async function startQuiz(number) {
  const requestedModule = number || 6;
  if (state.quizProgress?.module === requestedModule) {
    quizLaunchPage = document.querySelector(".page.active")?.id || state.quizProgress.launchPage || "interactive";
    restoreQuizProgress(state.quizProgress);
    return;
  }

  const quizAlreadyCompleted = requestedModule === 6
    ? isFinalBossCompleted()
    : state.completedModuleQuizzes.includes(requestedModule);
  if (quizAlreadyCompleted) {
    toast(`${requestedModule === 6 ? "Final Boss" : `Module ${requestedModule}`} quiz is already completed. Retakes are disabled.`);
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
            try {
                const uploadedQuiz = await loadUploadedModuleQuestions(number);
                if (uploadedQuiz?.alreadySubmitted) {
                    toast(`You have already submitted the Module ${number} quiz. Each quiz version allows one attempt.`);
                    return;
                }
                prepareQuizQuestions(number, uploadedQuiz);
            } catch (error) {
                console.error(`Could not load the uploaded quiz for module ${number}.`, error);
                toast(`Could not load Module ${number} quiz. Check your connection and Realtime Database rules.`);
                return;
            }
            quizLaunchPage = document.querySelector(".page.active")?.id || "interactive";
            document.getElementById("quizScoreboard").classList.add("hidden");
            document.getElementById("overlay").classList.add("active");
            document.getElementById("quizCard").style.display = "block";
            document.getElementById("quizCard").classList.remove("hidden");
            renderQuiz(number);
        }
    } else {
        const allModuleQuizzesCompleted = modulesNames.every((_, index) =>
          state.completedModuleQuizzes.includes(index + 1)
        );
        if (allModuleQuizzesCompleted && state.completedLessons.length >= lessons.length) {
          let uploadedQuiz;
          try {
              uploadedQuiz = await loadUploadedModuleQuestions(6);
          } catch (error) {
              console.error("Could not load the uploaded Final Boss quiz.", error);
              toast("Could not load the Final Boss quiz. Check your connection and Realtime Database rules.");
              return;
          }
          if (uploadedQuiz?.alreadySubmitted) {
              toast("You have already submitted the Final Boss quiz. Each quiz version allows one attempt.");
              return;
          }
          quizLaunchPage = document.querySelector(".page.active")?.id || "interactive";
          document.getElementById("quizScoreboard").classList.add("hidden");
          document.getElementById("overlay").classList.add("active");
          document.getElementById("quizCard").style.display = "block";
          document.getElementById("quizCard").classList.remove("hidden");
          prepareQuizQuestions(6, uploadedQuiz);
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

async function loadUploadedModuleQuestions(moduleId) {
    const snapshot = await firebase.database().ref(`quizzes/modules/${moduleId}`).once("value");
    if (!snapshot.exists()) {
        if (moduleId === 6) return null;
        throw new Error(`No quiz has been uploaded for module ${moduleId}.`);
    }

    const uploadedQuiz = snapshot.val();
    if (String(uploadedQuiz.moduleId) !== String(moduleId) ||
        typeof uploadedQuiz.version !== "string" ||
        !Array.isArray(uploadedQuiz.questions) ||
        uploadedQuiz.questions.length === 0) {
        throw new Error(`Uploaded quiz data for module ${moduleId} is invalid.`);
    }

    const user = auth.currentUser;
    if (!user) {
        throw new Error("Sign in to take this quiz.");
    }

    const attempt = await firebase.database()
        .ref(`quizAttempts/${user.uid}/${moduleId}/${uploadedQuiz.version}`)
        .once("value");
    if (attempt.exists()) {
        return { alreadySubmitted: true };
    }

    const answerSnapshot = await firebase.database()
        .ref(`quizAnswerKeys/${moduleId}/${uploadedQuiz.version}/answers`)
        .once("value");
    const answerKeys = answerSnapshot.val();
    if (!Array.isArray(answerKeys) || answerKeys.length !== uploadedQuiz.questions.length) {
        throw new Error(`Answer key for module ${moduleId} is missing or invalid.`);
    }

    uploadedQuiz.questions = uploadedQuiz.questions.map((question, index) => {
        if (!question || typeof question.q !== "string" || !question.q.trim() ||
            !Array.isArray(question.answers) || question.answers.length < 2 ||
            question.answers.some(answer => typeof answer !== "string" || !answer.trim()) ||
            !Number.isInteger(answerKeys[index]) ||
            answerKeys[index] < 0 ||
            answerKeys[index] >= question.answers.length) {
            throw new Error(`Uploaded quiz question ${index + 1} is invalid.`);
        }

        return {
            q: question.q,
            scenario: typeof question.scenario === "string" ? question.scenario : "",
            answers: question.answers,
            correct: answerKeys[index],
            why: typeof question.why === "string" ? question.why : ""
        };
    });

    return uploadedQuiz;
}

function prepareQuizQuestions(number, uploadedQuiz = null) {
    if (number >= 1 && number <= 5 && !uploadedQuiz) {
        throw new Error(`Module ${number} quizzes must be loaded from Realtime Database.`);
    }

    uploadedQuizMode = Boolean(uploadedQuiz && !uploadedQuiz.alreadySubmitted);
    uploadedQuizVersion = uploadedQuizMode ? uploadedQuiz.version : null;
    uploadedQuizUid = uploadedQuizMode ? auth.currentUser?.uid || null : null;
    uploadedQuizAnswers = uploadedQuizMode ? Array(uploadedQuiz.questions.length).fill(-1) : [];
    const sourceQuestions = uploadedQuizMode ? uploadedQuiz.questions : quizQuestionsFull;
    quizQuestions = uploadedQuizMode
        ? sourceQuestions.map(question => ({ ...question }))
        : shuffleQuizItems(sourceQuestions.map(question => {
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
        launchPage: quizLaunchPage,
        ...(uploadedQuizMode ? {
            uploadedQuiz: true,
            uploadedVersion: uploadedQuizVersion,
            uploadedUid: uploadedQuizUid,
            answers: uploadedQuizAnswers
        } : {})
    };
    scheduleUserDataSave();
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
    if (uploadedQuizMode) {
        uploadedQuizAnswers[currentQuiz] = Number.isInteger(index) ? index : -1;
    }
    if (index === quizQuestions[currentQuiz].correct) {
        quizScore++;
    }
    showQuizAnswer(index);
    startQuizTimer("cooldown", Date.now() + quizAdvanceDelay * 1000, index);
}

async function nextQuestion() {
    clearQuizTimers();
    if (currentQuiz < quizQuestions.length - 1) {
        currentQuiz++;
        renderQuiz();
    } else {
        if (uploadedQuizMode) {
            if (isSubmittingUploadedQuiz) return;
            isSubmittingUploadedQuiz = true;
            try {
                await submitUploadedQuiz();
                completeQuiz(quizScore, quizQuestions.length);
            } catch (error) {
                console.error("Could not submit the uploaded quiz.", error);
                const feedback = document.getElementById("quizFeedback");
                feedback.replaceChildren();
                const message = document.createElement("p");
                message.textContent = "Your attempt could not be submitted. Your answers are still on this device; retry to submit once.";
                const retryButton = document.createElement("button");
                retryButton.className = "primary-btn";
                retryButton.textContent = "Retry submission";
                retryButton.addEventListener("click", () => nextQuestion());
                feedback.append(message, retryButton);
            } finally {
                isSubmittingUploadedQuiz = false;
            }
            return;
        }

        completeQuiz(quizScore, quizQuestions.length, true);
    }
}

async function submitUploadedQuiz() {
    const user = auth.currentUser;
    if (!user || !uploadedQuizVersion || !uploadedQuizMode || user.uid !== uploadedQuizUid) {
        throw new Error("Sign in again before submitting this quiz.");
    }

    const attemptRef = firebase.database()
        .ref(`quizAttempts/${user.uid}/${currquizmodule}/${uploadedQuizVersion}`);
    const attempt = {
        uid: user.uid,
        moduleId: String(currquizmodule),
        version: uploadedQuizVersion,
        answers: uploadedQuizAnswers,
        submittedAt: firebase.database.ServerValue.TIMESTAMP
    };
    const result = await attemptRef.transaction(existingAttempt =>
        existingAttempt === null ? attempt : undefined
    );
    if (!result.committed) {
        const savedAttempt = await attemptRef.once("value");
        const saved = savedAttempt.val();
        const isSameSubmission = saved &&
            saved.uid === attempt.uid &&
            saved.moduleId === attempt.moduleId &&
            saved.version === attempt.version &&
            JSON.stringify(saved.answers) === JSON.stringify(attempt.answers);
        if (!isSameSubmission) {
            throw new Error("An attempt for this quiz version has already been submitted.");
        }
    }
}

function resetUploadedQuizState() {
    currentQuiz = 0;
    quizScore = 0;
    uploadedQuizMode = false;
    uploadedQuizVersion = null;
    uploadedQuizUid = null;
    uploadedQuizAnswers = [];
}

function completeQuiz(correctAnswers, questionCount) {
    const percent = Math.round((correctAnswers / questionCount) * 100);
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
    addActivity(`${uploadedQuizMode ? "Submitted" : "Completed"} quiz: ${percent}% (${correctAnswers}/${questionCount})`);
    state.quizProgress = null;
    saveState();
    toast(`Quiz complete: ${percent}%`);
    currentQuiz = 0;
    quizScore = 0;
    resetUploadedQuizState();

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
    scheduleUserDataSave();
    
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
        && (progress.uploadedQuiz !== true ||
            (typeof progress.uploadedVersion === "string" &&
                typeof progress.uploadedUid === "string" &&
                Array.isArray(progress.answers) &&
                progress.answers.length === progress.questions.length))
        && (progress.phase !== "cooldown"
            || progress.selectedAnswer === null
            || (Number.isInteger(progress.selectedAnswer)
                && progress.selectedAnswer >= 0
                && Array.isArray(progress.questions[progress.currentQuestion].answers)
                && progress.selectedAnswer < progress.questions[progress.currentQuestion].answers.length));
    if (!isValid) {
        state.quizProgress = null;
        scheduleUserDataSave();
        return;
    }

    currentQuiz = progress.currentQuestion;
    quizScore = Number(progress.score) || 0;
    currquizmodule = progress.module;
    quizQuestions = progress.questions;
    uploadedQuizMode = progress.uploadedQuiz === true;
    uploadedQuizVersion = uploadedQuizMode ? progress.uploadedVersion : null;
    uploadedQuizUid = uploadedQuizMode ? progress.uploadedUid : null;
    uploadedQuizAnswers = uploadedQuizMode ? [...progress.answers] : [];
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
// quiz state
let quizActive = false;
let currentQuestionIndex = -1;
let questachieve = 0;
let activeQuestionResolve = null;
let activeQuestionCleanup = null;
let activeQuestionResponse = null;
const hardQuestionScoreThreshold = 15000;
const correctAnswerBonus = 500;
let blastQuizQuestions = null;
let blastQuizLoadPromise = null;

function updateQuestionScoreFooter(points = 'Correct answer: +500 points') {
    document.getElementById('questCurrentScore').textContent =
        (Number(score2) || 0).toLocaleString();
    document.getElementById('questScorePoints').textContent = points;
}

function cancelRandomQuestion() {
    if (activeQuestionCleanup) activeQuestionCleanup();
    const resolve = activeQuestionResolve;
    activeQuestionResolve = null;
    if (resolve) resolve(false);
}

async function loadBlastQuizQuestions() {
    if (blastQuizQuestions) return blastQuizQuestions;
    if (!blastQuizLoadPromise) {
        blastQuizLoadPromise = firebase.firestore()
            .collection("blastQuiz")
            .get();
    }

    try {
        const snapshot = await blastQuizLoadPromise;
        if (snapshot.empty) {
            throw new Error("The Firestore blastQuiz collection is empty. Ask an administrator to upload the HYPE BLAST question bank.");
        }

        const questions = snapshot.docs
            .map(documentSnapshot => documentSnapshot.data())
            .sort((first, second) => first.order - second.order);
        questions.forEach((question, index) => {
            const answerIndex = Number.isInteger(question?.ans) ? question.ans : question?.correct;
            if (typeof question?.question !== "string" || !question.question.trim() ||
                !Array.isArray(question.answers) || question.answers.length < 2 ||
                question.answers.some(answer => typeof answer !== "string" || !answer.trim()) ||
                question.order !== index ||
                !Number.isInteger(answerIndex) || answerIndex < 0 ||
                answerIndex >= question.answers.length) {
                throw new Error(`HYPE BLAST question ${index + 1} in Firestore is invalid.`);
            }
        });
        blastQuizQuestions = questions;
        return blastQuizQuestions;
    } catch (error) {
        blastQuizLoadPromise = null;
        throw error;
    }
}

async function showRandomQuestion(resumeQuestionIndex = -1, resumeResponse = null) {
    if (quizActive) return Promise.resolve(false);
    let questionBank;
    try {
        questionBank = await loadBlastQuizQuestions();
    } catch (error) {
        console.error("Could not load HYPE BLAST questions from Firestore.", error);
        if (typeof toast === "function") {
            toast(`HYPE BLAST questions could not be loaded: ${error.message}`);
        }
        return false;
    }
    const mixedHardQuestions = questionBank.filter((question) => question.subject === 'Mixed (Hard)');
    const regularQuestions = questionBank.filter((question) => question.subject !== 'Mixed (Hard)');
    const questionPool = Number(score2) > hardQuestionScoreThreshold
        ? mixedHardQuestions
        : regularQuestions;
    if (questionPool.length === 0) {
        return Promise.resolve(false);
    }
    quizActive = true;
    pushAppModalHistory("blast-question", cancelRandomQuestion);
    const overlay = document.querySelector('.overlay');
    const questBox = document.querySelector('.quest');
    if (overlay) overlay.classList.remove('hide');
    if (questBox) questBox.classList.remove('hide');

    // pick a random question
    currentQuestionIndex = Number.isInteger(resumeQuestionIndex) &&
        resumeQuestionIndex >= 0 && resumeQuestionIndex < questionPool.length
        ? resumeQuestionIndex
        : Math.floor(Math.random() * questionPool.length);
    const q = questionPool[currentQuestionIndex];
    const answerIndex = Number.isInteger(q.ans) ? q.ans : q.correct;
    activeQuestionResponse = resumeResponse &&
        Number.isInteger(resumeResponse.selectedIndex) &&
        resumeResponse.selectedIndex >= 0 &&
        resumeResponse.selectedIndex < q.answers.length &&
        typeof resumeResponse.correct === "boolean"
        ? resumeResponse
        : null;

    // declared ids
    document.getElementById('quest-title').textContent = q.question;
    document.getElementById('subtag').textContent = q.subject || '';
    document.getElementById('scenario_quiz').textContent = q.scenario ? `Scenario: ${q.scenario}` : '';
    const answerFeedback = document.getElementById('ansfeed');
    answerFeedback.textContent = '';
    answerFeedback.className = 'quiz-feedback';
    updateQuestionScoreFooter();
    q.answers.forEach((answer, index) => {
        document.getElementById(`opt${index + 1}`).textContent = answer;
    });

    saveBlastProgress();
    return new Promise((resolve) => {
        activeQuestionResolve = resolve;
        let answerTimer = null;
        const finishAnswer = (correct) => {
            document.querySelectorAll('.quest-option').forEach((button) => {
                button.classList.remove('correct', 'wrong');
            });
            if (correct) {
                scoreAnimationStart = displayedScore;
                score2 += correctAnswerBonus;
                scoreAnimationTarget = score2;
                animateScore();
            }
            updateQuestionScoreFooter();
            if (overlay) overlay.classList.add('hide');
            if (questBox) questBox.classList.add('hide');
            dismissAppModalHistory("blast-question");
            quizActive = false;
            activeQuestionResolve = null;
            activeQuestionCleanup = null;
            activeQuestionResponse = null;
            saveBlastProgress();
            resolve(correct);
        };
        const showAnswerFeedback = (selectedIdx, correct) => {
            const btn = document.getElementById(`opt${selectedIdx + 1}`);
            const explanation = q.why || `The correct answer is: ${q.answers[answerIndex]}.`;
            answerFeedback.textContent = `${correct ? 'Correct!' : 'Not quite.'} ${explanation}`;
            answerFeedback.classList.add(correct ? 'correct' : 'wrong');
            updateQuestionScoreFooter(correct
                ? `Correct answer: +${correctAnswerBonus.toLocaleString()} points`
                : 'Incorrect answer: +0 points');
            if (correct) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('wrong');
                const correctBtn = document.getElementById(`opt${answerIndex + 1}`);
                if (correctBtn) correctBtn.classList.add('correct');
            }
        };
        const handler = (e) => {
            if (!e.target.classList.contains('quest-option')) return;
            questachieve = 0;
            document.getElementById("questogo").innerText = "3 left cleared moves to get question";
            const selectedIdx = Number.parseInt(e.target.id.replace('opt', ''), 10) - 1;
            if (!Number.isInteger(selectedIdx) || selectedIdx < 0 || selectedIdx >= q.answers.length) return;
            const correct = selectedIdx === answerIndex;
            activeQuestionResponse = { selectedIndex: selectedIdx, correct };
            showAnswerFeedback(selectedIdx, correct);
            document.querySelectorAll('.quest-option').forEach((b) =>
                b.removeEventListener('click', handler)
            );
            saveBlastProgress();
            answerTimer = setTimeout(() => finishAnswer(correct), 4000);
        };
        activeQuestionCleanup = () => {
            if (answerTimer) {
                clearTimeout(answerTimer);
            }
            document.querySelectorAll('.quest-option').forEach((button) =>
                button.removeEventListener('click', handler)
            );
            if (overlay) overlay.classList.add('hide');
            if (questBox) questBox.classList.add('hide');
            quizActive = false;
            activeQuestionCleanup = null;
        };
        if (activeQuestionResponse) {
            showAnswerFeedback(activeQuestionResponse.selectedIndex, activeQuestionResponse.correct);
            answerTimer = setTimeout(() => finishAnswer(activeQuestionResponse.correct), 4000);
        } else {
            document.querySelectorAll('.quest-option').forEach((b) =>
                b.addEventListener('click', handler)
            );
        }
    });
}
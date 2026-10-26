// show a random question from the quiz array and return a promise that resolves to
// a boolean indicating whether the player picked the correct answer. the game is
// paused while the question is displayed by setting `quizActive` and toggling the
// overlay/quest UI.
const quiz = [];
// quiz state
let quizActive = false;
let currentQuestionIndex = -1;
let questachieve = 0;
let activeQuestionResolve = null;
let activeQuestionCleanup = null;
const hardQuestionScoreThreshold = 15000;
const correctAnswerBonus = 500;

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

function showRandomQuestion(resumeQuestionIndex = -1) {
    if (quizActive) return Promise.resolve(false);
    const mixedHardQuestions = quiz.filter((question) => question.subject === 'Mixed (Hard)');
    const regularQuestions = quiz.filter((question) => question.subject !== 'Mixed (Hard)');
    const questionPool = Number(score2) > hardQuestionScoreThreshold
        ? mixedHardQuestions
        : regularQuestions;
    if (questionPool.length === 0) {
        return Promise.resolve(false);
    }
    quizActive = true;
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
        const handler = (e) => {
            if (!e.target.classList.contains('quest-option')) return;
            questachieve = 0;
            document.getElementById("questogo").innerText = "3 left cleared moves to get question"
            const btn = e.target;
            const selectedIdx = parseInt(btn.id.replace('opt', '')) - 1;
            const correct = selectedIdx === answerIndex;
            const explanation = q.why || `The correct answer is: ${q.answers[answerIndex]}.`;
            answerFeedback.textContent = `${correct ? 'Correct!' : 'Not quite.'} ${explanation}`;
            answerFeedback.classList.add(correct ? 'correct' : 'wrong');
            updateQuestionScoreFooter(correct
                ? `Correct answer: +${correctAnswerBonus.toLocaleString()} points`
                : 'Incorrect answer: +0 points');
            
            // Add visual feedback with correct/wrong classes
            if (correct) {
                btn.classList.add('correct');
            } else {
                btn.classList.add('wrong');
            }
            
            // Also show the correct answer if wrong
            if (!correct) {
                const correctBtn = document.getElementById('opt' + (answerIndex + 1));
                if (correctBtn) {
                    correctBtn.classList.add('correct');
                }
            }
            // Remove listeners from all buttons
            document.querySelectorAll('.quest-option').forEach((b) =>
                b.removeEventListener('click', handler)
            );
            answerTimer = setTimeout(() => {
                // Remove classes from all buttons
                document.querySelectorAll('.quest-option').forEach((b) => {
                    b.classList.remove('correct', 'wrong');
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
                quizActive = false;
                activeQuestionResolve = null;
                activeQuestionCleanup = null;
                saveBlastProgress();
                resolve(correct);
            }, 4000);
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
        document.querySelectorAll('.quest-option').forEach((b) =>
            b.addEventListener('click', handler)
        );
    });
}
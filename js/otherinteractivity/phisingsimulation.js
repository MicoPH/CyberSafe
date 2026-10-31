const scenarios = [
  {
    subject: "URGENT: Your school account will be suspended!",
    sender: "School Account Support",
    address: "school-security@example.invalid",
    type: "phishing",
    body: [
      "Dear Student,",
      "Your school account will be disabled in 30 minutes. Verify your password immediately to avoid losing access.",
      "Verification link: http://school-login.example.invalid/verify",
      "Failure to act may result in permanent account suspension.",
      "School IT Team"
    ].join("\n\n"),
    explanation:
      "This is phishing. The message uses an artificial deadline and threatens account suspension to pressure the student into acting.",
    clues: [
      "Urgent deadline designed to create panic",
      "Unexpected password verification request",
      "Unverified sender and suspicious example domain"
    ]
  },
  {
    subject: "Reminder: Library books due Friday",
    sender: "School Library",
    address: "library@example.edu",
    type: "legitimate",
    body: [
      "Hello Student,",
      "This is a sample library reminder. Please check your borrowed books and their due dates using the library service you normally use.",
      "If you have questions, contact the school librarian through the usual school directory.",
      "Thank you,\nSchool Library"
    ].join("\n\n"),
    explanation:
      "This is the intended legitimate example. It gives a routine reminder and directs the student to a known service without demanding credentials.",
    clues: [
      "Routine, expected information",
      "No demand for passwords or verification codes",
      "Uses a known channel rather than an unfamiliar login link"
    ]
  },
  {
    subject: "You won a FREE smartphone! Claim now!",
    sender: "Rewards Department",
    address: "winner@example.invalid",
    type: "phishing",
    body: [
      "CONGRATULATIONS!",
      "You have been randomly selected to receive a brand-new smartphone, even though you did not enter a contest.",
      "Click this unfamiliar link and provide your personal information to claim your prize.",
      "Offer expires in 10 minutes!"
    ].join("\n\n"),
    explanation:
      "This is a prize scam example. An unexpected prize, a request for personal data, and extreme urgency are warning signs.",
    clues: [
      "Unexpected prize with no known contest",
      "Personal information requested to claim a reward",
      "Artificial urgency"
    ]
  },
  {
    subject: "Security notice: Review your recent sign-in",
    sender: "Account Notifications",
    address: "notifications@example.invalid",
    type: "phishing",
    body: [
      "Hello,",
      "We noticed a sign-in that you may not recognize.",
      "Before doing anything, independently open the official app or type its known website address into your browser. Do not use an unexpected email link to sign in.",
      "This fictional training email deliberately uses an unverified sender address. Treat it as suspicious."
    ].join("\n\n"),
    explanation:
      "Classify this training example as phishing because its sender is unverified. A security alert alone does not prove phishing; verify it independently using the official app or website.",
    clues: [
      "Unverified sender domain",
      "Sender identity must be checked independently",
      "Unexpected security messages require careful verification"
    ]
  },
  {
    subject: "Group project meeting moved to 2:00 PM",
    sender: "Class Project Group",
    address: "project-group@example.edu",
    type: "legitimate",
    body: [
      "Hi everyone,",
      "Our group meeting has been moved to 2:00 PM tomorrow in our usual classroom.",
      "Please bring your draft slides. If the schedule is unclear, confirm with a classmate using our usual group channel.",
      "Thanks!"
    ].join("\n\n"),
    explanation:
      "This is the intended legitimate example. It gives a normal class-related update and does not ask students to open an unknown link or reveal sensitive information.",
    clues: [
      "Contextual school-related message",
      "No sensitive information requested",
      "Provides a familiar way to confirm the details"
    ]
  }
];

let order = [];
let current = 0;
let phishingscore = 0;
let answered = 0;
let locked = false;
let lastChoice = null;
let lastCorrect = false;
const phishingPointsPerCorrectAnswer = 50;


function phishingStart() {
    pushAppModalHistory("phishing", closePhishingWindow);
    document.getElementById("phisingCard").classList.add("active");
    document.getElementById("overlay").classList.add("active");
    if (getSavedPhishingProgress()) {
        resumeSimulation();
    } else {
        startSimulation();
    }
}
function phishingClose() {
    closeAppModalHistory("phishing", closePhishingWindow);
}

function closePhishingWindow() {
    document.getElementById("overlay").classList.remove("active");
    document.getElementById('phisingCard').style.animation = 'lesson-detail-animationOut 0.3s ease forwards';
    setTimeout(() => {
        document.getElementById('phisingCard').style.animation = '';
        document.getElementById("phisingCard").classList.remove("active");
        if (gameOver) {
            navigate("results")
        }
    }, 300);
}

function getSavedPhishingProgress() {
  const progress = state.phishingProgress;
  if (
    !progress ||
    !Array.isArray(progress.order) ||
    progress.order.length !== scenarios.length ||
    !progress.order.every(index => Number.isInteger(index) && index >= 0 && index < scenarios.length) ||
    new Set(progress.order).size !== scenarios.length ||
    !Number.isInteger(progress.current) ||
    progress.current < 0 ||
    progress.current >= progress.order.length ||
    !Number.isFinite(progress.score) ||
    !Number.isInteger(progress.answered) ||
    progress.answered < 0 ||
    progress.answered > progress.order.length
  ) {
    if (progress) {
      state.phishingProgress = null;
      saveState();
    }
    return null;
  }

  return progress;
}

function updatePhishingStartButton() {
  const button = document.getElementById("phishingStartButton");
  if (button) {
    button.textContent = state.phishingProgress
      ? "Resume Simulation"
      : "Start Simulation";
  }
}

function savePhishingProgress() {
  state.phishingProgress = {
    order: [...order],
    current,
    score: phishingscore,
    answered,
    locked,
    lastChoice,
    lastCorrect
  };
  saveState();
}

function shuffle(items) {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

function renderBody(text) {
  // Use textContent: email content is never interpreted as HTML.
  document.getElementById("emailBody").textContent = text;
}

function renderScenario() {
  const item = scenarios[order[current]];

  document.getElementById("progress").textContent = `${current + 1} / ${order.length}`;
  document.getElementById("phishingscore").textContent = phishingscore;
  document.getElementById("accuracy").textContent =
    `${answered ? Math.round(phishingscore / (answered * phishingPointsPerCorrectAnswer) * 100) : 0}%`;

  document.getElementById("emailSubject").textContent = item.subject;
  document.getElementById("sender").textContent = item.sender;
  document.getElementById("emailAddress").textContent = item.address;
  document.getElementById("avatar").textContent = item.sender.charAt(0);
  document.getElementById("emailTag").textContent = "Training email";

  renderBody(item.body);

  document.getElementById("decisionArea").hidden = false;
  document.getElementById("feedback").hidden = true;
  document.getElementById("feedback").className = "feedback";

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.disabled = locked;
  });

  if (locked) {
    showAnswerFeedback(item, lastCorrect);
  }

  document.getElementById("nextBtn").textContent =
    current === order.length - 1 ? "View results →" : "Next scenario →";
}

function showAnswerFeedback(item, correct) {
  document.getElementById("decisionArea").hidden = true;
  document.getElementById("feedback").hidden = false;
  document.getElementById("feedback").classList.add(correct ? "correct" : "incorrect");
  document.getElementById("feedbackTitle").textContent = correct
    ? `Correct! +${phishingPointsPerCorrectAnswer} XP`
    : "Not quite. Review the warning signs.";
  document.getElementById("feedbackText").textContent = item.explanation;
  document.getElementById("cluesFound").textContent =
    "Key learning points:\n• " + item.clues.join("\n• ");
}

function answerQuestion(choice) {
  if (locked) return;

  locked = true;
  answered++;
  lastChoice = choice;

  const item = scenarios[order[current]];
  const correct = choice === item.type;
  lastCorrect = correct;

  if (correct) {
    phishingscore += phishingPointsPerCorrectAnswer;
    state.points += phishingPointsPerCorrectAnswer;
  }

  document.getElementById("phishingscore").textContent = phishingscore;
  document.getElementById("accuracy").textContent =
    `${Math.round(phishingscore / (answered * phishingPointsPerCorrectAnswer) * 100)}%`;

  showAnswerFeedback(item, correct);

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.disabled = true;
  });
  savePhishingProgress();
}

function showResults() {
  document.getElementById("rules1").hidden = true;
  document.getElementById("game1").hidden = true;
  document.getElementById("results1").hidden = false;
  document.getElementById("stats").classList.add("res");

  const percentage = Math.round(
    phishingscore / (order.length * phishingPointsPerCorrectAnswer) * 100
  );

  document.getElementById("resultHeading").textContent =
    percentage >= 80 ? "Excellent awareness!" :
    percentage >= 60 ? "Good progress!" :
    "Keep practicing!";

  document.getElementById("resultSummary").textContent =
    `You scored ${phishingscore} out of ${order.length * phishingPointsPerCorrectAnswer} points. ` +
    `Your accuracy was ${percentage}%. ` +
    "Review the explanations and practice verifying unexpected messages.";

  document.getElementById("phishingscore").textContent = phishingscore;
  document.getElementById("accuracy").textContent = `${percentage}%`;
  state.phishingBestScore = Math.max(state.phishingBestScore, percentage);
  state.phishingLastOrder = [...order];
  state.phishingProgress = null;
  addActivity(`Completed the Phishing Simulator with ${percentage}% accuracy`);
  saveState();
}

function startSimulation() {
  order = shuffle(scenarios.map((_, index) => index));
  if (
    state.phishingLastOrder &&
    order.every((scenarioIndex, index) => scenarioIndex === state.phishingLastOrder[index])
  ) {
    order.push(order.shift());
  }
  current = 0;
  phishingscore = 0;
  answered = 0;
  locked = false;
  lastChoice = null;
  lastCorrect = false;
  document.getElementById("rules1").hidden = false;
  document.getElementById("game1").hidden = false;
  document.getElementById("stats").classList.toggle("res");
  document.getElementById("results1").hidden = true;

  renderScenario();
  savePhishingProgress();
}

function resumeSimulation() {
  const progress = getSavedPhishingProgress();
  if (!progress) {
    startSimulation();
    return;
  }

  order = [...progress.order];
  current = progress.current;
  phishingscore = progress.score;
  answered = progress.answered;
  locked = Boolean(progress.locked);
  lastChoice = progress.lastChoice;
  lastCorrect = Boolean(progress.lastCorrect);

  document.getElementById("game1").hidden = false;
  document.getElementById("results1").hidden = true;
  renderScenario();
}


document.querySelectorAll("[data-answer]").forEach((button) => {
  button.addEventListener("click", () => {
    answerQuestion(button.dataset.answer);
  });
});
console.log(document.getElementById("nextBtn"))
document.getElementById("nextBtn").addEventListener("click", () => {
  if (!locked) return;

  if (current < order.length - 1) {
    current++;
    locked = false;
    lastChoice = null;
    lastCorrect = false;
    renderScenario();
    savePhishingProgress();
  } else {
    showResults();
  }
});

document.getElementById("restartBtn").addEventListener("click", startSimulation);


"use strict";

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

const $ = (id) => document.getElementById(id);

let order = [];
let current = 0;
let score = 0;
let answered = 0;
let locked = false;

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
  $("emailBody").textContent = text;
}

function renderScenario() {
  locked = false;

  const item = scenarios[order[current]];

  $("progress").textContent = `${current + 1} / ${order.length}`;
  $("score").textContent = score;
  $("accuracy").textContent =
    `${answered ? Math.round(score / (answered * 10) * 100) : 0}%`;

  $("emailSubject").textContent = item.subject;
  $("sender").textContent = item.sender;
  $("emailAddress").textContent = item.address;
  $("avatar").textContent = item.sender.charAt(0);
  $("emailTag").textContent = "Training email";

  renderBody(item.body);

  $("decisionArea").hidden = false;
  $("feedback").hidden = true;
  $("feedback").className = "feedback";

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.disabled = false;
  });

  $("nextBtn").textContent =
    current === order.length - 1 ? "View results →" : "Next scenario →";
}

function answerQuestion(choice) {
  if (locked) return;

  locked = true;
  answered++;

  const item = scenarios[order[current]];
  const correct = choice === item.type;

  if (correct) score += 10;

  $("score").textContent = score;
  $("accuracy").textContent =
    `${Math.round(score / (answered * 10) * 100)}%`;

  $("decisionArea").hidden = true;
  $("feedback").hidden = false;
  $("feedback").classList.add(correct ? "correct" : "incorrect");

  $("feedbackTitle").textContent = correct
    ? "Correct! +10 points"
    : "Not quite. Review the warning signs.";

  $("feedbackText").textContent = item.explanation;
  $("cluesFound").textContent =
    "Key learning points:\n• " + item.clues.join("\n• ");

  document.querySelectorAll("[data-answer]").forEach((button) => {
    button.disabled = true;
  });
}

function showResults() {
  $("game").hidden = true;
  $("results").hidden = false;

  const percentage = Math.round(score / (order.length * 10) * 100);

  $("resultHeading").textContent =
    percentage >= 80 ? "Excellent awareness!" :
    percentage >= 60 ? "Good progress!" :
    "Keep practicing!";

  $("resultSummary").textContent =
    `You scored ${score} out of ${order.length * 10} points. ` +
    `Your accuracy was ${percentage}%. ` +
    "Review the explanations and practice verifying unexpected messages.";

  $("score").textContent = score;
  $("accuracy").textContent = `${percentage}%`;
}

function startSimulation() {
  order = shuffle(scenarios.map((_, index) => index));
  current = 0;
  score = 0;
  answered = 0;
  locked = false;

  $("game").hidden = false;
  $("results").hidden = true;

  renderScenario();
}

document.querySelectorAll("[data-answer]").forEach((button) => {
  button.addEventListener("click", () => {
    answerQuestion(button.dataset.answer);
  });
});

$("nextBtn").addEventListener("click", () => {
  if (!locked) return;

  if (current < order.length - 1) {
    current++;
    renderScenario();
  } else {
    showResults();
  }
});

$("restartBtn").addEventListener("click", startSimulation);

startSimulation();

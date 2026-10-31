
const module2 = [
  {
    q: "You receive a message saying your account will be locked in 10 minutes unless you click a link. What should you do?",
    scenario: "The message was unexpected and asks you to act immediately.",
    answers: [
      "Click quickly before the deadline.",
      "Open the official app or website separately and check your account.",
      "Reply with your password to confirm your identity.",
      "Forward the message to friends so they can check it."
    ],
    correct: 1,
    why: "Urgency is a common social-engineering tactic. Verify through an independent official channel."
  },
  {
    q: "What is a common sign of a phishing email?",
    scenario: "You receive an unexpected email claiming to be from a popular online service.",
    answers: [
      "It contains a suspicious link and urgently requests sensitive information.",
      "It contains information you expected.",
      "It comes from a contact you independently verified.",
      "It contains a normal school announcement."
    ],
    correct: 0,
    why: "Suspicious links, urgency, and requests for sensitive information are common phishing indicators."
  },
  {
    q: "A website address contains a misspelled company name. What should you do?",
    scenario: "The website looks like a familiar online shopping platform.",
    answers: [
      "Enter your card details to test the website.",
      "Trust it because the logo looks correct.",
      "Download any files it offers.",
      "Avoid entering information and verify the official website address."
    ],
    correct: 3,
    why: "Lookalike domains can imitate legitimate websites to steal information."
  },
  {
    q: "Does HTTPS guarantee that a website is legitimate?",
    scenario: "Your browser displays a padlock icon beside the website address.",
    answers: [
      "Yes, every HTTPS website is safe.",
      "Yes, it guarantees that the seller is honest.",
      "No, HTTPS encrypts the connection but does not prove the website is trustworthy.",
      "No, HTTPS means the website is offline."
    ],
    correct: 2,
    why: "HTTPS protects data in transit, but fraudulent websites can also use HTTPS."
  },
  {
    q: "An unfamiliar account says you won a prize but must pay a fee first. What should you do?",
    scenario: "You did not enter any contest.",
    answers: [
      "Pay immediately.",
      "Send your identification documents.",
      "Treat the offer as suspicious and verify it independently.",
      "Invite your friends to pay too."
    ],
    correct: 2,
    why: "Unexpected prizes that require upfront payments are a common scam pattern."
  },
  {
    q: "A seller offers a popular phone at an unusually low price and demands a direct bank transfer. What is safest?",
    scenario: "The seller refuses to use the shopping platform's payment system.",
    answers: [
      "Transfer the money immediately.",
      "Use a protected payment method on a trusted platform or walk away.",
      "Share your one-time banking code.",
      "Ignore the platform's warnings."
    ],
    correct: 1,
    why: "Unrealistic prices and irreversible payment demands can indicate fraud."
  },
  {
    q: "What is the purpose of a fake login page?",
    scenario: "A link opens a page that resembles your email provider.",
    answers: [
      "To improve your internet speed.",
      "To install official software updates.",
      "To back up your account.",
      "To capture login information entered by visitors."
    ],
    correct: 3,
    why: "Fake login pages can collect usernames, passwords, and other sensitive details."
  },
  {
    q: "A caller claims to be from your bank and requests your one-time password. What should you do?",
    scenario: "The caller says the code is needed to prevent fraud.",
    answers: [
      "Read the code aloud.",
      "Send the code by text.",
      "Keep the code private and contact your bank through an official channel.",
      "Share your card PIN too."
    ],
    correct: 2,
    why: "One-time codes can authorize account access or transactions and should not be shared."
  },
  {
    q: "Which is the safest way to open your online banking account?",
    scenario: "You receive an unexpected text message containing a banking link.",
    answers: [
      "Click the link immediately.",
      "Open your official banking app or type the known website address yourself.",
      "Use a shortened link from a stranger.",
      "Ask the sender for your password."
    ],
    correct: 1,
    why: "Independent navigation helps you avoid deceptive links."
  },
  {
    q: "A QR code on an unfamiliar poster promises free mobile data. What should you do?",
    scenario: "The poster does not identify the organization providing the offer.",
    answers: [
      "Scan it and enter your password.",
      "Install every application it offers.",
      "Share your recovery codes.",
      "Verify the source and destination before using the QR code."
    ],
    correct: 3,
    why: "QR codes can conceal links to malicious or deceptive websites."
  }
];


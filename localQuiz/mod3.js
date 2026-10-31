const sample2 = [
    {
    question: "What is a passkey?",
    scenario: "A website offers passkey sign-in as an alternative to a password.",
    answers: [
      "A password written on paper.",
      "A cryptographic credential used to authenticate access to an account.",
      "A publicly shared recovery code.",
      "A shared login for friends."
    ],
    ans: 1,
    why: "Passkeys use cryptographic authentication and can reduce reliance on passwords.",
    subject: "Module 3"
  },
  {
    question: "You receive a login alert from an unfamiliar location. What should you do?",
    scenario: "You did not attempt to sign in from that location.",
    answers: [
      "Ignore every future alert.",
      "Send your password to the alert sender.",
      "Review account activity through the official service and secure the account.",
      "Post your account details publicly."
    ],
    ans: 2,
    why: "Review activity through official settings and revoke unfamiliar sessions.",
    subject: "Module 3"
  },
  {
    question: "How should you store account recovery codes?",
    scenario: "An online service provides backup codes for account recovery.",
    answers: [
      "In a public group chat.",
      "In an unlocked document shared with everyone.",
      "With an unknown contact.",
      "In a secure location protected from unauthorized access."
    ],
    ans: 3,
    why: "Recovery codes should remain accessible to you but protected from other people.",
    subject: "Module 3"
  },
  {
    question: "Why should you lock your phone when you are not using it?",
    scenario: "You leave your phone unattended in a classroom.",
    answers: [
      "It helps prevent unauthorized physical access.",
      "It blocks every scam automatically.",
      "It replaces software updates.",
      "It makes your profile public."
    ],
    ans: 0,
    why: "A screen lock helps protect personal information if the device is left unattended.",
    subject: "Module 3"
  },
  {
    question: "Which is a good habit for a public social media profile?",
    scenario: "You are deciding which personal details to display.",
    answers: [
      "Publish your home address.",
      "Share only information appropriate for a public audience.",
      "Post your recovery codes.",
      "Include your passwords."
    ],
    ans: 1,
    why: "Limiting public personal information reduces privacy exposure.",
    subject: "Module 3"
  },
  {
    question: "How should you share one cloud document with a classmate?",
    scenario: "Your classmate needs access to a single research file.",
    answers: [
      "Give them your account password.",
      "Make your entire account public.",
      "Share only the required document with appropriate permissions.",
      "Send them your MFA code."
    ],
    ans: 2,
    why: "File-specific sharing follows least privilege and protects account credentials.",
    subject: "Module 3"
  },
  {
    question: "What should you do before giving away an old phone?",
    scenario: "You are preparing a device for another person to use.",
    answers: [
      "Leave all accounts signed in.",
      "Keep your private files on the phone.",
      "Share the screen-lock code publicly.",
      "Back up needed data, sign out, and reset the device appropriately."
    ],
    ans: 3,
    why: "Preparing a device properly helps protect personal data from the next owner.",
    subject: "Module 3"
  },
  {
    question: "Why should different accounts use different passwords?",
    scenario: "One online service reports a data breach.",
    answers: [
      "It limits damage if one password is exposed.",
      "It makes every account impossible to access.",
      "It shares all logins automatically.",
      "It prevents every kind of device theft."
    ],
    ans: 0,
    why: "Unique passwords prevent a compromised credential from automatically exposing other accounts.",
    subject: "Module 3"
  },
  {
    question: "An email asks you to send your password for verification. What should you do?",
    scenario: "The email has an official-looking logo.",
    answers: [
      "Send the password if the logo matches.",
      "Do not email your password; check your account through the official website.",
      "Reply with your recovery codes.",
      "Reuse your school password."
    ],
    ans: 1,
    why: "Do not send passwords through email. Verify account issues using the official service.",
    subject: "Module 3"
  },
  {
    question: "You accidentally publish private information online. What should you do?",
    scenario: "You notice that a public post contains information you did not intend to share.",
    answers: [
      "Leave the post public forever.",
      "Publish more private details.",
      "Remove or restrict the post and protect any affected accounts.",
      "Share your passwords too."
    ],
    ans: 2,
    why: "Reducing exposure quickly helps protect your privacy and affected accounts.",
    subject: "Module 3"
  }
    
]
quiz.push(...sample2)

const sample4 = [
    {
    question: "What is a data breach?",
    scenario: "A company discovers that unauthorized people accessed its customer records.",
    answers: [
      "Unauthorized access to or exposure of protected information.",
      "A scheduled system update.",
      "A normal account registration.",
      "A successful file backup."
    ],
    ans: 0,
    why: "A data breach occurs when protected information is accessed, disclosed, or exposed without authorization.",
    subject: "Module 1"
  },
  {
    question: "What does the principle of least privilege mean?",
    scenario: "A calculator application requests administrator access to the entire computer.",
    answers: [
      "Every application should have full access.",
      "All users must share one administrator account.",
      "Security permissions should be disabled.",
      "Users and applications should receive only the access they need."
    ],
    ans: 3,
    why: "Least privilege limits unnecessary access and reduces potential damage.",
    subject: "Module 1"
  },
  {
    question: "Why should important files be backed up?",
    scenario: "Your research project is stored on only one laptop.",
    answers: [
      "To publish the files publicly.",
      "To recover information after loss, damage, or a cyberattack.",
      "To remove the need for software updates.",
      "To share your passwords."
    ],
    ans: 1,
    why: "Backups provide a way to restore important information after an incident.",
    subject: "Module 1"
  },
  {
    question: "What should you do after using a shared school computer?",
    scenario: "You finish checking your school account in the computer laboratory.",
    answers: [
      "Leave your account signed in.",
      "Save your password in the browser for everyone.",
      "Sign out and avoid saving your password on the shared computer.",
      "Give your account to the next student."
    ],
    ans: 2,
    why: "Signing out helps prevent other users from accessing your account.",
    subject: "Module 1"
  },
  {
    question: "Which is a good cybersecurity habit?",
    scenario: "You have accounts on several websites.",
    answers: [
      "Use unique passwords and enable multifactor authentication when available.",
      "Reuse one password everywhere.",
      "Share your password with friends.",
      "Write your password in a public post."
    ],
    ans: 0,
    why: "Unique passwords and multifactor authentication reduce the risk of account compromise.",
    subject: "Module 1"
  },
  {
    question: "What is phishing?",
    scenario: "An email pretends to come from a trusted company and asks you to enter your password.",
    answers: [
      "A computer maintenance technique.",
      "A way to improve internet speed.",
      "A normal file backup.",
      "A deceptive attempt to steal information or access."
    ],
    ans: 3,
    why: "Phishing uses deceptive messages or websites to trick people into revealing sensitive information.",
    subject: "Module 1"
  },
  {
    question: "Which is an example of personal information?",
    scenario: "You are deciding what information to publish on a public profile.",
    answers: [
      "A public weather report.",
      "Your home address.",
      "A general computer manual.",
      "A public holiday date."
    ],
    ans: 1,
    why: "A home address can identify or locate you and should be protected.",
    subject: "Module 1"
  },
  {
    question: "Where should you download a new application?",
    scenario: "You need to install an application for a school project.",
    answers: [
      "A random pop-up advertisement.",
      "An unknown file-sharing link.",
      "An official app store or verified developer website.",
      "A shortened link from a stranger."
    ],
    ans: 2,
    why: "Trusted download sources reduce the risk of installing fake or modified applications.",
    subject: "Module 1"
  },
  {
    question: "What should you do with an unexpected email attachment?",
    scenario: "An unknown sender emails you a file with no explanation.",
    answers: [
      "Open it immediately.",
      "Forward it to every classmate.",
      "Disable your security software.",
      "Verify the sender and report or scan the attachment before opening it."
    ],
    ans: 3,
    why: "Unexpected attachments may contain malware or lead to unsafe content.",
    subject: "Module 1"
  },
  {
    question: "You receive an unfamiliar account login alert. What should you do?",
    scenario: "Your email provider reports a sign-in that you did not attempt.",
    answers: [
      "Ignore all security alerts.",
      "Send your password to the alert sender.",
      "Post your account information publicly.",
      "Check your account through the official website and secure it."
    ],
    ans: 3,
    why: "Use official account settings to review activity, change exposed credentials, and end unfamiliar sessions.",
    subject: "Module 1"
  }
]

quiz.push(...sample4)
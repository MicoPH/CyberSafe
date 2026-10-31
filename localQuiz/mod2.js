const sample5 = [
    {
    question: "A supposed technical-support agent contacts you without being asked and requests remote access. What should you do?",
    scenario: "You did not contact technical support.",
    answers: [
      "Give the agent access immediately.",
      "Disable your security software.",
      "End the contact and reach official support independently if needed.",
      "Share all your passwords."
    ],
    ans: 2,
    why: "Unsolicited remote-access requests may be attempts to control your device.",
    subject: "Module 2"
  },
  {
    question: "Why should you check a link's destination before opening it?",
    scenario: "A message contains a button labeled 'View document'.",
    answers: [
      "The displayed text may hide a different destination.",
      "Every link is harmless.",
      "The button proves the sender's identity.",
      "It guarantees the file is safe."
    ],
    ans: 0,
    why: "Displayed link text may not match the actual destination.",
    subject: "Module 2"
  },
  {
    question: "Your friend's account sends you an unusual request for money. What should you do?",
    scenario: "The message sounds different from how your friend usually communicates.",
    answers: [
      "Send the money immediately.",
      "Ask for your friend's password.",
      "Forward the message to everyone.",
      "Verify the request with your friend through another communication channel."
    ],
    ans: 3,
    why: "A friend's account may be compromised, so unusual requests should be independently verified.",
    subject: "Module 2"
  },
  {
    question: "What should you do when you receive a suspicious email at school?",
    scenario: "The email contains an unexpected attachment and asks you to enable macros.",
    answers: [
      "Open the attachment to investigate.",
      "Reply with your personal information.",
      "Report it through the school's process or tell a trusted staff member.",
      "Forward it to all students."
    ],
    ans: 2,
    why: "Reporting allows the appropriate people to assess the potential threat safely.",
    subject: "Module 2"
  },
  {
    question: "A website copies a famous company's logo. Does this prove that it is official?",
    scenario: "The website looks professionally designed.",
    answers: [
      "Yes, logos cannot be copied.",
      "No, logos can be copied, so verify the website address and source.",
      "Yes, if the colors match.",
      "Yes, if it has product pictures."
    ],
    ans: 1,
    why: "Visual design alone cannot establish a website's legitimacy.",
    subject: "Module 2"
  },
  {
    question: "A giveaway account asks for your social media password. What should you do?",
    scenario: "The account promises to send you a prize after you provide your login details.",
    answers: [
      "Do not share your credentials and report the suspicious account.",
      "Send the password privately.",
      "Provide your recovery code instead.",
      "Use your school password."
    ],
    ans: 0,
    why: "Legitimate giveaways do not need your account password.",
    subject: "Module 2"
  },
  {
    question: "A message threatens legal action unless you pay immediately using gift cards. What should you do?",
    scenario: "The sender demands secrecy and refuses to provide verifiable information.",
    answers: [
      "Buy the gift cards immediately.",
      "Send your identification documents.",
      "Click every link in the message.",
      "Do not pay based on the message; verify the claim through an official channel."
    ],
    ans: 3,
    why: "Threats, secrecy, urgency, and gift-card demands are common scam indicators.",
    subject: "Module 2"
  },
  {
    question: "You entered your password on a suspected fake website. What should you do first?",
    scenario: "You realize that the website may have been fraudulent.",
    answers: [
      "Wait a few weeks.",
      "Send your password to customer support by email.",
      "Change the password through the real service and secure your account.",
      "Reuse the same password on other accounts."
    ],
    ans: 2,
    why: "Change exposed credentials through the legitimate service and update other accounts if the password was reused.",
    subject: "Module 2"
  },
  {
    question: "A message claims your delivery is delayed and asks you to install an unfamiliar tracking app. What should you do?",
    scenario: "You are unsure whether the message is from the real courier.",
    answers: [
      "Install the app immediately.",
      "Check the delivery through the courier's official website or app.",
      "Provide your account password.",
      "Forward the link to your contacts."
    ],
    ans: 1,
    why: "Independent verification helps distinguish legitimate delivery updates from malicious messages.",
    subject: "Module 2"
  },
  {
    question: "What should you do with a suspicious message asking you to keep a financial request secret?",
    scenario: "The sender claims to be a relative who urgently needs money.",
    answers: [
      "Transfer money without checking.",
      "Send your banking credentials.",
      "Follow only the message's instructions.",
      "Verify the person's identity through a separate, trusted communication channel."
    ],
    ans: 3,
    why: "Scammers exploit urgency and secrecy. Independently verify unexpected financial requests.",
    subject: "Module 2"
  }
]
quiz.push(...sample5)

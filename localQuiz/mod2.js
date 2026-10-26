const sample5 = [
    {
    question: "Does HTTPS guarantee that a website is legitimate?",
    scenario: "Your browser displays a padlock icon beside the website address.",
    answers: [
      "Yes, every HTTPS website is safe.",
      "Yes, it guarantees that the seller is honest.",
      "No, HTTPS encrypts the connection but does not prove the website is trustworthy.",
      "No, HTTPS means the website is offline."
    ],
    ans: 2,
    why: "HTTPS protects data in transit, but fraudulent websites can also use HTTPS.",
    subject: "Module 2"
  },
  {
    question: "An unfamiliar account says you won a prize but must pay a fee first. What should you do?",
    scenario: "You did not enter any contest.",
    answers: [
      "Pay immediately.",
      "Send your identification documents.",
      "Treat the offer as suspicious and verify it independently.",
      "Invite your friends to pay too."
    ],
    ans: 2,
    why: "Unexpected prizes that require upfront payments are a common scam pattern.",
    subject: "Module 2"
  },
  {
    question: "A seller offers a popular phone at an unusually low price and demands a direct bank transfer. What is safest?",
    scenario: "The seller refuses to use the shopping platform's payment system.",
    answers: [
      "Transfer the money immediately.",
      "Use a protected payment method on a trusted platform or walk away.",
      "Share your one-time banking code.",
      "Ignore the platform's warnings."
    ],
    ans: 1,
    why: "Unrealistic prices and irreversible payment demands can indicate fraud.",
    subject: "Module 2"
  },
  {
    question: "What is the purpose of a fake login page?",
    scenario: "A link opens a page that resembles your email provider.",
    answers: [
      "To improve your internet speed.",
      "To install official software updates.",
      "To back up your account.",
      "To capture login information entered by visitors."
    ],
    ans: 3,
    why: "Fake login pages can collect usernames, passwords, and other sensitive details.",
    subject: "Module 2"
  },
  {
    question: "A caller claims to be from your bank and requests your one-time password. What should you do?",
    scenario: "The caller says the code is needed to prevent fraud.",
    answers: [
      "Read the code aloud.",
      "Send the code by text.",
      "Keep the code private and contact your bank through an official channel.",
      "Share your card PIN too."
    ],
    ans: 2,
    why: "One-time codes can authorize account access or transactions and should not be shared.",
    subject: "Module 2"
  },
  {
    question: "Which is the safest way to open your online banking account?",
    scenario: "You receive an unexpected text message containing a banking link.",
    answers: [
      "Click the link immediately.",
      "Open your official banking app or type the known website address yourself.",
      "Use a shortened link from a stranger.",
      "Ask the sender for your password."
    ],
    ans: 1,
    why: "Independent navigation helps you avoid deceptive links.",
    subject: "Module 2"
  },
  {
    question: "A QR code on an unfamiliar poster promises free mobile data. What should you do?",
    scenario: "The poster does not identify the organization providing the offer.",
    answers: [
      "Scan it and enter your password.",
      "Install every application it offers.",
      "Share your recovery codes.",
      "Verify the source and destination before using the QR code."
    ],
    ans: 3,
    why: "QR codes can conceal links to malicious or deceptive websites.",
    subject: "Module 2"
  },
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
    subject: "Module 2"
}
    
]
quiz.push(...sample5)

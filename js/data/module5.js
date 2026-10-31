const module5 = [
  {
    q: "You entered your password on a suspected fake website. What should you do?",
    scenario: "You realize the page may have been fraudulent.",
    answers: [
      "Wait to see what happens.",
      "Send the password to the website again.",
      "Change the password through the real service and secure the account.",
      "Reuse the same password on more accounts."
    ],
    correct: 2,
    why: "Change exposed credentials through the official service and update other accounts if the password was reused."
  },
  {
    q: "Friends report scam messages sent from your account. What should you do?",
    scenario: "You did not send the messages yourself.",
    answers: [
      "Ask everyone to click the link.",
      "Ignore the reports.",
      "Post your password publicly.",
      "Secure the account, revoke unfamiliar sessions, and warn contacts."
    ],
    correct: 3,
    why: "Secure your account and alert contacts so they can avoid suspicious messages."
  },
  {
    q: "A seller asks for your bank's one-time verification code. What should you do?",
    scenario: "The seller claims the code is required to complete a payment.",
    answers: [
      "Do not share the code; stop and contact the bank through official channels.",
      "Send it quickly.",
      "Share your PIN too.",
      "Post it in a product review."
    ],
    correct: 0,
    why: "One-time codes can authorize transactions or account access and should remain private."
  },
  {
    q: "A prize pop-up asks for card details to pay a delivery fee. What is safest?",
    scenario: "You never entered a giveaway.",
    answers: [
      "Enter your card details.",
      "Download the app it recommends.",
      "Share the offer with all your contacts.",
      "Do not pay; verify independently and close or report the page."
    ],
    correct: 3,
    why: "Unexpected prizes and upfront fees are common scam patterns."
  },
  {
    q: "You notice a transaction you do not recognize. What should you do?",
    scenario: "Your bank account shows an unfamiliar charge.",
    answers: [
      "Wait a few weeks.",
      "Reply to an unknown message about it.",
      "Contact the bank through official contact details and secure the account.",
      "Post your account number publicly."
    ],
    correct: 2,
    why: "Report suspected fraud promptly through verified channels."
  },
  {
    q: "A friend sends an unfamiliar app link to view a photo. What should you do?",
    scenario: "The message seems unusual for your friend.",
    answers: [
      "Install the app and allow every permission.",
      "Disable device protection.",
      "Do not install it; verify with your friend through another channel.",
      "Share the link with classmates."
    ],
    correct: 2,
    why: "The account or link may be compromised, and the app may be unsafe."
  },
  {
    q: "A message demands gift cards and threatens you. What should you do?",
    scenario: "The sender insists that you pay immediately.",
    answers: [
      "Buy the gift cards immediately.",
      "Do not pay; preserve the message and report it to a trusted adult or relevant authority.",
      "Send your passwords.",
      "Forward the message as a joke."
    ],
    correct: 1,
    why: "Threats and gift-card demands are common fraud indicators. Seek trusted help."
  },
  {
    q: "You accidentally posted your phone number publicly. What should you do?",
    scenario: "You notice the mistake after publishing the post.",
    answers: [
      "Add your home address too.",
      "Ignore every unwanted contact.",
      "Share your recovery codes.",
      "Remove or restrict the post and watch for suspicious contact."
    ],
    correct: 3,
    why: "Reducing exposure quickly helps protect your privacy."
  },
  {
    q: "A school account asks you to approve a login you did not start. What should you do?",
    scenario: "An unexpected sign-in approval prompt appears.",
    answers: [
      "Approve it to dismiss the alert.",
      "Send the code to a caller.",
      "Deny the request and secure or report the account if it continues.",
      "Post the prompt publicly."
    ],
    correct: 2,
    why: "Unexpected approval requests may indicate someone is attempting to access your account."
  },
  {
    q: "You suspect malware is on your laptop. What is a sensible response?",
    scenario: "The device behaves strangely after you download an unfamiliar file.",
    answers: [
      "Download more random tools.",
      "Enter banking details to test it.",
      "Ignore every symptom.",
      "Avoid sensitive tasks and run trusted security checks or ask qualified support."
    ],
    correct: 3,
    why: "Avoid sensitive activity and use reputable security tools or qualified support."
  }
];
 const sample3 = [  
  {
    question: "Someone offers paid account recovery and asks for your password. What should you do?",
    scenario: "The person contacted you privately and is not official support.",
    answers: [
      "Use the platform's official recovery process and do not share credentials.",
      "Pay and give them your password.",
      "Send your recovery codes.",
      "Give them remote access."
    ],
    ans: 0,
    why: "Recovery scammers exploit people who are already having account-access problems.",
    subject: "Module 5"
  },
  {
    question: "A classmate sends an unexpected attachment that seems unusual. What is safest?",
    scenario: "The message does not sound like how your classmate normally writes.",
    answers: [
      "Open it immediately because you know the sender.",
      "Verify with the classmate through another channel before opening it.",
      "Forward it to everyone.",
      "Disable antivirus protection."
    ],
    ans: 1,
    why: "A known account may be compromised, so unusual attachments should be verified.",
    subject: "Module 5"
  },
  {
    question: "A service reports a breach, and you reused that password elsewhere. What should you do?",
    scenario: "The same password protects several accounts.",
    answers: [
      "Keep using it.",
      "Change only your profile picture.",
      "Change it on affected and reused accounts, using unique passwords.",
      "Post the password publicly as a warning."
    ],
    ans: 2,
    why: "Changing reused passwords limits the risk of attackers accessing other accounts.",
    subject: "Module 5"
  },
  {
    question: "A delivery text asks you to pay through an unfamiliar link. What should you do?",
    scenario: "You are unsure whether the message is legitimate.",
    answers: [
      "Pay without checking.",
      "Send your ID through the link.",
      "Install the linked app.",
      "Check the delivery status through the courier's official website or app."
    ],
    ans: 3,
    why: "Independent verification helps identify fake delivery notices.",
    subject: "Module 5"
  },
  {
    question: "You find a USB drive labeled 'exam answers'. What should you do?",
    scenario: "The drive is lying in a school computer room.",
    answers: [
      "Do not plug it in; hand it to school staff.",
      "Open it on the teacher's computer.",
      "Copy its files to your laptop.",
      "Give it to a stranger."
    ],
    ans: 0,
    why: "Unknown removable media may contain malware or expose sensitive information.",
    subject: "Module 5"
  },
  {
    question: "A stranger asks for a photo of your student ID for a giveaway. What should you do?",
    scenario: "The request arrives in a private chat.",
    answers: [
      "Send both sides immediately.",
      "Do not share it; verify the request with a trusted adult or official organization.",
      "Send your password too.",
      "Post the ID publicly."
    ],
    ans: 1,
    why: "Student IDs may contain personal information and should only be shared when necessary with verified recipients.",
    subject: "Module 5"
  },
  {
    question: "A website requests your location without a clear reason. What should you do?",
    scenario: "The website does not need your location for its main function.",
    answers: [
      "Always allow it.",
      "Post your live location publicly.",
      "Disable your screen lock.",
      "Deny access unless there is a clear, trusted need."
    ],
    ans: 3,
    why: "Grant location access only when necessary and appropriate.",
    subject: "Module 5"
  },
  {
    question: "A classmate tells you to bypass a security warning to finish faster. What is best?",
    scenario: "The warning appears before downloading a file.",
    answers: [
      "Disable all protection permanently.",
      "Use the file on every device.",
      "Pause and verify the file with a trusted source or IT support.",
      "Share your password."
    ],
    ans: 2,
    why: "Time pressure is not a reason to bypass security checks.",
    subject: "Module 5"
  },
  {
    question: "Your social media account appears to send scam messages. What should you do?",
    scenario: "Contacts report messages you did not send.",
    answers: [
      "Ask everyone to click the messages.",
      "Delete your recovery options.",
      "Share your new password publicly.",
      "Secure the account, change the password, revoke unfamiliar sessions and apps, and warn contacts."
    ],
    ans: 3,
    why: "Secure access and connected applications, then alert contacts about suspicious messages.",
    subject: "Module 5"
  },
  {
    question: "A message claims to be from a relative and urgently demands money while telling you to keep it secret. What should you do?",
    scenario: "The request is unexpected and emotionally urgent.",
    answers: [
      "Transfer the money immediately.",
      "Verify the person's identity through a separate, trusted communication channel.",
      "Send your account details.",
      "Follow only the instructions in the message."
    ],
    ans: 1,
    why: "Scammers exploit urgency and secrecy. Independently verify unexpected financial requests.",
    subject: "Module 5"
  }
]
quiz.push(...sample3)
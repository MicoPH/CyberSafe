const quizQuestionsFull = [
  // MIXED QUIZ: MODULES 1–5 (50 QUESTIONS)

  {
    q: "What is the main purpose of cybersecurity?",
    scenario: "You are learning how to protect digital information.",
    answers: [
      "To make every website load faster",
      "To protect systems, devices, and information",
      "To remove all account passwords",
      "To allow anyone to access private files"
    ],
    correct: 1,
    why: "Cybersecurity protects digital systems and information from unauthorized access, damage, and misuse."
  },
  {
    q: "You receive an urgent message asking you to verify your account through an unfamiliar link. What should you do?",
    scenario: "The message threatens to disable your account.",
    answers: [
      "Click the link immediately",
      "Reply with your password",
      "Visit the official website separately to check your account",
      "Forward the link to your classmates"
    ],
    correct: 2,
    why: "An independently accessed official website helps you verify the message without trusting a suspicious link."
  },
  {
    q: "Which password practice is the safest?",
    scenario: "You are creating passwords for your online accounts.",
    answers: [
      "Use your birthday for every account",
      "Use one short password everywhere",
      "Share your password with friends",
      "Use a unique, long password for each account"
    ],
    correct: 3,
    why: "Unique, long passwords reduce the risk that one compromised account exposes your other accounts."
  },
  {
    q: "What is phishing?",
    scenario: "An attacker sends deceptive messages to internet users.",
    answers: [
      "A technique used to trick people into revealing sensitive information",
      "A method for updating operating systems",
      "A tool for creating strong passwords",
      "A process for backing up files"
    ],
    correct: 0,
    why: "Phishing uses deceptive messages or websites to steal credentials and other sensitive information."
  },
  {
    q: "Why should you install security updates?",
    scenario: "Your device reports that an operating system update is available.",
    answers: [
      "To make passwords public",
      "To fix known vulnerabilities and security bugs",
      "To guarantee that every download is safe",
      "To remove the need for antivirus protection"
    ],
    correct: 1,
    why: "Security updates often patch weaknesses that attackers could exploit."
  },
  {
    q: "A stranger offers you a free game reward in exchange for your password. What should you do?",
    scenario: "The offer arrives through a private message.",
    answers: [
      "Send your password if the reward is valuable",
      "Send your verification code instead",
      "Refuse and verify the promotion through official channels",
      "Use your school password for the offer"
    ],
    correct: 2,
    why: "Legitimate promotions should not require you to disclose your password to a stranger."
  },
  {
    q: "What is malware?",
    scenario: "You are studying different types of cybersecurity threats.",
    answers: [
      "Any application that uses the internet",
      "A normal software update",
      "A password containing numbers",
      "Software designed to cause harm or perform unauthorized actions"
    ],
    correct: 3,
    why: "Malware is malicious software designed to harm systems, steal information, or perform unauthorized actions."
  },
  {
    q: "What should you do if an unknown USB drive is found in the computer laboratory?",
    scenario: "You do not know who owns the drive.",
    answers: [
      "Give it to a teacher or authorized IT staff without plugging it in",
      "Connect it to your laptop immediately",
      "Copy its files to your phone",
      "Open its files on a school computer"
    ],
    correct: 0,
    why: "An unknown USB device may contain malicious software, so authorized staff should handle it safely."
  },
  {
    q: "What is the purpose of two-factor authentication (2FA)?",
    scenario: "You want to strengthen your account's sign-in security.",
    answers: [
      "To make all passwords identical",
      "To add another verification layer during sign-in",
      "To make accounts impossible to compromise",
      "To allow other people to use your account"
    ],
    correct: 1,
    why: "2FA adds another authentication factor beyond the primary sign-in method."
  },
  {
    q: "A website address looks almost identical to your school's official domain but contains unusual spelling. What should you do?",
    scenario: "The website asks you to enter your school credentials.",
    answers: [
      "Log in because the logo looks familiar",
      "Enter your password to test the website",
      "Leave and access the school website through its known official address",
      "Share the link with classmates"
    ],
    correct: 2,
    why: "Attackers can copy logos and page designs, so the website's actual domain must be verified."
  },
  {
    q: "Which information should generally remain private online?",
    scenario: "You are reviewing what to share on social media.",
    answers: [
      "A public announcement from your school",
      "A general interest in computer programming",
      "A public educational website",
      "Your passwords and one-time verification codes"
    ],
    correct: 3,
    why: "Passwords and verification codes can provide access to protected accounts and must remain confidential."
  },
  {
    q: "A pop-up claims your computer is infected and tells you to call an unfamiliar number. What should you do?",
    scenario: "The warning appeared unexpectedly while browsing.",
    answers: [
      "Close the suspicious pop-up safely and use trusted support channels",
      "Call the number immediately",
      "Give the caller remote access",
      "Tell the caller your account password"
    ],
    correct: 0,
    why: "Unexpected infection warnings can be technical-support scams. Use trusted support channels instead."
  },
  {
    q: "What does the principle of least privilege mean?",
    scenario: "An application requests access to your device's resources.",
    answers: [
      "Every application should receive administrator access",
      "Applications should receive only the access necessary for their intended tasks",
      "All applications must be permanently disabled",
      "Applications should access every personal file"
    ],
    correct: 1,
    why: "Least privilege limits permissions to what is necessary, reducing potential harm."
  },
  {
    q: "You receive a verification code even though you did not try to log in. What should you do?",
    scenario: "An unexpected authentication code arrives on your phone.",
    answers: [
      "Post the code in a group chat",
      "Send it to someone who asks for it",
      "Keep it private and review your account security",
      "Share it before it expires"
    ],
    correct: 2,
    why: "An unexpected code may indicate a mistaken or unauthorized sign-in attempt."
  },
  {
    q: "What is a safer way to use public Wi-Fi?",
    scenario: "You need to access your school account at a café.",
    answers: [
      "Connect to any network without checking its name",
      "Disable all security protections",
      "Share your login details with a friend",
      "Verify the network and use the official secure website when possible"
    ],
    correct: 3,
    why: "Verifying the network and using a secure official connection helps reduce exposure to network-related risks."
  },
  {
    q: "What should you do before downloading an unfamiliar program?",
    scenario: "A website offers a free utility application.",
    answers: [
      "Check the source's legitimacy and look for an official download",
      "Disable antivirus protection",
      "Download every file on the page",
      "Trust it because the page has many advertisements"
    ],
    correct: 0,
    why: "Verifying the publisher and download source reduces the risk of installing malicious software."
  },
  {
    q: "A social media account using your friend's name urgently asks for money. What is the safest response?",
    scenario: "The message sounds unusual and asks you to keep it secret.",
    answers: [
      "Send the money immediately",
      "Contact your friend through another trusted method",
      "Ask for your friend's password",
      "Forward the request to everyone"
    ],
    correct: 1,
    why: "A separate trusted communication channel helps verify whether the request is genuine."
  },
  {
    q: "What is the main benefit of backing up important files?",
    scenario: "You have school projects stored on your laptop.",
    answers: [
      "It makes every website trustworthy",
      "It prevents all phishing messages",
      "It helps recover files after loss, damage, or certain cyber incidents",
      "It removes the need for passwords"
    ],
    correct: 2,
    why: "Backups provide additional copies of important information that may be needed after data loss."
  },
  {
    q: "What should you do if an application requests unrelated access to your contacts and microphone?",
    scenario: "The requested permissions do not match the application's purpose.",
    answers: [
      "Allow everything automatically",
      "Disable the device's security tools",
      "Grant access because the application is free",
      "Review the application and deny unnecessary permissions"
    ],
    correct: 3,
    why: "Limiting unnecessary permissions helps protect personal information."
  },
  {
    q: "What is a strong reason to use a password manager?",
    scenario: "You have many online accounts with different passwords.",
    answers: [
      "It can help securely store and manage unique passwords",
      "It makes every account public",
      "It guarantees that phishing websites cannot exist",
      "It removes the need to secure your device"
    ],
    correct: 0,
    why: "A reputable password manager helps users manage distinct passwords without memorizing each one."
  },
  {
    q: "What should you do after accidentally posting a photo that exposes your school ID?",
    scenario: "The photo is publicly visible.",
    answers: [
      "Post your home address too",
      "Remove the post and review the exposed information",
      "Leave it public permanently",
      "Ask strangers to protect your information"
    ],
    correct: 1,
    why: "Removing the post and assessing the exposure can reduce continued disclosure of personal information."
  },
  {
    q: "Which is a warning sign of a possible online scam?",
    scenario: "An unfamiliar sender offers a prize you did not enter to win.",
    answers: [
      "A school announcement you expected",
      "A message from a verified official channel that you initiated",
      "An unexpected reward that requires sensitive information or payment",
      "A saved bookmark to a known website"
    ],
    correct: 2,
    why: "Unexpected prizes that demand money or sensitive information are common scam warning signs."
  },
  {
    q: "You use a public computer to check your school account. What should you do before leaving?",
    scenario: "Other people will use the computer after you.",
    answers: [
      "Save your password for the next user",
      "Leave your account open",
      "Write your password on the desk",
      "Sign out and avoid saving your credentials"
    ],
    correct: 3,
    why: "Signing out and avoiding saved credentials helps prevent others from accessing your account."
  },
  {
    q: "Which action helps protect your online privacy?",
    scenario: "You are adjusting your social media profile.",
    answers: [
      "Limit the audience for personal posts and review privacy settings",
      "Publish your phone number publicly",
      "Accept every unknown friend request",
      "Share your location with every application"
    ],
    correct: 0,
    why: "Controlling who can see your information reduces unnecessary exposure."
  },
  {
    q: "What is ransomware?",
    scenario: "A computer displays a demand for payment after files become inaccessible.",
    answers: [
      "A normal file backup tool",
      "Malware that can encrypt or lock data and demand payment",
      "A standard operating system update",
      "A tool for generating strong passwords"
    ],
    correct: 1,
    why: "Ransomware can make data inaccessible and demand payment for its supposed restoration."
  },
];
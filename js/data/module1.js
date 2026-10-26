const module1 = [
  {
    q: "What is the primary purpose of cybersecurity?",
    scenario: "A school wants to protect its computers, network, and student information.",
    answers: [
      "Prevent every computer malfunction.",
      "Protect systems, networks, and information.",
      "Make all websites public.",
      "Increase internet speed."
    ],
    correct: 1,
    why: "Cybersecurity protects digital systems, networks, and information from threats."
  },
  {
    q: "What is malware?",
    scenario: "A computer starts running an unfamiliar program that behaves suspiciously.",
    answers: [
      "A trusted software update.",
      "A backup copy of a file.",
      "Software designed to harm or misuse a device.",
      "A strong password."
    ],
    correct: 2,
    why: "Malware is malicious software that may damage systems, steal information, or disrupt activities."
  },
  {
    q: "What is a cybersecurity vulnerability?",
    scenario: "A programmer discovers a software flaw that attackers could exploit.",
    answers: [
      "A weakness that could be exploited.",
      "A computer wallpaper.",
      "A backup schedule.",
      "A file name."
    ],
    correct: 0,
    why: "A vulnerability is a weakness in software, hardware, or a process that could be exploited."
  },
  {
    q: "What does confidentiality mean in information security?",
    scenario: "A school stores private student records in a computer system.",
    answers: [
      "Everyone can edit the records.",
      "All information must be published.",
      "Files must be deleted every day.",
      "Only authorized people can access the information."
    ],
    correct: 3,
    why: "Confidentiality ensures sensitive information is accessible only to authorized people."
  },
  {
    q: "What does integrity mean in information security?",
    scenario: "A teacher checks whether student grades have been changed without permission.",
    answers: [
      "Information is always public.",
      "Information remains accurate and is not improperly changed.",
      "The computer is always connected to Wi-Fi.",
      "Every file is automatically deleted."
    ],
    correct: 1,
    why: "Integrity protects the accuracy and trustworthiness of information."
  },
  {
    q: "What does availability mean in cybersecurity?",
    scenario: "Students need to access their online learning platform during class.",
    answers: [
      "All files must be printed.",
      "Passwords must be public.",
      "Authorized users can access systems when needed.",
      "Only one person can use the system."
    ],
    correct: 2,
    why: "Availability ensures authorized users can access systems and information when needed."
  },
  {
    q: "Why are software updates important?",
    scenario: "Your laptop displays a notification that a security update is available.",
    answers: [
      "They can fix security vulnerabilities and software bugs.",
      "They remove the need for passwords.",
      "They make all files public.",
      "They guarantee protection against every attack."
    ],
    correct: 0,
    why: "Updates often patch security weaknesses and improve software reliability."
  },
  {
    q: "What is social engineering?",
    scenario: "Someone pretends to be technical support and asks you for a login code.",
    answers: [
      "A method of improving Wi-Fi.",
      "A technique for compressing files.",
      "A computer cooling process.",
      "Manipulating people into revealing information or taking unsafe actions."
    ],
    correct: 3,
    why: "Social engineering exploits human trust and behavior to obtain information or access."
  },
  {
    q: "What is the primary function of a firewall?",
    scenario: "A computer connects to the internet and needs protection against unwanted network connections.",
    answers: [
      "Increase screen brightness.",
      "Monitor and control network traffic.",
      "Charge the battery.",
      "Create documents automatically."
    ],
    correct: 1,
    why: "A firewall applies security rules to incoming and outgoing network traffic."
  },
  {
    q: "What is authentication?",
    scenario: "A website asks you to sign in before accessing your account.",
    answers: [
      "Deleting old files.",
      "Improving download speed.",
      "Verifying that a user is who they claim to be.",
      "Making an account public."
    ],
    correct: 2,
    why: "Authentication verifies identity through methods such as passwords, passkeys, or verification codes."
  },
  {
    q: "What is a data breach?",
    scenario: "A company discovers that unauthorized people accessed its customer records.",
    answers: [
      "Unauthorized access to or exposure of protected information.",
      "A scheduled system update.",
      "A normal account registration.",
      "A successful file backup."
    ],
    correct: 0,
    why: "A data breach occurs when protected information is accessed, disclosed, or exposed without authorization."
  },
  {
    q: "What does the principle of least privilege mean?",
    scenario: "A calculator application requests administrator access to the entire computer.",
    answers: [
      "Every application should have full access.",
      "All users must share one administrator account.",
      "Security permissions should be disabled.",
      "Users and applications should receive only the access they need."
    ],
    correct: 3,
    why: "Least privilege limits unnecessary access and reduces potential damage."
  },
  {
    q: "Why should important files be backed up?",
    scenario: "Your research project is stored on only one laptop.",
    answers: [
      "To publish the files publicly.",
      "To recover information after loss, damage, or a cyberattack.",
      "To remove the need for software updates.",
      "To share your passwords."
    ],
    correct: 1,
    why: "Backups provide a way to restore important information after an incident."
  },
  {
    q: "What should you do after using a shared school computer?",
    scenario: "You finish checking your school account in the computer laboratory.",
    answers: [
      "Leave your account signed in.",
      "Save your password in the browser for everyone.",
      "Sign out and avoid saving your password on the shared computer.",
      "Give your account to the next student."
    ],
    correct: 2,
    why: "Signing out helps prevent other users from accessing your account."
  },
  {
    q: "Which is a good cybersecurity habit?",
    scenario: "You have accounts on several websites.",
    answers: [
      "Use unique passwords and enable multifactor authentication when available.",
      "Reuse one password everywhere.",
      "Share your password with friends.",
      "Write your password in a public post."
    ],
    correct: 0,
    why: "Unique passwords and multifactor authentication reduce the risk of account compromise."
  },
  {
    q: "What is phishing?",
    scenario: "An email pretends to come from a trusted company and asks you to enter your password.",
    answers: [
      "A computer maintenance technique.",
      "A way to improve internet speed.",
      "A normal file backup.",
      "A deceptive attempt to steal information or access."
    ],
    correct: 3,
    why: "Phishing uses deceptive messages or websites to trick people into revealing sensitive information."
  },
  {
    q: "Which is an example of personal information?",
    scenario: "You are deciding what information to publish on a public profile.",
    answers: [
      "A public weather report.",
      "Your home address.",
      "A general computer manual.",
      "A public holiday date."
    ],
    correct: 1,
    why: "A home address can identify or locate you and should be protected."
  },
  {
    q: "Where should you download a new application?",
    scenario: "You need to install an application for a school project.",
    answers: [
      "A random pop-up advertisement.",
      "An unknown file-sharing link.",
      "An official app store or verified developer website.",
      "A shortened link from a stranger."
    ],
    correct: 2,
    why: "Trusted download sources reduce the risk of installing fake or modified applications."
  },
  {
    q: "What should you do with an unexpected email attachment?",
    scenario: "An unknown sender emails you a file with no explanation.",
    answers: [
      "Open it immediately.",
      "Forward it to every classmate.",
      "Disable your security software.",
      "Verify the sender and report or scan the attachment before opening it."
    ],
    correct: 3,
    why: "Unexpected attachments may contain malware or lead to unsafe content."
  },
  {
    q: "You receive an unfamiliar account login alert. What should you do?",
    scenario: "Your email provider reports a sign-in that you did not attempt.",
    answers: [
      "Ignore all security alerts.",
      "Send your password to the alert sender.",
      "Post your account information publicly.",
      "Check your account through the official website and secure it."
    ],
    correct: 3,
    why: "Use official account settings to review activity, change exposed credentials, and end unfamiliar sessions."
  }
];
const sample7 = [
    {
    question: "You notice a login alert for a location you do not recognize. What should you do?",
    scenario: "You did not initiate the sign-in.",
    answers: [
      "Ignore all future login alerts",
      "Check your account through its official service and secure it if necessary",
      "Send your password to the alert sender",
      "Post your account details publicly"
    ],
    ans: 1,
    why: "An unexpected login alert deserves verification through the official service and appropriate account protection.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Why is it important to lock your phone when you are not using it?",
    scenario: "You leave your phone on a desk in a shared classroom.",
    answers: [
      "It makes the battery last forever",
      "It prevents all malware infections",
      "It helps prevent unauthorized access to your device and information",
      "It makes public Wi-Fi secure"
    ],
    ans: 2,
    why: "A screen lock adds a barrier against people accessing your device without permission.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Which example best demonstrates safe account recovery?",
    scenario: "You need to regain access to your school account.",
    answers: [
      "Ask a stranger to recover it",
      "Post your recovery code online",
      "Send your password to an unknown support account",
      "Use the service's official recovery process"
    ],
    ans: 3,
    why: "The official recovery process is designed to verify account ownership without relying on unknown intermediaries.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Why should you check the sender's email address, not just the display name?",
    scenario: "An email appears to come from your school administrator.",
    answers: [
      "Display names can be imitated, so the sender address provides additional evidence",
      "Every display name is automatically verified",
      "The display name reveals the sender's password",
      "Checking an address guarantees that an email is safe"
    ],
    ans: 0,
    why: "Attackers can imitate familiar names. Checking the address helps, although it does not guarantee safety by itself.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What should you do if you think your account has been compromised?",
    scenario: "You notice unfamiliar account activity.",
    answers: [
      "Share your current password with friends",
      "Use the official service to secure the account, change the password, and review active sessions",
      "Ignore the activity",
      "Post screenshots containing verification codes"
    ],
    ans: 1,
    why: "Securing the account and reviewing sessions can help stop unauthorized access.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What is the safest response to a request for your one-time password (OTP)?",
    scenario: "Someone claims to be support staff and asks you to send the code.",
    answers: [
      "Share it if the person sounds professional",
      "Share it after checking their profile picture",
      "Keep it private and verify the request through official support",
      "Post it publicly before it expires"
    ],
    ans: 2,
    why: "An OTP is a sensitive authentication code and should not be shared with someone who contacts you unexpectedly.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Which is a good practice when using a shared computer?",
    scenario: "You need to open a personal document in a school laboratory.",
    answers: [
      "Leave downloaded personal files for the next user",
      "Save all your passwords in the browser",
      "Keep your account signed in",
      "Sign out and remove sensitive local files when appropriate"
    ],
    ans: 3,
    why: "Signing out and removing sensitive local files helps protect your information from later users.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What should you do when an online offer seems too good to be true?",
    scenario: "A website promises an expensive device for almost no cost.",
    answers: [
      "Verify the seller and offer independently before sharing information or paying",
      "Pay immediately to reserve the deal",
      "Provide your account password",
      "Ignore all website security warnings"
    ],
    ans: 0,
    why: "Independent verification helps identify fraudulent offers before you risk money or personal information.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What does a secure HTTPS connection indicate?",
    scenario: "You are checking a website before entering information.",
    answers: [
      "The website is guaranteed to be honest",
      "The connection is encrypted, but the site itself is not automatically trustworthy",
      "The website cannot collect any information",
      "The website is officially approved by your school"
    ],
    ans: 1,
    why: "HTTPS protects data in transit, but scammers can also use HTTPS on deceptive websites.",
    subject: "Mixed (Hard)"
  },
  {
    question: "A classmate asks for your school account password to submit work for you. What should you do?",
    scenario: "Your account contains private messages and school files.",
    answers: [
      "Share it because you trust the classmate",
      "Send it through a private message",
      "Keep it private and use an authorized way to share the work",
      "Share it temporarily and change it later"
    ],
    ans: 2,
    why: "Keeping credentials private protects your account. Use approved file-sharing or submission methods instead.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What should you do if you receive an unexpected file from a person you know?",
    scenario: "The message sounds unusual, even though the sender is familiar.",
    answers: [
      "Open it because familiar accounts are always safe",
      "Disable security tools first",
      "Forward it to everyone",
      "Confirm with the sender through another trusted channel before opening it"
    ],
    ans: 3,
    why: "A familiar account may be compromised, so unexpected files should be verified before opening.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Why should you review application permissions regularly?",
    scenario: "You have installed several applications over the past year.",
    answers: [
      "To remove access that an application no longer needs",
      "To make every application an administrator",
      "To make your passwords public",
      "To disable all security updates"
    ],
    ans: 0,
    why: "Reviewing permissions helps limit unnecessary access to location, camera, microphone, contacts, and other data.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What is identity theft?",
    scenario: "Someone uses another person's personal information without permission.",
    answers: [
      "Changing your own profile picture",
      "Using another person's personal information fraudulently or without authorization",
      "Creating a strong password",
      "Installing a legitimate update"
    ],
    ans: 1,
    why: "Identity theft involves the misuse of personal information to impersonate or act as another person.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What should you do if a website asks you to disable browser security before downloading a file?",
    scenario: "The download is from a website you do not recognize.",
    answers: [
      "Disable security immediately",
      "Download every available file",
      "Avoid the download and find a trusted source",
      "Enter your email password first"
    ],
    ans: 2,
    why: "A request to disable protections is a warning sign, and unknown downloads can expose your device to malware.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Why should you use a screen lock with a strong PIN or another secure authentication method?",
    scenario: "Your phone contains messages, photos, and school accounts.",
    answers: [
      "It makes the phone impossible to lose",
      "It prevents every online scam",
      "It makes every application trustworthy",
      "It makes unauthorized physical access more difficult"
    ],
    ans: 3,
    why: "A secure screen lock helps prevent other people from accessing your device and its stored information.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Why should you avoid reusing the same password across accounts?",
    scenario: "You use email, social media, and school accounts.",
    answers: [
      "It makes usernames public",
      "It prevents password managers from working",
      "One compromised password could expose several accounts",
      "It automatically disables two-factor authentication"
    ],
    ans: 2,
    why: "Password reuse allows a stolen password to be tried against multiple services.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What should you do with a suspicious attachment from an unknown sender?",
    scenario: "The message does not explain why the attachment was sent.",
    answers: [
      "Open it immediately",
      "Disable antivirus before opening it",
      "Forward it to your classmates",
      "Avoid opening it and verify the sender through a trusted channel"
    ],
    ans: 3,
    why: "Unexpected attachments may contain malicious files or direct you to unsafe websites.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What is social engineering in cybersecurity?",
    scenario: "An attacker tries to persuade a person to reveal protected information.",
    answers: [
      "Manipulating people into taking actions that compromise security",
      "Installing legitimate software updates",
      "Creating a backup of school documents",
      "Improving a computer's display resolution"
    ],
    ans: 0,
    why: "Social engineering exploits human trust, emotions, or behavior to bypass security.",
    subject: "Mixed (Hard)"
  },
  {
    question: "You notice a login alert for a location you do not recognize. What should you do?",
    scenario: "You did not initiate the sign-in.",
    answers: [
      "Ignore all future login alerts",
      "Check your account through its official service and secure it if necessary",
      "Send your password to the alert sender",
      "Post your account details publicly"
    ],
    ans: 1,
    why: "An unexpected login alert deserves verification through the official service and appropriate account protection.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Why is it important to lock your phone when you are not using it?",
    scenario: "You leave your phone on a desk in a shared classroom.",
    answers: [
      "It makes the battery last forever",
      "It prevents all malware infections",
      "It helps prevent unauthorized access to your device and information",
      "It makes public Wi-Fi secure"
    ],
    ans: 2,
    why: "A screen lock adds a barrier against people accessing your device without permission.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Which example best demonstrates safe account recovery?",
    scenario: "You need to regain access to your school account.",
    answers: [
      "Ask a stranger to recover it",
      "Post your recovery code online",
      "Send your password to an unknown support account",
      "Use the service's official recovery process"
    ],
    ans: 3,
    why: "The official recovery process is designed to verify account ownership without relying on unknown intermediaries.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Why should you check the sender's email address, not just the display name?",
    scenario: "An email appears to come from your school administrator.",
    answers: [
      "Display names can be imitated, so the sender address provides additional evidence",
      "Every display name is automatically verified",
      "The display name reveals the sender's password",
      "Checking an address guarantees that an email is safe"
    ],
    ans: 0,
    why: "Attackers can imitate familiar names. Checking the address helps, although it does not guarantee safety by itself.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What should you do if you think your account has been compromised?",
    scenario: "You notice unfamiliar account activity.",
    answers: [
      "Share your current password with friends",
      "Use the official service to secure the account, change the password, and review active sessions",
      "Ignore the activity",
      "Post screenshots containing verification codes"
    ],
    ans: 1,
    why: "Securing the account and reviewing sessions can help stop unauthorized access.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What is the safest response to a request for your one-time password (OTP)?",
    scenario: "Someone claims to be support staff and asks you to send the code.",
    answers: [
      "Share it if the person sounds professional",
      "Share it after checking their profile picture",
      "Keep it private and verify the request through official support",
      "Post it publicly before it expires"
    ],
    ans: 2,
    why: "An OTP is a sensitive authentication code and should not be shared with someone who contacts you unexpectedly.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Which is a good practice when using a shared computer?",
    scenario: "You need to open a personal document in a school laboratory.",
    answers: [
      "Leave downloaded personal files for the next user",
      "Save all your passwords in the browser",
      "Keep your account signed in",
      "Sign out and remove sensitive local files when appropriate"
    ],
    ans: 3,
    why: "Signing out and removing sensitive local files helps protect your information from later users.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What should you do when an online offer seems too good to be true?",
    scenario: "A website promises an expensive device for almost no cost.",
    answers: [
      "Verify the seller and offer independently before sharing information or paying",
      "Pay immediately to reserve the deal",
      "Provide your account password",
      "Ignore all website security warnings"
    ],
    ans: 0,
    why: "Independent verification helps identify fraudulent offers before you risk money or personal information.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What does a secure HTTPS connection indicate?",
    scenario: "You are checking a website before entering information.",
    answers: [
      "The website is guaranteed to be honest",
      "The connection is encrypted, but the site itself is not automatically trustworthy",
      "The website cannot collect any information",
      "The website is officially approved by your school"
    ],
    ans: 1,
    why: "HTTPS protects data in transit, but scammers can also use HTTPS on deceptive websites.",
    subject: "Mixed (Hard)"
  },
  {
    question: "A classmate asks for your school account password to submit work for you. What should you do?",
    scenario: "Your account contains private messages and school files.",
    answers: [
      "Share it because you trust the classmate",
      "Send it through a private message",
      "Keep it private and use an authorized way to share the work",
      "Share it temporarily and change it later"
    ],
    ans: 2,
    why: "Keeping credentials private protects your account. Use approved file-sharing or submission methods instead.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What should you do if you receive an unexpected file from a person you know?",
    scenario: "The message sounds unusual, even though the sender is familiar.",
    answers: [
      "Open it because familiar accounts are always safe",
      "Disable security tools first",
      "Forward it to everyone",
      "Confirm with the sender through another trusted channel before opening it"
    ],
    ans: 3,
    why: "A familiar account may be compromised, so unexpected files should be verified before opening.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Why should you review application permissions regularly?",
    scenario: "You have installed several applications over the past year.",
    answers: [
      "To remove access that an application no longer needs",
      "To make every application an administrator",
      "To make your passwords public",
      "To disable all security updates"
    ],
    ans: 0,
    why: "Reviewing permissions helps limit unnecessary access to location, camera, microphone, contacts, and other data.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What is identity theft?",
    scenario: "Someone uses another person's personal information without permission.",
    answers: [
      "Changing your own profile picture",
      "Using another person's personal information fraudulently or without authorization",
      "Creating a strong password",
      "Installing a legitimate update"
    ],
    ans: 1,
    why: "Identity theft involves the misuse of personal information to impersonate or act as another person.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What should you do if a website asks you to disable browser security before downloading a file?",
    scenario: "The download is from a website you do not recognize.",
    answers: [
      "Disable security immediately",
      "Download every available file",
      "Avoid the download and find a trusted source",
      "Enter your email password first"
    ],
    ans: 2,
    why: "A request to disable protections is a warning sign, and unknown downloads can expose your device to malware.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Why should you use a screen lock with a strong PIN or another secure authentication method?",
    scenario: "Your phone contains messages, photos, and school accounts.",
    answers: [
      "It makes the phone impossible to lose",
      "It prevents every online scam",
      "It makes every application trustworthy",
      "It makes unauthorized physical access more difficult"
    ],
    ans: 3,
    why: "A secure screen lock helps prevent other people from accessing your device and its stored information.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What should you do when you discover a suspicious transaction in an online account?",
    scenario: "You do not recognize a recent payment.",
    answers: [
      "Contact the official bank or service immediately through a trusted channel",
      "Reply to the suspicious message with your PIN",
      "Post your account number publicly",
      "Wait indefinitely without checking the transaction"
    ],
    ans: 0,
    why: "Promptly contacting the official provider allows you to report the transaction and follow its security procedures.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Which action helps reduce the risk of losing important schoolwork?",
    scenario: "You are working on a major project.",
    answers: [
      "Keep the only copy on one device",
      "Maintain backups in a separate, trusted location",
      "Send your account password to classmates",
      "Disable all file protection"
    ],
    ans: 1,
    why: "Keeping a separate backup provides another copy if the original is lost, damaged, or affected by an incident.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What is the safest way to verify a message claiming to be from a bank?",
    scenario: "The message asks you to confirm personal information.",
    answers: [
      "Click its link because the logo looks real",
      "Reply with your account PIN",
      "Contact the bank through its official app, website, or known contact details",
      "Send the message to strangers for verification"
    ],
    ans: 2,
    why: "A known official channel lets you verify the claim without relying on contact details in the suspicious message.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What should you do if your device displays a warning about a possible malware infection?",
    scenario: "You are unsure whether the warning is genuine.",
    answers: [
      "Call any number displayed in the warning",
      "Install an unknown cleaner advertised in the pop-up",
      "Enter your password into the warning window",
      "Avoid interacting with suspicious pop-ups and check using trusted security software"
    ],
    ans: 3,
    why: "Scareware can imitate security warnings, so use trusted security tools rather than unknown pop-ups.",
    subject: "Mixed (Hard)"
  },
  {
    question: "Why should you avoid posting your real-time location publicly?",
    scenario: "You are away from home and sharing updates online.",
    answers: [
      "It may reveal your whereabouts to people you do not trust",
      "It automatically deletes your account",
      "It prevents you from using the internet",
      "It makes every post anonymous"
    ],
    ans: 0,
    why: "Public location sharing can expose your movements and whereabouts to an unintended audience.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What is the best way to handle a suspicious email that requests personal information?",
    scenario: "The sender claims your account will be suspended unless you respond.",
    answers: [
      "Send the requested information quickly",
      "Avoid replying or opening suspicious links and report the message through an appropriate channel",
      "Forward it to everyone in your contacts",
      "Send your verification code to confirm your identity"
    ],
    ans: 1,
    why: "Avoiding suspicious interactions and reporting the message helps reduce the risk of phishing.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What should you do before granting an application access to your camera?",
    scenario: "A newly installed application requests camera permission.",
    answers: [
      "Always allow it without checking",
      "Disable your phone's screen lock",
      "Check whether camera access is necessary for the feature you want to use",
      "Share your password with the application developer"
    ],
    ans: 2,
    why: "Camera access should be granted only when it is needed for a legitimate application feature.",
    subject: "Mixed (Hard)"
  },
  {
    question: "What is a responsible first response if you accidentally click a suspicious link and enter your password?",
    scenario: "You realize the page may have been fraudulent.",
    answers: [
      "Ignore the incident",
      "Send the same password to the website again",
      "Delete all security alerts without checking",
      "Use the official service to change the password and review account security promptly"
    ],
    ans: 3,
    why: "Changing the exposed password through the official service and checking account activity can reduce further risk.",
    subject: "Mixed (Hard)"
  }
]

quiz.push(...sample7);
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
  {
    q: "Why should you avoid reusing the same password across accounts?",
    scenario: "You use email, social media, and school accounts.",
    answers: [
      "It makes usernames public",
      "It prevents password managers from working",
      "One compromised password could expose several accounts",
      "It automatically disables two-factor authentication"
    ],
    correct: 2,
    why: "Password reuse allows a stolen password to be tried against multiple services."
  },
  {
    q: "What should you do with a suspicious attachment from an unknown sender?",
    scenario: "The message does not explain why the attachment was sent.",
    answers: [
      "Open it immediately",
      "Disable antivirus before opening it",
      "Forward it to your classmates",
      "Avoid opening it and verify the sender through a trusted channel"
    ],
    correct: 3,
    why: "Unexpected attachments may contain malicious files or direct you to unsafe websites."
  },
  {
    q: "What is social engineering in cybersecurity?",
    scenario: "An attacker tries to persuade a person to reveal protected information.",
    answers: [
      "Manipulating people into taking actions that compromise security",
      "Installing legitimate software updates",
      "Creating a backup of school documents",
      "Improving a computer's display resolution"
    ],
    correct: 0,
    why: "Social engineering exploits human trust, emotions, or behavior to bypass security."
  },
  {
    q: "You notice a login alert for a location you do not recognize. What should you do?",
    scenario: "You did not initiate the sign-in.",
    answers: [
      "Ignore all future login alerts",
      "Check your account through its official service and secure it if necessary",
      "Send your password to the alert sender",
      "Post your account details publicly"
    ],
    correct: 1,
    why: "An unexpected login alert deserves verification through the official service and appropriate account protection."
  },
  {
    q: "Why is it important to lock your phone when you are not using it?",
    scenario: "You leave your phone on a desk in a shared classroom.",
    answers: [
      "It makes the battery last forever",
      "It prevents all malware infections",
      "It helps prevent unauthorized access to your device and information",
      "It makes public Wi-Fi secure"
    ],
    correct: 2,
    why: "A screen lock adds a barrier against people accessing your device without permission."
  },
  {
    q: "Which example best demonstrates safe account recovery?",
    scenario: "You need to regain access to your school account.",
    answers: [
      "Ask a stranger to recover it",
      "Post your recovery code online",
      "Send your password to an unknown support account",
      "Use the service's official recovery process"
    ],
    correct: 3,
    why: "The official recovery process is designed to verify account ownership without relying on unknown intermediaries."
  },
  {
    q: "Why should you check the sender's email address, not just the display name?",
    scenario: "An email appears to come from your school administrator.",
    answers: [
      "Display names can be imitated, so the sender address provides additional evidence",
      "Every display name is automatically verified",
      "The display name reveals the sender's password",
      "Checking an address guarantees that an email is safe"
    ],
    correct: 0,
    why: "Attackers can imitate familiar names. Checking the address helps, although it does not guarantee safety by itself."
  },
  {
    q: "What should you do if you think your account has been compromised?",
    scenario: "You notice unfamiliar account activity.",
    answers: [
      "Share your current password with friends",
      "Use the official service to secure the account, change the password, and review active sessions",
      "Ignore the activity",
      "Post screenshots containing verification codes"
    ],
    correct: 1,
    why: "Securing the account and reviewing sessions can help stop unauthorized access."
  },
  {
    q: "What is the safest response to a request for your one-time password (OTP)?",
    scenario: "Someone claims to be support staff and asks you to send the code.",
    answers: [
      "Share it if the person sounds professional",
      "Share it after checking their profile picture",
      "Keep it private and verify the request through official support",
      "Post it publicly before it expires"
    ],
    correct: 2,
    why: "An OTP is a sensitive authentication code and should not be shared with someone who contacts you unexpectedly."
  },
  {
    q: "Which is a good practice when using a shared computer?",
    scenario: "You need to open a personal document in a school laboratory.",
    answers: [
      "Leave downloaded personal files for the next user",
      "Save all your passwords in the browser",
      "Keep your account signed in",
      "Sign out and remove sensitive local files when appropriate"
    ],
    correct: 3,
    why: "Signing out and removing sensitive local files helps protect your information from later users."
  },
  {
    q: "What should you do when an online offer seems too good to be true?",
    scenario: "A website promises an expensive device for almost no cost.",
    answers: [
      "Verify the seller and offer independently before sharing information or paying",
      "Pay immediately to reserve the deal",
      "Provide your account password",
      "Ignore all website security warnings"
    ],
    correct: 0,
    why: "Independent verification helps identify fraudulent offers before you risk money or personal information."
  },
  {
    q: "What does a secure HTTPS connection indicate?",
    scenario: "You are checking a website before entering information.",
    answers: [
      "The website is guaranteed to be honest",
      "The connection is encrypted, but the site itself is not automatically trustworthy",
      "The website cannot collect any information",
      "The website is officially approved by your school"
    ],
    correct: 1,
    why: "HTTPS protects data in transit, but scammers can also use HTTPS on deceptive websites."
  },
  {
    q: "A classmate asks for your school account password to submit work for you. What should you do?",
    scenario: "Your account contains private messages and school files.",
    answers: [
      "Share it because you trust the classmate",
      "Send it through a private message",
      "Keep it private and use an authorized way to share the work",
      "Share it temporarily and change it later"
    ],
    correct: 2,
    why: "Keeping credentials private protects your account. Use approved file-sharing or submission methods instead."
  },
  {
    q: "What should you do if you receive an unexpected file from a person you know?",
    scenario: "The message sounds unusual, even though the sender is familiar.",
    answers: [
      "Open it because familiar accounts are always safe",
      "Disable security tools first",
      "Forward it to everyone",
      "Confirm with the sender through another trusted channel before opening it"
    ],
    correct: 3,
    why: "A familiar account may be compromised, so unexpected files should be verified before opening."
  },
  {
    q: "Why should you review application permissions regularly?",
    scenario: "You have installed several applications over the past year.",
    answers: [
      "To remove access that an application no longer needs",
      "To make every application an administrator",
      "To make your passwords public",
      "To disable all security updates"
    ],
    correct: 0,
    why: "Reviewing permissions helps limit unnecessary access to location, camera, microphone, contacts, and other data."
  },
  {
    q: "What is identity theft?",
    scenario: "Someone uses another person's personal information without permission.",
    answers: [
      "Changing your own profile picture",
      "Using another person's personal information fraudulently or without authorization",
      "Creating a strong password",
      "Installing a legitimate update"
    ],
    correct: 1,
    why: "Identity theft involves the misuse of personal information to impersonate or act as another person."
  },
  {
    q: "What should you do if a website asks you to disable browser security before downloading a file?",
    scenario: "The download is from a website you do not recognize.",
    answers: [
      "Disable security immediately",
      "Download every available file",
      "Avoid the download and find a trusted source",
      "Enter your email password first"
    ],
    correct: 2,
    why: "A request to disable protections is a warning sign, and unknown downloads can expose your device to malware."
  },
  {
    q: "Why should you use a screen lock with a strong PIN or another secure authentication method?",
    scenario: "Your phone contains messages, photos, and school accounts.",
    answers: [
      "It makes the phone impossible to lose",
      "It prevents every online scam",
      "It makes every application trustworthy",
      "It makes unauthorized physical access more difficult"
    ],
    correct: 3,
    why: "A secure screen lock helps prevent other people from accessing your device and its stored information."
  },
  {
    q: "What should you do when you discover a suspicious transaction in an online account?",
    scenario: "You do not recognize a recent payment.",
    answers: [
      "Contact the official bank or service immediately through a trusted channel",
      "Reply to the suspicious message with your PIN",
      "Post your account number publicly",
      "Wait indefinitely without checking the transaction"
    ],
    correct: 0,
    why: "Promptly contacting the official provider allows you to report the transaction and follow its security procedures."
  },
  {
    q: "Which action helps reduce the risk of losing important schoolwork?",
    scenario: "You are working on a major project.",
    answers: [
      "Keep the only copy on one device",
      "Maintain backups in a separate, trusted location",
      "Send your account password to classmates",
      "Disable all file protection"
    ],
    correct: 1,
    why: "Keeping a separate backup provides another copy if the original is lost, damaged, or affected by an incident."
  },
  {
    q: "What is the safest way to verify a message claiming to be from a bank?",
    scenario: "The message asks you to confirm personal information.",
    answers: [
      "Click its link because the logo looks real",
      "Reply with your account PIN",
      "Contact the bank through its official app, website, or known contact details",
      "Send the message to strangers for verification"
    ],
    correct: 2,
    why: "A known official channel lets you verify the claim without relying on contact details in the suspicious message."
  },
  {
    q: "What should you do if your device displays a warning about a possible malware infection?",
    scenario: "You are unsure whether the warning is genuine.",
    answers: [
      "Call any number displayed in the warning",
      "Install an unknown cleaner advertised in the pop-up",
      "Enter your password into the warning window",
      "Avoid interacting with suspicious pop-ups and check using trusted security software"
    ],
    correct: 3,
    why: "Scareware can imitate security warnings, so use trusted security tools rather than unknown pop-ups."
  },
  {
    q: "Why should you avoid posting your real-time location publicly?",
    scenario: "You are away from home and sharing updates online.",
    answers: [
      "It may reveal your whereabouts to people you do not trust",
      "It automatically deletes your account",
      "It prevents you from using the internet",
      "It makes every post anonymous"
    ],
    correct: 0,
    why: "Public location sharing can expose your movements and whereabouts to an unintended audience."
  },
  {
    q: "What is the best way to handle a suspicious email that requests personal information?",
    scenario: "The sender claims your account will be suspended unless you respond.",
    answers: [
      "Send the requested information quickly",
      "Avoid replying or opening suspicious links and report the message through an appropriate channel",
      "Forward it to everyone in your contacts",
      "Send your verification code to confirm your identity"
    ],
    correct: 1,
    why: "Avoiding suspicious interactions and reporting the message helps reduce the risk of phishing."
  },
  {
    q: "What should you do before granting an application access to your camera?",
    scenario: "A newly installed application requests camera permission.",
    answers: [
      "Always allow it without checking",
      "Disable your phone's screen lock",
      "Check whether camera access is necessary for the feature you want to use",
      "Share your password with the application developer"
    ],
    correct: 2,
    why: "Camera access should be granted only when it is needed for a legitimate application feature."
  },
  {
    q: "What is a responsible first response if you accidentally click a suspicious link and enter your password?",
    scenario: "You realize the page may have been fraudulent.",
    answers: [
      "Ignore the incident",
      "Send the same password to the website again",
      "Delete all security alerts without checking",
      "Use the official service to change the password and review account security promptly"
    ],
    correct: 3,
    why: "Changing the exposed password through the official service and checking account activity can reduce further risk."
  }
];
const module3 = [
  {
    q: "Which password practice is safest?",
    scenario: "You create accounts on several websites.",
    answers: [
      "Use your birthday.",
      "Reuse one password everywhere.",
      "Use a unique, long password for each account.",
      "Share one password with friends."
    ],
    correct: 2,
    why: "Unique passwords limit the impact of a breach on other accounts."
  },
  {
    q: "What does multifactor authentication (MFA) provide?",
    scenario: "A service asks you to verify your identity using an additional method.",
    answers: [
      "An additional verification factor beyond the password.",
      "A public profile.",
      "Automatic password sharing.",
      "A guarantee against every cyberattack."
    ],
    correct: 0,
    why: "MFA adds another verification step and improves account security."
  },
  {
    q: "A classmate asks for your password to finish a group assignment. What should you do?",
    scenario: "Your classmate says sharing your password will save time.",
    answers: [
      "Send it temporarily.",
      "Post it in the group chat.",
      "Use one password for the whole class.",
      "Keep it private and use an approved collaboration feature."
    ],
    correct: 3,
    why: "Credentials should remain private. Use authorized file-sharing and collaboration tools instead."
  },
  {
    q: "Which information should you keep private?",
    scenario: "You are deciding what information to post publicly.",
    answers: [
      "A public weather report.",
      "Your account recovery codes.",
      "A public holiday date.",
      "A general computer manual."
    ],
    correct: 1,
    why: "Recovery codes can provide access to your account and must be protected."
  },
  {
    q: "Why use a reputable password manager?",
    scenario: "You have many online accounts to secure.",
    answers: [
      "It makes all your accounts public.",
      "It sends your passwords to friends.",
      "It helps generate and store unique passwords securely.",
      "It removes the need for device security."
    ],
    correct: 2,
    why: "A reputable password manager helps maintain strong, unique credentials."
  },
  {
    q: "A caller asks you to read out a one-time verification code. What should you do?",
    scenario: "You did not initiate a sign-in or transaction.",
    answers: [
      "Send it to the caller.",
      "Post it online.",
      "Save it in a public note.",
      "Keep it private and use it only in the sign-in process you initiated."
    ],
    correct: 3,
    why: "Verification codes may authorize account access or sensitive actions."
  },
  {
    q: "Which is a good account recovery practice?",
    scenario: "You are configuring recovery options for an important account.",
    answers: [
      "Keep recovery methods current and protect recovery codes.",
      "Use an answer that everyone knows.",
      "Share recovery codes with classmates.",
      "Use a stranger's email address."
    ],
    correct: 0,
    why: "Secure, up-to-date recovery methods help you regain access safely."
  },
  {
    q: "What can privacy settings help you control?",
    scenario: "You are reviewing your social media profile.",
    answers: [
      "Your phone's battery chemistry.",
      "Who can view certain profile details and posts.",
      "The weather forecast.",
      "Your phone's physical size."
    ],
    correct: 1,
    why: "Privacy settings help control the audience for your information."
  },
  {
    q: "A calculator app requests access to your contacts and location. What should you do?",
    scenario: "The requested permissions do not seem necessary for a calculator.",
    answers: [
      "Allow every permission automatically.",
      "Share your account password.",
      "Deny unnecessary permissions and consider using another app.",
      "Disable your screen lock."
    ],
    correct: 2,
    why: "Applications should request only permissions needed for their intended functions."
  },
  {
    q: "Why should you avoid posting your live location publicly?",
    scenario: "You are preparing a public social media story.",
    answers: [
      "It automatically blocks phishing.",
      "It improves your Wi-Fi connection.",
      "It encrypts every message.",
      "It may reveal where you are in real time."
    ],
    correct: 3,
    why: "Public live-location information can expose your movements and create privacy risks."
  },
  {
    q: "What is a passkey?",
    scenario: "A website offers passkey sign-in as an alternative to a password.",
    answers: [
      "A password written on paper.",
      "A cryptographic credential used to authenticate access to an account.",
      "A publicly shared recovery code.",
      "A shared login for friends."
    ],
    correct: 1,
    why: "Passkeys use cryptographic authentication and can reduce reliance on passwords."
  },
  {
    q: "You receive a login alert from an unfamiliar location. What should you do?",
    scenario: "You did not attempt to sign in from that location.",
    answers: [
      "Ignore every future alert.",
      "Send your password to the alert sender.",
      "Review account activity through the official service and secure the account.",
      "Post your account details publicly."
    ],
    correct: 2,
    why: "Review activity through official settings and revoke unfamiliar sessions."
  },
  {
    q: "How should you store account recovery codes?",
    scenario: "An online service provides backup codes for account recovery.",
    answers: [
      "In a public group chat.",
      "In an unlocked document shared with everyone.",
      "With an unknown contact.",
      "In a secure location protected from unauthorized access."
    ],
    correct: 3,
    why: "Recovery codes should remain accessible to you but protected from other people."
  },
  {
    q: "Why should you lock your phone when you are not using it?",
    scenario: "You leave your phone unattended in a classroom.",
    answers: [
      "It helps prevent unauthorized physical access.",
      "It blocks every scam automatically.",
      "It replaces software updates.",
      "It makes your profile public."
    ],
    correct: 0,
    why: "A screen lock helps protect personal information if the device is left unattended."
  },
  {
    q: "Which is a good habit for a public social media profile?",
    scenario: "You are deciding which personal details to display.",
    answers: [
      "Publish your home address.",
      "Share only information appropriate for a public audience.",
      "Post your recovery codes.",
      "Include your passwords."
    ],
    correct: 1,
    why: "Limiting public personal information reduces privacy exposure."
  },
  {
    q: "How should you share one cloud document with a classmate?",
    scenario: "Your classmate needs access to a single research file.",
    answers: [
      "Give them your account password.",
      "Make your entire account public.",
      "Share only the required document with appropriate permissions.",
      "Send them your MFA code."
    ],
    correct: 2,
    why: "File-specific sharing follows least privilege and protects account credentials."
  },
  {
    q: "What should you do before giving away an old phone?",
    scenario: "You are preparing a device for another person to use.",
    answers: [
      "Leave all accounts signed in.",
      "Keep your private files on the phone.",
      "Share the screen-lock code publicly.",
      "Back up needed data, sign out, and reset the device appropriately."
    ],
    correct: 3,
    why: "Preparing a device properly helps protect personal data from the next owner."
  },
  {
    q: "Why should different accounts use different passwords?",
    scenario: "One online service reports a data breach.",
    answers: [
      "It limits damage if one password is exposed.",
      "It makes every account impossible to access.",
      "It shares all logins automatically.",
      "It prevents every kind of device theft."
    ],
    correct: 0,
    why: "Unique passwords prevent a compromised credential from automatically exposing other accounts."
  },
  {
    q: "An email asks you to send your password for verification. What should you do?",
    scenario: "The email has an official-looking logo.",
    answers: [
      "Send the password if the logo matches.",
      "Do not email your password; check your account through the official website.",
      "Reply with your recovery codes.",
      "Reuse your school password."
    ],
    correct: 1,
    why: "Do not send passwords through email. Verify account issues using the official service."
  },
  {
    q: "You accidentally publish private information online. What should you do?",
    scenario: "You notice that a public post contains information you did not intend to share.",
    answers: [
      "Leave the post public forever.",
      "Publish more private details.",
      "Remove or restrict the post and protect any affected accounts.",
      "Share your passwords too."
    ],
    correct: 2,
    why: "Reducing exposure quickly helps protect your privacy and affected accounts."
  }
];
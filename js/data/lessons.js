const bundledLessons = [
  // MODULE 1: CYBERSECURITY BASICS
  {
    id: 1,
    moduleId: 1,
    features: ["A1", "A2", "A3", "A4", "B1", "B4"],
    title: "Introduction to Cybersecurity",
    icon: "🛡️",
    description: "Understand cybersecurity and why protecting digital information matters.",
    content: `<p>Cybersecurity protects devices, networks, accounts, and information from digital threats.</p>
      <h3>Key Terms</h3>
      <ul>
        <li><strong>Threat:</strong> Something that may cause harm.</li>
        <li><strong>Personal information:</strong> Details that identify you or help access your accounts.</li>
        <li><strong>Privacy:</strong> Control over how your information is used.</li>
      </ul>
      <p><strong>Remember:</strong> Think before sharing information and use trusted services.</p>`
  },
  {
    id: 2,
    moduleId: 1,
    features: ["A1", "A2", "A3", "A4", "B1", "B4"],
    title: "Understanding Online Threats",
    icon: "⚠️",
    description: "Recognize common online threats and their effects.",
    content: `<p>Online threats can expose information, compromise accounts, or damage devices.</p>
      <ul>
        <li><strong>Phishing:</strong> Fake messages that trick users.</li>
        <li><strong>Scams:</strong> Deception to obtain money or information.</li>
        <li><strong>Malware:</strong> Software that performs harmful actions.</li>
        <li><strong>Account theft:</strong> Access without permission.</li>
      </ul>
      <p>Update software, verify suspicious messages, and avoid untrusted downloads.</p>`
  },
  {
    id: 3,
    moduleId: 1,
    features: ["A1", "A2", "A3", "B1"],
    title: "The CIA Triad",
    icon: "🔺",
    description: "Learn the three core goals of information security.",
    content: `<p>The CIA Triad describes three goals of information security:</p>
      <ul>
        <li><strong>Confidentiality:</strong> Only authorized people access information.</li>
        <li><strong>Integrity:</strong> Information stays accurate and is not changed without permission.</li>
        <li><strong>Availability:</strong> Systems and information are accessible when needed.</li>
      </ul>
      <p>Schools use access controls, accurate records, and backups to support these goals.</p>`
  },
  {
    id: 4,
    moduleId: 1,
    features: ["A1", "A2", "A3", "B1"],
    title: "Understanding Cybersecurity Risks",
    icon: "⚖️",
    description: "Understand threats, vulnerabilities, risks, and controls.",
    content: `<ul>
        <li><strong>Threat:</strong> Something that can cause harm.</li>
        <li><strong>Vulnerability:</strong> A weakness that could be exploited.</li>
        <li><strong>Risk:</strong> The possibility and impact of harm.</li>
        <li><strong>Control:</strong> A safeguard that reduces risk.</li>
      </ul>
      <p>An outdated app may have a vulnerability. Updates, strong authentication, and backups help reduce risk.</p>`
  },
  {
    id: 5,
    moduleId: 1,
    features: ["A1", "A2", "A3", "B1"],
    title: "Ethical and Responsible Internet Use",
    icon: "🤝",
    description: "Practice responsible behavior online.",
    content: `<p>Use digital services respectfully and follow applicable rules.</p>
      <ul>
        <li>Respect privacy and communicate politely.</li>
        <li>Never access accounts or files without permission.</li>
        <li>Respect copyright and credit sources.</li>
        <li>Report suspicious or harmful activity.</li>
      </ul>
      <p><strong>Remember:</strong> Being able to access something does not mean you have permission to use it.</p>`
  },
  {
    id: 6,
    moduleId: 1,
    features: ["A1", "A2", "A3", "B1"],
    title: "Understanding Malware",
    icon: "🦠",
    description: "Recognize common types of malicious software.",
    content: `<p>Malware is software designed to harm systems, steal information, or act without authorization.</p>
      <ul>
        <li><strong>Virus:</strong> Attaches to files or programs.</li>
        <li><strong>Worm:</strong> Spreads between systems.</li>
        <li><strong>Trojan:</strong> Disguises itself as legitimate software.</li>
        <li><strong>Ransomware:</strong> Locks or encrypts files for payment.</li>
        <li><strong>Spyware:</strong> Secretly collects information.</li>
      </ul>
      <p>Keep security tools enabled and avoid untrusted files and downloads.</p>`
  },

  // MODULE 2: PHISHING AND SCAMS
  {
    id: 7,
    moduleId: 2,
    features: ["A4", "A6", "A8", "A9", "B2", "B8"],
    title: "Phishing Awareness",
    icon: "🎣",
    description: "Identify suspicious messages and requests.",
    content: `<p>Phishing impersonates trusted people or organizations to steal information or trick users into unsafe actions.</p>
      <h3>Warning Signs</h3>
      <ul>
        <li>Unexpected password or code requests.</li>
        <li>Urgent threats or prizes.</li>
        <li>Suspicious sender addresses or links.</li>
        <li>Unexpected attachments.</li>
      </ul>
      <p>Verify messages using the official website or app, not the message link.</p>`,
    miniactivity: true,
    miniquestion: "A message says your account will be suspended unless you enter your password. What should you do?",
    minianswers: [
      "Click the link immediately.",
      "Reply with your password.",
      "Verify through the official website or app."
    ],
    answer: 2
  },
  {
    id: 8,
    moduleId: 2,
    features: ["A4", "A6", "A8", "A9", "B2", "B8"],
    title: "Fake Websites and Malicious Links",
    icon: "🔗",
    description: "Recognize suspicious websites and unsafe links.",
    content: `<p>Fake websites imitate legitimate services. Malicious links may lead to scams or unsafe downloads.</p>
      <ul>
        <li>Check for misspelled or misleading domains.</li>
        <li>Be cautious of unexpected login requests.</li>
        <li>Do not ignore browser security warnings.</li>
      </ul>
      <p>Open the official website independently instead of using an unfamiliar link.</p>`,
    miniactivity: true,
    miniquestion: "A message asks you to sign in to a school account through an unfamiliar site. What is safest?",
    minianswers: [
      "Enter your details if it looks professional.",
      "Open the official school website independently.",
      "Download the suggested file."
    ],
    answer: 1
  },
  {
    id: 9,
    moduleId: 2,
    features: ["A4", "A6", "A8", "A9", "B2", "B8"],
    title: "Online Scam Detection",
    icon: "🚨",
    description: "Recognize fake prizes, impersonation, and misleading offers.",
    content: `<p>Online scams use deception to obtain money, personal details, or account access.</p>
      <ul>
        <li>Fake prizes requiring advance fees.</li>
        <li>Unrealistic offers demanding quick payment.</li>
        <li>Impersonated friends or organizations.</li>
        <li>Requests for secrecy.</li>
      </ul>
      <p>Verify offers through official channels before paying or sharing information.</p>`,
    miniactivity: true,
    miniquestion: "You won a prize but must pay a fee first. What should you do?",
    minianswers: [
      "Pay immediately.",
      "Share the offer widely.",
      "Verify the promotion with the official organization."
    ],
    answer: 2
  },
  {
    id: 10,
    moduleId: 2,
    features: ["A4", "A6", "A8", "A9", "B2", "B8"],
    title: "Email Phishing",
    icon: "📧",
    description: "Spot deceptive emails that attempt to steal information.",
    content: `<p>Email phishing tricks recipients into clicking links, opening files, or revealing sensitive information.</p>
      <ul>
        <li>Check the sender address.</li>
        <li>Be cautious of urgent threats and unexpected rewards.</li>
        <li>Inspect links before opening them.</li>
      </ul>
      <p>Verify account notices through the official service or school IT staff.</p>`,
    miniactivity: true,
    miniquestion: "An email says your school account will be deleted unless you sign in now. What should you do?",
    minianswers: [
      "Click the email link.",
      "Reply with your password.",
      "Verify through the official school portal or IT staff."
    ],
    answer: 2
  },
  {
    id: 11,
    moduleId: 2,
    features: ["A4", "A6", "A8", "A9", "B2", "B8"],
    title: "SMS Phishing (Smishing)",
    icon: "📩",
    description: "Recognize fraudulent text messages and mobile scams.",
    content: `<p>Smishing is phishing through SMS or messaging services.</p>
      <ul>
        <li>Fake parcel-fee requests.</li>
        <li>False bank alerts.</li>
        <li>Unexpected prize messages.</li>
        <li>Links requesting account verification.</li>
      </ul>
      <p>Check with the organization using its official website, app, or known contact number.</p>`,
    miniactivity: true,
    miniquestion: "A text asks you to pay a delivery fee through an unfamiliar link. What should you do?",
    minianswers: [
      "Pay immediately.",
      "Check the courier's official website or app.",
      "Send your password."
    ],
    answer: 1
  },
  {
    id: 12,
    moduleId: 2,
    features: ["A4", "A6", "A8", "A9", "B2", "B8"],
    title: "Reporting Phishing and Online Scams",
    icon: "🚨",
    description: "Report suspicious messages and help protect others.",
    content: `<p>Reporting helps platforms, schools, and service providers investigate suspicious activity.</p>
      <ul>
        <li>Do not click more links or reply.</li>
        <li>Use the platform's report feature.</li>
        <li>Inform school IT staff or a trusted adult when appropriate.</li>
        <li>Keep relevant evidence without spreading malicious links.</li>
        <li>Contact the relevant service through official channels if money or accounts are affected.</li>
      </ul>`
  },

  // MODULE 3: PASSWORDS, PRIVACY, AND ACCOUNTS
  {
    id: 13,
    moduleId: 3,
    features: ["A5", "A7", "A10", "B6", "B10"],
    title: "Password Security Guide",
    icon: "🔐",
    description: "Create and manage secure, unique passwords.",
    content: `<p>Strong passwords are long, difficult to guess, and unique to each account.</p>
      <ul>
        <li>Use long passwords or passphrases.</li>
        <li>Never reuse important passwords.</li>
        <li>Avoid birthdays and predictable details.</li>
        <li>Consider a reputable password manager.</li>
        <li>Never share passwords in messages or email.</li>
      </ul>
      <p>Do not enter your real password into an unfamiliar password-checking website.</p>`
  },
  {
    id: 14,
    moduleId: 3,
    features: ["A5", "A7", "A10", "B6", "B10"],
    title: "Privacy and Personal Information",
    icon: "🔒",
    description: "Protect personal information when using online services.",
    content: `<p>Personal information can identify you or help others access your accounts.</p>
      <h3>Protect</h3>
      <ul>
        <li>Passwords and verification codes.</li>
        <li>Home address and contact details.</li>
        <li>School credentials and private documents.</li>
      </ul>
      <p>Review privacy settings, limit who sees your posts, check app permissions, and think before sharing.</p>`
  },
  {
    id: 15,
    moduleId: 3,
    features: ["A5", "A7", "A10", "B6", "B10"],
    title: "Account Protection and Two-Factor Authentication",
    icon: "🛡️",
    description: "Secure accounts with additional verification.",
    content: `<p>Two-factor authentication (2FA) adds a verification step beyond your password.</p>
      <ul>
        <li>Use an authenticator app, security key, or passkey when available.</li>
        <li>Use unique passwords.</li>
        <li>Review active sessions and devices.</li>
        <li>Keep recovery details current.</li>
        <li>Never share unexpected verification codes.</li>
      </ul>`
  },
  {
    id: 16,
    moduleId: 3,
    features: ["A5", "A7", "A10", "B6", "B10"],
    title: "Using a Password Manager",
    icon: "🗝️",
    description: "Organize unique passwords securely.",
    content: `<p>A password manager stores passwords and can generate strong, unique credentials.</p>
      <ul>
        <li>Reduces password reuse.</li>
        <li>Helps manage many accounts.</li>
        <li>Can create random passwords.</li>
      </ul>
      <p>Choose a reputable manager, protect its main account, enable extra authentication, and secure recovery options.</p>`
  },
  {
    id: 17,
    moduleId: 3,
    features: ["A5", "A7", "A10", "B6", "B10"],
    title: "Password Reuse Risks",
    icon: "🔄",
    description: "Learn how one leaked password can put other accounts at risk.",
    content: `<p>Password reuse means using the same password on multiple services. Attackers may try leaked credentials on other sites, a tactic called credential stuffing.</p>
      <h3>Reduce Risk</h3>
      <ul>
        <li>Use unique passwords.</li>
        <li>Protect email, school, and financial accounts first.</li>
        <li>Enable multifactor authentication.</li>
        <li>Change exposed passwords promptly.</li>
      </ul>`
  },
  {
    id: 18,
    moduleId: 3,
    features: ["A5", "A7", "A10", "B6", "B10"],
    title: "What to Do After an Account Is Compromised",
    icon: "🆘",
    description: "Recover safely after suspected unauthorized access.",
    content: `<p>If an account may be compromised, use the service's official recovery process.</p>
      <ol>
        <li>Use a trusted device and official website.</li>
        <li>Change the password.</li>
        <li>Sign out unfamiliar sessions and revoke suspicious app access.</li>
        <li>Check recovery details and account settings.</li>
        <li>Enable 2FA if available.</li>
        <li>Notify the provider or school when appropriate.</li>
      </ol>
      <p>Change the same password anywhere else it was reused.</p>`
  },

  // MODULE 4: DEVICE SAFETY
  {
    id: 19,
    moduleId: 4,
    features: ["B5", "C4"],
    title: "Device Safety and Software Updates",
    icon: "💻",
    description: "Use updates and basic security settings to protect devices.",
    content: `<p>Device safety protects computers and phones from unauthorized access, malware, and data loss.</p>
      <ul>
        <li>Install updates from trusted sources.</li>
        <li>Use a screen lock.</li>
        <li>Install apps from reputable sources.</li>
        <li>Keep security protection enabled.</li>
        <li>Back up important files.</li>
      </ul>
      <p>Lock your device when it is unattended.</p>`
  },
  {
    id: 20,
    moduleId: 4,
    features: ["B5", "C4"],
    title: "Safe Browsing and Public Wi-Fi",
    icon: "📶",
    description: "Browse safely and protect information on shared networks.",
    content: `<p>Not every public Wi-Fi network is trustworthy.</p>
      <ul>
        <li>Confirm the network name with the venue.</li>
        <li>Use HTTPS websites.</li>
        <li>Avoid sensitive activity on untrusted networks when possible.</li>
        <li>Never ignore browser security warnings.</li>
        <li>Disable automatic connections to unfamiliar networks.</li>
      </ul>
      <p>HTTPS protects the connection but does not prove a website is legitimate.</p>`
  },
  {
    id: 21,
    moduleId: 4,
    features: ["B5", "C4"],
    title: "Safe Software Installation",
    icon: "📥",
    description: "Reduce malware risks when installing applications.",
    content: `<p>Untrusted software can expose devices and data to security risks.</p>
      <ul>
        <li>Use official stores or verified developer sites.</li>
        <li>Check the developer and permissions.</li>
        <li>Avoid pirated or modified apps.</li>
        <li>Read installation prompts carefully.</li>
        <li>Keep security protection enabled.</li>
      </ul>
      <p>An app's familiar name or logo does not guarantee a download is authentic.</p>`
  },
  {
    id:22,
    moduleId: 4,
    features: ["B5", "C4"],
    title: "Antivirus and Security Tools",
    icon: "🛡️",
    description: "Understand how security tools help detect threats.",
    content: `<p>Security tools can detect malware, block suspicious activity, and warn about dangerous websites.</p>
      <ul>
        <li>Keep security tools updated and enabled.</li>
        <li>Use built-in firewall and browser protections.</li>
        <li>Install system security updates.</li>
      </ul>
      <p>No single tool blocks every threat. Safe browsing habits remain important.</p>`
  },
  {
    id: 23,
    moduleId: 4,
    features: ["B5", "C4"],
    title: "Secure Cloud Storage",
    icon: "☁️",
    description: "Protect files stored and shared online.",
    content: `<p>Cloud storage lets you access files across devices, but sharing settings can expose them.</p>
      <ul>
        <li>Use a unique password and 2FA.</li>
        <li>Check permissions before sharing links.</li>
        <li>Keep sensitive files private.</li>
        <li>Review active sessions.</li>
        <li>Maintain backups of important files.</li>
      </ul>
      <p>A file in your account is not automatically private if sharing is enabled.</p>`
  },
  {
    id: 24,
    moduleId: 4,
    features: ["B5", "C4"],
    title: "Data Backup and Recovery",
    icon: "🗄️",
    description: "Recover important files after loss or damage.",
    content: `<p>Backups are extra copies of information that help recover files after deletion, device failure, or some cyberattacks.</p>
      <ul>
        <li>Back up regularly.</li>
        <li>Keep one copy separate from your main device.</li>
        <li>Protect backups from unauthorized access.</li>
        <li>Test that files can be restored.</li>
      </ul>
      <p>Synchronization is not always a separate backup because unwanted changes may sync too.</p>`
  },

  // MODULE 5: PRACTICAL SCENARIOS AND RESPONSE GUIDES
  {
    id: 25,
    moduleId: 5,
    features: ["B3", "B7", "B9", "C1", "C2"],
    title: "What Would You Do? Cybersecurity Scenarios",
    icon: "🧠",
    description: "Apply cybersecurity knowledge to everyday situations.",
    content: `<p>Use a simple decision process when something online seems suspicious:</p>
      <ol>
        <li><strong>Pause:</strong> Do not rush.</li>
        <li><strong>Check:</strong> Look for warning signs.</li>
        <li><strong>Verify:</strong> Use a separate official channel.</li>
        <li><strong>Act safely:</strong> Report or ask a trusted person for help.</li>
      </ol>
      <p>Never share passwords, verification codes, or money just because a message creates urgency.</p>`
  },
  {
    id: 26,
    moduleId: 5,
    features: ["B3", "B7", "B9", "C1", "C2"],
    title: "Responding to Cybersecurity Incidents",
    icon: "🆘",
    description: "Take safe steps when a security incident occurs.",
    content: `<p>A cybersecurity incident may involve a stolen account, suspicious software, exposed data, or a lost device.</p>
      <ol>
        <li>Stop interacting with the suspicious content.</li>
        <li>Use a trusted device to secure affected accounts.</li>
        <li>Contact the relevant provider or school IT staff.</li>
        <li>Preserve relevant evidence.</li>
        <li>Follow official recovery instructions.</li>
      </ol>
      <p>Ask a trusted adult or school staff member for help when needed.</p>`
  },
  {
    id: 27,
    moduleId: 5,
    features: ["B3", "B7", "B9", "C1", "C2"],
    title: "Responding to a Suspicious Email",
    icon: "📧",
    description: "Handle suspicious emails without exposing your information.",
    content: `<p>If an email looks suspicious, do not click links, open unexpected attachments, or reply with personal information.</p>
      <ol>
        <li>Check the sender and message carefully.</li>
        <li>Verify claims through the official service.</li>
        <li>Report the email using available tools.</li>
        <li>Tell school IT staff if it involves a school account.</li>
      </ol>
      <p>If you already interacted with it, secure the affected account and seek help.</p>`
  },
  {
    id: 28,
    moduleId: 5,
    features: ["B3", "B7", "B9", "C1", "C2"],
    title: "Responding to a Suspicious Login Alert",
    icon: "🔔",
    description: "Respond to unexpected account sign-in notifications.",
    content: `<p>An unexpected login alert may indicate an attempted or successful sign-in.</p>
      <ol>
        <li>Do not approve a login you did not initiate.</li>
        <li>Open the service using its official app or website.</li>
        <li>Review recent activity and sign out unknown sessions.</li>
        <li>Change your password if needed.</li>
        <li>Enable 2FA and check recovery details.</li>
      </ol>
      <p>Never share a verification code with someone who contacts you unexpectedly.</p>`
  },
  {
    id: 29,
    moduleId: 5,
    features: ["B3", "B7", "B9", "C1", "C2"],
    title: "What to Do After Clicking a Phishing Link",
    icon: "🔗",
    description: "Respond safely if you open a suspicious link.",
    content: `<p>If you click a suspicious link, stay calm and take action based on what happened.</p>
      <ul>
        <li>Close the page and do not enter more information.</li>
        <li>If you entered a password, change it through the official site using a trusted device.</li>
        <li>If you shared payment details, contact the financial provider.</li>
        <li>Run trusted security checks if a file was downloaded.</li>
        <li>Report the incident and ask for help.</li>
      </ul>
      <p>Act quickly if credentials or sensitive information were shared.</p>`
  },
  {
    id: 30,
    moduleId: 5,
    features: ["B3", "B7", "B9", "C1", "C2"],
    title: "Creating a Personal Cybersecurity Checklist",
    icon: "✅",
    description: "Build a practical routine for safer digital habits.",
    content: `<p>Use this checklist regularly to reduce common cybersecurity risks.</p>
      <ul>
        <li>Use unique passwords and enable 2FA.</li>
        <li>Keep devices and apps updated.</li>
        <li>Review privacy and app permissions.</li>
        <li>Verify suspicious messages and links.</li>
        <li>Back up important files.</li>
        <li>Lock devices and secure recovery options.</li>
        <li>Know how to report an incident.</li>
      </ul>
      <p>Small, consistent habits help protect your accounts, devices, and personal information.</p>`
  }
];
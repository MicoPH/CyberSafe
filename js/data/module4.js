const module4 = [
  {
    q: "Why should you install official system updates?",
    scenario: "Your device displays a notification about an available update.",
    answers: [
      "They make passwords unnecessary.",
      "They reveal your password.",
      "They always erase every file.",
      "They can fix vulnerabilities and software bugs."
    ],
    correct: 3,
    why: "Official updates often include important security patches and reliability improvements."
  },
  {
    q: "You find an unknown USB drive at school. What should you do?",
    scenario: "The drive is unattended in a hallway.",
    answers: [
      "Plug it into your laptop to identify its owner.",
      "Open every file.",
      "Hand it to school staff without connecting it to a device.",
      "Use it on a shared computer."
    ],
    correct: 2,
    why: "Unknown USB devices may contain harmful files or pose other security risks."
  },
  {
    q: "What is a safer practice when using public Wi-Fi?",
    scenario: "You connect to a network at a café.",
    answers: [
      "Share your password with the network owner.",
      "Disable all device protection.",
      "Trust every pop-up.",
      "Verify websites and avoid unnecessary sensitive activity on untrusted networks."
    ],
    correct: 3,
    why: "Public networks require caution, especially when handling sensitive information."
  },
  {
    q: "Why should you back up important device files?",
    scenario: "Your school project is stored on only one laptop.",
    answers: [
      "To publish all files online.",
      "To recover files after loss, damage, or malware.",
      "To remove the need for updates.",
      "To share passwords."
    ],
    correct: 1,
    why: "Backups provide a way to restore important data after an incident."
  },
  {
    q: "An app starts showing unusual pop-ups after installation. What should you do?",
    scenario: "The behavior began after installing an unfamiliar application.",
    answers: [
      "Install more unknown apps.",
      "Give it administrator access.",
      "Review and remove the suspicious app and run trusted security checks.",
      "Ignore all warnings."
    ],
    correct: 2,
    why: "Unexpected behavior may indicate harmful or unwanted software."
  },
  {
    q: "What is the safest way to install mobile applications?",
    scenario: "You need an application for a school activity.",
    answers: [
      "Use a random download link.",
      "Install a file sent by an unknown person.",
      "Disable security checks permanently.",
      "Use a trusted app store and verify the developer."
    ],
    correct: 3,
    why: "Trusted sources and developer verification lower the risk of installing malicious apps."
  },
  {
    q: "A friend asks to borrow your phone. What is a good precaution?",
    scenario: "Your phone contains private messages and signed-in accounts.",
    answers: [
      "Give them your recovery codes.",
      "Disable the lock permanently.",
      "Share all saved passwords.",
      "Use guest or restricted access if available and protect sensitive accounts."
    ],
    correct: 3,
    why: "Limited access helps prevent accidental or unauthorized exposure of personal information."
  },
  {
    q: "Why is a screen lock important?",
    scenario: "You leave your tablet unattended.",
    answers: [
      "It improves mobile signal.",
      "It helps prevent unauthorized physical access.",
      "It blocks every phishing email.",
      "It replaces backups."
    ],
    correct: 1,
    why: "A screen lock is a basic measure that protects a device from unauthorized access."
  },
  {
    q: "A browser warns that a download may be unsafe. What should you do?",
    scenario: "You do not recognize the file's source.",
    answers: [
      "Disable the warning.",
      "Download the file on every device.",
      "Cancel and verify the source before proceeding.",
      "Share the file with classmates."
    ],
    correct: 2,
    why: "Do not bypass security warnings for files from unknown sources."
  },
  {
    q: "What is a safer charging practice at a public USB station?",
    scenario: "You need to charge your phone while traveling.",
    answers: [
      "Approve every data prompt.",
      "Unlock your phone for strangers.",
      "Install software requested by the station.",
      "Use your own power adapter or a charge-only cable."
    ],
    correct: 3,
    why: "Your own adapter or a charge-only cable reduces exposure to unknown data connections."
  },
  {
    q: "What should you do with app permissions that are unnecessary?",
    scenario: "A simple app has access to device features it does not need.",
    answers: [
      "Revoke the unnecessary permissions.",
      "Allow every permission forever.",
      "Share the permissions screen publicly.",
      "Turn off your screen lock."
    ],
    correct: 0,
    why: "Limiting permissions reduces unnecessary access to sensitive device features."
  },
  {
    q: "Why enable automatic screen locking?",
    scenario: "You sometimes forget to lock your phone.",
    answers: [
      "It sends files to strangers.",
      "It locks the device after a period of inactivity.",
      "It prevents all hardware failures.",
      "It removes malware automatically."
    ],
    correct: 1,
    why: "Automatic locking reduces the time an unattended device remains accessible."
  },
  {
    q: "A built-in security tool reports a threat. What should you do?",
    scenario: "A security notification appears on your computer.",
    answers: [
      "Ignore it without checking.",
      "Disable the tool immediately.",
      "Download a cleaner from a random pop-up.",
      "Follow trusted security guidance and investigate the alert."
    ],
    correct: 3,
    why: "Use trusted security tools rather than unverified pop-up solutions."
  },
  {
    q: "Where should you download drivers and firmware?",
    scenario: "You want to update a laptop component.",
    answers: [
      "Any file-sharing website.",
      "A random pop-up advertisement.",
      "The device manufacturer's website or another verified source.",
      "An unknown email attachment."
    ],
    correct: 2,
    why: "Fake or modified drivers and firmware may contain malware."
  },
  {
    q: "You lose a phone with your school accounts signed in. What should you do?",
    scenario: "You cannot find your phone after leaving school.",
    answers: [
      "Post your password publicly.",
      "Wait several months.",
      "Send recovery codes to strangers.",
      "Use official lost-device and account settings to secure it and report the loss."
    ],
    correct: 3,
    why: "Promptly securing accounts and using official lost-device features reduces risk."
  },
  {
    q: "Your laptop becomes unusually hot. What is a sensible precaution?",
    scenario: "The laptop's ventilation openings are partly blocked.",
    answers: [
      "Cover all the vents.",
      "Keep vents clear and use the laptop on a suitable surface.",
      "Leave it in direct sunlight.",
      "Ignore repeated overheating warnings."
    ],
    correct: 1,
    why: "Adequate ventilation helps the device manage heat and operate safely."
  },
  {
    q: "What should you do before connecting a device to a school network?",
    scenario: "Your device has unfamiliar software installed.",
    answers: [
      "Disable the firewall.",
      "Share the network password publicly.",
      "Install unknown certificates.",
      "Keep the system updated and follow school device rules."
    ],
    correct: 3,
    why: "Updated software and school security policies help protect the network."
  },
  {
    q: "Why remove applications you no longer use?",
    scenario: "Several old applications remain installed on your device.",
    answers: [
      "Unused apps always improve security.",
      "They make passwords unnecessary.",
      "Removing them can reduce unnecessary permissions and outdated software.",
      "They prevent every scam."
    ],
    correct: 2,
    why: "Removing unused software can reduce the device's attack surface."
  },
  {
    q: "A pop-up claims your computer is infected and provides a phone number. What should you do?",
    scenario: "The warning appears while you are browsing a website.",
    answers: [
      "Call the number and pay immediately.",
      "Give the caller remote access.",
      "Share your password.",
      "Close the pop-up safely and use trusted security tools instead."
    ],
    correct: 3,
    why: "Fake technical-support alerts use fear to pressure people into paying or granting access."
  },
  {
    q: "Why back up your data before resetting a device?",
    scenario: "You plan to reset your phone to troubleshoot a problem.",
    answers: [
      "To expose your files to strangers.",
      "To preserve important information that may be erased during the reset.",
      "To share all your passwords.",
      "To disable security updates."
    ],
    correct: 1,
    why: "A reset may erase local data, so back up important files first."
  }
];
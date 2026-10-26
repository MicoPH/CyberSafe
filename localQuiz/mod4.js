const sample6 = [
    {
    question: "What should you do with app permissions that are unnecessary?",
    scenario: "A simple app has access to device features it does not need.",
    answers: [
      "Revoke the unnecessary permissions.",
      "Allow every permission forever.",
      "Share the permissions screen publicly.",
      "Turn off your screen lock."
    ],
    ans: 0,
    why: "Limiting permissions reduces unnecessary access to sensitive device features.",
    subject: "Module 4"
  },
  {
    question: "Why enable automatic screen locking?",
    scenario: "You sometimes forget to lock your phone.",
    answers: [
      "It sends files to strangers.",
      "It locks the device after a period of inactivity.",
      "It prevents all hardware failures.",
      "It removes malware automatically."
    ],
    ans: 1,
    why: "Automatic locking reduces the time an unattended device remains accessible.",
    subject: "Module 4"
  },
  {
    question: "A built-in security tool reports a threat. What should you do?",
    scenario: "A security notification appears on your computer.",
    answers: [
      "Ignore it without checking.",
      "Disable the tool immediately.",
      "Download a cleaner from a random pop-up.",
      "Follow trusted security guidance and investigate the alert."
    ],
    ans: 3,
    why: "Use trusted security tools rather than unverified pop-up solutions.",
    subject: "Module 4"
  },
  {
    question: "Where should you download drivers and firmware?",
    scenario: "You want to update a laptop component.",
    answers: [
      "Any file-sharing website.",
      "A random pop-up advertisement.",
      "The device manufacturer's website or another verified source.",
      "An unknown email attachment."
    ],
    ans: 2,
    why: "Fake or modified drivers and firmware may contain malware.",
    subject: "Module 4"
  },
  {
    question: "You lose a phone with your school accounts signed in. What should you do?",
    scenario: "You cannot find your phone after leaving school.",
    answers: [
      "Post your password publicly.",
      "Wait several months.",
      "Send recovery codes to strangers.",
      "Use official lost-device and account settings to secure it and report the loss."
    ],
    ans: 3,
    why: "Promptly securing accounts and using official lost-device features reduces risk.",
    subject: "Module 4"
  },
  {
    question: "Your laptop becomes unusually hot. What is a sensible precaution?",
    scenario: "The laptop's ventilation openings are partly blocked.",
    answers: [
      "Cover all the vents.",
      "Keep vents clear and use the laptop on a suitable surface.",
      "Leave it in direct sunlight.",
      "Ignore repeated overheating warnings."
    ],
    ans: 1,
    why: "Adequate ventilation helps the device manage heat and operate safely.",
    subject: "Module 4"
  },
    
]
quiz.push(...sample6)
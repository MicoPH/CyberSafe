const sample4 = [
    {
        question: "What does integrity mean in information security?",
        scenario: "A teacher checks whether student grades have been changed without permission.",
        answers: [
            "Information is always public.",
            "Information remains accurate and is not improperly changed.",
            "The computer is always connected to Wi-Fi.",
            "Every file is automatically deleted."
        ],
        ans: 1,
        why: "Integrity protects the accuracy and trustworthiness of information.",
        subject: "Module 1"
    },
    {
        question: "What does availability mean in cybersecurity?",
        scenario: "Students need to access their online learning platform during class.",
        answers: [
            "All files must be printed.",
            "Passwords must be public.",
            "Authorized users can access systems when needed.",
            "Only one person can use the system.",
    ],
        ans: 2,
        why: "Availability ensures authorized users can access systems and information when needed.",
        subject: "Module 1"
    },
    {
        question: "Why are software updates important?",
        scenario: "Your laptop displays a notification that a security update is available.",
        answers: [
            "They can fix security vulnerabilities and software bugs.",
            "They remove the need for passwords.",
            "They make all files public.",
            "They guarantee protection against every attack."
        ],
        ans: 0,
        why: "Updates often patch security weaknesses and improve software reliability.",
        subject: "Module 1"
    },
    {
        question: "What is social engineering?",
        scenario: "Someone pretends to be technical support and asks you for a login code.",
        answers: [
            "A method of improving Wi-Fi.",
            "A technique for compressing files.",
            "A computer cooling process.",
            "Manipulating people into revealing information or taking unsafe actions."
        ],
        ans: 3,
        why: "Social engineering exploits human trust and behavior to obtain information or access.",
        subject: "Module 1"
    },
    {
        question: "What is the primary function of a firewall?",
        scenario: "A computer connects to the internet and needs protection against unwanted network connections.",
        answers: [
            "Increase screen brightness.",
            "Monitor and control network traffic.",
            "Charge the battery.",
            "Create documents automatically."
        ],
        ans: 1,
        why: "A firewall applies security rules to incoming and outgoing network traffic.",
        subject: "Module 1"
    },
    {
        question: "What is authentication?",
        scenario: "A website asks you to sign in before accessing your account.",
        answers: [
            "Deleting old files.",
            "Improving download speed.",
            "Verifying that a user is who they claim to be.",
            "Making an account public."
        ],
        ans: 2,
        why: "Authentication verifies identity through methods such as passwords, passkeys, or verification codes.",
        subject: "Module 1"
    },
    {
        question: "What is a data breach?",
        scenario: "A company discovers that unauthorized people accessed its customer records.",
        answers: [
            "Unauthorized access to or exposure of protected information.",
            "A scheduled system update.",
            "A normal account registration.",
            "A successful file backup."
    ],
        ans: 0,
        why: "A data breach occurs when protected information is accessed, disclosed, or exposed without authorization.",
        subject: "Module 1"
    }
]

quiz.push(...sample4)
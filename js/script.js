
let lessons = [];
let totalLessons = 0;

const modulesNames = [
    "Introduction to Cybersecurity",
    "Phishing, Fake Websites, and Scam Activities",
    "Passwords, Privacy, and Account Guides",
    "Device Safety Lessons and Reminders",
    "Practical Scenarios and Response Guides"
]

const defaultState = {
    completedLessons: [],
    completedModuleQuizzes: [],
    quizBestScore: 0,
    quizBestScores: {},
    points: 0,
    passwordChecks: 0,
    wordHuntBestScore: 0,
    wordHuntFoundWords: 0,
    activity: []
};
function createDefaultState() {
    return {
        ...defaultState,
        completedLessons: [],
        completedModuleQuizzes: [],
        quizBestScores: {},
        activity: []
    };
}
const state = createDefaultState();
let userPreferences = { theme: "system", graphicsQuality: "medium" };
let blastScore = 0;
let blastProgress = null;
let firestoreDocument = null;
let userDataLoaded = false;
let authStateVersion = 0;
let saveTimer;
let pendingCloudSave = Promise.resolve();
let onUserDataLoaded = () => {};
let studentProfile = { nickname: "", strand: "", section: "" };
let signedInUser = null;
let leaderboardUnsubscribers = [];

function clearLocalBlastProgress() {
    try {
        Object.keys(localStorage).forEach(key => {
            if (key === "hypeBlastProgress" || key.startsWith("hypeBlastProgress:")) {
                localStorage.removeItem(key);
            }
        });
    } catch (error) {
        console.error("Could not remove saved HYPE BLAST progress from this browser.", error);
    }
}

clearLocalBlastProgress();

function getLegacyUserData() {
    let legacyState = {};
    try {
        legacyState = JSON.parse(localStorage.getItem("cybersafeState") || "{}");
    } catch (error) {
        console.error("Could not read the previous browser save.", error);
    }
    if (!Array.isArray(legacyState.completedLessons)) {
        try {
            legacyState.completedLessons = JSON.parse(localStorage.getItem("completedLessons") || "[]");
        } catch (error) {
            console.error("Could not read previous lesson progress.", error);
            legacyState.completedLessons = [];
        }
    }
    return {
        state: legacyState,
        preferences: {
            theme: localStorage.getItem("cybersafeTheme") || "system",
            graphicsQuality: localStorage.getItem("cybersafeGraphicsQuality") || "medium"
        },
        blastScore: Math.max(0, Number(localStorage.getItem("blastScore")) || 0)
    };
}

function clearLegacyUserData() {
    ["cybersafeState", "completedLessons", "cybersafeTheme", "cybersafeGraphicsQuality",
        "blastScore", "hypeBlastProgress"].forEach(key => localStorage.removeItem(key));
}

function scheduleUserDataSave() {
    if (!firestoreDocument || !userDataLoaded) return;
    clearTimeout(saveTimer);
    saveTimer = setTimeout(flushUserDataSave, 250);
}

function flushUserDataSave(blastProgressToSave) {
    if (!firestoreDocument || !userDataLoaded) return pendingCloudSave;
    clearTimeout(saveTimer);
    const targetDocument = firestoreDocument;
    const shouldSaveBlastProgress = blastProgressToSave !== undefined;
    const documentData = {
        state,
        preferences: userPreferences,
        games: { hypeBlast: { highScore: blastScore } },
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    };
    const leaderboardData = {
        uid: signedInUser?.uid,
        profile: { ...studentProfile },
        points: Math.max(0, Math.floor(Number(state.points) || 0)),
        highScore: Math.max(0, Math.floor(Number(blastScore) || 0))
    };
    pendingCloudSave = pendingCloudSave
        .then(async () => {
            await targetDocument.set(documentData, { merge: true });
            if (shouldSaveBlastProgress) {
                if (blastProgressToSave === null) {
                    await targetDocument.update(
                        "games.hypeBlast.progress",
                        firebase.firestore.FieldValue.delete()
                    );
                } else {
                    await targetDocument.update("games.hypeBlast.progress", blastProgressToSave);
                }
            }
            try {
                await syncLeaderboardEntry(leaderboardData);
            } catch (error) {
                console.error("Could not update this student's leaderboard entry.", error);
                toast("Your progress was saved, but the leaderboard could not be updated. Check Firestore rules.");
            }
        })
        .catch(error => {
            console.error("Could not save account data to Firestore.", error);
            toast("Could not save your data to the cloud. Check your connection and try again.");
        });
    return pendingCloudSave;
}

async function loadUserData(user, expectedAuthStateVersion) {
    const document = firebase.firestore().collection("users").doc(user.uid);
    const snapshot = await document.get();
    if (expectedAuthStateVersion !== authStateVersion || auth.currentUser?.uid !== user.uid) return false;
    firestoreDocument = document;
    Object.keys(state).forEach(key => delete state[key]);
    Object.assign(state, createDefaultState());
    userPreferences = { theme: "system", graphicsQuality: "medium" };
    if (snapshot.exists) {
        const cloudData = snapshot.data();
        Object.assign(state, defaultState, cloudData.state || {});
        userPreferences = { ...userPreferences, ...(cloudData.preferences || {}) };
        blastScore = Math.max(0, Number(cloudData.games?.hypeBlast?.highScore) || 0);
        blastProgress = cloudData.games?.hypeBlast?.progress || null;
        studentProfile = {
            nickname: cloudData.profile?.nickname || "",
            strand: cloudData.profile?.strand || "",
            section: cloudData.profile?.section || ""
        };
    } else {
        const legacyData = getLegacyUserData();
        Object.assign(state, defaultState, legacyData.state);
        userPreferences = legacyData.preferences;
        blastScore = legacyData.blastScore;
        blastProgress = null;
        studentProfile = { nickname: "", strand: "", section: "" };
    }
    state.completedLessons = Array.isArray(state.completedLessons) ? state.completedLessons : [];
    state.completedModuleQuizzes = Array.isArray(state.completedModuleQuizzes) ? state.completedModuleQuizzes : [];
    state.quizBestScores = state.quizBestScores && typeof state.quizBestScores === "object"
        ? state.quizBestScores
        : {};
    state.activity = Array.isArray(state.activity) ? state.activity : [];
    state.quizProgress ??= null;
    state.phishingProgress ??= null;
    state.phishingLastOrder ??= null;
    state.phishingBestScore = Math.max(0, Math.min(100, Number(state.phishingBestScore) || 0));
    for (let moduleId = 1; moduleId <= 6; moduleId++) {
        state.quizBestScores[moduleId] = Number(state.quizBestScores[moduleId]) || 0;
    }
    if (!snapshot.exists) {
        await document.set({
            state,
            preferences: userPreferences,
            games: { hypeBlast: { highScore: blastScore } },
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        });
    }
    clearLegacyUserData();
    userDataLoaded = true;
    return true;
}

const activeTime = document.getElementById("datetime");

const firebaseConfig = {
    apiKey: "AIzaSyB403LLB8yGnXDwq1wIE0Y_InVa21AlPY8",
    authDomain: "cybersafe-11a37.firebaseapp.com",
    databaseURL: "https://cybersafe-11a37-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "cybersafe-11a37"
};
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();

function setAuthError(message) {
    document.getElementById("authError").textContent = message;
}

function syncLeaderboardEntry(entry) {
    if (!entry.uid || !entry.profile.nickname || !entry.profile.strand || !entry.profile.section) {
        return Promise.resolve();
    }
    return firebase.firestore().collection("leaderboard").doc(entry.uid).set({
        nickname: entry.profile.nickname,
        strand: entry.profile.strand,
        section: entry.profile.section,
        points: entry.points,
        highScore: entry.highScore,
        updatedAt: firebase.firestore.FieldValue.serverTimestamp()
    });
}

function renderLeaderboardRows(targetId, snapshot, scoreField, scoreLabel) {
    const tableBody = document.getElementById(targetId);
    tableBody.replaceChildren();
    if (snapshot.empty) {
        const row = tableBody.insertRow();
        const cell = row.insertCell();
        cell.colSpan = 5;
        cell.textContent = `No ${scoreLabel} scores yet.`;
        return;
    }

    snapshot.docs.forEach((entrySnapshot, index) => {
        const entry = entrySnapshot.data();
        const row = tableBody.insertRow();
        const rankCell = row.insertCell();
        const rank = document.createElement("span");
        rank.className = "leaderboard-rank";
        rank.textContent = String(index + 1).padStart(2, "0");
        rankCell.append(rank);
        const studentCell = document.createElement("th");
        studentCell.scope = "row";
        studentCell.textContent = entry.nickname || "Student";
        row.append(studentCell);
        row.insertCell().textContent = entry.strand || "—";
        row.insertCell().textContent = entry.section || "—";
        const scoreCell = row.insertCell();
        scoreCell.className = "leaderboard-score";
        scoreCell.textContent = `${Math.max(0, Number(entry[scoreField]) || 0).toLocaleString()}${scoreField === "points" ? " XP" : ""}`;
    });
}

function stopLeaderboardListeners() {
    leaderboardUnsubscribers.forEach(unsubscribe => unsubscribe());
    leaderboardUnsubscribers = [];
}

function startLeaderboardListeners() {
    stopLeaderboardListeners();
    const status = document.getElementById("leaderboardStatus");
    const leaderboard = firebase.firestore().collection("leaderboard");
    status.textContent = "Loading live scores…";

    leaderboardUnsubscribers = [
        ["highScore", "blastLeaderboardRows", "HYPE BLAST", "HYPE BLAST leaderboard"],
        ["points", "xpLeaderboardRows", "XP", "XP leaderboard"]
    ].map(([scoreField, targetId, scoreLabel, label]) =>
        leaderboard.orderBy(scoreField, "desc").limit(10).onSnapshot(snapshot => {
            renderLeaderboardRows(targetId, snapshot, scoreField, scoreLabel);
            status.textContent = "Live rankings from signed-in student accounts.";
        }, error => {
            console.error(`Could not load the ${label}.`, error);
            status.textContent = `Could not load the ${label}. Check your connection and contact a developer.`;
        })
    );
}

const sectionsByStrand = {
    STEM: ["Rational", "Innovative", "Creative", "Noble"],
    ICT: ["Generous", "Modest"],
    HE: ["Passionate", "Humble", "Reliable"],
    HUMSS: ["Diligent","Kind", "Obidient", "Polite"],
    GAS: ["Optimistic"]
};

function updateProfileSections() {
    const strand = document.getElementById("profileStrand").value;
    const sectionSelect = document.getElementById("profileSection");
    const selectedSection = studentProfile.strand === strand ? studentProfile.section : "";
    sectionSelect.replaceChildren(new Option("Select your section", ""));
    (sectionsByStrand[strand] || []).forEach(section => {
        sectionSelect.add(new Option(section, section));
    });
    sectionSelect.value = selectedSection;
}

function showProfileSetup() {
    document.getElementById("authTitle").textContent = "Tell us about yourself";
    document.getElementById("authMessage").textContent = "Add your nickname, strand, and section to personalize your student profile.";
    document.getElementById("signInFields").hidden = true;
    document.querySelectorAll("#signInFields input").forEach(input => { input.disabled = true; });
    document.getElementById("authSubmit").hidden = true;
    document.getElementById("profileSetup").hidden = false;
    document.querySelectorAll("#profileSetup input, #profileSetup select").forEach(input => { input.disabled = false; });
    document.getElementById("profileNickname").value = studentProfile.nickname;
    document.getElementById("profileStrand").value = studentProfile.strand;
    updateProfileSections();
    document.getElementById("profileNickname").focus();
}

function showAccountLoading(user) {
    document.getElementById("authTitle").textContent = user.displayName
        ? `Welcome back, ${user.displayName}`
        : "Welcome back";
    document.getElementById("authMessage").textContent = "Loading your account and learning progress…";
    document.getElementById("signInFields").hidden = true;
    document.getElementById("authSubmit").hidden = true;
    document.getElementById("accountRetry").hidden = true;
    document.getElementById("accountSignOut").hidden = true;
    document.getElementById("profileSetup").hidden = true;
    setAuthError("");
}

function showAccountLoadError(message) {
    document.getElementById("authMessage").textContent = "Signed in, but account setup could not finish. See the details below.";
    document.getElementById("accountRetry").hidden = false;
    document.getElementById("accountSignOut").hidden = false;
    setAuthError(message);
}

async function loadLessons() {
    const snapshot = await firebase.firestore().collection("lessons").get();
    if (snapshot.empty) {
        throw new Error("No lesson documents were found in Firestore. Ask an administrator to import the module lessons.");
    }

    const loadedLessons = snapshot.docs.map(documentSnapshot => {
        const lesson = documentSnapshot.data();
        const lessonId = Number(lesson.id);
        const moduleId = Number(lesson.moduleId);
        if (!Number.isInteger(lessonId) || String(lessonId) !== documentSnapshot.id ||
            !Number.isInteger(moduleId) || moduleId < 1 || moduleId > modulesNames.length ||
            typeof lesson.title !== "string" ||
            typeof lesson.description !== "string" ||
            typeof lesson.content !== "string" ||
            !Array.isArray(lesson.features)) {
            throw new Error(`Lesson document "${documentSnapshot.id}" is missing required lesson fields.`);
        }

        return { ...lesson, id: lessonId, moduleId };
    }).sort((left, right) => left.id - right.id);

    const moduleIds = new Set(loadedLessons.map(lesson => lesson.moduleId));
    for (let moduleId = 1; moduleId <= modulesNames.length; moduleId++) {
        if (!moduleIds.has(moduleId)) {
            throw new Error(`No lessons were found for Module ${moduleId}.`);
        }
    }

    lessons = loadedLessons;
    totalLessons = lessons.length;
}

function finishSignIn() {
    document.getElementById("authTitle").textContent = `Welcome back, ${studentProfile.nickname}!`;
    document.getElementById("authMessage").textContent = "Your account is ready.";
    document.getElementById("accountRetry").hidden = true;
    document.getElementById("accountSignOut").hidden = true;
    document.getElementById("signedInEmail").textContent = signedInUser?.email || "Signed in";
    document.getElementById("studentProfileSummary").textContent =
        `Nickname: ${studentProfile.nickname} · Strand: ${studentProfile.strand} · Section: ${studentProfile.section}`;
    document.querySelectorAll("#profileSetup input, #profileSetup select").forEach(input => { input.disabled = true; });
    document.body.classList.add("authenticated");
    toast(`Welcome back, ${studentProfile.nickname}!`);
    onUserDataLoaded();
    syncLeaderboardEntry({
        uid: signedInUser?.uid,
        profile: { ...studentProfile },
        points: Math.max(0, Math.floor(Number(state.points) || 0)),
        highScore: Math.max(0, Math.floor(Number(blastScore) || 0))
    }).catch(error => {
        console.error("Could not publish the student profile to the leaderboard.", error);
        toast("Your profile loaded, but the leaderboard could not be updated. Check Firestore rules.");
    });
}

async function saveStudentProfile() {
    const nickname = document.getElementById("profileNickname").value.trim();
    const strand = document.getElementById("profileStrand").value.trim();
    const section = document.getElementById("profileSection").value.trim();
    const submitButton = document.getElementById("profileSubmit");
    setAuthError("");
    if (!nickname || !strand || !section) {
        setAuthError("Enter your nickname, strand, and section.");
        return;
    }
    if (!firestoreDocument || !signedInUser) {
        setAuthError("Your account is not ready yet. Please sign in again.");
        return;
    }

    submitButton.disabled = true;
    try {
        studentProfile = { nickname, strand, section };
        await firestoreDocument.set({
            profile: studentProfile,
            updatedAt: firebase.firestore.FieldValue.serverTimestamp()
        }, { merge: true });
        finishSignIn();
    } catch (error) {
        console.error("Could not save the student profile to Firestore.", error);
        setAuthError("Could not save your profile. Check your connection and try again.");
    } finally {
        submitButton.disabled = false;
    }
}

document.getElementById("authForm").addEventListener("submit", async event => {
    event.preventDefault();
    if (!document.getElementById("profileSetup").hidden) {
        await saveStudentProfile();
        return;
    }
    const email = document.getElementById("authEmail").value.trim();
    const password = document.getElementById("authPassword").value;
    const submitButton = document.getElementById("authSubmit");
    submitButton.disabled = true;
    setAuthError("");
    document.getElementById("authTitle").textContent = "Welcome back";
    document.getElementById("authMessage").textContent = "Signing in and loading your account…";

    try {
        await auth.signInWithEmailAndPassword(email, password);
    } catch (error) {
        console.error("Firebase sign-in failed.", error);
        const messages = {
            "auth/invalid-email": "Enter a valid email address.",
            "auth/invalid-credential": "The email or password is incorrect.",
            "auth/operation-not-allowed": "Email and password sign-in is not enabled for this Firebase project.",
            "auth/network-request-failed": "Unable to reach the sign-in service. Check your connection and try again."
        };
        setAuthError(messages[error.code] || `Sign-in failed${error.code ? ` (${error.code})` : ""}. Please try again.`);
        document.getElementById("authMessage").textContent = "Sign in with your email and password to continue.";
    } finally {
        submitButton.disabled = false;
    }
});

document.getElementById("profileStrand").addEventListener("change", updateProfileSections);

async function loadSignedInAccount(user, expectedAuthStateVersion) {
    showAccountLoading(user);
    let loadingLessons = false;
    try {
        const loaded = await loadUserData(user, expectedAuthStateVersion);
        if (!loaded || expectedAuthStateVersion !== authStateVersion) return;

        loadingLessons = true;
        await loadLessons();
        if (expectedAuthStateVersion !== authStateVersion) return;

        setAuthError("");
        if (!studentProfile.nickname || !studentProfile.strand || !studentProfile.section) {
            showProfileSetup();
            return;
        }
        finishSignIn();
    } catch (error) {
        if (expectedAuthStateVersion !== authStateVersion) return;
        console.error(
            loadingLessons
                ? "Could not load module lessons from Firestore."
                : "Could not load this user's Firestore data.",
            error
        );

        let message = loadingLessons
            ? "Could not load module lessons from Firestore."
            : "Could not load your account data from Firestore.";
        if (error.code === "permission-denied" ||
            error.message?.toLowerCase().includes("permission")) {
            message += " Check that Firestore rules are deployed and allow this signed-in account to read the required data.";
        } else if (loadingLessons && error.message?.includes("No lesson documents")) {
            message = "No lessons are in Firestore yet. Sign in to the admin page and choose “Import all lessons,” then retry.";
        } else if (error.message) {
            message += ` ${error.message}`;
        }
        showAccountLoadError(message);
    }
}

document.getElementById("accountRetry").addEventListener("click", async () => {
    const user = auth.currentUser;
    if (!user) return;

    const button = document.getElementById("accountRetry");
    const expectedAuthStateVersion = authStateVersion;
    button.disabled = true;
    try {
        await loadSignedInAccount(user, expectedAuthStateVersion);
    } finally {
        button.disabled = false;
    }
});

document.getElementById("accountSignOut").addEventListener("click", async () => {
    try {
        await auth.signOut();
    } catch (error) {
        console.error("Could not sign out after account loading failed.", error);
        showAccountLoadError("Unable to sign out. Check your connection and try again.");
    }
});

auth.onAuthStateChanged(user => {
    const expectedAuthStateVersion = ++authStateVersion;
    if (!user) {
        if (expectedAuthStateVersion !== authStateVersion || auth.currentUser) return;
        clearTimeout(saveTimer);
        stopLeaderboardListeners();
        firestoreDocument = null;
        userDataLoaded = false;
        signedInUser = null;
        studentProfile = { nickname: "", strand: "", section: "" };
        document.body.classList.remove("authenticated");
        document.getElementById("authTitle").textContent = "Welcome back";
        document.getElementById("authMessage").textContent = "Sign in with your email and password to continue.";
        document.getElementById("signInFields").hidden = false;
        document.querySelectorAll("#signInFields input").forEach(input => { input.disabled = false; });
        document.getElementById("authSubmit").hidden = false;
        document.getElementById("accountRetry").hidden = true;
        document.getElementById("accountSignOut").hidden = true;
        document.getElementById("profileSetup").hidden = true;
        document.querySelectorAll("#profileSetup input, #profileSetup select").forEach(input => { input.disabled = true; });
        return;
    }
    signedInUser = user;
    loadSignedInAccount(user, expectedAuthStateVersion);
});

document.getElementById("signOut").addEventListener("click", async () => {
    try {
        await auth.signOut();
    } catch (error) {
        toast("Unable to sign out. Please try again.");
    }
});

function saveState() {
    scheduleUserDataSave();
    updateUI();
}

function addActivity(text) {
    state.activity.unshift({ text, time: new Date().toLocaleString() });
    state.activity = state.activity.slice(0, 8);
}

function toast(message) {
    const el = document.getElementById("toast");
    el.textContent = message;
    el.classList.add("show");
    clearTimeout(window.toastTimer);
    window.toastTimer = setTimeout(() => el.classList.remove("show"), 2200);
}

const appHistoryStateKey = "__cybersafeApp";
let handlingAppPopState = false;
let activeAppModal = null;
const appModalBackHandlers = new Map();

function getAppHistoryState() {
    const appState = history.state?.[appHistoryStateKey];
    if (appState && typeof appState === "object") return appState;
    return {
        page: document.querySelector(".page.active")?.id || "dashboard",
        modal: null
    };
}

function pushAppModalHistory(modalId, onBack) {
    appModalBackHandlers.set(modalId, onBack);
    const currentState = getAppHistoryState();
    if (currentState.modal === modalId) {
        activeAppModal = modalId;
        return;
    }

    history.pushState({
        ...(history.state || {}),
        [appHistoryStateKey]: {
            page: currentState.page,
            modal: modalId,
            parentModal: currentState.modal || null
        }
    }, "");
    activeAppModal = modalId;
}

function closeAppModalHistory(modalId, closeModal) {
    if (!handlingAppPopState && activeAppModal === modalId &&
        getAppHistoryState().modal === modalId) {
        history.back();
        return;
    }

    if (activeAppModal === modalId) activeAppModal = null;
    closeModal();
}

function dismissAppModalHistory(modalId) {
    if (activeAppModal !== modalId || getAppHistoryState().modal !== modalId) return;
    const currentState = getAppHistoryState();
    history.replaceState({
        ...(history.state || {}),
        [appHistoryStateKey]: {
            page: currentState.page,
            modal: currentState.parentModal || null,
            parentModal: null
        }
    }, "");
    activeAppModal = currentState.parentModal || null;
}

window.addEventListener("popstate", event => {
    const nextState = event.state?.[appHistoryStateKey];
    const nextModal = nextState?.modal || null;

    if (activeAppModal && activeAppModal !== nextModal) {
        const closeModal = appModalBackHandlers.get(activeAppModal);
        activeAppModal = null;
        if (closeModal) {
            handlingAppPopState = true;
            try {
                closeModal();
            } finally {
                handlingAppPopState = false;
            }
        }
    }

    if (nextState?.page) navigate(nextState.page, false);
    activeAppModal = nextModal;
});

history.replaceState({
    ...(history.state || {}),
    [appHistoryStateKey]: {
        page: document.querySelector(".page.active")?.id || "dashboard",
        modal: null
    }
}, "");

function navigate(page, recordHistory = true) {
    if (recordHistory) {
        const currentState = getAppHistoryState();
        if (currentState.modal) {
            history.replaceState({
                ...(history.state || {}),
                [appHistoryStateKey]: { page, modal: null }
            }, "");
            activeAppModal = null;
        } else if (currentState.page !== page) {
            history.pushState({
                ...(history.state || {}),
                [appHistoryStateKey]: { page, modal: null }
            }, "");
        }
    }

    document.querySelectorAll(".page").forEach(p => p.classList.toggle("active", p.id === page));
    document.querySelectorAll(".nav-item").forEach(b => b.classList.toggle("active", b.dataset.page === page));
    document.getElementById("breadcrumb").textContent = document.querySelector(`.nav-item[data-page="${page}"]`)?.textContent.trim() || page;
    document.getElementById("sidebar").classList.remove("open");
    window.scrollTo({ top: 0, behavior: "smooth" });
    if (page === "quiz") renderQuiz();
    if (page === "results") renderResults();
    if (page === "leaderboard") startLeaderboardListeners();
    if (document.getElementById("overlay").classList.contains("activetask")){
      document.getElementById("overlay").classList.remove("activetask")
    }
    updateNavIcons()
}

function progressPercent() {
    return Math.round((state.completedLessons.length / lessons.length) * 100);
}

function isFinalBossCompleted() {
    return state.completedModuleQuizzes.includes(6) || Number(state.quizBestScores[6]) > 0;
}

function updateHeroContinueLearning() {
    const button = document.getElementById("heroContinueLearning");
    const completedAllQuizzes = Array.from({ length: 5 }, (_, index) => index + 1)
        .every(moduleId => state.completedModuleQuizzes.includes(moduleId)) && isFinalBossCompleted();
    const showGameActions = completedAllQuizzes && !state.quizProgress;
    const title = document.getElementById("heroTitle");
    const description = document.getElementById("heroDescription");
    const gameActions = document.getElementById("heroGameActions");

    if (button) {
        button.classList.toggle("hidden", showGameActions);
        button.textContent = state.quizProgress
            ? "Resume Quiz →"
            : "Continue Learning →";
    }
    title.textContent = showGameActions
        ? "Enjoy with other games"
        : "Build your cyber awareness.";
    description.textContent = showGameActions
        ? "You completed all quizzes, including the Final Boss. Keep practicing with these games."
        : "Learn how to recognize phishing, scams, unsafe links, weak passwords, and other common online threats.";
    gameActions.classList.toggle("hidden", !showGameActions);
}

function updateUI() {
    const progress = progressPercent();
    updateHeroContinueLearning();
    updatePhishingStartButton();
    updateLessonQuizAction();
    document.getElementById("sideProgress").textContent = progress + "%";
    document.getElementById("sideProgressBar").style.width = progress + "%";
    document.getElementById("dashProgressText").textContent = progress + "% complete";
    document.getElementById("dashProgressBar").style.width = progress + "%";
    document.getElementById("resultPercent").textContent = progress + "%";
    document.getElementById("resultProgressBar").style.width = progress + "%";
    document.getElementById("completedLessons").textContent = `${state.completedLessons.length}/${lessons.length}`;
    document.getElementById("whbestScore").textContent = state.wordHuntBestScore + "%";
    document.getElementById("passwordChecks").textContent = state.passwordChecks;
    document.getElementById("points").textContent = state.points;
    const blastHighScore = Math.max(0, Number(blastScore) || 0);
    document.getElementById("blastHighScore").textContent = blastHighScore.toLocaleString();
    document.getElementById("resultLessons").textContent = state.completedLessons.length;
    document.getElementById("resultBestWH").textContent = state.wordHuntBestScore + "%";
    document.getElementById("resultPhishingBestScore").textContent = state.phishingBestScore + "%";
    document.getElementById("resultPoints").textContent = state.points;
    document.getElementById("resultBlastHighScore").textContent =
        Math.max(0, Number(blastScore) || 0).toLocaleString();
    document.getElementById("topbar-exp").textContent = state.points + " XP"
    renderQuizBestScoreChart("dashboardQuizScores");
    renderQuizBestScoreChart("resultsQuizScores");
    document.querySelectorAll("[data-module-quiz]").forEach(button => {
      const moduleId = Number(button.dataset.moduleQuiz);
      const unlocked = isModuleQuizUnlocked(moduleId);
      const completed = state.completedModuleQuizzes.includes(moduleId);
      button.disabled = !unlocked || completed;
      button.closest(".activity-card")?.classList.toggle("hidden", !unlocked);
      button.textContent = completed ? "Quiz completed" : "Start Quiz";
    });
    const finalQuizButton = document.querySelector("[data-final-quiz]");
    if (finalQuizButton) {
      const unlocked = lessons.every(lesson =>
        state.completedModuleQuizzes.includes(Number(lesson.moduleId))
      ) && state.completedLessons.length >= lessons.length;
      const completed = isFinalBossCompleted();
      finalQuizButton.disabled = !unlocked || completed;
      finalQuizButton.textContent = completed ? "Quiz completed" : "Start Quiz";
      finalQuizButton.closest(".activity-card")?.classList.toggle("hidden", !unlocked);
    }
    const finalBossCompleted = isFinalBossCompleted();
    const hypeBlastButton = document.getElementById("startHypeBlast");
    hypeBlastButton.disabled = !finalBossCompleted;
    hypeBlastButton.textContent = finalBossCompleted
        ? "Start HYPE BLAST"
        : "Locked — complete Final Boss";
    document.getElementById("hypeBlastLockMessage").classList.toggle("hidden", finalBossCompleted);
    document.getElementById("heroHypeBlastButton").disabled = !finalBossCompleted;
    renderLearningPath();
    renderLessons();
}

// Word Hunt Games


function renderResults() {
    const badges = [
        ["📘 First Lesson", state.completedLessons.length >= 1],
        ["🎓 Course Explorer", state.completedLessons.length >= 3],
        ["📘 Half on a Lesson Journey", state.completedLessons.length >= 6],
        ["🛡️ Cyber Aware", state.completedLessons.length === lessons.length],
        ["🌟 Points King", state.points >= 10000],
        ["🌟 Points Diamond", state.points >= 5000],
        ["🌟 Points Ruby", state.points >= 8000],
        ["🏆 Quiz Master", state.quizBestScore >= 100],
        ["🔐 Password Practice", state.passwordChecks >= 1],
        ["🏔️ Word Hunt Master", state.wordHuntFoundWords >= 8]
    ];
    document.getElementById("badges").innerHTML = badges.map(b => `<div class="badge-item ${b[1] ? "unlocked" : ""}">${b[0]} ${b[1] ? "✓" : "🔒"}</div>`).join("");
    document.getElementById("activityLog").innerHTML = state.activity.length
        ? state.activity.map(a => `<div class="activity-item"><strong>${a.text}</strong><span>${a.time}</span></div>`).join("")
        : `<p style="color:var(--muted)">No activity yet. Complete a lesson or quiz to see your activity here.</p>`;
}
let themeDark;
function applyTheme(value) {
    const dark = value === "dark" || (value === "system" && matchMedia("(prefers-color-scheme: dark)").matches);
    document.body.classList.toggle("dark", dark);
    if (dark){
        document.getElementById("menuBtn").src = "img/vector/more_dark.svg"
        document.getElementById("favicon").href = "img/icons/cybersecurity_dark.png";
        document.getElementById("mainicon").src = "img/icons/cybersecurity_dark.png";
    } else {
        document.getElementById("menuBtn").src = "img/vector/more-nav.svg"
        document.getElementById("favicon").href = "img/icons/cybersecurity_white.png";
        document.getElementById("mainicon").src = "img/icons/cybersecurity_white.png";
    }
    document.querySelectorAll("img.close-card").forEach(image => {
      image.src = dark ? "img/vector/exit_dark.svg" : "img/vector/exit.svg";
    });
    document.querySelectorAll("img.vector-nav").forEach(image => {
      
      const active = image.parentElement.classList.contains("active");
      if (dark) {
          image.src = active
              ? "img/vector/" + image.dataset.image + "_dark.svg"
              : "img/vector/" + image.dataset.image + "_dark_muted.svg";
      } else {
          image.src = active
              ? "img/vector/" + image.dataset.image + ".svg"
              : "img/vector/" + image.dataset.image + "_muted.svg";
      }
    });
    document.getElementById("themeSelect").value = value;
    themeDark = dark
}
function applyGraphicsQuality(value) {
    const allowedQualities = ["low", "medium", "high"];
    const quality = allowedQualities.includes(value) ? value : "medium";
    const previousQuality = document.body.dataset.graphicsQuality;
    document.body.dataset.graphicsQuality = quality;
    document.getElementById("graphicsQualitySelect").value = quality;

    const heroVideo = document.getElementById("vid");
    if (quality === "low") {
        heroVideo.pause();
    } else if (previousQuality === "low" && heroVideo.paused) {
        heroVideo.play().catch(() => toast("The browser blocked the hero video from playing."));
    }
    try{
        liquidGlass(quality);
    } catch {}
}
function updateNavIcons() {
    document.querySelectorAll(".nav-item").forEach(item => {
        const image = item.querySelector("img.vector-nav");
        if (!image) return;

        const active = item.classList.contains("active");
        const hovered = window.matchMedia("(hover: hover) and (pointer: fine)").matches
            && item.matches(":hover");

        const highlighted = active || hovered;
        const name = image.dataset.image;

        if (themeDark) {
            image.src = highlighted
                ? `img/vector/${name}_dark.svg`
                : `img/vector/${name}_dark_muted.svg`;
        } else {
            image.src = highlighted
                ? `img/vector/${name}.svg`
                : `img/vector/${name}_muted.svg`;
        }
    });
}

document.querySelectorAll(".nav-item").forEach(item => {
    item.addEventListener("mouseenter", updateNavIcons);
    item.addEventListener("mouseleave", updateNavIcons);
    item.addEventListener("click", () => {
        document.querySelectorAll(".nav-item.active").forEach(nav => {
            nav.classList.remove("active");
        });

        item.classList.add("active");
        updateNavIcons();
    });
});


document.querySelectorAll(".nav-item").forEach(btn => btn.addEventListener("click", () => navigate(btn.dataset.page)));

document.querySelectorAll("[data-go]").forEach(btn => btn.addEventListener("click", () => {
  if (btn.id === "heroContinueLearning" && state.quizProgress) {
    restoreQuizProgress(state.quizProgress);
    return;
  }
  navigate(btn.dataset.go);
}));

function closeNavigationMenu() {
    document.getElementById("sidebar").classList.remove("open");
    document.getElementById("overlay").classList.remove("activetask");
}

document.getElementById("menuBtn").addEventListener("click", () => {
    if (document.getElementById("sidebar").classList.contains("open")) {
        closeAppModalHistory("navigation-menu", closeNavigationMenu);
        return;
    }

    pushAppModalHistory("navigation-menu", closeNavigationMenu);
    document.getElementById("sidebar").classList.add("open");
    document.getElementById("overlay").classList.add("activetask");
});

document.getElementById("overlay").addEventListener("click", () => {
    if (document.getElementById("overlay").classList.contains("activetask")) {
        closeAppModalHistory("navigation-menu", closeNavigationMenu);
    }
});

document.getElementById("passwordInput").addEventListener("input", checkPassword);

document.getElementById("togglePassword").addEventListener("click", () => {
const input = document.getElementById("passwordInput");

input.type = input.type === "password" ? "text" : "password";
document.getElementById("togglePassword").textContent = input.type === "password" ? "Show" : "Hide";
});
document.getElementById("lengthRange").addEventListener("input", () => document.getElementById("lengthValue").textContent = document.getElementById("lengthRange").value);
document.getElementById("generatePassword").addEventListener("click", generatePassword);
document.getElementById("copyPassword").addEventListener("click", async () => {
const text = document.getElementById("generatedPassword").textContent;
if (text !== "Click Generate") {
    try { await navigator.clipboard.writeText(text); toast("Generated password copied."); }
    catch { toast("Copy was blocked by the browser."); }
}
});
document.getElementById("themeSelect").addEventListener("change", e => {
    userPreferences.theme = e.target.value;
    applyTheme(e.target.value);
    scheduleUserDataSave();
});
document.getElementById("graphicsQualitySelect").addEventListener("change", e => {
    userPreferences.graphicsQuality = e.target.value;
    applyGraphicsQuality(e.target.value);
    scheduleUserDataSave();
});
document.getElementById("resetData").addEventListener("click", () => {
    if (confirm("Reset all CyberSafe prototype data?")) {
        state.completedLessons = [],
        state.completedModuleQuizzes = [],
        state.quizProgress = null,
        state.quizBestScore = 0,
        state.quizBestScores = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0, 6: 0 },
        state.points = 0,
        state.passwordChecks = 0,
        state.wordHuntBestScore = 0,
        state.wordHuntFoundWords = 0,
        state.phishingBestScore = 0,
        state.phishingProgress = null,
        state.phishingLastOrder = null,
        state.activity = [],
        blastScore = 0,
        blastProgress = null,
        saveState();
        renderResults();
        toast("Prototype data reset.");
    }
});




function resizepos(){
    document.getElementById("heightmargin").style.height = document.getElementById("topbar").offsetHeight + "px"
}
// resize 
document.body.addEventListener("resize", resizepos)
resizepos()
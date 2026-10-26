function checkPassword() {
    const value = document.getElementById("passwordInput").value;
    let score = 0;
    const checks = [
        [value.length >= 12, "At least 12 characters"],
        [/[A-Z]/.test(value), "Uppercase letter"],
        [/[a-z]/.test(value), "Lowercase letter"],
        [/[0-9]/.test(value), "Number"],
        [/[^A-Za-z0-9]/.test(value), "Symbol"]
    ];
    score = checks.filter(x => x[0]).length;
    const percent = value ? score / checks.length * 100 : 0;
    document.getElementById("strengthBar").style.width = percent + "%";
    document.getElementById("strengthLabel").textContent = !value ? "Enter a password" : score <= 2 ? "Needs improvement" : score <= 3 ? "Moderate" : "Strong";
    if (document.getElementById("passwordInput").value.length > 0) {
        document.getElementById("strengthDetails").innerHTML = checks.map(([ok, label]) => `<li ${ok ? "style=\"color: green\">" : "style=\"color: red\">"}${ok ? "✓" : "○"} ${label}</li>`).join("");
    } else {
        document.getElementById("strengthDetails").innerHTML = "<li style=\"color: var(--muted)\">Enter a password to see strength details.</li>";
    }
    if (value) {
        clearTimeout(window.passwordTimer);
        window.passwordTimer = setTimeout(() => {
        state.passwordChecks++;
        saveState();
        }, 700);
    }
}

function generatePassword() {
    const length = Number(document.getElementById("lengthRange").value);
    let chars = "abcdefghijklmnopqrstuvwxyz";
    if (document.getElementById("genUpper").checked) chars += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (document.getElementById("genNumbers").checked) chars += "0123456789";
    if (document.getElementById("genSymbols").checked) chars += "!@#$%^&*_-+=";

    let result = "";

    // 1. Create a typed array to hold a cryptographically secure random number for each character
    const randomValues = new Uint32Array(length);

    // 2. Fill the array with secure random numbers in one operation
    self.crypto.getRandomValues(randomValues);

    // 3. Map each secure random number down to your character set using modulo (%)
    for (let i = 0; i < length; i++) {
        result += chars[randomValues[i] % chars.length];
    }

    document.getElementById("generatedPassword").textContent = result;
}

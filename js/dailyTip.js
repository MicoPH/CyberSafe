
function renderTips() {
    document.getElementById("tipsGrid").innerHTML = tips.map(t => `<article class="tip-card"><div class="tip-icon">${t[0]}</div><h3>${t[1]}</h3><p>${t[2]}</p></article>`).join("");
}

renderTips();


const dailyTip = document.getElementById("dailyTip");
const dailyTipTitle = document.getElementById("dailyTipTitle");
const dailyTipPrev = document.getElementById("dailyTipPrev");
const dailyTipNext = document.getElementById("dailyTipNext");
const dailyTipDots = document.getElementById("dailyTipDots");

let dailyTipIndex = 0;
let dailyTipTimer;

function renderDailyTipDots() {
  dailyTipDots.replaceChildren();

  tips.forEach((tip, index) => {
    const dot = document.createElement("button");

    dot.type = "button";
    dot.className = "daily-tip-dot";
    dot.setAttribute("aria-label", `Show tip ${index + 1}`);

    dot.addEventListener("click", () => {
      dailyTipIndex = index;
      updateDailyTip();
      resetDailyTipTimer();
    });

    dailyTipDots.appendChild(dot);
  });
}

function updateDailyTip() {
  if (!tips.length) {
    dailyTip.textContent = "No safety tips available.";
    dailyTipPrev.disabled = true;
    dailyTipNext.disabled = true;
    return;
  }
  dailyTipTitle.textContent = tips[dailyTipIndex][1];
  dailyTip.textContent = tips[dailyTipIndex][2];

  // Restart entrance animation.
  dailyTip.style.animation = "none";
  void dailyTip.offsetWidth;
  dailyTip.style.animation = "";
  dailyTipTitle.style.animation = "none";
  void dailyTipTitle.offsetWidth;
  dailyTipTitle.style.animation = "";

  dailyTipDots.querySelectorAll("button").forEach((dot, index) => {
    dot.classList.toggle("active", index === dailyTipIndex);
    dot.setAttribute(
      "aria-current",
      index === dailyTipIndex ? "true" : "false"
    );
  });

  dailyTipPrev.disabled = dailyTipIndex === 0;
  dailyTipNext.disabled = dailyTipIndex === tips.length - 1;
}

function showRandomDailyTip() {
  if (tips.length < 2) return;

  let nextIndex;

  do {
    nextIndex = Math.floor(Math.random() * tips.length);
  } while (nextIndex === dailyTipIndex);

  dailyTipIndex = nextIndex;
  updateDailyTip();
}

function resetDailyTipTimer() {
  clearInterval(dailyTipTimer);

  dailyTipTimer = setInterval(showRandomDailyTip, 5000);
}

dailyTipPrev.addEventListener("click", () => {
  if (dailyTipIndex > 0) {
    dailyTipIndex--;
    updateDailyTip();
    resetDailyTipTimer();
  }
});

dailyTipNext.addEventListener("click", () => {
  if (dailyTipIndex < tips.length - 1) {
    dailyTipIndex++;
    updateDailyTip();
    resetDailyTipTimer();
  }
});

renderDailyTipDots();
updateDailyTip();
resetDailyTipTimer();

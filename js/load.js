
onUserDataLoaded = function initializeSignedInApp() {
    applyTheme(userPreferences.theme);
    applyGraphicsQuality(userPreferences.graphicsQuality);
    updateNavIcons();
    updateUI();
    renderResults();
};

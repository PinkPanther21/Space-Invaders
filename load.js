// Wait for the page to fully load
window.addEventListener('load', () => {
    // Simulate a loading delay for effect
    setTimeout(() => {
        // Hide the loading screen
        const loadingScreen = document.getElementById('loadingScreen');
        loadingScreen.style.display = 'none';

        // Display the main content and sidebar
        document.querySelector('.sidebar').style.display = 'block';
        document.querySelector('.main-content').style.display = 'block';

        // Enable scrolling
        document.body.style.overflow = 'auto';
    }, 2000); // Adjust time (ms) for loading effect
});
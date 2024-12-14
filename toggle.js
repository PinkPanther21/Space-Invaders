const menuToggle = document.querySelector('.menu-toggle');
const sidebar = document.querySelector('.sidebar');

// Add click event listener to the hamburger menu button
menuToggle.addEventListener('click', () => {
    sidebar.classList.toggle('show'); 
});

// Optionally close the sidebar 
document.addEventListener('click', (event) => {
    if (!sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
        sidebar.classList.remove('show'); 
    }
});

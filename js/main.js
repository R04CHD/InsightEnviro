/**
 * Insight Environmental Services - Main Navigation & UI Logic
 */

document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('#mobile-menu');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    // 1. Mobile Menu Toggle
    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            // Toggle the "X" animation on the hamburger bars
            menuToggle.classList.toggle('is-active');
            // Slide the menu in/out
            navLinks.classList.toggle('active');
            
            // Prevent body scroll when menu is open (Optional)
            if (navLinks.classList.contains('active')) {
                document.body.style.overflow = 'hidden';
            } else {
                document.body.style.overflow = 'initial';
            }
        });

        // Close menu when a link is clicked (important for single-page anchors)
        const navItems = document.querySelectorAll('.nav-links a');
        navItems.forEach(item => {
            item.addEventListener('click', () => {
                menuToggle.classList.remove('is-active');
                navLinks.classList.remove('active');
                document.body.style.overflow = 'initial';
            });
        });
    }

    // 2. Header Scroll Effect
    // Adds a shadow or changes background when user scrolls down
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
            header.style.transition = 'all 0.3s ease';
        } else {
            header.style.padding = '0.75rem 0';
        }
    });

    // 3. Current Year Auto-Update (Backup)
    // If you don't want to use the inline script in the footer, this handles it
    const yearSpan = document.querySelector('#current-year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
});
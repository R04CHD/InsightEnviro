/**
 * Insight Environmental - Multi-Step Questionnaire Logic
 * Modern Vanilla JS (ES6+)
 */
// Hamburger Menu Logic
const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');

menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    menuToggle.classList.toggle('is-active');
});

// Close menu when a link is clicked (useful for mobile UX)
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        menuToggle.classList.remove('is-active');
    });
});

document.addEventListener('DOMContentLoaded', () => {
    const form = document.querySelector('#questionnaire-form');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    const progress = document.querySelector('.progress-bar-fill');

    let currentStep = 0;

    // --- Update UI State ---
    const updateFormSteps = () => {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });
        
        // Update Progress Bar %
        const progressPercent = ((currentStep + 1) / steps.length) * 100;
        if (progress) progress.style.width = `${progressPercent}%`;
    };

    // --- Validation Logic ---
    const validateStep = () => {
        const activeStep = steps[currentStep];
        const inputs = activeStep.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                // Remove error class on focus
                input.oninput = () => input.classList.remove('error');
            }
        });

        return isValid;
    };

    // --- Navigation Events ---
    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep()) {
                currentStep++;
                updateFormSteps();
                window.scrollTo(0, 0); // Reset scroll for better UX
            } else {
                alert("Please fill in all required fields to proceed.");
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateFormSteps();
        });
    });

    // --- Final Submission ---
    form?.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData.entries());

        // Here you would typically use fetch() to send data to your backend
        console.log("Submitting to Insight Enviro CRM:", data);
        
        // Success Message UI
        form.innerHTML = `
            <div class="success-message">
                <h2>Request Received!</h2>
                <p>Thank you. An Insight Environmental consultant will review your site details and contact you within 24 hours.</p>
                <button onclick="location.reload()" class="btn-primary">Start New Request</button>
            </div>
        `;
    });
});
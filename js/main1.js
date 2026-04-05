/**
 * Insight Environmental - Multi-Step Questionnaire & Navigation Logic
 * Modern Vanilla JS (ES6+)
 */

document.addEventListener('DOMContentLoaded', () => {
    // --- 1. Navigation & Hamburger Logic ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('header');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('is-active');
        });

        document.querySelectorAll('.nav-links a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('is-active');
            });
        });
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.style.padding = '0.5rem 0';
        } else {
            header.style.padding = '0.75rem 0';
        }
    });


    // --- 2. Multi-Step Questionnaire Logic ---
    const form = document.querySelector('#questionnaire-form');
    const steps = Array.from(document.querySelectorAll('.form-step'));
    const nextBtns = document.querySelectorAll('.btn-next');
    const prevBtns = document.querySelectorAll('.btn-prev');
    const progress = document.querySelector('.progress-bar-fill');

    let currentStep = 0;

    const updateFormSteps = () => {
        steps.forEach((step, index) => {
            step.classList.toggle('active', index === currentStep);
        });
        
        const progressPercent = ((currentStep + 1) / steps.length) * 100;
        if (progress) progress.style.width = `${progressPercent}%`;
    };

    const validateStep = () => {
        const activeStep = steps[currentStep];
        const inputs = activeStep.querySelectorAll('input[required], select[required], textarea[required]');
        let isValid = true;

        inputs.forEach(input => {
            if (!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
                input.oninput = () => input.classList.remove('error');
            }
        });

        return isValid;
    };

    nextBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            if (validateStep()) {
                currentStep++;
                updateFormSteps();
                form.scrollIntoView({ behavior: 'smooth' }); 
            } else {
                alert("Please fill in all required fields to proceed.");
            }
        });
    });

    prevBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            currentStep--;
            updateFormSteps();
            form.scrollIntoView({ behavior: 'smooth' });
        });
    });


    // --- 3. Final Submission with Formspree & Honeypot ---
    form?.addEventListener('submit', async (e) => {
        e.preventDefault();

        // Honeypot Check
        const hpValue = document.querySelector('#last_name_verification')?.value;
        if (hpValue && hpValue !== "") {
            console.warn("Spam Bot Detected.");
            showSuccessUI();
            return;
        }
        
        // Prepare data for Formspree
        const formData = new FormData(form);

        try {
            const response = await fetch(form.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            });

            if (response.ok) {
                // Success: Formspree accepted the data
                console.log("Submission successful.");
                showSuccessUI();
            } else {
                // Error: Formspree returned an error
                const errorData = await response.json();
                console.error("Formspree Error:", errorData);
                alert("There was a problem with your submission. Please try again or contact us directly.");
            }
        } catch (error) {
            // Network or Fetch error
            console.error("Submission failed:", error);
            alert("Network error. Please check your connection and try again.");
        }
    });

    // Helper to display success state
    function showSuccessUI() {
        form.innerHTML = `
            <div class="success-message" style="text-align: center; padding: 40px; animation: fadeIn 0.5s ease;">
                <h2 style="color: var(--primary-color);">Request Received!</h2>
                <p>Thank you. An Insight Environmental consultant will review your site details and contact you within 24 hours.</p>
                <button onclick="location.reload()" class="btn-primary" style="margin-top: 20px;">Start New Request</button>
            </div>
        `;
    }
});

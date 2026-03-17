function openVideo() {
    document.getElementById("videoModal").style.display = "flex";
}

function closeVideo() {
    document.getElementById("videoModal").style.display = "none";
}

// Scroll Reveal
const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
    reveals.forEach(el => {
        const windowHeight = window.innerHeight;
        const revealTop = el.getBoundingClientRect().top;

        if (revealTop < windowHeight - 100) {
            el.classList.add("active");
        }
    });
});

// Parallax Glow Movement
document.addEventListener("mousemove", (e) => {
    if (window.innerWidth <= 992) return;

    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;

    const heroImage = document.querySelector(".hero-image-wrapper");
    if (!heroImage) return;

    heroImage.style.transform = `translate(${x}px, ${y}px)`;
});

window.addEventListener("scroll", () => {
    document.querySelector(".glass-navbar")
        .classList.toggle("scrolled", window.scrollY > 10);
});

// Contact Form (AJAX submit to avoid full-page redirect)
const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        const submitBtn = contactForm.querySelector(".contact-submit-btn");
        const formData = new FormData(contactForm);

        submitBtn.disabled = true;
        submitBtn.textContent = "Sending...";
        formStatus.textContent = "Sending your message...";
        formStatus.className = "form-status";

        try {
            const response = await fetch("https://formsubmit.co/ajax/vedantsingh.meet@gmail.com", {
                method: "POST",
                body: formData,
                headers: {
                    Accept: "application/json"
                }
            });

            if (!response.ok) {
                throw new Error("Request failed");
            }

            const result = await response.json();
            if (!result.success) {
                throw new Error(result.message || "Submission not accepted");
            }

            formStatus.textContent = "Message sent successfully.";
            formStatus.className = "form-status success";
            contactForm.reset();
        } catch (error) {
            formStatus.textContent = error.message || "Could not send message. Please try again.";
            formStatus.className = "form-status error";
        } finally {
            submitBtn.disabled = false;
            submitBtn.textContent = "Send";
        }
    });
}


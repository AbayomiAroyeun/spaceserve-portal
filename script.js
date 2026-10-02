document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetElement = document.querySelector(this.getAttribute('href'));
        if (targetElement) {
            targetElement.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Dynamic Intermittent Slideshow Control Loop Logic
document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider-container');
    
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        let currentSlideIndex = 0;
        const totalSlides = slides.length;

        // Swaps active state items every 3.5 seconds
        setInterval(() => {
            slides[currentSlideIndex].classList.remove('active');
            currentSlideIndex = (currentSlideIndex + 1) % totalSlides;
            slides[currentSlideIndex].classList.add('active');
        }, 3500);
    });

    // Sync individual card triggers with dropdown select input fields
    const triggers = document.querySelectorAll('.waitlist-trigger');
    const selectDropdown = document.getElementById('platformSelect');

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function() {
            const targetApp = this.getAttribute('data-app');
            if (selectDropdown) {
                // Instantly changes form context select choice matching whatever button user clicked
                for (let option of selectDropdown.options) {
                    if (option.value === targetApp) {
                        selectDropdown.value = targetApp;
                        break;
                    }
                }
            }
        });
    });
});

// Toggle the contact dropdown menu cleanly on smartphones
const dropdownBtn = document.getElementById('contactDropdownBtn');
if (dropdownBtn) {
    dropdownBtn.addEventListener('click', function(e) {
        if (window.innerWidth <= 768) {
            e.preventDefault(); // Prevents jump triggers on small screens
            this.parentElement.classList.toggle('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    const sliders = document.querySelectorAll('.slider-container');
    
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        let currentSlideIndex = 0;
        const totalSlides = slides.length;

        if (totalSlides <= 1) return; // No need to loop if there's only 1 image

        setInterval(() => {
            // Remove the 'active' class from the current visible car slide
            slides[currentSlideIndex].classList.remove('active');
            
            // RANDOMIZER LOGIC: Pick a new random index that isn't the current one
            let newSlideIndex = currentSlideIndex;
            while (newSlideIndex === currentSlideIndex) {
                newSlideIndex = Math.floor(Math.random() * totalSlides);
            }
            
            currentSlideIndex = newSlideIndex;
            
            // Add the 'active' class to reveal the newly picked random car slide
            slides[currentSlideIndex].classList.add('active');
        }, 3500); // Changes image every 3.5 seconds
    });
});
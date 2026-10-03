document.addEventListener('DOMContentLoaded', () => {

    // ==========================================================================
    // 1. Smooth Scroll Navigation Anchors
    // ==========================================================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetElement = document.querySelector(this.getAttribute('href'));
            if (targetElement) {
                targetElement.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // ==========================================================================
    // 2. Randomized Dynamic Slideshow Control Loop
    // ==========================================================================
    const sliders = document.querySelectorAll('.slider-container');
    sliders.forEach(slider => {
        const slides = slider.querySelectorAll('.slide');
        let currentSlideIndex = 0;
        const totalSlides = slides.length;

        if (totalSlides <= 1) return; // Terminate early if only 1 image asset exists

        setInterval(() => {
            // Un-set active class from the current visible frame
            slides[currentSlideIndex].classList.remove('active');

            // Randomizer Engine: Selects an alternate random index safely
            let newSlideIndex = currentSlideIndex;
            while (newSlideIndex === currentSlideIndex) {
                newSlideIndex = Math.floor(Math.random() * totalSlides);
            }

            currentSlideIndex = newSlideIndex;
            slides[currentSlideIndex].classList.add('active');
        }, 3500); // Transitions to a randomized frame every 3.5 seconds
    });

    // ==========================================================================
    // 3. Waitlist Form Synchronizer (Updated to match 'platform-choice')
    // ==========================================================================
    const triggers = document.querySelectorAll('.waitlist-trigger');
    const selectDropdown = document.getElementById('platform-choice'); // Patched ID selector mismatch

    triggers.forEach(trigger => {
        trigger.addEventListener('click', function () {
            const targetApp = this.getAttribute('data-app');
            if (selectDropdown) {
                for (let option of selectDropdown.options) {
                    if (option.value === targetApp) {
                        selectDropdown.value = targetApp;
                        break;
                    }
                }
            }
        });
    });

    // ==========================================================================
    // 4. Mobile Dropdown Toggle Engine (Safe inside DOM Lifecycle)
    // ==========================================================================
    const dropdownContainer = document.getElementById('dropdownContainer');
    const dropdownBtn = document.getElementById('contactDropdownBtn');

    if (dropdownBtn && dropdownContainer) {
        const handleDropdownToggle = function (e) {
            // Enforce behavior constraints on small layouts
            if (window.innerWidth <= 768) {
                e.preventDefault();
                e.stopPropagation(); // Stops immediate document event delegation bubbles
                dropdownContainer.classList.toggle('active');
            }
        };

        // Standard click fallback
        dropdownBtn.addEventListener('click', handleDropdownToggle);
        // Direct touch start listener to optimize latency profiles on iOS & Android WebKit
        dropdownBtn.addEventListener('touchstart', handleDropdownToggle, { passive: false });
    }

    // ==========================================================================
    // 5. Mobile Hamburger Navigation Menu Drawer Open / Close Logic
    // ==========================================================================
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const navLinksMenu = document.getElementById('navLinksMenu');
    const navItemLinks = document.querySelectorAll('.nav-item-link');

    if (mobileMenuBtn && navLinksMenu) {
        // Toggle mobile menu drawer visibility state
        mobileMenuBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            navLinksMenu.classList.toggle('drawer-open');
            mobileMenuBtn.innerHTML = navLinksMenu.classList.contains('drawer-open') ? '✕' : '☰';
        });

        // Close the navigation drawer cleanly when any text link is tapped
        navItemLinks.forEach(link => {
            link.addEventListener('click', () => {
                navLinksMenu.classList.remove('drawer-open');
                mobileMenuBtn.innerHTML = '☰';
            });
        });
    }

    // ==========================================================================
    // 6. Unified Global Dismissal Event Engine (Fixes Tapping Conflicts)
    // ==========================================================================
    const closeAllMenusOnOutsideTap = (e) => {
        // Dismiss "Our Office" Dropdown if clicked outside it
        if (dropdownContainer && !dropdownContainer.contains(e.target)) {
            dropdownContainer.classList.remove('active');
        }

        // Dismiss Mobile Hamburger Menu if clicked outside it
        if (navLinksMenu && mobileMenuBtn && !navLinksMenu.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
            navLinksMenu.classList.remove('drawer-open');
            mobileMenuBtn.innerHTML = '☰';
        }
    };

    document.addEventListener('click', closeAllMenusOnOutsideTap);
    document.addEventListener('touchstart', closeAllMenusOnOutsideTap, { passive: true });

    // ==========================================================================
    // 7. Victoria Avatar Lightbox Zoom Viewer Logic (Touch Event Patch)
    // ==========================================================================
    const supportAvatar = document.querySelector('.nav-avatar'); // Targets Victoria thumbnail
    const imageModal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');

    if (supportAvatar && imageModal && modalImg) {

        // Mobile-Optimized Instant Tap & Click Overlay Routine
        const openLightbox = (e) => {
            e.preventDefault(); // Blocks default system tap processing delays
            e.stopPropagation(); // Prevents the WhatsApp contact dropdown menu from clicking open behind it

            modalImg.src = supportAvatar.src; // Pulls victoria.png image file path
            imageModal.style.display = 'flex';

            // Triggers a hardware-accelerated fluid zoom pop effect frame
            setTimeout(() => {
                modalImg.style.transform = 'scale(1)';
            }, 20);
        };

        // Bind standard laptop mouse actions
        supportAvatar.addEventListener('click', openLightbox);
        // Bind instant mobile phone touch interactions
        supportAvatar.addEventListener('touchstart', openLightbox, { passive: false });

        // Laptop/Phone Dismissal Logic
        const closeLightbox = (e) => {
            e.preventDefault();
            modalImg.style.transform = 'scale(0.9)';
            imageModal.style.display = 'none';
        };

        imageModal.addEventListener('click', closeLightbox);
        imageModal.addEventListener('touchstart', closeLightbox, { passive: true });
    }

});

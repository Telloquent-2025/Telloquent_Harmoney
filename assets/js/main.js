document.addEventListener('DOMContentLoaded', function () {
    // Mobile Menu Toggle
    const sidebarBtn = document.getElementById('sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.querySelector('.btn-slideClose');

    if (sidebarBtn && sidebar && overlay) {
        // Open sidebar
        sidebarBtn.addEventListener('click', function () {
            sidebar.classList.add('open');
            overlay.classList.add('active');
            document.body.style.overflow = 'hidden';

            // Initialize all dropdowns to closed state
            closeAllDropdowns();
        });

        // Close sidebar
        function closeSidebar() {
            sidebar.classList.remove('open');
            overlay.classList.remove('active');
            document.body.style.overflow = '';

            // Close all dropdowns when closing sidebar
            closeAllDropdowns();
        }

        // Close button
        if (closeBtn) {
            closeBtn.addEventListener('click', closeSidebar);
        }

        // Overlay click to close
        overlay.addEventListener('click', closeSidebar);

        // Close on escape key
        document.addEventListener('keydown', function (e) {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });
    }

    // Initialize Bootstrap tabs for desktop
    document.addEventListener('DOMContentLoaded', function () {
        var tabTriggers = [].slice.call(document.querySelectorAll('#myTab a'))
        tabTriggers.forEach(function (tabTriggerEl) {
            tabTriggerEl.addEventListener('click', function (event) {
                event.preventDefault()
                var tabTarget = this.getAttribute('href')
                var bsTab = new bootstrap.Tab(this)
                bsTab.show()
            })
        })

        // Custom carousel functionality with 2-second interval
        var carousel = document.getElementById('harmonyCarousel');
        if (carousel) {
            // Initialize carousel with 2000ms (2 seconds) interval
            var carouselInstance = new bootstrap.Carousel(carousel, {
                interval: 2000, // Changed from 5000 to 2000 for 2-second interval
                wrap: true,
                touch: true
            });

            // Add click functionality to custom indicators
            var indicators = document.querySelectorAll('.custom-carousel-indicators button');
            indicators.forEach(function (indicator, index) {
                indicator.addEventListener('click', function () {
                    carouselInstance.to(index);
                    updateActiveIndicator(index);
                });
            });

            // Update active indicator when slide changes
            carousel.addEventListener('slid.bs.carousel', function (event) {
                var activeIndex = event.to;
                updateActiveIndicator(activeIndex);
            });

            // Function to update active indicator
            function updateActiveIndicator(activeIndex) {
                indicators.forEach(function (indicator, index) {
                    if (index === activeIndex) {
                        indicator.classList.add('active');
                    } else {
                        indicator.classList.remove('active');
                    }
                });
            }

            // Pause carousel when user hovers over it
            carousel.addEventListener('mouseenter', function () {
                carouselInstance.pause();
            });

            // Resume carousel when user leaves
            carousel.addEventListener('mouseleave', function () {
                carouselInstance.cycle();
            });
        }
    });



    // Mobile Dropdown Functionality
    const mobileDropdowns = document.querySelectorAll('.mobile-dropdown .has-dropdown');
    const mobileLoginToggle = document.querySelector('.mobile-login-toggle');

    // Function to close all dropdowns
    function closeAllDropdowns() {
        // Close main dropdowns
        mobileDropdowns.forEach(toggle => {
            const dropdown = toggle.closest('.mobile-dropdown');
            const icon = toggle.querySelector('.dropdown-icon');

            dropdown.classList.remove('active');
            if (icon) {
                icon.style.transform = 'rotate(0deg)';
            }
        });

        // Close login dropdown
        if (mobileLoginToggle) {
            const loginContainer = mobileLoginToggle.closest('.mobile-login-container');
            const loginIcon = mobileLoginToggle.querySelector('.login-dropdown-icon');

            loginContainer.classList.remove('active');
            if (loginIcon) {
                loginIcon.style.transform = 'rotate(0deg)';
            }
        }
    }

    // Handle main dropdowns (Our Story, Resources)
    mobileDropdowns.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const dropdown = this.closest('.mobile-dropdown');
            const icon = this.querySelector('.dropdown-icon');

            // Check if current dropdown is already active
            const isActive = dropdown.classList.contains('active');

            // Close all dropdowns first
            closeAllDropdowns();

            // Toggle current dropdown
            if (!isActive) {
                dropdown.classList.add('active');
                if (icon) {
                    icon.style.transform = 'rotate(180deg)';
                }
            }
        });
    });

    // Handle login dropdown
    if (mobileLoginToggle) {
        mobileLoginToggle.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            const loginContainer = this.closest('.mobile-login-container');
            const loginIcon = this.querySelector('.login-dropdown-icon');

            // Check if login dropdown is already active
            const isActive = loginContainer.classList.contains('active');

            // Close all dropdowns first
            closeAllDropdowns();

            // Toggle login dropdown
            if (!isActive) {
                loginContainer.classList.add('active');
                if (loginIcon) {
                    loginIcon.style.transform = 'rotate(180deg)';
                }
            }
        });
    }

    // Close dropdowns when clicking outside
    document.addEventListener('click', function (e) {
        if (sidebar.classList.contains('open') &&
            !e.target.closest('.mobile-dropdown') &&
            !e.target.closest('.mobile-login-container') &&
            !e.target.closest('#sidebar-btn')) {
            closeAllDropdowns();
        }
    });

    // Close dropdowns when clicking on a link inside dropdown
    document.querySelectorAll('.mobile-dropdown-menu a, .mobile-login-dropdown a').forEach(link => {
        link.addEventListener('click', function () {
            closeSidebar();
        });
    });

    // Close all dropdowns when window is resized
    window.addEventListener('resize', function () {
        if (window.innerWidth <= 576 && sidebar.classList.contains('open')) {
            closeAllDropdowns();
        }
    });
});




// Mobile footer accordion functionality
document.addEventListener('DOMContentLoaded', function () {
    const sidebarMenus = document.querySelectorAll('.sidebar-menu');

    sidebarMenus.forEach(menu => {
        menu.addEventListener('click', function () {
            // Toggle active class on the menu
            this.classList.toggle('active');

            // Get the next element (sub-menu)
            const subMenu = this.nextElementSibling;

            // Toggle active class on sub-menu
            subMenu.classList.toggle('active');

            // Close other open menus
            sidebarMenus.forEach(otherMenu => {
                if (otherMenu !== this && otherMenu.classList.contains('active')) {
                    otherMenu.classList.remove('active');
                    otherMenu.nextElementSibling.classList.remove('active');
                }
            });
        });
    });
});





// Simple scroll animation for principle rows
document.addEventListener('DOMContentLoaded', function () {
    const principleRows = document.querySelectorAll('.principle-row');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    principleRows.forEach(row => {
        observer.observe(row);
    });
});





// Simple animation for service cards
document.addEventListener('DOMContentLoaded', function () {
    const serviceCards = document.querySelectorAll('.service-card');
    const specializedItems = document.querySelectorAll('.specialized-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    serviceCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    specializedItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateX(-20px)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
});




// Animation for strategy cards
document.addEventListener('DOMContentLoaded', function () {
    const strategyCards = document.querySelectorAll('.strategy-card');
    const serviceCategories = document.querySelectorAll('.service-category');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    strategyCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    serviceCategories.forEach(category => {
        category.style.opacity = '0';
        category.style.transform = 'translateY(30px)';
        category.style.transition = 'all 0.6s ease';
        observer.observe(category);
    });
});



// Animation for team cards
document.addEventListener('DOMContentLoaded', function () {
    const teamCards = document.querySelectorAll('.team-card');
    const statItems = document.querySelectorAll('.stat-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    teamCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    statItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'scale(0.8)';
        item.style.transition = 'all 0.6s ease';
        observer.observe(item);
    });
});



// FAQ Accordion functionality
document.addEventListener('DOMContentLoaded', function () {
    const faqHeaders = document.querySelectorAll('.faq-header');

    faqHeaders.forEach(header => {
        header.addEventListener('click', function () {
            const faqCard = this.parentElement;
            const isActive = faqCard.classList.contains('active');

            // Close all other FAQ cards
            document.querySelectorAll('.faq-card').forEach(card => {
                card.classList.remove('active');
            });

            // Toggle current card if it wasn't active
            if (!isActive) {
                faqCard.classList.add('active');
            }
        });
    });

    // Open first FAQ by default
    if (faqHeaders.length > 0) {
        faqHeaders[0].parentElement.classList.add('active');
    }

    // Animation for option cards
    const optionCards = document.querySelectorAll('.option-card');
    const processSteps = document.querySelectorAll('.process-step');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    optionCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    processSteps.forEach(step => {
        step.style.opacity = '0';
        step.style.transform = 'translateX(-20px)';
        step.style.transition = 'all 0.6s ease';
        observer.observe(step);
    });
});


// Table of Contents active state
document.addEventListener('DOMContentLoaded', function () {
    const tocLinks = document.querySelectorAll('.toc-link');
    const policySections = document.querySelectorAll('.policy-section');

    // Update active TOC link on scroll
    function updateActiveTocLink() {
        let currentSection = '';

        policySections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            if (window.scrollY >= sectionTop) {
                currentSection = section.getAttribute('id');
            }
        });

        tocLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSection}`) {
                link.classList.add('active');
            }
        });
    }

    // Smooth scroll for TOC links
    tocLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        });
    });

    // Add scroll event listener
    window.addEventListener('scroll', updateActiveTocLink);

    // Initialize active state
    updateActiveTocLink();

    // Animation for policy sections
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    policySections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease';
        observer.observe(section);
    });
});


// Animation for newsletter content
document.addEventListener('DOMContentLoaded', function () {
    console.log('Newsletter content loaded');

    // Simple animation for metric tiles on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe metric tiles
    document.querySelectorAll('.metric-tile').forEach(tile => {
        tile.style.opacity = '0';
        tile.style.transform = 'translateY(20px)';
        tile.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(tile);
    });

    // Observe info panels
    document.querySelectorAll('.info-panel').forEach(panel => {
        panel.style.opacity = '0';
        panel.style.transform = 'translateY(20px)';
        panel.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(panel);
    });
});












// PDF download tracking with auto download
const downloadLinks = document.querySelectorAll('.download-link');
downloadLinks.forEach(link => {
    link.addEventListener('click', function (e) {
        const fileName = this.getAttribute('download');
        console.log('Auto download initiated:', fileName);

        // For maximum compatibility
        if (!this.getAttribute('download')) {
            e.preventDefault();
            const fileUrl = this.getAttribute('href');
            const downloadAnchor = document.createElement('a');
            downloadAnchor.href = fileUrl;
            downloadAnchor.download = fileName || 'document.pdf';
            downloadAnchor.style.display = 'none';
            document.body.appendChild(downloadAnchor);
            downloadAnchor.click();
            document.body.removeChild(downloadAnchor);
        }
    });
});



// Animation for careers page elements
document.addEventListener('DOMContentLoaded', function () {
    const jobCards = document.querySelectorAll('.job-card');
    const benefitCards = document.querySelectorAll('.benefit-card');
    const processSteps = document.querySelectorAll('.process-step');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1
    });

    jobCards.forEach(card => {
        observer.observe(card);
    });

    benefitCards.forEach(card => {
        observer.observe(card);
    });

    processSteps.forEach(step => {
        observer.observe(step);
    });

    // Form submission handling
    const careerForm = document.querySelector('.careers-form');
    if (careerForm) {
        careerForm.addEventListener('submit', function (e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your application! We will get back to you soon.');
            this.reset();
        });
    }

    // Smooth scroll for apply buttons
    const applyButtons = document.querySelectorAll('a[href="#apply-form"]');
    applyButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
});









// Enhanced hover functionality for nested dropdowns
document.addEventListener('DOMContentLoaded', function () {
    let hoverTimeout;
    const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');

    dropdownSubmenus.forEach(submenu => {
        const nestedDropdown = submenu.querySelector('.nested-dropdown');

        submenu.addEventListener('mouseenter', function () {
            clearTimeout(hoverTimeout);
            if (nestedDropdown) {
                nestedDropdown.style.display = 'block';
                // Force reflow to ensure proper positioning
                nestedDropdown.offsetHeight;
                nestedDropdown.style.opacity = '1';
                nestedDropdown.style.transform = 'translateY(0)';
            }
        });

        submenu.addEventListener('mouseleave', function (e) {
            const relatedTarget = e.relatedTarget;

            // Check if mouse is moving to nested dropdown or another menu item
            if (!nestedDropdown || !nestedDropdown.contains(relatedTarget)) {
                hoverTimeout = setTimeout(() => {
                    if (nestedDropdown) {
                        nestedDropdown.style.opacity = '0';
                        nestedDropdown.style.transform = 'translateY(-10px)';
                        setTimeout(() => {
                            if (nestedDropdown.style.opacity === '0') {
                                nestedDropdown.style.display = 'none';
                            }
                        }, 300);
                    }
                }, 150); // Small delay to allow moving between items
            }
        });
    });

    // Keep nested dropdown open when hovering over it
    const nestedDropdowns = document.querySelectorAll('.nested-dropdown');
    nestedDropdowns.forEach(dropdown => {
        dropdown.addEventListener('mouseenter', function () {
            clearTimeout(hoverTimeout);
            this.style.display = 'block';
            this.style.opacity = '1';
            this.style.transform = 'translateY(0)';
        });

        dropdown.addEventListener('mouseleave', function (e) {
            const relatedTarget = e.relatedTarget;

            // Check if mouse is moving to parent menu item
            if (!this.parentElement.contains(relatedTarget)) {
                hoverTimeout = setTimeout(() => {
                    this.style.opacity = '0';
                    this.style.transform = 'translateY(-10px)';
                    setTimeout(() => {
                        if (this.style.opacity === '0') {
                            this.style.display = 'none';
                        }
                    }, 300);
                }, 150);
            }
        });
    });

    // Mobile menu functionality
    const sidebarBtn = document.getElementById('sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.querySelector('.btn-slideClose');

    if (sidebarBtn && sidebar && overlay && closeBtn) {
        sidebarBtn.addEventListener('click', function () {
            sidebar.classList.add('active');
            overlay.classList.add('active');
        });

        closeBtn.addEventListener('click', function () {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });

        overlay.addEventListener('click', function () {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
        });
    }

    // Mobile submenu toggle
    const menuToggles = document.querySelectorAll('.menu-toggle');
    menuToggles.forEach(toggle => {
        toggle.addEventListener('click', function (e) {
            e.preventDefault();
            const parent = this.parentElement;
            parent.classList.toggle('active');
        });
    });

    // PDF download tracking
    const downloadLinks = document.querySelectorAll('.download-link');
    downloadLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            const fileName = this.getAttribute('download');
            console.log('Download initiated:', fileName);
            // You can add analytics tracking here
        });
    });

    // Prevent Bootstrap click behavior for dropdown on desktop
    if (window.innerWidth > 768) {
        const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
        dropdownToggles.forEach(toggle => {
            toggle.setAttribute('data-bs-toggle', '');
        });
    }
});



// testimonial css 
document.addEventListener('DOMContentLoaded', function () {
    const marqueeTrack = document.getElementById('marqueeTrack');
    const pauseBtn = document.getElementById('pauseBtn');
    const playBtn = document.getElementById('playBtn');
    const speedBtns = document.querySelectorAll('.speed-btn');

    // Testimonials data
    const testimonials = [
        {
            id: 1,
            quote: "We are using the Financial Planning services for the last 16 years and are richly benefited.",
            name: "Praveena Seethuraman",
            // position: "President, All India Gynaecologists Association",
            initials: "PS"
        },
        {
            id: 2,
            quote: "I can vouch for the significant improvement in the quality of my balance sheet to M/s Harmoney. They are known to me for the past 20 years",
            name: "P J Ashokkumar ",
            // position: "Cinetekk, Sale distributors in India for JBL professional DTX - Dolby - Digital theatre systems",
            initials: "PJ"
        },
        {
            id: 3,
            quote: "Earned money become wealth only when it is invested and managed rightly by right hands! It is a biggest task.  Harmony is awesome in that!",
            name: "PARAMAN PACHAIMUTHU ",
            // position: "Managing Director, Ram Vijay Biotech (P) Ltd.",
            initials: "PP"
        },
        {
            id: 4,
            quote: "Many a times I have admired the way in which they understand my family's need and provide solutions in a very calm and pleasant manner. ",
            name: " GEETA KESHAVAN ",
            // position: "Managing Director, Magna Chemical Manufacturers (P) Ltd.",
            initials: "GK"
        },
        {
            id: 5,
            quote: " I am benefited by their financial plan. I adopt for enhancing my wealth.",
            name: "Rajasekaran Chandrasekaran",
            // position: "Vinbro & Co.",
            initials: "RC"
        },
        {
            id: 6,
            quote: "Their financial diagnosis is their strength.",
            name: " Dr Madhukumar ",
            // position: "Managing Director, NuTech Rubbers",
            initials: "MK"
        },
        {
            id: 7,
            quote: " Financial & Investment management services is provided with thorough foresight professionalism.",
            name: "Chenthamarai Venkatachalam",
            // position: "Managing Director, Rolapack & company",
            initials: "CV"
        },
        {
            id: 8,
            quote: "Sincerity, confidence, delivering results: I find these best qualities in them.",
            name: "Nagendra Narasimhamurthy",
            // position: "Poet & Writer (Retd D.E.O)",
            initials: "NN"
        },

    ];

    // Function to create testimonial card HTML  <p>${testimonial.position}</p>
    function createTestimonialCard(testimonial) {
        return `
                    <div class="testimonial-card" data-id="${testimonial.id}">
                        <div class="quote-icon">
                            <i class="fas fa-quote-left"></i>
                        </div>
                        <p class="quote-text">${testimonial.quote}</p>
                        <div class="client-info">
                            <div class="client-avatar">${testimonial.initials}</div>
                            <div class="client-details">
                                <h3>${testimonial.name}</h3>
                               
                                <div class="rating">
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                    <i class="fas fa-star"></i>
                                </div>
                            </div>
                        </div>
                    </div>
                `;
    }

    // Populate marquee with testimonials (duplicated for seamless loop)
    let testimonialsHTML = '';

    // Duplicate testimonials to ensure seamless scrolling
    for (let i = 0; i < 3; i++) {
        testimonials.forEach(testimonial => {
            testimonialsHTML += createTestimonialCard(testimonial);
        });
    }

    marqueeTrack.innerHTML = testimonialsHTML;

    // Set initial animation speed
    let animationSpeed = 60; // seconds for one full cycle
    marqueeTrack.style.animationDuration = `${animationSpeed}s`;

    // Pause/Play functionality
    pauseBtn.addEventListener('click', function () {
        marqueeTrack.style.animationPlayState = 'paused';
        pauseBtn.classList.add('active');
        playBtn.classList.remove('active');
    });

    playBtn.addEventListener('click', function () {
        marqueeTrack.style.animationPlayState = 'running';
        playBtn.classList.add('active');
        pauseBtn.classList.remove('active');
    });

    // Set play as active by default
    playBtn.classList.add('active');

    // Speed controls
    speedBtns.forEach(btn => {
        btn.addEventListener('click', function () {
            const speed = parseInt(this.getAttribute('data-speed'));
            animationSpeed = speed;
            marqueeTrack.style.animationDuration = `${speed}s`;

            // Update active state
            speedBtns.forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Reset animation when it ends to create seamless loop
    marqueeTrack.addEventListener('animationiteration', () => {
        // This ensures the animation continues seamlessly
    });

    // Pause on hover (already handled in CSS)
    // But we can also add a visual indicator
    const cards = document.querySelectorAll('.testimonial-card');
    cards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            card.style.boxShadow = '0 20px 40px rgba(0, 0, 0, 0.15)';
        });

        card.addEventListener('mouseleave', () => {
            card.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.05)';
        });
    });

});


// count animation 
document.addEventListener('DOMContentLoaded', function () {
    // Target values for counters
    const counterValues = [32, 400, 500, 2000];
    const counterElements = document.querySelectorAll('.counterNo');
    let animationStarted = false;

    // Function to animate counting
    function animateCounter(element, targetValue) {
        const duration = 2000; // 2 seconds
        const frameDuration = 1000 / 60; // 60fps
        const totalFrames = Math.round(duration / frameDuration);
        let frame = 0;

        const counter = setInterval(() => {
            frame++;
            const progress = frame / totalFrames;
            const currentValue = Math.round(targetValue * progress);

            element.textContent = currentValue;

            if (frame === totalFrames) {
                clearInterval(counter);
                element.textContent = targetValue + "+";
            }
        }, frameDuration);
    }

    // Function to check if element is in viewport
    function isInViewport(element) {
        const rect = element.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to start animation when counters are visible
    function checkAndStartAnimation() {
        const counterSection = document.querySelector('.counter-outer-container');

        if (isInViewport(counterSection) && !animationStarted) {
            animationStarted = true;

            // Start each counter animation
            counterElements.forEach((element, index) => {
                setTimeout(() => {
                    animateCounter(element, counterValues[index]);
                }, index * 300); // Stagger animations
            });

            // Remove scroll listener after animation starts
            window.removeEventListener('scroll', checkAndStartAnimation);
        }
    }

    // Start animation immediately if already in viewport
    setTimeout(checkAndStartAnimation, 500);

    // Add scroll listener to trigger animation
    window.addEventListener('scroll', checkAndStartAnimation);

    // Also trigger on resize
    window.addEventListener('resize', checkAndStartAnimation);

    // If user resizes or scrolls, check again
    window.addEventListener('scroll', checkAndStartAnimation);
});



// awardss
document.addEventListener('DOMContentLoaded', function () {
    // Get modal elements
    const modal = document.getElementById('certificateModal');
    const modalImage = document.getElementById('modalImage');
    const modalTitle = document.getElementById('modalTitle');
    const modalClose = document.getElementById('modalClose');
    const modalBody = document.querySelector('.modal-body');

    // Get all view certificate buttons
    const viewButtons = document.querySelectorAll('.view-certificate');

    // Add click event to each view certificate button
    viewButtons.forEach(button => {
        button.addEventListener('click', function (e) {
            e.preventDefault();
            e.stopPropagation();

            // Get image source and title from data attributes
            const imageSrc = this.getAttribute('data-image');
            const imageTitle = this.getAttribute('data-title');

            // Set modal content
            modalImage.src = imageSrc;
            modalImage.alt = imageTitle;
            modalTitle.textContent = imageTitle;

            // Remove any existing classes
            modalImage.classList.remove('tall-image');

            // Check if this is the last image (Family Physicians Association)
            if (imageSrc.includes('family physician assocation awareness on fp_page-0001.jpg')) {
                modalImage.classList.add('tall-image');
                modalBody.style.alignItems = 'flex-start';
                modalBody.style.justifyContent = 'flex-start';
            } else {
                modalBody.style.alignItems = 'center';
                modalBody.style.justifyContent = 'center';
            }

            // Show modal
            modal.classList.add('active');
            document.body.classList.add('modal-open');

            // Add loading state
            modalImage.style.opacity = '0';
            modalImage.onload = function () {
                modalImage.style.opacity = '1';
                modalImage.style.transition = 'opacity 0.3s ease';

                // Scroll to top of modal body
                modalBody.scrollTop = 0;
            };
        });
    });

    // Close modal when close button is clicked
    modalClose.addEventListener('click', function () {
        closeModal();
    });

    // Close modal when clicking outside the image
    modal.addEventListener('click', function (e) {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });

    // Close modal with Escape key
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        modalImage.style.opacity = '0';
    }
});









// Optional JavaScript for better mobile interaction
document.addEventListener('DOMContentLoaded', function () {
    // Add touch feedback for mobile
    const touchElements = document.querySelectorAll('.doc-item, .quicklink, .additional-doc, .scores-btn, .odr-btn, .evoting-btn');

    touchElements.forEach(element => {
        element.addEventListener('touchstart', function () {
            this.style.transition = 'transform 0.1s ease';
            this.style.transform = 'scale(0.98)';
        });

        element.addEventListener('touchend', function () {
            this.style.transform = 'scale(1)';
        });
    });

    // Improve long tap on mobile
    touchElements.forEach(element => {
        element.addEventListener('contextmenu', function (e) {
            e.preventDefault();
        });
    });
});








// /* ================= DEVICE DETECTION ================= */
// const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

// /* ================= ACCESSIBILITY PANEL ================= */
// function openAccessibilityPanel() {
//     document.getElementById("accessibilityPanel")?.classList.add("open");
// }
// function closeAccessibilityPanel() {
//     document.getElementById("accessibilityPanel")?.classList.remove("open");
// }

// /* ================= LOCAL STORAGE HELPERS ================= */
// function saveA11y(key, value) {
//     localStorage.setItem(key, JSON.stringify(value));
// }
// function getA11y(key, defaultVal) {
//     const val = localStorage.getItem(key);
//     return val ? JSON.parse(val) : defaultVal;
// }

// /* ================= LINE HEIGHT ================= */
// function setLineHeight(val) {
//     document.querySelectorAll("p, li, span, div, a").forEach(el => {
//         el.style.lineHeight = val;
//     });
//     saveA11y("lineHeight", val);
// }

// /* ================= TEXT SIZE ================= */
// function setTextSize(val) {
//     document.documentElement.style.fontSize = val + "%";
//     saveA11y("textSize", val);
// }

// /* ================= LETTER SPACING ================= */
// function setLetterSpacing(val) {
//     document.body.style.letterSpacing = val + "px";
//     saveA11y("letterSpacing", val);
// }

// /* ================= BIG CURSOR ================= */
// let bigCursorEnabled = false;
// function toggleBigCursor() {
//     bigCursorEnabled = !bigCursorEnabled;
//     document.documentElement.classList.toggle("big-cursor", bigCursorEnabled);
//     saveA11y("bigCursor", bigCursorEnabled);
// }

// /* ================= VOICE CORE ================= */
// const synth = window.speechSynthesis;
// let voices = [];
// let utterance = null;

// let readEnabled = false;
// let readingState = "stopped"; // reading | paused | stopped
// let lastText = "";
// let currentElement = null;
// let iosUnlocked = false;

// /* ================= STORAGE SHORTCUT ================= */
// const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
// const get = (k, d) => JSON.parse(localStorage.getItem(k)) ?? d;

// /* ================= PAGE READ BUTTON ================= */
// function togglePageRead() {
//     readEnabled = !readEnabled;
//     save("pageRead", readEnabled);

//     if (readEnabled) {
//         readingState = "reading";
//         openVoicePopup();
//         unlockIOSVoice();
//         if (isIOS) autoReadIOS();
//     } else {
//         stopReading();
//         closeVoicePopup();
//     }
// }

// /* ================= POPUP ================= */
// function openVoicePopup() {
//     document.getElementById("voicePopup")?.classList.add("open");
// }
// function closeVoicePopup() {
//     document.getElementById("voicePopup")?.classList.remove("open");
// }

// /* ================= LOAD VOICES ================= */
// function loadVoices() {
//     voices = synth.getVoices();
//     const select = document.getElementById("voiceSelect");
//     if (!select) return;

//     select.innerHTML = "";
//     voices.forEach((v, i) => {
//         const opt = document.createElement("option");
//         opt.value = i;
//         opt.textContent = `${v.name} (${v.lang})`;
//         select.appendChild(opt);
//     });

//     select.value = get("voiceIndex", 0);
// }
// speechSynthesis.onvoiceschanged = loadVoices;

// /* ================= VOICE CONTROLS ================= */
// function initVoiceControls() {
//     const volumeEl = document.getElementById("voiceVolume");
//     const rateEl = document.getElementById("voiceRate");
//     const pitchEl = document.getElementById("voicePitch");
//     const voiceSelect = document.getElementById("voiceSelect");

//     if (!volumeEl) return;

//     volumeEl.value = get("voiceVolume", 1);
//     rateEl.value = get("voiceRate", 1);
//     pitchEl.value = get("voicePitch", 1);

//     volumeEl.oninput = e => save("voiceVolume", e.target.value);
//     rateEl.oninput = e => save("voiceRate", e.target.value);
//     pitchEl.oninput = e => save("voicePitch", e.target.value);
//     voiceSelect.onchange = e => save("voiceIndex", e.target.value);
// }

// /* ================= IOS VOICE UNLOCK ================= */
// function unlockIOSVoice() {
//     if (!isIOS || iosUnlocked) return;
//     const unlockHandler = () => {
//         const u = new SpeechSynthesisUtterance(" ");
//         synth.speak(u);
//         synth.cancel();
//         iosUnlocked = true;
//         document.body.removeEventListener("touchstart", unlockHandler);
//     };
//     document.body.addEventListener("touchstart", unlockHandler, { once: true, passive: true });
// }

// /* ================= READ HANDLER ================= */
// function handleRead(el) {
//     if (!readEnabled || readingState !== "reading") return;
//     if (!el || !el.innerText || el.children.length > 0) return;
//     if (isIOS && !iosUnlocked) return;

//     const text = el.innerText.trim();
//     if (text.length < 2 || text === lastText) return;

//     currentElement?.classList.remove("a11y-read-hover");
//     el.classList.add("a11y-read-hover");
//     currentElement = el;

//     synth.cancel();

//     utterance = new SpeechSynthesisUtterance(text);
//     utterance.voice = voices[get("voiceIndex", 0)] || voices[0];
//     utterance.volume = get("voiceVolume", 1);
//     utterance.rate = get("voiceRate", 1);
//     utterance.pitch = get("voicePitch", 1);

//     utterance.onend = () => {
//         if (isIOS) autoReadIOS(); // auto continue on iOS
//     };

//     synth.speak(utterance);
//     lastText = text;
//     readingState = "reading";
// }

// /* ================= AUTO READ FOR IOS ================= */
// function autoReadIOS() {
//     if (!readEnabled || readingState !== "reading") return;
//     const elements = Array.from(document.querySelectorAll("p, li, span, div, a"))
//         .filter(el => el.innerText.trim().length > 1);
//     const nextIndex = elements.indexOf(currentElement) + 1 || 0;
//     const nextEl = elements[nextIndex] || elements[0]; // loop if end
//     handleRead(nextEl);
// }

// /* ================= DESKTOP HOVER ================= */
// document.body.addEventListener("mouseover", e => {
//     if (isIOS) return;
//     handleRead(e.target);
// });

// /* ================= IOS TAP ================= */
// document.body.addEventListener(
//     "touchstart",
//     e => {
//         if (!isIOS) return;
//         handleRead(e.target);
//     },
//     { passive: true }
// );

// /* ================= HIGHLIGHT HEADINGS ================= */
// function toggleHeadingHighlight() {
//     document.querySelectorAll("h1,h2,h3,h4,h5,h6")
//         .forEach(h => h.classList.toggle("a11y-heading"));

//     saveA11y(
//         "headingHighlight",
//         document.querySelector("h1")?.classList.contains("a11y-heading")
//     );
// }

// /* ================= IMAGE DESCRIPTION ================= */
// let imageDescEnabled = false;
// function showImageTip(img) {
//     removeImageTip(img);
//     const tip = document.createElement("div");
//     tip.className = "a11y-img-tip";
//     tip.innerText = img.alt;
//     document.body.appendChild(tip);

//     const r = img.getBoundingClientRect();
//     tip.style.top = (r.top + window.scrollY + r.height + 10) + "px";
//     tip.style.left = (r.left + window.scrollX) + "px";

//     img._tip = tip;
// }
// function removeImageTip(img) {
//     if (img._tip) {
//         img._tip.remove();
//         img._tip = null;
//     }
// }
// function attachImageDesc() {
//     document.querySelectorAll("img").forEach(img => {
//         img.onmouseenter = img.onmouseleave = img.onclick = img.ontouchstart = null;
//         img.addEventListener("mouseenter", () => {
//             if (!imageDescEnabled || !img.alt) return;
//             showImageTip(img);
//         });
//         img.addEventListener("mouseleave", () => removeImageTip(img));
//         img.addEventListener("click", () => {
//             if (!imageDescEnabled || !img.alt) return;
//             showImageTip(img);
//             setTimeout(() => removeImageTip(img), 3000);
//         });
//         img.addEventListener("touchstart", () => {
//             if (!imageDescEnabled || !img.alt) return;
//             showImageTip(img);
//             setTimeout(() => removeImageTip(img), 3000);
//         }, { passive: true });
//     });
// }
// function toggleImageDesc() {
//     imageDescEnabled = !imageDescEnabled;
//     saveA11y("imageDesc", imageDescEnabled);
//     attachImageDesc();
// }

// /* ================= HIDE IMAGES ================= */
// function toggleImages() {
//     const hide = document.body.classList.toggle("hide-images");
//     saveA11y("hideImages", hide);

//     document.querySelectorAll("img").forEach(img => {
//         hide
//             ? img.setAttribute("aria-hidden", "true")
//             : img.removeAttribute("aria-hidden");
//     });
// }

// /* ================= VOICE POPUP BUTTONS ================= */
// function pauseReading() {
//     if (synth.speaking && !synth.paused) {
//         synth.pause();
//         readingState = "paused";
//     }
// }
// function resumeReading() {
//     if (synth.paused) {
//         synth.resume();
//         readingState = "reading";
//     }
// }
// function stopReading() {
//     synth.cancel();
//     readingState = "stopped";
//     readEnabled = false;
//     lastText = "";
//     currentElement?.classList.remove("a11y-read-hover");
//     save("pageRead", false);
// }

// /* ================= RESTORE ON LOAD ================= */
// document.addEventListener("DOMContentLoaded", () => {

//     document.documentElement.style.fontSize =  getA11y("textSize", 100) + "%";     

//     const lh = getA11y("lineHeight", null);
//     if (lh) setLineHeight(lh);

//     document.body.style.letterSpacing = getA11y("letterSpacing", 0) + "px";

//     bigCursorEnabled = getA11y("bigCursor", false);
//     document.documentElement.classList.toggle("big-cursor", bigCursorEnabled);

//     if (getA11y("headingHighlight", false)) {
//         document.querySelectorAll("h1,h2,h3,h4,h5,h6")
//             .forEach(h => h.classList.add("a11y-heading"));
//     }

//     if (getA11y("hideImages", false)) {
//         document.body.classList.add("hide-images");
//         document.querySelectorAll("img").forEach(img =>
//             img.setAttribute("aria-hidden", "true")
//         );
//     }

//     imageDescEnabled = getA11y("imageDesc", false);
//     attachImageDesc();

//     // Restore Page Read if previously enabled
//     if (get("pageRead", false)) {
//         readEnabled = true;
//         readingState = "reading";
//         openVoicePopup();
//         unlockIOSVoice();
//         if (isIOS) autoReadIOS();
//     }

//     loadVoices();
//     initVoiceControls();
// });

// /* ================= RESET ================= */
// function resetAccessibility() {
//     localStorage.clear();
//     location.reload();
// }




// second one

// /* ================= ACCESSIBILITY PANEL ================= */
// function openAccessibilityPanel() {
//   document.getElementById("accessibilityPanel").classList.add("open");
// }
// function closeAccessibilityPanel() {
//   document.getElementById("accessibilityPanel").classList.remove("open");
// }

// /* ================= LOCAL STORAGE HELPERS ================= */
// function saveA11y(key, value) {
//   localStorage.setItem(key, JSON.stringify(value));
// }
// function getA11y(key, defaultVal) {
//   const val = localStorage.getItem(key);
//   return val ? JSON.parse(val) : defaultVal;
// }

// /* ================= LINE HEIGHT ================= */
// function setLineHeight(val) {
//   document.querySelectorAll("p, li, span, div, a").forEach(el => {
//     el.style.lineHeight = val;
//   });
//   saveA11y("lineHeight", val);
// }

// /* ================= TEXT SIZE ================= */
// function setTextSize(val) {
//   document.documentElement.style.fontSize = val + "%";
//   saveA11y("textSize", val);
// }

// /* ================= LETTER SPACING ================= */
// function setLetterSpacing(val) {
//   document.body.style.letterSpacing = val + "px";
//   saveA11y("letterSpacing", val);
// }

// /* ================= BIG CURSOR ================= */
// let bigCursorEnabled = false;
// function toggleBigCursor() {
//   bigCursorEnabled = !bigCursorEnabled;
//   document.documentElement.classList.toggle("big-cursor", bigCursorEnabled);
//   saveA11y("bigCursor", bigCursorEnabled);
// }

// /* ================= VOICE CORE ================= */
// const synth = window.speechSynthesis;
// let voices = [];
// let utterance = null;
// let readEnabled = false;
// let readingState = "stopped"; // reading | paused | stopped
// let lastText = "";
// let currentElement = null;

// /* ================= STORAGE SHORTCUT ================= */
// const save = (k,v) => localStorage.setItem(k, JSON.stringify(v));
// const get = (k,d) => JSON.parse(localStorage.getItem(k)) ?? d;

// /* ================= PAGE READ BUTTON ================= */
// function togglePageRead() {
//   readEnabled = !readEnabled;
//   save("pageRead", readEnabled);

//   if (readEnabled) {
//     readingState = "reading";
//     openVoicePopup();
//   } else {
//     stopReading();
//     closeVoicePopup();
//   }
// }

// /* ================= POPUP CONTROL ================= */
// function openVoicePopup() {
//   document.getElementById("voicePopup")?.classList.add("open");
// }
// function closeVoicePopup() {
//   document.getElementById("voicePopup")?.classList.remove("open");
// }

// /* ================= LOAD VOICES ================= */
// function loadVoices() {
//   voices = synth.getVoices();
//   const select = document.getElementById("voiceSelect");
//   if (!select) return;

//   select.innerHTML = "";
//   voices.forEach((v, i) => {
//     const opt = document.createElement("option");
//     opt.value = i;
//     opt.textContent = `${v.name} (${v.lang})`;
//     select.appendChild(opt);
//   });

//   select.value = get("voiceIndex", 0);
// }
// speechSynthesis.onvoiceschanged = loadVoices;

// /* ================= VOICE SETTINGS ================= */
// function initVoiceControls() {
//   const volumeEl = document.getElementById("voiceVolume");
//   const rateEl = document.getElementById("voiceRate");
//   const pitchEl = document.getElementById("voicePitch");
//   const voiceSelect = document.getElementById("voiceSelect");

//   if (!volumeEl) return;

//   volumeEl.value = get("voiceVolume", 1);
//   rateEl.value = get("voiceRate", 1);
//   pitchEl.value = get("voicePitch", 1);

//   volumeEl.oninput = e => save("voiceVolume", e.target.value);
//   rateEl.oninput = e => save("voiceRate", e.target.value);
//   pitchEl.oninput = e => save("voicePitch", e.target.value);
//   voiceSelect.onchange = e => save("voiceIndex", e.target.value);
// }

// /* ================= CONTROLS ================= */
// function startReading() {
//   readEnabled = true;
//   readingState = "reading";
//   save("pageRead", true);
// }

// function pauseReading() {
//   if (synth.speaking) {
//     synth.pause();
//     readingState = "paused";
//   }
// }

// function resumeReading() {
//   if (readingState === "paused") {
//     synth.resume();
//     readingState = "reading";
//   }
// }

// function stopReading() {
//   synth.cancel();
//   readEnabled = false;
//   readingState = "stopped";
//   lastText = "";
//   currentElement?.classList.remove("a11y-read-hover");
//   save("pageRead", false);
// }

// /* ================= HOVER READ ================= */
// document.body.addEventListener("mouseover", e => {
//   if (!readEnabled || readingState !== "reading") return;

//   const el = e.target;
//   if (!el.innerText || el.children.length > 0) return;

//   const text = el.innerText.trim();
//   if (text.length < 2 || text === lastText) return;

//   currentElement?.classList.remove("a11y-read-hover");
//   el.classList.add("a11y-read-hover");
//   currentElement = el;

//   synth.cancel();

//   utterance = new SpeechSynthesisUtterance(text);
//   utterance.voice = voices[get("voiceIndex", 0)] || voices[0];
//   utterance.volume = get("voiceVolume", 1);
//   utterance.rate = get("voiceRate", 1);
//   utterance.pitch = get("voicePitch", 1);

//   synth.speak(utterance);
//   lastText = text;
// });

// document.body.addEventListener("mouseout", e => {
//   if (e.target === currentElement) {
//     e.target.classList.remove("a11y-read-hover");
//   }
// });

// /* ================= HIGHLIGHT HEADINGS ================= */
// function toggleHeadingHighlight() {
//   document.querySelectorAll("h1,h2,h3,h4,h5,h6")
//     .forEach(h => h.classList.toggle("a11y-heading"));

//   saveA11y(
//     "headingHighlight",
//     document.querySelector("h1")?.classList.contains("a11y-heading")
//   );
// }

// /* ================= IMAGE DESCRIPTION ================= */
// let imageDescEnabled = false;
// function toggleImageDesc() {
//   imageDescEnabled = !imageDescEnabled;
//   saveA11y("imageDesc", imageDescEnabled);
// }

// document.querySelectorAll("img").forEach(img => {
//   img.addEventListener("mouseenter", () => {
//     if (!imageDescEnabled || !img.alt) return;

//     const tip = document.createElement("div");
//     tip.className = "a11y-img-tip";
//     tip.innerText = img.alt;
//     document.body.appendChild(tip);

//     const r = img.getBoundingClientRect();
//     tip.style.top = (r.top + window.scrollY + r.height + 10) + "px";
//     tip.style.left = (r.left + window.scrollX) + "px";

//     img._tip = tip;
//   });

//   img.addEventListener("mouseleave", () => {
//     img._tip?.remove();
//   });
// });

// /* ================= HIDE IMAGES ================= */
// function toggleImages() {
//   const hide = document.body.classList.toggle("hide-images");
//   saveA11y("hideImages", hide);

//   document.querySelectorAll("img").forEach(img => {
//     hide
//       ? img.setAttribute("aria-hidden", "true")
//       : img.removeAttribute("aria-hidden");
//   });
// }

// /* ================= RESTORE ON PAGE LOAD ================= */
// document.addEventListener("DOMContentLoaded", () => {

//   document.documentElement.style.fontSize = getA11y("textSize", 100) + "%";

//   const lh = getA11y("lineHeight", null);
//   if (lh) setLineHeight(lh);

//   document.body.style.letterSpacing = getA11y("letterSpacing", 0) + "px";

//   bigCursorEnabled = getA11y("bigCursor", false);
//   document.documentElement.classList.toggle("big-cursor", bigCursorEnabled);

//   if (getA11y("headingHighlight", false)) {
//     document.querySelectorAll("h1,h2,h3,h4,h5,h6")
//       .forEach(h => h.classList.add("a11y-heading"));
//   }

//   if (getA11y("hideImages", false)) {
//     document.body.classList.add("hide-images");
//     document.querySelectorAll("img").forEach(img =>
//       img.setAttribute("aria-hidden", "true")
//     );
//   }

//   imageDescEnabled = getA11y("imageDesc", false);

//   if (get("pageRead", false)) {
//     readEnabled = true;
//     readingState = "reading";
//     openVoicePopup();
//   }

//   loadVoices();
//   initVoiceControls();
// });

// /* ================= RESET ================= */
// function resetAccessibility() {
//   localStorage.clear();
//   location.reload();
// } 









// third correct one
/* ================= DEVICE DETECTION ================= */
// const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

// /* ================= ACCESSIBILITY PANEL ================= */
// function openAccessibilityPanel() {
//     document.getElementById("accessibilityPanel")?.classList.add("open");
// }
// function closeAccessibilityPanel() {
//     document.getElementById("accessibilityPanel")?.classList.remove("open");
// }

// /* ================= LOCAL STORAGE HELPERS ================= */
// function saveA11y(key, value) {
//     localStorage.setItem(key, JSON.stringify(value));
// }
// function getA11y(key, defaultVal) {
//     const val = localStorage.getItem(key);
//     return val ? JSON.parse(val) : defaultVal;
// }

// /* ================= LINE HEIGHT ================= */
// function setLineHeight(val) {
//     document.querySelectorAll("p, li, span, div, a").forEach(el => {
//         el.style.lineHeight = val;
//     });
//     saveA11y("lineHeight", val);
// }

// /* ================= TEXT SIZE ================= */
// function setTextSize(val) {
//     document.documentElement.style.fontSize = val + "%";
//     saveA11y("textSize", val);
// }

// /* ================= LETTER SPACING ================= */
// function setLetterSpacing(val) {
//     document.body.style.letterSpacing = val + "px";
//     saveA11y("letterSpacing", val);
// }

// /* ================= BIG CURSOR ================= */
// let bigCursorEnabled = false;
// function toggleBigCursor() {
//     bigCursorEnabled = !bigCursorEnabled;
//     document.documentElement.classList.toggle("big-cursor", bigCursorEnabled);
//     saveA11y("bigCursor", bigCursorEnabled);
// }

// /* ================= VOICE CORE ================= */
// const synth = window.speechSynthesis;
// let voices = [];
// let utterance = null;
// let readEnabled = false;
// let readingState = "stopped"; // reading | paused | stopped
// let lastText = "";
// let currentElement = null;

// /* ================= STORAGE SHORTCUT ================= */
// const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
// const get = (k, d) => JSON.parse(localStorage.getItem(k)) ?? d;

// /* ================= PAGE READ BUTTON ================= */
// function togglePageRead() {
//     readEnabled = !readEnabled;
//     save("pageRead", readEnabled);

//     if (readEnabled) {
//         readingState = "reading";
//         openVoicePopup();

//         // ✅ iOS Safari speech unlock (NO auto reading)
//         if (isIOS) {
//             const unlock = new SpeechSynthesisUtterance("");
//             unlock.volume = 0;
//             synth.speak(unlock);
//         }

//     } else {
//         stopReading();
//         closeVoicePopup();
//     }
// }

// /* ================= POPUP CONTROL ================= */
// function openVoicePopup() {
//     document.getElementById("voicePopup")?.classList.add("open");
// }
// function closeVoicePopup() {
//     document.getElementById("voicePopup")?.classList.remove("open");
// }

// /* ================= LOAD VOICES ================= */
// function loadVoices() {
//     voices = synth.getVoices();
//     const select = document.getElementById("voiceSelect");
//     if (!select) return;

//     select.innerHTML = "";
//     voices.forEach((v, i) => {
//         const opt = document.createElement("option");
//         opt.value = i;
//         opt.textContent = `${v.name} (${v.lang})`;
//         select.appendChild(opt);
//     });

//     select.value = get("voiceIndex", 0);
// }
// speechSynthesis.onvoiceschanged = loadVoices;

// /* ================= VOICE SETTINGS ================= */
// function initVoiceControls() {
//     const volumeEl = document.getElementById("voiceVolume");
//     const rateEl = document.getElementById("voiceRate");
//     const pitchEl = document.getElementById("voicePitch");
//     const voiceSelect = document.getElementById("voiceSelect");

//     if (!volumeEl) return;

//     volumeEl.value = get("voiceVolume", 1);
//     rateEl.value = get("voiceRate", 1);
//     pitchEl.value = get("voicePitch", 1);

//     volumeEl.oninput = e => save("voiceVolume", e.target.value);
//     rateEl.oninput = e => save("voiceRate", e.target.value);
//     pitchEl.oninput = e => save("voicePitch", e.target.value);
//     voiceSelect.onchange = e => save("voiceIndex", e.target.value);
// }

// /* ================= CONTROLS ================= */
// function startReading() {
//     readEnabled = true;
//     readingState = "reading";
//     save("pageRead", true);
// }

// function pauseReading() {
//     if (synth.speaking) {
//         synth.pause();
//         readingState = "paused";
//     }
// }

// function resumeReading() {
//     if (readingState === "paused") {
//         synth.resume();
//         readingState = "reading";
//     }
// }

// function stopReading() {
//     synth.cancel();
//     readEnabled = false;
//     readingState = "stopped";
//     lastText = "";
//     currentElement?.classList.remove("a11y-read-hover");
//     save("pageRead", false);
// }

// /* ================= DESKTOP: HOVER READ ================= */
// if (!isIOS) {
//     document.body.addEventListener("mouseover", e => {
//         if (!readEnabled || readingState !== "reading") return;

//         const el = e.target;
//         if (!el.innerText || el.children.length > 0) return;

//         const text = el.innerText.trim();
//         if (text.length < 2 || text === lastText) return;

//         currentElement?.classList.remove("a11y-read-hover");
//         el.classList.add("a11y-read-hover");
//         currentElement = el;

//         synth.cancel();

//         utterance = new SpeechSynthesisUtterance(text);
//         utterance.voice = voices[get("voiceIndex", 0)] || voices[0];
//         utterance.volume = get("voiceVolume", 1);
//         utterance.rate = get("voiceRate", 1);
//         utterance.pitch = get("voicePitch", 1);

//         synth.speak(utterance);
//         lastText = text;
//     });
// }

// /* ================= iOS / ANDROID: TAP READ ================= */
// document.body.addEventListener("click", e => {
//     if (!readEnabled || readingState !== "reading") return;

//     const el = e.target;
//     if (!el.innerText || el.children.length > 0) return;

//     const text = el.innerText.trim();
//     if (text.length < 2 || text === lastText) return;

//     currentElement?.classList.remove("a11y-read-hover");
//     el.classList.add("a11y-read-hover");
//     currentElement = el;

//     synth.cancel();

//     utterance = new SpeechSynthesisUtterance(text);
//     utterance.voice = voices[get("voiceIndex", 0)] || voices[0];
//     utterance.volume = get("voiceVolume", 1);
//     utterance.rate = get("voiceRate", 1);
//     utterance.pitch = get("voicePitch", 1);

//     synth.speak(utterance);
//     lastText = text;
// });

// /* ================= HIGHLIGHT HEADINGS ================= */
// function toggleHeadingHighlight() {
//     document.querySelectorAll("h1,h2,h3,h4,h5,h6")
//         .forEach(h => h.classList.toggle("a11y-heading"));

//     saveA11y(
//         "headingHighlight",
//         document.querySelector("h1")?.classList.contains("a11y-heading")
//     );
// }

// /* ================= IMAGE DESCRIPTION ================= */
// let imageDescEnabled = false;
// function showImageTip(img) {
//     removeImageTip(img);
//     const tip = document.createElement("div");
//     tip.className = "a11y-img-tip";
//     tip.innerText = img.alt;
//     document.body.appendChild(tip);

//     const r = img.getBoundingClientRect();
//     tip.style.top = (r.top + window.scrollY + r.height + 10) + "px";
//     tip.style.left = (r.left + window.scrollX) + "px";

//     img._tip = tip;
// }
// function removeImageTip(img) {
//     if (img._tip) {
//         img._tip.remove();
//         img._tip = null;
//     }
// }
// function attachImageDesc() {
//     document.querySelectorAll("img").forEach(img => {
//         img.onmouseenter = img.onmouseleave = img.onclick = img.ontouchstart = null;
//         img.addEventListener("mouseenter", () => {
//             if (!imageDescEnabled || !img.alt) return;
//             showImageTip(img);
//         });
//         img.addEventListener("mouseleave", () => removeImageTip(img));
//         img.addEventListener("click", () => {
//             if (!imageDescEnabled || !img.alt) return;
//             showImageTip(img);
//             setTimeout(() => removeImageTip(img), 3000);
//         });
//         img.addEventListener("touchstart", () => {
//             if (!imageDescEnabled || !img.alt) return;
//             showImageTip(img);
//             setTimeout(() => removeImageTip(img), 3000);
//         }, { passive: true });
//     });
// }
// function toggleImageDesc() {
//     imageDescEnabled = !imageDescEnabled;
//     saveA11y("imageDesc", imageDescEnabled);
//     attachImageDesc();
// }

// /* ================= HIDE IMAGES ================= */
// function toggleImages() {
//     const hide = document.body.classList.toggle("hide-images");
//     saveA11y("hideImages", hide);

//     document.querySelectorAll("img").forEach(img => {
//         hide
//             ? img.setAttribute("aria-hidden", "true")
//             : img.removeAttribute("aria-hidden");
//     });
// }

// /* ================= RESTORE ON PAGE LOAD ================= */
// document.addEventListener("DOMContentLoaded", () => {

//     document.documentElement.style.fontSize = getA11y("textSize", 100) + "%";

//     const lh = getA11y("lineHeight", null);
//     if (lh) setLineHeight(lh);

//     document.body.style.letterSpacing = getA11y("letterSpacing", 0) + "px";

//     bigCursorEnabled = getA11y("bigCursor", false);
//     document.documentElement.classList.toggle("big-cursor", bigCursorEnabled);

//     if (getA11y("headingHighlight", false)) {
//         document.querySelectorAll("h1,h2,h3,h4,h5,h6")
//             .forEach(h => h.classList.add("a11y-heading"));
//     }

//     if (getA11y("hideImages", false)) {
//         document.body.classList.add("hide-images");
//         document.querySelectorAll("img").forEach(img =>
//             img.setAttribute("aria-hidden", "true")
//         );
//     }

//     imageDescEnabled = getA11y("imageDesc", false);

//     // ✅ RESTORE PAGE READ STATE (NO POPUP, NO AUTO READ)
//     if (get("pageRead", false)) {
//         readEnabled = true;
//         readingState = "reading";
//     }

//     loadVoices();
//     initVoiceControls();
// });

// /* ================= RESET ================= */
// function resetAccessibility() {
//     localStorage.clear();
//     location.reload();
// }








/* ================= DEVICE DETECTION ================= */
const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent);

/* ================= ACCESSIBILITY PANEL ================= */
function openAccessibilityPanel() {
    document.getElementById("accessibilityPanel")?.classList.add("open");
}
function closeAccessibilityPanel() {
    document.getElementById("accessibilityPanel")?.classList.remove("open");
}

/* ================= LOCAL STORAGE HELPERS ================= */
function saveA11y(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
}
function getA11y(key, defaultVal) {
    const val = localStorage.getItem(key);
    return val ? JSON.parse(val) : defaultVal;
}

/* ================= LINE HEIGHT ================= */
function setLineHeight(val) {
    document.querySelectorAll("p, li, span, div, a").forEach(el => {
        el.style.lineHeight = val;
    });
    saveA11y("lineHeight", val);
}

/* ================= TEXT SIZE ================= */
function setTextSize(val) {
    document.documentElement.style.fontSize = val + "%";
    saveA11y("textSize", val);
}

/* ================= LETTER SPACING ================= */
function setLetterSpacing(val) {
    document.body.style.letterSpacing = val + "px";
    saveA11y("letterSpacing", val);
}

/* ================= BIG CURSOR ================= */
let bigCursorEnabled = false;
function toggleBigCursor() {
    bigCursorEnabled = !bigCursorEnabled;
    document.documentElement.classList.toggle("big-cursor", bigCursorEnabled);
    saveA11y("bigCursor", bigCursorEnabled);
}

/* ================= VOICE CORE ================= */
const synth = window.speechSynthesis;
let voices = [];
let utterance = null;
let readEnabled = false;
let readingState = "stopped";
let lastText = "";
let currentElement = null;

/* ================= STORAGE SHORTCUT ================= */
const save = (k, v) => localStorage.setItem(k, JSON.stringify(v));
const get = (k, d) => JSON.parse(localStorage.getItem(k)) ?? d;

/* ================= PAGE READ TOGGLE ================= */
function togglePageRead() {
    readEnabled = !readEnabled;
    save("pageRead", readEnabled);

    if (readEnabled) {
        readingState = "reading";
        openVoicePopup();

        // iOS unlock (NO auto speech)
        if (isIOS) {
            const unlock = new SpeechSynthesisUtterance("");
            unlock.volume = 0;
            synth.speak(unlock);
        }
    } else {
        stopReading();
        closeVoicePopup();
    }
}

/* ================= POPUP CONTROL ================= */
function openVoicePopup() {
    document.getElementById("voicePopup")?.classList.add("open");
}
function closeVoicePopup() {
    document.getElementById("voicePopup")?.classList.remove("open");
}

/* ================= LOAD VOICES ================= */
function loadVoices() {
    voices = synth.getVoices();
    const select = document.getElementById("voiceSelect");
    if (!select) return;

    select.innerHTML = "";
    voices.forEach((v, i) => {
        const opt = document.createElement("option");
        opt.value = i;
        opt.textContent = `${v.name} (${v.lang})`;
        select.appendChild(opt);
    });

    select.value = get("voiceIndex", 0);
}
speechSynthesis.onvoiceschanged = loadVoices;

/* ================= VOICE SETTINGS ================= */
function initVoiceControls() {
    const volumeEl = document.getElementById("voiceVolume");
    const rateEl = document.getElementById("voiceRate");
    const pitchEl = document.getElementById("voicePitch");
    const voiceSelect = document.getElementById("voiceSelect");

    if (!volumeEl) return;

    volumeEl.value = get("voiceVolume", 1);
    rateEl.value = get("voiceRate", 1);
    pitchEl.value = get("voicePitch", 1);

    volumeEl.oninput = e => save("voiceVolume", e.target.value);
    rateEl.oninput = e => save("voiceRate", e.target.value);
    pitchEl.oninput = e => save("voicePitch", e.target.value);
    voiceSelect.onchange = e => save("voiceIndex", e.target.value);
}

/* ================= CONTROLS ================= */
function pauseReading() {
    if (synth.speaking) {
        synth.pause();
        readingState = "paused";
    }
}
function resumeReading() {
    if (readingState === "paused") {
        synth.resume();
        readingState = "reading";
    }
}
function stopReading() {
    synth.cancel();
    readEnabled = false;
    readingState = "stopped";
    lastText = "";
    currentElement?.classList.remove("a11y-read-hover");
    save("pageRead", false);
}

/* ================= DESKTOP HOVER READ ================= */
if (!isIOS) {
    document.body.addEventListener("mouseover", e => {
        if (!readEnabled || readingState !== "reading") return;

        const el = e.target;
        if (!el.innerText || el.children.length > 0) return;

        const text = el.innerText.trim();
        if (text.length < 2 || text === lastText) return;

        currentElement?.classList.remove("a11y-read-hover");
        el.classList.add("a11y-read-hover");
        currentElement = el;

        synth.cancel();
        utterance = new SpeechSynthesisUtterance(text);
        utterance.voice = voices[get("voiceIndex", 0)] || voices[0];
        utterance.volume = get("voiceVolume", 1);
        utterance.rate = get("voiceRate", 1);
        utterance.pitch = get("voicePitch", 1);

        synth.speak(utterance);
        lastText = text;
    });
}

/* ================= MOBILE TAP READ ================= */
document.body.addEventListener("click", e => {
    if (!readEnabled || readingState !== "reading") return;

    const el = e.target;
    if (!el.innerText || el.children.length > 0) return;

    const text = el.innerText.trim();
    if (text.length < 2 || text === lastText) return;

    currentElement?.classList.remove("a11y-read-hover");
    el.classList.add("a11y-read-hover");
    currentElement = el;

    synth.cancel();
    utterance = new SpeechSynthesisUtterance(text);
    utterance.voice = voices[get("voiceIndex", 0)] || voices[0];
    utterance.volume = get("voiceVolume", 1);
    utterance.rate = get("voiceRate", 1);
    utterance.pitch = get("voicePitch", 1);

    synth.speak(utterance);
    lastText = text;
});

/* ================= IMAGE DESCRIPTION ================= */
let imageDescEnabled = false;

function showImageTip(img) {
    removeImageTip(img);
    const tip = document.createElement("div");
    tip.className = "a11y-img-tip";
    tip.innerText = img.alt;
    document.body.appendChild(tip);

    const r = img.getBoundingClientRect();
    tip.style.top = (r.top + window.scrollY + r.height + 10) + "px";
    tip.style.left = (r.left + window.scrollX) + "px";

    img._tip = tip;
}
function removeImageTip(img) {
    if (img._tip) {
        img._tip.remove();
        img._tip = null;
    }
}
function attachImageDesc() {
    document.querySelectorAll("img").forEach(img => {
        img.onmouseenter = img.onmouseleave = img.onclick = img.ontouchstart = null;

        img.addEventListener("mouseenter", () => {
            if (!imageDescEnabled || !img.alt) return;
            showImageTip(img);
        });
        img.addEventListener("mouseleave", () => removeImageTip(img));
        img.addEventListener("click", () => {
            if (!imageDescEnabled || !img.alt) return;
            showImageTip(img);
            setTimeout(() => removeImageTip(img), 3000);
        });
        img.addEventListener("touchstart", () => {
            if (!imageDescEnabled || !img.alt) return;
            showImageTip(img);
            setTimeout(() => removeImageTip(img), 3000);
        }, { passive: true });
    });
}
function toggleImageDesc() {
    imageDescEnabled = !imageDescEnabled;
    saveA11y("imageDesc", imageDescEnabled);
    attachImageDesc();
}


/* ================= HIGHLIGHT HEADINGS ================= */
function toggleHeadingHighlight() {
    document.querySelectorAll("h1,h2,h3,h4,h5,h6")
        .forEach(h => h.classList.toggle("a11y-heading"));

    saveA11y(
        "headingHighlight",
        document.querySelector("h1")?.classList.contains("a11y-heading")
    );
}


/* ================= RESTORE ON PAGE LOAD ================= */
document.addEventListener("DOMContentLoaded", () => {

    document.documentElement.style.fontSize = getA11y("textSize", 100) + "%";

    const lh = getA11y("lineHeight", null);
    if (lh) setLineHeight(lh);

    document.body.style.letterSpacing = getA11y("letterSpacing", 0) + "px";

    /* ===== BIG CURSOR ===== */
    bigCursorEnabled = getA11y("bigCursor", false);
    document.documentElement.classList.toggle("big-cursor", bigCursorEnabled);

    /* ===== HEADING HIGHLIGHT ===== */
    if (getA11y("headingHighlight", false)) {
        document.querySelectorAll("h1,h2,h3,h4,h5,h6")
            .forEach(h => h.classList.add("a11y-heading"));
    }

    /* ===== HIDE IMAGES ===== */
    if (getA11y("hideImages", false)) {
        document.body.classList.add("hide-images");
        document.querySelectorAll("img").forEach(img =>
            img.setAttribute("aria-hidden", "true")
        );
    }

    /* ===== IMAGE DESCRIPTION ===== */
    imageDescEnabled = getA11y("imageDesc", false);
    if (imageDescEnabled) attachImageDesc();

    /* ===== PAGE READ ===== */
    if (get("pageRead", false)) {
        readEnabled = true;
        readingState = "reading";
        

        if (isIOS) {
            const unlock = new SpeechSynthesisUtterance("");
            unlock.volume = 0;
            synth.speak(unlock);
        }
    }

    loadVoices();
    initVoiceControls();
});



/* ================= HIDE IMAGES ================= */
function toggleImages() {
    const hide = document.body.classList.toggle("hide-images");
    saveA11y("hideImages", hide);

    document.querySelectorAll("img").forEach(img => {
        hide
            ? img.setAttribute("aria-hidden", "true")
            : img.removeAttribute("aria-hidden");
    });
}


/* ================= RESET ================= */
function resetAccessibility() {
    localStorage.clear();
    location.reload();
}

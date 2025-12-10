document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const sidebarBtn = document.getElementById('sidebar-btn');
    const sidebar = document.getElementById('sidebar');
    const overlay = document.getElementById('overlay');
    const closeBtn = document.querySelector('.btn-slideClose');
    
    if (sidebarBtn && sidebar && overlay) {
        // Open sidebar
        sidebarBtn.addEventListener('click', function() {
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
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && sidebar.classList.contains('open')) {
                closeSidebar();
            }
        });
    }
    
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
        toggle.addEventListener('click', function(e) {
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
        mobileLoginToggle.addEventListener('click', function(e) {
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
    document.addEventListener('click', function(e) {
        if (sidebar.classList.contains('open') && 
            !e.target.closest('.mobile-dropdown') && 
            !e.target.closest('.mobile-login-container') &&
            !e.target.closest('#sidebar-btn')) {
            closeAllDropdowns();
        }
    });
    
    // Close dropdowns when clicking on a link inside dropdown
    document.querySelectorAll('.mobile-dropdown-menu a, .mobile-login-dropdown a').forEach(link => {
        link.addEventListener('click', function() {
            closeSidebar();
        });
    });
    
    // Close all dropdowns when window is resized
    window.addEventListener('resize', function() {
        if (window.innerWidth <= 576 && sidebar.classList.contains('open')) {
            closeAllDropdowns();
        }
    });
});




        // Mobile footer accordion functionality
document.addEventListener('DOMContentLoaded', function() {
    const sidebarMenus = document.querySelectorAll('.sidebar-menu');
    
    sidebarMenus.forEach(menu => {
        menu.addEventListener('click', function() {
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
document.addEventListener('DOMContentLoaded', function() {
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
document.addEventListener('DOMContentLoaded', function() {
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
document.addEventListener('DOMContentLoaded', function() {
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
document.addEventListener('DOMContentLoaded', function() {
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
document.addEventListener('DOMContentLoaded', function() {
    const faqHeaders = document.querySelectorAll('.faq-header');
    
    faqHeaders.forEach(header => {
        header.addEventListener('click', function() {
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
document.addEventListener('DOMContentLoaded', function() {
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
        link.addEventListener('click', function(e) {
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
   document.addEventListener('DOMContentLoaded', function() {
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
    link.addEventListener('click', function(e) {
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
document.addEventListener('DOMContentLoaded', function() {
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
        careerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            // Add your form submission logic here
            alert('Thank you for your application! We will get back to you soon.');
            this.reset();
        });
    }
    
    // Smooth scroll for apply buttons
    const applyButtons = document.querySelectorAll('a[href="#apply-form"]');
    applyButtons.forEach(button => {
        button.addEventListener('click', function(e) {
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
        document.addEventListener('DOMContentLoaded', function() {
            let hoverTimeout;
            const dropdownSubmenus = document.querySelectorAll('.dropdown-submenu');
            
            dropdownSubmenus.forEach(submenu => {
                const nestedDropdown = submenu.querySelector('.nested-dropdown');
                
                submenu.addEventListener('mouseenter', function() {
                    clearTimeout(hoverTimeout);
                    if (nestedDropdown) {
                        nestedDropdown.style.display = 'block';
                        // Force reflow to ensure proper positioning
                        nestedDropdown.offsetHeight;
                        nestedDropdown.style.opacity = '1';
                        nestedDropdown.style.transform = 'translateY(0)';
                    }
                });
                
                submenu.addEventListener('mouseleave', function(e) {
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
                dropdown.addEventListener('mouseenter', function() {
                    clearTimeout(hoverTimeout);
                    this.style.display = 'block';
                    this.style.opacity = '1';
                    this.style.transform = 'translateY(0)';
                });
                
                dropdown.addEventListener('mouseleave', function(e) {
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
                sidebarBtn.addEventListener('click', function() {
                    sidebar.classList.add('active');
                    overlay.classList.add('active');
                });
                
                closeBtn.addEventListener('click', function() {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                });
                
                overlay.addEventListener('click', function() {
                    sidebar.classList.remove('active');
                    overlay.classList.remove('active');
                });
            }
            
            // Mobile submenu toggle
            const menuToggles = document.querySelectorAll('.menu-toggle');
            menuToggles.forEach(toggle => {
                toggle.addEventListener('click', function(e) {
                    e.preventDefault();
                    const parent = this.parentElement;
                    parent.classList.toggle('active');
                });
            });
            
            // PDF download tracking
            const downloadLinks = document.querySelectorAll('.download-link');
            downloadLinks.forEach(link => {
                link.addEventListener('click', function(e) {
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
               document.addEventListener('DOMContentLoaded', function() {
            const marqueeTrack = document.getElementById('marqueeTrack');
            const pauseBtn = document.getElementById('pauseBtn');
            const playBtn = document.getElementById('playBtn');
            const speedBtns = document.querySelectorAll('.speed-btn');
            
            // Testimonials data
            const testimonials = [
                {
                    id: 1,
                    quote: "Today, I am happy with the investment income generated out of their planned strategies. Thanks to Harmoney. I admire their commitment.",
                    name: "Dr. A. Kurian Joseph, M.D., D.G.O.",
                    // position: "President, All India Gynaecologists Association",
                    initials: "AJ"
                },
                {
                    id: 2,
                    quote: "Financial & Investment information is provided with thorough professionalism.",
                    name: "K. Varathan",
                    // position: "Cinetekk, Sale distributors in India for JBL professional DTX - Dolby - Digital theatre systems",
                    initials: "KV"
                },
                {
                    id: 3,
                    quote: "I can vouch for the significant improvement in the quality of my balance sheet to M/s Harmoney. They are known to me for the past 14 years and my money is totally taken care of by them.",
                    name: "Dr. C. Vaithilingam, Ph.D.",
                    // position: "Managing Director, Ram Vijay Biotech (P) Ltd.",
                    initials: "CV"
                },
                {
                    id: 4,
                    quote: "Our relationship is almost two decades now. They have done a remarkable job in building our wealth.",
                    name: "M.G. Raghavan",
                    // position: "Managing Director, Magna Chemical Manufacturers (P) Ltd.",
                    initials: "MR"
                },
                {
                    id: 5,
                    quote: "We are using the advisory services for the last six years and are richly benefited.",
                    name: "V.C. Raamsukaesh",
                    // position: "Vinbro & Co.",
                    initials: "VR"
                },
                {
                    id: 6,
                    quote: "Sincerity, confidence, delivering results: I find these best qualities in them.",
                    name: "S. Kamalasekaran",
                    // position: "Managing Director, NuTech Rubbers",
                    initials: "SK"
                },
                {
                    id: 7,
                    quote: "What a remarkable job! I am delighted to see the growth of my investments.",
                    name: "Krishna Agoram",
                    // position: "Managing Director, Rolapack & company",
                    initials: "KA"
                },
                {
                    id: 8,
                    quote: "Many a times I have admired the way in which they understand my family's need and provide solutions in a very calm and pleasant manner.",
                    name: "L. S. Mani",
                    // position: "Poet & Writer (Retd D.E.O)",
                    initials: "LM"
                },
                {
                    id: 9,
                    quote: "I am benefited by their financial plan. I adopt for enhancing my wealth.",
                    name: "Mr. Sriram Raju",
                    // position: "Project Manager, IBM Global Soft",
                    initials: "SR"
                },
                {
                    id: 10,
                    quote: "Their financial diagnosis is their strength.",
                    name: "Dr. Chandrashekar S. Ratkal, M.B.B.S., M.S. Mah.",
                    // position: "H.O.D. & Professor of Urology Victoria Hospital, Bangalore",
                    initials: "CR"
                }
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
            pauseBtn.addEventListener('click', function() {
                marqueeTrack.style.animationPlayState = 'paused';
                pauseBtn.classList.add('active');
                playBtn.classList.remove('active');
            });
            
            playBtn.addEventListener('click', function() {
                marqueeTrack.style.animationPlayState = 'running';
                playBtn.classList.add('active');
                pauseBtn.classList.remove('active');
            });
            
            // Set play as active by default
            playBtn.classList.add('active');
            
            // Speed controls
            speedBtns.forEach(btn => {
                btn.addEventListener('click', function() {
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
 document.addEventListener('DOMContentLoaded', function() {
        // Target values for counters
        const counterValues = [32, 400, 500, 100];
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
    document.addEventListener('DOMContentLoaded', function() {
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
        button.addEventListener('click', function(e) {
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
            modalImage.onload = function() {
                modalImage.style.opacity = '1';
                modalImage.style.transition = 'opacity 0.3s ease';
                
                // Scroll to top of modal body
                modalBody.scrollTop = 0;
            };
        });
    });
    
    // Close modal when close button is clicked
    modalClose.addEventListener('click', function() {
        closeModal();
    });
    
    // Close modal when clicking outside the image
    modal.addEventListener('click', function(e) {
        if (e.target === modal || e.target.classList.contains('modal-overlay')) {
            closeModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', function(e) {
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







        // voice assistant popup
// ===== ACCESSIBILITY MANAGER WITH HOVER READING =====
(function() {
    'use strict';
    
    let speechSynth = window.speechSynthesis;
    let currentUtterance = null;
    let isReading = false;
    let hoverReadEnabled = false;
    let hoverTimeout = null;
    
    // Initialize after page loads
    setTimeout(initAccessibility, 1000);
    
    function initAccessibility() {
        console.log('Initializing accessibility with hover reading...');
        
        const trigger = document.getElementById('accessibilityTrigger');
        const menu = document.getElementById('accessibilityMenu');
        const overlay = document.getElementById('accessibilityOverlay');
        
        if (!trigger || !menu) {
            console.error('Accessibility elements not found!');
            return;
        }
        
        // ===== DROPDOWN TOGGLE =====
        trigger.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopImmediatePropagation();
            
            // Toggle menu
            const isShowing = menu.classList.toggle('show');
            
            // Show overlay only on mobile
            if (window.innerWidth < 768 && overlay) {
                overlay.classList.toggle('show', isShowing);
            }
            
            // Close other dropdowns
            closeOtherDropdowns(menu);
        });
        
        // ===== CLOSE BUTTON =====
        const closeBtn = document.querySelector('.close-accessibility');
        if (closeBtn) {
            closeBtn.addEventListener('click', function(e) {
                e.preventDefault();
                closeMenu();
            });
        }
        
        // ===== OVERLAY CLICK (Mobile only) =====
        if (overlay) {
            overlay.addEventListener('click', function(e) {
                e.preventDefault();
                closeMenu();
            });
        }
        
        // ===== PAGE READ BUTTON =====
        const pageReadBtn = document.getElementById('pageReadBtn');
        if (pageReadBtn) {
            pageReadBtn.addEventListener('click', function(e) {
                e.preventDefault();
                startPageReading();
                closeMenu();
            });
        }
        
        // ===== STOP BUTTON =====
        const stopBtn = document.getElementById('stopReadBtn');
        if (stopBtn) {
            stopBtn.addEventListener('click', function(e) {
                e.preventDefault();
                stopReading();
            });
        }
        
        // ===== HOVER READ TOGGLE =====
        const hoverReadToggle = document.getElementById('clickReadToggle');
        if (hoverReadToggle) {
            // Change label to "Hover to Read"
            const label = hoverReadToggle.closest('.acc-feature').querySelector('span');
            if (label) label.textContent = 'Hover to Read (after Page Read)';
            
            hoverReadToggle.addEventListener('change', function(e) {
                hoverReadEnabled = e.target.checked;
                showNotice(hoverReadEnabled ? 'Hover-to-read enabled' : 'Hover-to-read disabled');
            });
        }
        
        // ===== SETUP HOVER READING =====
        setupHoverReading();
        
        // ===== FONT SIZE BUTTONS =====
        document.addEventListener('click', function(e) {
            if (e.target.classList.contains('font-size-btn')) {
                e.preventDefault();
                const size = e.target.id.replace('font', '').toLowerCase();
                changeFontSize(size);
            }
        });
        
        // ===== CLICK OUTSIDE TO CLOSE =====
        document.addEventListener('click', function(e) {
            if (!trigger.contains(e.target) && !menu.contains(e.target)) {
                closeMenu();
            }
        });
        
        // ===== ESCAPE KEY =====
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape') {
                closeMenu();
                stopReading();
            }
        });
        
        console.log('Accessibility initialized with hover reading');
    }
    
    function setupHoverReading() {
        // Add hover listeners to the document
        document.addEventListener('mouseover', handleMouseOver);
        document.addEventListener('mouseout', handleMouseOut);
    }
    
    function handleMouseOver(e) {
        if (!hoverReadEnabled || !isReading) return;
        
        // Skip if hovering over accessibility controls
        if (e.target.closest('.accessibility-menu') || 
            e.target.closest('.screen-reader-status') ||
            e.target.closest('#accessibilityTrigger')) {
            return;
        }
        
        clearTimeout(hoverTimeout);
        
        const element = e.target;
        const text = getReadableText(element);
        
        if (text) {
            // Add visual feedback
            element.classList.add('hover-reading');
            
            // Read after 1 second of hovering
            hoverTimeout = setTimeout(() => {
                readText(text);
                element.classList.remove('hover-reading');
            }, 1000);
        }
    }
    
    function handleMouseOut(e) {
        clearTimeout(hoverTimeout);
        
        // Remove hover highlight
        if (e.target.classList.contains('hover-reading')) {
            e.target.classList.remove('hover-reading');
        }
    }
    
    function getReadableText(element) {
        // Skip interactive elements and empty text
        const tagName = element.tagName.toLowerCase();
        if (['button', 'a', 'input', 'select', 'textarea', 'label', 'img'].includes(tagName)) {
            return null;
        }
        
        // Skip elements with very short text
        let text = element.textContent || element.innerText || '';
        text = text.trim().replace(/\s+/g, ' ');
        
        // Minimum 10 characters, maximum 200 for hover reading
        if (text.length < 10 || text.length > 200) return null;
        
        return text;
    }
    
    function startPageReading() {
        if (isReading) {
            stopReading();
            return;
        }
        
        isReading = true;
        hoverReadEnabled = true;
        
        // Update UI
        const pageReadBtn = document.getElementById('pageReadBtn');
        if (pageReadBtn) pageReadBtn.classList.add('active');
        
        const hoverReadToggle = document.getElementById('clickReadToggle');
        if (hoverReadToggle) hoverReadToggle.checked = true;
        
        const statusPanel = document.getElementById('screenReaderStatus');
        if (statusPanel) statusPanel.classList.add('active');
        
        showNotice('Page reading started. Hover over any text to read it.', 'success');
        
        // Read welcome message
        readText('Accessibility mode activated. Now hover over any text on the page to hear it read aloud.');
    }
    
    function readText(text) {
        // Stop current reading
        if (currentUtterance) {
            speechSynth.cancel();
        }
        
        // Create new utterance
        currentUtterance = new SpeechSynthesisUtterance(text);
        
        // Set properties
        const rate = document.getElementById('speechRate') ? document.getElementById('speechRate').value : 1;
        const volume = document.getElementById('speechVolume') ? document.getElementById('speechVolume').value : 1;
        
        currentUtterance.rate = parseFloat(rate);
        currentUtterance.volume = parseFloat(volume);
        currentUtterance.pitch = 1;
        
        // Show progress
        updateProgress(true);
        
        // Event handlers
        currentUtterance.onstart = () => {
            updateProgress(true);
        };
        
        currentUtterance.onend = () => {
            updateProgress(false);
        };
        
        currentUtterance.onerror = (e) => {
            console.error('Speech error:', e);
            updateProgress(false);
        };
        
        // Speak
        try {
            speechSynth.speak(currentUtterance);
        } catch (error) {
            console.error('Error speaking:', error);
        }
    }
    
    function stopReading() {
        if (currentUtterance) {
            speechSynth.cancel();
        }
        
        isReading = false;
        hoverReadEnabled = false;
        
        // Update UI
        const pageReadBtn = document.getElementById('pageReadBtn');
        if (pageReadBtn) pageReadBtn.classList.remove('active');
        
        const hoverReadToggle = document.getElementById('clickReadToggle');
        if (hoverReadToggle) hoverReadToggle.checked = false;
        
        const statusPanel = document.getElementById('screenReaderStatus');
        if (statusPanel) statusPanel.classList.remove('active');
        
        updateProgress(false);
        
        // Clear hover timeout
        clearTimeout(hoverTimeout);
        
        // Remove all highlights
        document.querySelectorAll('.hover-reading, .click-highlight').forEach(el => {
            el.classList.remove('hover-reading', 'click-highlight');
        });
        
        showNotice('Stopped reading');
    }
    
    function updateProgress(show) {
        const progressBar = document.getElementById('speechProgressBar');
        if (progressBar) {
            if (show) {
                progressBar.style.width = '100%';
                progressBar.style.transition = 'width 30s linear';
            } else {
                progressBar.style.width = '0%';
                progressBar.style.transition = 'width 0.3s ease';
            }
        }
    }
    
    function changeFontSize(size) {
        // Remove all font size classes from html
        document.documentElement.classList.remove(
            'font-size-small',
            'font-size-medium', 
            'font-size-large',
            'font-size-xlarge',
            'font-size-xxlarge'
        );
        
        // Add new size
        document.documentElement.classList.add(`font-size-${size}`);
        
        // Update button states
        const sizes = ['small', 'medium', 'large', 'xlarge', 'xxlarge'];
        sizes.forEach(s => {
            const btn = document.getElementById(`font${s.charAt(0).toUpperCase() + s.slice(1)}`);
            if (btn) {
                btn.classList.remove('active');
                if (s === size) {
                    btn.classList.add('active');
                }
            }
        });
        
        // Update label
        const label = document.getElementById('currentFontSize');
        if (label) {
            label.textContent = size.charAt(0).toUpperCase() + size.slice(1);
        }
        
        showNotice(`Font size changed to ${size}`, 'success');
    }
    
    function closeMenu() {
        const menu = document.getElementById('accessibilityMenu');
        const overlay = document.getElementById('accessibilityOverlay');
        
        if (menu) menu.classList.remove('show');
        if (overlay) overlay.classList.remove('show');
    }
    
    function closeOtherDropdowns(currentMenu) {
        // Close any other open dropdowns
        document.querySelectorAll('.accessibility-menu.show').forEach(menu => {
            if (menu !== currentMenu) {
                menu.classList.remove('show');
            }
        });
    }
    
    function showNotice(message, type = 'info') {
        const notice = document.getElementById('accessibilityNotice');
        if (!notice) return;
        
        notice.textContent = message;
        notice.className = 'accessibility-notice';
        
        if (type === 'error') {
            notice.classList.add('error');
        } else if (type === 'success') {
            notice.classList.add('success');
        }
        
        notice.style.display = 'block';
        
        setTimeout(() => {
            notice.style.display = 'none';
        }, 3000);
    }
})();



// Debug code - Keep this at the VERY END
setTimeout(function() {
    console.log('=== ACCESSIBILITY DEBUG ===');
    
    const trigger = document.getElementById('accessibilityTrigger');
    const menu = document.getElementById('accessibilityMenu');
    
    if (trigger && menu) {
        console.log('✅ Elements found');
        console.log('Trigger position:', trigger.getBoundingClientRect());
        console.log('Menu will drop from trigger position');
        
        // Force show menu for testing (dropdown style)
        setTimeout(function() {
            console.log('DEBUG: Showing dropdown menu...');
            menu.classList.add('show');
            
            // Position it correctly
            const triggerRect = trigger.getBoundingClientRect();
            menu.style.top = (triggerRect.bottom + 10) + 'px';
            menu.style.right = (window.innerWidth - triggerRect.right) + 'px';
        }, 2000);
    } else {
        console.error('❌ Elements not found!');
    }
}, 1000);






  // Optional JavaScript for better mobile interaction
        document.addEventListener('DOMContentLoaded', function() {
            // Add touch feedback for mobile
            const touchElements = document.querySelectorAll('.doc-item, .quicklink, .additional-doc, .scores-btn, .odr-btn, .evoting-btn');
            
            touchElements.forEach(element => {
                element.addEventListener('touchstart', function() {
                    this.style.transition = 'transform 0.1s ease';
                    this.style.transform = 'scale(0.98)';
                });
                
                element.addEventListener('touchend', function() {
                    this.style.transform = 'scale(1)';
                });
            });
            
            // Improve long tap on mobile
            touchElements.forEach(element => {
                element.addEventListener('contextmenu', function(e) {
                    e.preventDefault();
                });
            });
        });
/* ============================================
   CHANDRASHEKAR BALA - CYBERSECURITY PORTFOLIO
   ============================================ */

// ===== INITIALIZATION =====
document.addEventListener('DOMContentLoaded', () => {
    initMatrixRain();
    initParticleSystem();
    initCustomCursor();
    initThemeSystem();
    initNavigation();
    initScrollReveal();
    initCounterAnimation();
    initProgressBars();
    initGlitchEffect();
    initTypewriterEffect();
    initTiltEffect();
    initParallaxEffect();
    initSmoothScroll();
    initScrollIndicator();
    initBackToTop();
    initConsoleEasterEgg();
    initActiveNavHighlight();
    initFloatingElements();
    initHoverGlow();
    initArsenalAccordion();
});

function initArsenalAccordion() {
    const blocks = document.querySelectorAll('.arsenal-block');
    if (!blocks.length) return;
    function isMobile() { return window.innerWidth <= 680; }
    blocks.forEach(block => {
        block.classList.remove('open');
        const title = block.querySelector('.arsenal-main-title');
        const categories = block.querySelector('.arsenal-categories');
        if (!title || !categories) return;
        if (!title.querySelector('.arsenal-toggle-icon')) {
            const icon = document.createElement('i');
            icon.className = 'fas fa-chevron-down arsenal-toggle-icon';
            title.appendChild(icon);
        }
        title.setAttribute('role', 'button');
        title.setAttribute('tabindex', '0');
        title.addEventListener('click', () => {
            if (!isMobile()) return;
            block.classList.toggle('open');
            update(block, categories);
        });
        title.addEventListener('keydown', (e) => {
            if (!isMobile()) return;
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                block.classList.toggle('open');
                update(block, categories);
            }
        });
        categories.style.transition = 'max-height 320ms ease';
        categories.style.overflow = 'hidden';
    });
    function update(block, categories) {
        const title = block.querySelector('.arsenal-main-title');
        const icon = title.querySelector('.arsenal-toggle-icon');
        if (block.classList.contains('open')) {
            categories.style.maxHeight = categories.scrollHeight + 'px';
            title.setAttribute('aria-expanded', 'true');
            if (icon) icon.style.transform = 'rotate(180deg)';
        } else {
            categories.style.maxHeight = '0px';
            title.setAttribute('aria-expanded', 'false');
            if (icon) icon.style.transform = '';
        }
    }
    function handleResize() {
        blocks.forEach(block => {
            const categories = block.querySelector('.arsenal-categories');
            const title = block.querySelector('.arsenal-main-title');
            if (!categories || !title) return;
            if (!isMobile()) {
                block.classList.add('open');
                categories.style.maxHeight = '';
                title.removeAttribute('aria-expanded');
                const icon = title.querySelector('.arsenal-toggle-icon');
                if (icon) icon.style.transform = '';
            } else {
                if (!block.classList.contains('open')) {
                    categories.style.maxHeight = '0px';
                    title.setAttribute('aria-expanded', 'false');
                } else {
                    update(block, categories);
                }
            }
        });
    }
    window.addEventListener('resize', handleResize);
    handleResize();
}

// ===== 1. MATRIX RAIN (ENHANCED) =====
function initMatrixRain() {
    const canvas = document.getElementById('matrixRain');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    
    function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
    
    resizeCanvas();
    
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbols = '@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const chars = (katakana + latin + nums + symbols).split('');
    
    const fontSize = 14;
        // leave padding on both sides so rain doesn't draw flush at the edges
        const horizontalPadding = Math.max(8, Math.floor(fontSize / 1.5));
        let columns = Math.floor((canvas.width - horizontalPadding * 2) / fontSize);
        let drops = Array(columns).fill(1);
    let frameCount = 0;
    
    window.addEventListener('resize', () => {
        resizeCanvas();
            columns = Math.floor((canvas.width - horizontalPadding) / fontSize);
        drops = Array(columns).fill(1);
    });
    
    function draw() {
        frameCount++;
        
        // Fade effect for trail
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize + horizontalPadding;
            // skip columns that would render too close to the right edge
            if (x < horizontalPadding || x > canvas.width - horizontalPadding - fontSize) continue;
            const y = drops[i] * fontSize;
            
            // Head character - bright green
            ctx.fillStyle = '#00ff41';
            ctx.font = `bold ${fontSize}px "Fira Code", monospace`;
            ctx.fillText(text, x, y);
            
            // Glow effect on head
            ctx.shadowColor = '#00ff41';
            ctx.shadowBlur = 6;
            ctx.fillText(text, x, y);
            ctx.shadowBlur = 0;
            
            // Trail characters - fading
            for (let j = 1; j < 5; j++) {
                const trailY = y - j * fontSize;
                if (trailY > 0) {
                    const opacity = 1 - (j * 0.2);
                    ctx.fillStyle = `rgba(0, 255, 65, ${opacity * 0.5})`;
                    ctx.font = `${fontSize}px "Fira Code", monospace`;
                    const trailChar = chars[Math.floor(Math.random() * chars.length)];
                    ctx.fillText(trailChar, x, trailY);
                }
            }
            
            // Reset drop
            if (y > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            // Random speed variation
            drops[i] += Math.random() > 0.1 ? 1 : 2;
        }
        
        // Occasional bright flash
        if (frameCount % 120 === 0) {
            ctx.fillStyle = 'rgba(0, 255, 65, 0.03)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        
        requestAnimationFrame(draw);
    }
    
    draw();
}

// ===== 2. PARTICLE SYSTEM =====
function initParticleSystem() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 0;
        overflow: hidden;
    `;
    hero.insertBefore(particleContainer, hero.firstChild);
    
    const particles = [];
    const particleCount = 50;
    
    for (let i = 0; i < particleCount; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 3 + 1;
        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: var(--accent-green);
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            opacity: ${Math.random() * 0.5 + 0.1};
            animation: float ${Math.random() * 10 + 10}s linear infinite;
            animation-delay: ${Math.random() * 5}s;
            box-shadow: 0 0 ${size * 3}px var(--accent-green-glow);
        `;
        particleContainer.appendChild(particle);
        particles.push({
            element: particle,
            x: Math.random() * 100,
            y: Math.random() * 100,
            speedX: (Math.random() - 0.5) * 0.3,
            speedY: (Math.random() - 0.5) * 0.3,
        });
    }
    
    // Animate particles
    function animateParticles() {
        particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            
            if (p.x > 100) p.x = 0;
            if (p.x < 0) p.x = 100;
            if (p.y > 100) p.y = 0;
            if (p.y < 0) p.y = 100;
            
            p.element.style.left = p.x + '%';
            p.element.style.top = p.y + '%';
        });
        requestAnimationFrame(animateParticles);
    }
    
    animateParticles();
}

// ===== 3. CUSTOM CURSOR GLOW =====
function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `
        position: fixed;
        width: 300px;
        height: 300px;
        border-radius: 50%;
        pointer-events: none;
        z-index: 9999;
        background: radial-gradient(circle, rgba(0,255,65,0.03) 0%, transparent 70%);
        transform: translate(-50%, -50%);
        transition: opacity 0.3s;
        display: none;
    `;
    document.body.appendChild(cursor);
    
    let mouseX = 0, mouseY = 0;
    let cursorX = 0, cursorY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursor.style.display = 'block';
    });
    
    document.addEventListener('mouseleave', () => {
        cursor.style.display = 'none';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.display = 'block';
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
}

// ===== 4. THEME SYSTEM =====
function initThemeSystem() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const themeIcon = themeToggle?.querySelector('i');
    
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) {
            themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        }
        // Add transition class
        document.body.classList.add('theme-transitioning');
        setTimeout(() => document.body.classList.remove('theme-transitioning'), 500);
    }
    
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        setTheme(savedTheme);
    } else {
        setTheme(window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    }
    
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    themeToggle?.addEventListener('click', () => {
        const current = html.getAttribute('data-theme');
        setTheme(current === 'dark' ? 'light' : 'dark');
    });
}

// ===== 5. NAVIGATION =====
function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    
    // Mobile menu
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    
    // Close on click
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navLinks?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
    
    // Navbar hide/show on scroll
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 100) {
                navbar.style.background = 'rgba(10, 10, 11, 0.95)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 4px 30px rgba(0,0,0,0.3)';
            } else {
                navbar.style.background = 'rgba(10, 10, 11, 0.8)';
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = 'none';
            }
        }
        
        lastScroll = currentScroll;
    });
}

// ===== 6. SCROLL REVEAL (ENHANCED) =====
function initScrollReveal() {
    const revealElements = document.querySelectorAll(`
        .project-card, .cert-card, .achievement-card, .focus-card,
        .arsenal-cat, .role-card, .info-card, .training-card,
        .exp-card, .repo-card, .edu-card, .connect-link,
        .comp-table tbody tr, .arsenal-block, .about-terminal,
        .profile-container, .terminal-mini
    `);
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0) scale(1)';
                    entry.target.style.filter = 'blur(0)';
                }, delay);
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -30px 0px'
    });
    
    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(40px) scale(0.95)';
        el.style.filter = 'blur(5px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
        el.dataset.delay = (index % 3) * 100;
        observer.observe(el);
    });
}

function handleResumeClick(event, download = false) {
    event.preventDefault();

    const resumeUrl = 'assets/resume.pdf';
    const connectSection = document.getElementById('connect');

    fetch(resumeUrl, { method: 'HEAD' })
        .then(response => {
            if (response.ok) {
                if (download) {
                const link = document.createElement('a');
                link.href = resumeUrl;
                link.download = 'Chandrashekar_Bala_Resume.pdf';
                document.body.appendChild(link);
                link.click();
                link.remove();
            } else {
                window.open(resumeUrl, '_blank', 'noopener');
            }
            } else if (connectSection) {
                connectSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                showResumeNotice();
            }
        })
        .catch(() => {
            if (connectSection) {
                connectSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                showResumeNotice();
            }
        });
}

function showResumeNotice() {
    const existing = document.querySelector('.resume-toast');
    if (existing) return;
    const toast = document.createElement('div');
    toast.className = 'resume-toast';
    toast.setAttribute('role', 'status');
    toast.innerHTML = '<strong>Resume is being updated.</strong><span>I am currently refreshing the PDF to include the latest project work and portfolio updates. The newest version will be available here once the update is complete.</span>';
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));
    setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 6500);
}

// ===== 7. COUNTER ANIMATION =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const rawValue = el.getAttribute('data-count') || '';
                const target = parseInt(rawValue, 10);
                const duration = 2000;
                const suffix = rawValue.includes('+') ? '+' : '';
                let start = 0;
                const startTime = performance.now();
                
                function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    // Ease out cubic
                    const eased = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(eased * target);
                    
                    el.textContent = current + suffix;
                    
                    if (progress < 1) {
                        requestAnimationFrame(update);
                    } else {
                        el.textContent = target + suffix;
                    }
                }
                
                requestAnimationFrame(update);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    
    counters.forEach(counter => observer.observe(counter));
}

// ===== 8. PROGRESS BARS =====
function initProgressBars() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.bar-fill, .progress-fill');
                fills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    fill.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    setTimeout(() => {
                        fill.style.width = width;
                    }, 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    
    document.querySelectorAll('.activity-bars, .focus-grid').forEach(el => observer.observe(el));
}

// ===== 9. GLITCH EFFECT =====
function initGlitchEffect() {
    const glitchElements = document.querySelectorAll('.hero-name, .logo-text, .section-title');
    
    glitchElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animation = 'glitch 0.3s ease-in-out';
            setTimeout(() => {
                el.style.animation = '';
            }, 300);
        });
    });
}

// ===== 10. TYPEWRITER EFFECT =====
function initTypewriterEffect() {
    const heroMission = document.querySelector('.hero-mission');
    if (!heroMission) return;
    
    const originalText = heroMission.textContent;
    heroMission.textContent = '';
    heroMission.style.borderRight = '2px solid var(--accent-green)';
    
    let i = 0;
    function type() {
        if (i < originalText.length) {
            heroMission.textContent += originalText.charAt(i);
            i++;
            setTimeout(type, 25 + Math.random() * 25);
        } else {
            heroMission.style.borderRight = 'none';
        }
    }
    
    const observer = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting) {
            setTimeout(type, 500);
            observer.unobserve(heroMission);
        }
    }, { threshold: 0.5 });
    
    observer.observe(heroMission);
}

// ===== 11. TILT EFFECT ON CARDS =====
function initTiltEffect() {
    const cards = document.querySelectorAll('.project-card, .cert-card, .focus-card, .role-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / centerY * -5;
            const rotateY = (x - centerX) / centerX * 5;
            
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
            card.style.boxShadow = `
                0 20px 40px rgba(0,0,0,0.3),
                ${x/rect.width * 20 - 10}px ${y/rect.height * 20 - 10}px 30px rgba(0,255,65,0.1)
            `;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
            card.style.boxShadow = '';
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => {
                card.style.transition = '';
            }, 500);
        });
    });
}

// ===== 12. PARALLAX EFFECT =====
function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-right, .profile-ring');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        
        parallaxElements.forEach(el => {
            const speed = el.classList.contains('profile-ring') ? 1.5 : 0.5;
            el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
            el.style.transition = 'transform 0.1s ease-out';
        });
    });
}

// ===== 13. SCROLL INDICATOR =====
function initScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;

    let dismissed = window.pageYOffset > 20;

    const dismissOnScroll = () => {
        if (!dismissed && window.pageYOffset > 20) {
            dismissed = true;
            indicator.classList.add('hidden');
        }
    };

    if (dismissed) indicator.classList.add('hidden');
    window.addEventListener('scroll', dismissOnScroll, { passive: true });
}

// ===== 14. SMOOTH SCROLL =====
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') {
                window.scrollTo({ top: 0, behavior: 'smooth' });
                return;
            }
            const target = document.querySelector(targetId);
            if (target) {
                const offset = 80;
                const position = target.getBoundingClientRect().top + window.pageYOffset - offset;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });
}

// ===== 15. BACK TO TOP =====
function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            btn.classList.add('visible');
        } else {
            btn.classList.remove('visible');
        }
    });
    
    btn.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
}

// ===== 15. ACTIVE NAV HIGHLIGHT =====
function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            if (window.pageYOffset >= sectionTop) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });
}

// ===== 16. FLOATING ELEMENTS =====
function initFloatingElements() {
    const floatingElements = document.querySelectorAll('.project-icon, .cert-icon-cert, .focus-icon');
    
    floatingElements.forEach((el, index) => {
        el.style.animation = `floatIcon ${3 + index % 3}s ease-in-out infinite`;
        el.style.animationDelay = `${index * 0.2}s`;
    });
}

// ===== 17. HOVER GLOW EFFECT =====
function initHoverGlow() {
    const glowElements = document.querySelectorAll('.btn-primary, .connect-link, .social-btn');
    
    glowElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.boxShadow = '0 0 30px var(--accent-green-glow)';
        });
        el.addEventListener('mouseleave', () => {
            el.style.boxShadow = '';
        });
    });
}

// ===== 18. CONSOLE EASTER EGG =====
function initConsoleEasterEgg() {
    const styles = [
        'color: #00ff41; font-size: 14px; font-weight: bold;',
        'color: #0ea5e9; font-size: 12px;',
        'color: #a855f7; font-size: 12px;',
        'color: #ef4444; font-size: 12px;',
        'color: #eab308; font-size: 12px;',
    ];
    
    console.log('%c╔══════════════════════════════════════════╗', styles[0]);
    console.log('%c║   CHANDRASHEKAR BALA - PORTFOLIO         ║', styles[0]);
    console.log('%c╚══════════════════════════════════════════╝', styles[0]);
    console.log('%c🔒 Cybersecurity Professional', styles[1]);
    console.log('%c🎯 Penetration Tester | Adversary Researcher', styles[2]);
    console.log('%c💻 github.com/Chandrashekar-Bala', styles[3]);
    console.log('%c📧 chandrashekar-bala@protonmail.com', styles[4]);
    console.log('%c👋 Thanks for checking out the code! Stay secure. 🔐', styles[1]);
}

// ===== KEYBOARD SHORTCUTS =====
document.addEventListener('keydown', (e) => {
    if (e.key === 't' && e.ctrlKey) {
        e.preventDefault();
        document.querySelector('.theme-toggle')?.click();
    }
    if (e.key === 'Escape') {
        document.querySelector('.nav-links')?.classList.remove('active');
        document.querySelector('.hamburger')?.classList.remove('active');
    }
});

// ===== PERFORMANCE OBSERVER =====
if ('PerformanceObserver' in window) {
    try {
        const perfObserver = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.entryType === 'largest-contentful-paint') {
                    console.log(`%c⚡ LCP: ${entry.startTime.toFixed(0)}ms`, 'color: #00ff41;');
                }
            }
        });
        perfObserver.observe({ type: 'largest-contentful-paint', buffered: true });
    } catch (_) { /* Optional browser API. */ }
}


/* ===== FINAL PROJECT INTERACTIONS ===== */
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('.projects-grid .project-card');
    filterButtons.forEach(button => button.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        projectCards.forEach(card => {
            const categories = (card.dataset.category || '').split(/\s+/);
            card.classList.toggle('project-hidden', filter !== 'all' && !categories.includes(filter));
        });
    }));

    const jumpToProjects = (filter = 'all') => {
        const projects = document.getElementById('projects');
        const targetButton = document.querySelector(`.project-filter[data-filter="${filter}"]`);
        if (targetButton) targetButton.click();
        if (projects) projects.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };

    document.querySelectorAll('[data-project-filter]').forEach(button => {
        button.addEventListener('click', () => jumpToProjects(button.dataset.projectFilter || 'all'));
    });

    const threatButton = document.querySelector('[data-project-key="threat"]');
    if (threatButton) {
        threatButton.addEventListener('click', () => {
            const projects = document.getElementById('projects');
            const target = document.querySelector('.project-card[data-project="threat"] .project-open');
            if (projects) projects.scrollIntoView({ behavior: 'smooth', block: 'start' });
            setTimeout(() => target?.click(), 450);
        });
    }

    const modal = document.getElementById('projectModal');
    const content = document.getElementById('modalContent');
    if (!modal || !content) return;
    const details = {
        driver: {kicker:'Linux Kernel · Driver Compatibility', title:'RTL8812BU Linux Driver — Kernel Compatibility Work', body:`<p>Modified and tested an upstream RTL8812BU/RTL8822BU Linux USB Wi-Fi driver to address compatibility issues with newer Linux kernel APIs and the target Kali Linux environment.</p><h4>My contribution</h4><ul><li>Compared the upstream codebase with the modified version to identify compatibility-sensitive changes.</li><li>Updated affected interfaces involving filesystem access, timers, USB callbacks, and regulatory-related kernel APIs.</li><li>Built and tested the modified driver and verified its behavior with the target TP-Link Archer T4U v3 hardware.</li><li>Preserved upstream attribution and retained the original documentation separately for traceability.</li></ul><div class="modal-meta"><span>Upstream: morrownr/88x2bu-20210702</span><span>Hardware: TP-Link Archer T4U v3 · 2357:0115</span><span>Target: Kali Linux 7.0.12+kali-amd64</span></div><div class="modal-links"><a class="modal-source" href="https://github.com/Chandrashekar-Bala/RTL8812BU-Linux-7.0.12" target="_blank" rel="noopener noreferrer">View my repository <i class="fab fa-github"></i></a><a class="modal-source" href="https://github.com/morrownr/88x2bu-20210702" target="_blank" rel="noopener noreferrer">View upstream repository <i class="fas fa-external-link-alt"></i></a></div>`},
        website: {kicker:'Web Development · Portfolio Engineering', title:'Cybersecurity Portfolio Website', body:`<p>Created and developed this portfolio website as a working technical project rather than a static résumé page. The implementation combines a terminal-inspired cybersecurity interface with responsive layouts, structured project content, interactive filtering, project-detail modals, theme switching, accessible controls, and GitHub/GitHub Pages integration.</p><h4>What I developed</h4><ul><li>Built the semantic HTML structure and organized the portfolio around cybersecurity competencies, projects, labs, experience, certifications, education, achievements, focus areas, and contact.</li><li>Developed the responsive CSS system, dark/light themes, card layouts, mobile navigation, animations, reduced-motion handling, and visual states.</li><li>Implemented JavaScript interactions including theme persistence, navigation behavior, scroll effects, project filtering, technical-detail modals, terminal interactions, counters, and UI feedback.</li><li>Added accessibility-oriented details such as focus states, ARIA labels/roles, keyboard interaction, reduced-motion support, and mobile-friendly controls.</li><li>Added SEO/social metadata, external-link protections, performance-conscious effects, and a GitHub Pages-ready static deployment structure.</li></ul><h4>Skills &amp; Technologies</h4><div class="modal-meta"><span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>Responsive Web Design</span><span>Accessibility</span><span>SEO</span><span>Git &amp; GitHub</span><span>GitHub Pages</span></div><a class="modal-source" href="https://github.com/Chandrashekar-Bala" target="_blank" rel="noopener noreferrer">View GitHub profile <i class="fas fa-external-link-alt"></i></a>`},
        network: {kicker:'Network Security · Lab', title:'Enterprise Network Penetration Testing Lab', body:`<p>Practiced a structured penetration-testing workflow across Windows and Linux targets, moving from reconnaissance and enumeration through controlled exploitation, privilege-escalation practice, post-exploitation, and reporting.</p><h4>Tooling</h4><ul><li>Nmap and Nessus for reconnaissance and vulnerability assessment</li><li>Metasploit for controlled exploitation and post-exploitation workflows</li><li>Wireshark for traffic inspection and supporting analysis</li><li>Linux and Windows environments for target-side validation</li></ul>`},
        web: {kicker:'Web Security · PortSwigger', title:'Web Application Security Assessment Lab', body:`<p>Completed 40+ PortSwigger Web Security Academy labs covering common web application vulnerabilities and hands-on testing workflows.</p><h4>Coverage</h4><ul><li>SQL injection, XSS, CSRF and SSRF</li><li>Authentication and access-control weaknesses</li><li>Request manipulation and parameter handling</li><li>Exploitation notes and remediation-oriented thinking</li></ul><a class="modal-source" href="https://portswigger.net/web-security" target="_blank" rel="noopener noreferrer">View PortSwigger Web Security Academy <i class="fas fa-external-link-alt"></i></a>`},
        android: {kicker:'Mobile Security · Android', title:'Android Security Analysis Toolkit', body:`<p>Practiced Android application analysis using static and dynamic techniques, combining APK inspection, decompilation, runtime logging, and application-behavior analysis.</p><h4>Tooling</h4><ul><li>Dex2jar and JD-GUI for decompilation and code inspection</li><li>Drozer for dynamic security-testing practice</li><li>Logcat for runtime observation and troubleshooting</li><li>Android Studio for application and emulator workflows</li></ul>`},
        buffer: {kicker:'Exploit Development · Controlled Lab', title:'Buffer Overflow Exploit Development Lab', body:`<p>Performed stack-based buffer-overflow analysis in controlled Linux and Windows environments, using debugger-assisted analysis to inspect memory layout and control-flow behavior.</p><h4>Tooling</h4><ul><li>GDB for Linux debugging and memory inspection</li><li>WinDbg for Windows-side analysis</li><li>C for understanding low-level memory behavior</li><li>msfvenom and related tooling for controlled payload-generation exercises</li></ul>`},
        wireless: {kicker:'Wireless Security · Lab', title:'Wireless Security Assessment Lab', body:`<p>Practiced wireless assessment workflows in controlled environments, including discovery, packet capture, protocol analysis, and security testing of common Wi-Fi configurations.</p><h4>Tooling</h4><ul><li>Aircrack-ng for wireless security testing</li><li>Wireshark for packet analysis</li><li>Monitor mode and controlled deauthentication testing</li><li>Traffic observation and wireless attack-surface analysis</li></ul>`},
        threat: {kicker:'Defensive Security · Threat Hunting', title:'Network Traffic Analysis & Threat Hunting', body:`<p>Analyzed network traffic to identify suspicious patterns, indicators, and potential command-and-control behavior, then translated observations into defensive investigation and threat-hunting exercises.</p><h4>Focus</h4><ul><li>Packet and protocol analysis</li><li>IOC identification and contextual analysis</li><li>Threat-hunting hypotheses</li><li>MITRE ATT&amp;CK-aligned defensive thinking</li></ul>`},
        vulnhub: {kicker:'Offensive Security · VulnHub', title:'Vulnerability Assessment & Privilege Escalation', body:`<p>Worked through vulnerable virtual machines to practice enumeration, vulnerability identification, exploit validation, post-exploitation, and privilege-escalation workflows in controlled lab environments.</p><h4>Tooling</h4><ul><li>Nmap for service enumeration</li><li>Metasploit for controlled exploit validation</li><li>Linux and Windows privilege-escalation techniques</li><li>VulnHub machines for repeatable practice</li></ul>`},
    };
    const open = key => { const item=details[key]; if(!item) return; content.innerHTML=`<span class="modal-kicker">${item.kicker}</span><h2 id="modalTitle">${item.title}</h2><div class="modal-body">${item.body}</div>`; modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); };
    const close = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); };
    document.querySelectorAll('.project-open').forEach(button => button.addEventListener('click', () => open(button.closest('.project-card')?.dataset.project)));
    modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', close));
    document.addEventListener('keydown', event => { if(event.key === 'Escape' && modal.classList.contains('open')) close(); });
});

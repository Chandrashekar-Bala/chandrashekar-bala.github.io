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


/* ===== FINAL PROJECT + ARSENAL INTERACTIONS ===== */
document.addEventListener('DOMContentLoaded', () => {
    // Project filtering — includes featured and comprehensive project cards.
    const filterButtons = document.querySelectorAll('.project-filter');
    const projectCards = document.querySelectorAll('#projects .project-card');
    const jumpToProjects = (filter = 'all') => {
        const projects = document.getElementById('projects');
        const targetButton = document.querySelector(`.project-filter[data-filter="${filter}"]`);
        if (targetButton) targetButton.click();
        if (projects) projects.scrollIntoView({ behavior: 'smooth', block: 'start' });
    };
    filterButtons.forEach(button => button.addEventListener('click', () => {
        filterButtons.forEach(b => b.classList.remove('active'));
        button.classList.add('active');
        const filter = button.dataset.filter;
        projectCards.forEach(card => {
            const categories = (card.dataset.category || '').split(/\s+/);
            const matches = filter === 'all' || categories.includes(filter);
            card.classList.toggle('project-hidden', !matches);
            if (matches && card.classList.contains('case-secondary')) card.style.display = filter === 'all' ? '' : 'block';
            if (!matches) card.style.display = 'none';
        });
        const toggle = document.getElementById('caseIndexToggle');
        if (toggle && filter !== 'all') { toggle.style.display = 'none'; } else if (toggle) { toggle.style.display = 'inline-flex'; }
    }));
    document.querySelectorAll('[data-project-filter]').forEach(button => {
        button.addEventListener('click', () => jumpToProjects(button.dataset.projectFilter || 'all'));
    });

    // Project detail modal.
    const modal = document.getElementById('projectModal');
    const content = document.getElementById('modalContent');
    const projectDetails = {
        mediroza: {kicker:'Authorized External Assessment · Authorized Assessment', title:'Mediroza Web Application Security Assessment', body:`<p>An authorized black-box web application assessment documented as a technical security investigation rather than a claim of real-world compromise.</p><h4>Attack path</h4><div class="attack-path"><span>Recon</span><b>→</b><span>SQL Injection</span><b>→</b><span>Authentication Bypass</span><b>→</b><span>Patient Portal</span><b>→</b><span>Protected Report Retrieval</span></div><h4>Documented findings</h4><ul><li>08 findings spanning directory exposure, database backup exposure, SQL injection, verbose error disclosure, sensitive report retrieval, predictable storage, log metadata disclosure, and server fingerprinting.</li><li>Highest documented severity: CVSS 9.8 / CWE-89 for the demonstrated SQL injection authentication-bypass chain.</li><li>Manual differential testing, Burp evidence, browser behavior, and application responses were used when automated SQLi confirmation was inconclusive.</li></ul><h4>Evidence &amp; remediation</h4><ul><li>65 source evidence files, 58 unique SHA-256 contents, and 25 screenshots were preserved and organized for traceability.</li><li>Findings were translated into root cause, impact, CVSS/CWE context, remediation recommendations, and retest considerations.</li><li>Public materials intentionally exclude passwords, patient documents, raw sensitive databases, and other restricted evidence.</li></ul><div class="modal-meta"><span>Black-box</span><span>Burp Suite</span><span>Nmap</span><span>CVSS / CWE</span><span>Evidence Engineering</span></div><a class="modal-source" href="https://github.com/Chandrashekar-Bala/Independent-Web-Application-Security-Assessment-Mediroza-General-Hospital" target="_blank" rel="noopener noreferrer">View public assessment repository <i class="fab fa-github"></i></a>`},
        driver: {kicker:'Linux Kernel · Driver Compatibility · Real Hardware', title:'RTL8812BU Linux Driver Modernization', body:`<p>Modernized an upstream RTL8812BU/RTL8822BU Linux USB Wi-Fi driver for newer kernel environments through kernel-facing C analysis, compatibility changes, build troubleshooting, and hardware validation.</p><h4>Engineering record</h4><ul><li>Targeted compatibility-sensitive Linux kernel interfaces across 13 source files.</li><li>Investigated compiler, kernel API, module-build, USB callback, timer, filesystem-access, and regulatory-related compatibility issues.</li><li>Built and validated the resulting module on Kali Linux using TP-Link Archer T4U v3 hardware (USB ID 2357:0115).</li><li>Preserved upstream attribution and maintained traceability between the upstream and modified code.</li></ul><div class="modal-meta"><span>C</span><span>Linux Kernel</span><span>GCC</span><span>Git</span><span>RTL8812BU</span><span>Real Hardware</span></div><div class="modal-links"><a class="modal-source" href="https://github.com/Chandrashekar-Bala/RTL8812BU-Linux-7.0.12" target="_blank" rel="noopener noreferrer">My repository <i class="fab fa-github"></i></a><a class="modal-source" href="https://github.com/morrownr/88x2bu-20210702" target="_blank" rel="noopener noreferrer">Upstream repository <i class="fas fa-external-link-alt"></i></a></div>`},
        recon: {kicker:'Reconnaissance Research · Reconnaissance', title:'Network Reconnaissance & Attack-Surface Mapping', body:`<p>Structured reconnaissance work focused on collecting, validating, and interpreting external attack-surface information before making security conclusions.</p><h4>Coverage</h4><ul><li>WHOIS, nslookup/dig, DNSRecon, WhatWeb, cURL, WAFW00F, certificate discovery, crt.sh, CertSpotter, Subfinder and theHarvester.</li><li>Nmap/NSE service enumeration, version detection, OS detection, HTTP/HTTPS and TLS validation, and Zenmap-supported review.</li><li>Evidence-first workflow separating observed exposure from assumptions and hypotheses.</li></ul><div class="modal-meta"><span>OSINT</span><span>DNS</span><span>Nmap/NSE</span><span>TLS</span><span>Web Fingerprinting</span></div>`},
        password: {kicker:'Controlled Password Security Analysis · Controlled Offline Analysis', title:'Protected PDF & Password Security Analysis', body:`<p>Controlled offline password-security analysis of protected PDF artifacts using purpose-built extraction and validation workflows.</p><h4>Workflow</h4><ul><li>Used pdf2john and John the Ripper with RockYou-based testing.</li><li>Compared local recovery results with Networkwalks-provided tooling and documented limitations.</li><li>Validated recovered files with QPDF and correlated evidence rather than treating a password hit alone as the complete result.</li></ul><div class="modal-meta"><span>pdf2john</span><span>John the Ripper</span><span>RockYou</span><span>QPDF</span></div>`},
        web: {kicker:'Application Security · PortSwigger', title:'Web Application Security Lab', body:`<p>Hands-on PortSwigger Web Security Academy practice focused on understanding application behavior through manual request/response analysis and controlled exploitation.</p><h4>Coverage</h4><ul><li>SQL injection, XSS, CSRF, SSRF, authentication, authorization and access-control weaknesses.</li><li>Parameter and session behavior, HTTP request manipulation, validation, and remediation-oriented notes.</li><li>Burp Suite and OWASP ZAP used to support repeatable application-security testing.</li></ul><div class="modal-meta"><span>40+ Labs</span><span>Burp Suite</span><span>OWASP ZAP</span><span>OWASP Top 10</span></div><a class="modal-source" href="https://portswigger.net/web-security" target="_blank" rel="noopener noreferrer">PortSwigger Web Security Academy <i class="fas fa-external-link-alt"></i></a>`},
        threat: {kicker:'Defensive Security · Threat Hunting', title:'Network Traffic Analysis & Threat Hunting', body:`<p>Network investigation work connecting packet-level observations with defensive hypotheses, indicators, and ATT&amp;CK-aligned analysis.</p><h4>Focus</h4><ul><li>Wireshark packet capture and protocol analysis.</li><li>Suspicious-connection investigation and IOC-oriented review.</li><li>Threat-hunting hypotheses around attacker communication and potential command-and-control behavior.</li><li>Translation of network observations into detection and investigation opportunities.</li></ul><div class="modal-meta"><span>Wireshark</span><span>Tcpdump</span><span>Zeek</span><span>IOC Analysis</span><span>MITRE ATT&amp;CK</span></div>`},
        malware: {kicker:'Malware Analysis · Digital Forensics · Research', title:'Malware Analysis & Windows Forensics Research', body:`<p>Hands-on research spanning suspicious-file investigation, binary analysis, execution behavior, indicator extraction, and Windows forensic artifacts.</p><h4>Static + dynamic analysis</h4><ul><li>Static inspection of suspicious files and binaries, including structure and behavior-oriented analysis.</li><li>Dynamic analysis exercises focused on execution behavior and observable indicators.</li><li>Reverse-engineering methods using C, GDB, memory/stack analysis, control-flow analysis and debugging.</li></ul><h4>Forensics</h4><ul><li>Windows Registry artifacts, filesystem activity, disk artifacts, suspicious-file evidence, and timeline-oriented investigation.</li><li>Volatility, Autopsy and network-analysis tooling used according to the research scenario.</li></ul><div class="modal-meta"><span>Ghidra</span><span>IDA Pro</span><span>GDB</span><span>Volatility</span><span>Autopsy</span><span>Wireshark</span></div>`},
        android: {kicker:'Mobile Security · Android', title:'Android Security Analysis', body:`<p>Android application security research combining APK inspection, decompilation, static review, runtime logging, and dynamic analysis.</p><h4>Tooling</h4><ul><li>Dex2jar and JD-GUI for decompilation and code inspection.</li><li>Drozer for dynamic security-testing practice.</li><li>Logcat for runtime observation and troubleshooting.</li><li>Android Studio for application and emulator workflows.</li></ul><div class="modal-meta"><span>APK Analysis</span><span>Reverse Engineering</span><span>Static Analysis</span><span>Dynamic Analysis</span></div>`},
        vulnhub: {kicker:'Controlled Offensive Practice · VulnHub / HTB', title:'Vulnerability Assessment & Privilege Escalation', body:`<p>Repeatable security practice across vulnerable virtual environments, moving from enumeration through validation and post-exploitation analysis.</p><h4>Workflow</h4><ul><li>Service and version enumeration with Nmap.</li><li>Vulnerability identification and controlled exploit validation with Metasploit.</li><li>Linux and Windows privilege-escalation practice and post-exploitation analysis.</li><li>VulnHub, Hack The Box, OverTheWire and vulnerable pentesting VMs used as controlled practice environments.</li></ul><div class="modal-meta"><span>VulnHub</span><span>Hack The Box</span><span>Nmap</span><span>Metasploit</span><span>PrivEsc</span></div>`},
        wireless: {kicker:'Wireless Security · Controlled Lab', title:'Wireless Security Assessment Lab', body:`<p>Controlled wireless-security research covering discovery, monitor mode, packet capture, protocol analysis, and security testing workflows.</p><h4>Focus</h4><ul><li>Aircrack-ng and Wireshark for wireless assessment and packet analysis.</li><li>Monitor mode, packet capture, and controlled wireless testing.</li><li>hcxdumptool requirements and driver capabilities investigated as part of wireless security engineering.</li></ul><div class="modal-meta"><span>Aircrack-ng</span><span>Wireshark</span><span>Monitor Mode</span><span>hcxdumptool</span></div>`},
        buffer: {kicker:'Exploit Development · Controlled Research', title:'Buffer Overflow Exploit Development', body:`<p>Low-level security research focused on memory, stack behavior, control flow, and debugger-assisted proof-of-concept development in controlled environments.</p><h4>Tooling</h4><ul><li>GDB and WinDbg for debugging and memory inspection.</li><li>C for understanding low-level memory behavior.</li><li>Stack analysis, control-flow analysis, and controlled proof-of-concept workflows.</li></ul><div class="modal-meta"><span>C</span><span>GDB</span><span>WinDbg</span><span>Memory Analysis</span><span>PoC</span></div>`},
        firmware: {kicker:'Systems Security · Firmware Research', title:'SPI Flash & BIOS Protection Research', body:`<p>Firmware research on a Lenovo G580 involving SPI flash/NVRAM protection analysis and Linux-based firmware investigation.</p><h4>Research record</h4><ul><li>Used flashrom to investigate internal programmer access and read-protection behavior.</li><li>Acquired an 8 MB full-flash image and extracted the BIOS region for analysis.</li><li>Used dmidecode and dmesg to correlate platform and firmware-loading observations.</li></ul><div class="modal-meta"><span>flashrom</span><span>SPI Flash</span><span>NVRAM</span><span>BIOS</span><span>dmidecode</span></div>`},
        automation: {kicker:'Security Development · Automation', title:'Security Automation & PoC Tooling', body:`<p>Python- and Bash-based security development supporting reconnaissance, vulnerability assessment, network analysis, research, and repeatable proof-of-concept workflows.</p><h4>Engineering approach</h4><ul><li>Automate repeatable reconnaissance and validation steps where it improves consistency.</li><li>Build small proof-of-concept tools to understand vulnerabilities and security behavior.</li><li>Document inputs, outputs, limitations, and defensive considerations rather than treating automation as a substitute for validation.</li></ul><div class="modal-meta"><span>Python</span><span>Bash</span><span>SQL</span><span>Automation</span><span>PoC</span></div>`},
        website: {kicker:'Web Engineering · Portfolio System', title:'Cybersecurity Portfolio Engineering', body:`<p>This portfolio itself is a technical project: a static web system designed to present security research, assessment work, engineering projects, and evidence in a usable interface.</p><h4>What I built</h4><ul><li>Semantic HTML structure with responsive layouts and a terminal-inspired visual system.</li><li>JavaScript-driven project filtering, technical-detail modals, theme switching, navigation behavior, counters, and UI feedback.</li><li>Accessibility-oriented controls, keyboard interaction, reduced-motion support, SEO/social metadata, and GitHub Pages deployment structure.</li></ul><div class="modal-meta"><span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>Accessibility</span><span>SEO</span><span>GitHub Pages</span></div><a class="modal-source" href="https://github.com/Chandrashekar-Bala" target="_blank" rel="noopener noreferrer">View GitHub profile <i class="fab fa-github"></i></a>`}
    };
    if (modal && content) {
        const openProject = key => { const item = projectDetails[key]; if (!item) return; content.innerHTML = `<span class="modal-kicker">${item.kicker}</span><h2 id="modalTitle">${item.title}</h2><div class="modal-body">${item.body}</div>`; modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open'); };
        const closeProject = () => { modal.classList.remove('open'); modal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); };
        document.querySelectorAll('#projects .project-open').forEach(button => button.addEventListener('click', () => openProject(button.closest('.project-card')?.dataset.project)));
        window.openProjectModal = openProject;
        modal.querySelectorAll('[data-close-modal]').forEach(el => el.addEventListener('click', closeProject));
        document.addEventListener('keydown', event => { if (event.key === 'Escape' && modal.classList.contains('open')) closeProject(); });
    }

    // Security Arsenal command-center modal.
    const arsenalModal = document.getElementById('arsenalModal');
    const arsenalTitle = document.getElementById('arsenalModalTitle');
    const arsenalKicker = document.getElementById('arsenalModalKicker');
    const arsenalContent = document.getElementById('arsenalModalContent');
    const arsenalDetails = {
        offensive:{k:'01 · OFFENSIVE SECURITY',t:'Offensive Security',tools:['Nmap','Nessus','Metasploit','Burp Suite','OWASP ZAP','SQLMap','John the Ripper','Hydra','Medusa','GDB','WinDbg'],methods:['Reconnaissance','Service enumeration','Vulnerability validation','Controlled exploitation','Privilege escalation','Post-exploitation analysis'],projects:[['Mediroza Web Application Security Assessment','Authorized black-box assessment with demonstrated SQLi/authentication-bypass chain.','assessment'],['Vulnerability Assessment & Privilege Escalation','Controlled vulnerable-environment practice using VulnHub/HTB/VMs.','offensive'],['Web Application Security Lab','PortSwigger application-security practice.','web'],['Buffer Overflow Exploit Development','Debugger-assisted low-level research.','engineering']]},
        web:{k:'02 · WEB & APPLICATION SECURITY',t:'Web & Application Security',tools:['Burp Suite','OWASP ZAP','Nmap','cURL','WhatWeb','WAFW00F','SQLMap'],methods:['HTTP request/response analysis','Authentication testing','Authorization and access control','SQL injection','XSS / CSRF / SSRF','Session and parameter analysis'],projects:[['Mediroza Web Application Security Assessment','Flagship assessment with manual validation and CVSS/CWE reporting.','assessment'],['Web Application Security Lab','40+ PortSwigger labs across OWASP-aligned scenarios.','web']]},
        defensive:{k:'03 · DEFENSIVE SECURITY',t:'Defensive Security',tools:['Splunk','Google Chronicle','Wireshark','Tcpdump','Zeek','Volatility'],methods:['Security monitoring','Log analysis','Alert triage','IOC analysis','Threat hunting','Incident-response thinking'],projects:[['Network Traffic Analysis & Threat Hunting','Packet-level investigation and ATT&CK-aligned threat hunting.','defensive'],['Malware Analysis & Windows Forensics Research','Evidence-focused malware and forensic exercises.','forensics'],['Mediroza Assessment','Findings translated into remediation and detection considerations.','assessment']]},
        adversary:{k:'04 · THREAT INTELLIGENCE & ADVERSARY RESEARCH',t:'Threat Intelligence & Adversary Research',tools:['Maltego','theHarvester','Subfinder','crt.sh','CertSpotter','WHOIS','MITRE ATT&CK'],methods:['OSINT','Infrastructure research','TTP analysis','Threat-report analysis','Adversary behavior mapping','OpSec research'],projects:[['Network Reconnaissance & Attack-Surface Mapping','Passive intelligence, DNS, certificates, web fingerprinting and service validation.','network'],['Active Directory Attack-Path Research','Kerberoasting, Pass-the-Hash, ACL abuse and detection considerations.','threat'],['Network Traffic Analysis & Threat Hunting','IOC and attacker-behavior investigation.','defensive']]},
        network:{k:'05 · NETWORK SECURITY',t:'Network Security',tools:['Nmap','Nessus','Wireshark','Tcpdump','Zeek','NSE','dig','DNSRecon','cURL'],methods:['Reconnaissance','Service/version validation','TCP/IP and DNS analysis','TLS inspection','Packet analysis','Suspicious-connection investigation'],projects:[['Network Reconnaissance & Attack-Surface Mapping','Reconnaissance Research structured reconnaissance.','network'],['Network Traffic Analysis & Threat Hunting','Traffic analysis and IOC-oriented investigation.','defensive'],['Vulnerability Assessment & Privilege Escalation','Network/service enumeration across controlled VMs.','offensive']]},
        wireless:{k:'06 · WIRELESS SECURITY',t:'Wireless Security',tools:['Aircrack-ng','Wireshark','hcxdumptool','rtl88x2bu / 88x2bu','iw','Linux wireless tooling'],methods:['Monitor mode','Packet capture','Protocol analysis','Controlled Wi-Fi testing','Driver capability validation'],projects:[['Wireless Security Assessment Lab','Controlled wireless assessment and packet-analysis workflows.','wireless'],['RTL8812BU Linux Driver Modernization','Kernel compatibility work enabling real-hardware wireless testing.','engineering']]},
        mobile:{k:'07 · MOBILE SECURITY',t:'Mobile Security',tools:['Drozer','Dex2jar','JD-GUI','Logcat','Android Studio'],methods:['APK inspection','Decompilation','Static analysis','Dynamic analysis','Runtime observation','Reverse engineering'],projects:[['Android Security Analysis','APK inspection, static/dynamic analysis and runtime behavior review.','mobile']]},
        malware:{k:'08 · MALWARE ANALYSIS & REVERSE ENGINEERING',t:'Malware Analysis & Reverse Engineering',tools:['Ghidra','IDA Pro','GDB','Volatility','Wireshark'],methods:['Static analysis','Dynamic analysis','Binary investigation','Execution behavior','Memory / stack analysis','Control-flow analysis','IOC extraction'],projects:[['Malware Analysis & Windows Forensics Research','Hands-on static/dynamic and evidence-analysis exercises.','forensics'],['Buffer Overflow Exploit Development','C and debugger-assisted low-level research.','engineering']]},
        forensics:{k:'09 · DIGITAL FORENSICS & INCIDENT RESPONSE',t:'Digital Forensics & Incident Response',tools:['Autopsy','Volatility','Windows Registry tools','Wireshark','Linux forensic utilities'],methods:['Registry artifact review','Filesystem analysis','Disk artifacts','Memory analysis','IOC correlation','Timeline-oriented investigation'],projects:[['Malware Analysis & Windows Forensics Research','Windows artifacts, suspicious files and timeline-oriented review.','forensics'],['Network Traffic Analysis & Threat Hunting','Network evidence and IOC correlation.','defensive'],['Mediroza Assessment','Evidence preservation and technical documentation.','assessment']]},
        engineering:{k:'10 · SECURITY ENGINEERING',t:'Security Engineering',tools:['C','Python','Bash','GCC','Git','Linux kernel headers','flashrom','GDB'],methods:['Kernel/API compatibility','Build troubleshooting','Security tooling','Proof-of-concept development','Hardware validation','Technical documentation'],projects:[['RTL8812BU Linux Driver Modernization','13-source-file kernel compatibility project validated on real hardware.','engineering'],['SPI Flash & BIOS Protection Research','Firmware protection and flash analysis.','forensics'],['Security Automation & PoC Tooling','Python/Bash tooling for repeatable security workflows.','engineering']]},
        systems:{k:'11 · CLOUD, SYSTEMS & VIRTUALIZATION',t:'Cloud, Systems & Virtualization',tools:['Kali Linux','Ubuntu','Windows','VirtualBox','Docker','Linux networking','PowerShell'],methods:['Linux/Windows administration','Virtual lab construction','Network configuration','System troubleshooting','Cloud security and systems architecture'],projects:[['Vulnerability Assessment & Privilege Escalation','Linux/Windows vulnerable environments.','offensive'],['RTL8812BU Driver Engineering','Linux kernel and hardware-backed engineering.','engineering']]},
        automation:{k:'12 · AUTOMATION & SECURITY DEVELOPMENT',t:'Automation & Security Development',tools:['Python','Bash','C','C++','SQL','HTML5','CSS3','JavaScript','Git/GitHub'],methods:['Security automation','Recon tooling','Vulnerability assessment tooling','PoC development','Data analysis','Web engineering'],projects:[['Security Automation & PoC Tooling','Repeatable security workflows and proof-of-concept development.','engineering'],['Cybersecurity Portfolio Engineering','Static web engineering with interactive security content.','engineering'],['Fake News Detection System','Python/NLP/ML capstone engineering.','engineering']]}
    };
    if (arsenalModal && arsenalTitle && arsenalKicker && arsenalContent) {
        const openArsenal = key => {
            const item = arsenalDetails[key]; if (!item) return;
            arsenalKicker.textContent = item.k;
            arsenalTitle.textContent = item.t;
            arsenalContent.innerHTML = `<div class="arsenal-detail-grid"><div><h4>Tools & Technologies</h4><div class="modal-meta">${item.tools.map(x=>`<span>${x}</span>`).join('')}</div></div><div><h4>Methods & Practice</h4><ul>${item.methods.map(x=>`<li>${x}</li>`).join('')}</ul></div></div><div class="arsenal-related"><h4>Relevant Projects</h4><div class="arsenal-related-list">${item.projects.map(p=>`<button type="button" class="arsenal-project-link" data-project-target="${p[2]}"><strong>${p[0]}</strong><span>${p[1]}</span><i class="fas fa-arrow-right"></i></button>`).join('')}</div></div>`;
            arsenalModal.classList.add('open'); arsenalModal.setAttribute('aria-hidden','false'); document.body.classList.add('modal-open');
            arsenalContent.querySelectorAll('[data-project-target]').forEach(btn => btn.addEventListener('click', () => { const target=btn.dataset.projectTarget; closeArsenal(); setTimeout(()=>{ const card=document.querySelector(`#projects .project-card[data-category~="${target}"] .project-open`); if(card) card.click(); else jumpToProjects(target); },180); }));
        };
        const closeArsenal = () => { arsenalModal.classList.remove('open'); arsenalModal.setAttribute('aria-hidden','true'); document.body.classList.remove('modal-open'); };
        document.querySelectorAll('[data-arsenal]').forEach(card => card.addEventListener('click', () => openArsenal(card.dataset.arsenal)));
        arsenalModal.querySelectorAll('[data-close-arsenal]').forEach(el => el.addEventListener('click', closeArsenal));
        document.addEventListener('keydown', event => { if (event.key === 'Escape' && arsenalModal.classList.contains('open')) closeArsenal(); });
    }
});


/* ===== Executive v4 interaction layer ===== */
(function(){
  const $ = (s,root=document) => root.querySelector(s);
  const $$ = (s,root=document) => [...root.querySelectorAll(s)];

  // Curated case index: secondary projects remain available without overwhelming the page.
  const caseToggle = $('#caseIndexToggle');
  if(caseToggle){
    caseToggle.addEventListener('click',()=>{
      const open = caseToggle.classList.toggle('open');
      caseToggle.setAttribute('aria-expanded',String(open));
      $$('.case-secondary').forEach(c=>{ c.style.display = open ? '' : 'none'; });
      caseToggle.childNodes[0].nodeValue = open ? 'Collapse extended case record ' : 'Browse full technical case index ';
    });
  }

  // Full case index modal.
  const caseModal=$('#caseIndexModal'), caseList=$('#caseIndexList');
  if(caseModal && caseList){
    $$('#projects .project-card').forEach(card=>{
      const key=card.dataset.project, title=$('h3',card)?.textContent.trim()||key;
      const kicker=$('.project-kicker',card)?.textContent.trim()||'';
      const item=document.createElement('div'); item.className='case-index-item';
      item.innerHTML=`<div class="case-item-copy"><strong>${title}</strong><small>${kicker}</small></div><button class="case-open-btn" type="button" data-case-open="${key}">OPEN DOSSIER →</button>`;
      caseList.appendChild(item);
    });
    const close=()=>{caseModal.classList.remove('open');caseModal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');};
    $$('[data-close-case-index]').forEach(x=>x.addEventListener('click',close));
    caseList.addEventListener('click',e=>{const b=e.target.closest('[data-case-open]');if(!b)return;close(); if(window.openProjectModal) window.openProjectModal(b.dataset.caseOpen);});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&caseModal.classList.contains('open'))close();});
  }

  // If a project card has a secondary index entry, make the full card visually actionable.
  $$('#projects .project-card').forEach(card=>{
    card.addEventListener('click',e=>{
      if(e.target.closest('button,a')) return;
      if(window.openProjectModal && card.dataset.project) window.openProjectModal(card.dataset.project);
    });
  });

  // Expertise domain dossiers. These are deliberately separate from the technical-capability modal system.
  const expertise={
    adversary:{title:'Adversary Research & Simulation',kicker:'01 · ADVERSARY RESEARCH',summary:'Research focused on adversary behavior, operational security, infrastructure, TTPs, and controlled simulation—then translating those observations into defensive insight.',methods:['Threat-intelligence gathering and infrastructure research','MITRE ATT&CK-aligned TTP analysis','OpSec and controlled adversary-simulation research','Active Directory attack-path analysis'],tools:['MITRE ATT&CK','OSINT','Maltego','theHarvester','Subfinder'],projects:['threat','recon']},
    network:{title:'Network & Wireless Security',kicker:'02 · NETWORK SECURITY',summary:'Security work across network discovery, protocol behavior, packet analysis, wireless assessment, and infrastructure exposure.',methods:['Service and version discovery','TCP/IP, DNS and TLS analysis','Packet capture and traffic investigation','Wireless assessment, monitor mode and packet analysis'],tools:['Nmap','NSE','Wireshark','Aircrack-ng','DNSRecon','cURL'],projects:['recon','network','wireless','driver']},
    web:{title:'Web & Application Security',kicker:'03 · APPLICATION SECURITY',summary:'Manual application-security testing centered on HTTP behavior, trust boundaries, authentication, authorization, access control, and vulnerability validation.',methods:['Request/response analysis','Authentication and authorization testing','SQL injection and server-side validation','Access-control, session and parameter analysis'],tools:['Burp Suite','OWASP ZAP','Nmap','cURL','WhatWeb','WAFW00F'],projects:['mediroza','web']},
    mobile:{title:'Mobile Security',kicker:'04 · MOBILE SECURITY',summary:'Android-focused security research spanning APK inspection, static/dynamic analysis, runtime observation, logging, and reverse engineering.',methods:['APK inspection and decompilation','Static and dynamic analysis','Runtime and log observation','Reverse-engineering workflows'],tools:['Android tooling','ADB','Logcat','Ghidra','Dex2jar','JD-GUI'],projects:['android']},
    exploit:{title:'Exploit Development',kicker:'05 · LOW-LEVEL SECURITY',summary:'Low-level research into memory behavior, stack state, control flow, debugging, and controlled proof-of-concept development.',methods:['Memory and stack analysis','Debugger-assisted investigation','Control-flow analysis','Controlled PoC development'],tools:['C','GDB','WinDbg'],projects:['buffer']},
    systems:{title:'Systems & Platform Security',kicker:'06 · SYSTEMS SECURITY',summary:'Security research close to the operating system: Linux and Windows environments, privilege escalation, system troubleshooting, kernel-facing work, and platform behavior.',methods:['Linux and Windows security analysis','Privilege-escalation research','Kernel/API compatibility work','System troubleshooting and virtualization'],tools:['Kali Linux','Windows','PowerShell','VirtualBox','Linux kernel headers'],projects:['vulnhub','driver','firmware']},
    defensive:{title:'Security Operations & Detection',kicker:'07 · DEFENSIVE SECURITY',summary:'Defensive investigation connecting network visibility, SIEM workflows, indicators, threat hunting, incident response, and ATT&CK-aligned detection logic.',methods:['Security monitoring and alert triage','IOC analysis and threat hunting','Network traffic analysis','Incident-response and forensic investigation'],tools:['Splunk','Google Chronicle','Wireshark','Volatility','Autopsy'],projects:['threat','network','malware']},
    forensics:{title:'Malware Analysis & Digital Forensics',kicker:'08 · MALWARE / DFIR',summary:'Static and dynamic malware analysis combined with Windows forensic artifacts, binary investigation, memory and disk evidence, and indicator extraction.',methods:['Static analysis of suspicious files and binaries','Dynamic analysis of execution behavior','Windows artifact and filesystem review','Memory/disk investigation and IOC extraction'],tools:['Ghidra','IDA Pro','GDB','Volatility','Autopsy','Wireshark'],projects:['malware','android','buffer']}
  };
  const em=$('#expertiseModal'), ec=$('#expertiseModalContent'), et=$('#expertiseModalTitle'), ek=$('#expertiseModalKicker');
  const closeExpert=()=>{if(!em)return;em.classList.remove('open');em.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');};
  if(em&&ec){
    $$('.expertise-dossier-card').forEach(card=>card.addEventListener('click',()=>{
      const d=expertise[card.dataset.expertise]; if(!d)return;
      et.textContent=d.title; ek.textContent=d.kicker;
      const toolHtml=d.tools.map(t=>`<span>${t}</span>`).join('');
      const methodHtml=d.methods.map(m=>`<li>${m}</li>`).join('');
      const projHtml=d.projects.map(k=>{const c=$(`#projects .project-card[data-project="${k}"]`); const title=$('h3',c)?.textContent.trim()||k; return `<button class="detail-project-btn" type="button" data-domain-project="${k}">${title} →</button>`;}).join('');
      ec.innerHTML=`<p class="expertise-modal-summary">${d.summary}</p><div class="expertise-detail-grid"><div class="expertise-detail-panel"><h4>Methods & scope</h4><ul>${methodHtml}</ul><h4 style="margin-top:20px">Tooling</h4><div class="modal-meta">${toolHtml}</div></div><div class="expertise-detail-panel"><h4>Related case files</h4><div class="detail-project-list">${projHtml}</div></div></div>`;
      em.classList.add('open');em.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
    }));
    $$('[data-close-expertise]').forEach(x=>x.addEventListener('click',closeExpert));
    ec.addEventListener('click',e=>{const b=e.target.closest('[data-domain-project]');if(!b)return;closeExpert();if(window.openProjectModal)window.openProjectModal(b.dataset.domainProject);});
    document.addEventListener('keydown',e=>{if(e.key==='Escape'&&em.classList.contains('open'))closeExpert();});
  }

  // Role cards become direct entry points into evidence instead of dead-end filter buttons.
  $$('.role-project-link').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const key=btn.dataset.projectKey;
      if(key&&window.openProjectModal){window.openProjectModal(key);return;}
      const filter=btn.dataset.projectFilter;
      if(filter){const target=$(`#projects .project-card[data-category~="${filter}"]`);if(target&&window.openProjectModal)window.openProjectModal(target.dataset.project);else document.querySelector('#projects')?.scrollIntoView({behavior:'smooth'});}
    });
  });
})();

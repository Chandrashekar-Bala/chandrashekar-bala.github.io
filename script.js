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


/* ===== RESEARCH ENVIRONMENT // 0xCB INTERACTIVE MAP ===== */
document.addEventListener('DOMContentLoaded',()=>{
  const envModal=document.getElementById('envModal'), envContent=document.getElementById('envModalContent');
  const envProjectModal=document.getElementById('envProjectModal'), envProjectContent=document.getElementById('envProjectModalContent'), envProjectTitle=document.getElementById('envProjectModalTitle'), envProjectLead=document.getElementById('envProjectModalLead');
  const mapModal=document.getElementById('researchMapModal');
  const roleModal=document.getElementById('roleDossierModal');
  const roleContent=document.getElementById('roleDossierContent');
  if(!envModal||!envContent) return;
  const envData={
    portswigger:{k:'01 · WEB APPLICATION SECURITY',t:'PortSwigger Web Security Academy',lead:'50+ labs supporting sustained application-security practice and manual attack-path reasoning.',focus:['Authentication & authorization','Access control','SQL injection & server-side vulnerabilities','SSRF, request manipulation & HTTP behavior'],signals:['50+ labs','Burp Suite','HTTP','OWASP-aligned testing'],flow:'Discover → Manipulate → Validate → Explain',related:[['Web Application Security Assessment','Flagship assessment evidence','assessment'],['Web Application Security Lab','50+ application-security labs','web']]},
    bugbounty:{k:'02 · BUG BOUNTY & RESPONSIBLE DISCLOSURE',t:'Bug Bounty & Responsible Disclosure',lead:'Web-focused vulnerability research built around discovery, manual validation, impact reasoning, clear reporting, remediation and responsible disclosure thinking.',focus:['Attack-surface discovery and web asset analysis','Authentication, authorization and access-control testing','Manual vulnerability validation and impact reasoning','Clear technical reporting, remediation and retest thinking'],signals:['Web Security','Burp Suite','HTTP','OWASP','Responsible Disclosure'],flow:'Discover → Validate → Assess Impact → Report → Retest',related:[['Web Application Security Lab','50+ application-security labs','web'],['Mediroza Web Application Security Assessment','Authorized assessment with 8+ findings','assessment']]},
    htb:{k:'03 · OFFENSIVE SECURITY',t:'Hack The Box',lead:'Hands-on environments for attack-path reasoning and practical security testing.',focus:['Reconnaissance & enumeration','Service exploitation','Linux / Windows privilege escalation','Post-exploitation analysis'],signals:['Pentesting','Linux','Windows','Attack paths'],flow:'Recon → Enumerate → Exploit → Escalate',related:[['Vulnerability Assessment & Privilege Escalation','Controlled vulnerable-environment research','offensive'],['Enterprise Network Penetration Testing','Network attack-path work','network']]},
    vulnhub:{k:'04 · VULNERABLE ENVIRONMENTS',t:'VulnHub',lead:'Self-contained vulnerable systems used to reproduce attack chains and validate security assumptions.',focus:['Service discovery','Vulnerability validation','Controlled exploitation','Privilege escalation & post-exploitation'],signals:['VAPT','Exploitation','PrivEsc','Validation'],flow:'Map → Validate → Exploit → Document',related:[['Vulnerability Assessment & Privilege Escalation','Attack-path validation','offensive']]},
    overthewire:{k:'05 · LINUX SECURITY',t:'OverTheWire',lead:'Command-line environments that sharpen Linux security reasoning and problem solving.',focus:['Permissions','Authentication','Filesystem behavior','Shell and command-line analysis'],signals:['Linux','Bash','CLI','Problem solving'],flow:'Observe → Reason → Execute → Verify',related:[['Linux Security Engineering','Linux and systems work','engineering']]},
    kali:{k:'06 · SECURITY OPERATING ENVIRONMENTS',t:'Kali / Parrot',lead:'Primary Linux environments used for security research, assessment and technical troubleshooting.',focus:['Reconnaissance & enumeration','Web and network testing','Wireless security','Packet analysis and tooling'],signals:['Nmap','Burp','Wireshark','Aircrack-ng'],flow:'Prepare → Test → Capture → Analyze',related:[['Network Reconnaissance','Reconnaissance and attack-surface analysis','network'],['Web Application Security Lab','Application-security research','web'],['RTL8812BU Driver Engineering','Wireless security engineering','engineering']]},
    crossplatform:{k:'07 · CROSS-PLATFORM ANALYSIS',t:'Windows / Linux',lead:'Cross-platform environments for security testing, investigation and forensic analysis.',focus:['Windows artifacts','Linux security analysis','Network behavior','Filesystem and evidence review'],signals:['DFIR','Networking','Windows','Linux'],flow:'Acquire → Analyze → Correlate → Report',related:[['Malware Analysis & Windows Forensics','Evidence-focused research','forensics']]},
    virtualbox:{k:'08 · RESEARCH INFRASTRUCTURE',t:'VirtualBox',lead:'Isolated virtual infrastructure for repeatable and controlled security experimentation.',focus:['Vulnerable virtual machines','Attack-path reproduction','Network isolation','Snapshot-driven testing'],signals:['Virtualization','Isolation','Labs','Reproducibility'],flow:'Build → Isolate → Test → Reset',related:[['Vulnerability Assessment & Privilege Escalation','Controlled vulnerable systems','offensive']]},
    github:{k:'09 · ENGINEERING ARCHIVE',t:'GitHub',lead:'Public proof of technical work, engineering projects and documented security research.',focus:['RTL8812BU / RTL8822BU driver engineering','Security automation & PoCs','Technical project documentation','Versioned research artifacts'],signals:['Git','C','Python','Linux'],flow:'Build → Version → Validate → Publish',related:[['RTL8812BU Driver Engineering','13+ source files and real-hardware validation','engineering'],['Security Automation & PoC Tooling','Python / Bash security tooling','automation']]},
    networkwalks:{k:'10 · PROFESSIONAL SECURITY WORK',t:'Networkwalks',lead:'Professional cybersecurity work spanning assessment, offensive, defensive, adversary and engineering activities.',focus:['VAPT & security assessment','Offensive and defensive analysis','Threat and adversary research','Technical project execution'],signals:['VAPT','Offensive','Defensive','Engineering'],flow:'Assess → Investigate → Coordinate → Deliver',related:[['Team Lead Experience','Current professional scope','experience'],['Mediroza Assessment','Authorized security assessment','assessment']]},
    underground:{k:'11 · ADVERSARY & UNDERGROUND INTELLIGENCE',t:'Dark Web & Underground Intelligence',lead:'Research into underground ecosystems as intelligence sources: hidden forums and communities, threat-actor activity, criminal-service ecosystems, exposed information, data-dump reporting, infrastructure and evolving threat activity.',focus:['Underground forums and ecosystem monitoring','Threat-actor activity, behavior and service models','Infrastructure relationships and operational patterns','Leak, exposure and data-dump reporting as intelligence signals'],signals:['OSINT','CTI','Tor / I2P','Underground Forums','TTPs'],flow:'Discover → Correlate → Contextualize → Map',related:[['Adversary Research','Threat intelligence and TTP analysis','threat'],['Network Reconnaissance & Attack-Surface Mapping','Infrastructure intelligence','network']]},
    osint:{k:'12 · THREAT INTELLIGENCE',t:'OSINT & Threat Intelligence',lead:'Open-source intelligence collection and correlation used to build context around infrastructure, actors and campaigns.',focus:['Infrastructure discovery','Source correlation','IOC research','Threat-report and TTP analysis'],signals:['OSINT','IOC','Infrastructure','ATT&CK'],flow:'Collect → Correlate → Assess → Inform',related:[['Network Reconnaissance','Infrastructure discovery','network'],['Adversary Research','TTP and actor analysis','threat']]}
  };
  const envDepth={
    portswigger:{skills:['Web Application Security','Authentication & Authorization','Access Control','Injection Analysis','SSRF & Request Manipulation','Attack-Path Analysis'],tools:['Burp Suite','HTTP / HTTPS','OWASP','OWASP ZAP','PortSwigger Web Security Academy','Browser DevTools']},
    bugbounty:{skills:['Attack-Surface Discovery','Vulnerability Discovery','Manual Validation','Impact Analysis','Responsible Disclosure','Retest Thinking'],tools:['Burp Suite','HTTP / HTTPS','Browser DevTools','OWASP','Nmap','Responsible Disclosure Workflows']},
    htb:{skills:['Reconnaissance','Enumeration','Exploitation','Linux / Windows Privilege Escalation','Post-Exploitation','Attack-Path Reasoning'],tools:['Hack The Box','Nmap','Metasploit','Linux','Windows','Burp Suite']},
    vulnhub:{skills:['Vulnerability Validation','Service Enumeration','Exploitation','Privilege Escalation','Post-Exploitation','Evidence Capture'],tools:['VulnHub','Nmap','Metasploit','VirtualBox','Linux','Windows']},
    overthewire:{skills:['Linux Security','Permissions','Authentication','Filesystem Analysis','Shell Reasoning','Command-Line Problem Solving'],tools:['OverTheWire','Bash','Linux CLI','SSH','Core Unix Utilities']},
    kali:{skills:['Security Testing','Network Analysis','Wireless Security','Reconnaissance','Packet Analysis','Technical Troubleshooting'],tools:['Kali Linux','Parrot OS','Nmap','Burp Suite','Wireshark','Aircrack-ng']},
    crossplatform:{skills:['Digital Forensics','Windows Artifact Analysis','Linux Security','Network Investigation','Filesystem Review','Evidence Correlation'],tools:['Windows','Linux','Wireshark','Volatility','Autopsy','PowerShell']},
    virtualbox:{skills:['Lab Isolation','Attack-Path Reproduction','Snapshot Testing','Environment Design','Network Segmentation','Repeatability'],tools:['VirtualBox','Vulnerable VMs','Host-Only Networking','Snapshots','NAT / Bridged Networking']},
    github:{skills:['Security Engineering','Version Control','Technical Documentation','Research Publishing','PoC Development','Reproducibility'],tools:['GitHub','Git','C','Python','Bash','Linux']},
    networkwalks:{skills:['VAPT','Offensive Security','Defensive Security','Adversary Research','Security Engineering','Technical Project Execution'],tools:['Security Assessments','Technical Reporting','Network Analysis','Security Tooling','Evidence Handling']},
    underground:{skills:['Underground Ecosystem Research','Threat-Actor Research','Forum / Community Monitoring','Leak & Exposure Research','Infrastructure Correlation','Adversary Behaviour','TTP Analysis'],tools:['Tor Browser (research access)','Dread / underground forum observation','OSINT','Maltego','Threat Reports','IOC / TTP Mapping','WHOIS / DNS Research']},
    osint:{skills:['Infrastructure Discovery','Source Correlation','IOC Research','Threat Context','Certificate Intelligence','Adversary Research'],tools:['WHOIS','DNSRecon','crt.sh','CertSpotter','Subfinder','theHarvester','MITRE ATT&CK']}
  };
  const groups={
    web:{title:'WEB APPLICATION',kicker:'01 · WEB APPLICATION SECURITY',lead:'Application-security environments used to understand HTTP behavior, validate vulnerabilities and build attack-path reasoning.',envs:['portswigger','bugbounty'],signals:['50+ PortSwigger labs','Bug bounty research','Burp Suite','HTTP','OWASP'],related:[['Web Application Security Assessment','Flagship assessment','assessment'],['Web Application Security Lab','50+ labs','web']]},
    bugbounty:{title:'BUG BOUNTY & RESPONSIBLE DISCLOSURE',kicker:'02 · BUG BOUNTY & RESPONSIBLE DISCLOSURE',lead:'A practical web-security research mindset focused on finding, validating, documenting and responsibly communicating vulnerabilities.',envs:['bugbounty'],signals:['Vulnerability Research','Burp Suite','HTTP','OWASP','Disclosure'],related:[['Web Application Security Lab','50+ application-security labs','web'],['Mediroza Web Application Security Assessment','Authorized assessment','assessment']]},
    offensive:{title:'OFFENSIVE SECURITY',kicker:'03 · OFFENSIVE SECURITY',lead:'Controlled environments used to practice reconnaissance, exploitation, privilege escalation and post-exploitation reasoning.',envs:['htb','vulnhub','overthewire','kali'],signals:['HTB','VulnHub','OverTheWire','Kali / Parrot'],related:[['Vulnerability Assessment & Privilege Escalation','Attack-path validation','offensive'],['Enterprise Network Penetration Testing','Network testing','network']]},
    systems:{title:'SYSTEMS & FORENSICS',kicker:'04 · SYSTEMS & FORENSICS',lead:'Cross-platform environments for operating-system analysis, evidence review, network investigation and isolated testing.',envs:['crossplatform','virtualbox'],signals:['Windows','Linux','VirtualBox','DFIR'],related:[['Malware Analysis & Windows Forensics','Forensic research','forensics'],['Network Traffic Analysis & Threat Hunting','Network investigation','defensive']]},
    engineering:{title:'SECURITY ENGINEERING',kicker:'05 · SECURITY ENGINEERING',lead:'The build-and-validate side of the Research OS: code, systems, repositories, tooling and hardware-backed engineering.',envs:['github','kali'],signals:['C','Python','Linux','Git','RTL8812BU'],related:[['RTL8812BU Driver Engineering','13+ source files','engineering'],['Security Automation & PoC Tooling','Repeatable security tooling','automation']]},
    adversary:{title:'ADVERSARY & UNDERGROUND INTELLIGENCE',kicker:'06 · ADVERSARY & UNDERGROUND INTELLIGENCE',lead:'Intelligence-oriented research spanning open, deep and underground sources, infrastructure relationships, actor behavior and TTPs.',envs:['underground','osint'],signals:['Dark Web','OSINT','CTI','Infrastructure','TTPs'],related:[['Adversary Research','Threat and actor research','threat'],['Network Reconnaissance','Infrastructure intelligence','network']]},
    professional:{title:'PROFESSIONAL ENVIRONMENT',kicker:'07 · PROFESSIONAL SECURITY WORK',lead:'The professional environment where assessment, offensive, defensive, adversary research and engineering work come together.',envs:['networkwalks'],signals:['VAPT','Offensive','Defensive','Adversary','Engineering'],related:[['Team Lead Experience','Current professional scope','experience'],['Mediroza Assessment','Authorized assessment','assessment']]}
  };
  const groupDepth={
    web:{what:['Analyze HTTP behavior and application trust boundaries','Validate authentication, authorization and access-control weaknesses','Reproduce web vulnerabilities and reason about practical impact','Turn findings into remediation and retest considerations'],tools:['Burp Suite','HTTP / HTTPS','OWASP','OWASP ZAP','Nmap','PortSwigger']},
    bugbounty:{what:['Discover web attack surfaces and test realistic vulnerability hypotheses','Manually validate findings before treating them as reportable issues','Assess exploitability, impact and affected trust boundaries','Write concise, reproducible reports with remediation and retest guidance'],tools:['Burp Suite','HTTP / HTTPS','Browser DevTools','OWASP','Nmap','Responsible Disclosure']},
    offensive:{what:['Map attack surfaces and enumerate exposed services','Validate vulnerabilities through controlled exploitation','Reason through privilege escalation and post-exploitation paths','Document attack chains and security impact'],tools:['Nmap','Metasploit','Burp Suite','Kali / Parrot','VulnHub','Hack The Box']},
    systems:{what:['Investigate Windows and Linux behavior at system and artifact level','Analyze filesystems, memory, network activity and forensic evidence','Build isolated virtual environments for repeatable testing','Correlate system observations into defensible investigation timelines'],tools:['Windows','Linux','VirtualBox','Wireshark','Volatility','Autopsy']},
    engineering:{what:['Work close to code, operating systems and hardware','Troubleshoot kernel/API/compiler and build compatibility','Build security tooling and focused proof-of-concept workflows','Validate engineering changes on reproducible systems and real hardware'],tools:['C','Python','Bash','GCC','Git','Linux Kernel','RTL8812BU','flashrom']},
    adversary:{what:['Research threat actors and underground ecosystems as intelligence sources','Monitor forum/community signals, leak reporting and adversary activity for context','Correlate infrastructure, indicators, reports and observed behavior without treating stolen data as an operational objective','Map adversary behavior to TTPs and defensive context'],tools:['OSINT','CTI','Tor / I2P research','Maltego','theHarvester','Subfinder','MITRE ATT&CK']},
    professional:{what:['Contribute to multidisciplinary cybersecurity work across assessment and research','Coordinate technical execution while staying close to hands-on validation','Connect offensive observations with defensive and engineering decisions','Deliver documented, evidence-driven technical outcomes'],tools:['VAPT','Security Assessment','Technical Reporting','Network Analysis','Security Tooling','Project Execution']}
  };
  const envNarrative={
    portswigger:{what:['Study application behavior through HTTP requests, sessions, parameters and trust boundaries.','Validate authentication, authorization, injection, SSRF and access-control weaknesses manually.','Use controlled labs to turn vulnerability mechanics into reusable attack-path reasoning.'],analysis:['Request/response comparison','Parameter and session behavior','Exploitability and impact reasoning','Evidence and remediation notes'],output:'Reproducible application-security findings, attack-path understanding and remediation-oriented analysis.'},
    bugbounty:{what:['Approach web targets from an attack-surface and vulnerability-research perspective.','Prioritize manual validation before treating an observation as reportable.','Reason about impact, affected trust boundaries, report quality and responsible disclosure.'],analysis:['Asset discovery','Manual validation','Impact analysis','Clear reproduction steps','Disclosure and retest thinking'],output:'Concise, defensible vulnerability reports with reproducible evidence and remediation context.'},
    htb:{what:['Use realistic environments to practice reconnaissance, enumeration and attack-path construction.','Move from exposed services to controlled exploitation and privilege-escalation reasoning.','Review what changed after exploitation instead of stopping at initial access.'],analysis:['Service enumeration','Exploit selection','Privilege boundaries','Post-exploitation impact','Attack-path reconstruction'],output:'A complete attack narrative rather than an isolated tool result.'},
    vulnhub:{what:['Reproduce vulnerable systems in controlled virtual environments.','Validate exploitability and privilege-escalation paths without relying on assumptions.','Capture the sequence from discovery to impact for repeatable analysis.'],analysis:['Service discovery','Vulnerability validation','Controlled exploitation','Privilege escalation','Evidence capture'],output:'Repeatable vulnerable-system research and documented attack chains.'},
    overthewire:{what:['Strengthen Linux command-line reasoning through constrained security problems.','Analyze permissions, authentication, filesystems and shell behavior.','Use deliberate problem solving rather than trial-and-error command execution.'],analysis:['Permissions','Authentication','Filesystem behavior','Shell reasoning','Command-line verification'],output:'Stronger Linux intuition that transfers into offensive, defensive and engineering work.'},
    kali:{what:['Use Kali and Parrot as practical security workstations rather than as a list of tools.','Move between reconnaissance, web testing, network analysis and wireless workflows.','Troubleshoot the operating environment when the tooling itself becomes the problem.'],analysis:['Reconnaissance','Web testing','Packet analysis','Wireless assessment','Linux troubleshooting'],output:'A repeatable Linux-based security workspace for controlled technical research.'},
    crossplatform:{what:['Investigate security behavior across Windows and Linux rather than treating either platform in isolation.','Review filesystem, registry, memory, network and suspicious-file evidence according to the scenario.','Correlate technical artifacts into an investigation timeline.'],analysis:['Windows artifacts','Linux behavior','Network evidence','Filesystem activity','Evidence correlation'],output:'Cross-platform investigation and forensic reasoning grounded in observable artifacts.'},
    virtualbox:{what:['Build isolated environments where vulnerable systems and security tooling can be tested safely.','Use snapshots, network modes and repeatable configurations to reproduce an attack path.','Separate experiments from the host environment to preserve clean evidence.'],analysis:['Lab topology','Isolation','Snapshots','Network segmentation','Reproducibility'],output:'Controlled infrastructure for repeatable security research.'},
    github:{what:['Use GitHub as the public engineering trail behind technical work.','Document code, experiments, security tooling and system-level changes so others can inspect the work.','Use version control to preserve reproducibility and trace technical decisions.'],analysis:['Version history','Code review','Documentation','Reproducibility','Public technical record'],output:'Public evidence that technical work was built, documented and maintained.'},
    networkwalks:{what:['Work across VAPT, offensive security, defensive analysis, adversary research and security engineering.','Coordinate technical execution while remaining close to hands-on validation.','Connect individual project work to evidence, reporting and defensible outcomes.'],analysis:['Assessment delivery','Technical coordination','Evidence review','Research execution','Project delivery'],output:'Professional cybersecurity experience connecting breadth with hands-on technical work.'},
    underground:{what:['Study underground ecosystems as intelligence sources rather than as an end in themselves.','Observe public or research-accessible forum activity, threat-actor behavior, service models and exposed information.','Correlate underground observations with OSINT, infrastructure and threat reporting to build context.'],analysis:['Forum/community observation','Threat-actor behavior','Leak and exposure intelligence','Data-dump reporting as signals','Infrastructure correlation','TTP mapping'],output:'Adversary context that can inform threat intelligence, detection and security decisions.'},
    osint:{what:['Collect public intelligence from domains, certificates, DNS, reports and other observable sources.','Correlate independent sources before drawing conclusions about infrastructure or actors.','Turn fragmented observations into a structured threat picture.'],analysis:['Domain and DNS discovery','Certificate intelligence','Source correlation','IOC research','Threat-report analysis','TTP context'],output:'Context-rich intelligence that connects infrastructure, indicators and adversary behavior.'}
  };
  const envInsights={
    portswigger:{objective:'Application-security practice with emphasis on request-level reasoning and reproducible vulnerability validation.',approach:['Map the application behavior before testing individual weaknesses.','Manipulate requests, parameters and sessions manually to understand trust boundaries.','Validate exploitability and impact, then record the security consequence and remediation direction.'],artifacts:['HTTP request/response pairs','Authentication and session behavior','Reproduction steps','Impact and remediation notes'],outcome:'Builds practical web-security judgment that transfers into real assessment work.'},
    bugbounty:{objective:'Vulnerability-research discipline focused on finding meaningful web weaknesses and communicating them responsibly.',approach:['Start with the attack surface and observable behavior rather than assumptions.','Manually reproduce a suspected weakness and determine the affected trust boundary.','Separate a technical observation from a reportable security impact and document the evidence clearly.'],artifacts:['Reproduction requests','Affected parameters/endpoints','Impact reasoning','Disclosure-quality notes'],outcome:'Turns web testing into concise, defensible vulnerability research.'},
    htb:{objective:'Attack-path practice across realistic Linux and Windows targets where enumeration has to lead to a coherent exploitation narrative.',approach:['Enumerate services and identify the most promising attack surface.','Validate the weakness in a controlled manner and understand why the path works.','Follow privilege boundaries and post-exploitation consequences instead of stopping at initial access.'],artifacts:['Enumeration results','Service/version observations','Attack-path steps','Privilege-escalation notes'],outcome:'Strengthens attacker-perspective reasoning and complete attack-chain analysis.'},
    vulnhub:{objective:'Reproducible vulnerable-system research where the complete chain from exposure to privilege is observable.',approach:['Build or restore the vulnerable environment in isolation.','Reproduce the weakness and verify the actual exploitation condition.','Document the path, privilege boundary and security lesson so the result can be repeated.'],artifacts:['Lab topology','Enumeration output','Exploit validation','Privilege-escalation path'],outcome:'Provides controlled evidence for VAPT and attack-path reasoning.'},
    overthewire:{objective:'Command-line security problem solving that strengthens Linux intuition used throughout offensive and engineering work.',approach:['Read the environment and constraints before issuing commands.','Reason about permissions, filesystems, authentication and process behavior.','Verify the result and understand the mechanism rather than memorizing a command sequence.'],artifacts:['Shell commands','Permission observations','Filesystem state','Verified solution path'],outcome:'Sharpens low-level Linux reasoning that transfers into larger security investigations.'},
    kali:{objective:'A practical Linux security workstation used to move between reconnaissance, application testing, network analysis and wireless work.',approach:['Prepare the environment and validate interfaces, routes and tooling.','Select the smallest toolset necessary for the security question.','Troubleshoot the platform itself when drivers, networking or tooling become part of the problem.'],artifacts:['Scan results','HTTP captures','Packet captures','Wireless observations','System diagnostics'],outcome:'Provides a repeatable workspace for hands-on security research and troubleshooting.'},
    crossplatform:{objective:'Cross-platform analysis that connects Windows and Linux behavior, artifacts and network evidence.',approach:['Identify the relevant host, filesystem, registry, memory or network evidence.','Preserve and correlate artifacts rather than treating one indicator as conclusive.','Build an investigation timeline that explains what happened and why it matters.'],artifacts:['Windows artifacts','Filesystem evidence','Network captures','Investigation timelines'],outcome:'Builds evidence-driven investigation skills across the two dominant desktop/server ecosystems.'},
    virtualbox:{objective:'Controlled research infrastructure for reproducible vulnerable systems, isolated testing and clean resets.',approach:['Design the virtual topology around the research question.','Use isolation, snapshots and repeatable configurations to control variables.','Reset and reproduce the same path when validating a finding or technique.'],artifacts:['VM configurations','Network topology','Snapshots','Reproduction states'],outcome:'Makes security experiments repeatable without contaminating the primary environment.'},
    github:{objective:'Public engineering trail where code, documentation and technical decisions become inspectable evidence.',approach:['Version technical changes instead of presenting only the final result.','Document compatibility issues, implementation decisions and validation.','Keep research reproducible enough for another engineer to inspect the work.'],artifacts:['Source code','Commit history','README documentation','Build/validation notes'],outcome:'Demonstrates that technical security work is built, maintained and documented—not merely claimed.'},
    networkwalks:{objective:'Professional cybersecurity environment combining assessment, research, investigation, engineering and technical project execution.',approach:['Translate assigned objectives into structured technical work.','Stay hands-on with validation and evidence while coordinating execution.','Connect findings and project output to defensible security decisions and documentation.'],artifacts:['Assessment evidence','Technical reports','Research outputs','Project deliverables'],outcome:'Connects multidisciplinary security practice with professional execution and technical responsibility.'},
    underground:{objective:'Adversary and underground intelligence research focused on understanding ecosystems, actors, infrastructure and exposed information.',approach:['Observe research-accessible underground communities and threat reporting for context.','Correlate aliases, infrastructure, service models, leak/exposure signals and behavior across sources.','Translate observations into threat context, indicators and TTP-oriented understanding rather than treating a source in isolation.'],artifacts:['Forum observations','Threat-actor context','Infrastructure relationships','Leak/exposure indicators','TTP mappings'],outcome:'Adds adversary context to OSINT and threat intelligence without confusing observation with attribution.'},
    osint:{objective:'Open-source intelligence collection that turns fragmented public observations into structured infrastructure and adversary context.',approach:['Collect domains, DNS, certificates, reports and other observable indicators.','Cross-check independent sources before drawing conclusions.','Connect infrastructure, indicators and behavior into a coherent intelligence picture.'],artifacts:['Domains and DNS records','Certificate relationships','IOC sets','Threat-report references','TTP context'],outcome:'Builds a disciplined foundation for reconnaissance and threat intelligence.'}
  };
  const envProjects={
    portswigger:[['web','Web Application Security Lab','50+ PortSwigger labs across application-security scenarios.'],['mediroza','Mediroza Web Application Security Assessment','Authorized black-box assessment with 8+ documented findings.']],
    bugbounty:[['web','Web Application Security Lab','50+ labs supporting vulnerability discovery and manual validation.'],['mediroza','Mediroza Web Application Security Assessment','Authorized assessment demonstrating practical web-security validation.']],
    htb:[['vulnhub','Vulnerability Assessment & Privilege Escalation','Controlled attack-path research across vulnerable environments.'],['buffer','Buffer Overflow Exploit Development','Low-level controlled exploitation and debugger-assisted research.']],
    vulnhub:[['vulnhub','Vulnerability Assessment & Privilege Escalation','Vulnerable systems, service enumeration, exploitation and privilege escalation.']],
    overthewire:[['vulnhub','Vulnerability Assessment & Privilege Escalation','Linux command-line reasoning connected to privilege-escalation practice.']],
    kali:[['recon','Network Reconnaissance & Attack-Surface Mapping','Reconnaissance, enumeration and service validation.'],['web','Web Application Security Lab','Application-security testing and HTTP analysis.'],['wireless','Wireless Security Assessment Lab','Wireless packet analysis and controlled testing.'],['driver','RTL8812BU Linux Driver Modernization','Linux wireless driver engineering on real hardware.']],
    crossplatform:[['malware','Malware Analysis & Windows Forensics Research','Windows artifacts, suspicious files and evidence-oriented investigation.'],['threat','Network Traffic Analysis & Threat Hunting','Packet analysis and IOC-oriented investigation.'],['vulnhub','Vulnerability Assessment & Privilege Escalation','Cross-platform vulnerable environments and privilege escalation.']],
    virtualbox:[['vulnhub','Vulnerability Assessment & Privilege Escalation','Controlled vulnerable virtual machines and attack-path reproduction.'],['buffer','Buffer Overflow Exploit Development','Isolated low-level exploitation research.']],
    github:[['driver','RTL8812BU Linux Driver Modernization','13+ source files, kernel compatibility work and real-hardware validation.'],['firmware','SPI Flash & BIOS Protection Research','Firmware protection and flash-analysis research.'],['automation','Security Automation & PoC Tooling','Python/Bash security tooling and repeatable research workflows.'],['website','Cybersecurity Portfolio Engineering','The Research OS itself as a technical web-engineering project.']],
    networkwalks:[['mediroza','Mediroza Web Application Security Assessment','Authorized assessment with evidence-driven reporting.'],['recon','Network Reconnaissance & Attack-Surface Mapping','Structured reconnaissance and attack-surface analysis.'],['web','Web Application Security Lab','50+ PortSwigger labs and application-security research.'],['driver','RTL8812BU Linux Driver Modernization','Security engineering and systems research.']],
    underground:[['recon','Network Reconnaissance & Attack-Surface Mapping','Infrastructure discovery and evidence correlation.'],['threat','Network Traffic Analysis & Threat Hunting','Adversary-behavior and IOC investigation.']],
    osint:[['recon','Network Reconnaissance & Attack-Surface Mapping','DNS, certificates, infrastructure and web-fingerprinting research.'],['threat','Network Traffic Analysis & Threat Hunting','IOC and attacker-behavior investigation.']],
  };
  const groupProjects={
    web:['web','mediroza'],bugbounty:['web','mediroza'],offensive:['vulnhub','buffer','web'],systems:['malware','threat','vulnhub','firmware'],engineering:['driver','automation','firmware','website'],adversary:['recon','threat'],professional:['mediroza','recon','driver','web']
  };
  const externalLinks={
    portswigger:['https://portswigger.net/web-security','Open PortSwigger Web Security Academy'],
    htb:['https://www.hackthebox.com/','Open Hack The Box'],
    vulnhub:['https://www.vulnhub.com/','Open VulnHub'],
    overthewire:['https://overthewire.org/wargames/','Open OverTheWire'],
    kali:['https://www.kali.org/','Open Kali Linux'],
    virtualbox:['https://www.virtualbox.org/','Open VirtualBox'],
    github:['https://github.com/Chandrashekar-Bala','Open GitHub'],
    networkwalks:['https://networkwalks.com/','Open Networkwalks'],
    web:['https://portswigger.net/web-security','Open PortSwigger Web Security Academy']
  };
  const roleData={
    teamlead:{k:'CURRENT ROLE · NETWORKWALKS',t:'TEAM LEAD — CYBERSECURITY',accent:'professional',what:'Lead and contribute to multidisciplinary cybersecurity work across VAPT, offensive security, defensive security, adversary research, security engineering, and technical project execution.',how:['Understand the objective, system and attack surface before choosing a technique','Coordinate technical work while staying close to hands-on validation and investigation','Review findings and deliverables for accuracy, evidence, impact and remediation value','Connect offensive observations with defensive and engineering decisions','Keep technical work reproducible, documented and defensible'],skills:['VAPT','Offensive Security','Defensive Security','Adversary Research','Security Engineering','Technical Projects'],tools:['Burp Suite','Nmap','Wireshark','Linux','Python','Git','Security Tooling'],related:[['Mediroza Web Application Security Assessment','8+ documented findings','assessment'],['RTL8812BU Driver Engineering','13+ source files and hardware validation','engineering'],['Network Reconnaissance & Attack-Surface Mapping','Evidence-led reconnaissance','network']]},
    vapt:{k:'01 · ROLE SCOPE',t:'VAPT — ASSESSMENT MINDSET',accent:'vapt',what:'Assess attack surfaces, validate vulnerabilities, reconstruct practical attack paths and translate evidence into defensible findings.',how:['Reconnaissance before assumptions','Manual validation of observable behavior','Impact and risk analysis','Evidence preservation and technical reporting','Remediation mapping and retest thinking'],skills:['Reconnaissance','Vulnerability Validation','CVSS / CWE','Attack Paths','Evidence','Reporting'],tools:['Nmap','Burp Suite','Nessus','CVSS / CWE','Technical Reporting'],related:[['Mediroza Web Application Security Assessment','8+ documented findings','assessment']]},
    offensive:{k:'02 · ROLE SCOPE',t:'OFFENSIVE SECURITY — ATTACKER PERSPECTIVE',accent:'offensive',what:'Reason through how systems can be attacked, where trust boundaries fail and how individual weaknesses combine into meaningful attack paths.',how:['Attack-surface mapping','Enumeration and service analysis','Controlled exploitation','Privilege escalation reasoning','Post-exploitation impact analysis'],skills:['Attack-Surface Analysis','Enumeration','Controlled Exploitation','Privilege Escalation','Post-Exploitation','Attack Paths'],tools:['Nmap','Burp Suite','Metasploit','Kali Linux','Linux / Windows'],related:[['Vulnerability Assessment & Privilege Escalation','Controlled attack-path research','offensive'],['Web Application Security Lab','50+ PortSwigger labs','web']]},
    defensive:{k:'03 · ROLE SCOPE',t:'DEFENSIVE SECURITY — INVESTIGATION MINDSET',accent:'defensive',what:'Use technical evidence to understand suspicious activity, correlate indicators and think from the perspective of detection and response.',how:['Network and endpoint observation','IOC correlation','Log and traffic analysis','Evidence-driven investigation','Detection and hardening considerations'],skills:['Network Analysis','IOC Correlation','Threat Hunting','Forensic Review','Detection Thinking','Incident Investigation'],tools:['Wireshark','Splunk','Google Chronicle','Volatility','Tcpdump'],related:[['Network Traffic Analysis & Threat Hunting','Packet-level investigation','defensive'],['Malware Analysis & Windows Forensics','Evidence-focused research','forensics']]},
    adversary:{k:'04 · ROLE SCOPE',t:'ADVERSARY RESEARCH — INTELLIGENCE MINDSET',accent:'adversary',what:'Study threat actors, infrastructure, underground ecosystems and TTPs to connect fragmented observations into useful intelligence.',how:['Source collection and correlation','Infrastructure research','Actor and campaign context','Underground ecosystem research','TTP mapping and defensive context'],skills:['OSINT','CTI','Dark Web Research','Infrastructure Research','MITRE ATT&CK','TTP Analysis'],tools:['WHOIS','DNSRecon','crt.sh','Subfinder','Maltego','Tor / I2P research'],related:[['Adversary Research','Threat intelligence and actor analysis','threat'],['Network Reconnaissance','Infrastructure discovery','network']]},
    engineering:{k:'05 · ROLE SCOPE',t:'SECURITY ENGINEERING — BUILD & VALIDATE',accent:'engineering',what:'Stay hands-on with systems, code, networking, wireless and tooling to understand security at the implementation level.',how:['Kernel-facing C analysis','Compatibility troubleshooting','Security automation','Proof-of-concept development','Real-system validation and reproducibility'],skills:['Kernel-Facing C','Linux Systems','Wireless Security','Compatibility Analysis','Security Tooling','Hardware Validation'],tools:['C','Python','GCC','Git','Linux','RTL8812BU'],related:[['RTL8812BU Driver Engineering','13+ source files','engineering'],['Security Automation & PoC Tooling','Python / Bash tooling','automation']]},
    projects:{k:'06 · ROLE SCOPE',t:'TECHNICAL PROJECTS — EXECUTION',accent:'projects',what:'Work across multiple security projects and connect technical execution to evidence, documentation and defensible outcomes.',how:['Break objectives into technical work','Select the right research environment','Validate rather than assume','Document evidence and limitations','Connect work to remediation or engineering outcomes'],skills:['Research','PoC Development','Documentation','Evidence','Project Execution','Technical Review'],tools:['GitHub','Python','Bash','C','Burp Suite','Nmap'],related:[['Web Application Security Assessment','Security assessment evidence','assessment'],['RTL8812BU Driver Engineering','Systems engineering','engineering'],['Security Automation & PoC Tooling','Security tooling','automation']]}
  };
  let researchParentGroup=null;
  let researchParentEnv=null;
  let researchParentProject=null;
  const envGroupModal=document.getElementById('envGroupModal');
  const envGroupContent=document.getElementById('envGroupModalContent');
  const envGroupTitle=document.getElementById('envGroupModalTitle');
  const envGroupLead=document.getElementById('envGroupModalLead');

  function openLayer(el){if(!el)return;el.classList.add('open');el.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}
  function closeLayer(el){if(!el)return;el.classList.remove('open');el.setAttribute('aria-hidden','true');if(!document.querySelector('.research-map-modal.open,.env-group-modal.open,.role-dossier-modal.open,.env-modal.open,.env-project-modal.open')) document.body.classList.remove('modal-open');}
  /* Central project resolver. Every interactive layer uses the same canonical IDs. */
  const projectAliases={
    assessment:'mediroza', mediroza:'mediroza', 'mediroza assessment':'mediroza',
    engineering:'driver', driver:'driver', 'rtl8812bu driver engineering':'driver', 'rtl8812bu linux driver modernization':'driver',
    network:'recon', recon:'recon', 'network reconnaissance':'recon', 'network reconnaissance & attack-surface mapping':'recon',
    web:'web', 'web application security lab':'web', portswigger:'web',
    offensive:'vulnhub', vulnhub:'vulnhub', 'vulnerability assessment & privilege escalation':'vulnhub',
    defensive:'threat', threat:'threat', 'network traffic analysis & threat hunting':'threat',
    forensics:'malware', malware:'malware', 'malware analysis & windows forensics research':'malware',
    mobile:'android', android:'android', 'android security analysis':'android',
    automation:'automation', 'security automation & poc tooling':'automation',
    firmware:'firmware', 'spi flash & bios protection research':'firmware',
    wireless:'wireless', 'wireless security assessment lab':'wireless',
    password:'password', 'protected pdf & password security analysis':'password',
    buffer:'buffer', 'buffer overflow exploit development':'buffer',
    website:'website', 'cybersecurity portfolio engineering':'website',
    experience:null, projects:null
  };
  function normalizeProjectKey(value){return String(value||'').trim().toLowerCase().replace(/&amp;/g,'&').replace(/\s+/g,' ');}
  function projectRef(key){
    const normalized=normalizeProjectKey(key);
    return Object.prototype.hasOwnProperty.call(projectAliases,normalized)?projectAliases[normalized]:String(key||'').trim();
  }
  function resolveProjectFromLabel(label){
    const direct=projectRef(label); if(direct && document.querySelector(`#projects .project-card[data-project=\"${CSS.escape?CSS.escape(direct):direct}\"]`)) return direct;
    const wanted=normalizeProjectKey(label);
    const card=[...document.querySelectorAll('#projects .project-card')].find(c=>normalizeProjectKey(c.querySelector('h3')?.textContent)===wanted);
    return card?.dataset.project||null;
  }
  window.resolveProjectKey=projectRef;
  window.resolveProjectFromLabel=resolveProjectFromLabel;

  function renderEnv(key){
    const d=envData[key]||envData.portswigger;
    const depth=envDepth[key]||{skills:d.focus,tools:d.signals};
    const narrative=envNarrative[key]||{what:d.focus,analysis:d.signals,output:'Practical security research connected to the broader technical record.'};
    const ext=externalLinks[key];
    const extHtml=ext?`<a class="env-external-link" href="${ext[0]}" target="_blank" rel="noopener noreferrer"><i class="fas fa-arrow-up-right-from-square"></i> ${escapeHtml(ext[1])}</a>`:'';
    const backHtml=researchParentGroup?`<button type="button" class="env-back-link" data-back-env-group="${escapeHtml(researchParentGroup)}"><i class="fas fa-arrow-left"></i> Back to ${escapeHtml(groups[researchParentGroup]?.title||'Research Domain')}</button>`:'';
    const what=narrative.what.map(x=>`<li>${escapeHtml(x)}</li>`).join('');
    const analysis=narrative.analysis.map(x=>`<span>${escapeHtml(x)}</span>`).join('');
    const insight=envInsights[key]||{objective:narrative.output,approach:narrative.what,artifacts:narrative.analysis,outcome:narrative.output};
    const related=envProjects[key]||[];
    const relatedHtml=related.length?related.map(x=>{const ref=projectRef(x[0]);return `<button type="button" class="env-evidence-card" data-env-evidence-project="${escapeHtml(ref)}"><span>RELATED EVIDENCE</span><strong>${escapeHtml(x[1])}</strong><small>${escapeHtml(x[2])}</small><i class="fas fa-arrow-right"></i></button>`}).join(''):'<p class="env-empty-note">No dedicated public case file is currently mapped to this environment.</p>';
    const domainKey=Object.entries(groups).find(([,g])=>g.envs.includes(key))?.[0]||null;
    const domainTitle=domainKey?groups[domainKey].title:'Research Environment';
    const domainBtn=domainKey?`<button type="button" class="env-domain-link" data-open-domain-from-env="${escapeHtml(domainKey)}"><i class="fas fa-sitemap"></i> Explore ${escapeHtml(domainTitle)}</button>`:'';
    envContent.innerHTML=`<div class="env-dossier-identity"><div><span class="modal-kicker">${escapeHtml(d.k)}</span><h2 id="envModalTitle">${escapeHtml(d.t)}</h2><p class="env-modal-lead">${escapeHtml(d.lead)}</p></div><span class="env-dossier-status">HANDS-ON · ${escapeHtml(String(d.signals.length).padStart(2,'0'))} SIGNALS</span></div>${backHtml}
      <section class="env-deep-intro env-objective-panel"><div><span class="modal-kicker">RESEARCH OBJECTIVE</span><h4>Why this environment matters</h4></div><p>${escapeHtml(insight.objective)}</p></section>
      <div class="env-modal-grid"><section><h4><i class="fas fa-crosshairs"></i> What I Actually Do</h4><ul>${insight.approach.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section><section><h4><i class="fas fa-route"></i> Working Method</h4><div class="env-flow"><small>WORKFLOW</small><strong>${escapeHtml(d.flow)}</strong></div><p class="env-modal-note">${escapeHtml(insight.outcome)}</p></section></div>
      <section class="env-analysis-panel"><div><span class="modal-kicker">RESEARCH LENS</span><h4>What I inspect, test or correlate</h4></div><div class="env-analysis-tags">${analysis}</div></section>
      <section class="env-evidence-panel"><div class="env-depth-head"><div><span class="modal-kicker">TECHNICAL RECORD</span><h4><i class="fas fa-file-shield"></i> Evidence &amp; Outputs</h4></div><span class="env-depth-count">${insight.artifacts.length} focus points</span></div><div class="env-artifact-grid">${insight.artifacts.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div></section>
      <section class="env-depth-panel"><div class="env-depth-head"><div><span class="modal-kicker">PRACTICAL DEPTH</span><h4><i class="fas fa-screwdriver-wrench"></i> Skills &amp; Tools</h4></div><span class="env-depth-count">${depth.skills.length + depth.tools.length} signals</span></div><div class="env-depth-columns"><div><small>SKILLS</small><div class="env-signal-tags">${depth.skills.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div></div><div><small>TOOLS / PLATFORMS</small><div class="env-signal-tags">${depth.tools.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div></div></div></section>
      <section class="env-related env-evidence-record"><div class="env-related-head"><div><span class="modal-kicker">CONNECTED WORK</span><h4><i class="fas fa-link"></i> Related Projects &amp; Case Files</h4></div><small>Open the evidence behind this environment.</small></div><div class="env-evidence-grid">${relatedHtml}</div></section>
      <section class="env-modal-actions">${domainBtn}<button type="button" class="env-project-record-trigger" data-open-env-projects="${escapeHtml(key)}"><i class="fas fa-folder-open"></i> Open Project Record</button>${extHtml}</section>`;
  }

  function openEnv(key='portswigger',parentGroup=null){researchParentGroup=parentGroup;researchParentEnv=key;if(envGroupModal?.classList.contains('open'))closeLayer(envGroupModal);renderEnv(key);openLayer(envModal);}

  function renderGroup(key){
    const d=groups[key]; if(!d||!envGroupContent)return;
    const depth=groupDepth[key]||{what:[d.lead],tools:d.signals};
    const envButtons=d.envs.map(k=>{const e=envData[k];return `<button type="button" class="group-env-chip" data-open-env-from-group="${escapeHtml(k)}" data-parent-group="${escapeHtml(key)}"><span>${escapeHtml(e.k.split(' · ')[0])}</span><strong>${escapeHtml(e.t)}</strong><small>${e.signals.slice(0,3).map(escapeHtml).join(' · ')}</small><i class="fas fa-arrow-up-right-from-square"></i></button>`}).join('');
    const related=(groupProjects[key]||[]).map(k=>{const source=Object.values(envProjects).flat().find(x=>x[0]===k);return source?`<button type="button" class="env-related-project" data-open-group-project-record="${escapeHtml(k)}" data-parent-group="${escapeHtml(key)}"><strong>${escapeHtml(source[1])}</strong><span>${escapeHtml(source[2])}</span><i class="fas fa-arrow-right"></i></button>`:''}).join('');
    envGroupTitle.textContent=d.title;envGroupLead.textContent=d.lead;
    envGroupContent.innerHTML=`<div class="group-dossier-grid"><section><h4><i class="fas fa-brain"></i> What I Do</h4><ul class="group-focus-list">${depth.what.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section><section><h4><i class="fas fa-screwdriver-wrench"></i> Skills &amp; Tools</h4><div class="env-signal-tags group-tool-tags">${depth.tools.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div><div class="group-flow"><small>RESEARCH PATH</small><strong>Explore → Reproduce → Validate → Investigate → Engineer</strong></div></section></div><section class="group-environments-panel"><h4><i class="fas fa-cubes"></i> Environments &amp; Practice</h4><div class="group-env-list">${envButtons}</div></section><section class="env-related"><h4><i class="fas fa-file-shield"></i> Related Technical Record</h4><div class="env-related-grid">${related || '<p class="env-empty-note">No dedicated public case file is currently mapped to this domain.</p>'}</div></section><div class="env-group-footer"><button type="button" class="env-back-link" data-back-to-research-map><i class="fas fa-arrow-left"></i> Back to Research Environment</button></div>`;
  }
  function openGroup(key){researchParentGroup=key;researchParentEnv=null;researchParentProject=null;if(mapModal?.classList.contains('open'))closeLayer(mapModal);renderGroup(key);openLayer(envGroupModal);}
  window.__cbOpenResearchGroup=openGroup;
  window.__cbOpenResearchEnvironment=openEnv;

  function renderProjectRecord(title,lead,keys,sourceType='environment',parentKey=null){
    if(!envProjectContent||!envProjectTitle||!envProjectLead)return;
    const details=keys.map(k=>{const source=Object.values(envProjects).flat().find(x=>x[0]===k);if(!source)return '';return `<button type="button" class="env-project-item" data-env-project-key="${escapeHtml(k)}"><span class="env-project-item-kicker">CASE FILE</span><strong>${escapeHtml(source[1])}</strong><span>${escapeHtml(source[2]||'Technical project record.')}</span><i class="fas fa-arrow-right"></i></button>`;}).join('');
    const back=sourceType==='group'?`<button type="button" class="env-back-link" data-back-to-group="${escapeHtml(parentKey||'web')}"><i class="fas fa-arrow-left"></i> Back to ${escapeHtml(groups[parentKey]?.title||'Research Domain')}</button>`:`<button type="button" class="env-back-link" data-back-to-env="${escapeHtml(parentKey||'portswigger')}"><i class="fas fa-arrow-left"></i> Back to ${escapeHtml(envData[parentKey]?.t||'Research Environment')}</button>`;
    envProjectTitle.textContent=title;envProjectLead.textContent=lead;
    envProjectContent.innerHTML=`${back}${keys.length?`<div class="env-project-list">${details}</div><div class="env-project-footer"><span><i class="fas fa-link"></i> Each record opens the existing technical case-file system.</span></div>`:`<div class="env-project-empty"><strong>Research record is still developing.</strong><span>This environment is represented as hands-on practice and currently has no dedicated public case file.</span></div>`}`;
    openLayer(envProjectModal);
  }
  function openEnvProjects(key){const d=envData[key];researchParentProject=key;closeLayer(envModal);renderProjectRecord(`${d?.t||'Related Work'} · Project Record`,`Selected projects and technical evidence connected to this environment.`,envProjects[key]||[],'environment',key);}
  function openGroupProjects(key){const d=groups[key];researchParentProject=key;closeLayer(envGroupModal);renderProjectRecord(`${d?.title||'Research Domain'} · Project Record`,`Projects and case files connected to this research domain.`,groupProjects[key]||[],'group',key);}

  function renderRole(key){const d=roleData[key];if(!d)return;roleContent.innerHTML=`<span class="modal-kicker">${d.k}</span><div class="role-dossier-head"><div><h2 id="roleDossierTitle">${d.t}</h2><p>${d.what}</p></div><span class="role-dossier-index">TEAM LEAD</span></div><div class="role-dossier-grid"><section><h4><i class="fas fa-brain"></i> How I Work</h4><ul>${d.how.map(x=>`<li>${x}</li>`).join('')}</ul><div class="role-dossier-principle"><small>DECISION PRINCIPLE</small><strong>Understand → Validate → Correlate → Improve</strong></div></section><section><h4><i class="fas fa-bullseye"></i> What This Looks Like</h4><p class="role-dossier-explanation">I stay close to the technical problem: understand the system, validate observable behaviour, follow the evidence, connect it to impact, and turn the result into a defensible security or engineering decision.</p><div class="role-thinking-flow"><span>OBSERVE</span><b>→</b><span>VALIDATE</span><b>→</b><span>INVESTIGATE</span><b>→</b><span>IMPROVE</span></div></section></div><section class="role-related"><h4><i class="fas fa-link"></i> Related Work</h4><div class="role-related-grid">${d.related.map(x=>`<button type="button" data-env-related="${x[2]}"><strong>${x[0]}</strong><span>${x[1]}</span><i class="fas fa-arrow-right"></i></button>`).join('')}</div></section><section class="role-depth-panel"><div class="role-depth-head"><div><span class="modal-kicker">TECHNICAL DEPTH</span><h4><i class="fas fa-layer-group"></i> Skills &amp; Tools</h4></div><span class="env-depth-count">${d.skills.length+d.tools.length} signals</span></div><div class="role-depth-columns"><div><small>SKILLS</small><div class="role-dossier-tags">${d.skills.map(x=>`<span>${x}</span>`).join('')}</div></div><div><small>TOOLS / PLATFORMS</small><div class="role-dossier-tags">${d.tools.map(x=>`<span>${x}</span>`).join('')}</div></div></div></section>`;openLayer(roleModal);}
  document.getElementById('heroResearchEnvironment')?.addEventListener('click',()=>openLayer(mapModal));
  document.getElementById('openResearchEnvironment')?.addEventListener('click',()=>openLayer(mapModal));
  document.querySelectorAll('[data-close-research-map]').forEach(el=>el.addEventListener('click',()=>closeLayer(mapModal)));
  document.querySelectorAll('[data-close-env]').forEach(el=>el.addEventListener('click',()=>closeLayer(envModal)));
  document.querySelectorAll('[data-close-env-group]').forEach(el=>el.addEventListener('click',()=>closeLayer(envGroupModal)));
  document.querySelectorAll('[data-close-env-project]').forEach(el=>el.addEventListener('click',()=>closeLayer(envProjectModal)));
  document.querySelectorAll('.env-card').forEach(card=>card.addEventListener('click',()=>openEnv(card.dataset.env)));
  document.querySelectorAll('.role-scope-trigger').forEach(b=>b.addEventListener('click',()=>renderRole(b.dataset.roleScope)));
  document.querySelectorAll('[data-role-skill]').forEach(b=>b.addEventListener('click',()=>{ const key=b.dataset.roleSkill; if(roleData[key]) renderRole(key); else if(typeof window.openSecurityCommand==='function') window.openSecurityCommand(key); else document.getElementById('security-command')?.scrollIntoView({behavior:'smooth'}); }));
  document.querySelectorAll('[data-close-role-dossier]').forEach(el=>el.addEventListener('click',()=>closeLayer(roleModal)));
  document.addEventListener('click',e=>{
    const group=e.target.closest('[data-research-group]'); if(group){openGroup(group.dataset.researchGroup);return;}
    const envFromGroup=e.target.closest('[data-open-env-from-group]'); if(envFromGroup){openEnv(envFromGroup.dataset.openEnvFromGroup,envFromGroup.dataset.parentGroup);return;}
    const env=e.target.closest('[data-open-env]'); if(env){openEnv(env.dataset.openEnv);return;}
    const envProjectsButton=e.target.closest('[data-open-env-projects]'); if(envProjectsButton){openEnvProjects(envProjectsButton.dataset.openEnvProjects);return;}
    const groupProjectsButton=e.target.closest('[data-open-group-projects]'); if(groupProjectsButton){openGroupProjects(groupProjectsButton.dataset.openGroupProjects);return;}
    const groupProjectRecord=e.target.closest('[data-open-group-project-record]'); if(groupProjectRecord){
      const projectKey=groupProjectRecord.dataset.openGroupProjectRecord;
      const parent=groupProjectRecord.dataset.parentGroup||researchParentGroup||'web';
      const source=Object.values(envProjects).flat().find(x=>x[0]===projectKey);
      closeLayer(envGroupModal);
      if(source){ renderProjectRecord(source[1]+' · Technical Record', source[2]+' Select the case file below to open the full technical dossier.', [projectKey], 'group', parent); }
      return;
    }
    const groupProject=e.target.closest('[data-open-group-project]'); if(groupProject){openGroupProjects(groupProject.dataset.openGroupProject);return;}
    const backMap=e.target.closest('[data-back-to-research-map]'); if(backMap){closeLayer(envGroupModal);openLayer(mapModal);return;}
    const backGroup=e.target.closest('[data-back-to-group]'); if(backGroup){closeLayer(envProjectModal);renderGroup(backGroup.dataset.backToGroup);openLayer(envGroupModal);return;}
    const backEnv=e.target.closest('[data-back-to-env]'); if(backEnv){closeLayer(envProjectModal);openEnv(backEnv.dataset.backToEnv,researchParentGroup);return;}
    const backEnvGroup=e.target.closest('[data-back-env-group]'); if(backEnvGroup){closeLayer(envModal);openGroup(backEnvGroup.dataset.backEnvGroup);return;}
    const evidence=e.target.closest('[data-env-evidence-project]'); if(evidence){const key=projectRef(evidence.dataset.envEvidenceProject);closeLayer(envModal);setTimeout(()=>{if(window.__cbOpenCase)window.__cbOpenCase(key);else if(window.openProjectModal)window.openProjectModal(key);},90);return;}
    const domain=e.target.closest('[data-open-domain-from-env]'); if(domain){closeLayer(envModal);setTimeout(()=>openGroup(domain.dataset.openDomainFromEnv),90);return;}
    const envProject=e.target.closest('[data-env-project-key]'); if(envProject){closeLayer(envProjectModal);setTimeout(()=>{const key=projectRef(envProject.dataset.envProjectKey);if(window.__cbOpenCase)window.__cbOpenCase(key);else if(window.openProjectModal&&key)window.openProjectModal(key);},120);return;}
    const related=e.target.closest('[data-env-related]'); if(related){
      const filter=related.dataset.envRelated;
      closeLayer(envModal);closeLayer(roleModal);
      if(filter==='experience'){document.getElementById('experience')?.scrollIntoView({behavior:'smooth'});}
      else if(filter==='services'){document.getElementById('services')?.scrollIntoView({behavior:'smooth'});}
      else if(filter==='profile'||filter==='security-command'||filter==='projects'){document.getElementById(filter)?.scrollIntoView({behavior:'smooth'});}
      else if(['assessment','offensive','defensive','threat','engineering','forensics','web','network','automation','mobile'].includes(filter)){
        const btn=document.querySelector(`.project-filter[data-filter="${filter}"]`); if(btn) btn.click(); document.getElementById('projects')?.scrollIntoView({behavior:'smooth'});
      }
    }
    const jump=e.target.closest('[data-research-jump]'); if(jump){
      closeLayer(mapModal);
      const caseModal=document.getElementById('caseIndexModal');
      if(caseModal){caseModal.classList.add('open');caseModal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}
    }
  });
  document.addEventListener('keydown',e=>{if(e.key!=='Escape')return;[envProjectModal,envModal,envGroupModal,mapModal,roleModal].forEach(m=>{if(m?.classList.contains('open'))closeLayer(m);});});
});

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
        web: {kicker:'Application Security · PortSwigger', title:'Web Application Security Lab', body:`<p>Hands-on PortSwigger Web Security Academy practice focused on understanding application behavior through manual request/response analysis and controlled exploitation.</p><h4>Coverage</h4><ul><li>SQL injection, XSS, CSRF, SSRF, authentication, authorization and access-control weaknesses.</li><li>Parameter and session behavior, HTTP request manipulation, validation, and remediation-oriented notes.</li><li>Burp Suite and OWASP ZAP used to support repeatable application-security testing.</li></ul><div class="modal-meta"><span>50+ Labs</span><span>Burp Suite</span><span>OWASP ZAP</span><span>OWASP Top 10</span></div><a class="modal-source" href="https://portswigger.net/web-security" target="_blank" rel="noopener noreferrer">PortSwigger Web Security Academy <i class="fas fa-external-link-alt"></i></a>`},
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
        offensive:{k:'01 · OFFENSIVE SECURITY',t:'Offensive Security',tools:['Nmap','Nessus','Metasploit','Burp Suite','OWASP ZAP','SQLMap','John the Ripper','Hydra','Medusa','GDB','WinDbg'],methods:['Reconnaissance','Service enumeration','Vulnerability validation','Controlled exploitation','Privilege escalation','Post-exploitation analysis'],projects:[['Mediroza Web Application Security Assessment','Authorized black-box assessment with demonstrated SQLi/authentication-bypass chain.','assessment','mediroza'],['Vulnerability Assessment & Privilege Escalation','Controlled vulnerable-environment practice using VulnHub/HTB/VMs.','offensive'],['Web Application Security Lab','PortSwigger application-security practice.','web'],['Buffer Overflow Exploit Development','Debugger-assisted low-level research.','engineering']]},
        web:{k:'02 · WEB & APPLICATION SECURITY',t:'Web & Application Security',tools:['Burp Suite','OWASP ZAP','Nmap','cURL','WhatWeb','WAFW00F','SQLMap'],methods:['HTTP request/response analysis','Authentication testing','Authorization and access control','SQL injection','XSS / CSRF / SSRF','Session and parameter analysis'],projects:[['Mediroza Web Application Security Assessment','Flagship assessment with manual validation and CVSS/CWE reporting.','assessment'],['Web Application Security Lab','50+ PortSwigger labs across OWASP-aligned scenarios.','web']]},
        defensive:{k:'03 · DEFENSIVE SECURITY',t:'Defensive Security',tools:['Splunk','Google Chronicle','Wireshark','Tcpdump','Zeek','Volatility'],methods:['Security monitoring','Log analysis','Alert triage','IOC analysis','Threat hunting','Incident-response thinking'],projects:[['Network Traffic Analysis & Threat Hunting','Packet-level investigation and ATT&CK-aligned threat hunting.','defensive','threat'],['Malware Analysis & Windows Forensics Research','Evidence-focused malware and forensic exercises.','forensics'],['Mediroza Assessment','Findings translated into remediation and detection considerations.','assessment']]},
        adversary:{k:'04 · THREAT INTELLIGENCE & ADVERSARY RESEARCH',t:'Threat Intelligence & Adversary Research',tools:['Maltego','theHarvester','Subfinder','crt.sh','CertSpotter','WHOIS','MITRE ATT&CK'],methods:['OSINT','Infrastructure research','TTP analysis','Threat-report analysis','Adversary behavior mapping','OpSec research'],projects:[['Network Reconnaissance & Attack-Surface Mapping','Passive intelligence, DNS, certificates, web fingerprinting and service validation.','network','recon'],['Active Directory Attack-Path Research','Kerberoasting, Pass-the-Hash, ACL abuse and detection considerations.','threat'],['Network Traffic Analysis & Threat Hunting','IOC and attacker-behavior investigation.','defensive']]},
        network:{k:'05 · NETWORK SECURITY',t:'Network Security',tools:['Nmap','Nessus','Wireshark','Tcpdump','Zeek','NSE','dig','DNSRecon','cURL'],methods:['Reconnaissance','Service/version validation','TCP/IP and DNS analysis','TLS inspection','Packet analysis','Suspicious-connection investigation'],projects:[['Network Reconnaissance & Attack-Surface Mapping','Reconnaissance Research structured reconnaissance.','network'],['Network Traffic Analysis & Threat Hunting','Traffic analysis and IOC-oriented investigation.','defensive'],['Vulnerability Assessment & Privilege Escalation','Network/service enumeration across controlled VMs.','offensive']]},
        wireless:{k:'06 · WIRELESS SECURITY',t:'Wireless Security',tools:['Aircrack-ng','Wireshark','hcxdumptool','rtl88x2bu / 88x2bu','iw','Linux wireless tooling'],methods:['Monitor mode','Packet capture','Protocol analysis','Controlled Wi-Fi testing','Driver capability validation'],projects:[['Wireless Security Assessment Lab','Controlled wireless assessment and packet-analysis workflows.','wireless'],['RTL8812BU Linux Driver Modernization','Kernel compatibility work enabling real-hardware wireless testing.','engineering']]},
        mobile:{k:'07 · MOBILE SECURITY',t:'Mobile Security',tools:['Drozer','Dex2jar','JD-GUI','Logcat','Android Studio'],methods:['APK inspection','Decompilation','Static analysis','Dynamic analysis','Runtime observation','Reverse engineering'],projects:[['Android Security Analysis','APK inspection, static/dynamic analysis and runtime behavior review.','mobile','android']]},
        malware:{k:'08 · MALWARE ANALYSIS & REVERSE ENGINEERING',t:'Malware Analysis & Reverse Engineering',tools:['Ghidra','IDA Pro','GDB','Volatility','Wireshark'],methods:['Static analysis','Dynamic analysis','Binary investigation','Execution behavior','Memory / stack analysis','Control-flow analysis','IOC extraction'],projects:[['Malware Analysis & Windows Forensics Research','Hands-on static/dynamic and evidence-analysis exercises.','forensics'],['Buffer Overflow Exploit Development','C and debugger-assisted low-level research.','engineering','buffer']]},
        forensics:{k:'09 · DIGITAL FORENSICS & INCIDENT RESPONSE',t:'Digital Forensics & Incident Response',tools:['Autopsy','Volatility','Windows Registry tools','Wireshark','Linux forensic utilities'],methods:['Registry artifact review','Filesystem analysis','Disk artifacts','Memory analysis','IOC correlation','Timeline-oriented investigation'],projects:[['Malware Analysis & Windows Forensics Research','Windows artifacts, suspicious files and timeline-oriented review.','forensics'],['Network Traffic Analysis & Threat Hunting','Network evidence and IOC correlation.','defensive'],['Mediroza Assessment','Evidence preservation and technical documentation.','assessment']]},
        engineering:{k:'10 · SECURITY ENGINEERING',t:'Security Engineering',tools:['C','Python','Bash','GCC','Git','Linux kernel headers','flashrom','GDB'],methods:['Kernel/API compatibility','Build troubleshooting','Security tooling','Proof-of-concept development','Hardware validation','Technical documentation'],projects:[['RTL8812BU Linux Driver Modernization','13-source-file kernel compatibility project validated on real hardware.','engineering','driver'],['SPI Flash & BIOS Protection Research','Firmware protection and flash analysis.','forensics','firmware'],['Security Automation & PoC Tooling','Python/Bash tooling for repeatable security workflows.','engineering','automation']]},
        systems:{k:'11 · CLOUD, SYSTEMS & VIRTUALIZATION',t:'Cloud, Systems & Virtualization',tools:['Kali Linux','Ubuntu','Windows','VirtualBox','Docker','Linux networking','PowerShell'],methods:['Linux/Windows administration','Virtual lab construction','Network configuration','System troubleshooting','Cloud security and systems architecture'],projects:[['Vulnerability Assessment & Privilege Escalation','Linux/Windows vulnerable environments.','offensive'],['RTL8812BU Driver Engineering','Linux kernel and hardware-backed engineering.','engineering']]},
        automation:{k:'12 · AUTOMATION & SECURITY DEVELOPMENT',t:'Automation & Security Development',tools:['Python','Bash','C','C++','SQL','HTML5','CSS3','JavaScript','Git/GitHub'],methods:['Security automation','Recon tooling','Vulnerability assessment tooling','PoC development','Data analysis','Web engineering'],projects:[['Security Automation & PoC Tooling','Repeatable security workflows and proof-of-concept development.','engineering'],['Cybersecurity Portfolio Engineering','Static web engineering with interactive security content.','engineering','website'],['Fake News Detection System','Python/NLP/ML capstone engineering.','engineering']]}
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
      const key=(window.resolveProjectKey?window.resolveProjectKey(btn.dataset.projectKey):btn.dataset.projectKey);
      if(key&&window.openProjectModal){window.openProjectModal(key);return;}
      const filter=btn.dataset.projectFilter;
      if(filter){const target=$(`#projects .project-card[data-category~="${filter}"]`);if(target&&window.openProjectModal)window.openProjectModal(target.dataset.project);else document.querySelector('#projects')?.scrollIntoView({behavior:'smooth'});}
    });
  });
})();


/* ================================================================
   0xCB v5 RESEARCH OS — human-written interaction engine
   Adds conversation, referral, command navigation, share, deep links,
   and stateful modal behavior without replacing Executive-v4 systems.
   ================================================================ */
(function(){
  const $=(s,r=document)=>r.querySelector(s);
  const $$=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const body=document.body;
  const toast=$('#enhancedToast');
  const modals=$$('.enhanced-modal');
  let lastFocus=null;

  function notify(message){
    if(!toast)return;
    toast.textContent=message;
    toast.classList.add('show');
    clearTimeout(notify.timer);
    notify.timer=setTimeout(()=>toast.classList.remove('show'),2800);
  }
  function openModal(id, focusSelector){
    const modal=$('#'+id); if(!modal)return;
    lastFocus=document.activeElement;
    modals.forEach(m=>{ if(m!==modal){m.classList.remove('open');m.setAttribute('aria-hidden','true');} });
    modal.classList.add('open'); modal.setAttribute('aria-hidden','false'); body.classList.add('enhanced-lock');
    setTimeout(()=>$(focusSelector||'[data-close-enhanced],button,input,select,textarea',modal)?.focus(),30);
  }
  function closeModal(modal){
    if(!modal)return;
    modal.classList.remove('open'); modal.setAttribute('aria-hidden','true');
    if(!modals.some(m=>m.classList.contains('open')))body.classList.remove('enhanced-lock');
    if(lastFocus && typeof lastFocus.focus==='function')setTimeout(()=>lastFocus.focus(),0);
  }
  $$('[data-close-enhanced]').forEach(el=>el.addEventListener('click',()=>closeModal(el.closest('.enhanced-modal'))));
  document.addEventListener('keydown',e=>{
    if(e.key==='Escape'){
      const active=modals.find(m=>m.classList.contains('open')); if(active)closeModal(active);
    }
    const mod=modals.find(m=>m.classList.contains('open')); if(!mod||e.key!=='Tab')return;
    const focusables=$$('button,a,input,select,textarea,[tabindex]:not([tabindex="-1"])',mod).filter(x=>!x.disabled&&x.offsetParent!==null);
    if(!focusables.length)return;
    const first=focusables[0],last=focusables[focusables.length-1];
    if(e.shiftKey&&document.activeElement===first){e.preventDefault();last.focus();}
    else if(!e.shiftKey&&document.activeElement===last){e.preventDefault();first.focus();}
  });

  // Conversation composer
  const topic=$('#conversationTopic'), name=$('#conversationName'), message=$('#conversationMessage'), preview=$('#conversationPreview');
  const defaultMessages={
    'Cybersecurity opportunity':'Hello Chandrashekar, I came across your portfolio and would like to discuss a cybersecurity opportunity.','Security research collaboration':'Hello Chandrashekar, I would like to discuss a potential security research collaboration.','Security assessment discussion':'Hello Chandrashekar, I would like to discuss a security assessment or application-security engagement.','Threat intelligence / CTI':'Hello Chandrashekar, I would like to discuss threat intelligence, CTI, or adversary-research work.','Technical project discussion':'Hello Chandrashekar, I would like to discuss a technical cybersecurity project or engineering opportunity.','General introduction':'Hello Chandrashekar, I came across your portfolio and would like to connect.'
  };
  function updateConversation(){
    if(!topic||!message||!preview)return;
    const t=topic.value||'Cybersecurity opportunity';
    if(!message.dataset.edited || !message.value.trim())message.value=defaultMessages[t]||defaultMessages['General introduction'];
    const who=name?.value.trim();
    preview.innerHTML=`<span>MAIL</span><strong>Subject: ${escapeHtml(t)}</strong><small>${who?'Prepared for '+escapeHtml(who)+'. ':' '}Ready to open in your email client.</small>`;
  }
  function escapeHtml(s){return String(s).replace(/[&<>'"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#39;','"':'&quot;'}[c]));}
  if(message)message.addEventListener('input',()=>message.dataset.edited='true');
  [topic,name].forEach(el=>el?.addEventListener('input',updateConversation));
  $$('.conversation-trigger').forEach(btn=>btn.addEventListener('click',()=>{openModal('conversationModal','#conversationTopic');updateConversation();}));
  $('#sendConversation')?.addEventListener('click',()=>{
    const subject=topic?.value||'Cybersecurity opportunity';
    const who=name?.value.trim();
    const bodyText=(message?.value.trim()||defaultMessages[subject]||defaultMessages['General introduction'])+(who?'\n\nName: '+who:'')+'\n\nPortfolio: '+location.href.split('#')[0];
    location.href='mailto:chandrashekar-bala@protonmail.com?subject='+encodeURIComponent(subject)+'&body='+encodeURIComponent(bodyText);
    notify('Email draft prepared.');
  });
  $('#copyConversation')?.addEventListener('click',async()=>{
    const subject=topic?.value||'Cybersecurity opportunity';
    const who=name?.value.trim();
    const draft='Subject: '+subject+'\n\n'+(message?.value.trim()||defaultMessages[subject]||defaultMessages['General introduction'])+(who?'\n\nName: '+who:'');
    try{await navigator.clipboard.writeText(draft);notify('Conversation draft copied to clipboard.');}
    catch{notify('Clipboard access was unavailable.');}
  });

  // Referral / share
  function referralText(){return 'I’d like to recommend Chandrashekar Bala for a cybersecurity opportunity. His portfolio documents security assessment, web application security, threat intelligence, DFIR, wireless security, and security engineering work. Portfolio: '+location.href.split('#')[0];}
  $('#referralButton')?.addEventListener('click',()=>openModal('referralModal'));
  $('#navConversationTrigger')?.addEventListener('click',()=>{openModal('conversationModal','#conversationTopic');updateConversation();});
  $$('[data-referral="copy"]').forEach(b=>b.addEventListener('click',async()=>{try{await navigator.clipboard.writeText(referralText());notify('Referral note copied.');}catch{notify('Clipboard access was unavailable.');}}));
  $$('[data-referral="share"]').forEach(b=>b.addEventListener('click',async()=>{
    const data={title:'Chandrashekar Bala — Cybersecurity Portfolio',text:'Security research, assessment and engineering portfolio.',url:location.href.split('#')[0]};
    if(navigator.share){try{await navigator.share(data);notify('Portfolio share sheet opened.');}catch(e){if(e.name!=='AbortError')notify('Share action was cancelled.');}}
    else {try{await navigator.clipboard.writeText(data.url);notify('Portfolio link copied.');}catch{notify('Portfolio link: '+data.url);}}
  }));

  // Unified Security Command Center: expertise + capabilities in one interface.
  const securityDomainData={
    offensive:{k:'01 · OFFENSIVE SECURITY',t:'Offensive Security',summary:'Controlled security assessment work focused on understanding attack surfaces, validating weaknesses, reconstructing attack paths, and documenting defensible impact.',tools:['Nmap','Nessus','Metasploit','Burp Suite','OWASP ZAP','GDB','John the Ripper'],methods:['Reconnaissance','Service enumeration','Vulnerability validation','Controlled exploitation','Privilege escalation','Post-exploitation analysis'],projects:[['Mediroza Web Application Security Assessment','Authorized black-box assessment with demonstrated SQLi/authentication-bypass chain.','assessment','mediroza'],['Vulnerability Assessment & Privilege Escalation','Controlled vulnerable-environment practice using VulnHub/HTB/VMs.','offensive','vulnhub'],['Web Application Security Lab','50+ PortSwigger application-security labs.','web','web'],['Buffer Overflow Exploit Development','Debugger-assisted low-level research.','exploit','buffer']]},
    web:{k:'02 · WEB & APPLICATION SECURITY',t:'Web & Application Security',summary:'Manual application-security analysis centered on HTTP behavior, authentication, authorization, access control, request manipulation, and vulnerability validation.',tools:['Burp Suite','OWASP ZAP','Nmap','cURL','WhatWeb','WAFW00F','SQLMap'],methods:['Request/response analysis','Authentication testing','Authorization and access control','SQL injection','XSS / CSRF / SSRF','Session and parameter analysis'],projects:[['Mediroza Web Application Security Assessment','Flagship assessment with manual validation and CVSS/CWE reporting.','assessment','mediroza'],['Web Application Security Lab','50+ PortSwigger labs across application-security scenarios.','web','web']]},
    defensive:{k:'03 · DEFENSIVE SECURITY',t:'Defensive Security',summary:'Defensive investigation connecting network visibility, SIEM workflows, indicators, threat hunting, incident response, and detection logic.',tools:['Splunk','Google Chronicle','Wireshark','Tcpdump','Volatility'],methods:['Security monitoring','Log analysis','Alert triage','IOC analysis','Threat hunting','Incident-response thinking'],projects:[['Network Traffic Analysis & Threat Hunting','Packet-level investigation and ATT&CK-aligned threat hunting.','defensive','threat'],['Malware Analysis & Windows Forensics Research','Evidence-focused malware and forensic research.','forensics','malware']]},
    adversary:{k:'04 · ADVERSARY & UNDERGROUND INTELLIGENCE',t:'Adversary & Underground Intelligence',summary:'Research into threat actors, underground ecosystems, adversary infrastructure, exposed information, operational behavior, and TTPs — connecting intelligence collection with defensive insight.',tools:['OSINT','Maltego','theHarvester','Subfinder','crt.sh','WHOIS','Tor / I2P research','MITRE ATT&CK'],methods:['Underground ecosystem research','Threat-actor research','Infrastructure correlation','Leak / exposure research','TTP analysis','Threat-report analysis','Adversary behavior mapping'],projects:[['Network Reconnaissance & Attack-Surface Mapping','Infrastructure discovery, DNS, certificates, web fingerprinting and service validation.','network','recon'],['Network Traffic Analysis & Threat Hunting','Network evidence and attacker-behavior investigation.','threat','threat']]},
    network:{k:'05 · NETWORK & WIRELESS SECURITY',t:'Network & Wireless Security',summary:'Network discovery, protocol behavior, packet analysis, wireless assessment, DNS/TLS investigation, and hardware-backed wireless research.',tools:['Nmap','Wireshark','Aircrack-ng','DNSRecon','dig','NSE','iw'],methods:['Reconnaissance','Service/version validation','TCP/IP and DNS analysis','TLS inspection','Packet analysis','Monitor mode','Controlled Wi-Fi testing'],projects:[['Network Reconnaissance & Attack-Surface Mapping','Structured reconnaissance and service validation.','network','recon'],['Network Traffic Analysis & Threat Hunting','Traffic analysis and IOC-oriented investigation.','defensive','threat'],['RTL8812BU Linux Driver Modernization','Kernel compatibility work validated on real hardware.','engineering','driver']]},
    mobile:{k:'06 · MOBILE SECURITY',t:'Mobile Security',summary:'Android-focused security research spanning APK inspection, static/dynamic analysis, runtime observation, logging, and reverse engineering.',tools:['ADB','Logcat','Dex2jar','JD-GUI','Ghidra'],methods:['APK inspection','Decompilation','Static analysis','Dynamic analysis','Runtime observation','Reverse engineering'],projects:[['Android Security Analysis','APK inspection, static/dynamic analysis and runtime behavior review.','mobile','android']]},
    exploit:{k:'07 · EXPLOIT DEVELOPMENT',t:'Exploit Development',summary:'Low-level research into memory behavior, stack state, control flow, debugging, and controlled proof-of-concept development.',tools:['C','GDB','WinDbg'],methods:['Memory and stack analysis','Debugger-assisted investigation','Control-flow analysis','Controlled PoC development'],projects:[['Buffer Overflow Exploit Development','C and debugger-assisted low-level research.','exploit','buffer']]},
    forensics:{k:'08 · MALWARE ANALYSIS & DIGITAL FORENSICS',t:'Malware Analysis & Digital Forensics',summary:'Static and dynamic malware analysis combined with Windows forensic artifacts, memory/disk evidence, suspicious-file investigation, and indicator extraction.',tools:['Ghidra','IDA Pro','GDB','Volatility','Autopsy','Wireshark'],methods:['Static analysis','Dynamic analysis','Binary investigation','Windows artifact review','Memory/disk investigation','IOC extraction','Timeline-oriented review'],projects:[['Malware Analysis & Windows Forensics Research','Hands-on static/dynamic and evidence-analysis exercises.','forensics','malware'],['Network Traffic Analysis & Threat Hunting','Network evidence and IOC correlation.','defensive','threat']]},
    engineering:{k:'09 · SECURITY ENGINEERING',t:'Security Engineering',summary:'Engineering work close to the system: Linux, kernel-facing C, driver compatibility, build troubleshooting, security tooling, firmware research, and real-hardware validation.',tools:['C','Python','Bash','GCC','Git','Linux kernel headers','flashrom','GDB'],methods:['Kernel/API compatibility','Build troubleshooting','Security tooling','PoC development','Hardware validation','Technical documentation'],projects:[['RTL8812BU Linux Driver Modernization','13-source-file kernel compatibility project validated on real hardware.','engineering','driver'],['SPI Flash & BIOS Protection Research','Firmware protection and flash analysis.','forensics','firmware'],['Security Automation & PoC Tooling','Python/Bash tooling for repeatable security workflows.','engineering','automation']]},
    systems:{k:'10 · SYSTEMS & VIRTUALIZATION',t:'Systems & Virtualization',summary:'Linux and Windows environments, virtual labs, network configuration, system troubleshooting, and platform security work.',tools:['Kali Linux','Windows','VirtualBox','Docker','PowerShell','Linux networking'],methods:['Linux/Windows security analysis','Virtual lab construction','Network configuration','System troubleshooting','Platform security'],projects:[['Vulnerability Assessment & Privilege Escalation','Linux/Windows vulnerable environments.','offensive','vulnhub'],['RTL8812BU Linux Driver Modernization','Linux kernel and hardware-backed engineering.','engineering','driver']]},
    automation:{k:'11 · SECURITY AUTOMATION & DEVELOPMENT',t:'Security Automation & Development',summary:'Python, Bash, C, SQL, and web engineering used to make security research repeatable and to build focused proof-of-concept tooling.',tools:['Python','Bash','C','C++','SQL','HTML5','CSS3','JavaScript','Git/GitHub'],methods:['Security automation','Recon tooling','Vulnerability assessment tooling','PoC development','Data analysis','Web engineering'],projects:[['Security Automation & PoC Tooling','Repeatable security workflows and proof-of-concept development.','engineering','automation'],['Cybersecurity Portfolio Engineering','Static web engineering with interactive security content.','engineering','website']]},
    research:{k:'12 · EVIDENCE & SECURITY REPORTING',t:'Evidence & Security Reporting',summary:'Turning technical activity into defensible security records through evidence handling, severity context, root-cause analysis, remediation mapping, and retest planning.',tools:['CVSS','CWE','SHA-256','Burp Suite','Wireshark','Nmap','Technical reporting'],methods:['Evidence preservation','Finding classification','Root-cause analysis','Impact analysis','Remediation mapping','Retest planning'],projects:[['Mediroza Web Application Security Assessment','Eight documented findings with CVSS/CWE context and evidence organization.','assessment','mediroza'],['Network Reconnaissance & Attack-Surface Mapping','Evidence-vs-hypothesis discipline in reconnaissance.','network','recon']]}
  };
  const scm=$('#securityCommandModal'), scContent=$('#securityCommandModalContent'), scTabs=$('#securityCommandTabs');
  function projectButtonHtml(p){const ref=p[3]||projectRef(p[2]);return `<button type="button" class="security-related-case" data-security-project="${escapeHtml(ref||'')}"><strong>${escapeHtml(p[0])}</strong><span>${escapeHtml(p[1])}</span><i class="fas fa-arrow-right"></i></button>`;}
  function renderSecurityDomain(key){
    const d=securityDomainData[key]; if(!d||!scContent)return;
    $$('.security-command-tab',scTabs).forEach(b=>b.classList.toggle('active',b.dataset.domain===key));
    scContent.innerHTML=`<div class="sc-domain-head"><div><span class="modal-kicker">${escapeHtml(d.k)}</span><h3>${escapeHtml(d.t)}</h3><p>${escapeHtml(d.summary)}</p></div><div class="sc-domain-index">${String(Object.keys(securityDomainData).indexOf(key)+1).padStart(2,'0')} / ${Object.keys(securityDomainData).length}</div></div><section class="sc-method-panel"><h4><i class="fas fa-route"></i> Methods &amp; Practice</h4><ul>${d.methods.map(x=>`<li>${escapeHtml(x)}</li>`).join('')}</ul></section><section class="sc-depth-note"><div><span class="modal-kicker">HOW THIS SHOWS UP IN MY WORK</span><h4>${escapeHtml(d.t)} in practice</h4></div><p>${escapeHtml(d.summary)} I connect the methods below to documented technical work, then follow the evidence into a case file where available.</p></section><section class="sc-related"><div class="sc-related-head"><h4><i class="fas fa-file-shield"></i> Related Case Files</h4><small>Open a record to launch its full technical dossier.</small></div><div class="sc-related-grid">${d.projects.map(projectButtonHtml).join('')}</div></section><section class="sc-tools-panel"><div class="sc-tools-head"><div><span class="modal-kicker">TECHNICAL DEPTH</span><h4><i class="fas fa-screwdriver-wrench"></i> Skills &amp; Tools</h4></div><span class="env-depth-count">${d.tools.length} tools / technologies</span></div><div class="modal-meta">${d.tools.map(x=>`<span>${escapeHtml(x)}</span>`).join('')}</div></section>`;
    scContent.querySelectorAll('[data-security-project]').forEach(b=>b.addEventListener('click',()=>{
      const raw=b.dataset.securityProject;
      const key=projectRef(raw);
      const card=[...document.querySelectorAll('#projects .project-card')].find(c=>c.dataset.project===key);
      if(!key || (!card && !window.openProjectModal)) return;
      closeSecurityCommand();
      setTimeout(()=>{
        if(window.openProjectModal){ window.openProjectModal(key); }
        else if(card){ card.querySelector('.project-open')?.click(); }
      },80);
    }));
  }
  function openSecurityCommand(key='web'){
    if(!scm||!scContent)return;
    scTabs.innerHTML=Object.entries(securityDomainData).map(([k,d])=>`<button class="security-command-tab${k===key?' active':''}" type="button" data-domain="${k}">${escapeHtml(d.t.replace(/ &.*$/,''))}</button>`).join('');
    scTabs.querySelectorAll('[data-domain]').forEach(b=>b.addEventListener('click',()=>renderSecurityDomain(b.dataset.domain)));
    renderSecurityDomain(key);
    scm.classList.add('open');scm.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');
  }
  function closeSecurityCommand(){if(!scm)return;scm.classList.remove('open');scm.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');}
  window.openSecurityCommand=openSecurityCommand;
  $('#openSecurityCommand')?.addEventListener('click',()=>openSecurityCommand('web'));
  $('#openSecurityCommandBottom')?.addEventListener('click',()=>openSecurityCommand('offensive'));
  $$('.unified-domain-card').forEach(b=>b.addEventListener('click',()=>openSecurityCommand(b.dataset.securityDomain)));
  scm?.querySelectorAll('[data-close-security-command]').forEach(x=>x.addEventListener('click',closeSecurityCommand));
  document.addEventListener('keydown',e=>{if(e.key==='Escape'&&scm?.classList.contains('open'))closeSecurityCommand();});

  // Command center
  const commandItems=[
    ['Overview','Jump to the portfolio start','home','NAV'],['Profile','Whoami and professional profile','about','NAV'],['Security Command','Unified security disciplines, tooling and case work','security-command','NAV'],['Research Environment','Hands-on labs, platforms, research infrastructure and adversary intelligence','research-environment','NAV'],['Experience','Experience and research record','experience','NAV'],['Case Studies','Open the technical case index','cases','ACTION'],['Research Priorities','Current research focus','focus','NAV'],['Professional Record','Evidence and milestones','achievements','NAV'],['Credentials','Certifications and training','certs','NAV'],['Services','How I can contribute','services','NAV'],['Contact','Open the conversation channel','conversation','ACTION'],['Refer / Share','Open referral and sharing tools','referral','ACTION'],['Resume','Open the latest resume','resume','ACTION'],['GitHub','Open source portfolio profile','github','ACTION'],['LinkedIn','Open professional profile','linkedin','ACTION'],['Email','Open direct email','email','ACTION'],['Toggle Theme','Switch dark/light interface','theme','ACTION']
  ];
  const commandList=$('#commandList'), search=$('#commandSearch');
  function renderCommands(filter=''){
    if(!commandList)return;
    const f=filter.trim().toLowerCase();
    const visible=commandItems.filter(x=>(x[0]+' '+x[1]+' '+x[3]).toLowerCase().includes(f));
    commandList.innerHTML=visible.length?visible.map((x,i)=>`<button class="command-item${i===0?' active':''}" type="button" data-command="${x[2]}"><span><strong>${escapeHtml(x[0])}</strong><small>${escapeHtml(x[1])}</small></span><b>${escapeHtml(x[3])}</b></button>`).join(''):'<div class="command-empty">No matching command.</div>';
  }
  function openCommand(){openModal('commandModal','#commandSearch');renderCommands('');if(search){search.value='';setTimeout(()=>search.focus(),40);}}
  $('#commandTrigger')?.addEventListener('click',openCommand);
  $$('[data-command-action]').forEach(b=>b.addEventListener('click',()=>executeCommand(b.dataset.commandAction)));
  function executeCommand(key){
    if(key==='command'){openCommand();return;}
    if(key==='conversation'){openModal('conversationModal','#conversationTopic');updateConversation();return;}
    if(key==='referral'){openModal('referralModal');return;}
    if(key==='share'){$('[data-referral="share"]')?.click();return;}
    if(key==='cases'){const m=$('#caseIndexModal');if(m){m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}else{$('#caseIndexToggle')?.click();}return;}
    if(key==='capabilities'||key==='security-command'){openSecurityCommand();return;}
    if(key==='resume'){handleResumeClick({preventDefault(){}});return;}
    if(key==='github'){window.open('https://github.com/Chandrashekar-Bala','_blank','noopener');return;}
    if(key==='linkedin'){window.open('https://www.linkedin.com/in/chandrashekar-bala/','_blank','noopener');return;}
    if(key==='email'){location.href='mailto:chandrashekar-bala@protonmail.com';return;}
    if(key==='theme'){$('.theme-toggle')?.click();return;}
    const target=document.getElementById(key);if(target){closeModal($('#commandModal'));target.scrollIntoView({behavior:'smooth',block:'start'});}
  }
  commandList?.addEventListener('click',e=>{const b=e.target.closest('[data-command]');if(b){closeModal($('#commandModal'));executeCommand(b.dataset.command);}});
  search?.addEventListener('input',()=>renderCommands(search.value));
  search?.addEventListener('keydown',e=>{
    const items=$$('.command-item',commandList);if(!items.length)return;const active=Math.max(0,items.findIndex(x=>x.classList.contains('active')));
    if(e.key==='ArrowDown'){e.preventDefault();items[active]?.classList.remove('active');items[(active+1)%items.length].classList.add('active');items[(active+1)%items.length].scrollIntoView({block:'nearest'});}
    if(e.key==='ArrowUp'){e.preventDefault();items[active]?.classList.remove('active');items[(active-1+items.length)%items.length].classList.add('active');items[(active-1+items.length)%items.length].scrollIntoView({block:'nearest'});}
    if(e.key==='Enter'){e.preventDefault();items[active]?.click();}
  });
  document.addEventListener('keydown',e=>{
    if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==='k'){e.preventDefault();openCommand();}
    if(e.key==='/' && !/input|textarea|select/i.test(document.activeElement?.tagName||'')){e.preventDefault();openCommand();}
  });

  // Share buttons and case deep-linking. Hashes make individual dossiers bookmarkable.
  function syncHash(){
    const hash=location.hash.replace(/^#/,'');
    const m=hash.match(/^case\/(.+)$/);if(m&&window.openProjectModal){setTimeout(()=>window.openProjectModal(decodeURIComponent(m[1])),120);}
    if(hash==='contact')setTimeout(()=>openModal('conversationModal','#conversationTopic'),120);
  }
  window.addEventListener('hashchange',syncHash);syncHash();
  // Wrap v4 project opener once it exists so case files become addressable without changing its UI.
  const patchProjectOpener=()=>{
    if(!window.openProjectModal||window.__v5PatchedProject)return;
    const original=window.openProjectModal;window.openProjectModal=function(key){
      original(key);try{history.replaceState(null,'','#case/'+encodeURIComponent(key));}catch(e){}
    };window.__v5PatchedProject=true;
  };
  setTimeout(()=>{patchProjectOpener();syncHash();},50);setTimeout(()=>{patchProjectOpener();syncHash();},500);

  // Prevent stale #case hashes when navigating through primary sections.
  $$('.nav-links a, .logo, .back-to-top').forEach(a=>a.addEventListener('click',()=>{if(location.hash.startsWith('#case/'))history.replaceState(null,'',a.getAttribute('href')||'#home');}));

  // Add a small "secure interface" status toast on first load, but never obstruct the user.
  setTimeout(()=>{if(!sessionStorage.getItem('cb_v5_seen')){notify('0xCB Research OS ready · 50+ web labs · 65+ evidence files.');sessionStorage.setItem('cb_v5_seen','1');}},900);
})();


/* =====================================================================
   0xCB FINAL INTERACTION ROUTER
   One canonical router for every nested Research OS → Case File path.
   This intentionally runs in capture phase so legacy handlers cannot
   swallow a click or route a project key to the wrong layer.
   ===================================================================== */
(function(){
  const q=(s,r=document)=>r.querySelector(s);
  const qa=(s,r=document)=>Array.from(r.querySelectorAll(s));
  const canonical={
    mediroza:'mediroza', assessment:'mediroza', 'mediroza assessment':'mediroza',
    driver:'driver', engineering:'driver', 'rtl8812bu driver engineering':'driver', 'rtl8812bu linux driver modernization':'driver',
    recon:'recon', network:'recon', 'network reconnaissance':'recon', 'network reconnaissance & attack-surface mapping':'recon',
    web:'web', portswigger:'web', 'web application security lab':'web',
    vulnhub:'vulnhub', offensive:'vulnhub', 'vulnerability assessment & privilege escalation':'vulnhub',
    threat:'threat', defensive:'threat', 'network traffic analysis & threat hunting':'threat',
    malware:'malware', forensics:'malware', 'malware analysis & windows forensics research':'malware',
    android:'android', mobile:'android', 'android security analysis':'android',
    wireless:'wireless', 'wireless security assessment lab':'wireless',
    firmware:'firmware', 'spi flash & bios protection research':'firmware',
    automation:'automation', 'security automation & poc tooling':'automation',
    buffer:'buffer', 'buffer overflow exploit development':'buffer',
    website:'website', 'cybersecurity portfolio engineering':'website',
    password:'password', 'protected pdf & password security analysis':'password'
  };
  const norm=v=>String(v||'').trim().toLowerCase().replace(/&amp;/g,'&').replace(/\s+/g,' ');
  function resolve(value){
    const n=norm(value); if(canonical[n]) return canonical[n];
    const card=qa('#projects .project-card').find(c=>norm(c.dataset.project)===n || norm(c.querySelector('h3')?.textContent)===n);
    return card?.dataset.project||null;
  }
  function closeResearchLayers(){
    ['envProjectModal','envModal','envGroupModal','researchMapModal','roleDossierModal','securityCommandModal','caseIndexModal'].forEach(id=>{
      const m=q('#'+id); if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true');}
    });
  }
  function openCase(key){
    const resolved=resolve(key);
    if(!resolved){
      const title=String(key||'').trim();
      window.__cbNotify?.('No case file is mapped to this record yet.');
      return false;
    }
    if(typeof window.openProjectModal!=='function'){
      window.__cbNotify?.('Case file engine is still initializing. Please try again.');
      return false;
    }
    closeResearchLayers();
    requestAnimationFrame(()=>window.openProjectModal(resolved));
    return true;
  }
  window.__cbOpenCase=openCase;
  window.__cbNotify=window.__cbNotify||function(msg){
    const t=q('#enhancedToast'); if(!t)return; t.textContent=msg; t.classList.add('show'); clearTimeout(t.__timer); t.__timer=setTimeout(()=>t.classList.remove('show'),2600);
  };

  /* Primary Research Environment map: bypass fragile legacy delegation. */
  document.addEventListener('click',function(e){
    const card=e.target.closest('.research-map-card[data-research-group]');
    if(!card)return;
    const key=card.dataset.researchGroup;
    if(typeof window.__cbOpenResearchGroup==='function'){
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      window.__cbOpenResearchGroup(key);
    }
  },true);

  /* Environment cards: direct, deterministic environment dossier. */
  document.addEventListener('click',function(e){
    const card=e.target.closest('.env-card[data-env]');
    if(!card)return;
    const key=card.dataset.env;
    if(typeof window.__cbOpenResearchEnvironment==='function'){
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      window.__cbOpenResearchEnvironment(key, null);
    }
  },true);

  /* Related Case Files in Security Practice Map. */
  document.addEventListener('click',function(e){
    const b=e.target.closest('.security-related-case,[data-domain-project],[data-role-project],[data-role-project-key],[data-case-open],[data-env-project-key]');
    if(!b) return;
    const key=b.dataset.securityProject||b.dataset.domainProject||b.dataset.roleProject||b.dataset.roleProjectKey||b.dataset.caseOpen||b.dataset.envProjectKey;
    if(!key) return;
    if(resolve(key)){
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      openCase(key);
    }
  },true);

  /* Research Environment project-record buttons. */
  document.addEventListener('click',function(e){
    const b=e.target.closest('.env-related-project,[data-open-group-project-record],.env-project-item');
    if(!b) return;
    const key=b.dataset.openGroupProjectRecord||b.dataset.envProjectKey;
    if(!key) return;
    if(resolve(key)){
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      openCase(key);
    }
  },true);

  /* Full Case File Index button: always opens the actual index modal. */
  document.addEventListener('click',function(e){
    const b=e.target.closest('[data-research-jump="casefiles"]');
    if(!b)return;
    e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
    closeResearchLayers();
    const m=q('#caseIndexModal');
    if(m){m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');}
  },true);

  /* Keep case index entries deterministic even when legacy handlers change. */
  document.addEventListener('click',function(e){
    const b=e.target.closest('#caseIndexList [data-case-open]');
    if(!b)return;
    const key=b.dataset.caseOpen;
    if(resolve(key)){
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      const m=q('#caseIndexModal'); if(m){m.classList.remove('open');m.setAttribute('aria-hidden','true');}
      openCase(key);
    }
  },true);

  /* Make Security Practice Map project references resilient to renamed labels. */
  document.addEventListener('click',function(e){
    const b=e.target.closest('.detail-project-btn');
    if(!b)return;
    const key=b.dataset.domainProject;
    if(resolve(key)){
      e.preventDefault(); e.stopPropagation(); e.stopImmediatePropagation();
      openCase(key);
    }
  },true);

  /* Accessibility: Enter/Space activates the same routing as a click. */
  document.addEventListener('keydown',function(e){
    if(e.key!=='Enter'&&e.key!==' ')return;
    const el=e.target.closest('.security-related-case,.env-related-project,.env-project-item,.detail-project-btn,[data-case-open]');
    if(!el)return;
    e.preventDefault(); el.click();
  });
})();

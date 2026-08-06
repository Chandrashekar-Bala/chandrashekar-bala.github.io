/* ============================================
   CHANDRASHEKAR BALA - CYBERSECURITY PORTFOLIO
   ULTIMATE ANIMATION ENGINE
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
    initBackToTop();
    initConsoleEasterEgg();
    initActiveNavHighlight();
    initFloatingElements();
    initHoverGlow();
});

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
    let columns = Math.floor(canvas.width / fontSize);
    let drops = Array(columns).fill(1);
    let frameCount = 0;
    
    window.addEventListener('resize', () => {
        resizeCanvas();
        columns = Math.floor(canvas.width / fontSize);
        drops = Array(columns).fill(1);
    });
    
    function draw() {
        frameCount++;
        
        // Fade effect for trail
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize;
            const y = drops[i] * fontSize;
            
            // Head character - bright green
            ctx.fillStyle = '#00ff41';
            ctx.font = `bold ${fontSize}px "Fira Code", monospace`;
            ctx.fillText(text, x, y);
            
            // Glow effect on head
            ctx.shadowColor = '#00ff41';
            ctx.shadowBlur = 10;
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

// ===== 7. COUNTER ANIMATION =====
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const target = parseInt(el.getAttribute('data-count'));
                const duration = 2000;
                const suffix = el.textContent.includes('+') ? '+' : '';
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

// ===== 13. SMOOTH SCROLL =====
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

// ===== 14. BACK TO TOP =====
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
    console.log('%c📧 chandrashekarbala1423@gmail.com', styles[4]);
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
const perfObserver = new PerformanceObserver((list) => {
    for (const entry of list.getEntries()) {
        if (entry.entryType === 'largest-contentful-paint') {
            console.log(`%c⚡ LCP: ${entry.startTime.toFixed(0)}ms`, 'color: #00ff41;');
        }
    }
});
perfObserver.observe({ entryTypes: ['largest-contentful-paint'] });
/* ============================================================
   0xCB RESEARCH OS v5.1 — FINAL INTERACTION ARCHITECTURE
   ------------------------------------------------------------
   This file replaces every previous routing and modal system
   with two singletons:

     window.Cases    — canonical case registry + resolver
     window.CBModal  — single modal-stack manager

   All decorative systems (matrix rain, particles, theme,
   navigation, scroll reveal, counters, etc.) are preserved.
   ============================================================ */
'use strict';

/* ============================================================
   PART 1 — DECORATIVE SYSTEMS (preserved from v5.1)
   ============================================================ */

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
});

function initMatrixRain() {
    const canvas = document.getElementById('matrixRain');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    function resizeCanvas() { canvas.width = window.innerWidth; canvas.height = window.innerHeight; }
    resizeCanvas();
    const katakana = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン';
    const latin = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const nums = '0123456789';
    const symbols = '@#$%^&*()_+-=[]{}|;:,.<>?/~`';
    const chars = (katakana + latin + nums + symbols).split('');
    const fontSize = 14;
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
        ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        for (let i = 0; i < drops.length; i++) {
            const text = chars[Math.floor(Math.random() * chars.length)];
            const x = i * fontSize + horizontalPadding;
            if (x < horizontalPadding || x > canvas.width - horizontalPadding - fontSize) continue;
            const y = drops[i] * fontSize;
            ctx.fillStyle = '#00ff41';
            ctx.font = `bold ${fontSize}px "Fira Code", monospace`;
            ctx.fillText(text, x, y);
            ctx.shadowColor = '#00ff41';
            ctx.shadowBlur = 6;
            ctx.fillText(text, x, y);
            ctx.shadowBlur = 0;
            for (let j = 1; j < 5; j++) {
                const trailY = y - j * fontSize;
                if (trailY > 0) {
                    const opacity = 1 - (j * 0.2);
                    ctx.fillStyle = `rgba(0, 255, 65, ${opacity * 0.5})`;
                    ctx.font = `${fontSize}px "Fira Code", monospace`;
                    ctx.fillText(chars[Math.floor(Math.random() * chars.length)], x, trailY);
                }
            }
            if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
            drops[i] += Math.random() > 0.1 ? 1 : 2;
        }
        if (frameCount % 120 === 0) {
            ctx.fillStyle = 'rgba(0, 255, 65, 0.03)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);
        }
        requestAnimationFrame(draw);
    }
    draw();
}

function initParticleSystem() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    const particleContainer = document.createElement('div');
    particleContainer.className = 'particle-container';
    particleContainer.style.cssText = `position:absolute;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:0;overflow:hidden;`;
    hero.insertBefore(particleContainer, hero.firstChild);
    const particles = [];
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        const size = Math.random() * 3 + 1;
        particle.style.cssText = `position:absolute;width:${size}px;height:${size}px;background:var(--accent-green);border-radius:50%;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${Math.random()*0.5+0.1};animation:float ${Math.random()*10+10}s linear infinite;animation-delay:${Math.random()*5}s;box-shadow:0 0 ${size*3}px var(--accent-green-glow);`;
        particleContainer.appendChild(particle);
        particles.push({ element: particle, x: Math.random()*100, y: Math.random()*100, speedX: (Math.random()-0.5)*0.3, speedY: (Math.random()-0.5)*0.3 });
    }
    (function animateParticles() {
        particles.forEach(p => {
            p.x += p.speedX; p.y += p.speedY;
            if (p.x > 100) p.x = 0; if (p.x < 0) p.x = 100;
            if (p.y > 100) p.y = 0; if (p.y < 0) p.y = 100;
            p.element.style.left = p.x + '%';
            p.element.style.top = p.y + '%';
        });
        requestAnimationFrame(animateParticles);
    })();
}

function initCustomCursor() {
    const cursor = document.createElement('div');
    cursor.className = 'custom-cursor';
    cursor.style.cssText = `position:fixed;width:300px;height:300px;border-radius:50%;pointer-events:none;z-index:9999;background:radial-gradient(circle,rgba(0,255,65,0.03) 0%,transparent 70%);transform:translate(-50%,-50%);transition:opacity 0.3s;display:none;`;
    document.body.appendChild(cursor);
    let mouseX = 0, mouseY = 0, cursorX = 0, cursorY = 0;
    document.addEventListener('mousemove', e => { mouseX = e.clientX; mouseY = e.clientY; cursor.style.display = 'block'; });
    document.addEventListener('mouseleave', () => { cursor.style.display = 'none'; });
    document.addEventListener('mouseenter', () => { cursor.style.display = 'block'; });
    (function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.1;
        cursorY += (mouseY - cursorY) * 0.1;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        requestAnimationFrame(animateCursor);
    })();
}

function initThemeSystem() {
    const themeToggle = document.querySelector('.theme-toggle');
    const html = document.documentElement;
    const themeIcon = themeToggle?.querySelector('i');
    function setTheme(theme) {
        html.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        if (themeIcon) themeIcon.className = theme === 'dark' ? 'fas fa-moon' : 'fas fa-sun';
        document.body.classList.add('theme-transitioning');
        setTimeout(() => document.body.classList.remove('theme-transitioning'), 500);
    }
    const savedTheme = localStorage.getItem('theme');
    setTheme(savedTheme || (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'));
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
        if (!localStorage.getItem('theme')) setTheme(e.matches ? 'dark' : 'light');
    });
    themeToggle?.addEventListener('click', () => setTheme(html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark'));
}

function initNavigation() {
    const navbar = document.getElementById('navbar');
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    hamburger?.addEventListener('click', () => {
        hamburger.classList.toggle('active');
        navLinks.classList.toggle('active');
        document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
    });
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            hamburger?.classList.remove('active');
            navLinks?.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
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
    });
}

function initScrollReveal() {
    const revealElements = document.querySelectorAll(`.project-card,.cert-card,.achievement-card,.focus-card,.arsenal-cat,.role-card,.info-card,.training-card,.exp-card,.repo-card,.edu-card,.connect-link,.comp-table tbody tr,.arsenal-block,.about-terminal,.profile-container,.terminal-mini`);
    const observer = new IntersectionObserver(entries => {
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
    }, { threshold: 0.1, rootMargin: '0px 0px -30px 0px' });
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
    if (event && event.preventDefault) event.preventDefault();
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

function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number[data-count]');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const el = entry.target;
                const rawValue = el.getAttribute('data-count') || '';
                const target = parseInt(rawValue, 10);
                const duration = 2000;
                const suffix = rawValue.includes('+') ? '+' : '';
                const startTime = performance.now();
                (function update(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    const eased = 1 - Math.pow(1 - progress, 3);
                    el.textContent = Math.floor(eased * target) + suffix;
                    if (progress < 1) requestAnimationFrame(update);
                    else el.textContent = target + suffix;
                })(startTime);
                observer.unobserve(el);
            }
        });
    }, { threshold: 0.5 });
    counters.forEach(counter => observer.observe(counter));
}

function initProgressBars() {
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const fills = entry.target.querySelectorAll('.bar-fill,.progress-fill');
                fills.forEach(fill => {
                    const width = fill.style.width;
                    fill.style.width = '0%';
                    fill.style.transition = 'width 1.5s cubic-bezier(0.4, 0, 0.2, 1)';
                    setTimeout(() => { fill.style.width = width; }, 200);
                });
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });
    document.querySelectorAll('.activity-bars,.focus-grid').forEach(el => observer.observe(el));
}

function initGlitchEffect() {
    document.querySelectorAll('.hero-name,.logo-text,.section-title').forEach(el => {
        el.addEventListener('mouseenter', () => {
            el.style.animation = 'glitch 0.3s ease-in-out';
            setTimeout(() => { el.style.animation = ''; }, 300);
        });
    });
}

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
    const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) { setTimeout(type, 500); observer.unobserve(heroMission); }
    }, { threshold: 0.5 });
    observer.observe(heroMission);
}

function initTiltEffect() {
    document.querySelectorAll('.project-card,.cert-card,.focus-card,.role-card').forEach(card => {
        card.addEventListener('mousemove', e => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left, y = e.clientY - rect.top;
            const rotateX = (y - rect.height / 2) / (rect.height / 2) * -5;
            const rotateY = (x - rect.width / 2) / (rect.width / 2) * 5;
            card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
        });
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
            card.style.transition = 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)';
            setTimeout(() => { card.style.transition = ''; }, 500);
        });
    });
}

function initParallaxEffect() {
    const parallaxElements = document.querySelectorAll('.hero-right,.profile-ring');
    window.addEventListener('mousemove', e => {
        const x = (e.clientX / window.innerWidth - 0.5) * 20;
        const y = (e.clientY / window.innerHeight - 0.5) * 20;
        parallaxElements.forEach(el => {
            const speed = el.classList.contains('profile-ring') ? 1.5 : 0.5;
            el.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });
}

function initScrollIndicator() {
    const indicator = document.querySelector('.scroll-indicator');
    if (!indicator) return;
    let dismissed = window.pageYOffset > 20;
    if (dismissed) indicator.classList.add('hidden');
    window.addEventListener('scroll', () => {
        if (!dismissed && window.pageYOffset > 20) {
            dismissed = true;
            indicator.classList.add('hidden');
        }
    }, { passive: true });
}

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#') { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); return; }
            // Skip in-page anchors that begin with '#case/' — those are managed by Cases.open()
            if (targetId.startsWith('#case/')) return;
            const target = document.querySelector(targetId);
            if (target) {
                e.preventDefault();
                const position = target.getBoundingClientRect().top + window.pageYOffset - 80;
                window.scrollTo({ top: position, behavior: 'smooth' });
            }
        });
    });
}

function initBackToTop() {
    const btn = document.querySelector('.back-to-top');
    if (!btn) return;
    window.addEventListener('scroll', () => btn.classList.toggle('visible', window.pageYOffset > 500));
    btn.addEventListener('click', e => { e.preventDefault(); window.scrollTo({ top: 0, behavior: 'smooth' }); });
}

function initActiveNavHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');
    window.addEventListener('scroll', () => {
        let current = '';
        sections.forEach(section => {
            if (window.pageYOffset >= section.offsetTop - 150) current = section.getAttribute('id');
        });
        navLinks.forEach(link => {
            link.classList.toggle('active', link.getAttribute('href') === '#' + current);
        });
    });
}

function initFloatingElements() {
    document.querySelectorAll('.project-icon,.cert-icon-cert,.focus-icon').forEach((el, index) => {
        el.style.animation = `floatIcon ${3 + index % 3}s ease-in-out infinite`;
        el.style.animationDelay = `${index * 0.2}s`;
    });
}

function initHoverGlow() {
    document.querySelectorAll('.btn-primary,.connect-link,.social-btn').forEach(el => {
        el.addEventListener('mouseenter', () => el.style.boxShadow = '0 0 30px var(--accent-green-glow)');
        el.addEventListener('mouseleave', () => el.style.boxShadow = '');
    });
}

function initConsoleEasterEgg() {
    const s = ['color:#00ff41;font-size:14px;font-weight:bold;','color:#0ea5e9;font-size:12px;','color:#a855f7;font-size:12px;','color:#ef4444;font-size:12px;','color:#eab308;font-size:12px;'];
    console.log('%c╔══════════════════════════════════════════╗', s[0]);
    console.log('%c║   CHANDRASHEKAR BALA - PORTFOLIO         ║', s[0]);
    console.log('%c╚══════════════════════════════════════════╝', s[0]);
    console.log('%c🔒 Cybersecurity Professional', s[1]);
    console.log('%c🎯 Penetration Tester | Adversary Researcher', s[2]);
    console.log('%c💻 github.com/Chandrashekar-Bala', s[3]);
    console.log('%c📧 chandrashekar-bala@protonmail.com', s[4]);
}

/* ============================================================
   PART 2 — CANONICAL CASE REGISTRY (window.Cases)
   Single source of truth for every case-file route.
   ============================================================ */

window.Cases = (function () {
    'use strict';

    /* Canonical IDs. Every case in the portfolio gets exactly one. */
    const IDS = ['mediroza','driver','recon','password','web','threat','malware','android','vulnhub','wireless','buffer','firmware','automation','website'];

    /* Alias table — single copy. Maps display labels and category words to canonical IDs. */
    const ALIASES = {
        'assessment': 'mediroza',
        'mediroza assessment': 'mediroza',
        'engineering': 'driver',
        'rtl8812bu driver engineering': 'driver',
        'rtl8812bu linux driver modernization': 'driver',
        'network': 'recon',
        'network reconnaissance': 'recon',
        'network reconnaissance & attack-surface mapping': 'recon',
        'portswigger': 'web',
        'web application security lab': 'web',
        'offensive': 'vulnhub',
        'vulnerability assessment & privilege escalation': 'vulnhub',
        'defensive': 'threat',
        'network traffic analysis & threat hunting': 'threat',
        'forensics': 'malware',
        'malware analysis & windows forensics research': 'malware',
        'mobile': 'android',
        'android security analysis': 'android',
        'security automation & poc tooling': 'automation',
        'spi flash & bios protection research': 'firmware',
        'wireless security assessment lab': 'wireless',
        'protected pdf & password security analysis': 'password',
        'buffer overflow exploit development': 'buffer',
        'cybersecurity portfolio engineering': 'website',
        'active directory attack-path research': 'threat',
        'adversary research': 'threat'
    };

    /* Case content — migrated verbatim from the existing v4 projectDetails. */
    const BODIES = {
        mediroza: { kicker: 'Authorized External Assessment · Authorized Assessment', title: 'Mediroza Web Application Security Assessment', body: `<p>An authorized black-box web application assessment documented as a technical security investigation rather than a claim of real-world compromise.</p><h4>Attack path</h4><div class="attack-path"><span>Recon</span><b>→</b><span>SQL Injection</span><b>→</b><span>Authentication Bypass</span><b>→</b><span>Patient Portal</span><b>→</b><span>Protected Report Retrieval</span></div><h4>Documented findings</h4><ul><li>08 findings spanning directory exposure, database backup exposure, SQL injection, verbose error disclosure, sensitive report retrieval, predictable storage, log metadata disclosure, and server fingerprinting.</li><li>Highest documented severity: CVSS 9.8 / CWE-89 for the demonstrated SQL injection authentication-bypass chain.</li><li>Manual differential testing, Burp evidence, browser behavior, and application responses were used when automated SQLi confirmation was inconclusive.</li></ul><h4>Evidence &amp; remediation</h4><ul><li>65 source evidence files, 58 unique SHA-256 contents, and 25 screenshots were preserved and organized for traceability.</li><li>Findings were translated into root cause, impact, CVSS/CWE context, remediation recommendations, and retest considerations.</li><li>Public materials intentionally exclude passwords, patient documents, raw sensitive databases, and other restricted evidence.</li></ul><div class="modal-meta"><span>Black-box</span><span>Burp Suite</span><span>Nmap</span><span>CVSS / CWE</span><span>Evidence Engineering</span></div><a class="modal-source" href="https://github.com/Chandrashekar-Bala/Independent-Web-Application-Security-Assessment-Mediroza-General-Hospital" target="_blank" rel="noopener noreferrer">View public assessment repository <i class="fab fa-github"></i></a>` },
        driver: { kicker: 'Linux Kernel · Driver Compatibility · Real Hardware', title: 'RTL8812BU Linux Driver Modernization', body: `<p>Modernized an upstream RTL8812BU/RTL8822BU Linux USB Wi-Fi driver for newer kernel environments through kernel-facing C analysis, compatibility changes, build troubleshooting, and hardware validation.</p><h4>Engineering record</h4><ul><li>Targeted compatibility-sensitive Linux kernel interfaces across 13 source files.</li><li>Investigated compiler, kernel API, module-build, USB callback, timer, filesystem-access, and regulatory-related compatibility issues.</li><li>Built and validated the resulting module on Kali Linux using TP-Link Archer T4U v3 hardware (USB ID 2357:0115).</li><li>Preserved upstream attribution and maintained traceability between the upstream and modified code.</li></ul><div class="modal-meta"><span>C</span><span>Linux Kernel</span><span>GCC</span><span>Git</span><span>RTL8812BU</span><span>Real Hardware</span></div><div class="modal-links"><a class="modal-source" href="https://github.com/Chandrashekar-Bala/RTL8812BU-Linux-7.0.12" target="_blank" rel="noopener noreferrer">My repository <i class="fab fa-github"></i></a><a class="modal-source" href="https://github.com/morrownr/88x2bu-20210702" target="_blank" rel="noopener noreferrer">Upstream repository <i class="fas fa-external-link-alt"></i></a></div>` },
        recon: { kicker: 'Reconnaissance Research · Reconnaissance', title: 'Network Reconnaissance & Attack-Surface Mapping', body: `<p>Structured reconnaissance work focused on collecting, validating, and interpreting external attack-surface information before making security conclusions.</p><h4>Coverage</h4><ul><li>WHOIS, nslookup/dig, DNSRecon, WhatWeb, cURL, WAFW00F, certificate discovery, crt.sh, CertSpotter, Subfinder and theHarvester.</li><li>Nmap/NSE service enumeration, version detection, OS detection, HTTP/HTTPS and TLS validation, and Zenmap-supported review.</li><li>Evidence-first workflow separating observed exposure from assumptions and hypotheses.</li></ul><div class="modal-meta"><span>OSINT</span><span>DNS</span><span>Nmap/NSE</span><span>TLS</span><span>Web Fingerprinting</span></div>` },
        password: { kicker: 'Controlled Password Security Analysis · Controlled Offline Analysis', title: 'Protected PDF & Password Security Analysis', body: `<p>Controlled offline password-security analysis of protected PDF artifacts using purpose-built extraction and validation workflows.</p><h4>Workflow</h4><ul><li>Used pdf2john and John the Ripper with RockYou-based testing.</li><li>Compared local recovery results with Networkwalks-provided tooling and documented limitations.</li><li>Validated recovered files with QPDF and correlated evidence rather than treating a password hit alone as the complete result.</li></ul><div class="modal-meta"><span>pdf2john</span><span>John the Ripper</span><span>RockYou</span><span>QPDF</span></div>` },
        web: { kicker: 'Application Security · PortSwigger', title: 'Web Application Security Lab', body: `<p>Hands-on PortSwigger Web Security Academy practice focused on understanding application behavior through manual request/response analysis and controlled exploitation.</p><h4>Coverage</h4><ul><li>SQL injection, XSS, CSRF, SSRF, authentication, authorization and access-control weaknesses.</li><li>Parameter and session behavior, HTTP request manipulation, validation, and remediation-oriented notes.</li><li>Burp Suite and OWASP ZAP used to support repeatable application-security testing.</li></ul><div class="modal-meta"><span>50+ Labs</span><span>Burp Suite</span><span>OWASP ZAP</span><span>OWASP Top 10</span></div><a class="modal-source" href="https://portswigger.net/web-security" target="_blank" rel="noopener noreferrer">PortSwigger Web Security Academy <i class="fas fa-external-link-alt"></i></a>` },
        threat: { kicker: 'Defensive Security · Threat Hunting', title: 'Network Traffic Analysis & Threat Hunting', body: `<p>Network investigation work connecting packet-level observations with defensive hypotheses, indicators, and ATT&amp;CK-aligned analysis.</p><h4>Focus</h4><ul><li>Wireshark packet capture and protocol analysis.</li><li>Suspicious-connection investigation and IOC-oriented review.</li><li>Threat-hunting hypotheses around attacker communication and potential command-and-control behavior.</li><li>Translation of network observations into detection and investigation opportunities.</li></ul><div class="modal-meta"><span>Wireshark</span><span>Tcpdump</span><span>Zeek</span><span>IOC Analysis</span><span>MITRE ATT&amp;CK</span></div>` },
        malware: { kicker: 'Malware Analysis · Digital Forensics · Research', title: 'Malware Analysis & Windows Forensics Research', body: `<p>Hands-on research spanning suspicious-file investigation, binary analysis, execution behavior, indicator extraction, and Windows forensic artifacts.</p><h4>Static + dynamic analysis</h4><ul><li>Static inspection of suspicious files and binaries, including structure and behavior-oriented analysis.</li><li>Dynamic analysis exercises focused on execution behavior and observable indicators.</li><li>Reverse-engineering methods using C, GDB, memory/stack analysis, control-flow analysis and debugging.</li></ul><h4>Forensics</h4><ul><li>Windows Registry artifacts, filesystem activity, disk artifacts, suspicious-file evidence, and timeline-oriented investigation.</li><li>Volatility, Autopsy and network-analysis tooling used according to the research scenario.</li></ul><div class="modal-meta"><span>Ghidra</span><span>IDA Pro</span><span>GDB</span><span>Volatility</span><span>Autopsy</span><span>Wireshark</span></div>` },
        android: { kicker: 'Mobile Security · Android', title: 'Android Security Analysis', body: `<p>Android application security research combining APK inspection, decompilation, static review, runtime logging, and dynamic analysis.</p><h4>Tooling</h4><ul><li>Dex2jar and JD-GUI for decompilation and code inspection.</li><li>Drozer for dynamic security-testing practice.</li><li>Logcat for runtime observation and troubleshooting.</li><li>Android Studio for application and emulator workflows.</li></ul><div class="modal-meta"><span>APK Analysis</span><span>Reverse Engineering</span><span>Static Analysis</span><span>Dynamic Analysis</span></div>` },
        vulnhub: { kicker: 'Controlled Offensive Practice · VulnHub / HTB', title: 'Vulnerability Assessment & Privilege Escalation', body: `<p>Repeatable security practice across vulnerable virtual environments, moving from enumeration through validation and post-exploitation analysis.</p><h4>Workflow</h4><ul><li>Service and version enumeration with Nmap.</li><li>Vulnerability identification and controlled exploit validation with Metasploit.</li><li>Linux and Windows privilege-escalation practice and post-exploitation analysis.</li><li>VulnHub, Hack The Box, OverTheWire and vulnerable pentesting VMs used as controlled practice environments.</li></ul><div class="modal-meta"><span>VulnHub</span><span>Hack The Box</span><span>Nmap</span><span>Metasploit</span><span>PrivEsc</span></div>` },
        wireless: { kicker: 'Wireless Security · Controlled Lab', title: 'Wireless Security Assessment Lab', body: `<p>Controlled wireless-security research covering discovery, monitor mode, packet capture, protocol analysis, and security testing workflows.</p><h4>Focus</h4><ul><li>Aircrack-ng and Wireshark for wireless assessment and packet analysis.</li><li>Monitor mode, packet capture, and controlled wireless testing.</li><li>hcxdumptool requirements and driver capabilities investigated as part of wireless security engineering.</li></ul><div class="modal-meta"><span>Aircrack-ng</span><span>Wireshark</span><span>Monitor Mode</span><span>hcxdumptool</span></div>` },
        buffer: { kicker: 'Exploit Development · Controlled Research', title: 'Buffer Overflow Exploit Development', body: `<p>Low-level security research focused on memory, stack behavior, control flow, and debugger-assisted proof-of-concept development in controlled environments.</p><h4>Tooling</h4><ul><li>GDB and WinDbg for debugging and memory inspection.</li><li>C for understanding low-level memory behavior.</li><li>Stack analysis, control-flow analysis, and controlled proof-of-concept workflows.</li></ul><div class="modal-meta"><span>C</span><span>GDB</span><span>WinDbg</span><span>Memory Analysis</span><span>PoC</span></div>` },
        firmware: { kicker: 'Systems Security · Firmware Research', title: 'SPI Flash & BIOS Protection Research', body: `<p>Firmware research on a Lenovo G580 involving SPI flash/NVRAM protection analysis and Linux-based firmware investigation.</p><h4>Research record</h4><ul><li>Used flashrom to investigate internal programmer access and read-protection behavior.</li><li>Acquired an 8 MB full-flash image and extracted the BIOS region for analysis.</li><li>Used dmidecode and dmesg to correlate platform and firmware-loading observations.</li></ul><div class="modal-meta"><span>flashrom</span><span>SPI Flash</span><span>NVRAM</span><span>BIOS</span><span>dmidecode</span></div>` },
        automation: { kicker: 'Security Development · Automation', title: 'Security Automation & PoC Tooling', body: `<p>Python- and Bash-based security development supporting reconnaissance, vulnerability assessment, network analysis, research, and repeatable proof-of-concept workflows.</p><h4>Engineering approach</h4><ul><li>Automate repeatable reconnaissance and validation steps where it improves consistency.</li><li>Build small proof-of-concept tools to understand vulnerabilities and security behavior.</li><li>Document inputs, outputs, limitations, and defensive considerations rather than treating automation as a substitute for validation.</li></ul><div class="modal-meta"><span>Python</span><span>Bash</span><span>SQL</span><span>Automation</span><span>PoC</span></div>` },
        website: { kicker: 'Web Engineering · Portfolio System', title: 'Cybersecurity Portfolio Engineering', body: `<p>This portfolio itself is a technical project: a static web system designed to present security research, assessment work, engineering projects, and evidence in a usable interface.</p><h4>What I built</h4><ul><li>Semantic HTML structure with responsive layouts and a terminal-inspired visual system.</li><li>JavaScript-driven project filtering, technical-detail modals, theme switching, navigation behavior, counters, and UI feedback.</li><li>Accessibility-oriented controls, keyboard interaction, reduced-motion support, SEO/social metadata, and GitHub Pages deployment structure.</li></ul><div class="modal-meta"><span>HTML5</span><span>CSS3</span><span>JavaScript</span><span>Accessibility</span><span>SEO</span><span>GitHub Pages</span></div><a class="modal-source" href="https://github.com/Chandrashekar-Bala" target="_blank" rel="noopener noreferrer">View GitHub profile <i class="fab fa-github"></i></a>` }
    };

    /* Registry populated on DOMContentLoaded from the DOM's data-project attributes. */
    const registry = new Map();

    function normalize(input) {
        return String(input == null ? '' : input)
            .trim()
            .toLowerCase()
            .replace(/&amp;/g, '&')
            .replace(/\s+/g, ' ');
    }

    function hydrateFromDOM() {
        document.querySelectorAll('#projects .project-card[data-project]').forEach(card => {
            const id = card.dataset.project;
            if (!IDS.includes(id)) return;
            const title = card.querySelector('h3')?.textContent.trim() || id;
            const kicker = card.querySelector('.project-kicker')?.textContent.trim() || '';
            const categories = (card.dataset.category || '').split(/\s+/).filter(Boolean);
            const bodyData = BODIES[id] || { kicker, title, body: '<p>Case file content pending.</p>' };
            registry.set(id, {
                id,
                title: bodyData.title || title,
                kicker: bodyData.kicker || kicker,
                body: bodyData.body,
                category: categories,
                cardTitle: title
            });
        });
        // Ensure any IDs we know about but that lack a card still register (defensive).
        IDS.forEach(id => {
            if (!registry.has(id) && BODIES[id]) {
                registry.set(id, {
                    id,
                    title: BODIES[id].title,
                    kicker: BODIES[id].kicker,
                    body: BODIES[id].body,
                    category: [],
                    cardTitle: BODIES[id].title
                });
            }
        });
    }

    function resolve(input, source) {
        const n = normalize(input);
        if (!n) return null;
        if (registry.has(n)) return n;
        if (ALIASES[n] && registry.has(ALIASES[n])) return ALIASES[n];
        // Title match.
        for (const [id, entry] of registry) {
            if (normalize(entry.title) === n) return id;
            if (normalize(entry.cardTitle) === n) return id;
        }
        console.warn(`[Cases] Unresolved project reference "${input}" from source: ${source || 'unknown'}`);
        return null;
    }

    function get(id) {
        const canonical = resolve(id, 'Cases.get');
        return canonical ? registry.get(canonical) : null;
    }

    function list() {
        return Array.from(registry.values());
    }

    function open(id, options) {
        options = options || {};
        const source = options.from || 'unknown';
        const canonical = resolve(id, source);
        if (!canonical) {
            if (window.CBModal && CBModal.roots && CBModal.roots['projectModal']) {
                // Fall through — the caller will see a null return.
            }
            if (typeof window.__cbNotify === 'function') {
                window.__cbNotify(`Case file not found: "${id}"`);
            }
            return false;
        }
        const entry = registry.get(canonical);
        if (!entry) return false;
        if (!window.CBModal) { console.warn('[Cases] CBModal not ready'); return false; }
        CBModal.push('projectModal', {
            render: () => renderCaseFile(entry),
            focus: '[data-close-modal]',
            breadcrumb: null  // breadcrumb is composed by CBModal from the stack
        });
        return true;
    }

    function renderCaseFile(entry) {
        return `<button aria-label="Close project details" class="modal-close" data-close-modal type="button">×</button>
            <span class="modal-kicker">${entry.kicker}</span>
            <h2 id="modalTitle">${entry.title}</h2>
            <div class="modal-body">${entry.body}</div>`;
    }

    return { register: () => {}, hydrateFromDOM, resolve, get, list, open, IDS, ALIASES };
})();

/* ============================================================
   PART 3 — MODAL STACK MANAGER (window.CBModal)
   Single owner of: open/close, stack, Escape, focus, scroll
   lock, aria-hidden, Back, Close.
   ============================================================ */

window.CBModal = (function () {
    'use strict';

    const roots = {};               // id -> element
    const stack = [];               // [{id, render, focus, breadcrumb}]
    let lockCount = 0;
    let lastFocused = null;

    function register() {
        document.querySelectorAll('[data-cb-modal-root]').forEach(el => {
            roots[el.id] = el;
        });
    }

    function lock() {
        lockCount += 1;
        if (lockCount === 1) {
            lastFocused = document.activeElement;
            document.body.classList.add('cb-scroll-lock');
        }
    }
    function unlock() {
        if (lockCount > 0) lockCount -= 1;
        if (lockCount === 0) {
            document.body.classList.remove('cb-scroll-lock');
            if (lastFocused && typeof lastFocused.focus === 'function') {
                try { lastFocused.focus(); } catch (_) {}
            }
            lastFocused = null;
        }
    }

    function hideAllExcept(id) {
        Object.entries(roots).forEach(([oid, oel]) => {
            if (oid !== id && oel.classList.contains('open')) {
                oel.classList.remove('open');
                oel.setAttribute('aria-hidden', 'true');
            }
        });
    }

    function show(el) {
        el.classList.add('open');
        el.setAttribute('aria-hidden', 'false');
    }
    function hide(el) {
        el.classList.remove('open');
        el.setAttribute('aria-hidden', 'true');
    }

    function push(id, options) {
        options = options || {};
        const el = roots[id];
        if (!el) { console.warn('[CBModal] unknown layer id:', id); return; }
        hideAllExcept(id);
        if (typeof options.render === 'function') el.innerHTML = options.render();
        show(el);
        stack.push({ id, render: options.render, focus: options.focus, breadcrumb: options.breadcrumb });
        lock();
        renderBreadcrumb();
        trapFocus(el);
        if (options.focus) {
            setTimeout(() => { const f = el.querySelector(options.focus); if (f) f.focus(); }, 30);
        }
    }

    function pop() {
        if (!stack.length) return false;
        const layer = stack.pop();
        const el = roots[layer.id];
        if (el) hide(el);
        unlock();
        const prev = stack[stack.length - 1];
        if (prev) {
            const pel = roots[prev.id];
            if (prev.render) pel.innerHTML = prev.render();
            show(pel);
            trapFocus(pel);
            if (prev.focus) setTimeout(() => { const f = pel.querySelector(prev.focus); if (f) f.focus(); }, 30);
        }
        renderBreadcrumb();
        return true;
    }

    function closeAll() {
        while (stack.length) {
            const layer = stack.pop();
            const el = roots[layer.id];
            if (el) hide(el);
            unlock();
        }
        renderBreadcrumb();
    }

    function top() { return stack[stack.length - 1] || null; }
    function isOpen(id) { return stack.some(l => l.id === id); }

    /* --- Focus trap --- */
    function focusables(el) {
        return Array.from(el.querySelectorAll('button,a[href],input,select,textarea,[tabindex]:not([tabindex="-1"])'))
            .filter(x => !x.disabled && x.offsetParent !== null);
    }
    function trapFocus(el) {
        const first = focusables(el)[0];
        if (first) setTimeout(() => first.focus(), 20);
    }
    function trapTab(e, el) {
        const list = focusables(el);
        if (!list.length) return;
        const first = list[0], last = list[list.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
    }

    /* --- Breadcrumb --- */
    function renderBreadcrumb() {
        const bc = document.getElementById('cbBreadcrumb');
        if (!bc) return;
        if (!stack.length) { bc.classList.remove('show'); bc.innerHTML = ''; return; }
        const labels = stack.map(l => l.breadcrumb || l.id).filter(Boolean);
        bc.innerHTML = `<span class="cb-bc-prefix">0xCB</span>` +
            labels.map(l => `<span class="cb-bc-sep">/</span><span class="cb-bc-label">${l}</span>`).join('');
        bc.classList.add('show');
    }

    /* --- Global Escape + Tab --- */
    document.addEventListener('keydown', e => {
        if (!stack.length) return;
        const layer = top();
        const el = roots[layer.id];
        if (e.key === 'Escape') { e.preventDefault(); pop(); return; }
        if (e.key === 'Tab') { e.preventDefault(); trapTab(e, el); }
    });

    /* --- Delegated close click (one handler for the entire app) --- */
    document.addEventListener('click', e => {
        if (e.target.closest('[data-close-modal]')) { e.preventDefault(); pop(); return; }
        if (e.target.closest('[data-cb-pop]')) { e.preventDefault(); pop(); return; }
    });

    return { register, push, pop, closeAll, top, isOpen, roots, stack };
})();

/* ============================================================
   PART 4 — RESEARCH ENVIRONMENT DATA + RENDERERS
   Data preserved verbatim from v5.1 (first env IIFE + hard-wired
   fallback IIFE, de-duplicated). No wiring lives here.
   ============================================================ */

window.ResearchData = (function () {
    'use strict';

    const ENVS = {
        portswigger: { k:'01 · WEB APPLICATION SECURITY', t:'PortSwigger Web Security Academy', lead:'50+ labs supporting sustained application-security practice and manual attack-path reasoning.', focus:['Authentication & authorization','Access control','SQL injection & server-side vulnerabilities','SSRF, request manipulation & HTTP behavior'], signals:['50+ labs','Burp Suite','HTTP','OWASP-aligned testing'], flow:'Discover → Manipulate → Validate → Explain', related:[['mediroza','Mediroza Web Application Security Assessment','8+ findings and a demonstrated SQLi/authentication-bypass chain.'],['web','Web Application Security Lab','50+ PortSwigger application-security labs.']] },
        bugbounty: { k:'02 · BUG BOUNTY & RESPONSIBLE DISCLOSURE', t:'Bug Bounty & Responsible Disclosure', lead:'Web-focused vulnerability research built around discovery, manual validation, impact reasoning, clear reporting, remediation and responsible disclosure thinking.', focus:['Attack-surface discovery and web asset analysis','Authentication, authorization and access-control testing','Manual vulnerability validation and impact reasoning','Clear technical reporting, remediation and retest thinking'], signals:['Web Security','Burp Suite','HTTP','OWASP','Responsible Disclosure'], flow:'Discover → Validate → Assess Impact → Report → Retest', related:[['web','Web Application Security Lab','50+ application-security labs.'],['mediroza','Mediroza Web Application Security Assessment','Authorized assessment with 8+ findings.']] },
        htb: { k:'03 · OFFENSIVE SECURITY', t:'Hack The Box', lead:'Hands-on environments for attack-path reasoning and practical security testing.', focus:['Reconnaissance & enumeration','Service exploitation','Linux / Windows privilege escalation','Post-exploitation analysis'], signals:['Pentesting','Linux','Windows','Attack paths'], flow:'Recon → Enumerate → Exploit → Escalate', related:[['vulnhub','Vulnerability Assessment & Privilege Escalation','Controlled vulnerable-environment research.'],['buffer','Buffer Overflow Exploit Development','Low-level controlled exploitation.']] },
        vulnhub: { k:'04 · VULNERABLE ENVIRONMENTS', t:'VulnHub', lead:'Self-contained vulnerable systems used to reproduce attack chains and validate security assumptions.', focus:['Service discovery','Vulnerability validation','Controlled exploitation','Privilege escalation & post-exploitation'], signals:['VAPT','Exploitation','PrivEsc','Validation'], flow:'Map → Validate → Exploit → Document', related:[['vulnhub','Vulnerability Assessment & Privilege Escalation','Repeatable vulnerable-environment practice.']] },
        overthewire: { k:'05 · LINUX SECURITY', t:'OverTheWire', lead:'Command-line environments that sharpen Linux security reasoning and problem solving.', focus:['Permissions','Authentication','Filesystem behavior','Shell and command-line analysis'], signals:['Linux','Bash','CLI','Problem solving'], flow:'Observe → Reason → Execute → Verify', related:[['vulnhub','Vulnerability Assessment & Privilege Escalation','Linux security and privilege-escalation environments.']] },
        kali: { k:'06 · SECURITY OPERATING ENVIRONMENTS', t:'Kali / Parrot', lead:'Primary Linux environments used for security research, assessment and technical troubleshooting.', focus:['Reconnaissance & enumeration','Web and network testing','Wireless security','Packet analysis and tooling'], signals:['Nmap','Burp','Wireshark','Aircrack-ng'], flow:'Prepare → Test → Capture → Analyze', related:[['recon','Network Reconnaissance & Attack-Surface Mapping','Reconnaissance, enumeration and service validation.'],['web','Web Application Security Lab','Application-security testing and HTTP analysis.'],['wireless','Wireless Security Assessment Lab','Wireless packet analysis and controlled testing.'],['driver','RTL8812BU Linux Driver Modernization','Linux wireless driver engineering on real hardware.']] },
        crossplatform: { k:'07 · CROSS-PLATFORM ANALYSIS', t:'Windows / Linux', lead:'Cross-platform environments for security testing, investigation and forensic analysis.', focus:['Windows artifacts','Linux security analysis','Network behavior','Filesystem and evidence review'], signals:['DFIR','Networking','Windows','Linux'], flow:'Acquire → Analyze → Correlate → Report', related:[['malware','Malware Analysis & Windows Forensics Research','Windows artifacts, suspicious files and evidence-oriented investigation.'],['threat','Network Traffic Analysis & Threat Hunting','Packet analysis and IOC-oriented investigation.']] },
        virtualbox: { k:'08 · RESEARCH INFRASTRUCTURE', t:'VirtualBox', lead:'Isolated virtual infrastructure for repeatable and controlled security experimentation.', focus:['Vulnerable virtual machines','Attack-path reproduction','Network isolation','Snapshot-driven testing'], signals:['Virtualization','Isolation','Labs','Reproducibility'], flow:'Build → Isolate → Test → Reset', related:[['vulnhub','Vulnerability Assessment & Privilege Escalation','Controlled vulnerable systems.'],['buffer','Buffer Overflow Exploit Development','Controlled low-level research.']] },
        github: { k:'09 · ENGINEERING ARCHIVE', t:'GitHub', lead:'Public proof of technical work, engineering projects and documented security research.', focus:['RTL8812BU / RTL8822BU driver engineering','Security automation & PoCs','Technical project documentation','Versioned research artifacts'], signals:['Git','C','Python','Linux'], flow:'Build → Version → Validate → Publish', related:[['driver','RTL8812BU Linux Driver Modernization','13+ source files and real-hardware validation.'],['firmware','SPI Flash & BIOS Protection Research','Firmware protection and flash-analysis research.'],['automation','Security Automation & PoC Tooling','Python/Bash security tooling and repeatable research workflows.'],['website','Cybersecurity Portfolio Engineering','The Research OS itself as a technical web-engineering project.']] },
        networkwalks: { k:'10 · PROFESSIONAL SECURITY WORK', t:'Networkwalks', lead:'Professional cybersecurity work spanning assessment, offensive, defensive, adversary and engineering activities.', focus:['VAPT & security assessment','Offensive and defensive analysis','Threat and adversary research','Technical project execution'], signals:['VAPT','Offensive','Defensive','Engineering'], flow:'Assess → Investigate → Coordinate → Deliver', related:[['mediroza','Mediroza Web Application Security Assessment','Authorized assessment with 8+ documented findings.'],['recon','Network Reconnaissance & Attack-Surface Mapping','Structured reconnaissance and attack-surface analysis.'],['web','Web Application Security Lab','50+ PortSwigger labs and application-security research.'],['driver','RTL8812BU Linux Driver Modernization','Security engineering and systems research.']] },
        underground: { k:'11 · ADVERSARY & UNDERGROUND INTELLIGENCE', t:'Dark Web & Underground Intelligence', lead:'Research into underground ecosystems as intelligence sources: hidden forums and communities, threat-actor activity, criminal-service ecosystems, exposed information, data-dump reporting, infrastructure and evolving threat activity.', focus:['Underground forums and ecosystem monitoring','Threat-actor activity, behavior and service models','Infrastructure relationships and operational patterns','Leak, exposure and data-dump reporting as intelligence signals'], signals:['OSINT','CTI','Tor / I2P','Underground Forums','TTPs'], flow:'Discover → Correlate → Contextualize → Map', related:[['threat','Network Traffic Analysis & Threat Hunting','Adversary-behavior and IOC investigation.'],['recon','Network Reconnaissance & Attack-Surface Mapping','Infrastructure discovery and evidence correlation.']] },
        osint: { k:'12 · THREAT INTELLIGENCE', t:'OSINT & Threat Intelligence', lead:'Open-source intelligence collection and correlation used to build context around infrastructure, actors and campaigns.', focus:['Infrastructure discovery','Source correlation','IOC research','Threat-report and TTP analysis'], signals:['OSINT','IOC','Infrastructure','ATT&CK'], flow:'Collect → Correlate → Assess → Inform', related:[['recon','Network Reconnaissance & Attack-Surface Mapping','DNS, certificates, infrastructure and web-fingerprinting research.'],['threat','Network Traffic Analysis & Threat Hunting','IOC and attacker-behavior investigation.']] }
    };

    const DEPTH = {
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

    const GROUPS = {
        web: { title:'WEB APPLICATION', kicker:'01 · WEB APPLICATION SECURITY', lead:'Application-security environments used to understand HTTP behavior, validate vulnerabilities and build attack-path reasoning.', envs:['portswigger','bugbounty'], signals:['50+ PortSwigger labs','Bug bounty research','Burp Suite','HTTP','OWASP'], related:['mediroza','web'] },
        bugbounty: { title:'BUG BOUNTY & RESPONSIBLE DISCLOSURE', kicker:'02 · BUG BOUNTY & RESPONSIBLE DISCLOSURE', lead:'A practical web-security research mindset focused on finding, validating, documenting and responsibly communicating vulnerabilities.', envs:['bugbounty'], signals:['Vulnerability Research','Burp Suite','HTTP','OWASP','Disclosure'], related:['web','mediroza'] },
        offensive: { title:'OFFENSIVE SECURITY', kicker:'03 · OFFENSIVE SECURITY', lead:'Controlled environments used to practice reconnaissance, exploitation, privilege escalation and post-exploitation reasoning.', envs:['htb','vulnhub','overthewire','kali'], signals:['HTB','VulnHub','OverTheWire','Kali / Parrot'], related:['vulnhub','buffer'] },
        systems: { title:'SYSTEMS & FORENSICS', kicker:'04 · SYSTEMS & FORENSICS', lead:'Cross-platform environments for operating-system analysis, evidence review, network investigation and isolated testing.', envs:['crossplatform','virtualbox'], signals:['Windows','Linux','VirtualBox','DFIR'], related:['malware','threat','vulnhub','firmware'] },
        engineering: { title:'SECURITY ENGINEERING', kicker:'05 · SECURITY ENGINEERING', lead:'The build-and-validate side of the Research OS: code, systems, repositories, tooling and hardware-backed engineering.', envs:['github','kali'], signals:['C','Python','Linux','Git','RTL8812BU'], related:['driver','automation','firmware','website'] },
        adversary: { title:'ADVERSARY & UNDERGROUND INTELLIGENCE', kicker:'06 · ADVERSARY & UNDERGROUND INTELLIGENCE', lead:'Intelligence-oriented research spanning open, deep and underground sources, infrastructure relationships, actor behavior and TTPs.', envs:['underground','osint'], signals:['Dark Web','OSINT','CTI','Infrastructure','TTPs'], related:['recon','threat'] },
        professional: { title:'PROFESSIONAL ENVIRONMENT', kicker:'07 · PROFESSIONAL SECURITY WORK', lead:'The professional environment where assessment, offensive, defensive, adversary research and engineering work come together.', envs:['networkwalks'], signals:['VAPT','Offensive','Defensive','Adversary','Engineering'], related:['mediroza','recon','driver','web'] }
    };

    const EXTERNAL_LINKS = {
        portswigger:['https://portswigger.net/web-security','Open PortSwigger Web Security Academy'],
        htb:['https://www.hackthebox.com/','Open Hack The Box'],
        vulnhub:['https://www.vulnhub.com/','Open VulnHub'],
        overthewire:['https://overthewire.org/wargames/','Open OverTheWire'],
        kali:['https://www.kali.org/','Open Kali Linux'],
        virtualbox:['https://www.virtualbox.org/','Open VirtualBox'],
        github:['https://github.com/Chandrashekar-Bala','Open GitHub'],
        networkwalks:['https://networkwalks.com/','Open Networkwalks']
    };

    /* Domain-level dossier data for Security Command Center — preserved verbatim. */
    const SECURITY_DOMAINS = {
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

    const ROLES = {
        teamlead:{k:'CURRENT ROLE · NETWORKWALKS',t:'TEAM LEAD — CYBERSECURITY',what:'Lead and contribute to multidisciplinary cybersecurity work across VAPT, offensive security, defensive security, adversary research, security engineering, and technical project execution.',how:['Understand the objective, system and attack surface before choosing a technique','Coordinate technical work while staying close to hands-on validation and investigation','Review findings and deliverables for accuracy, evidence, impact and remediation value','Connect offensive observations with defensive and engineering decisions','Keep technical work reproducible, documented and defensible'],skills:['VAPT','Offensive Security','Defensive Security','Adversary Research','Security Engineering','Technical Projects'],tools:['Burp Suite','Nmap','Wireshark','Linux','Python','Git','Security Tooling'],related:[['mediroza','Mediroza Web Application Security Assessment','8+ documented findings'],['driver','RTL8812BU Linux Driver Modernization','13+ source files and hardware validation'],['recon','Network Reconnaissance & Attack-Surface Mapping','Evidence-led reconnaissance']]},
        vapt:{k:'01 · ROLE SCOPE',t:'VAPT — ASSESSMENT MINDSET',what:'Assess attack surfaces, validate vulnerabilities, reconstruct practical attack paths and translate evidence into defensible findings.',how:['Reconnaissance before assumptions','Manual validation of observable behavior','Impact and risk analysis','Evidence preservation and technical reporting','Remediation mapping and retest thinking'],skills:['Reconnaissance','Vulnerability Validation','CVSS / CWE','Attack Paths','Evidence','Reporting'],tools:['Nmap','Burp Suite','Nessus','CVSS / CWE','Technical Reporting'],related:[['mediroza','Mediroza Web Application Security Assessment','8+ documented findings']]},
        offensive:{k:'02 · ROLE SCOPE',t:'OFFENSIVE SECURITY — ATTACKER PERSPECTIVE',what:'Reason through how systems can be attacked, where trust boundaries fail and how individual weaknesses combine into meaningful attack paths.',how:['Attack-surface mapping','Enumeration and service analysis','Controlled exploitation','Privilege escalation reasoning','Post-exploitation impact analysis'],skills:['Attack-Surface Analysis','Enumeration','Controlled Exploitation','Privilege Escalation','Post-Exploitation','Attack Paths'],tools:['Nmap','Burp Suite','Metasploit','Kali Linux','Linux / Windows'],related:[['vulnhub','Vulnerability Assessment & Privilege Escalation','Controlled attack-path research'],['web','Web Application Security Lab','50+ PortSwigger labs']]},
        defensive:{k:'03 · ROLE SCOPE',t:'DEFENSIVE SECURITY — INVESTIGATION MINDSET',what:'Use technical evidence to understand suspicious activity, correlate indicators and think from the perspective of detection and response.',how:['Network and endpoint observation','IOC correlation','Log and traffic analysis','Evidence-driven investigation','Detection and hardening considerations'],skills:['Network Analysis','IOC Correlation','Threat Hunting','Forensic Review','Detection Thinking','Incident Investigation'],tools:['Wireshark','Splunk','Google Chronicle','Volatility','Tcpdump'],related:[['threat','Network Traffic Analysis & Threat Hunting','Packet-level investigation'],['malware','Malware Analysis & Windows Forensics','Evidence-focused research']]},
        adversary:{k:'04 · ROLE SCOPE',t:'ADVERSARY RESEARCH — INTELLIGENCE MINDSET',what:'Study threat actors, infrastructure, underground ecosystems and TTPs to connect fragmented observations into useful intelligence.',how:['Source collection and correlation','Infrastructure research','Actor and campaign context','Underground ecosystem research','TTP mapping and defensive context'],skills:['OSINT','CTI','Dark Web Research','Infrastructure Research','MITRE ATT&CK','TTP Analysis'],tools:['WHOIS','DNSRecon','crt.sh','Subfinder','Maltego','Tor / I2P research'],related:[['threat','Network Traffic Analysis & Threat Hunting','Threat intelligence and actor analysis'],['recon','Network Reconnaissance & Attack-Surface Mapping','Infrastructure discovery']]},
        engineering:{k:'05 · ROLE SCOPE',t:'SECURITY ENGINEERING — BUILD & VALIDATE',what:'Stay hands-on with systems, code, networking, wireless and tooling to understand security at the implementation level.',how:['Kernel-facing C analysis','Compatibility troubleshooting','Security automation','Proof-of-concept development','Real-system validation and reproducibility'],skills:['Kernel-Facing C','Linux Systems','Wireless Security','Compatibility Analysis','Security Tooling','Hardware Validation'],tools:['C','Python','GCC','Git','Linux','RTL8812BU'],related:[['driver','RTL8812BU Linux Driver Modernization','13+ source files'],['automation','Security Automation & PoC Tooling','Python / Bash tooling']]},
        projects:{k:'06 · ROLE SCOPE',t:'TECHNICAL PROJECTS — EXECUTION',what:'Work across multiple security projects and connect technical execution to evidence, documentation and defensible outcomes.',how:['Break objectives into technical work','Select the right research environment','Validate rather than assume','Document evidence and limitations','Connect work to remediation or engineering outcomes'],skills:['Research','PoC Development','Documentation','Evidence','Project Execution','Technical Review'],tools:['GitHub','Python','Bash','C','Burp Suite','Nmap'],related:[['mediroza','Web Application Security Assessment','Security assessment evidence'],['driver','RTL8812BU Driver Engineering','Systems engineering'],['automation','Security Automation & PoC Tooling','Security tooling']]}
    };

    return { ENVS, DEPTH, GROUPS, EXTERNAL_LINKS, SECURITY_DOMAINS, ROLES };
})();

/* ============================================================
   PART 5 — RENDERERS (pure functions; no event wiring)
   ============================================================ */

function esc(s) {
    return String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;' }[c]));
}

function renderResearchMap() {
    const G = ResearchData.GROUPS;
    const cards = Object.entries(G).map(([key, g]) => `
        <button class="research-map-card map-${esc(key)}" data-research-group="${esc(key)}" type="button">
            <span>${esc(g.kicker.split('·')[0].trim())}</span>
            <i class="fas fa-cubes"></i>
            <h3>${esc(g.title)}</h3>
            <p>${esc(g.signals.slice(0,3).join(' · '))}</p>
            <strong>${esc(String(g.envs.length).padStart(2,'0'))} environments</strong>
        </button>`).join('');
    return `
        <button class="modal-close" type="button" aria-label="Close research environment" data-close-modal><i class="fas fa-xmark"></i></button>
        <div class="research-map-top">
            <div>
                <span class="modal-kicker">0xCB // HANDS-ON SECURITY ENVIRONMENT</span>
                <h2 id="researchMapTitle">Research Environment</h2>
                <p>Platforms, operating environments, repositories and intelligence ecosystems used to build, test, investigate and validate security work.</p>
            </div>
            <div class="research-map-status"><i class="fas fa-circle"></i><span>RESEARCH MODE</span><small>ACTIVE</small></div>
        </div>
        <div class="research-path"><span>LEARN</span><b>→</b><span>REPRODUCE</span><b>→</b><span>VALIDATE</span><b>→</b><span>INVESTIGATE</span><b>→</b><span>DOCUMENT</span><b>→</b><span>ENGINEER</span></div>
        <div class="research-map-grid">${cards}</div>
        <div class="research-map-footer">
            <span><i class="fas fa-link"></i> Every environment connects to evidence, projects or the relevant technical discipline.</span>
            <button type="button" class="btn btn-secondary" data-open-case-index><i class="fas fa-folder-open"></i> View Case Files</button>
        </div>`;
}

function renderEnvGroup(groupKey) {
    const g = ResearchData.GROUPS[groupKey];
    if (!g) return '<p>Unknown research domain.</p>';
    const envButtons = g.envs.map(k => {
        const e = ResearchData.ENVS[k];
        if (!e) return '';
        return `<button type="button" class="group-env-chip" data-open-env="${esc(k)}" data-parent-group="${esc(groupKey)}">
            <span>${esc(e.k.split(' · ')[0])}</span>
            <strong>${esc(e.t)}</strong>
            <small>${esc(e.signals.slice(0,3).join(' · '))}</small>
            <i class="fas fa-arrow-up-right-from-square"></i>
        </button>`;
    }).join('');
    const relatedButtons = (g.related || []).map(id => {
        const c = Cases.get(id);
        if (!c) return '';
        return `<button type="button" class="env-related-project" data-open-case="${esc(id)}" data-from="research-group">
            <strong>${esc(c.title)}</strong>
            <span>${esc(c.kicker)}</span>
            <i class="fas fa-arrow-right"></i>
        </button>`;
    }).join('');
    return `
        <button class="modal-close" type="button" aria-label="Close research domain" data-close-modal><i class="fas fa-xmark"></i></button>
        <div class="env-group-head">
            <div>
                <span class="modal-kicker">${esc(g.kicker)}</span>
                <h2 id="envGroupModalTitle">${esc(g.title)}</h2>
                <p id="envGroupModalLead">${esc(g.lead)}</p>
            </div>
            <span class="env-project-index">DOMAIN DOSSIER</span>
        </div>
        <div class="group-dossier-grid">
            <section>
                <h4><i class="fas fa-brain"></i> What I Do</h4>
                <ul class="group-focus-list">${g.signals.map(s => `<li>${esc(s)}</li>`).join('')}</ul>
            </section>
            <section>
                <h4><i class="fas fa-screwdriver-wrench"></i> Skills &amp; Tools</h4>
                <div class="env-signal-tags group-tool-tags">${g.signals.map(s => `<span>${esc(s)}</span>`).join('')}</div>
                <div class="group-flow"><small>RESEARCH PATH</small><strong>Explore → Reproduce → Validate → Investigate → Engineer</strong></div>
            </section>
        </div>
        <section class="group-environments-panel">
            <h4><i class="fas fa-cubes"></i> Environments &amp; Practice</h4>
            <div class="group-env-list">${envButtons}</div>
        </section>
        <section class="env-related">
            <h4><i class="fas fa-file-shield"></i> Related Technical Record</h4>
            <div class="env-related-grid">${relatedButtons || '<p class="env-empty-note">No dedicated public case file is currently mapped to this domain.</p>'}</div>
        </section>
        <div class="env-group-footer">
            <button type="button" class="env-back-link" data-cb-pop><i class="fas fa-arrow-left"></i> Back to Research Environment</button>
        </div>`;
}

function renderEnvDossier(envKey, parentGroup) {
    const e = ResearchData.ENVS[envKey];
    if (!e) return '<p>Unknown environment.</p>';
    const d = ResearchData.DEPTH[envKey] || { skills: e.focus, tools: e.signals };
    const ext = ResearchData.EXTERNAL_LINKS[envKey];
    const relatedButtons = (e.related || []).map(([id, title, desc]) => {
        const c = Cases.get(id);
        return `<button type="button" class="env-evidence-card" data-open-case="${esc(id)}" data-from="research-env">
            <span>RELATED EVIDENCE</span>
            <strong>${esc(c ? c.title : title)}</strong>
            <small>${esc(desc)}</small>
            <i class="fas fa-arrow-right"></i>
        </button>`;
    }).join('');
    const extHtml = ext ? `<a class="env-external-link" href="${esc(ext[0])}" target="_blank" rel="noopener noreferrer"><i class="fas fa-arrow-up-right-from-square"></i> ${esc(ext[1])}</a>` : '';
    const backHtml = parentGroup
        ? `<button type="button" class="env-back-link" data-cb-pop><i class="fas fa-arrow-left"></i> Back to ${esc(ResearchData.GROUPS[parentGroup]?.title || 'Research Domain')}</button>`
        : `<button type="button" class="env-back-link" data-cb-pop><i class="fas fa-arrow-left"></i> Back to Research Environment</button>`;
    return `
        <button class="modal-close" type="button" aria-label="Close research environment" data-close-modal>×</button>
        <div class="env-modal-head"><span class="modal-kicker">0xCB · RESEARCH ENVIRONMENT</span><span class="security-command-live"><i class="fas fa-circle"></i> HANDS-ON</span></div>
        <div class="env-dossier-identity">
            <div>
                <span class="modal-kicker">${esc(e.k)}</span>
                <h2 id="envModalTitle">${esc(e.t)}</h2>
                <p class="env-modal-lead">${esc(e.lead)}</p>
            </div>
            <span class="env-dossier-status">HANDS-ON · ${esc(String(e.signals.length).padStart(2,'0'))} SIGNALS</span>
        </div>
        ${backHtml}
        <section class="env-deep-intro env-objective-panel">
            <div><span class="modal-kicker">RESEARCH OBJECTIVE</span><h4>Why this environment matters</h4></div>
            <p>${esc(e.lead)}</p>
        </section>
        <div class="env-modal-grid">
            <section>
                <h4><i class="fas fa-crosshairs"></i> What I Actually Do</h4>
                <ul>${e.focus.map(f => `<li>${esc(f)}</li>`).join('')}</ul>
            </section>
            <section>
                <h4><i class="fas fa-route"></i> Working Method</h4>
                <div class="env-flow"><small>WORKFLOW</small><strong>${esc(e.flow)}</strong></div>
            </section>
        </div>
        <section class="env-analysis-panel">
            <div><span class="modal-kicker">RESEARCH LENS</span><h4>What I inspect, test or correlate</h4></div>
            <div class="env-analysis-tags">${e.signals.map(s => `<span>${esc(s)}</span>`).join('')}</div>
        </section>
        <section class="env-depth-panel">
            <div class="env-depth-head">
                <div><span class="modal-kicker">PRACTICAL DEPTH</span><h4><i class="fas fa-screwdriver-wrench"></i> Skills &amp; Tools</h4></div>
                <span class="env-depth-count">${d.skills.length + d.tools.length} signals</span>
            </div>
            <div class="env-depth-columns">
                <div><small>SKILLS</small><div class="env-signal-tags">${d.skills.map(x => `<span>${esc(x)}</span>`).join('')}</div></div>
                <div><small>TOOLS / PLATFORMS</small><div class="env-signal-tags">${d.tools.map(x => `<span>${esc(x)}</span>`).join('')}</div></div>
            </div>
        </section>
        <section class="env-related env-evidence-record">
            <div class="env-related-head">
                <div><span class="modal-kicker">CONNECTED WORK</span><h4><i class="fas fa-link"></i> Related Projects &amp; Case Files</h4></div>
                <small>Open the evidence behind this environment.</small>
            </div>
            <div class="env-evidence-grid">${relatedButtons || '<p class="env-empty-note">No dedicated public case file is currently mapped to this environment.</p>'}</div>
        </section>
        <div class="env-modal-actions">
            ${parentGroup ? `<button type="button" class="env-domain-link" data-open-group="${esc(parentGroup)}"><i class="fas fa-sitemap"></i> Explore ${esc(ResearchData.GROUPS[parentGroup]?.title || 'Domain')}</button>` : ''}
            ${extHtml}
        </div>`;
}

function renderSecurityDomain(domainKey) {
    const d = ResearchData.SECURITY_DOMAINS[domainKey];
    if (!d) return '<p>Unknown security domain.</p>';
    const related = d.projects.map(p => {
        const key = p[3] || p[2];
        const c = Cases.get(key);
        return `<button type="button" class="security-related-case" data-open-case="${esc(key)}" data-from="security-map">
            <strong>${esc(p[0])}</strong>
            <span>${esc(p[1])}</span>
            <i class="fas fa-arrow-right"></i>
        </button>`;
    }).join('');
    const tabKeys = Object.keys(ResearchData.SECURITY_DOMAINS);
    const activeIndex = tabKeys.indexOf(domainKey) + 1;
    return `
        <button class="modal-close" aria-label="Close security command center" data-close-modal type="button">×</button>
        <div class="security-command-modal-head">
            <span class="modal-kicker">0xCB · TECHNICAL COMMAND CENTER</span>
            <span class="security-command-live"><i class="fas fa-circle"></i> LIVE MAP</span>
        </div>
        <h2 id="securityCommandModalTitle">Security Practice Map</h2>
        <p class="security-command-modal-lead">A single technical index connecting disciplines to methods, tooling, evidence, and the case work where those skills are applied.</p>
        <div class="security-command-tabs" id="securityCommandTabs"></div>
        <div class="security-command-modal-content" id="securityCommandModalContent">
            <div class="sc-domain-head">
                <div>
                    <span class="modal-kicker">${esc(d.k)}</span>
                    <h3>${esc(d.t)}</h3>
                    <p>${esc(d.summary)}</p>
                </div>
                <div class="sc-domain-index">${String(activeIndex).padStart(2,'0')} / ${tabKeys.length}</div>
            </div>
            <section class="sc-method-panel">
                <h4><i class="fas fa-route"></i> Methods &amp; Practice</h4>
                <ul>${d.methods.map(m => `<li>${esc(m)}</li>`).join('')}</ul>
            </section>
            <section class="sc-depth-note">
                <div><span class="modal-kicker">HOW THIS SHOWS UP IN MY WORK</span><h4>${esc(d.t)} in practice</h4></div>
                <p>${esc(d.summary)} I connect the methods below to documented technical work, then follow the evidence into a case file where available.</p>
            </section>
            <section class="sc-related">
                <div class="sc-related-head">
                    <h4><i class="fas fa-file-shield"></i> Related Case Files</h4>
                    <small>Open a record to launch its full technical dossier.</small>
                </div>
                <div class="sc-related-grid">${related}</div>
            </section>
            <section class="sc-tools-panel">
                <div class="sc-tools-head">
                    <div><span class="modal-kicker">TECHNICAL DEPTH</span><h4><i class="fas fa-screwdriver-wrench"></i> Skills &amp; Tools</h4></div>
                    <span class="env-depth-count">${d.tools.length} tools / technologies</span>
                </div>
                <div class="modal-meta">${d.tools.map(x => `<span>${esc(x)}</span>`).join('')}</div>
            </section>
        </div>`;
}

function renderRoleDossier(roleKey) {
    const d = ResearchData.ROLES[roleKey];
    if (!d) return '<p>Unknown role scope.</p>';
    const related = d.related.map(([id, label, desc]) => {
        const c = Cases.get(id);
        return `<button type="button" data-open-case="${esc(id)}" data-from="role-dossier">
            <strong>${esc(c ? c.title : label)}</strong>
            <span>${esc(desc)}</span>
            <i class="fas fa-arrow-right"></i>
        </button>`;
    }).join('');
    return `
        <button class="modal-close" type="button" aria-label="Close role dossier" data-close-modal><i class="fas fa-xmark"></i></button>
        <span class="modal-kicker">${esc(d.k)}</span>
        <div class="role-dossier-head">
            <div>
                <h2 id="roleDossierTitle">${esc(d.t)}</h2>
                <p>${esc(d.what)}</p>
            </div>
            <span class="role-dossier-index">${roleKey === 'teamlead' ? 'TEAM LEAD' : 'ROLE SCOPE'}</span>
        </div>
        <div class="role-dossier-grid">
            <section>
                <h4><i class="fas fa-brain"></i> How I Work</h4>
                <ul>${d.how.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
                <div class="role-dossier-principle"><small>DECISION PRINCIPLE</small><strong>Understand → Validate → Correlate → Improve</strong></div>
            </section>
            <section>
                <h4><i class="fas fa-bullseye"></i> What This Looks Like</h4>
                <p class="role-dossier-explanation">I stay close to the technical problem: understand the system, validate observable behaviour, follow the evidence, connect it to impact, and turn the result into a defensible security or engineering decision.</p>
                <div class="role-thinking-flow"><span>OBSERVE</span><b>→</b><span>VALIDATE</span><b>→</b><span>INVESTIGATE</span><b>→</b><span>IMPROVE</span></div>
            </section>
        </div>
        <section class="role-related">
            <h4><i class="fas fa-link"></i> Related Work</h4>
            <div class="role-related-grid">${related}</div>
        </section>
        <section class="role-depth-panel">
            <div class="role-depth-head">
                <div><span class="modal-kicker">TECHNICAL DEPTH</span><h4><i class="fas fa-layer-group"></i> Skills &amp; Tools</h4></div>
                <span class="env-depth-count">${d.skills.length + d.tools.length} signals</span>
            </div>
            <div class="role-depth-columns">
                <div><small>SKILLS</small><div class="role-dossier-tags">${d.skills.map(x => `<span>${esc(x)}</span>`).join('')}</div></div>
                <div><small>TOOLS / PLATFORMS</small><div class="role-dossier-tags">${d.tools.map(x => `<span>${esc(x)}</span>`).join('')}</div></div>
            </div>
        </section>`;
}

function renderCaseIndex() {
    const list = Cases.list();
    const entries = list.map(c => `
        <div class="case-index-item">
            <div class="case-item-copy">
                <strong>${esc(c.cardTitle || c.title)}</strong>
                <small>${esc(c.kicker)}</small>
            </div>
            <button class="case-open-btn" type="button" data-open-case="${esc(c.id)}" data-from="case-index">OPEN DOSSIER →</button>
        </div>`).join('');
    return `
        <button aria-label="Close case index" class="modal-close" data-close-modal type="button">×</button>
        <span class="modal-kicker">TECHNICAL RECORD</span>
        <h2 id="caseIndexTitle">Full case file index</h2>
        <p class="case-index-lead">The complete project record remains available here without turning the main page into a wall of cards. Select any case file to open its technical dossier.</p>
        <div class="case-index-list" id="caseIndexList">${entries}</div>`;
}

function renderSecurityTabs(domainKey) {
    return Object.entries(ResearchData.SECURITY_DOMAINS).map(([k, d]) =>
        `<button class="security-command-tab${k === domainKey ? ' active' : ''}" type="button" data-security-domain-tab="${esc(k)}">${esc(d.t.replace(/ &.*$/, ''))}</button>`
    ).join('');
}

/* ============================================================
   PART 6 — SINGLE DELEGATED INTERACTION ROUTER
   One click handler. One keydown handler. Every route resolved
   through Cases.open() or CBModal.push().
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Register all modal roots declared in the DOM.
    CBModal.register();

    // Hydrate the case registry from the actual DOM.
    Cases.hydrateFromDOM();

    // Open the research map from the hero or the section button.
    ['heroResearchEnvironment', 'openResearchEnvironment'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => CBModal.push('researchMapModal', {
            render: renderResearchMap,
            focus: '[data-close-modal]',
            breadcrumb: 'RESEARCH ENVIRONMENT'
        }));
    });

    // Open the security command center from its launch buttons.
    ['openSecurityCommand', 'openSecurityCommandBottom'].forEach(id => {
        const el = document.getElementById(id);
        if (el) el.addEventListener('click', () => CBModal.push('securityCommandModal', {
            render: () => {
                const base = renderSecurityDomain('web');
                // Insert tabs after they are rendered.
                setTimeout(() => {
                    const tabsHost = document.getElementById('securityCommandTabs');
                    if (tabsHost) tabsHost.innerHTML = renderSecurityTabs('web');
                }, 0);
                return base;
            },
            focus: '[data-close-modal]',
            breadcrumb: 'SECURITY PRACTICE MAP'
        }));
    });

    // Practice Map cards on the main page.
    document.querySelectorAll('.unified-domain-card[data-security-domain]').forEach(card => {
        card.addEventListener('click', () => {
            const key = card.dataset.securityDomain;
            CBModal.push('securityCommandModal', {
                render: () => {
                    const html = renderSecurityDomain(key);
                    setTimeout(() => {
                        const tabsHost = document.getElementById('securityCommandTabs');
                        if (tabsHost) tabsHost.innerHTML = renderSecurityTabs(key);
                    }, 0);
                    return html;
                },
                focus: '[data-close-modal]',
                breadcrumb: 'SECURITY PRACTICE MAP'
            });
        });
    });

    // Case index toggle at the section level.
    const caseToggle = document.getElementById('caseIndexToggle');
    if (caseToggle) {
        caseToggle.addEventListener('click', () => {
            CBModal.push('caseIndexModal', {
                render: renderCaseIndex,
                focus: '[data-close-modal]',
                breadcrumb: 'CASE INDEX'
            });
        });
    }

    // Team Lead role-open trigger.
    const roleOpenTrigger = document.querySelector('.role-open-trigger[data-role-scope]');
    if (roleOpenTrigger) {
        roleOpenTrigger.addEventListener('click', () => {
            const key = roleOpenTrigger.dataset.roleScope;
            CBModal.push('roleDossierModal', {
                render: () => renderRoleDossier(key),
                focus: '[data-close-modal]',
                breadcrumb: 'TEAM LEAD · ' + key.toUpperCase()
            });
        });
    }

    // Project cards on the section: open case file.
    document.querySelectorAll('#projects .project-open').forEach(btn => {
        btn.addEventListener('click', () => {
            const card = btn.closest('.project-card');
            if (card && card.dataset.project) Cases.open(card.dataset.project, { from: 'project-card-button' });
        });
    });
    document.querySelectorAll('#projects .project-card').forEach(card => {
        card.addEventListener('click', e => {
            if (e.target.closest('button,a')) return;
            if (card.dataset.project) Cases.open(card.dataset.project, { from: 'project-card-body' });
        });
    });

    // Experience / role project links (buttons with data-role-project).
    document.querySelectorAll('[data-role-project]').forEach(btn => {
        btn.addEventListener('click', () => Cases.open(btn.dataset.roleProject, { from: 'role-project' }));
    });

    // Focus "view work" links.
    document.querySelectorAll('.focus-project-link').forEach(btn => {
        btn.addEventListener('click', () => {
            const filter = btn.dataset.projectFilter;
            if (filter) {
                const target = document.querySelector(`.project-filter[data-filter="${filter}"]`);
                if (target) target.click();
                document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
            }
        });
    });

    // Conversation triggers.
    document.querySelectorAll('.conversation-trigger, #navConversationTrigger').forEach(btn => {
        btn.addEventListener('click', () => {
            CBModal.push('conversationModal', {
                render: renderConversation,
                focus: '#conversationTopic',
                breadcrumb: 'CONVERSATION'
            });
            setTimeout(() => bindConversationInteractions(), 30);
        });
    });

    // Referral button.
    const referralBtn = document.getElementById('referralButton');
    if (referralBtn) {
        referralBtn.addEventListener('click', () => {
            CBModal.push('referralModal', {
                render: renderReferral,
                focus: '[data-close-modal]',
                breadcrumb: 'REFERRAL'
            });
            setTimeout(() => bindReferralInteractions(), 30);
        });
    }

    // Command palette triggers.
    const commandTriggers = [
        document.getElementById('commandTrigger'),
        ...document.querySelectorAll('[data-command-action="command"]')
    ].filter(Boolean);
    commandTriggers.forEach(t => t.addEventListener('click', openCommandModal));

    document.addEventListener('keydown', e => {
        if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') { e.preventDefault(); openCommandModal(); }
        if (e.key === '/' && !/input|textarea|select/i.test(document.activeElement?.tagName || '')) { e.preventDefault(); openCommandModal(); }
        if (e.key === 't' && e.ctrlKey) { e.preventDefault(); document.querySelector('.theme-toggle')?.click(); }
        if (e.key === 'Escape' && !CBModal.stack.length) {
            document.querySelector('.nav-links')?.classList.remove('active');
            document.querySelector('.hamburger')?.classList.remove('active');
        }
    });

    // Ribbon actions and footer command actions.
    document.querySelectorAll('[data-command-action]').forEach(btn => {
        btn.addEventListener('click', () => executeCommandAction(btn.dataset.commandAction));
    });

    // Project filters.
    document.querySelectorAll('.project-filter').forEach(btn => {
        btn.addEventListener('click', () => applyProjectFilter(btn.dataset.filter));
    });

    // Resume buttons.
    document.querySelectorAll('a[href="#"][onclick*="handleResumeClick"], .resume-action').forEach(el => {
        el.removeAttribute('onclick');
        el.addEventListener('click', e => handleResumeClick(e, /download/i.test(el.textContent)));
    });

    // Hash deep-linking for case files.
    syncFromHash();
    window.addEventListener('hashchange', syncFromHash);
});

/* ---- Single delegated click router for anything carrying data-open-case ---- */
document.addEventListener('click', e => {
    const caseBtn = e.target.closest('[data-open-case]');
    if (caseBtn) {
        e.preventDefault();
        const id = caseBtn.dataset.openCase;
        const from = caseBtn.dataset.from || 'delegated';
        Cases.open(id, { from });
        return;
    }
    const groupBtn = e.target.closest('[data-research-group]');
    if (groupBtn) {
        e.preventDefault();
        const key = groupBtn.dataset.researchGroup;
        CBModal.push('envGroupModal', {
            render: () => renderEnvGroup(key),
            focus: '[data-close-modal]',
            breadcrumb: 'RESEARCH / ' + key.toUpperCase()
        });
        return;
    }
    const envBtn = e.target.closest('[data-open-env]');
    if (envBtn) {
        e.preventDefault();
        const envKey = envBtn.dataset.openEnv;
        const parentGroup = envBtn.dataset.parentGroup || null;
        CBModal.push('envModal', {
            render: () => renderEnvDossier(envKey, parentGroup),
            focus: '[data-close-modal]',
            breadcrumb: 'RESEARCH / ' + (parentGroup ? parentGroup.toUpperCase() + ' / ' : '') + envKey.toUpperCase()
        });
        return;
    }
    const groupLink = e.target.closest('[data-open-group]');
    if (groupLink) {
        e.preventDefault();
        const key = groupLink.dataset.openGroup;
        CBModal.push('envGroupModal', {
            render: () => renderEnvGroup(key),
            focus: '[data-close-modal]',
            breadcrumb: 'RESEARCH / ' + key.toUpperCase()
        });
        return;
    }
    const tabBtn = e.target.closest('[data-security-domain-tab]');
    if (tabBtn) {
        e.preventDefault();
        const key = tabBtn.dataset.securityDomainTab;
        const content = document.getElementById('securityCommandModalContent');
        if (content) content.outerHTML = renderSecurityDomain(key).match(/<div class="security-command-modal-content"[\s\S]*<\/div>\s*$/)?.[0] || content.outerHTML;
        // Simpler: replace via CBModal re-render of top layer with same tabs.
        const tabsHost = document.getElementById('securityCommandTabs');
        if (tabsHost) tabsHost.innerHTML = renderSecurityTabs(key);
        // Re-render the content body.
        const host = CBModal.roots['securityCommandModal'];
        if (host) {
            // Regenerate the whole modal HTML to reflect active tab.
            host.innerHTML = renderSecurityDomain(key);
            setTimeout(() => {
                const newTabs = document.getElementById('securityCommandTabs');
                if (newTabs) newTabs.innerHTML = renderSecurityTabs(key);
            }, 0);
        }
        return;
    }
    const caseIndexOpen = e.target.closest('[data-open-case-index]');
    if (caseIndexOpen) {
        e.preventDefault();
        CBModal.push('caseIndexModal', { render: renderCaseIndex, focus: '[data-close-modal]', breadcrumb: 'CASE INDEX' });
        return;
    }
});

/* ============================================================
   PART 7 — CONVERSATION / REFERRAL / COMMAND RENDERERS
   (HTML preserved from v5.1; wiring reattached after render)
   ============================================================ */

function renderConversation() {
    return `
        <button class="modal-close" type="button" aria-label="Close" data-close-modal><i class="fas fa-xmark"></i></button>
        <span class="modal-kicker">0xCB / COMMUNICATION CHANNEL</span>
        <h2 id="conversationTitle">Start a Conversation</h2>
        <p class="enhanced-lead">Choose the reason for reaching out and I'll prepare a focused message. No form submission is sent to a third-party service — the final action opens your own email client.</p>
        <div class="conversation-grid">
            <label><span>Conversation type</span>
                <select id="conversationTopic">
                    <option value="Cybersecurity opportunity">Cybersecurity opportunity</option>
                    <option value="Security research collaboration">Security research collaboration</option>
                    <option value="Security assessment discussion">Security assessment discussion</option>
                    <option value="Threat intelligence / CTI">Threat intelligence / CTI</option>
                    <option value="Technical project discussion">Technical project discussion</option>
                    <option value="General introduction">General introduction</option>
                </select>
            </label>
            <label><span>Your name</span><input id="conversationName" autocomplete="name" placeholder="Your name" /></label>
        </div>
        <label class="conversation-field"><span>Message</span><textarea id="conversationMessage" placeholder="Tell me what you would like to discuss..."></textarea></label>
        <div class="conversation-preview" id="conversationPreview"><span>MAIL</span><strong>Subject: Cybersecurity opportunity</strong><small>Ready to open in your email client.</small></div>
        <div class="enhanced-actions">
            <button class="btn btn-primary" id="sendConversation" type="button"><i class="fas fa-paper-plane"></i> Open Email Draft</button>
            <button class="btn btn-outline" id="copyConversation" type="button"><i class="fas fa-copy"></i> Copy Draft</button>
            <a class="btn btn-secondary" href="https://www.linkedin.com/in/chandrashekar-bala/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i> Continue on LinkedIn</a>
        </div>`;
}

function bindConversationInteractions() {
    const topic = document.getElementById('conversationTopic');
    const name = document.getElementById('conversationName');
    const message = document.getElementById('conversationMessage');
    const preview = document.getElementById('conversationPreview');
    const defaults = {
        'Cybersecurity opportunity':'Hello Chandrashekar, I came across your portfolio and would like to discuss a cybersecurity opportunity.',
        'Security research collaboration':'Hello Chandrashekar, I would like to discuss a potential security research collaboration.',
        'Security assessment discussion':'Hello Chandrashekar, I would like to discuss a security assessment or application-security engagement.',
        'Threat intelligence / CTI':'Hello Chandrashekar, I would like to discuss threat intelligence, CTI, or adversary-research work.',
        'Technical project discussion':'Hello Chandrashekar, I would like to discuss a technical cybersecurity project or engineering opportunity.',
        'General introduction':'Hello Chandrashekar, I came across your portfolio and would like to connect.'
    };
    function update() {
        const t = topic?.value || 'Cybersecurity opportunity';
        if (message && (!message.dataset.edited || !message.value.trim())) message.value = defaults[t] || defaults['General introduction'];
        const who = name?.value.trim();
        if (preview) preview.innerHTML = `<span>MAIL</span><strong>Subject: ${esc(t)}</strong><small>${who ? 'Prepared for ' + esc(who) + '. ' : ' '}Ready to open in your email client.</small>`;
    }
    if (message) message.addEventListener('input', () => message.dataset.edited = 'true');
    [topic, name].forEach(el => el && el.addEventListener('input', update));
    update();

    document.getElementById('sendConversation')?.addEventListener('click', () => {
        const subject = topic?.value || 'Cybersecurity opportunity';
        const who = name?.value.trim();
        const body = (message?.value.trim() || defaults[subject] || defaults['General introduction']) + (who ? '\n\nName: ' + who : '') + '\n\nPortfolio: ' + location.href.split('#')[0];
        location.href = 'mailto:chandrashekar-bala@protonmail.com?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
        notify('Email draft prepared.');
    });
    document.getElementById('copyConversation')?.addEventListener('click', async () => {
        const subject = topic?.value || 'Cybersecurity opportunity';
        const who = name?.value.trim();
        const draft = 'Subject: ' + subject + '\n\n' + (message?.value.trim() || defaults[subject] || defaults['General introduction']) + (who ? '\n\nName: ' + who : '');
        try { await navigator.clipboard.writeText(draft); notify('Conversation draft copied to clipboard.'); }
        catch { notify('Clipboard access was unavailable.'); }
    });
}

function renderReferral() {
    return `
        <button class="modal-close" type="button" aria-label="Close" data-close-modal><i class="fas fa-xmark"></i></button>
        <span class="modal-kicker">0xCB / REFERRAL CHANNEL</span>
        <h2 id="referralTitle">Know someone hiring for security?</h2>
        <p class="enhanced-lead">Share the portfolio directly or copy a short referral note. The wording stays factual and points the recipient toward the technical record rather than generic claims.</p>
        <div class="referral-grid">
            <button class="referral-card" type="button" data-referral="copy"><i class="fas fa-copy"></i><strong>Copy referral note</strong><span>Copies a recruiter-friendly introduction.</span></button>
            <button class="referral-card" type="button" data-referral="share"><i class="fas fa-share-nodes"></i><strong>Share portfolio</strong><span>Uses native sharing where supported.</span></button>
            <a class="referral-card" href="mailto:?subject=Cybersecurity%20Candidate%20Referral&body=I%27d%20like%20to%20recommend%20Chandrashekar%20Bala%20for%20a%20cybersecurity%20opportunity.%20His%20portfolio%20covers%20security%20assessment%2C%20web%20security%2C%20threat%20intelligence%2C%20DFIR%2C%20wireless%20security%2C%20and%20security%20engineering."><i class="fas fa-envelope"></i><strong>Send by email</strong><span>Open a prefilled referral email.</span></a>
            <a class="referral-card" href="https://www.linkedin.com/in/chandrashekar-bala/" target="_blank" rel="noopener noreferrer"><i class="fab fa-linkedin"></i><strong>Refer on LinkedIn</strong><span>Open the professional profile.</span></a>
        </div>
        <div class="referral-note">Referral text is intentionally evidence-led: security assessment, research, engineering, and documented technical work.</div>`;
}

function bindReferralInteractions() {
    function referralText() {
        return 'I\u2019d like to recommend Chandrashekar Bala for a cybersecurity opportunity. His portfolio documents security assessment, web application security, threat intelligence, DFIR, wireless security, and security engineering work. Portfolio: ' + location.href.split('#')[0];
    }
    document.querySelectorAll('[data-referral="copy"]').forEach(b => b.addEventListener('click', async () => {
        try { await navigator.clipboard.writeText(referralText()); notify('Referral note copied.'); }
        catch { notify('Clipboard access was unavailable.'); }
    }));
    document.querySelectorAll('[data-referral="share"]').forEach(b => b.addEventListener('click', async () => {
        const data = { title: 'Chandrashekar Bala — Cybersecurity Portfolio', text: 'Security research, assessment and engineering portfolio.', url: location.href.split('#')[0] };
        if (navigator.share) {
            try { await navigator.share(data); notify('Portfolio share sheet opened.'); }
            catch (e) { if (e.name !== 'AbortError') notify('Share action was cancelled.'); }
        } else {
            try { await navigator.clipboard.writeText(data.url); notify('Portfolio link copied.'); }
            catch { notify('Portfolio link: ' + data.url); }
        }
    }));
}

function renderCommand() {
    return `
        <button class="modal-close" type="button" aria-label="Close" data-close-modal><i class="fas fa-xmark"></i></button>
        <span class="modal-kicker">0xCB / COMMAND CENTER</span>
        <h2 id="commandTitle">Navigate the research record</h2>
        <div class="command-search">
            <i class="fas fa-terminal"></i>
            <input id="commandSearch" type="search" placeholder="Search sections, actions, case files..." autocomplete="off" />
            <kbd>ESC</kbd>
        </div>
        <div class="command-list" id="commandList"></div>
        <p class="command-hint"><kbd>↑</kbd> <kbd>↓</kbd> move · <kbd>Enter</kbd> execute · <kbd>Esc</kbd> close</p>`;
}

const COMMANDS = [
    ['Overview', 'Jump to the portfolio start', 'home', 'NAV'],
    ['Profile', 'Whoami and professional profile', 'about', 'NAV'],
    ['Security Command', 'Unified security disciplines, tooling and case work', 'security-command', 'NAV'],
    ['Research Environment', 'Hands-on labs, platforms, research infrastructure and adversary intelligence', 'research-environment', 'NAV'],
    ['Experience', 'Experience and research record', 'experience', 'NAV'],
    ['Case Studies', 'Open the technical case index', 'cases', 'ACTION'],
    ['Research Priorities', 'Current research focus', 'focus', 'NAV'],
    ['Professional Record', 'Evidence and milestones', 'achievements', 'NAV'],
    ['Credentials', 'Certifications and training', 'certs', 'NAV'],
    ['Services', 'How I can contribute', 'services', 'NAV'],
    ['Contact', 'Open the conversation channel', 'conversation', 'ACTION'],
    ['Refer / Share', 'Open referral and sharing tools', 'referral', 'ACTION'],
    ['Resume', 'Open the latest resume', 'resume', 'ACTION'],
    ['GitHub', 'Open source portfolio profile', 'github', 'ACTION'],
    ['LinkedIn', 'Open professional profile', 'linkedin', 'ACTION'],
    ['Email', 'Open direct email', 'email', 'ACTION'],
    ['Toggle Theme', 'Switch dark/light interface', 'theme', 'ACTION']
];

function openCommandModal() {
    CBModal.push('commandModal', {
        render: renderCommand,
        focus: '#commandSearch',
        breadcrumb: 'COMMAND CENTER'
    });
    setTimeout(() => bindCommandInteractions(), 40);
}

function bindCommandInteractions() {
    const search = document.getElementById('commandSearch');
    const list = document.getElementById('commandList');
    if (!list) return;
    function render(filter = '') {
        const f = filter.trim().toLowerCase();
        const visible = COMMANDS.filter(x => (x[0] + ' ' + x[1] + ' ' + x[3]).toLowerCase().includes(f));
        list.innerHTML = visible.length
            ? visible.map((x, i) => `<button class="command-item${i === 0 ? ' active' : ''}" type="button" data-command="${esc(x[2])}"><span><strong>${esc(x[0])}</strong><small>${esc(x[1])}</small></span><b>${esc(x[3])}</b></button>`).join('')
            : '<div class="command-empty">No matching command.</div>';
    }
    render();
    search?.addEventListener('input', () => render(search.value));
    search?.addEventListener('keydown', e => {
        const items = list.querySelectorAll('.command-item');
        if (!items.length) return;
        let active = Math.max(0, Array.from(items).findIndex(x => x.classList.contains('active')));
        if (e.key === 'ArrowDown') { e.preventDefault(); items[active].classList.remove('active'); active = (active + 1) % items.length; items[active].classList.add('active'); items[active].scrollIntoView({ block: 'nearest' }); }
        if (e.key === 'ArrowUp') { e.preventDefault(); items[active].classList.remove('active'); active = (active - 1 + items.length) % items.length; items[active].classList.add('active'); items[active].scrollIntoView({ block: 'nearest' }); }
        if (e.key === 'Enter') { e.preventDefault(); items[active].click(); }
    });
    list.addEventListener('click', e => {
        const b = e.target.closest('[data-command]');
        if (!b) return;
        const key = b.dataset.command;
        CBModal.closeAll();
        executeCommandAction(key);
    });
    setTimeout(() => search?.focus(), 20);
}

function executeCommandAction(key) {
    switch (key) {
        case 'command': openCommandModal(); return;
        case 'conversation': {
            CBModal.push('conversationModal', { render: renderConversation, focus: '#conversationTopic', breadcrumb: 'CONVERSATION' });
            setTimeout(() => bindConversationInteractions(), 30);
            return;
        }
        case 'referral': {
            CBModal.push('referralModal', { render: renderReferral, focus: '[data-close-modal]', breadcrumb: 'REFERRAL' });
            setTimeout(() => bindReferralInteractions(), 30);
            return;
        }
        case 'share': document.querySelector('[data-referral="share"]')?.click(); return;
        case 'cases': CBModal.push('caseIndexModal', { render: renderCaseIndex, focus: '[data-close-modal]', breadcrumb: 'CASE INDEX' }); return;
        case 'capabilities':
        case 'security-command': {
            const el = document.getElementById('openSecurityCommand');
            if (el) el.click();
            return;
        }
        case 'resume': handleResumeClick({ preventDefault() {} }, false); return;
        case 'github': window.open('https://github.com/Chandrashekar-Bala', '_blank', 'noopener'); return;
        case 'linkedin': window.open('https://www.linkedin.com/in/chandrashekar-bala/', '_blank', 'noopener'); return;
        case 'email': location.href = 'mailto:chandrashekar-bala@protonmail.com'; return;
        case 'theme': document.querySelector('.theme-toggle')?.click(); return;
        default: {
            const target = document.getElementById(key);
            if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
}

/* ============================================================
   PART 8 — PROJECT FILTER (preserved)
   ============================================================ */

function applyProjectFilter(filter) {
    document.querySelectorAll('.project-filter').forEach(b => b.classList.toggle('active', b.dataset.filter === filter));
    document.querySelectorAll('#projects .project-card').forEach(card => {
        const categories = (card.dataset.category || '').split(/\s+/);
        const matches = filter === 'all' || categories.includes(filter);
        card.classList.toggle('project-hidden', !matches);
        if (matches && card.classList.contains('case-secondary')) card.style.display = filter === 'all' ? '' : 'block';
        if (!matches) card.style.display = 'none';
    });
    const toggle = document.getElementById('caseIndexToggle');
    if (toggle) toggle.style.display = (filter !== 'all') ? 'none' : 'inline-flex';
}

/* ============================================================
   PART 9 — TOAST + HASH DEEP-LINKING
   ============================================================ */

window.__cbNotify = function (message) {
    const toast = document.getElementById('enhancedToast');
    if (!toast) return;
    toast.textContent = message;
    toast.classList.add('show');
    clearTimeout(window.__cbNotifyTimer);
    window.__cbNotifyTimer = setTimeout(() => toast.classList.remove('show'), 2800);
};
function notify(m) { window.__cbNotify(m); }

function syncFromHash() {
    const hash = location.hash.replace(/^#/, '');
    const m = hash.match(/^case\/(.+)$/);
    if (m) {
        const id = decodeURIComponent(m[1]);
        if (Cases.resolve(id, 'hash')) {
            setTimeout(() => Cases.open(id, { from: 'hash' }), 120);
        } else {
            console.warn('[Cases] hash refers to unknown case:', id);
        }
    }
}

/* ============================================================
   PART 10 — OPEN CASE HOOK FOR EXTERNAL CALLERS
   ============================================================ */

window.__cbOpenCase = function (id, from) {
    return Cases.open(id, { from: from || 'external' });
};

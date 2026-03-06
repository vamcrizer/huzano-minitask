/* ============================================
   PTIT EXAM - MOTION EFFECTS ENGINE
   Uses Motion One (motion.dev) CDN
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Check if Motion library is available
    if (typeof Motion === 'undefined') {
        // Motion not loaded — still fire confetti on result page
        const awardIcon = document.querySelector('.fa-award');
        if (awardIcon) {
            if (typeof confetti === 'function') {
                launchResultConfetti();
            }
        }
        return;
    }

    const { animate, stagger, spring, scroll, inView } = Motion;

    // ===== ENTRANCE ANIMATIONS FOR ALL PAGES =====

    // Animate login card with spring physics
    const loginCard = document.querySelector('.login-card');
    if (loginCard) {
        animate(
            loginCard,
            { opacity: [0, 1], y: [60, 0], scale: [0.85, 1], rotateX: [15, 0] },
            { duration: 0.9, easing: spring({ stiffness: 200, damping: 20 }) },
        );

        // Form fields stagger in
        const formFields = loginCard.querySelectorAll('form > .flex-col, form > div');
        if (formFields.length) {
            animate(
                formFields,
                { opacity: [0, 1], x: [-30, 0] },
                { duration: 0.5, delay: stagger(0.08, { start: 0.3 }) },
            );
        }

        // Logo icon bounce
        const logoIcon = loginCard.querySelector('.fa-graduation-cap');
        if (logoIcon) {
            animate(
                logoIcon,
                { scale: [0, 1.3, 1], rotate: [0, -15, 0] },
                { duration: 0.8, delay: 0.2, easing: spring({ stiffness: 300, damping: 15 }) },
            );
        }
    }

    // ===== SIDEBAR ENTRANCE =====
    const sidebar = document.querySelector('.sidebar');
    if (sidebar && !sidebar.closest('[style*="position: fixed"]')) {
        animate(
            sidebar,
            { opacity: [0, 1], x: [-60, 0] },
            { duration: 0.6, easing: spring({ stiffness: 250, damping: 25 }) },
        );

        const navItems = sidebar.querySelectorAll('.nav-item');
        if (navItems.length) {
            animate(
                navItems,
                { opacity: [0, 1], x: [-20, 0] },
                { duration: 0.4, delay: stagger(0.06, { start: 0.3 }) },
            );
        }
    }

    // ===== MAIN CONTENT ENTRANCE =====
    const mainContent = document.querySelector('.main-content');
    if (mainContent) {
        const mainChildren = mainContent.children;
        if (mainChildren.length) {
            animate(
                Array.from(mainChildren),
                { opacity: [0, 1], y: [40, 0], filter: ['blur(4px)', 'blur(0px)'] },
                { duration: 0.6, delay: stagger(0.1, { start: 0.2 }) },
            );
        }
    }

    // ===== GRID CARDS SPECTACLE =====
    const gridCards = document.querySelectorAll('.grid-cards > *');
    if (gridCards.length) {
        animate(
            gridCards,
            { opacity: [0, 1], y: [50, 0], scale: [0.9, 1], rotateY: [10, 0] },
            { duration: 0.7, delay: stagger(0.1, { start: 0.15 }), easing: spring({ stiffness: 200, damping: 22 }) },
        );

        // Add hover tilt with perspective
        gridCards.forEach((card) => {
            card.style.transformStyle = 'preserve-3d';
            card.style.perspective = '800px';

            card.addEventListener('mousemove', (e) => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -5;
                const rotateY = ((x - centerX) / centerX) * 5;

                animate(card, { rotateX: rotateX, rotateY: rotateY }, { duration: 0.15 });
            });

            card.addEventListener('mouseleave', () => {
                animate(
                    card,
                    { rotateX: 0, rotateY: 0 },
                    { duration: 0.4, easing: spring({ stiffness: 200, damping: 20 }) },
                );
            });
        });
    }

    // ===== TOPBAR ENTRANCE =====
    const topbar = document.querySelector('.topbar');
    if (topbar) {
        animate(
            topbar,
            { opacity: [0, 1], y: [-30, 0] },
            { duration: 0.5, easing: spring({ stiffness: 300, damping: 25 }) },
        );

        // Timer number entrance
        const timer = topbar.querySelector('.text-2xl');
        if (timer) {
            animate(
                timer,
                { scale: [0, 1.2, 1], opacity: [0, 1] },
                { duration: 0.6, delay: 0.3, easing: spring({ stiffness: 400, damping: 15 }) },
            );
        }
    }

    // ===== RESULT PAGE CELEBRATION =====
    const awardIcon = document.querySelector('.fa-award');
    if (awardIcon) {
        const resultCard = awardIcon.closest('.surface-raised');

        // Award icon celebration
        animate(
            awardIcon,
            { scale: [0, 1.5, 1], rotate: [0, 360] },
            { duration: 1.2, easing: spring({ stiffness: 150, damping: 12 }) },
        );

        // Score numbers count up
        const scoreNums = document.querySelectorAll('.font-primary.text-4xl');
        scoreNums.forEach((el, i) => {
            animate(
                el,
                { opacity: [0, 1], scale: [0.3, 1.1, 1], y: [30, 0] },
                { duration: 0.8, delay: 0.3 + i * 0.15, easing: spring({ stiffness: 200, damping: 15 }) },
            );
        });

        // Action buttons
        const actionBtns = document.querySelectorAll('.btn-ghost, .btn-primary');
        if (resultCard) {
            const btns = resultCard.querySelectorAll('button');
            animate(
                Array.from(btns),
                { opacity: [0, 1], y: [20, 0] },
                { duration: 0.5, delay: stagger(0.1, { start: 0.8 }) },
            );
        }

        // Fire canvas-confetti celebration
        setTimeout(() => {
            if (typeof confetti === 'function') {
                launchResultConfetti();
            } else {
                createConfetti();
            }
        }, 100);
    }

    // ===== EXAM OPTION CARDS =====
    const optCards = document.querySelectorAll('.opt-card');
    optCards.forEach((card) => {
        card.addEventListener('click', () => {
            animate(
                card,
                { scale: [1, 0.95, 1.03, 1] },
                { duration: 0.4, easing: spring({ stiffness: 400, damping: 15 }) },
            );

            const chk = card.querySelector('.opt-chk');
            if (chk) {
                animate(
                    chk,
                    { scale: [0, 1.4, 1], rotate: [0, 360] },
                    { duration: 0.5, easing: spring({ stiffness: 300, damping: 12 }) },
                );
            }
        });
    });

    // ===== QUESTION BOX CLICK =====
    const qBoxes = document.querySelectorAll('.q-box');
    qBoxes.forEach((box, i) => {
        // Staggered entrance
        animate(
            box,
            { opacity: [0, 1], scale: [0, 1], rotate: [180, 0] },
            { duration: 0.4, delay: 0.05 * i, easing: spring({ stiffness: 300, damping: 18 }) },
        );

        box.addEventListener('click', () => {
            animate(
                box,
                { scale: [1, 0.8, 1.2, 1] },
                { duration: 0.3, easing: spring({ stiffness: 400, damping: 12 }) },
            );
        });
    });

    // ===== STATS BAR CHART ANIMATION =====
    const bars = document.querySelectorAll('.bar');
    if (bars.length) {
        bars.forEach((bar, i) => {
            const height = bar.style.height;
            bar.style.height = '0%';

            animate(
                bar,
                { height: ['0%', height] },
                { duration: 0.8, delay: 0.05 * i, easing: spring({ stiffness: 150, damping: 20 }) },
            );
        });
    }

    // ===== KPI NUMBER ANIMATIONS =====
    const kpiNumbers = document.querySelectorAll(
        '.surface-sunken .font-primary.text-4xl, .surface-raised .font-primary.text-4xl',
    );
    kpiNumbers.forEach((num, i) => {
        animate(
            num,
            { opacity: [0, 1], y: [40, 0], scale: [0.5, 1] },
            { duration: 0.7, delay: 0.15 * i, easing: spring({ stiffness: 200, damping: 18 }) },
        );
    });

    // ===== TABLE ROW STAGGER =====
    const tableCard = document.querySelector('.surface-raised.rounded-3xl:has(.table-header)');
    if (tableCard) {
        const rows = tableCard.querySelectorAll('.flex.gap-4:not(.table-header)');
        if (rows.length) {
            animate(
                Array.from(rows),
                { opacity: [0, 1], x: [-30, 0] },
                { duration: 0.4, delay: stagger(0.08, { start: 0.3 }) },
            );
        }
    }

    // ===== BUTTON HOVER EFFECTS (enhanced) =====
    document.querySelectorAll('.btn-primary, .btn-ghost').forEach((btn) => {
        btn.addEventListener('mouseenter', () => {
            animate(btn, { scale: 1.05 }, { duration: 0.2 });
        });
        btn.addEventListener('mouseleave', () => {
            animate(btn, { scale: 1 }, { duration: 0.3, easing: spring({ stiffness: 300, damping: 20 }) });
        });
    });

    // ===== ADMIN LOGIN LOCK ICON =====
    const lockIcon = document.querySelector('.fa-lock');
    if (lockIcon && lockIcon.closest('body').querySelector('form')) {
        animate(lockIcon, { rotate: [0, -20, 20, -10, 10, 0] }, { duration: 1.5, delay: 0.3, easing: 'ease-in-out' });
    }

    // ===== PROFILE CARD ENTRANCE =====
    const profileCard = document.querySelector('.surface-raised:has(.rounded-full.w-20)');
    if (profileCard) {
        animate(
            profileCard,
            { opacity: [0, 1], x: [-40, 0], scale: [0.95, 1] },
            { duration: 0.7, easing: spring({ stiffness: 200, damping: 22 }) },
        );

        const avatar = profileCard.querySelector('.rounded-full');
        if (avatar) {
            animate(
                avatar,
                { scale: [0, 1.1, 1], rotate: [0, 360] },
                { duration: 0.8, delay: 0.3, easing: spring({ stiffness: 200, damping: 15 }) },
            );
        }
    }

    // ===== MAGNETIC CURSOR EFFECT ON BUTTONS =====
    document.querySelectorAll('.btn-primary').forEach((btn) => {
        btn.addEventListener('mousemove', (e) => {
            const rect = btn.getBoundingClientRect();
            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            animate(btn, { x: x * 0.1, y: y * 0.1 }, { duration: 0.15 });
        });

        btn.addEventListener('mouseleave', () => {
            animate(btn, { x: 0, y: 0 }, { duration: 0.4, easing: spring({ stiffness: 300, damping: 20 }) });
        });
    });
});

// ===== CANVAS-CONFETTI CELEBRATION =====
function launchResultConfetti() {
    // Initial big burst from both sides
    const defaults = { startVelocity: 45, spread: 360, ticks: 120, zIndex: 9999 };

    function fire(particleRatio, opts) {
        confetti(
            Object.assign({}, defaults, opts, {
                particleCount: Math.floor(250 * particleRatio),
            }),
        );
    }

    // Big burst
    fire(0.25, { spread: 26, startVelocity: 55 });
    fire(0.2, { spread: 60 });
    fire(0.35, { spread: 100, decay: 0.91, scalar: 0.8 });
    fire(0.1, { spread: 120, startVelocity: 25, decay: 0.92, scalar: 1.2 });
    fire(0.1, { spread: 120, startVelocity: 45 });

    // Side cannons with delay
    setTimeout(() => {
        confetti({
            particleCount: 80,
            angle: 60,
            spread: 70,
            origin: { x: 0, y: 0.6 },
            zIndex: 9999,
            colors: ['#DC2626', '#EAB308', '#22c55e', '#6366f1', '#ec4899'],
        });
        confetti({
            particleCount: 80,
            angle: 120,
            spread: 70,
            origin: { x: 1, y: 0.6 },
            zIndex: 9999,
            colors: ['#DC2626', '#EAB308', '#22c55e', '#6366f1', '#ec4899'],
        });
    }, 400);

    // Continuous rain for 3 seconds
    const duration = 3000;
    const end = Date.now() + duration;
    const interval = setInterval(() => {
        if (Date.now() > end) return clearInterval(interval);
        confetti({
            particleCount: 3,
            angle: 60,
            spread: 55,
            origin: { x: 0, y: 0.5 },
            zIndex: 9999,
            colors: ['#DC2626', '#EAB308', '#22c55e', '#a855f7', '#0ea5e9'],
        });
        confetti({
            particleCount: 3,
            angle: 120,
            spread: 55,
            origin: { x: 1, y: 0.5 },
            zIndex: 9999,
            colors: ['#DC2626', '#EAB308', '#22c55e', '#a855f7', '#0ea5e9'],
        });
    }, 50);

    // Star-shaped burst at 1.5s
    setTimeout(() => {
        confetti({
            particleCount: 100,
            spread: 360,
            startVelocity: 30,
            gravity: 0.5,
            shapes: ['star'],
            scalar: 1.5,
            origin: { x: 0.5, y: 0.4 },
            zIndex: 9999,
            colors: ['#FFD700', '#FFA500', '#FF6347', '#FF4500'],
        });
    }, 1500);
}

// ===== FALLBACK CONFETTI GENERATOR =====
function createConfetti() {
    const colors = ['#DC2626', '#EAB308', '#22c55e', '#6366f1', '#ec4899', '#0ea5e9', '#a855f7', '#f97316'];
    const container = document.createElement('div');
    container.style.cssText =
        'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:9999;overflow:hidden;';
    document.body.appendChild(container);

    for (let i = 0; i < 60; i++) {
        const particle = document.createElement('div');
        const size = Math.random() * 8 + 4;
        const color = colors[Math.floor(Math.random() * colors.length)];
        const isCircle = Math.random() > 0.5;

        particle.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            background: ${color};
            border-radius: ${isCircle ? '50%' : '2px'};
            top: -10px;
            left: ${Math.random() * 100}%;
            opacity: 0;
        `;
        container.appendChild(particle);

        const { animate } = Motion;
        const duration = Math.random() * 2 + 1.5;
        const delay = Math.random() * 0.8;

        animate(
            particle,
            {
                y: [0, window.innerHeight + 50],
                x: [0, (Math.random() - 0.5) * 200],
                rotate: [0, Math.random() * 720 - 360],
                opacity: [1, 1, 0],
                scale: [1, 0.5],
            },
            {
                duration: duration,
                delay: delay,
                easing: 'ease-in',
            },
        );
    }

    // Clean up after animation
    setTimeout(() => container.remove(), 4000);
}

// ===== ENHANCED NAVIGATION WITH PAGE TRANSITION =====
const originalNavigateTo = window.navigateTo;
window.navigateTo = function (url) {
    const { animate } = Motion;
    const body = document.body;

    animate(
        body,
        { opacity: [1, 0], scale: [1, 0.98], filter: ['blur(0px)', 'blur(6px)'] },
        { duration: 0.3 },
    ).finished.then(() => {
        window.location.href = url;
    });
};

// ===== CURSOR TRAIL (based on sample codepen) =====
(function () {
    const trail = document.createElement('div');
    trail.classList.add('cursor-trail');
    document.body.appendChild(trail);

    document.addEventListener('mousemove', function (e) {
        const span = document.createElement('span');
        span.style.top = e.clientY + 'px';
        span.style.left = e.clientX + 'px';
        span.style.transform = 'translate(-50%, -50%)';
        trail.appendChild(span);

        setTimeout(function () {
            span.remove();
        }, 300);
    });
})();

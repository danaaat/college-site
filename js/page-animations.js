// анимации и общий функционал для всех страниц

// плавное появление страницы при загрузке
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => document.body.classList.add('loaded'), 60);
});

// тень на шапке при скролле
const headerEl = document.querySelector('.header');
if (headerEl) {
    window.addEventListener('scroll', () => {
        headerEl.style.boxShadow = window.pageYOffset > 50
            ? '0 2px 20px rgba(0,0,0,0.12)'
            : '0 2px 10px rgba(0,0,0,0.05)';
    }, { passive: true });
}

// анимация появления элементов при прокрутке
const animObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const siblings = entry.target.parentElement
                ? Array.from(entry.target.parentElement.children)
                : [];
            const idx = siblings.indexOf(entry.target);
            const delay = Math.min(idx * 90, 450);
            setTimeout(() => {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }, delay);
            animObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

const animSelectors = [
    '.specialty-card',
    '.feature-card',
    '.admin-card',
    '.review-card',
    '.specialty-description',
    '.faq-item',
    '.action-buttons',
    '.info-item',
    '.partner-card',
    '.schedule-card',
    '.doc-item',
    '.contact-container',
    '.timeline-item',
    '.partners-grid .specialty-card',
];

animSelectors.forEach(sel => {
    document.querySelectorAll(sel).forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(28px)';
        el.style.transition = 'opacity 0.55s ease, transform 0.55s ease';
        animObserver.observe(el);
    });
});

// то же самое для заголовков секций
document.querySelectorAll(
    '.specialties-section h1, .specialties-section h2, ' +
    '.specialty-detail .specialty-title, ' +
    '.container .title, .container .section-title, ' +
    '.contact-section h1, .contact-section h2, ' +
    '.schedule-section h1, .schedule-section h2, ' +
    '.partners-section h1, .partners-section h2'
).forEach(el => {
    if (!el.closest('.footer')) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(18px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        animObserver.observe(el);
    }
});

// аккордеон для faq
function initFaqAccordion() {
    document.querySelectorAll('.faq-item').forEach(item => {
        const question = item.querySelector('.faq-question');
        if (!question) return;
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            document.querySelectorAll('.faq-item').forEach(other => {
                other.classList.remove('active');
                const icon = other.querySelector('.faq-icon i');
                if (icon) icon.className = 'fas fa-chevron-down';
            });
            if (!isActive) {
                item.classList.add('active');
                const icon = item.querySelector('.faq-icon i');
                if (icon) icon.className = 'fas fa-chevron-up';
            }
        });
    });
}
initFaqAccordion();

// всплывающие уведомления
function showNotification(message, type = 'info') {
    const n = document.createElement('div');
    n.className = `notification notification-${type}`;
    n.textContent = message;
    document.body.appendChild(n);
    setTimeout(() => n.classList.add('show'), 80);
    setTimeout(() => {
        n.classList.remove('show');
        setTimeout(() => n.remove(), 300);
    }, 3200);
}

// модальное окно с формой заявки
function buildModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>Оставить заявку</h2>
            <form class="application-form" id="appForm">
                <div class="form-group">
                    <label for="aName">Ваше имя *</label>
                    <input type="text" id="aName" name="name" required>
                </div>
                <div class="form-group">
                    <label for="aPhone">Телефон *</label>
                    <input type="tel" id="aPhone" name="phone" required placeholder="+7 (___) ___-__-__">
                </div>
                <div class="form-group">
                    <label for="aEmail">Email *</label>
                    <input type="email" id="aEmail" name="email" required>
                </div>
                <div class="form-group">
                    <label for="aSpec">Специальность</label>
                    <select id="aSpec" name="specialty">
                        <option value="">Выберите специальность</option>
                        <option value="developer">Разработчик ПО</option>
                        <option value="webdesigner">Web-дизайнер</option>
                        <option value="bank">Менеджер банковских операций</option>
                        <option value="accountant">Бухгалтер</option>
                        <option value="cook">Повар</option>
                        <option value="confectioner">Кондитер</option>
                        <option value="beer">Оператор по производству пива</option>
                    </select>
                </div>
                <div class="form-group">
                    <label for="aMsg">Комментарий</label>
                    <textarea id="aMsg" name="message" rows="3"></textarea>
                </div>
                <button type="submit" class="btn btn-submit">Отправить заявку</button>
                <p class="form-note">* Обязательные поля</p>
            </form>
        </div>`;
    document.body.appendChild(modal);

    function closeModal() {
        modal.classList.remove('active');
        setTimeout(() => modal.remove(), 300);
    }

    modal.querySelector('.modal-close').addEventListener('click', closeModal);
    modal.querySelector('.modal-overlay').addEventListener('click', closeModal);

    const form = modal.querySelector('#appForm');
    const phoneInput = form.querySelector('#aPhone');
    phoneInput.addEventListener('input', e => {
        let v = e.target.value.replace(/\D/g, '');
        if (v.length > 0) {
            if (v[0] === '7' || v[0] === '8') v = '7' + v.substring(1);
            let f = '+7';
            if (v.length > 1) f += ' (' + v.substring(1, 4);
            if (v.length > 4) f += ') ' + v.substring(4, 7);
            if (v.length > 7) f += '-' + v.substring(7, 9);
            if (v.length > 9) f += '-' + v.substring(9, 11);
            e.target.value = f;
        }
    });

    form.addEventListener('submit', async e => {
        e.preventDefault();
        const data = {
            name: form.name.value,
            phone: form.phone.value,
            email: form.email.value,
            specialty: form.specialty.value,
            message: form.message.value,
            date: new Date().toISOString()
        };
        if (!data.name || !data.phone || !data.email) {
            showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            showNotification('Пожалуйста, введите корректный email', 'error');
            return;
        }
        const btn = form.querySelector('.btn-submit');
        btn.textContent = 'Отправка...';
        btn.disabled = true;
        try {
            await new Promise(r => setTimeout(r, 1400));
            const apps = JSON.parse(localStorage.getItem('applications') || '[]');
            apps.push(data);
            localStorage.setItem('applications', JSON.stringify(apps));
            showNotification('Заявка успешно отправлена! Мы свяжемся с вами.', 'success');
            form.reset();
            setTimeout(closeModal, 2000);
        } catch {
            showNotification('Произошла ошибка. Попробуйте позже.', 'error');
        } finally {
            btn.textContent = 'Отправить заявку';
            btn.disabled = false;
        }
    });

    requestAnimationFrame(() => modal.classList.add('active'));
}

document.querySelectorAll('button, a').forEach(btn => {
    if (btn.textContent.trim().includes('Оставить заявку')) {
        btn.addEventListener('click', e => {
            e.preventDefault();
            buildModal();
        });
    }
});

// кнопка наверх
(function () {
    const btn = document.createElement('button');
    btn.className = 'scroll-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Наверх');
    document.body.appendChild(btn);
    window.addEventListener('scroll', () => {
        btn.classList.toggle('visible', window.pageYOffset > 450);
    }, { passive: true });
    btn.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));
})();

// мобильное меню
function initMobileMenu() {
    const nav = document.querySelector('.nav');
    if (!nav || document.querySelector('.burger-menu')) return;
    const burger = document.createElement('button');
    burger.className = 'burger-menu';
    burger.setAttribute('aria-label', 'Меню');
    burger.innerHTML = '<span></span><span></span><span></span>';
    nav.parentElement.insertBefore(burger, nav);
    burger.addEventListener('click', () => {
        burger.classList.toggle('active');
        nav.classList.toggle('active');
        document.body.classList.toggle('menu-open');
    });
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            burger.classList.remove('active');
            nav.classList.remove('active');
            document.body.classList.remove('menu-open');
        });
    });
}

if (window.innerWidth <= 900) initMobileMenu();
window.addEventListener('resize', () => {
    if (window.innerWidth <= 900 && !document.querySelector('.burger-menu')) initMobileMenu();
}, { passive: true });

// плавная прокрутка по якорям
document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
        const target = document.querySelector(this.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
    });
});

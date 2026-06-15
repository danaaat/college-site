// главный js файл сайта колледжа

// плавная прокрутка к разделам
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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


// тень на хедере при прокрутке
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    // добавляем тень
    if (currentScroll > 50) {
        header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    } else {
        header.style.boxShadow = 'none';
    }

    lastScroll = currentScroll;
});


// анимация карточек при прокрутке
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

// карточки специальностей
document.querySelectorAll('.card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
});

// карточки преимуществ
document.querySelectorAll('.feature').forEach(feature => {
    feature.style.opacity = '0';
    feature.style.transform = 'translateY(30px)';
    feature.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(feature);
});


// форма заявки

// сюда нужно вставить url после деплоя apps script
const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbwkbmhhnNbae7bFfSaFLqoC3WQNqPYwzsxkyDRXi8qb4cvNRp99UzmYRGeVXzqcBfO8/exec';

const applicationForm = document.querySelector('.application-form');
const submitBtn = document.querySelector('.btn');

// создаём модалку с формой
function createApplicationModal() {
    const modal = document.createElement('div');
    modal.className = 'modal';
    modal.innerHTML = `
        <div class="modal-overlay"></div>
        <div class="modal-content">
            <button class="modal-close">&times;</button>
            <h2>Оставить заявку</h2>
            <form class="application-form" id="applicationForm">
                <div class="form-group">
                    <label for="name">Ваше имя *</label>
                    <input type="text" id="name" name="name" required>
                </div>

                <div class="form-group">
                    <label for="phone">Телефон *</label>
                    <input type="tel" id="phone" name="phone" required placeholder="+7 (___) ___-__-__">
                </div>

                <div class="form-group">
                    <label for="email">Email *</label>
                    <input type="email" id="email" name="email" required>
                </div>

                <div class="form-group">
                    <label for="specialty">Специальность</label>
                    <select id="specialty" name="specialty">
                        <option value="">Выберите специальность</option>
                        <option value="developer">Разработчик программного обеспечения</option>
                        <option value="webdesigner">Web-дизайнер</option>
                        <option value="bank">Менеджер банковских операций</option>
                        <option value="accountant">Бухгалтер</option>
                        <option value="cook">Повар</option>
                        <option value="confectioner">Кондитер</option>
                        <option value="beer">Оператор по производству пива</option>
                    </select>
                </div>

                <div class="form-group">
                    <label for="message">Комментарий</label>
                    <textarea id="message" name="message" rows="4"></textarea>
                </div>

                <button type="submit" class="btn btn-submit">Отправить заявку</button>
                <p class="form-note">* Обязательные поля</p>
            </form>
        </div>
    `;

    document.body.appendChild(modal);
    return modal;
}

// открываем модалку по кнопке
document.querySelectorAll('.btn').forEach(btn => {
    if (btn.textContent.includes('Оставить заявку')) {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const modal = createApplicationModal();
            modal.classList.add('active');

            // закрываем
            modal.querySelector('.modal-close').addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            });

            modal.querySelector('.modal-overlay').addEventListener('click', () => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            });

            // отправка формы
            setupFormSubmission(modal);
        });
    }
});

// настройка отправки
function setupFormSubmission(modal) {
    const form = modal.querySelector('#applicationForm');

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // собираем данные
        const formData = {
            name: form.name.value,
            phone: form.phone.value,
            email: form.email.value,
            specialty: form.specialty.value,
            message: form.message.value,
            date: new Date().toISOString()
        };

        // проверяем заполненность
        if (!formData.name || !formData.phone || !formData.email) {
            showNotification('Пожалуйста, заполните все обязательные поля', 'error');
            return;
        }

        // проверка формата email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            showNotification('Пожалуйста, введите корректный email', 'error');
            return;
        }

        // блокируем кнопку пока отправляем
        const submitBtn = form.querySelector('.btn-submit');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;

        try {
            // mode: 'no-cors' обязателен для Google Apps Script
            await fetch(APPS_SCRIPT_URL, {
                method: 'POST',
                mode: 'no-cors',
                headers: { 'Content-Type': 'text/plain' },
                body: JSON.stringify(formData)
            });

            showNotification('Заявка успешно отправлена! Мы свяжемся с вами в ближайшее время.', 'success');
            form.reset();

            setTimeout(() => {
                modal.classList.remove('active');
                setTimeout(() => modal.remove(), 300);
            }, 2000);

        } catch (error) {
            showNotification('Произошла ошибка. Проверьте интернет и попробуйте снова.', 'error');
            console.error('Ошибка отправки:', error);
        } finally {
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }
    });

    // маска для ввода телефона
    const phoneInput = form.querySelector('#phone');
    phoneInput.addEventListener('input', (e) => {
        let value = e.target.value.replace(/\D/g, '');
        if (value.length > 0) {
            if (value[0] === '7' || value[0] === '8') {
                value = '7' + value.substring(1);
            }
            let formatted = '+7';
            if (value.length > 1) formatted += ' (' + value.substring(1, 4);
            if (value.length > 4) formatted += ') ' + value.substring(4, 7);
            if (value.length > 7) formatted += '-' + value.substring(7, 9);
            if (value.length > 9) formatted += '-' + value.substring(9, 11);
            e.target.value = formatted;
        }
    });
}

// всплывающие уведомления
function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => notification.classList.add('show'), 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => notification.remove(), 300);
    }, 3000);
}


// карусель отзывов
(function () {
    const track = document.querySelector('.reviews-track');
    if (!track) return;

    const cards = Array.from(track.children);
    const dotsContainer = document.querySelector('.reviews-dots');
    const prevBtn = document.querySelector('.reviews-arrow--prev');
    const nextBtn = document.querySelector('.reviews-arrow--next');

    function getVisible() {
        if (window.innerWidth <= 600) return 1;
        if (window.innerWidth <= 1024) return 2;
        return 3;
    }

    let current = 0;
    const total = cards.length;

    function buildDots() {
        dotsContainer.innerHTML = '';
        const pages = total - getVisible() + 1;
        for (let i = 0; i < pages; i++) {
            const dot = document.createElement('button');
            dot.className = 'reviews-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => goTo(i));
            dotsContainer.appendChild(dot);
        }
    }

    function goTo(index) {
        const pages = total - getVisible() + 1;
        current = Math.max(0, Math.min(index, pages - 1));
        const cardWidth = cards[0].getBoundingClientRect().width + 24;
        track.style.transform = `translateX(-${current * cardWidth}px)`;
        dotsContainer.querySelectorAll('.reviews-dot').forEach((d, i) => {
            d.classList.toggle('active', i === current);
        });
        if (prevBtn) prevBtn.disabled = current === 0;
        if (nextBtn) nextBtn.disabled = current >= pages - 1;
    }

    if (prevBtn) prevBtn.addEventListener('click', () => goTo(current - 1));
    if (nextBtn) nextBtn.addEventListener('click', () => goTo(current + 1));

    let touchStartX = 0;
    track.addEventListener('touchstart', e => { touchStartX = e.touches[0].clientX; }, { passive: true });
    track.addEventListener('touchend', e => {
        const diff = touchStartX - e.changedTouches[0].clientX;
        if (Math.abs(diff) > 50) goTo(diff > 0 ? current + 1 : current - 1);
    }, { passive: true });

    buildDots();
    goTo(0);

    window.addEventListener('resize', () => {
        buildDots();
        goTo(0);
    }, { passive: true });
})();

// счётчик цифр в статистике
function animateCounter(element, target, duration = 2000) {
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(current);
        }
    }, 16);
}

// запускаем когда статистика попадает в экран
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('counted')) {
            entry.target.classList.add('counted');
            const statNumber = entry.target.querySelector('span');
            const targetValue = parseInt(statNumber.textContent);
            animateCounter(statNumber, targetValue);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});


// мобильное меню
function createMobileMenu() {
    const header = document.querySelector('.header');
    const nav = document.querySelector('.nav');

    if (!header || !nav || header.querySelector('.burger-menu')) return;

    const burger = document.createElement('button');
    burger.className = 'burger-menu';
    burger.setAttribute('aria-label', 'Меню');
    burger.innerHTML = `
        <span></span>
        <span></span>
        <span></span>
    `;

    header.insertBefore(burger, nav);

    function closeMenu() {
        burger.classList.remove('active');
        nav.classList.remove('active');
        document.body.classList.remove('menu-open');
    }

    burger.addEventListener('click', () => {
        const isOpen = nav.classList.contains('active');
        if (isOpen) {
            closeMenu();
        } else {
            burger.classList.add('active');
            nav.classList.add('active');
            document.body.classList.add('menu-open');
        }
    });

    // закрываем при клике на ссылку
    document.querySelectorAll('.nav a').forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // закрываем при клике на затемнение
    document.addEventListener('click', (e) => {
        if (nav.classList.contains('active') &&
            !nav.contains(e.target) &&
            !burger.contains(e.target)) {
            closeMenu();
        }
    });
}

createMobileMenu();


// данные специальностей (пока статичные)
const specialtiesData = [
    {
        id: 1,
        title: 'Программное обеспечение',
        items: ['Web-дизайнер', 'Разработчик программного обеспечения'],
        icon: 'software.svg'
    },
    {
        id: 2,
        title: 'Банковское дело',
        items: ['Менеджер банковских операций'],
        icon: 'bank.svg'
    },
    {
        id: 3,
        title: 'Организация питания',
        items: ['Оператор по производству', 'Кондитер', 'Повар'],
        icon: 'food.svg'
    },
    {
        id: 4,
        title: 'Учет и аудит',
        items: ['Бухгалтер'],
        icon: 'accounting.svg'
    }
];

// загрузка специальностей — тут можно будет добавить fetch к апи
function loadSpecialties() {
    console.log('Специальности загружены:', specialtiesData);
    // тут можно будет добавить fetch к апи
}


// активная ссылка в навигации
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav a');

    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').includes(current)) {
            link.classList.add('active');
        }
    });
});


// кнопка наверх
function createScrollToTopButton() {
    const button = document.createElement('button');
    button.className = 'scroll-to-top';
    button.innerHTML = '↑';
    button.setAttribute('aria-label', 'Наверх');
    document.body.appendChild(button);

    // показываем после 500px скролла
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            button.classList.add('visible');
        } else {
            button.classList.remove('visible');
        }
    });

    // клик — плавно наверх
    button.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

createScrollToTopButton();


// инициализация при загрузке страницы
document.addEventListener('DOMContentLoaded', () => {
    console.log('Сайт АЭК загружен успешно!');
    loadSpecialties();

    // добавляем loaded для анимаций
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);
});


// вспомогательные функции

// дебаунс чтобы не перегружать скролл
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// проверяем виден ли элемент на экране
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top >= 0 &&
        rect.left >= 0 &&
        rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
}

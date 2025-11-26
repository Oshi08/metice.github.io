document.addEventListener('DOMContentLoaded', function () {
    const mainImage = document.getElementById('main-image');
    const thumbnails = document.querySelectorAll('.thumb-img');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const galleryContainer = document.querySelector('.work-gallery');

    if (!mainImage || thumbnails.length === 0 || !prevBtn || !nextBtn) {
        return;
    }

    const imageSources = Array.from(thumbnails).map(thumb => thumb.src);
    let currentIndex = 0;
    let slideInterval;
    const SLIDESHOW_DELAY = 3000;

    function stopSlideshow() {
        clearInterval(slideInterval);
    }

    function startSlideshow() {
        stopSlideshow();
        slideInterval = setInterval(() => {
            const nextIndex = (currentIndex + 1) % imageSources.length;
            updateGallery(nextIndex);
        }, SLIDESHOW_DELAY);
    }

    function updateGallery(index) {
        if (index === currentIndex) return;

        mainImage.style.opacity = '0';

        setTimeout(() => {
            mainImage.src = imageSources[index];
            mainImage.style.opacity = '1';

            if (thumbnails[currentIndex]) {
                thumbnails[currentIndex].classList.remove('active');
            }
            thumbnails[index].classList.add('active');

            currentIndex = index;
        }, 300);
    }

    thumbnails.forEach((thumbnail, index) => {
        thumbnail.addEventListener('click', () => {
            stopSlideshow();
            updateGallery(index);
            startSlideshow();
        });
    });

    prevBtn.addEventListener('click', () => {
        const newIndex = (currentIndex - 1 + imageSources.length) % imageSources.length;
        stopSlideshow();
        updateGallery(newIndex);
        startSlideshow();
    });

    nextBtn.addEventListener('click', () => {
        const newIndex = (currentIndex + 1) % imageSources.length;
        stopSlideshow();
        updateGallery(newIndex);
        startSlideshow();
    });

    if (galleryContainer) {
        galleryContainer.addEventListener('mouseenter', stopSlideshow);
        galleryContainer.addEventListener('mouseleave', startSlideshow);
    }

    updateGallery(0);
    startSlideshow();

    const heroTitle = document.querySelector('.hero-text h1');
    if (heroTitle) {
        const originalText = "Ten ahora tú | oportunidad | de crecer";
        heroTitle.innerHTML = '';
        const lines = originalText.split(' | ');
        let charIndex = 0;

        lines.forEach((line, lineIndex) => {
            const words = line.split(' ');

            words.forEach((word, wordIndex) => {
                const wordWrapper = document.createElement('span');
                wordWrapper.className = 'title-word-wrapper';

                word.split('').forEach(char => {
                    const charSpan = document.createElement('span');
                    charSpan.className = 'title-char';
                    charSpan.textContent = char;
                    charSpan.style.animationDelay = `${charIndex * 0.04}s`;
                    wordWrapper.appendChild(charSpan);
                    charIndex++;
                });

                heroTitle.appendChild(wordWrapper);

                if (wordIndex < words.length - 1) {
                    heroTitle.appendChild(document.createTextNode(' '));
                }
            });

            if (lineIndex < lines.length - 1) {
                heroTitle.appendChild(document.createElement('br'));
            }
        });
    }

    const video = document.getElementById('promo-video');

    if (video) {
        const observerOptions = {
            root: null,
            rootMargin: '0px',
            threshold: 0.5
        };

        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.play().catch(() => {});
                } else {
                    entry.target.pause();
                }
            });
        }, observerOptions);

        videoObserver.observe(video);
    }

    const themeToggleButton = document.getElementById('theme-toggle-button');
    if (themeToggleButton) {
        const themes = ['default', 'theme-ice', 'theme-sunset', 'theme-forest', 'theme-synthwave'];
        let currentThemeIndex = 0;

        function applyTheme(theme) {
            document.body.className = document.body.className.replace(/\btheme-\S+/g, '').trim();

            if (theme && theme !== 'default') {
                document.body.classList.add(theme);
            }
            localStorage.setItem('theme', theme);
        }

        const savedTheme = localStorage.getItem('theme');
        if (savedTheme && themes.includes(savedTheme)) {
            applyTheme(savedTheme);
            currentThemeIndex = themes.indexOf(savedTheme);
        }

        themeToggleButton.addEventListener('click', function() {
            currentThemeIndex = (currentThemeIndex + 1) % themes.length;
            applyTheme(themes[currentThemeIndex]);
        });
    }

    const navToggle = document.querySelector('.nav-toggle');
    const mainMenu = document.querySelector('.Menu-Navegacion');

    if (navToggle && mainMenu) {
        navToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            mainMenu.classList.toggle('open');
            navToggle.setAttribute('aria-expanded', mainMenu.classList.contains('open'));
        });

        document.addEventListener('click', function() {
            mainMenu.classList.remove('open');
            navToggle.setAttribute('aria-expanded', 'false');
        });
    }
});
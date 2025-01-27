document.addEventListener('DOMContentLoaded', function() {
    // Aktif sayfa kontrolü (basitleştirilmiş versiyon)
    const currentPage = window.location.pathname.split('/').pop();
    document.querySelectorAll('.menu li a').forEach(link => {
        if(link.getAttribute('href') === currentPage) {
            link.classList.add('active');
        }
    });

    // Hamburger menü ve menu elementi
    const hamburgerMenu = document.getElementById('hamburgermenu');
    const menu = document.querySelector('.menubar ul.menu');
    
    // Hamburger menü click olayları
    if(hamburgerMenu) {
        hamburgerMenu.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            menu.classList.toggle('active');
        });
        
        document.addEventListener('click', function(e) {
            const isMenuClicked = menu.contains(e.target);
            const isHamburgerClicked = hamburgerMenu.contains(e.target);
            
            if(!isMenuClicked && !isHamburgerClicked && menu.classList.contains('active')) {
                hamburgerMenu.classList.remove('active');
                menu.classList.remove('active');
            }
        });
    }

    // Dil değiştirme fonksiyonu
    const languageSwitcher = document.querySelectorAll('.dilbutonu a');
    languageSwitcher.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('href');
            document.documentElement.lang = lang;
            languageSwitcher.forEach(l => l.classList.remove('aktif'));
            this.classList.add('aktif');
        });
    });

    // Güncellenmiş Lightbox kodu
    document.querySelectorAll('.image-wrapper img').forEach(img => {
        img.addEventListener('click', function() {
            const lightbox = document.createElement('div');
            lightbox.className = 'lightbox';
            lightbox.innerHTML = `
                <div class="lightbox-content">
                    <div class="lightbox-header">
                        <button class="close-btn">×</button>
                    </div>
                    <img src="${this.src}" alt="${this.alt}" class="lightbox-img">
                    <div class="lightbox-controls">
                        <button class="zoom-in">+</button>
                        <button class="zoom-out">-</button>
                    </div>
                    <div class="lightbox-caption">${this.alt}</div>
                </div>
            `;
            
            document.body.appendChild(lightbox);
            document.documentElement.classList.add('blur-active');

            // Zoom fonksiyonları
            let scale = 1;
            const lightboxImg = lightbox.querySelector('.lightbox-img');
            
            lightbox.querySelector('.zoom-in').addEventListener('click', (e) => {
                e.stopPropagation();
                scale *= 1.2;
                lightboxImg.style.transform = `scale(${scale})`;
            });

            lightbox.querySelector('.zoom-out').addEventListener('click', (e) => {
                e.stopPropagation();
                scale *= 0.8;
                lightboxImg.style.transform = `scale(${scale})`;
            });

            // Kapatma fonksiyonu
            const closeLightbox = () => {
                lightbox.remove();
                document.documentElement.classList.remove('blur-active');
            };

            lightbox.querySelector('.close-btn').addEventListener('click', (e) => {
                e.stopPropagation();
                closeLightbox();
            });

            lightbox.addEventListener('click', (e) => {
                if(e.target === lightbox) {
                    closeLightbox();
                }
            });
        });
    });

    // Dil değiştirme sistemi
    document.querySelectorAll('.dilbutonu a').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const lang = this.getAttribute('href');
            document.documentElement.lang = lang;
            
            // Tüm dil içeriklerini güncelle
            document.querySelectorAll('[data-tr], [data-en]').forEach(element => {
                const text = lang === 'tr' ? element.dataset.tr : element.dataset.en;
                if(element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                    element.placeholder = text;
                } else {
                    element.textContent = text;
                }
            });
        });
    });

    // Sayfa yükleme animasyonu
    // Sayfa geçiş elementi oluştur
    const transition = document.createElement('div');
    transition.className = 'page-transition';
    document.body.appendChild(transition);

    // Sayfa yüklendiğinde animasyonu başlat
    setTimeout(() => {
        document.body.classList.add('loaded');
    }, 100);

    // Sayfa geçişlerini yönet
    document.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href && href.endsWith('.html')) {
                e.preventDefault();
                transition.classList.add('active');
                
                setTimeout(() => {
                    window.location.href = href;
                }, 800);
            }
        });
    });
});


document.querySelector('.form-ac').addEventListener('click', function() {
    var formPopup = document.querySelector('.form-popup');
    formPopup.classList.toggle('active');
});

document.querySelector('.form-popup').addEventListener('click', function(e) {
    if (e.target === this) {  // Eğer formun dışına tıklanırsa formu kapat
        this.classList.remove('active');
        document.querySelector('.form-ac').style.display = 'inline-block';  // Butonu tekrar görünür yap
    }
});
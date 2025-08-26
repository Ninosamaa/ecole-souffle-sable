// École du Souffle du Sable - Scripts d'interactivité avec intégration Demon Slayer

document.addEventListener('DOMContentLoaded', function() {
    // Éléments du DOM
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section, .hero-section');
    const heroSection = document.querySelector('.hero-section');
    const heroParallax = document.querySelector('.hero-parallax');
    const techniqueCards = document.querySelectorAll('.technique-card');
    const formationCards = document.querySelectorAll('.formation-card');
    
    // Navigation fluide avec correction des bugs
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Récupération correcte de la section cible
            const targetId = this.getAttribute('href').substring(1); // Enlever le #
            let targetSection = document.getElementById(targetId);
            
            // Gestion spéciale pour certains liens
            if (targetId === 'accueil') {
                targetSection = heroSection;
            }
            
            console.log('Navigation vers:', targetId, targetSection); // Debug
            
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Mise à jour immédiate du lien actif
                navLinks.forEach(l => l.classList.remove('active'));
                this.classList.add('active');
                
                // Effet de vague de sable sur le clic
                createSandWave(this, e);
            } else {
                console.error('Section non trouvée:', targetId);
            }
        });
    });
    
    // Mise en surbrillance du lien actif avec correction
    function updateActiveNavLink() {
        const scrollPosition = window.scrollY + 100;
        
        // Vérifier si on est dans la section héro
        if (scrollPosition < heroSection.offsetHeight) {
            navLinks.forEach(link => link.classList.remove('active'));
            const accueilLink = document.querySelector('a[href="#accueil"]');
            if (accueilLink) accueilLink.classList.add('active');
            return;
        }
        
        // Parcourir toutes les sections
        let activeSection = null;
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPosition >= sectionTop - 50 && scrollPosition < sectionTop + sectionHeight - 50) {
                activeSection = sectionId;
            }
        });
        
        if (activeSection) {
            navLinks.forEach(link => link.classList.remove('active'));
            const activeLink = document.querySelector(`a[href="#${activeSection}"]`);
            if (activeLink) {
                activeLink.classList.add('active');
            }
        }
    }
    
    // Effet parallaxe pour les images de fond
    function updateParallaxEffect() {
        const scrolled = window.pageYOffset;
        
        // Parallaxe pour le héro
        if (heroParallax && scrolled < heroSection.offsetHeight) {
            const rate = scrolled * -0.3;
            heroParallax.style.transform = `translateY(${rate}px) scale(1.1)`;
        }
        
        // Parallaxe pour les particules de sable
        const sandParticles = document.querySelector('.sand-particles');
        if (sandParticles && scrolled < heroSection.offsetHeight) {
            const rate = scrolled * -0.5;
            sandParticles.style.transform = `translateY(${rate}px)`;
        }
        
        // Effet de parallaxe sur les backgrounds des sections
        const techniquesBanner = document.querySelector('.techniques-banner');
        const formationBackground = document.querySelector('.formation-background');
        
        if (techniquesBanner) {
            const techniquesSection = document.querySelector('.techniques-section');
            const rect = techniquesSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const rate = (window.innerHeight - rect.top) * 0.1;
                techniquesBanner.style.transform = `translateY(${rate}px)`;
            }
        }
        
        if (formationBackground) {
            const formationSection = document.querySelector('.formation-section');
            const rect = formationSection.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                const rate = (window.innerHeight - rect.top) * 0.05;
                formationBackground.style.transform = `translateY(${rate}px)`;
            }
        }
    }
    
    // Animation d'apparition au scroll
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                
                // Animations spéciales pour certaines sections
                if (entry.target.classList.contains('techniques-section')) {
                    animateTechniques();
                } else if (entry.target.classList.contains('formation-section')) {
                    animateFormation();
                } else if (entry.target.classList.contains('hierarchie-section')) {
                    animateHierarchie();
                }
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    sections.forEach(section => observer.observe(section));
    
    // Animation des techniques avec effets Demon Slayer
    function animateTechniques() {
        techniqueCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateY(50px) scale(0.9)';
                card.style.transition = 'all 0.6s cubic-bezier(0.34, 1.56, 0.64, 1)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateY(0) scale(1)';
                    
                    // Effet spécial pour la technique secrète
                    if (card.classList.contains('technique-secret')) {
                        createSecretTechniqueEffect(card);
                    }
                }, 100);
            }, index * 150);
        });
    }
    
    // Animation de la formation
    function animateFormation() {
        formationCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'translateX(-50px) rotateY(-15deg)';
                card.style.transition = 'all 0.8s cubic-bezier(0.23, 1, 0.32, 1)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'translateX(0) rotateY(0)';
                }, 100);
            }, index * 200);
        });
    }
    
    // Animation de la hiérarchie
    function animateHierarchie() {
        const hierarchieCards = document.querySelectorAll('.hierarchie-card');
        hierarchieCards.forEach((card, index) => {
            setTimeout(() => {
                card.style.opacity = '0';
                card.style.transform = 'scale(0.8) rotate(-2deg)';
                card.style.transition = 'all 0.7s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
                
                setTimeout(() => {
                    card.style.opacity = '1';
                    card.style.transform = 'scale(1) rotate(0)';
                }, 100);
            }, index * 100);
        });
    }
    
    // Effet spécial pour la technique secrète
    function createSecretTechniqueEffect(card) {
        const effectsCount = 8;
        for (let i = 0; i < effectsCount; i++) {
            setTimeout(() => {
                const effect = document.createElement('div');
                effect.className = 'secret-effect';
                effect.style.position = 'absolute';
                effect.style.width = '4px';
                effect.style.height = '4px';
                effect.style.background = i % 2 === 0 ? '#c63434' : '#8e44ad';
                effect.style.borderRadius = '50%';
                effect.style.pointerEvents = 'none';
                effect.style.zIndex = '10';
                
                const rect = card.getBoundingClientRect();
                effect.style.left = (rect.left + Math.random() * rect.width) + 'px';
                effect.style.top = (rect.top + Math.random() * rect.height) + 'px';
                
                document.body.appendChild(effect);
                
                let opacity = 1;
                let scale = 1;
                const animate = () => {
                    opacity -= 0.02;
                    scale += 0.05;
                    effect.style.opacity = opacity;
                    effect.style.transform = `scale(${scale})`;
                    
                    if (opacity > 0) {
                        requestAnimationFrame(animate);
                    } else {
                        effect.remove();
                    }
                };
                requestAnimationFrame(animate);
            }, i * 50);
        }
    }
    
    // Effet de vague de sable
    function createSandWave(element, event) {
        const wave = document.createElement('span');
        const rect = element.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        
        wave.style.width = wave.style.height = size + 'px';
        wave.style.left = (event.clientX - rect.left - size / 2) + 'px';
        wave.style.top = (event.clientY - rect.top - size / 2) + 'px';
        wave.style.position = 'absolute';
        wave.style.borderRadius = '50%';
        wave.style.background = 'rgba(201, 169, 97, 0.3)';
        wave.style.transform = 'scale(0)';
        wave.style.animation = 'sandWave 0.6s ease-out';
        wave.style.pointerEvents = 'none';
        
        element.style.position = 'relative';
        element.style.overflow = 'hidden';
        element.appendChild(wave);
        
        setTimeout(() => wave.remove(), 600);
    }
    
    // Création de particules de sable interactives
    function createSandParticle(x, y, color = '#c9a961') {
        const particle = document.createElement('div');
        particle.style.position = 'fixed';
        particle.style.left = x + 'px';
        particle.style.top = y + 'px';
        particle.style.width = Math.random() * 4 + 2 + 'px';
        particle.style.height = particle.style.width;
        particle.style.backgroundColor = color;
        particle.style.borderRadius = '50%';
        particle.style.pointerEvents = 'none';
        particle.style.zIndex = '999';
        particle.style.opacity = '0.8';
        particle.style.boxShadow = `0 0 6px ${color}`;
        
        document.body.appendChild(particle);
        
        let fallSpeed = Math.random() * 3 + 2;
        let horizontalDrift = (Math.random() - 0.5) * 3;
        let rotation = 0;
        
        function animateParticle() {
            const rect = particle.getBoundingClientRect();
            rotation += 5;
            particle.style.top = (rect.top + fallSpeed) + 'px';
            particle.style.left = (rect.left + horizontalDrift) + 'px';
            particle.style.transform = `rotate(${rotation}deg)`;
            particle.style.opacity = parseFloat(particle.style.opacity) - 0.01;
            
            if (rect.top < window.innerHeight && parseFloat(particle.style.opacity) > 0) {
                requestAnimationFrame(animateParticle);
            } else {
                particle.remove();
            }
        }
        
        requestAnimationFrame(animateParticle);
    }
    
    // Effets au survol des cartes de technique
    techniqueCards.forEach(card => {
        card.addEventListener('mouseenter', function(e) {
            const rect = this.getBoundingClientRect();
            const niveau = this.getAttribute('data-niveau');
            let particleColor = '#c9a961';
            
            // Couleurs spéciales selon le niveau
            switch(niveau) {
                case 'débutant': particleColor = '#4a7c59'; break;
                case 'intermédiaire': particleColor = '#d97742'; break;
                case 'avancé': particleColor = '#c9a961'; break;
                case 'secret': particleColor = '#c63434'; break;
            }
            
            for (let i = 0; i < 8; i++) {
                setTimeout(() => {
                    createSandParticle(
                        rect.left + Math.random() * rect.width,
                        rect.top,
                        particleColor
                    );
                }, i * 50);
            }
            
            // Effet spécial pour la technique secrète
            if (this.classList.contains('technique-secret')) {
                this.style.boxShadow = '0 0 30px rgba(198, 52, 52, 0.4), 0 0 60px rgba(142, 68, 173, 0.2)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            if (this.classList.contains('technique-secret')) {
                this.style.boxShadow = '';
            }
        });
    });
    
    // Effets au survol des valeurs
    const valeurItems = document.querySelectorAll('.valeur-item');
    valeurItems.forEach(item => {
        item.addEventListener('mouseenter', function() {
            const rect = this.getBoundingClientRect();
            for (let i = 0; i < 3; i++) {
                setTimeout(() => {
                    createSandParticle(
                        rect.left + rect.width / 2 + (Math.random() - 0.5) * rect.width,
                        rect.top,
                        '#c9a961'
                    );
                }, i * 100);
            }
        });
    });
    
    // Gestion du scroll avec optimisation
    let ticking = false;
    
    function onScroll() {
        if (!ticking) {
            requestAnimationFrame(() => {
                updateActiveNavLink();
                updateParallaxEffect();
                ticking = false;
            });
            ticking = true;
        }
    }
    
    window.addEventListener('scroll', onScroll);
    
    // Effet de typing pour le titre
    function typeWriter(element, text, speed = 100) {
        let i = 0;
        element.textContent = '';
        
        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, speed);
            }
        }
        type();
    }
    
    // Animation du titre héro avec effet Demon Slayer
    const heroTitle = document.querySelector('.hero-title');
    const heroSubtitle = document.querySelector('.hero-subtitle');
    
    if (heroTitle && heroSubtitle) {
        const originalTitle = heroTitle.textContent;
        const originalSubtitle = heroSubtitle.textContent;
        
        setTimeout(() => {
            typeWriter(heroTitle, originalTitle, 120);
            setTimeout(() => {
                typeWriter(heroSubtitle, originalSubtitle, 80);
                
                // Effet de particules après l'animation
                setTimeout(() => {
                    const titleRect = heroTitle.getBoundingClientRect();
                    for (let i = 0; i < 15; i++) {
                        setTimeout(() => {
                            createSandParticle(
                                titleRect.left + Math.random() * titleRect.width,
                                titleRect.bottom,
                                i % 3 === 0 ? '#c63434' : '#c9a961'
                            );
                        }, i * 100);
                    }
                }, 500);
            }, originalTitle.length * 120 + 500);
        }, 1000);
    }
    
    // Création d'effets ambiants
    function createAmbientEffects() {
        setInterval(() => {
            // Particules ambiantes dans le héro
            if (window.scrollY < heroSection.offsetHeight) {
                const heroRect = heroSection.getBoundingClientRect();
                if (heroRect.top < window.innerHeight && heroRect.bottom > 0) {
                    createSandParticle(
                        Math.random() * window.innerWidth,
                        -10,
                        'rgba(201, 169, 97, 0.6)'
                    );
                }
            }
        }, 2000);
    }
    
    // Démarrer les effets ambiants
    setTimeout(createAmbientEffects, 3000);
    
    // Ajouter les animations CSS dynamiquement
    const style = document.createElement('style');
    style.textContent = `
        @keyframes sandWave {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        @keyframes demonSlayerGlow {
            0%, 100% { 
                filter: drop-shadow(0 0 5px rgba(198, 52, 52, 0.3)); 
            }
            50% { 
                filter: drop-shadow(0 0 15px rgba(142, 68, 173, 0.6)); 
            }
        }
        
        .technique-secret:hover {
            animation: demonSlayerGlow 1s ease-in-out infinite;
        }
        
        .secret-effect {
            animation: secretParticle 2s ease-out forwards;
        }
        
        @keyframes secretParticle {
            0% {
                transform: scale(1) rotate(0deg);
                opacity: 1;
            }
            100% {
                transform: scale(3) rotate(360deg);
                opacity: 0;
            }
        }
        
        .formation-elite:hover {
            animation: eliteShimmer 1.5s ease-in-out infinite;
        }
        
        @keyframes eliteShimmer {
            0%, 100% { 
                box-shadow: 0 0 20px rgba(198, 52, 52, 0.3); 
            }
            50% { 
                box-shadow: 0 0 40px rgba(142, 68, 173, 0.5); 
            }
        }
    `;
    document.head.appendChild(style);
    
    // Fonction de débogage pour la navigation
    function debugNavigation() {
        console.log('Sections trouvées:');
        sections.forEach(section => {
            console.log(`- ${section.id}: ${section.offsetTop}px`);
        });
        
        console.log('Liens de navigation:');
        navLinks.forEach(link => {
            console.log(`- ${link.getAttribute('href')}: ${link.textContent}`);
        });
    }
    
    // Gestion du redimensionnement
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(updateActiveNavLink, 250);
    });
    
    // Initialisation
    updateActiveNavLink();
    
    // Appeler le debug en mode développement
    if (window.location.hostname === 'localhost') {
        debugNavigation();
    }
    
    // Effet de révélation progressive au chargement
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 1s ease-in-out';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
    
    // Debug et statistiques
    console.log('🏜️ École du Souffle du Sable - Système initialisé');
    console.log('⚔️ Intégration Demon Slayer active');
    console.log('🌪️ Effets de particules de sable activés');
    console.log('✨ Animations des techniques prêtes');
    console.log('🔧 Navigation corrigée et fonctionnelle');
});
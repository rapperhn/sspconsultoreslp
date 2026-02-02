document.addEventListener('DOMContentLoaded', () => {
    // Navbar scroll effect
    const navbar = document.getElementById('navbar');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });


    // Mobile Menu Toggle
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
                // Close mobile menu on click
                navLinks.classList.remove('active');
            }
        });
    });

    // Language Switching Logic
    const langSelector = document.getElementById('lang-selector');

    langSelector.addEventListener('change', (e) => {
        const lang = e.target.value;
        updateContent(lang);
    });

    // Dark Mode Logic
    const themeToggle = document.getElementById('theme-toggle');
    const icon = themeToggle.querySelector('.icon');
    const body = document.body;

    // Check saved preference
    if (localStorage.getItem('theme') === 'dark') {
        body.classList.add('dark-mode');
        icon.textContent = '☀️'; // Switch to sun icon if dark mode is active
    }

    themeToggle.addEventListener('click', () => {
        body.classList.toggle('dark-mode');

        if (body.classList.contains('dark-mode')) {
            icon.textContent = '☀️';
            localStorage.setItem('theme', 'dark');
        } else {
            icon.textContent = '🌙';
            localStorage.setItem('theme', 'light');
        }
    });

    function updateContent(lang) {
        document.querySelectorAll('[data-i18n]').forEach(element => {
            const key = element.getAttribute('data-i18n');
            const translation = getNestedTranslation(translations[lang], key);

            if (translation) {
                if (key.startsWith('[placeholder]')) {
                    element.placeholder = translation;
                } else {
                    element.textContent = translation;
                }
            }
        });
    }

    function getNestedTranslation(obj, key) {
        // Handle attribute keys if present (e.g., [placeholder]cta.placeholder)
        const cleanKey = key.startsWith('[') ? key.split(']')[1] : key;
        return cleanKey.split('.').reduce((o, i) => (o ? o[i] : null), obj);
    }

    const translations = {
        en: {
            meta: {
                title: "VFC Travel Insurance | Premium TAS & PAX Coverage"
            },
            nav: {
                tas: "Assistance (TAS)",
                pax: "Passenger (PAX)",
                cta: "Get Covered"
            },
            hero: {
                title: "Travel Without Compromise",
                subtitle: "Premium protection for your journey. Expert medical assistance and comprehensive passenger coverage, redefined.",
                btn_tas: "Assistance (TAS)",
                btn_pax: "Passenger (PAX)"
            },
            tas: {
                overline: "Travel Assistance Services",
                title: "Global Medical Safety Net",
                subtitle: "Wherever you go, our medical experts are one call away. 24/7/365.",
                card1: { title: "Medical Repatriation", desc: "Seamless transport to the best facilities or back home if fully medically necessary." },
                card2: { title: "Telemedicine Access", desc: "Instant video consultations with certified doctors in your language." },
                card3: { title: "Crisis Management", desc: "Expert handling of complex emergencies and hospitalization coordination." }
            },
            pax: {
                overline: "Passenger Insurance",
                title: "Seamless Journey Protection",
                subtitle: "Delays happen. Losses happen. We ensure they don't stop you.",
                item1: { title: "Flight Cancellation & Delays", desc: "Instant compensation for severe delays and covered cancellations." },
                item2: { title: "Baggage Protection", desc: "Coverage for lost, stolen, or delayed luggage so you can shop for essentials." },
                item3: { title: "Personal Liability", desc: "Protection against accidental damage to third parties or property." }
            },
            cta: {
                title: "Ready to Upgrade Your Travel?",
                subtitle: "Join thousands of travelers who trust VFC for their safety and peace of mind.",
                placeholder: "Enter your email address",
                btn: "Start Protection"
            },
            partners: {
                title: "Strategic Alliance",
                subtitle: "VFC is the official partner of TAS and PAX, specialized leaders in their fields.",
                tas_desc: "TAS provides world-class medical assistance infrastructure with a global network of providers.",
                pax_desc: "PAX offers underwriting excellence and instant claims processing for passenger inconveniences.",
                benefit: "Together, we deliver the fastest response times and most comprehensive coverage in the market.",
                cta: "Travel with Confidence"
            },
            footer: {
                tagline: "Redefining travel insurance standards.",
                products: "Products",
                company: "Company",
                about: "About Us",
                contact: "Contact",
                terms: "Terms",
                legal: "Legal",
                credit: "Technological Ally: Teltec Honduras"
            }
        },
        es: {
            meta: {
                title: "Seguro de Viaje VFC | Cobertura Premium TAS & PAX"
            },
            nav: {
                tas: "Asistencia (TAS)",
                pax: "Pasajero (PAX)",
                cta: "Contratar"
            },
            hero: {
                title: "Viaja Sin Compromisos",
                subtitle: "Protección premium para su viaje. Asistencia médica experta y cobertura integral de pasajeros, redefinida.",
                btn_tas: "Asistencia (TAS)",
                btn_pax: "Pasajero (PAX)"
            },
            tas: {
                overline: "Servicios de Asistencia en Viaje",
                title: "Red de Seguridad Médica Global",
                subtitle: "Donde quiera que vaya, nuestros expertos médicos están a una llamada de distancia. 24/7/365.",
                card1: { title: "Repatriación Médica", desc: "Transporte sin problemas a las mejores instalaciones o de regreso a casa si es médicamente necesario." },
                card2: { title: "Acceso a Telemedicina", desc: "Consultas de video instantáneas con médicos certificados en su idioma." },
                card3: { title: "Gestión de Crisis", desc: "Manejo experto de emergencias complejas y coordinación de hospitalización." }
            },
            pax: {
                overline: "Seguro de Pasajeros",
                title: "Protección de Viaje Sin Interrupciones",
                subtitle: "Los retrasos ocurren. Las pérdidas ocurren. Nos aseguramos de que no te detengan.",
                item1: { title: "Cancelación y Retrasos de Vuelo", desc: "Compensación instantánea por retrasos severos y cancelaciones cubiertas." },
                item2: { title: "Protección de Equipaje", desc: "Cobertura por equipaje perdido o robado para que pueda comprar artículos esenciales." },
                item3: { title: "Responsabilidad Civil", desc: "Protección contra daños accidentales a terceros o propiedades." }
            },
            cta: {
                title: "¿Listo para mejorar su viaje?",
                subtitle: "Únase a miles de viajeros que confían en VFC para su seguridad y tranquilidad.",
                placeholder: "Ingrese su correo electrónico",
                btn: "Iniciar Protección"
            },
            partners: {
                title: "Alianza Estratégica",
                subtitle: "VFC es socio oficial de TAS y PAX, líderes especializados en sus campos.",
                tas_desc: "TAS proporciona infraestructura de asistencia médica de clase mundial con una red global de proveedores.",
                pax_desc: "PAX ofrece excelencia en suscripción y procesamiento instantáneo de reclamos para inconvenientes de pasajeros.",
                benefit: "Juntos, ofrecemos los tiempos de respuesta más rápidos y la cobertura más completa del mercado.",
                cta: "Viaja con Confianza"
            },
            footer: {
                tagline: "Redefiniendo los estándares de seguros de viaje.",
                products: "Productos",
                company: "Compañía",
                about: "Nosotros",
                contact: "Contacto",
                terms: "Términos",
                legal: "Legal",
                credit: "Aliado Tecnológico: Teltec Honduras"
            }
        },
        zh: {
            meta: {
                title: "VFC 旅行保险 | 优质 TAS & PAX 保障"
            },
            nav: {
                tas: "援助服务 (TAS)",
                pax: "乘客保险 (PAX)",
                cta: "立即投保"
            },
            hero: {
                title: "无忧无虑的旅行",
                subtitle: "为您的旅程提供优质保障。重新定义专业的医疗援助和全面的乘客保险。",
                btn_tas: "援助服务 (TAS)",
                btn_pax: "乘客保险 (PAX)"
            },
            tas: {
                overline: "旅行援助服务",
                title: "全球医疗安全网",
                subtitle: "无论您身在何处，只需一个电话即可联系到我们的医疗专家。全年无休。",
                card1: { title: "医疗转运", desc: "如有医疗必要，无缝转运至最佳医疗机构或护送回国。" },
                card2: { title: "远程医疗", desc: "与认证医生进行即时视频咨询，支持您的语言。" },
                card3: { title: "危机管理", desc: "专业处理复杂的紧急情况和住院协调。" }
            },
            pax: {
                overline: "乘客保险",
                title: "全程无忧保障",
                subtitle: "延误会发生，损失会发生。我们确保这些不会阻碍您的行程。",
                item1: { title: "航班取消与延误", desc: "针对严重延误和承保范围内的取消提供即时赔偿。" },
                item2: { title: "行李保障", desc: "承保行李丢失、被盗或延误，以便您购买必需品。" },
                item3: { title: "个人责任", desc: "保障针对第三方或财产的意外损害。" }
            },
            cta: {
                title: "准备好升级您的旅行体验了吗？",
                subtitle: "加入成千上万信任 VFC 的旅客，享受安全与安心。",
                placeholder: "输入您的电子邮件地址",
                btn: "开始保障"
            },
            partners: {
                title: "战略联盟",
                subtitle: "VFC 是 TAS 和 PAX 的官方合作伙伴，它们是各自领域的专业领导者。",
                tas_desc: "TAS 提供世界级的医疗援助基础设施和全球供应商网络。",
                pax_desc: "PAX 为乘客的不便提供卓越的承保和即时索赔处理。",
                benefit: "我们将共同提供市场上最快的响应速度和最全面的保障。",
                cta: "充满信心地旅行"
            },
            footer: {
                tagline: "重新定义旅行保险标准。",
                products: "产品",
                company: "公司",
                about: "关于我们",
                contact: "联系方式",
                terms: "条款",
                legal: "法律信息",
                credit: "技术合作伙伴：Teltec Honduras"
            }
        },
        fr: {
            meta: {
                title: "Assurance Voyage VFC | Couverture Premium TAS & PAX"
            },
            nav: {
                tas: "Assistance (TAS)",
                pax: "Passager (PAX)",
                cta: "Souscrire"
            },
            hero: {
                title: "Voyagez Sans Compromis",
                subtitle: "Protection premium pour votre voyage. Assistance médicale experte et couverture complète des passagers.",
                btn_tas: "Assistance (TAS)",
                btn_pax: "Passager (PAX)"
            },
            tas: {
                overline: "Services d'Assistance Voyage",
                title: "Filet de Sécurité Médical Global",
                subtitle: "Où que vous alliez, nos experts médicaux sont à un appel. 24/7/365.",
                card1: { title: "Rapatriement Médical", desc: "Transport sans couture vers les meilleures installations ou retour à domicile." },
                card2: { title: "Accès Télémédecine", desc: "Consultations vidéo instantanées avec des médecins certifiés dans votre langue." },
                card3: { title: "Gestion de Crise", desc: "Gestion experte des urgences complexes et coordination d'hospitalisation." }
            },
            pax: {
                overline: "Assurance Passager",
                title: "Protection de Voyage Transparente",
                subtitle: "Les retards arrivent. Les pertes arrivent. Nous nous assurons qu'ils ne vous arrêtent pas.",
                item1: { title: "Annulation et Retards de Vol", desc: "Indemnisation instantanée pour les retards graves et annulations couvertes." },
                item2: { title: "Protection des Bagages", desc: "Couverture pour bagages perdus ou volés pour acheter des articles essentiels." },
                item3: { title: "Responsabilité Civile", desc: "Protection contre les dommages accidentels aux tiers ou aux biens." }
            },
            cta: {
                title: "Prêt à surclasser votre voyage ?",
                subtitle: "Rejoignez des milliers de voyageurs qui font confiance à VFC.",
                placeholder: "Entrez votre email",
                btn: "Commencer la protection"
            },
            partners: {
                title: "Alliance Stratégique",
                subtitle: "VFC est le partenaire officiel de TAS et PAX, leaders spécialisés dans leurs domaines.",
                tas_desc: "TAS fournit une infrastructure d'assistance médicale de classe mondiale avec un réseau mondial de prestataires.",
                pax_desc: "PAX offre une excellence en souscription et un traitement instantané des réclamations pour les désagréments des passagers.",
                benefit: "Ensemble, nous offrons les temps de réponse les plus rapides et la couverture la plus complète du marché.",
                cta: "Voyagez en toute confiance"
            },
            footer: {
                tagline: "Redéfinir les normes d'assurance voyage.",
                products: "Produits",
                company: "Entreprise",
                about: "À propos",
                contact: "Contact",
                terms: "Conditions",
                legal: "Légal",
                credit: "Allié Technologique : Teltec Honduras"
            }
        },
        de: {
            meta: {
                title: "VFC Reiseversicherung | Premium TAS & PAX Deckung"
            },
            nav: {
                tas: "Assistenz (TAS)",
                pax: "Passagier (PAX)",
                cta: "Versichern"
            },
            hero: {
                title: "Reisen Ohne Kompromisse",
                subtitle: "Premium-Schutz für Ihre Reise. Experten-medizinische Assistenz und umfassende Passagierdeckung.",
                btn_tas: "Assistenz (TAS)",
                btn_pax: "Passagier (PAX)"
            },
            tas: {
                overline: "Reiseassistenzdienste",
                title: "Globales Medizinisches Sicherheitsnetz",
                subtitle: "Wo auch immer Sie hingehen, unsere medizinischen Experten sind einen Anruf entfernt.",
                card1: { title: "Medizinischer Rücktransport", desc: "Nahtloser Transport zu den besten Einrichtungen oder nach Hause." },
                card2: { title: "Telemedizin-Zugang", desc: "Sofortige Video-Beratungen mit zertifizierten Ärzten in Ihrer Sprache." },
                card3: { title: "Krisenmanagement", desc: "Expertenhandhabung komplexer Notfälle und Koordinierung von Krankenhausaufenthalten." }
            },
            pax: {
                overline: "Passagierversicherung",
                title: "Nahtloser Reiseschutz",
                subtitle: "Verspätungen passieren. Verluste passieren. Wir sorgen dafür, dass sie Sie nicht aufhalten.",
                item1: { title: "Flugannullierung & Verspätungen", desc: "Sofortige Entschädigung für schwere Verspätungen und gedeckte Annullierungen." },
                item2: { title: "Gepäckschutz", desc: "Deckung für verlorenes oder gestohlenes Gepäck für das Nötigste." },
                item3: { title: "Privathaftpflicht", desc: "Schutz gegen versehentliche Schäden an Dritten oder Eigentum." }
            },
            cta: {
                title: "Bereit für ein Reise-Upgrade?",
                subtitle: "Schließen Sie sich Tausenden von Reisenden an, die VFC vertrauen.",
                placeholder: "Geben Sie Ihre E-Mail ein",
                btn: "Schutz starten"
            },
            partners: {
                title: "Strategische Allianz",
                subtitle: "VFC ist der offizielle Partner von TAS und PAX, spezialisierte Marktführer in ihren Bereichen.",
                tas_desc: "TAS bietet eine erstklassige medizinische Assistenzinfrastruktur mit einem globalen Netzwerk von Anbietern.",
                pax_desc: "PAX bietet exzellentes Underwriting und sofortige Schadenbearbeitung für Passagierunannehmlichkeiten.",
                benefit: "Gemeinsam liefern wir die schnellsten Reaktionszeiten und die umfassendste Abdeckung auf dem Markt.",
                cta: "Reisen Sie mit Vertrauen"
            },
            footer: {
                tagline: "Neudefinition von Reiseversicherungsstandards.",
                products: "Produkte",
                company: "Unternehmen",
                about: "Über uns",
                contact: "Kontakt",
                terms: "AGB",
                legal: "Rechtliches",
                credit: "Technologiepartner: Teltec Honduras"
            }
        }
    };


    // About Us Popover Logic
    const aboutLink = document.getElementById('about-us-link');

    // Create popover element
    const popover = document.createElement('div');
    popover.className = 'info-popover';
    popover.textContent = 'VF Consultores, Tegucigalpa D.C.';
    document.body.appendChild(popover);

    function showPopover() {
        const rect = aboutLink.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;

        popover.style.top = `${rect.top + scrollTop - popover.offsetHeight - 10}px`;
        popover.style.left = `${rect.left + scrollLeft + (rect.width / 2) - (popover.offsetWidth / 2)}px`;
        popover.classList.add('active');
    }

    function hidePopover() {
        popover.classList.remove('active');
    }

    if (aboutLink) {
        aboutLink.addEventListener('mouseenter', showPopover);
        aboutLink.addEventListener('mouseleave', hidePopover);
        aboutLink.addEventListener('click', (e) => {
            e.preventDefault();
            showPopover();
            // Auto hide after a few seconds if clicked
            setTimeout(hidePopover, 3000);
        });
    }
});

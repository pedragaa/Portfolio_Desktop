document.addEventListener("DOMContentLoaded", function() {
    // Ativação do efeito de fade-in para as seções
    const fadeIns = document.querySelectorAll('.fade-in');

    if ('IntersectionObserver' in window) {
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        fadeIns.forEach(el => observer.observe(el));
    } else {
        fadeIns.forEach(el => el.classList.add('show'));
    }

    // Lógica para o botão "Voltar ao Topo"
    const backToTopBtn = document.getElementById("backToTop");

    window.addEventListener("scroll", function() {
        if (window.pageYOffset > 50) {
            backToTopBtn.classList.add("show");
        } else {
            backToTopBtn.classList.remove("show");
        }
    });

    backToTopBtn.addEventListener("click", function() {
        window.scrollTo({ top: 0, behavior: "smooth" });
    });

    // Destaque do link ativo no menu SEM animação
    const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");

    let currentSection = null;

    const navObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute("id");

                // Se a seção atual for diferente da detectada, troca para a nova
                if (currentSection !== id) {
                    currentSection = id;

                    // Remove "active" de todos os links
                    navLinks.forEach(link => link.classList.remove("active"));

                    // Adiciona "active" ao link correto
                    const activeLink = document.querySelector(`nav ul li a[href="#${id}"]`);
                    if (activeLink) {
                        activeLink.classList.add("active");
                    }
                }
            }
        });
    }, { threshold: 0.6, rootMargin: "-20% 0px -50% 0px" });

    sections.forEach(section => navObserver.observe(section));
});

// landing-page/scripts/animacoes.js

document.addEventListener('DOMContentLoaded', () => {
    // Seleciona todos os elementos que devem ser animados
    const elementsToAnimate = document.querySelectorAll('.animate-on-scroll');

    // Configura o IntersectionObserver
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            // Quando o elemento está (pelo menos) 10% visível
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                
                // Opcional: Para de observar o elemento após a animação
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1 // 10% do item deve estar visível
    });

    // Adiciona cada elemento ao observer
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
});

// Menu hamburguer para telas pequenas


  const btn = document.getElementById("btn-menu");
  const links = document.querySelector(".nav-links");

  btn.onclick = () => {
    links.classList.toggle("ativo");
  };

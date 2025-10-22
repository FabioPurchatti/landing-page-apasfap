document.addEventListener('DOMContentLoaded', () => {
    const links = document.querySelectorAll('.nav_btn');

    links.forEach(link => {
        link.addEventListener('click', (e) => {
            const targetId = link.getAttribute('href');
            if (!targetId || targetId === '#') return;
            const target = document.querySelector(targetId);
            if (!target) return;

            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });

            // Atualiza a hash
            history.pushState(null, '', targetId);
        });
    });
});
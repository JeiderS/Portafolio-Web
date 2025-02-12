document.addEventListener("DOMContentLoaded", () => {
    let lastScrollY = window.scrollY;

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            const el = entry.target;
            const isColumn = el.classList.contains("columns");
            const goingDown = window.scrollY > lastScrollY;
            const isVisible = entry.boundingClientRect.top < window.innerHeight;

            if (isVisible && goingDown) {
                if (isColumn) {
                    const isLeftColumn = [...document.querySelectorAll(".columns")].indexOf(el) % 2 === 0;
                    el.classList.add(isLeftColumn ? "mover-derecha" : "mover-izquierda");
                } else {
                    el.classList.add("mover-arriba");
                }
            }

            if (!isVisible) {
                el.classList.remove("mover-derecha", "mover-izquierda", "mover-arriba");
            }
        });
        lastScrollY = window.scrollY;
    });

    document.querySelectorAll(".animation, .columns").forEach(el => observer.observe(el));

    const btn = document.getElementById('button');

    document.getElementById('form')
        .addEventListener('submit', function(event) {
            event.preventDefault();

            btn.value = 'Enviando...';

            const serviceID = 'default_service';
            const templateID = 'template_6c6tj3a';

            emailjs.sendForm(serviceID, templateID, this)
                .then(() => {
                    btn.value = 'Enviar Mensaje';
                    alert('Mensaje Enviado Exitosamente');
                }, (err) => {
                    btn.value = 'Enviar Mensaje';
                    alert(JSON.stringify(err));
                });
        });
});
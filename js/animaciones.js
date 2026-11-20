
function inicializarAnimaciones() {

    // =====================================
    // 1. BARRA DE PROGRESO DE LECTURA
    // =====================================

    let barra = document.querySelector(".barra-progreso");

    if (!barra) {
        barra = document.createElement("div");
        barra.classList.add("barra-progreso");
        document.body.appendChild(barra);
    }

    function actualizarProgreso() {
        const alturaDocumento =
            document.documentElement.scrollHeight - window.innerHeight;

        const progreso = alturaDocumento > 0
            ? (window.scrollY / alturaDocumento) * 100
            : 0;

        barra.style.width = `${progreso}%`;
    }

    window.addEventListener("scroll", actualizarProgreso, {
        passive: true
    });

    actualizarProgreso();


    // =====================================
    // 2. NAVBAR AL HACER SCROLL
    // =====================================

    const header = document.querySelector(".site-header");

    function actualizarNavbar() {
        if (header) {
            header.classList.toggle(
                "navbar-scroll",
                window.scrollY > 40
            );
        }
    }

    window.addEventListener("scroll", actualizarNavbar, {
        passive: true
    });

    actualizarNavbar();


    // =====================================
    // 3. APARICIÓN DE ELEMENTOS AL SCROLL
    // =====================================

    const elementos = document.querySelectorAll(
        "#sobremi-container, " +
        ".proyecto-card, " +
        ".habilidad-card, " +
        ".seccion-trabajemos"
    );

    const movimientoReducido = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!movimientoReducido && "IntersectionObserver" in window) {

        const observador = new IntersectionObserver(
            (entradas, observer) => {
                entradas.forEach(entrada => {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visible");
                        observer.unobserve(entrada.target);
                    }
                });
            },
            {
                threshold: 0.12
            }
        );

        elementos.forEach(elemento => {
            elemento.classList.add("revelar");
            observador.observe(elemento);
        });

    } else {
        elementos.forEach(elemento => {
            elemento.classList.add("visible");
        });
    }


    // =====================================
    // 4. BRILLO QUE SIGUE AL CURSOR
    // =====================================

    const tarjetas = document.querySelectorAll(
        ".proyecto-card, " +
        ".habilidad-card, " +
        ".tarjeta-proyecto"
    );

    tarjetas.forEach(tarjeta => {

        tarjeta.classList.add("efecto-brillo");

        tarjeta.addEventListener("pointermove", evento => {

            // Evitamos el efecto en dispositivos táctiles
            if (evento.pointerType === "touch") return;

            const rectangulo = tarjeta.getBoundingClientRect();

            const x = evento.clientX - rectangulo.left;
            const y = evento.clientY - rectangulo.top;

            tarjeta.style.setProperty("--mouse-x", `${x}px`);
            tarjeta.style.setProperty("--mouse-y", `${y}px`);
        });
    });

}

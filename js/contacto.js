
async function cargarCabecera() {
    try {
        const respuesta = await fetch("components/header.html");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar la cabecera");
        }

        const html = await respuesta.text();
        document.getElementById("header").innerHTML = html;

        // Cambiar el enlace de Contacto por Inicio
        const enlaceContacto = document.getElementById("enlace-contacto");

        if (enlaceContacto) {
            enlaceContacto.textContent = "Inicio";
            enlaceContacto.href = "index.html";
            enlaceContacto.classList.remove("nav-contacto");
        }

    } catch (error) {
        console.error(error);
    }
}

async function cargarFooter() {
    try {
        const respuesta = await fetch("components/footer.html");

        if (!respuesta.ok) {
            throw new Error("No se pudo cargar el footer");
        }

        const html = await respuesta.text();
        document.getElementById("footer-container").innerHTML = html;

        // Año automático
        const anio = document.getElementById("anio-actual");

        if (anio) {
            anio.textContent = new Date().getFullYear();
        }

    } catch (error) {
        console.error(error);
    }
}

// =====================================
// ENVÍO DEL FORMULARIO CON NETLIFY
// =====================================

function iniciarFormulario() {
    const formulario = document.querySelector(".formulario-contacto");

    if (!formulario) return;

    const boton = formulario.querySelector(".boton-enviar");
    const estado = document.getElementById("estado-formulario");

    if (!boton || !estado) return;

    const textoBoton = boton.innerHTML;

    formulario.addEventListener("submit", async (evento) => {
        evento.preventDefault();

        boton.disabled = true;
        boton.textContent = "Enviando...";

        estado.textContent = "";
        estado.className = "estado-formulario";

        try {
            const datos = new FormData(formulario);

            const respuesta = await fetch("/", {
                method: "POST",
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                },
                body: new URLSearchParams(datos).toString()
            });

            if (!respuesta.ok) {
                throw new Error(`Error ${respuesta.status}`);
            }

            formulario.reset();

            estado.textContent =
                "¡Gracias! Tu mensaje se ha enviado correctamente. Te responderé lo antes posible.";

            estado.classList.add("estado-ok");

        } catch (error) {
            console.error(error);

            estado.textContent =
                "Vaya, no se pudo enviar el mensaje. Inténtalo de nuevo en unos minutos.";

            estado.classList.add("estado-error");

        } finally {
            boton.disabled = false;
            boton.innerHTML = textoBoton;
        }
    });
}

// =====================================
// INICIALIZACIÓN
// =====================================

async function iniciarContacto() {
    await cargarCabecera();
    await cargarFooter();

    iniciarFormulario();
}

iniciarContacto();

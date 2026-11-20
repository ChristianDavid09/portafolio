
async function cargarComponente(id, archivo) {
    try {
        const respuesta = await fetch(archivo);

        if (!respuesta.ok) {
            throw new Error(`Error al cargar ${archivo}`);
        }

        const html = await respuesta.text();
        document.getElementById(id).innerHTML = html;

    } catch (error) {
        console.error(error);
    }
}

async function cargarFooter() {
    await cargarComponente("footer-container", "components/footer.html");

    const anio = document.getElementById("anio-actual");

    if (anio) {
        anio.textContent = new Date().getFullYear();
    }
}

async function iniciarWeb() {

    await cargarComponente("header", "components/header.html");

    await cargarComponente("sobremi-container", "components/sobremi.html");

    await cargarComponente("presentacion", "components/presentacion.html");

    await cargarComponente("proyectos-container", "components/proyectos.html");

    await cargarComponente("habilidades-container", "components/habilidades.html");

    await cargarComponente("trabajemos-container", "components/trabajemos.html");

    await cargarFooter();

    // Activamos las animaciones cuando ya está todo cargado
    if (typeof inicializarAnimaciones === "function") {
        inicializarAnimaciones();
    }

    // Animación de entrada de la página
    document.body.classList.add("pagina-cargada");
}

iniciarWeb();



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

async function iniciarWeb() {

    await cargarComponente(
        "header",
        "components/header.html"
    );

    await cargarComponente(
        "presentacion",
        "components/presentacion.html"
    );

    await cargarComponente(
        "proyectos-container",
        "components/proyectos.html"
    );

    await cargarComponente(
        "habilidades-container",
        "components/habilidades.html"
    );

    await cargarComponente(
        "trabajemos-container",
        "components/trabajemos.html"
    );

}

iniciarWeb();

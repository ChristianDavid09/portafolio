
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

        enlaceContacto.textContent = "Inicio";
        enlaceContacto.href = "index.html";

    } catch (error) {
        console.error(error);
    }
}

cargarCabecera();
await cargarFooter();
function toggleMode() {
    const section = document.getElementById("theme-section");
    const articles = document.querySelectorAll(".postcard");
    const textTitle = document.getElementById("pageHeaderTitle");
    const textBodies = document.querySelectorAll(".postcard__text");
    const btnToggleIcon = document.querySelector(".btn-toggle i");

    section.classList.toggle("dark");
    section.classList.toggle("light");

    articles.forEach(article => {
        article.classList.toggle("dark");
        article.classList.toggle("light");
    });

    textTitle.classList.toggle("text-light");
    textTitle.classList.toggle("text-dark");

    textBodies.forEach(textbody => {
        textbody.classList.toggle("t-light");
        textbody.classList.toggle("t-dark");
    });

    // document.querySelector(".btn-toggle").textContent = section.classList.contains("dark") ? "Modo Claro" : "Modo Oscuro";
    // Cambiar el ícono del botón
    btnToggleIcon.classList.remove("fas", "far");
    btnToggleIcon.classList.add(section.classList.contains("dark") ? "fas" : "far");

    // Crear un objeto con el estado actual de los elementos
    const userSettings = {
        section: section.classList.contains("dark") ? "dark" : "light",
        articles: Array.from(articles).map(article => article.classList.contains("dark") ? "dark" : "light"),
        textTitle: textTitle.classList.contains("text-dark") ? "dark" : "light",
        textBodies: Array.from(textBodies).map(textbody => textbody.classList.contains("t-dark") ? "dark" : "light"),
        icon: section.classList.contains("dark") ? "fas" : "far"
    };

    // Guardar la configuración en localStorage
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
}

// Cargar la configuración guardada desde localStorage al cargar la página
window.addEventListener("load", () => {
    const savedSettings = localStorage.getItem("userSettings");

    if (savedSettings) {
        const userSettings = JSON.parse(savedSettings);

        // Aplicar el tema guardado (oscuro o claro)
        const section = document.getElementById("theme-section");
        const articles = document.querySelectorAll(".postcard");
        const textTitle = document.getElementById("pageHeaderTitle");
        const textBodies = document.querySelectorAll(".postcard__text");
        const btnToggleIcon = document.querySelector(".btn-toggle i");

        // Aplicar el tema a la sección
        if (userSettings.section === "dark") {
            section.classList.add("dark");
            section.classList.remove("light");
        } else {
            section.classList.add("light");
            section.classList.remove("dark");
        }

        // Aplicar las clases a los artículos
        articles.forEach((article, index) => {
            if (userSettings.articles[index] === "dark") {
                article.classList.add("dark");
                article.classList.remove("light");
            } else {
                article.classList.add("light");
                article.classList.remove("dark");
            }
        });

        // Aplicar las clases al título de la página
        if (userSettings.textTitle === "dark") {
            textTitle.classList.add("text-dark");
            textTitle.classList.remove("text-light");
        } else {
            textTitle.classList.add("text-light");
            textTitle.classList.remove("text-dark");
        }

        // Aplicar las clases a los cuerpos del texto
        textBodies.forEach((textbody, index) => {
            if (userSettings.textBodies[index] === "dark") {
                textbody.classList.add("t-dark");
                textbody.classList.remove("t-light");
            } else {
                textbody.classList.add("t-light");
                textbody.classList.remove("t-dark");
            }
        });

        // Restaurar el ícono correcto
        btnToggleIcon.classList.remove("fas", "far");
        btnToggleIcon.classList.add(section.classList.contains("dark") ? "fas" : "far");

        // Cambiar el texto del botón
        // btnToggle.textContent = section.classList.contains("dark") ? "Modo Claro" : "Modo Oscuro";
    }
});
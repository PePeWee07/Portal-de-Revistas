// Botoón de cambio de tema
function toggleMode() {
    const section = document.getElementById("theme-section");
    const articles = document.querySelectorAll(".postcard");
    const textTitle = document.getElementById("pageHeaderTitle");
    const textBodies = document.querySelectorAll(".postcard__text");
    const btnToggleIcon = document.querySelector(".btn-toggle i");
    const btnRedirect = document.querySelectorAll(".btn-redirect");

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

    // Cambiar el ícono del botón
    btnToggleIcon.classList.remove("fas", "far");
    btnToggleIcon.classList.add(section.classList.contains("dark") ? "fas" : "far");

    // Cambiar el color de los botones de navegación
    btnRedirect.forEach(button => {
        button.classList.toggle("btn-light");
        button.classList.toggle("btn-dark");
    });

    // Crear un objeto con el estado actual de los elementos
    const userSettings = {
        section: section.classList.contains("dark") ? "dark" : "light",
        articles: Array.from(articles).map(article => article.classList.contains("dark") ? "dark" : "light"),
        textTitle: textTitle.classList.contains("text-dark") ? "dark" : "light",
        textBodies: Array.from(textBodies).map(textbody => textbody.classList.contains("t-dark") ? "dark" : "light"),
        icon: section.classList.contains("dark") ? "fas" : "far",
        btnRedirect: Array.from(btnRedirect).map(button => button.classList.contains("btn-dark") ? "dark" : "light")

    };

    // Guardar la configuración en localStorage
    localStorage.setItem('userSettings', JSON.stringify(userSettings));
}

// Cargar los artículos desde el archivo JSON al cargar la página
window.addEventListener("load", () => {
    // Cargar artículos desde el archivo JSON
    fetch('/src/assets/data/articulos.json')
        .then(response => response.json())
        .then(articulos => {
            const articlesContainer = document.getElementById("articles-container");
            const buttonsNav = document.getElementById("btn-redirect-container");

            // Iterar sobre los artículos y generarlos en el HTML
            articulos.forEach(articulo => {
                const article = document.createElement('article');
                article.classList.add('postcard', 'light', articulo.color, articulo.title.replace(/\s+/g, '_'));

                const tagsHTML = articulo.tags.join("");
                
                article.innerHTML = `
                    <a class="postcard__img_link" href="${articulo.link}">
                        <img class="postcard__img" src="${articulo.img}" alt="${articulo.title}" />
                    </a>
                    <div class="postcard__text t-dark" id="pageBodyText">
                        <h1 class="postcard__title ${articulo.color} style="padding-inline:3px;"><a href="${articulo.link}">${articulo.title}</a></h1>
                        <div class="postcard__subtitle small">
                            <time datetime="2020-05-25 12:00:00">
                                <i class="fas fa-book mr-2"></i>${articulo.subtitle}
                            </time>
                        </div>
                        <div class="postcard__bar"></div>
                        <div class="postcard__preview-txt">${articulo.description}</div>
                        <ul class="postcard__tagbox">
                            ${tagsHTML} 
                            <li class="tag__item play ${articulo.color}">
                                <a href="${articulo.link}" target="_blank"><i class="fas fa-link mr-2"></i>Abrir revista</a>
                            </li>
                        </ul>
                    </div>
                `;

                // Añadir el artículo al contenedor
                articlesContainer.appendChild(article);

                // Crear botones de navegación
                const button = document.createElement('button');
                button.classList.add('btn', 'btn-light', 'border-secondary', 'rounded-pill', 'mx-1', 'btn-redirect');
                button.textContent = articulo.title;
                button.addEventListener('click', () => scrollToSection(articulo.title.replace(/\s+/g, '_')));
                buttonsNav.appendChild(button);


                ScrollReveal().reveal('.postcard', {
                    duration: 1000,
                    scale: 0.85,
                    distance: '10px',
                    interval: 200,
                    reset: true
                });
            });
        })
        .catch(error => console.error('Error al cargar el archivo JSON:', error));
});

// Cargar la configuración guardada desde localStorage al cargar la página
window.addEventListener("load", () => {
    const savedSettings = localStorage.getItem("userSettings");

    if (savedSettings) {
        const userSettings = JSON.parse(savedSettings);

        // Aplicar el tema a la sección principal
        const section = document.getElementById("theme-section");
        if (userSettings.section === "dark") {
            section.classList.add("dark");
            section.classList.remove("light");
        } else {
            section.classList.add("light");
            section.classList.remove("dark");
        }

        // Aplicar el tema al título de la página
        const textTitle = document.getElementById("pageHeaderTitle");
        textTitle.classList.toggle("text-dark", userSettings.textTitle === "dark");
        textTitle.classList.toggle("text-light", userSettings.textTitle !== "dark");

        // Aplicar el icono correcto al botón de cambio de tema
        const btnToggleIcon = document.querySelector(".btn-toggle i");
        btnToggleIcon.classList.remove("fas", "far");
        btnToggleIcon.classList.add(userSettings.icon);

        // Esperar a que se carguen los artículos antes de aplicar los temas
        setTimeout(() => {
            const articles = document.querySelectorAll(".postcard");
            const textBodies = document.querySelectorAll(".postcard__text");
            const btnRedirect = document.querySelectorAll(".btn-redirect");

            articles.forEach((article, index) => {
                const themeClass = userSettings.articles[index] === "dark" ? "dark" : "light";
                article.classList.remove("light", "dark");
                article.classList.add(themeClass);
            });

            textBodies.forEach((textBody, index) => {
                const themeClass = userSettings.textBodies[index] === "dark" ? "t-dark" : "t-light";
                textBody.classList.remove("t-dark", "t-light");
                textBody.classList.add(themeClass);
            });

            btnRedirect.forEach((button, index) => {
                const themeClass = userSettings.btnRedirect[index] === "dark" ? "btn-dark" : "btn-light";
                button.classList.remove("btn-dark", "btn-light");
                button.classList.add(themeClass);
            });
        }, 500); // Retraso para asegurar que los artículos existen en el DOM
    }
});

// Función para desplazarse a una sección específica
function scrollToSection(sectionClass) {
    const section = document.querySelector('.' + sectionClass);
    if (section) {
        section.scrollIntoView({ behavior: 'smooth', block: 'center', inline: 'nearest' });
    }
}

window.addEventListener("scroll", function () {
    const btnContainer = document.getElementById("btn-redirect-container");

    if (window.scrollY > 300) { 
        btnContainer.classList.add("scrolled");
    } else {
        btnContainer.classList.remove("scrolled");
    }
});

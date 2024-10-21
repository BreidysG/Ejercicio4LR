let currentWords = []; // Palabras actuales que se deben buscar en la ronda
let foundWords = []; // Palabras encontradas en total durante la partida
let errorWords = []; // Palabras seleccionadas incorrectamente
let roundWordsFound = []; // Palabras encontradas en la ronda actual
let totalWordsFound = 0; // Contador acumulativo de palabras encontradas en todas las rondas
let timer; // Control del temporizador
let gameActive = false; // Control del estado del juego

// Función para iniciar el juego
function startGame() {
    foundWords = []; // Reiniciar las palabras encontradas en cada nueva partida
    errorWords = []; // Reiniciar los errores en cada nueva partida
    roundWordsFound = []; // Reiniciar las palabras encontradas en la ronda actual
    totalWordsFound = 0; // Reiniciar el contador acumulativo
    gameActive = true; // Activar el juego
    updateFoundWordsDisplay();
    updateErrorsDisplay();
    loadNewWords();
    startTimer();

    // Mostrar el contenedor de palabras y resultados
    document.getElementById('wordList').classList.remove('hidden');
    document.getElementById('foundWords').classList.remove('hidden');
    document.getElementById('errors').classList.remove('hidden');
    document.getElementById('timer').classList.remove('hidden');
    document.getElementById('p1').classList.add('hidden');
    document.getElementById('p2').classList.add('hidden');
    document.getElementById('p3').classList.add('hidden');
    document.getElementById('startButton').classList.add('hidden');
}

// Función para obtener palabras únicas
function getUniqueWords(words, count) {
    const shuffledWords = words.sort(() => Math.random() - 0.5); // Mezclar las palabras
    return shuffledWords.slice(0, count); // Seleccionar las primeras 'count' palabras
}

// Lista de palabras disponibles
const availableWords = [
  "Elefante", "Guitarra", "Playa", "Computadora", "Montaña", "Chocolate","Universo", "Libro", "Estrella", "Fresa", "Camino", "Perro","Aventura", "Canción", "Bosque", "Cielo", "Amor", "Piano",
    "Viaje", "Helado", "Océano", "Luna", "Sol", "Arcoiris",
    "Casa", "Flor", "Abeja", "Mariposa", "Aurora", "Nube",
    "Relámpago", "Héroe", "Sonrisa", "Bailarín", "Viento", "Catarata",
    "Girasol", "Desierto", "Reloj", "Mar", "Arena", "Coral",
    "Sirena", "Nave", "Olas", "Sueño", "Despertar", "Ocaso",
    "Horizonte", "Tranquilidad", "Reflejo", "Colina", "Neblina", "Silencio","Meditación", "Árbol", "Río", "Pájaro", "Hojas", "Cascada",
    "Escalera", "Barco", "Isla", "Nieve", "Copo", "Diamante",
    "Perla", "Brisa", "Murmullo", "Estanque", "Atardecer", "Montura",
    "Estrella fugaz", "Caballo", "Niebla", "Fuego", "Trueno","Relajación","Descanso", "Paseo", "Huella", "Paraíso", "Amistad","Corazón","Recuerdo", "Música", "Inspiración", "Creación","Nacimiento", "Juventud","Niñez", "Libertad", "Refugio", "Jardín","Orquídea", "Espejo","Caverna", "Templo", "Faro", "Armonía", "Esperanza", "Cascabel", "Lágrima", "Destello", "Alba",
    "Colores", "Luz", "Cristal", "Arco", "Río", "Bosquejo", "Marea", "Constelación", "Cúpula", "Tierra", "Relato",
    "Sonido", "Travesía", "Cabaña", "Fragancia", "Nube", "Trigal",
    "Cosecha", "Bruma", "Ondas", "Espuma", "Arena", "Lluvia",
    "Alondra", "Rocío", "Eco", "Ceniza", "Raíz", "Madera",
    "Barro", "Molino", "Mirada", "Silencio", "Susurro", "Gaviota",
    "Tallo", "Floración", "Ritmo", "Sombra", "Camino", "Mirador",
    "Vigía", "Montículo", "Estalactita", "Velero", "Náufrago", "Corriente",
    "Tótem", "Huerto", "Nebulosa", "Brillante", "Estrella polar", "Constancia",
    "Serenidad", "Compás", "Rayo", "Observatorio", "Torre", "Puente",
    "Atalaya", "Caverna","Césped", "Prado", "Madera",
    "Esplendor", "Firmamento", "Golondrina", "Melodía", "Sinfonía", "Calma",
    "Bravura", "Bravura", "Viento", "Corriente", "Canoa", "Sendero", "Espejismo", "Bosquecillo", "Sierra", "Solsticio", "Equinoccio", "Viento", "Brisa", "Huracán", "Tormenta", "Lluvia", "Neblina",
    "Vapor", "Niebla", "Cielo", "Noche", "Luz", "Amanecer",
    "Sol", "Luna", "Estrella", "Cometa", "Nube", "Rayo",
    "Relámpago", "Trueno", "Río", "Corriente", "Cascada", "Lago",
    "Laguna", "Charca", "Mar", "Océano", "Marea", "Arena",
    "Duna", "Desierto", "Tierra", "Valle", "Colina", "Montaña",
    "Cumbre", "Glaciar", "Sierra", "Bosque", "Selva", "Pradera",
    "Campo", "Jardín", "Cueva", "Gruta", "Acantilado", "Risco",
    "Volcán", "Cráter", "Fumarola", "Géiser", "Pantano", "Roca",
    "Arroyo", "Sendero", "Camino", "Carretera", "Calle", "Plaza",
    "Ciudad", "Pueblo", "Aldea", "Cabaña", "Mansión", "Palacio",
    "Castillo", "Fortaleza", "Muralla", "Puente", "Túnel", "Callejón",
    "Avenida", "Mercado", "Granero", "Establo", "Viñedo", "Huerto",
    "Prado", "Pinar", "Bahía", "Costa", "Playa", "Horizonte",
    "Nieve", "Nevada", "Viento", "Frío", "Cima", "Colina",
    "Árbol", "Pino", "Cedro", "Roble", "Sauce", "Abeto",
    "Almendro", "Cerezo", "Naranjo", "Olivo", "Higuera", "Ciprés",
    "Hiedra", "Enredadera", "Rosa", "Tulipán", "Orquídea", "Girasol",
    "Dalia", "Clavel", "Violeta", "Azucena", "Jazmín", "Lirio",
    "Magnolia", "Camelia", "Hortensia", "Geranio", "Petunia", "Verbena",
    "Amapola", "Diente", "Margarita", "Caléndula", "Zinnia", "Ruda",
    "Salvia", "Romero", "Tomillo", "Albahaca", "Lavanda", "Menta",
    "Hierbabuena", "Manzanilla", "Melisa", "Poleo", "Cúrcuma", "Jengibre",
    "Canela", "Nuez", "Clavo", "Pimienta", "Café", "Cacao",
    "Vainilla", "Azúcar", "Miel", "Caramelo", "Chocolate", "Pastel",
    "Tarta", "Galleta", "Bizcocho", "Flan", "Natilla", "Crema",
    "Merengue", "Helado", "Sorbet", "Granizado", "Yogur", "Queso",
    "Pan", "Baguette", "Croissant", "Sándwich", "Ensalada", "Verduras",
    "Sopa", "Guiso", "Paella", "Arroz", "Curry", "Sushi",
    "Tempura", "Pizza", "Pasta", "Espaguetis", "Risotto", "Pollo",
    "Filete", "Estofado", "Cordero", "Pescado", "Mariscos", "Langosta",
    "Calamares", "Camarones", "Mejillones", "Ostras", "Cangrejo", "Pulpo",
    "Sardinas", "Atún", "Salmón", "Trucha", "Merluza", "Bacalao",
    "Lenguado", "Boquerones", "Cocido", "Fabada", "Tortilla", "Gazpacho",
    "Salmorejo", "Caldo", "Churros", "Crema", "Turrón", "Polvorones",
    "Mantecados", "Empanada", "Pisto", "Escalivada", "Rabo", "Jamón",
    "Chorizo", "Morcilla", "Lomo", "Queso", "Tortas", "Pan",
    "Aceitunas", "Aceite", "Vino", "Cava", "Sidra", "Sangría",
    "Horchata", "Agua", "Zumo", "Limonada", "Café", "Té",
    "Infusión", "Cerveza", "Whisky", "Ron", "Vodka", "Gin",
    "Cóctel", "Margarita", "Piña", "Mojito", "Caipirinha", "Martini",
    "Bloody", "Daiquiri", "Negroni", "Manhattan", "Old", "Mai",
    "Sazerac", "Tequila", "Brandy", "Licor", "Baileys", "Jägermeister",
    "Absenta", "Champán", "Tormenta", "Aurora", "Rayo", "Mariposa",
    "Héroe", "Sonrisa", "Bailarín", "Piano", "Beso", "Cascada",
    "Viaje", "Amor", "Caricia", "Sonido", "Viento", "Canto",
    "Sombra", "Mirada", "Calor", "Templo", "Luz", "Silencio",
    "Aroma", "Risa", "Rueda", "Canción", "Ritmo", "Poema",
    "Corazón", "Llama", "Magia", "Cielo", "Melodía", "Reflejo",
    "Palabra", "Cuento", "Pasión", "Joya", "Paz", "Estrella",
    "Ceniza", "Velo", "Espejo", "Sabor", "Plenitud", "Lago",
    "Aventura", "Desafío", "Sueño", "Escudo", "Rayo", "Salto",
    "Fuerza", "Grito", "Libertad", "Sendero", "Poesía", "Explosión",
    "Caída", "Luz", "Golpe", "Destello", "Gema", "Susurro",
    "Destino", "Pasado", "Presente", "Futuro", "Guía", "Brillo",
    "Eco", "Sombras", "Tierra", "Lejanía", "Encuentro", "Voz",
    "Llamada", "Escalera", "Amanecer", "Horizonte", "Épica", "Roca",
    "Conquista", "Colores", "Esfera", "Orilla", "Cristal", "Tejido",
    "Brisa", "Niebla", "Amanecer", "Cascada", "Palacio", "Bailarina",
    "Fábula", "Fortaleza", "Nostalgia", "Fortuna", "Rayo", "Poeta",
    "Alba", "Neblina", "Labio", "Piel", "Luz", "Olvido",
    "Sombras", "Llama", "Tierra", "Pasión", "Eco", "Viaje",
    "Silencio", "Tiempo", "Destino", "Guía", "Cuento", "Amistad",
    "Sol", "Lluvia", "Viento", "Trueno", "Frío", "Despertar",
    "Vuelo", "Recuerdo", "Leyenda", "Destello", "Aventura", "Oscuridad",
    "Fuego", "Infinito", "Relámpago", "Espejo", "Río", "Susurro"
];

// Función para verificar la palabra seleccionada
function checkWord(event) {
    if (!gameActive) return; // No hacer nada si el juego no está activo

    const word = event.target.innerText;

    // Comprobar si la palabra seleccionada es una de las palabras correctas en la ronda
    if (currentWords.includes(word)) {
        // Añadir la palabra a la lista de palabras encontradas en la ronda si no está ya presente
        if (!roundWordsFound.includes(word)) {
            roundWordsFound.push(word);
            totalWordsFound++; // Aumentar el contador acumulativo de palabras encontradas
            updateFoundWordsDisplay();
        }

        // Marcar la palabra correcta encontrada en el tablero
        event.target.classList.add('found'); // Cambiar el fondo a verde

        // Verificar si se encontraron todas las palabras de la ronda
        if (roundWordsFound.length === currentWords.length) {
            setTimeout(() => {
                roundWordsFound = []; // Reiniciar las palabras de la ronda
                loadNewWords(); // Cargar nuevas palabras para la siguiente ronda
            }, 1000);
        }
    } else {
        // Si la palabra seleccionada es incorrecta
        if (!errorWords.includes(word)) {
            errorWords.push(word);
            event.target.classList.add('error');
            updateErrorsDisplay();
        }
    }
}

// Función para cargar nuevas palabras en el tablero
function loadNewWords() {
    // Obtener 40 palabras únicas para el tablero
    const gridWords = getUniqueWords(availableWords, 40);
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = ''; // Limpiar palabras anteriores

    // Mostrar las palabras en el tablero
    gridWords.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        wordDiv.textContent = word;
        wordDiv.addEventListener('click', checkWord); // Habilitar los eventos de clic
        gridContainer.appendChild(wordDiv);
    });

    // Seleccionar 5 palabras al azar de las 40 palabras del tablero para buscar en esta ronda
    currentWords = getUniqueWords(gridWords, 5); // Seleccionar 5 palabras correctas de gridWords
    document.getElementById('currentWord').textContent = currentWords.join(', '); // Mostrar las palabras a buscar
}

// Función para iniciar el temporizador
function startTimer() {
    const duration = 180; // Duración del juego en segundos (3 minutos)
    let timeLeft = duration;

    // Actualizar el temporizador en pantalla cada segundo
    timer = setInterval(() => {
        const minutes = Math.floor(timeLeft / 60);
        const seconds = timeLeft % 60;
        document.getElementById('timer').innerHTML = `Tiempo restante: ${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
        timeLeft--;

        if (timeLeft < 0) {
            clearInterval(timer);
            endGame(); // Llamar al final del juego cuando el tiempo se acabe
        }
    }, 1000);
}

// Función para mostrar la cantidad de palabras encontradas (acumulativo)
function updateFoundWordsDisplay() {
    const foundWordsList = document.getElementById('foundWords');
    foundWordsList.innerHTML = `Palabras encontradas en total: ${totalWordsFound}`;
}

// Función para mostrar la cantidad de errores
function updateErrorsDisplay() {
    const errorWordsList = document.getElementById('errors');
    errorWordsList.innerHTML = `Errores: ${errorWords.length}`;
}

// Función para finalizar el juego cuando el tiempo se agota
function endGame() {
    clearInterval(timer); // Detener el temporizador
    gameActive = false; // Desactivar el juego
    alert("¡Se acabó el tiempo! El juego ha terminado.");
    document.getElementById('p4').classList.remove('hidden');
    document.getElementById('wordList').classList.add('hidden');
    document.getElementById('gridContainer').classList.add('hidden');
}

// Evento para iniciar el juego cuando se carga la página
window.onload = () => {
    document.getElementById('startButton').addEventListener('click', startGame);
};

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
  "Elefante", "Guitarra", "Playa", "Computadora", "Montaña", "Chocolate", "Universo", "Libro", "Estrella", "Fresa", "Camino", "Perro", "Aventura", "Canción", "Bosque", "Cielo", "Amor", "Piano", 
    "Viaje", "Helado", "Océano", "Luna", "Sol", "Arcoiris", 
    "Casa", "Flor", "Abeja", "Mariposa", "Aurora", "Nube", 
    "Relámpago", "Héroe", "Sonrisa", "Bailarín", "Viento", "Catarata", 
    "Girasol", "Desierto", "Reloj", "Mar", "Arena", "Coral", 
    "Sirena", "Nave", "Olas", "Sueño", "Despertar", "Ocaso", 
    "Horizonte", "Tranquilidad", "Reflejo", "Colina", "Neblina", "Silencio", "Meditación", "Árbol", "Río", "Pájaro", "Hojas", "Cascada", 
    "Escalera", "Barco", "Isla", "Nieve", "Copo", "Diamante", 
    "Perla", "Brisa", "Murmullo", "Estanque", "Atardecer", "Montura", 
    "Estrella fugaz", "Caballo", "Niebla", "Fuego", "Trueno", "Relajación", "Descanso", "Paseo", "Huella", "Paraíso", "Amistad", "Corazón", "Recuerdo", "Música", "Inspiración", "Creación", "Nacimiento", "Juventud", "Niñez", "Libertad", "Refugio", "Jardín", "Orquídea", "Espejo", "Caverna", "Templo", "Faro", "Armonía", "Esperanza", "Cascabel", "Lágrima", "Destello", "Alba", 
    "Colores", "Luz", "Cristal", "Arco", "Bosquejo", "Marea", "Constelación", "Cúpula", "Tierra", "Relato", 
    "Sonido", "Travesía", "Cabaña", "Fragancia", "Trigal", 
    "Cosecha", "Bruma", "Ondas", "Espuma", "Lluvia", 
    "Alondra", "Rocío", "Eco", "Ceniza", "Raíz", "Madera", 
    "Barro", "Molino", "Mirada", "Susurro", "Gaviota", 
    "Tallo", "Floración", "Ritmo", "Sombra", "Mirador", 
    "Vigía", "Montículo", "Estalactita", "Velero", "Náufrago", "Corriente", 
    "Tótem", "Huerto", "Nebulosa", "Brillante", "Estrella polar", "Constancia", 
    "Serenidad", "Compás", "Rayo", "Observatorio", "Torre", "Puente", 
    "Atalaya", "Césped", "Prado", "Esplendor", "Firmamento", "Golondrina", "Melodía", "Sinfonía", "Calma", 
    "Bravura", "Huracán", "Tormenta", "Vapor", "Amanecer", 
    "Cometa", "Duna", "Cumbre", "Selva", "Pradera", 
    "Cueva", "Gruta", "Acantilado", "Volcán", "Cráter", 
    "Arroyo", "Carretera", "Callejón", "Avenida", "Mercado", 
    "Granero", "Establo", "Viñedo", "Pinar", "Bahía", 
    "Nevada", "Frío", "Cima", "Pino", "Cedro", 
    "Almendro", "Cerezo", "Higuera", "Hiedra", "Rosa", 
    "Dalia", "Clavel", "Azucena", "Camelia", "Hortensia", 
    "Amapola", "Salvia", "Romero", "Albahaca", "Hierbabuena", 
    "Cúrcuma", "Canela", "Clavo", "Pimienta", "Pastel", 
    "Tarta", "Galleta", "Merengue", "Sorbet", "Yogur", 
    "Croissant", "Ensalada", "Paella", "Sushi", "Pizza", 
    "Pasta", "Filete", "Cordero", "Mariscos", "Pulpo", 
    "Sardinas", "Salmón", "Lenguado", "Cocido", "Tortilla", 
    "Caldo", "Churros", "Pisto", "Jamón", "Lomo", 
    "Aceitunas", "Cava", "Horchata", "Limonada", "Té", 
    "Infusión", "Gin", "Margarita", "Piña", "Negroni", 
    "Sazerac", "Baileys", "Absenta", "Champán", "Caricia", 
    "Canto", "Calor", "Aroma", "Risa", "Rueda", 
    "Poema", "Llama", "Magia", "Palabra", "Cuento", 
    "Joya", "Paz", "Ceniza", "Velo", "Sabor", 
    "Plenitud", "Desafío", "Escudo", "Salto", "Fuerza", 
    "Grito", "Explosión", "Caída", "Golpe", "Gema", 
    "Destino", "Pasado", "Presente", "Futuro", "Guía", 
    "Brillo", "Lejanía", "Encuentro", "Voz", "Llamada", 
    "Épica", "Conquista", "Esfera", "Orilla", "Tejido", 
    "Nostalgia", "Fortuna", "Labio", "Piel", "Olvido", 
    "Tiempo", "Oscuridad", "Infinito", "Leyenda"
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

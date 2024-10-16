let foundWords = [];
let palabras = [];
let errores = [];
let errorWords = [];
let timerInterval;
const timeLimit = 50; // 3 minutos en segundos
const totalColumns = 8; // Número de columnas de la grid
const totalRows = 5; // Número de filas de la grid
const wordsToFind = [
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

window.onload = function() {
    document.getElementById('startButton').addEventListener('click', startGame);
};

// Función para iniciar el juego
function startGame() {
    document.querySelectorAll('p').forEach(paragraph => {
        paragraph.style.display = 'none'; // Oculta los párrafos
    });
    
    document.getElementById('timer').style.display = 'block';
    document.getElementById('wordList').style.display = 'block';
    document.getElementById('foundWords').style.display = 'block';
    document.getElementById('errors').style.display = 'block';
    document.getElementById('gridContainer').style.display = 'grid';
    document.getElementById('startButton').style.display = 'none';

    resetGame(); // Reseteamos todo
    loadNewWords(); // Cargamos las primeras palabras
    startTimer(); // Iniciamos el temporizador
}

// Función para reiniciar el juego
function resetGame() {
    foundWords = [];  // Reinicia las palabras encontradas
    errorWords = [];  // Reinicia los errores
    document.getElementById('gridContainer').innerHTML = '';  // Limpia el tablero
    document.getElementById('foundWords').innerHTML = 'Palabras encontradas: 0';
    document.getElementById('errors').innerHTML = 'Errores: 0';
    document.getElementById('wordList').innerHTML = '';
    clearInterval(timerInterval);  // Reinicia el temporizador si es necesario
    document.getElementById('timer').innerText = `Tiempo restante: 03:00`;  // Reinicia el temporizador
}

// Función para cargar nuevas palabras en el tablero y la lista a buscar
function loadNewWords() {
    // Obtener 40 palabras para el tablero
    const gridWords = getRandomGridWords();
    const gridContainer = document.getElementById('gridContainer');
    gridContainer.innerHTML = '';  // Limpiar palabras anteriores del tablero

    // Mostrar las palabras en el tablero
    gridWords.forEach(word => {
        const wordDiv = document.createElement('div');
        wordDiv.className = 'word';
        wordDiv.textContent = word;
        wordDiv.addEventListener('click', () => checkWord(word));
        gridContainer.appendChild(wordDiv);
    });

    // Seleccionar 5 palabras al azar de las 40 palabras del tablero para buscarlas
    const wordsToFind = getRandomWordsFromGrid(gridWords, 5);
    document.getElementById('wordList').innerHTML = wordsToFind.join(', ');
}

// Función para seleccionar 40 palabras aleatorias para el tablero
function getRandomGridWords() {
    const shuffled = wordsToFind.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, totalColumns * totalRows);  // 40 palabras aleatorias
}

// Función para seleccionar aleatoriamente las 5 palabras a buscar
function getRandomWordsFromGrid(gridWords, count) {
    const shuffled = gridWords.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
}

// Función para comprobar si la palabra seleccionada es correcta
function checkWord(word) {
    const targetWords = document.getElementById('wordList').innerText.split(', ');
    if (targetWords.includes(word)) {
        if (!foundWords.includes(word)) {
            foundWords.push(word);
            palabras.push(word);
            updateFoundWordsDisplay();
            document.querySelectorAll('.word').forEach(el => {
                if (el.innerText === word) el.classList.add('found');
            });
            if (foundWords.length === 5) {
                setTimeout(() => {
                    foundWords = [];  // Reiniciar las palabras encontradas
                    loadNewWords();  // Cargar nuevas palabras
                }, 1000);  // Espera un segundo antes de recargar nuevas palabras
            }
        }
    } else {
        if (!errorWords.includes(word)) {
            errorWords.push(word);
            errores.push(word);
            document.querySelectorAll('.word').forEach(el => {
                if (el.innerText === word) el.classList.add('error');
            });
            updateErrorsDisplay();
        }
    }
}

// Función para actualizar el contador de palabras encontradas
function updateFoundWordsDisplay() {
    document.getElementById('foundWords').innerHTML = `Palabras encontradas: ${palabras.length}`;
    
}

// Función para actualizar el contador de errores
function updateErrorsDisplay() {
    document.getElementById('errors').innerHTML = `Errores: ${errores.length}`;
}

// Función para iniciar el temporizador
function startTimer() {
    let timeRemaining = timeLimit;
    timerInterval = setInterval(() => {
        const minutes = Math.floor(timeRemaining / 60);
        const seconds = timeRemaining % 60;
        document.getElementById('timer').innerText = `Tiempo restante: ${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
        
        if (timeRemaining <= 0) {
            clearInterval(timerInterval);
            showFinalResults();
        }
        timeRemaining--;
    }, 1000);
}

// Función para mostrar los resultados finales cuando el tiempo se agota
function showFinalResults() {
    alert('¡El tiempo se ha agotado!');  // Mostrar el alert cuando se agote el tiempo
    
    // Ocultar el tablero y el temporizador
    document.getElementById('gridContainer').style.display = 'none';
    document.getElementById('timer').style.display = 'none';
    document.getElementById('wordList').style.display = 'none';
    document.getElementById('errors').style.display = 'none';
    
    // Mostrar el resultado final
    const finalMessage = `
        <h2>Resultados Finales</h2>
        <p>Palabras encontradas: ${palabras.length}</p>
        <p>Errores: ${errores.length}</p>
        <p id="pFinal">Ya puedes salir y continuar con el siguiente ejercicio.</p>
    `;
    
    document.getElementById('foundWords').innerHTML = finalMessage;
    document.getElementById('errors').innerHTML = '';
}
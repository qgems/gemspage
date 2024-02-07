// Функция открытия информационной панели с гифкой
function openInfoPanel(gifURL) {
    var panel = window.open("", "_blank", "width=400,height=300");
    panel.document.write('<html><head><title>kiss</title><style>body{margin:0;padding:0;display:flex;align-items:center;justify-content:center;}</style></head><body><div id="gifContainer"><img id="gifFrame" src="' + gifURL + '"></div></body></html>');
}

// Показываем кнопку игры плавно после загрузки страницы
function showGameButton() {
    var gameButton = document.getElementById("gameButton");
    gameButton.classList.add("show");
}

// Функция для переключения состояния игры
function toggleGame() {
    var gameContainer = document.getElementById("gameContainer");
    var gameButton = document.getElementById("gameButton");
    if (gameContainer.classList.contains("show")) {
        gameContainer.classList.remove("show");
        gameContainer.classList.add("hide");
        gameButton.textContent = "Играть";
    } else {
        gameContainer.classList.remove("hide");
        gameContainer.classList.add("show");
        gameButton.textContent = "Закончить";
    }
    document.getElementById("result").textContent = ''; // Очищаем результат при переключении состояния игры
}

// Функция проверки угаданного числа
function checkGuess() {
    var guess = parseInt(document.getElementById("guessInput").value);
    var result = document.getElementById("result");
    if (guess === randomNumber) {
        result.textContent = "Поздравляем! Вы угадали число!";
        result.style.color = "green";
        var playAgain = confirm("Поздравляем! Вы угадали число! Хотите сыграть ещё раз?");
        if (playAgain) {
            randomNumber = Math.floor(Math.random() * 100) + 1;
        } else {
            endGame();
        }
    } else {
        if (guessCount < 5) {
            result.textContent = "Неправильно. Попробуйте еще раз.";
            result.style.color = "red";
            guessCount++;
        } else {
            result.textContent = guess < randomNumber ? "Больше" : "Меньше";
            result.style.color = "white";
        }
    }
    document.getElementById("guessInput").value = '';
}

// Функция для завершения игры
function endGame() {
    var gameContainer = document.getElementById("gameContainer");
    var result = document.getElementById("result");
    gameContainer.classList.remove("show");
    gameContainer.classList.add("hide");
    document.getElementById("gameButton").textContent = "Играть";
    result.textContent = '';
    result.style.color = '';
    document.getElementById("guessInput").value = '';
    guessCount = 0;
}

// Обработчик нажатия клавиши Enter
function handleKeyPress(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Предотвращаем действие по умолчанию (отправку формы)
        checkGuess(); // Вызываем функцию checkGuess() при нажатии клавиши Enter
    }
}


// Показываем кнопку игры после загрузки страницы
window.onload = showGameButton;

// Генерируем случайное число от 1 до 100
var randomNumber = Math.floor(Math.random() * 100) + 1;

// Переменная для отслеживания количества неправильных попыток
var guessCount = 0;

let correctAnswer;
let attempt = 0;
let totalScore = 0;

function startGame() {
    attempt = 0;
    correctAnswer = Math.floor(Math.random() * 100) + 1;
    const options = generateOptions();
    displayQuestionAndOptions(options);
    document.getElementById('message').textContent = '';
    document.getElementById('next-question').hidden = true;
}

function generateOptions() {
    let options = [];
    options.push(correctAnswer);
    while (options.length < 4) {
        let option = Math.floor(Math.random() * 100) + 1;
        if (!options.includes(option)) {
            options.push(option);
        }
    }
    return options.sort((a, b) => a - b);
}

function displayQuestionAndOptions(options) {
    document.getElementById('question').textContent = "Pick the number between 1 and 100:";
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = '';
    options.forEach(option => {
        const button = document.createElement('button');
        button.textContent = option;
        button.onclick = () => checkAnswer(option);
        optionsContainer.appendChild(button);
    });
}

function checkAnswer(selected) {
    attempt++;
    if (selected === correctAnswer) {
        let score = 0;
        if (attempt === 1) {
            score = 100;
        } else if (attempt === 2) {
            score = 50;
        } else if (attempt === 3) {
            score = 25;
        }
        totalScore += score;
        document.getElementById('message').textContent = `Correct! You scored ${score} points.`;
        document.getElementById('next-question').hidden = false;
        updateScore();
    } else {
        if (attempt === 3) {
            document.getElementById('message').textContent = "Better luck next time!";
            document.getElementById('next-question').hidden = false;
        } else {
            document.getElementById('message').textContent = "Wrong! Try again.";
        }
    }
}

function updateScore() {
    document.getElementById('score').textContent = `Total Score: ${totalScore}`;
    if (totalScore > 0 && document.getElementById('next-question').hidden === false) {
        document.getElementById('score').textContent += ' 🥳 Congratulations!';
    }
}


window.onload = startGame;

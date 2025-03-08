const bgMusic = new Audio('../sounds/bg_music.mp3');
const clickSound = new Audio('../sounds/marca.mp3');

bgMusic.loop = true;
bgMusic.volume = 0.5;

function playBackgroundMusic() {
    bgMusic.play().catch(error => {
        console.log("Автовоспроизведение заблокировано браузером");
        document.addEventListener('click', function startMusic() {
            bgMusic.play();
            document.removeEventListener('click', startMusic);
        }, { once: true });
    });
}

function playClickSound() {
    clickSound.currentTime = 0;
    clickSound.play();
}


const audioControl = document.createElement('button');
audioControl.innerHTML = '🔊';
audioControl.style.position = 'fixed';
audioControl.style.top = '10px';
audioControl.style.right = '10px';
audioControl.style.zIndex = '1000';
audioControl.style.padding = '10px';
audioControl.style.border = 'none';
audioControl.style.borderRadius = '5px';
audioControl.style.backgroundColor = 'rgba(255, 255, 255, 0.5)';
audioControl.style.cursor = 'pointer';

audioControl.addEventListener('click', (e) => {
    e.stopPropagation();
    if (bgMusic.paused) {
        bgMusic.play();
        audioControl.innerHTML = '🔊';
    } else {
        bgMusic.pause();
        audioControl.innerHTML = '🔈';
    }
});

document.body.appendChild(audioControl);

document.addEventListener('DOMContentLoaded', () => {
    playBackgroundMusic();
});

window.onload = () => {
    playBackgroundMusic();
};

document.addEventListener('click', playClickSound);

let currentQuestion = 1;
let selectedOptions = {};

function selectOption(index, questionNumber) {
    
    document.querySelectorAll(`#question-${questionNumber} .checkbox`).forEach(checkbox => {
        checkbox.classList.remove('checked');
    });
    
    
    const checkbox = document.getElementById(`checkbox-${questionNumber}-${index}`);
    checkbox.classList.add('checked');
    selectedOptions[questionNumber] = index;
}

function nextQuestion(currentQuestionNum) {
    if (selectedOptions[currentQuestionNum] === undefined) {
        alert('Пожалуйста, выберите один из вариантов ответа');
        return;
    }

    const currentQuestionElement = document.getElementById(`question-${currentQuestionNum}`);
    currentQuestionElement.style.display = 'none';

    if (currentQuestionNum < 6) {
        const nextQuestionElement = document.getElementById(`question-${currentQuestionNum + 1}`);
        nextQuestionElement.style.display = 'block';
    } else {
        
        window.location.href = '../Page_three/page_three.html';
    }
}


document.addEventListener('dragstart', (e) => {
    e.preventDefault();
});

document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

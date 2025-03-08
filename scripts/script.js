const thoughtText = document.getElementById('thought-text');
const character = document.getElementById('character');
const dialoguePanel = document.getElementById('dialogue-panel');
const dayQuestion = document.getElementById('day-question');
const dayQuestion2 = document.getElementById('day-question2');

const dialogues = [
    { text: "Привет, Соф, ты готова начать?", sprite: "images/Questions.png" },
    { text: "Слуууууууу-шай.", sprite: "images/char+.png" },
    { text: "Как прошел твой день?", sprite: "images/Questions.png" },
    { text: "А какие наряды тебе нравятся?", sprite: "images/Questions.png" },
    { text: "Замечательно! Слушай, я уже устала спрашивать бред, так что...", sprite: "images/char+.png" },
    {
        text: "Хочу сказать, что на самом деле планировалось много чего, но в конечном итоге, из-за того что были проблемы с кодом, мне пришлось удалить 3 вопроса.",
        sprite: "images/char+.png"
    },
    { text: ".", sprite: "images/closed mouth.png" },
    { text: "..", sprite: "images/closed mouth.png" },
    { text: "...", sprite: "images/closed mouth.png" },
    {
        text: "Ты не задумывалась о том, что кто-то может понимать тебя и знать о тебе больше, чем многие люди, но при этом он почти ничего о тебе не знает? ",
        sprite: "images/Questions.png"
    },
    {
        text: "Вопрос был риторическим. Ты не сможешь на него ответить из-за ошибок в коде и криворукости того, кто его написал.",
        sprite: "images/Exclamation.png"
    },
    {
        text: "Интересная дилемма: `Парадокс понимания: иногда человек может как бы интуитивно понимать эмоциональные или поведенческие нюансы другого, но при этом не знать подробностей его жизненной истории или внутреннего мира.`",
        sprite: "images/Exclamation.png"
    },
    { text: "А люди, которые ищут признания в ком-то?", sprite: "images/Questions.png" },
    { text: "Они просто хотят любви и понимания.", sprite: "images/char+.png" },
    {
        text: "`Иногда близость с другим человеком — это не столько встреча душ, сколько попытка заполнить пустоту, оставленную прошлым. Мы ищем не только друга или партнёра, но и образ утраченной поддержки, наделяя другого ролями, которые он даже не осознаёт. Вопрос не в том, кем был другой, а в том, кем он казался в наших глазах, отражая наши внутренние потребности.`",
        sprite: "images/Exclamation.png"
    },
    {
        text: "Если эмоциональная поддержка, которую обычно дает близкий взрослый — дядя, тётя, мама или дед, — недоступна, человек может искать эту поддержку в другом взрослом, даже если их отношения по идее должны быть другого рода.",
        sprite: "images/Exclamation.png"
    },
    { text: "На философию потянуло.", sprite: "images/char+.png" },
    { text: "Ладно, забудем.", sprite: "images/char+.png" },
    { text: "Тебе уже надо идти решать бланки!", sprite: "images/Exclamation.png" },
    { text: "Удачи, надеюсь, свидимся!", sprite: "images/Exclamation.png", isLast: true },
];


const bgMusic = new Audio('sounds/bg_music.mp3');
const clickSound = new Audio('sounds/click.mp3');

 
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


document.addEventListener('DOMContentLoaded', () => {
    playBackgroundMusic();
});

window.onload = () => {
    animateCharacter();
    playBackgroundMusic();
};


document.addEventListener('click', playClickSound);

let currentDialogue = 0;
let isAnimating = false; 

function animateCharacter() {
    
    character.style.transition = 'none';
    character.style.left = '100%';
    character.style.bottom = '-119px';
    
    
    character.offsetHeight;
    
    
    character.style.transition = 'all 1s ease-in-out';
    character.style.left = '86%';
    character.style.bottom = '-119px';

    setTimeout(() => {
        dialoguePanel.classList.add('show');
        thoughtText.textContent = dialogues[currentDialogue].text;
        character.src = dialogues[currentDialogue].sprite;
    }, 1000);
}

document.querySelector('.container').addEventListener('click', () => {
    if (isAnimating) return; 
    isAnimating = true;

    if (currentDialogue === 2) {
        dialoguePanel.classList.remove('show');
        setTimeout(() => {
            dayQuestion.style.display = 'flex';
            showButtons(dayQuestion);
            isAnimating = false;
        }, 500);
    } else if (currentDialogue === 3) {
        dialoguePanel.classList.remove('show');
        setTimeout(() => {
            dayQuestion2.style.display = 'flex';
            showButtons(dayQuestion2);
            isAnimating = false;
        }, 500);
    } else {
        currentDialogue = (currentDialogue + 1) % dialogues.length;
        
        
        if (dialogues[currentDialogue].isLast) {
            
            const elements = [dialoguePanel, character, dayQuestion, dayQuestion2];
            elements.forEach(el => {
                if (el) {
                    el.style.transition = 'opacity 1s ease';
                    el.style.opacity = '0';
                }
            });

            
            setTimeout(() => {
                elements.forEach(el => {
                    if (el) el.style.display = 'none';
                });
                createBlanksButton();
                isAnimating = false;
            }, 1000);
        } else {
            thoughtText.textContent = dialogues[currentDialogue].text;
            character.src = dialogues[currentDialogue].sprite;
            isAnimating = false;
        }
    }
});

function showButtons(questionBlock) {
    const buttons = questionBlock.querySelectorAll('.glass-button, .glass-button2');
    buttons.forEach(button => {
        button.style.opacity = '0';
        button.classList.add('show');
        setTimeout(() => {
            button.style.opacity = '1';
        }, 50);
    });
}

function handleClothingResponse(responseIndex) {
    if (isAnimating) return;
    isAnimating = true;

    const clothingResponses = [
        "Вот это конечно да! Со слов одного человека вы и вправду удивительны, но я не думала, что вы выберете это.",
        "Я считаю, что ты, моя собеседница, будете выглядеть довольно элегантно в подобном типе одежды, но лучше иногда и показывать игривую женственность.",
        "Человек без типа, это конечно самый неожиданный вариант, но, наверное, самый интересный и функциональный. Красивый человек не будет выглядеть плохо в чем угодно."
    ];

    dayQuestion2.style.display = 'none';
    setTimeout(() => {
        dialoguePanel.classList.add('show');
        thoughtText.textContent = clothingResponses[responseIndex];
        character.src = dialogues[4].sprite;
        
        
        const handleNextClick = () => {
            dialoguePanel.classList.remove('show');
            currentDialogue = 4; 
            setTimeout(() => {
                dialoguePanel.classList.add('show');
                thoughtText.textContent = dialogues[currentDialogue].text;
                character.src = dialogues[currentDialogue].sprite;
                isAnimating = false;
            }, 500);
            document.removeEventListener('click', handleNextClick);
        };
        document.addEventListener('click', handleNextClick);
    }, 500);
}

function handleResponse(dialogueIndex) {
    if (isAnimating) return;
    isAnimating = true;

    const responses = [
        "Это прекрасно, я рада, что у тебя все хорошо!",
        "Ну хоть что-то, баланс хорошего и плохого, можно гармонировать.",
        "Это очень плохая новость, жалко, что я всего лишь бот?"
    ];

    dayQuestion.style.display = 'none';
    setTimeout(() => {
        dialoguePanel.classList.add('show');
        thoughtText.textContent = responses[dialogueIndex - 4];
        character.src = dialogues[4].sprite;

        
        const handleNextClick = () => {
            currentDialogue = 3;
            thoughtText.textContent = dialogues[currentDialogue].text;
            character.src = dialogues[currentDialogue].sprite;
            isAnimating = false;
            document.removeEventListener('click', handleNextClick);
        };
        document.addEventListener('click', handleNextClick);
    }, 500);
}


['good-button', 'okay-button', 'bad-button'].forEach((id, index) => {
    document.getElementById(id)?.addEventListener('click', () => handleResponse(index + 4));
});

['open-button', 'closed-button', 'no-preference-button'].forEach((id, index) => {
    document.getElementById(id)?.addEventListener('click', () => handleClothingResponse(index));
});  


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


function createBlanksButton() {
    const button = document.createElement('button');
    button.textContent = 'Заполнить бланки';
    button.className = 'glass-button';
    button.style.opacity = '0';
    button.style.position = 'fixed';
    button.style.left = '50%';
    button.style.top = '50%';
    button.style.transform = 'translate(-50%, -50%)';
    
    button.addEventListener('click', () => {
        
        window.location.href = 'page_two/blanks.html';
    });

    document.body.appendChild(button);
    setTimeout(() => {
        button.style.opacity = '1';
        button.style.transition = 'opacity 1s ease';
    }, 1000);
}


document.addEventListener('dragstart', (e) => {
    e.preventDefault();
});


document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
});

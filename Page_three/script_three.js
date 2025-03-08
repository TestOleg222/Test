
const bgMusic = new Audio('../sounds/bg_music.mp3');
const paperSound = new Audio('../sounds/papel.mp3');
const chestSound = new Audio('../sounds/chest.mp3');


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


document.addEventListener('DOMContentLoaded', playBackgroundMusic);


const letter1 = document.getElementById('letter1');
const letter2 = document.getElementById('letter2');
const ring = document.getElementById('ring');
const letterModal = document.getElementById('letterModal');
const ringModal = document.getElementById('ringModal');
const closeBtn = document.querySelector('.close');
const letterText = document.getElementById('letterText');


const letters = {
    letter1: "Я не знаю что сказать,по поводу начала,я долго думал вообще что придумать там много планировал но в итге был измотан потому что спал всего 5 часов.Так что я просто писал то что думаю и филосовствовал,Надеюсь ничего не смутило мне просто нужно было чтобы ты поиграла в ЭТО,Не самый лучший и интересный подарок,но самый глупый,Гордись!",
    letter2: "С 8 марта тебя,честно я прсто не фантазер,но я думаю что даже очень тупым способом показал что я люблю тебя"
};


letter1.addEventListener('click', () => {
    paperSound.play();
    showLetterModal(letters.letter1);
    letter1.style.display = 'none';
});

letter2.addEventListener('click', () => {
    paperSound.play();
    showLetterModal(letters.letter2);
    letter2.style.display = 'none';
});


ring.addEventListener('click', () => {
    chestSound.play();
    ringModal.style.display = 'block';
});


function showLetterModal(text) {
    letterText.textContent = text;
    letterModal.style.display = 'block';
}


closeBtn.addEventListener('click', () => {
    letterModal.style.display = 'none';
});


window.addEventListener('click', (event) => {
    if (event.target === letterModal) {
        letterModal.style.display = 'none';
    }
    if (event.target === ringModal) {
        ringModal.style.display = 'none';
    }
});


document.getElementById('yesBtn').addEventListener('click', () => {
    ringModal.style.display = 'none';
    
});

document.getElementById('noBtn').addEventListener('click', () => {
    ringModal.style.display = 'none';
    
    ring.style.display = 'none';
});


document.addEventListener('dragstart', (e) => e.preventDefault());


document.addEventListener('contextmenu', (e) => e.preventDefault());

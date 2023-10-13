function removeTransition(e) {
  if (e.propertyName !== 'transform') return;
  e.target.classList.remove('playing');
}

function playSound(key) {
  const audio = document.querySelector(`audio[data-key="${key.dataset.key}"]`);
  if (!audio) return;

  key.classList.add('playing');
  audio.currentTime = 0;
  audio.play();
}

function addClickEventListeners() {
  const keys = Array.from(document.querySelectorAll('.key'));
  keys.forEach(key => {
    key.addEventListener('click', () => playSound(key));
    key.addEventListener('transitionend', removeTransition);
  });
}

function addTouchEventListeners() {
  const keys = Array.from(document.querySelectorAll('.key'));
  let isTouching = false;

  keys.forEach(key => {
    key.addEventListener('touchstart', () => {
      isTouching = true;
      playSound(key);
    });

    key.addEventListener('touchend', () => {
      isTouching = false;
      removeTransition({ propertyName: 'transform', target: key });
    });
  });

  // Close the audio element if the user swipes the finger off the key
  document.addEventListener('touchmove', (e) => {
    if (isTouching) {
      const touchedKey = keys.find(key => key === e.target || key.contains(e.target));
      if (!touchedKey) isTouching = false;
    }
  });
}

// Verifique o tamanho da tela e adicione os ouvintes de eventos apropriados
if (window.innerWidth <= 768) {
  addTouchEventListeners();
} else {
  addClickEventListeners();
}

// Adicione o ouvinte de evento de teclado
window.addEventListener('keydown', (e) => {
  const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (key) playSound(key);
});

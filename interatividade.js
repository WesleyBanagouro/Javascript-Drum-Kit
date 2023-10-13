var alturaTela = window.screen.height;
var larguraTela = window.screen.width;

function playSound(e) {
  audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
  tecla = document.querySelector(`div[data-key="${e.keyCode}"]`);
  if (!audio) return;
  audio.currentTime = 0;
  audio.play();
  tecla.classList.add("playing");
}

addEventListener("keydown", playSound);

if (alturaTela <= 700 && larguraTela <= 400) {
  addEventListener("touchstart", function (e) {
    // Verifique se o evento de toque foi acionado em uma tecla
    const target = e.target.closest(".key");
    if (target) {
      const keyCode = target.getAttribute("data-key");
      playSound({ keyCode });
      // Adicione o método preventDefault() para evitar que o evento padrão seja executado
      e.preventDefault();
    }
  });
}


const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("transitionend", removeTransition);
  key.addEventListener("click", () => {
    const keyCode = key.getAttribute("data-key");
    playSound({ keyCode });
  });
});

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

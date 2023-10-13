var alturaTela = window.screen.height;
var larguraTela = window.screen.width;

function playSound(e) {
  let keyCode;
  if (e.keyCode) {
    keyCode = e.keyCode;
  } else if (e.target && e.target.getAttribute("data-key")) {
    keyCode = e.target.getAttribute("data-key");
  } else {
    return;
  }

  audio = document.querySelector(`audio[data-key="${keyCode}"]`);
  tecla = document.querySelector(`div[data-key="${keyCode}"]`);

  if (!audio) return;

  if (tecla.classList.contains("playing")) return;

  audio.currentTime = 0;
  audio.play();

  tecla.classList.add("playing");
}

const keys = document.querySelectorAll(".key");
keys.forEach((key) => {
  key.addEventListener("transitionend", removeTransition);
  key.addEventListener("click", () => {
    playSound({ target: key });
  });
});



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

function removeTransition(e) {
  if (e.propertyName !== "transform") return;
  this.classList.remove("playing");
}

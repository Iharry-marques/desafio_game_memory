const emojis = [
    "🐱", "🐱", "🐵", "🐵", "🐺", "🐺", "🐶", "🐶",
    "🦁", "🦁", "🐸", "🐸", "🐲", "🐲", "🐋", "🐋"
  ];
  
  let openCards = [];
  let moves = 0;
  let timeElapsed = 0;
  let timer = null;
  let isGameStarted = false;
  
  function startTimer() {
    if (!isGameStarted) {
      isGameStarted = true;
      timer = setInterval(() => {
        timeElapsed++;
        document.getElementById('time').textContent = timeElapsed;
      }, 1000);
    }
  }
  
  function updateMoves() {
    moves++;
    document.getElementById('moves').textContent = moves;
  }
  
  function resetGame() {
    // Limpar o timer
    clearInterval(timer);
    timeElapsed = 0;
    moves = 0;
    isGameStarted = false;
    openCards = [];
    
    // Resetar contadores
    document.getElementById('time').textContent = '0';
    document.getElementById('moves').textContent = '0';
    
    // Limpar e recriar o tabuleiro
    const gameContainer = document.querySelector('.game');
    gameContainer.innerHTML = '';
    
    // Embaralhar e criar novas cartas
    let shuffleEmojis = emojis.sort(() => (Math.random() > 0.5 ? 2 : -1));
    
    for (let i = 0; i < emojis.length; i++) {
      let box = document.createElement("div");
      box.className = "item";
      box.innerHTML = shuffleEmojis[i];
      box.onclick = handleClick;
      gameContainer.appendChild(box);
    }
  }
  
  function handleClick() {
    if (!isGameStarted) {
      startTimer();
    }
    
    if (openCards.length < 2 && !this.classList.contains('boxOpen') && !this.classList.contains('boxMatch')) {
      this.classList.add("boxOpen");
      openCards.push(this);
      
      if (openCards.length === 2) {
        updateMoves();
        setTimeout(checkMatch, 500);
      }
    }
  }
  
  function checkMatch() {
    if (openCards[0].innerHTML === openCards[1].innerHTML) {
      openCards[0].classList.add("boxMatch");
      openCards[1].classList.add("boxMatch");
    } else {
      openCards[0].classList.remove("boxOpen");
      openCards[1].classList.remove("boxOpen");
    }
    
    openCards = [];
    
    if(document.querySelectorAll(".boxMatch").length === emojis.length) {
      clearInterval(timer);
      setTimeout(() => {
        alert(`Parabéns! Você venceu!\nTempo: ${timeElapsed} segundos\nJogadas: ${moves}`);
      }, 300);
    }
  }
  
  // Inicializar o jogo
  window.onload = resetGame;
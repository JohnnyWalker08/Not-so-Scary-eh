// script.js

// Define the questions, answers, and game state variables
const questions = [
    { question: "Who is the best player in the world?", answer: "ronaldo" },
    { question: "Who is my favourite actress?", answer: ["park shin hye", "jung so min"] },
    { question: "Who is the Greatest of all time?", answer: "cristiano ronaldo" },
  ];
  let currentQuestionIndex = 0;
  let attempts = 3;
  let timer = 25;
  let gameOver = false;
  let intervalId;
  
  // Start the timer countdown
  function startTimer() {
    intervalId = setInterval(() => {
      timer--;
      document.getElementById("time").textContent = timer;
  
      if (timer === 20 || timer === 10) {
        showWarning(timer);
      }
      
      if (timer === 0) {
        clearInterval(intervalId);
        endGame("Time's up! Shutting down...");
      }
    }, 1000);
  }
  
  // Show warning when time is 20 or 10 seconds left
  function showWarning(secondsLeft) {
    const popup = document.getElementById("warning-popup");
    document.getElementById("warning-text").textContent = `${secondsLeft} seconds left!`;
    popup.classList.remove("hidden");
    setTimeout(() => popup.classList.add("hidden"), 2000);
  }
  
  // Submit a guess and check the answer
  function submitGuess() {
    if (gameOver) return;
  
    const guessInput = document.getElementById("guessInput");
    const message = document.getElementById("message");
    const remainingTries = document.getElementById("remainingTries");
  
    let userGuess = guessInput.value.trim().toLowerCase();
    guessInput.value = "";
  
    const correctAnswer = questions[currentQuestionIndex].answer;
    const isCorrect = Array.isArray(correctAnswer)
      ? correctAnswer.includes(userGuess)
      : userGuess === correctAnswer;
  
    if (isCorrect) {
      message.textContent = "Correct! You'll Get to live for a while...";
      message.style.color = "green";
      nextQuestion();
    } else {
      attempts--;
      if (attempts > 0) {
        message.textContent = `Wrong guess, seems like someone wanna die! ${attempts} attempts left.`;
        message.style.color = "red";
        remainingTries.textContent = `Attempts left: ${attempts}`;
      } else {
        endGame("Too many incorrect answers. Shutting down...");
      }
    }
  }
  
  // Move to the next question or end game if completed
  function nextQuestion() {
    clearInterval(intervalId);
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      attempts = 3;
      timer = 25;
      document.getElementById("question").textContent = questions[currentQuestionIndex].question;
      document.getElementById("time").textContent = timer;
      document.getElementById("remainingTries").textContent = `Attempts left: ${attempts}`;
      startTimer();
    } else {
      endGame("Congratulations! Game Cleared!");
    }
  }
  
  // End the game with a message and optional shutdown
  function endGame(messageText) {
    gameOver = true;
    document.getElementById("message").textContent = messageText;
    document.getElementById("remainingTries").textContent = "";
    clearInterval(intervalId);
  
    // Close the window and shut down (this may be restricted in most environments)
    setTimeout(() => {
      window.close();
      // Additional shutdown code would typically require backend support or elevated permissions
    }, 3000);
  }
  
  // Initialize the game
  document.getElementById("question").textContent = questions[currentQuestionIndex].question;
  document.getElementById("remainingTries").textContent = `Attempts left: ${attempts}`;
  startTimer();
  
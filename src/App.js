import React, { useState } from 'react';
import Settings from './Settings';
import Game from './Game';
import './App.css';
import { app, analytics } from './firebase'; // Import Firebase
import { click, gameSound } from './sound';

const App = () => {
  const [mode, setMode] = useState(null);
  const [operations, setOperations] = useState({});
  const [timeLimit, setTimeLimit] = useState(30);
  const [questionCount, setQuestionCount] = useState(10);
  const [maxDigits, setMaxDigits] = useState(2);
  const [result, setResult] = useState(null);
  const [isGameOver, setIsGameOver] = useState(false);
  const [error, setError] = useState(''); // Add error state

  const handleStart = (selectedMode, selectedOperations, selectedTimeLimit, selectedQuestionCount, selectedMaxDigits) => {
    // Check if at least one operation is selected
    if (!selectedOperations.addition && !selectedOperations.subtraction && !selectedOperations.multiplication && !selectedOperations.division) {
      setError('Please select at least one operation.');
      return;
    }
    else {
      setError(''); // Clear the error message
      gameSound();
    }

    setMode(selectedMode);
    setOperations(selectedOperations);
    setTimeLimit(selectedTimeLimit);
    setQuestionCount(selectedQuestionCount);
    setMaxDigits(selectedMaxDigits);
    setResult(null);
    setIsGameOver(false);
  };

  const handleGameOver = (finalResult) => {
    gameSound();
    setResult(finalResult);
    setMode(null); // Exit game mode after showing results
    setIsGameOver(true);
  };

  const handleExit = () => {
    setMode(null); // Go back to settings screen
    setResult(null);
    setIsGameOver(false); // Reset game over state
  };

  const handlePlayAgain = () => {
    setMode(null); // Reset the mode
    setResult(null); // Clear previous result
    setIsGameOver(false); // Reset game over state
  };

  const handleCloseError = () => {
    setError(''); // Clear the error message
  };

  return (
    <div className='App-header'>
      {!mode && !isGameOver && (
        <>
          <Settings onStart={handleStart} />
          {error && (
            <>
              <div className="error-overlay"></div>
              <div className="error-popup">
                <p>{error}</p>
                <button onClick={handleCloseError}>Close</button>
              </div>
            </>
          )}
        </>
      )}
      {mode && !isGameOver && (
        <Game
          mode={mode}
          operations={operations}
          timeLimit={timeLimit}
          questionCount={questionCount}
          maxDigits={maxDigits}
          onGameOver={handleGameOver}
          onExit={handleExit}
        />
      )}
      {isGameOver && (
        <div className="result-container">
          <h1>Game Over</h1>
          <header className="result">{result}</header>
          <button className="bt" onClick={() => { handlePlayAgain(); click(); }}>
            <span className="shadow"></span>
            <span className="depth"></span>
            <span className="content">Play Again</span>
            Play Again
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
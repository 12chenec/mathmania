import React, { useState, useEffect } from 'react';
import './Settings.css';

const Game = ({ mode, operations, timeLimit, questionCount, maxDigits, onGameOver, onExit }) => {
    const [problem, setProblem] = useState({});
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [startTime, setStartTime] = useState(Date.now());
    const [timeUsed, setTimeUsed] = useState(0);

    const generateMathProblem = (maxDigits, operations) => {
        const availableOperators = [];
        if (operations.addition) availableOperators.push('+');
        if (operations.subtraction) availableOperators.push('-');
        if (operations.multiplication) availableOperators.push('*');
        if (operations.division) availableOperators.push('/');
      
        const maxNumber = Math.pow(10, maxDigits) - 1;
        const num1 = Math.floor(Math.random() * maxNumber) + 1;
        const num2 = Math.floor(Math.random() * maxNumber) + 1;
        const operator =
          availableOperators[
            Math.floor(Math.random() * availableOperators.length)
          ];
      
        let problem;
        let answer;
      
        if (operator === '/') {
          let divisor, dividend;
          do {
            divisor = Math.floor(Math.random() * maxNumber) + 1;
            dividend = divisor * (Math.floor(Math.random() * maxNumber) + 1);
          } while (dividend > maxNumber || divisor > maxNumber);
        
          problem = `${dividend} ${operator} ${divisor}`;
          answer = dividend / divisor;
        } else {
          problem = `${num1} ${operator} ${num2}`;
          answer = eval(problem); // Use eval cautiously
        }
      
        return { problem, answer };
      };
      

  

      useEffect(() => {
        setProblem(generateMathProblem(maxDigits, operations));
    
        if (mode === 'time') {
          const timer = setInterval(() => {
            setTimeLeft((prev) => {
              if (prev <= 1) {
                clearInterval(timer);
                onGameOver(score);
              }
              return prev - 1;
            });
          }, 1000);
          return () => clearInterval(timer);
        }
      }, [mode, onGameOver, score, timeLimit, maxDigits, operations]);


      const handleInputChange = (e) => {
        setUserInput(e.target.value);
        if (parseFloat(e.target.value) === problem.answer) {
          const endTime = Date.now();
          const timeUsed = (endTime - startTime) / 1000; // Time used in seconds
          setTimeUsed(timeUsed);
    
          if (mode === 'questions') {
            setScore((prev) => parseFloat((prev + timeUsed).toFixed(2))); // Accumulate time used as score and round to two decimal points
          } else {
            setScore((prev) => prev + 1); // Increment score normally
          }
    
          setQuestionsAnswered((prev) => prev + 1);
          setProblem(generateMathProblem(maxDigits, operations));
          setUserInput('');
          setStartTime(Date.now()); // Reset start time for the next question
        }
      };
    

      useEffect(() => {
        if (mode === 'questions' && questionsAnswered >= questionCount) {
          onGameOver(score);
        }
      }, [questionsAnswered, mode, questionCount, onGameOver, timeLeft]);
    
      return (
        <div>
          <button className="bt" onClick={onExit} style={{ position: 'absolute', top: 10, right: 10 }}>
            <span class="shadow"></span>
            <span class="depth"></span>
            <span class="content">Exit</span>
            Exit
          </button>

          {mode === 'questions' && <h2>Time Used: {timeUsed}s </h2>}
          {mode ==='time' && <h2>Score: {score}</h2>}

          <div className="problem-container">

          {mode === 'time' && <h3>Time Left: {timeLeft}s</h3>}
          {mode === 'questions' && (
            <h3>Questions Answered: {questionsAnswered}/{questionCount}</h3>
          )}
          <div className="qcontainer">
          <p1>{problem.problem}</p1>
          <input
            type="number"
            value={userInput}
            onChange={handleInputChange}
            autoFocus
          />
          </div>

          </div>

        </div>
      );
    };
    
    export default Game;
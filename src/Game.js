import React, { useState, useEffect, useRef } from 'react';
import './btStyle.css';
import './Game.css';
import { generateProblem } from './problem';
import { createTimer, utils } from 'animejs';
import { click } from './sound';

const Game = ({ mode, operations, timeLimit, questionCount, maxDigits, onGameOver, onExit }) => {
    const [problem, setProblem] = useState({});
    const [userInput, setUserInput] = useState('');
    const [score, setScore] = useState(0);
    const [timeLeft, setTimeLeft] = useState(timeLimit);
    const [questionsAnswered, setQuestionsAnswered] = useState(0);
    const [timeUsed, setTimeUsed] = useState(0);
    const scoreRef = useRef(score);
    useEffect(() => {
        scoreRef.current = score;
    }, [score]);

    useEffect(() => {
        setProblem(generateProblem(maxDigits, operations));

        const [$time] = utils.$('.time');
        let timerInstance;

        if (mode === 'time') {
            timerInstance = createTimer({
                duration: timeLimit * 1000,
                onComplete: () => onGameOver(`Your Score: ${scoreRef.current}`),
                onUpdate: self => $time.innerHTML = self.currentTime,
                onUpdate: self => setTimeLeft(((timeLimit * 1000 - self.currentTime) / 1000)),
            });
        } else {
            timerInstance = createTimer({
                autoplay: true,
                onUpdate: self => $time.innerHTML = self.currentTime,
                onUpdate: self => setTimeUsed(self.currentTime / 1000),
            });
        }

        return () => {
            if (timerInstance && typeof timerInstance.pause === 'function') {
                timerInstance.pause();
            }
        };
    }, [mode, onGameOver, timeLimit, maxDigits, operations]);

    const handleInputChange = (e) => {
        setUserInput(e.target.value);
        if (parseFloat(e.target.value) === problem.a) {
            setScore((prev) => prev + 1); // Increment score
            setQuestionsAnswered((prev) => prev + 1);
            setProblem(generateProblem(maxDigits, operations));
            setUserInput('');
        }
    };

    useEffect(() => {
        if (mode === 'questions' && questionsAnswered >= questionCount) {
            onGameOver(`Time Used: ${timeUsed.toFixed(1)}`);
        }
    }, [questionsAnswered, mode, questionCount, onGameOver, timeUsed]);

    return (
        <div>
            <button className="bt" onClick={() => { click(); onExit(); }} style={{ position: 'absolute', top: 10, right: 10 }}>
                <span class="shadow"></span>
                <span class="depth"></span>
                <span class="content">Exit</span>
                Exit
            </button>

            {mode === 'questions' &&
                <div className="timer-container">
                    <h2>Time Used:</h2>
                    <header className="timer-header">{timeUsed.toFixed(1)}s</header>
                </div>
            }
            {mode === 'time' && <h2>Score: {score}</h2>}

            <div className="problem-container">

                {mode === 'time' &&
                    <div className="timer-container">
                        <h3>Time Left:</h3>
                        <header className="timer-header2">{timeLeft.toFixed(1)}s</header>
                    </div>}
                {mode === 'questions' && (<h3>Questions Answered: {questionsAnswered}/{questionCount}</h3>)}
                <div className="qcontainer">
                    <p1>{problem.q}</p1>
                    <input
                        type="number"
                        inputMode="numeric"
                        pattern="[0-9]*"
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
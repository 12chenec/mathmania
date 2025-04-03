import React, { useState } from 'react';
import './Settings.css';

const Settings = ({ onStart }) => {
  const [mode, setMode] = useState('time');
  const [operations, setOperations] = useState({
    addition: true,
    subtraction: false,
    multiplication: false,
    division: false,
  });
  const [timeLimit, setTimeLimit] = useState(10); // Default time
  const [questionCount, setQuestionCount] = useState(10); // Default question count
  const [maxDigits, setMaxDigits] = useState(1); // Default max digits

  const handleOperationChange = (operation) => {
    setOperations((prev) => ({
      ...prev,
      [operation]: !prev[operation],
    }));
  };

  const isAtLeastOneOperationSelected = Object.values(operations).some(Boolean);

  return (
    <div>
      <header className='settingsHeader'>
        MATH MANIA
      </header>
      <div>
        <h3>Select Game Mode</h3>
        <div className="button-container">
          <label className='bt'>
            <input
              type="radio"
              value="time"
              checked={mode === 'time'}
              onChange={() => setMode('time')}
            />
            <span className="shadow"></span>
            <span className="depth"></span>
            <span className="content">Time</span>
            Questions
          </label>
          <label className="bt">
            <input
              type="radio"
              value="questions"
              checked={mode === 'questions'}
              onChange={() => setMode('questions')}
            />
            <span className="shadow"></span>
            <span className="depth"></span>
            <span className="content">Questions</span>
            Questions
          </label>
        </div>
      </div>

      {mode === 'time' && (
        <div>
          <h3>Time Limit</h3>
          <div className="slider-container">
            <input
              type="range"
              min="10"
              max="60"
              value={timeLimit}
              onChange={(e) => setTimeLimit(Number(e.target.value))}
            />
          </div>
          <p className='p'>{timeLimit} seconds</p>
        </div>
      )}

      {mode === 'questions' && (
        <div>
          <h3>Number of Questions</h3>
          <div className="slider-container">
            <input
              type="range"
              min="5"
              max="50"
              value={questionCount}
              onChange={(e) => setQuestionCount(Number(e.target.value))}
            />
          </div>
          <p className='p'>{questionCount} questions</p>
        </div>
      )}

      <div className="button-container">
        <div>
          <h3>Max Digits</h3>
          <div className="slider-container">
            <input
              type="range"
              min="1"
              max="5"
              value={maxDigits}
              onChange={(e) => setMaxDigits(Number(e.target.value))}
            />
          </div>
          <p className='p'>Maximum digits: {maxDigits}</p>
        </div>

        <h3></h3>

        <div>
          <h3>Select Operations</h3>
          <div className="button-container">
            <label class="bt">
              <input
                type="checkbox"
                checked={operations.addition}
                onChange={() => handleOperationChange('addition')}
              />
              <span class="shadow"></span>
              <span class="depth"></span>
              <span class="content">+</span>
              +
            </label>
            <label className="bt">
              <input
                type="checkbox"
                checked={operations.subtraction}
                onChange={() => handleOperationChange('subtraction')}
              />
              <span class="shadow"></span>
              <span class="depth"></span>
              <span class="content">-</span>
              -
            </label>
            <label className='bt'>
              <input
                type="checkbox"
                checked={operations.multiplication}
                onChange={() => handleOperationChange('multiplication')}
              />
              <span class="shadow"></span>
              <span class="depth"></span>
              <span class="option"></span>
              <span class="content">×</span>
              ×
            </label>
            <label className='bt'>
              <input
                type="checkbox"
                checked={operations.division}
                onChange={() => handleOperationChange('division')}
              />
              <span class="shadow"></span>
              <span class="depth"></span>
              <span class="option"></span>
              <span class="content">÷</span>
              ÷
            </label>
          </div>
        </div>
      </div>

      <h4></h4>

      <div className="button-container">
        <button class="btn"
          onClick={() => {
            
              onStart(mode, operations, timeLimit, questionCount, maxDigits)
            
          }}
          // disabled={!isAtLeastOneOperationSelected}
        >
          <span class="shadow"></span>
          <span class="depth"></span>
          <span class="content">Start</span>
        </button>
      </div>
      <h4></h4>
    </div>
  );
};

export default Settings;

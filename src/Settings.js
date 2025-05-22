import React, { useState } from 'react';
import './Settings.css';
import './btStyle.css';
import { click, dragSound, gameSound } from './sound';

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

  return (
    <div>
      <header className='settingsHeader'>
        MATH MANIA
      </header>
      <div>
        <h3>Select Game Mode</h3>
        <div className="button-container">
          <label className="bt">
            <input
              type="radio"
              value="time"
              checked={mode === 'time'}
              onChange={() => { click(); setMode('time'); }}
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
              onChange={() => { click(); setMode('questions'); }}
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
              onChange={(e) => { dragSound(); setTimeLimit(Number(e.target.value)); }}
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
              onChange={(e) => { dragSound(); setQuestionCount(Number(e.target.value)) }}
            />
          </div>
          <p className='p'>{questionCount} questions</p>
        </div>
      )}

      <div className="center-wrapper">
        <div className="side-by-side">
          <div className="setting-container">
            <h3>Max Digits</h3>
            <div className="slider-container">
              <input
                type="range"
                min="1"
                max="5"
                value={maxDigits}
                onChange={(e) => { dragSound(); setMaxDigits(Number(e.target.value)) }}
              />
            </div>
            <p className='p'>Maximum digits: {maxDigits}</p>
          </div>
          <div className="setting-container">
            <h3>Select Operations</h3>
            <div className="button-container">
              <label className="bt">
                <input
                  type="checkbox"
                  checked={operations.addition}
                  onChange={() => { click(); handleOperationChange('addition') }}
                />
                <span className="shadow"></span>
                <span className="depth"></span>
                <span className="content">+</span>
                +
              </label>
              <label className="bt">
                <input
                  type="checkbox"
                  checked={operations.subtraction}
                  onChange={() => { click(); handleOperationChange('subtraction') }}
                />
                <span className="shadow"></span>
                <span className="depth"></span>
                <span className="content">-</span>
                -
              </label>
              <label className="bt">
                <input
                  type="checkbox"
                  checked={operations.multiplication}
                  onChange={() => { click(); handleOperationChange('multiplication') }}
                />
                <span className="shadow"></span>
                <span className="depth"></span>
                <span className="option"></span>
                <span className="content">×</span>
                ×
              </label>
              <label className="bt">
                <input
                  type="checkbox"
                  checked={operations.division}
                  onChange={() => { click(); handleOperationChange('division') }}
                />
                <span className="shadow"></span>
                <span className="depth"></span>
                <span className="option"></span>
                <span className="content">÷</span>
                ÷
              </label>
            </div>
          </div>
        </div>
      </div>

      <div className="button-container">
        <button className="btn"
          onClick={() => {
            click();
            onStart(mode, operations, timeLimit, questionCount, maxDigits)
          }}
        >
          <span className="shadow"></span>
          <span className="depth"></span>
          <span className="content">Start</span>
        </button>
      </div>
      <h4></h4>
    </div>
  );
};

export default Settings;

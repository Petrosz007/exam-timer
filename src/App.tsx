import React, { useState } from 'react';
import './App.css';
import { Timer } from './components/Timer';

function App() {
  const [questions, setQuestions] = useState(10);
  const [minutes, setMinutes] = useState(60);
  const [showTimer, setShowTimer] = useState(false);

  return (
    <div className="container">
      <div className="content">
        <div className="inputGroup">
          <label htmlFor="questions">Questions</label>
          <input type="number" name="questions" min={0} value={questions} onChange={x => setQuestions(x.target.valueAsNumber)} />
        </div>
        <div className="inputGroup">
          <label htmlFor="minutes">Minutes</label>
          <input type="number" name="minutes" min={0} value={minutes} onChange={x => setMinutes(x.target.valueAsNumber)} />
        </div>
        <button onClick={() => setShowTimer(x => !x)} className="startStop">
          {showTimer ? 'Stop': 'Start'}
          </button>

        {showTimer && 
          <Timer duration={minutes * 60 * 1000} questions={questions} />}
      </div>
    </div>
  );
}

export default App;

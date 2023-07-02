import { TextField, Radio, FormControlLabel } from '@mui/material';
import { useState } from 'react';

function QuizForm() {
  const [answerOptions, setAnswerOptions] = useState([
    { answer: '', isCorrect: false },
    { answer: '', isCorrect: false },
    { answer: '', isCorrect: false },
    { answer: '', isCorrect: false },
  ]);

  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerChange = (index) => (event) => {
    const newOptions = [...answerOptions];
    newOptions[index].answer = event.target.value;
    setAnswerOptions(newOptions);
  };

  const handleRadioChange = (index) => (event) => {
    setSelectedAnswer(index);
    const newOptions = [...answerOptions];
    newOptions.forEach((option, i) => {
      newOptions[i].isCorrect = i === index;
    });
    setAnswerOptions(newOptions);
  };

  return (
    <form>
      {answerOptions.map((option, index) => (
        <div key={index}>
          <TextField label={`Answer ${index + 1}`} value={option.answer} onChange={handleAnswerChange(index)} />
          <FormControlLabel
            control={<Radio checked={selectedAnswer === index} onChange={handleRadioChange(index)} value="true" />}
            label="Correct"
          />
        </div>
      ))}

      {answerOptions.map((option, index) => (
        <div key={index}>
          {option.answer} - {option.isCorrect ? 'Correct' : 'Incorrect'}
        </div>
      ))}
    </form>
  );
}

export default QuizForm;

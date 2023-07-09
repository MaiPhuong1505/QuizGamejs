import React, { useEffect, useState } from 'react';
import './QuestionInGame.scss';
import { ANSWER_TYPE, PLAYING_PROGRESS, ROLE } from '../../../utils/constants';
import { answerIcon } from '../answer';
// import { PLAYING_PROGRESS, ROLE } from '../../../utils/contants';

const countSelectedAnswers = (question, selectedData) => {
  console.log('selectedData in countSelectedAnswers', selectedData);
  let counts = question?.answerOptions.map((q, index) => ({
    answer: q.answer,
    count: 0,
    optionIndex: index,
    percent: 0,
  }));
  console.log('counts countSelectedAnswers', counts);
  let total = 0;
  selectedData.forEach((d) => {
    if (d.selected) {
      const index = counts.findIndex((c) => c.answer === d.selected.answer);
      console.log('index countSelectedAnswers', index);
      if (index === -1) {
        console.log("User didn't select an answer");
        // counts.push({
        //   answer: d.selected.answer,
        //   count: 1,
        //   optionIndex: counts.length,
        //   percent: Math.round((1 / counts.length) * 100),
        // });
      } else {
        counts[index].count++;
      }
      const option = question.answerOptions.find((o) => o.answer === d.selected.answer);
      console.log('option countSelectedAnswers', option);

      if (option) {
        counts[index].optionIndex = question.answerOptions.indexOf(option);
        console.log('option', counts[index].optionIndex);
      }
      total++;
    }
  });

  const chartData = counts.map((c) => ({
    answer: c.answer,
    count: c.count,
    optionIndex: c.optionIndex,
    percent: Math.round((c.count / total) * 100),
  }));

  console.log(chartData);
  return chartData;
};
const QuestionInGame = ({ question, progress, role, answersChart, result }) => {
  const isCorrect = result?.answerSelected?.isCorrect;
  const isSelected = result?.answerSelected?.isSelected;
  console.log('Answer chart - question in game', answersChart);
  console.log('Result - question in game', result);
  const [chart, setChart] = useState(answersChart);
  const [questionState, setQuestionState] = useState(question);
  const [resultState, setResultState] = useState(result);
  const isAnswerTime = progress === PLAYING_PROGRESS.ANSWER_TIME;
  const isAdminResult = progress === PLAYING_PROGRESS.SHOW_RESULT && role === ROLE.HOST;
  const isPlayerResult = progress === PLAYING_PROGRESS.SHOW_RESULT && role === ROLE.PLAYER;

  useEffect(() => {
    setQuestionState(question);
  }, [question]);

  useEffect(() => {
    setResultState(result);
  }, [result]);

  useEffect(() => {
    if (progress === PLAYING_PROGRESS.SHOW_RESULT) {
      const chartData = countSelectedAnswers(question, answersChart);
      setChart(chartData);
    }
  }, [answersChart, question, progress]);

  return (
    <div className="question-wrapper">
      <div className="header"></div>
      <div className="question-inner">
        <div className="question">{questionState?.question}</div>
        <div className="info">
          {isAnswerTime && questionState?.image && (
            <div className="info-image">
              <img src={questionState?.image} />
            </div>
          )}

          {isAdminResult && (
            <div className="info-chart">
              {chart.map((answer, index) => {
                return (
                  <div className="info-chart-item" key={index}>
                    <div className="info-chart-percent">
                      <div className="current-percent" style={{ height: `${answer.percent}%` }}></div>
                    </div>
                    <div className="info-chart-title">
                      {answerIcon[answer.optionIndex]} {answer.count}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          {isPlayerResult && (
            <>
              {isCorrect ? (
                <div className="info-point corect">+{resultState.latestScore} points</div>
              ) : (
                <div className="info-point incorrect">Incorrect</div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default QuestionInGame;

import {
  CalendarMonth,
  Help,
  Person,
  RecordVoiceOver,
  CheckCircle,
  Radio,
  RadioButtonUnchecked,
} from '@mui/icons-material';
import { Divider, Grid, Typography } from '@mui/material';
import { default as React } from 'react';
import './viewHistoryDetail.scss';

import { Box } from '@mui/material';

const ViewHistoryDetail = () => {
  return (
    <>
      <Box className="view__result__detail">
        <div className="view__result__detail--header">QuizGame</div>
        <Grid container xs={12} className="view__result__detail--inner" columnGap={8}>
          <Grid item xs={3} className="quiz-info">
            <Typography className="quiz-info-title" variant="h4">
              Quiz 1
            </Typography>
            <Divider />
            <div className="quiz-info-item">
              <CalendarMonth className="quiz-info-icon" />
              <div className="quiz-info-text">April 17, 2023 2:40 PM</div>
            </div>
            <div className="quiz-info-item">
              <RecordVoiceOver className="quiz-info-icon" />
              <div className="quiz-info-text">Hosted by User1</div>
            </div>
            <div className="quiz-info-item">
              <Person className="quiz-info-icon" />
              <div className="quiz-info-text">15 players</div>
            </div>
            <div className="quiz-info-item">
              <Help className="quiz-info-icon" />
              <div className="quiz-info-text">15 questions</div>
            </div>
          </Grid>
          <Grid item xs={8} className="question-detail">
            <div className="question">
              <div className="question-result">
                <Typography className="question-title">Question 1</Typography>
                <Divider />
                <div className="question-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, placeat.
                </div>
                <div className="question-answer">
                  <div className="question-answer-item">
                    <CheckCircle className="question-answer-icon correct" />
                    <div className="question-answer-text">Option 1</div>
                  </div>
                  <div className="question-answer-item">
                    <RadioButtonUnchecked className="question-answer-icon incorrect" />
                    <div className="question-answer-text">Option 2</div>
                  </div>
                  <div className="question-answer-item">
                    <RadioButtonUnchecked className="question-answer-icon incorrect" />
                    <div className="question-answer-text">Option 3</div>
                  </div>
                  <div className="question-answer-item">
                    <RadioButtonUnchecked className="question-answer-icon incorrect" />
                    <div className="question-answer-text">Option 4</div>
                  </div>
                </div>
              </div>
              <div className="question-count">
                <div className="question-count-item">
                  <div className="question-count-text question-count-text-correct">Correct</div>
                  <div className="question-count-number">14</div>
                </div>
                <div className="question-count-item">
                  <div className="question-count-text question-count-text-incorrect">Incorrect</div>
                  <div className="question-count-number">1</div>
                </div>
              </div>
            </div>
            <div className="question">
              <div className="question-result">
                <Typography className="question-title">Question 1</Typography>
                <Divider />
                <div className="question-content">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem, placeat.
                </div>
                <div className="question-answer">
                  <div className="question-answer-item">
                    <CheckCircle className="question-answer-icon correct" />
                    <div className="question-answer-text">Option 1</div>
                  </div>
                  <div className="question-answer-item">
                    <RadioButtonUnchecked className="question-answer-icon incorrect" />
                    <div className="question-answer-text">Option 2</div>
                  </div>
                  <div className="question-answer-item">
                    <RadioButtonUnchecked className="question-answer-icon incorrect" />
                    <div className="question-answer-text">Option 3</div>
                  </div>
                  <div className="question-answer-item">
                    <RadioButtonUnchecked className="question-answer-icon incorrect" />
                    <div className="question-answer-text">Option 4</div>
                  </div>
                </div>
              </div>
              <div className="question-count">
                <div className="question-count-item">
                  <div className="question-count-text question-count-text-correct">Correct</div>
                  <div className="question-count-number">14</div>
                </div>
                <div className="question-count-item">
                  <div className="question-count-text question-count-text-incorrect">Incorrect</div>
                  <div className="question-count-number">1</div>
                </div>
              </div>
            </div>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ViewHistoryDetail;

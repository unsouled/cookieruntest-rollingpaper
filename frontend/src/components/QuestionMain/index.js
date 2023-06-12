import React, { useState, useRef } from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import Layout from '/src/components/Layout';
import Button from '/src/components/Button';
import hash from '/src/utils/hash';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  padding-top: 70px
`;

const Banner = styled.div`
  background: #6B3F17;
  height: 70px;
  margin: 0 -1rem;
  margin-bottom: -70px;
`;

const Questions = styled.div`
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
flex-direction: column;

`;

const QuestionText = styled.span`
  color: ${props => props.color};
  font-size: 20px;
  font-weight: 900;
`;

const Answers = styled.ul`
  display: flex;
  flex-direction: column;
  margin: 0;
  padding: 0;
  list-style: none;
  height: 200px;
`;

const AnswerButton = styled(Button)`
  height: 70px;
  margin: 12px 0;
`;

const colors = [
  '#9B5ED7',
  '#59C7D3',
  '#9FD33A',
  '#F4C938',
  '#E07785',
  '#54A3DE',
  '#ED8E2B',
  '#59C7D3',
  '#E06522',
];

const Progress = ({ progress }) => (
  <div>
    {progress}
  </div>
);

const QuestionMain = ({ lang, questions }) => {
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const next = () => {
    setCurrentQuestionIdx(currentQuestionIdx + 1);
  }
  const currentQuestion = questions[currentQuestionIdx];
  const selectedAnswers = useRef({});
  const doAnswer = (value) => {
    const current = selectedAnswers.current;
    current[value] |= 0;
    current[value] += 1;
    if (currentQuestionIdx !== questions.length - 1) {
      next();
    } else {
      let abcd = '';
      abcd += (current['I'] || 0) > (current['E'] || 0) ? 'I' : 'E';
      abcd += (current['T'] || 0) > (current['F'] || 0) ? 'T' : 'F';
      abcd += (current['P'] || 0) > (current['J'] || 0) ? 'P' : 'J';
      navigate(`/${lang}/result/${hash(abcd)}`);
    }
  };

  return (
    <Layout>
      <Banner />
      <Main>
        <Progress progress={100 * (currentQuestionIdx / questions.length)} />
        <Questions>
          <QuestionText color={colors[currentQuestionIdx]}>Q{currentQuestion.order}.</QuestionText> 
          <p>
            {currentQuestion.question}
          </p>
        </Questions>
        <Answers>
          {currentQuestion.answers.map((answer) => (
            <AnswerButton onClick={() => doAnswer(answer.value)}>
              {answer.text}
            </AnswerButton>
          ))}
        </Answers>
      </Main>
    </Layout>
  );
}

export default QuestionMain;

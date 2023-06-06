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
`;

const Questions = styled.div`
  flex: 1;
`;

const Answers = styled.div`
  display: flex;
  flex-direction: column;
`;

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
      <Main>
        <Progress progress={100 * (currentQuestionIdx / questions.length)} />
        <Questions>
          Q{currentQuestion.order}. {currentQuestion.question}
        </Questions>
        <Answers>
          {currentQuestion.answers.map((answer) => (
            <Button onClick={() => doAnswer(answer.value)}>{answer.text}</Button>
          ))}
        </Answers>
      </Main>
    </Layout>
  );
}

export default QuestionMain;

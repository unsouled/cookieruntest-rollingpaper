import React, { useState, useEffect, useContext, useRef } from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import { StaticImage } from 'gatsby-plugin-image';
import Layout from '/src/components/Layout';
import Button from '/src/components/Button';
import hash from '/src/utils/hash';
import LocalizedMessageContext from '/src/contexts/LocalizedMessageContext';

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

const QuestionNumber = styled.span`
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
  background: linear-gradient(90deg, #925318 0%, #6B4026 97.86%);
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

const Note = styled.div`
  flexDirection: column;
  width: 163px;
  margin: auto;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 1;
  background: #fff;
  height: 188px;
  word-wrap: break-word;
  word-break: break-word;
  box-shadow: inset 0px -3px 0px #DCC9BA;
  overflow: hidden;
`;

const Progress = ({ progress }) => (
  <div css={{ paddingTop: 20, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <StaticImage
      src="../../images/jelly-beans@3x.png"
      placeholder="none"
      width={303}
      height={48}
    />
  </div>
);

const Analyzing = () => {
  const localizedMessages = useContext(LocalizedMessageContext) || {};
  const [dotdotdot, setDotDotDot] = useState('');
  useEffect(() => {
      const interval = setTimeout(() => setDotDotDot(dotdotdot + '.'), 1300);
      return () => {
        clearTimeout(interval);
      }
  }, [dotdotdot]);
  return (
    <div css={{ flexDirection: 'column', minHeight: '100%', display: 'flex' }}>
      <Note>
        <div css={{ position: 'relative', background: '#fff', wordBreak: 'break-all' }}>
          {localizedMessages['analyzingText']}{dotdotdot}
        </div>
      </Note>
    </div>
  );
}

const QuestionMain = ({ lang, questions }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const next = () => {
    setCurrentQuestionIdx(currentQuestionIdx + 1);
  }
  const currentQuestion = questions[currentQuestionIdx];
  const selectedAnswers = useRef({});
  const wait = (milliseconds) => {
    return new Promise(resolve => setTimeout(resolve, milliseconds));
  };
  const doAnswer = async (value) => {
    const current = selectedAnswers.current;
    current[value] |= 0;
    current[value] += 1;
    if (currentQuestionIdx !== questions.length - 1) {
      next();
    } else {
      setAnalyzing(true);
      let abcd = '';
      abcd += (current['I'] || 0) > (current['E'] || 0) ? 'I' : 'E';
      abcd += (current['T'] || 0) > (current['F'] || 0) ? 'T' : 'F';
      abcd += (current['P'] || 0) > (current['J'] || 0) ? 'P' : 'J';

      await wait(4000);
      navigate(`/${lang}/result/${hash(abcd)}`);
    }
  };

  if (analyzing) {
    return (
      <Layout>
        <Banner />
        <Analyzing lang={lang} />
      </Layout>
    );
  }

  return (
    <Layout>
      <Banner />
      <Main>
        <Progress progress={100 * (currentQuestionIdx / questions.length)} />
        <Questions>
          <QuestionNumber color={colors[currentQuestionIdx]}>Q{currentQuestion.order}.</QuestionNumber> 
          <p css={{ fontWeight: 700 }}>
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

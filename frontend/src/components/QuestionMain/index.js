import React, { useState, useEffect, useContext, useRef } from 'react';
import { navigate } from 'gatsby';
import axios from 'axios';
import styled from '@emotion/styled';
import Lottie from 'lottie-react';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '/src/components/Layout';
import Button from '/src/components/Button';
import hash from '/src/utils/hash';
import animationData from '/src/animations/movie-loading.json';
import LocalizedMessageContext from '/src/contexts/LocalizedMessageContext';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: -70px;
  background: url('/images/img-note-bg.png') repeat-y center #F2EEE5;
  background-size: 319p× 454px;
  position: relative;
`;

const Background = styled.div`
  max-width: 430px;
  position: absolute;
  padding: 0;
  margin: 0 auto;
  min-height: 100%;
`;

const Banner = styled.div`
  position: relative;
  z-index: 10;
  margin: 0;
  min-height: 70px;
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
  width: 320px;
  margin: 12px auto;
  background: linear-gradient(90deg, #925318 0%, #6B4026 97.86%);
  white-space: pre-wrap;
  font-size: 15px;
  line-height: 22px;
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

const NoteWrapper = styled.div`
  width: 164px;
  min-height: 100%;
  margin: 0 auto;
  position: relative;
  margin-top: -130px;
  height: 180px;
  display: flex;
  text-align: center;
  justify-content: center;
  align-items: center;
`;

const Note = styled.div`
  flexDirection: column;
  font-weight: 700;
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: 1;
  height: 188px;
  word-wrap: break-word;
  word-break: break-word;
  box-shadow: inset 0px -3px 0px #DCC9BA;
  margin-top: 20px;
  background: #fff;
  border-radius: 5px;
  overflow: hidden;
`;

const Progress = ({ current, total }) => (
  <div css={{ width: 304, paddingTop: 84, display: 'flex', margin: 'auto' }}>
    <div css={{ width: 304 * current / total, height: 38, background: 'url("/images/jelly-beans@2x.png") no-repeat', backgroundSize: '304px 38px' }}>
    </div>
  </div>
);

const Analyzing = () => {
  const localizedMessages = useContext(LocalizedMessageContext) || {};
  const [dotdotdot, setDotDotDot] = useState('');
  useEffect(() => {
      const interval = setTimeout(() => setDotDotDot(dotdotdot + localizedMessages['dot']), 1300);
      return () => {
        clearTimeout(interval);
      }
  }, [dotdotdot]);
  return (
    <div css={{ flexDirection: 'column', minHeight: '100%', display: 'flex' }}>
        <Lottie
          animationData={animationData}
          loop={true}
          autoplay={true}
          isClickToPauseDisabled={true}
          css={{width: '300px', height: '300px', position:'relative', top: 100, margin: '0 auto'}}
        />
       <NoteWrapper>
          <div css={{
            position: 'relative', whiteSpace: 'pre-wrap',
            wordBreak: 'break-all', background: '#red', fontWeight: 700
          }}>
            {localizedMessages['analyzingTextRich']}{dotdotdot}
          </div>
        </NoteWrapper>
    </div>
  );
}

const QuestionMain = ({ lang, banner, questions }) => {
  const [analyzing, setAnalyzing] = useState(false);
  const [currentQuestionIdx, setCurrentQuestionIdx] = useState(0);
  const next = () => {
    setCurrentQuestionIdx(currentQuestionIdx + 1);
  }
  const currentQuestion = questions[currentQuestionIdx];
  const selectedAnswers = useRef({});
  const increaseCounter = async () => {
    await axios.put(`${process.env.GATSBY_API_HOST}/counter`);
  }
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

      try { 
        await Promise.all([increaseCounter(), wait(3900)]);
      } catch(error) {
        await wait(3900);
        console.error(error);
      } 
      navigate(`/${lang}/result/${hash(abcd)}`, { state: { fromQuestion: true } });
    }
  };
  const bannerImageData = getImage(banner?.localFile);

  if (analyzing) {
    return (
      <Layout>
        <Background>
          <Banner onClick={() => window.location.href='https://ckie.run/test '}>
            <GatsbyImage image={bannerImageData} width="100%" height="100%" />
          </Banner>
          <StaticImage css={{ position: 'absolute', top: 540, right: 65, width: 31, height: 31 }}
            src="../../images/img-bg-part1@2x.png"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 460, left: 2, width: 88, height: 67 }}
            src="../../images/img-bg-part2@2x.png"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 152, right: -10, width: 88, height: 107 }}
            src="../../images/img-bg-part3@2x.png"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 520, left: 90, width: 38, height: 20 }}
            src="../../images/img-bg-part4@2x.png"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 180, left: 70, width: 36, height: 33 }}
            src="../../images/img-bg-part5@2x.png"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 120, left: 100, width: 32, height: 26 }}
            src="../../images/img-bg-part6@2x.png"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 90, right: 90, width: 41, height: 26 }}
            src="../../images/img-bg-part7@2x.png"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 594, right: 150, width: 9, height: 18 }}
            src="../../images/img-bg-part8@2x.png"
            placeholder="none"
          />

          <Analyzing lang={lang} />
        </Background>
      </Layout>
    );
  }

  return (
    <Layout>
      <Banner onClick={() => window.location.href='https://ckie.run/test'}>
        <GatsbyImage image={bannerImageData} width="100%" height="100%" />
      </Banner>
      <Main>
        <Progress current={currentQuestionIdx + 1} total={questions.length} />
        <Questions>
          <QuestionNumber color={colors[currentQuestionIdx]}>Q{currentQuestion.order}.</QuestionNumber> 
          <p css={{ fontWeight: 700, whiteSpace: 'pre-wrap' }}>
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

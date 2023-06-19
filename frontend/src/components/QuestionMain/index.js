import React, { useState, useEffect, useContext, useRef } from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import { StaticImage, GatsbyImage, getImage } from 'gatsby-plugin-image';
import Layout from '/src/components/Layout';
import Button from '/src/components/Button';
import hash from '/src/utils/hash';
import LocalizedMessageContext from '/src/contexts/LocalizedMessageContext';

const Main = styled.main`
  display: flex;
  flex-direction: column;
  height: 100%;
  margin-top: -70px;
  background: url('/images/img-note-bg.png') repeat-y center #F2EEE5;
  ackground-size: 319p× 454px;
  position: relative;
`;

const Background = styled.div`
  width: 360px;
  position: absolute;
  padding: 0;
  margin: 0 auto;
  min-height: 100%;
`;

const Banner = styled.div`
  position: relative;
  z-index: 10;
  margin: 0 -8px;
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
  top: 203px;
  width: 164px;
  min-height: 100%;
  margin: 0 auto;
  position: relative;
  margin-top: -25px;
`;

const Spring = styled.div`
  background: url("/images/img-sketchbook@3x.png") no-repeat top center;
  background-size: 142px 25px;
  width: 163px;
  height: 25px;
  position: absolute;
  top: 4px;
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

const Progress = ({ progress }) => (
  <div css={{ paddingTop: 84, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
    <StaticImage
      src="../../images/jelly-beans@3x.png"
      placeholder="none"
      width={304}
      height={38}
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
      <NoteWrapper>
        <Note>
          <div css={{
            position: 'relative', whiteSpace: 'pre-wrap',
            wordBreak: 'break-all', background: '#fff' 
          }}>
            {localizedMessages['analyzingTextRich']}{dotdotdot}
          </div>
        </Note>
        <Spring />
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
      navigate(`/${lang}/result/${hash(abcd)}`, { state: { fromQuestion: true } });
    }
  };
  const bannerImageData = getImage(banner?.localFile);
  console.log(bannerImageData);

  if (analyzing) {
    return (
      <Layout>
        <Background>
          <Banner>
            <GatsbyImage image={bannerImageData} width="100%" height="100%" />
          </Banner>
          <StaticImage css={{ position: 'absolute', top: 303, left: 54, width: 63, height: 104 }}
            src="../../images/img-cookie-sketch2@3x.png"
            srcSet="../../images/img-cookie-sketch2@3x.png 3x, ../../images/img-cookie-sketch2@2x.png 2x"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 305, right: 48, width: 91, height: 109 }}
            src="../../images/img-cookie-sketch@3x.png"
            srcSet="../../images/img-cookie-sketch@3x.png 3x,../../images/img-cookie-sketch@32.png 2x"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 540, right: 65, width: 31, height: 31 }}
            src="../../images/img-bg-part1@3x.png"
            srcSet="../../images/img-bg-part1@3x.png 3x, ../../images/img-bg-part1@2x.png 2x"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 460, left: 2, width: 88, height: 67 }}
            src="../../images/img-bg-part2@3x.png"
            srcSet="../../images/img-bg-part2@3x.png 3x, ../../images/img-bg-part2@2x.png 2x"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 152, right: -10, width: 88, height: 107 }}
            src="../../images/img-bg-part3@3x.png"
            srcSet="../../images/img-bg-part3@3x.png 3x, ../../images/img-bg-part3@2x.png 2x"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 520, left: 90, width: 38, height: 20 }}
            src="../../images/img-bg-part4@3x.png"
            srcSet="../../images/img-bg-part4@3x.png 3x, ../../images/img-bg-part4@2x.png 2x"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 180, left: 70, width: 36, height: 33 }}
            src="../../images/img-bg-part5@3x.png"
            srcSet="../../images/img-bg-part5@3x.png 3x, ../../images/img-bg-part5@2x.png 2x"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 120, left: 100, width: 32, height: 26 }}
            src="../../images/img-bg-part6@3x.png"
            srcSet="../../images/img-bg-part6@3x.png 3x, ../../images/img-bg-part6@2x.png 2x"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 90, right: 90, width: 41, height: 26 }}
            src="../../images/img-bg-part7@3x.png"
            srcSet="../../images/img-bg-part7@3x.png 3x, ../../images/img-bg-part7@2x.png 2x"
            placeholder="none"
          />
          <StaticImage css={{ position: 'absolute', top: 594, right: 150, width: 9, height: 18 }}
            src="../../images/img-bg-part8@3x.png"
            srcSet="../../images/img-bg-part8@3x.png 3x, ../../images/img-bg-part8@2x.png 2x"
            placeholder="none"
          />

          <Analyzing lang={lang} />
        </Background>
      </Layout>
    );
  }

  return (
    <Layout>
      <Banner>
        <GatsbyImage image={bannerImageData} width="100%" height="100%" />
      </Banner>
      <Main>
        <Progress progress={100 * (currentQuestionIdx / questions.length)} />
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

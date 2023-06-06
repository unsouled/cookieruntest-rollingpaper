import React, { useState, useEffect, useRef } from 'react';
import QuestionMain from '/src/components/QuestionMain';

const QuestionPage = ({ pageContext: { langKey } }) => {
  return (
    <QuestionMain lang={langKey} />
  );
}

export const Head = ({ pageContext: { langKey } }) => (
  <>
    <html lang={langKey} />
    <title>Cookierun</title>
    <body className={`lang-${langKey}`} />
  </>
);

export default QuestionPage;

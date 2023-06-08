import React, { useState } from 'react';
import { graphql, navigate } from 'gatsby';
import styled from '@emotion/styled';
import IndexMain from '/src/components/IndexMain';
import LanguageModal from '/src/components/LanguageModal';
import LocalizedMessageContext from '/src/contexts/localizedMessageContext';

import { useContext } from 'react';

import Modal from 'react-modal';
Modal.setAppElement('#___gatsby');

export const query = graphql`
  query {
    strapiLocalizedMessage {
      id
      logoImage {
        id
      }
      copyright
      characterTestUrl
      description
      participantsText
      selectLanguageText
      startText
      subtitle
      title
      villainTestUrl
    }
  }
`;

const IndexPage = ({ data: { strapiLocalizedMessage = {} }, pageContext: { langKey } }) => {
  const [counter, setCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);

  console.log(strapiLocalizedMessage);

  return (
    <LocalizedMessageContext.Provider value={strapiLocalizedMessage}>
      <IndexMain showModal={() => setModalVisible(true)} lang={langKey} />
      <LanguageModal isOpen={modalVisible} onRequestClose={closeModal} lang={langKey} />
    </LocalizedMessageContext.Provider>
  );
}

export default IndexPage;

export const Head = ({ pageContext: { langKey } }) => (
  <>
    <html lang={langKey} />
    <title>Cookierun</title>
    <body className={`lang-${langKey}`} />
  </>
);

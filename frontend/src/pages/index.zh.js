import React, { useState } from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import IndexMain from '/src/components/IndexMain';
import LanguageModal from '/src/components/LanguageModal';

import Modal from 'react-modal';
Modal.setAppElement('#___gatsby');

const IndexPage = () => {
  const [counter, setCounter] = useState(0);
  const [modalVisible, setModalVisible] = useState(false);
  const closeModal = () => setModalVisible(false);

  return (
    <>
      <IndexMain showModal={() => setModalVisible(true)} lang="zh" />
      <LanguageModal isOpen={modalVisible} onRequestClose={closeModal} lang="zh" />
    </>
  )
}

export default IndexPage;

export const Head = () => (
  <>
    <html lang="zh" />
    <title>Cookierun</title>
    <body className="lang-zh" />
  </>
);

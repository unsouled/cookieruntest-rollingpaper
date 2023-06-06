import React from 'react';
import { navigate } from 'gatsby';
import styled from '@emotion/styled';
import Modal from 'react-modal';

const ModalContent = styled.div`
  z-index: 5000;
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  width: 100%;
  height: 100%;
  font-size: 20px;
  font-weight: 400 
`;

const LanguageSelector = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LanguageSelectorItem = styled.div`
  font-weight: 500;
  padding: 30px; 
  color: ${props => props.selected ? '#FFB900': '#000'};
  font-family: var(--font-sans);
`;

const Title = styled.div`
  display: flex;
`;

const languagesByLocale = {
  'ko': '한국어',
  'en': 'English',
  'zh': '繁體中文',
  'th': 'ภาษาไทย',
  'ja': '日本語',
};

const LanguageModal = ({ siteData, isOpen, onRequestClose, style, lang }) => (
  <Modal 
    isOpen={isOpen}
    onRequestClose={onRequestClose}
    style={style}
  >
    <ModalContent>
      <Title>
        <div css={{ width: 30, height: 30 }}>
        </div>
        <div css={{ flex: 1 }}>
          {"siteData.selectLanguageText"}
        </div>
        <a href="#" onClick={onRequestClose}>
          X
        </a>
      </Title>

      <LanguageSelector>
        <LanguageSelectorItem selected={lang === 'ko'} onClick={() => { onRequestClose(); navigate('/ko'); }}>{languagesByLocale['ko']}</LanguageSelectorItem>
        <LanguageSelectorItem selected={lang === 'en'} onClick={() => { onRequestClose(); navigate('/en'); }}>{languagesByLocale['en']}</LanguageSelectorItem>
        <LanguageSelectorItem selected={lang === 'zh'} onClick={() => { onRequestClose(); navigate('/zh'); }}>{languagesByLocale['zh']}</LanguageSelectorItem>
        <LanguageSelectorItem selected={lang === 'th'} onClick={() => { onRequestClose(); navigate('/th'); }}>{languagesByLocale['th']}</LanguageSelectorItem>
        <LanguageSelectorItem selected={lang === 'ja'} onClick={() => { onRequestClose(); navigate('/ja'); }}>{languagesByLocale['ja']}</LanguageSelectorItem>
      </LanguageSelector>

    </ModalContent>
  </Modal>
); 

export default LanguageModal;

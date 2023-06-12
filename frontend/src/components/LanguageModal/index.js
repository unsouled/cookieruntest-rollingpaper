import React, { useContext } from 'react';
import { navigate } from 'gatsby';
import { StaticImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import LocalizedMessageContext from '/src/contexts/LocalizedMessageContext';

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
  padding: 20px; 
  color: ${props => props.selected ? '#FFB900': '#fff'};
  font-family: var(--font-sans);
`;

const Title = styled.div`
  display: flex;
`;

const languagesByLocale = {
  'ko': '한국어',
  'en': 'English',
  'zh-Hans': '简体中文',
  'zh': '繁體中文',
  'th': 'ภาษาไทย',
  'ja': '日本語',
};

const customStyles = {
  overlay: {
    border: 0,
    background: 'transparent',
    zIndex: 9999
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '100%',
    height: '100%',
    border: 0,
    borderRadius: 0,
    marginRight: '-50%',
    textAlign: 'center',
    padding: 20,
    transform: 'translate(-50%, -50%)',
    background: 'rgba(28, 28, 30, 0.6)',
  },
};

const LanguageModal = ({ isOpen, onRequestClose, lang }) => {
  const localizedMessages = useContext(LocalizedMessageContext) || {};
  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <ModalContent>
        <Title>
          <div css={{ width: 30, height: 30 }}>
          </div>
          <div css={{ flex: 1, color: '#fff' }}>
            {localizedMessages['selectLanguageText']}
          </div>
          <a href="#" onClick={onRequestClose} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'right', display: 'flex' }}>
            <StaticImage 
              loading="eager"
              src="../../images/btn-close.png" 
              srcSet="../../images/btn-close@3x.png 3x, ../../images/btn-close@2x.png 2x" 
              placeholder="none"
              alt="" 
            />
          </a>
        </Title>

        <LanguageSelector>
          <LanguageSelectorItem selected={lang === 'ko'} onClick={() => { onRequestClose(); navigate('/ko'); }}>{languagesByLocale['ko']}</LanguageSelectorItem>
          <LanguageSelectorItem selected={lang === 'en'} onClick={() => { onRequestClose(); navigate('/en'); }}>{languagesByLocale['en']}</LanguageSelectorItem>
          <LanguageSelectorItem selected={lang === 'zh-Hans'} onClick={() => { onRequestClose(); navigate('/zh-Hans'); }}>{languagesByLocale['zh-Hans']}</LanguageSelectorItem>
          <LanguageSelectorItem selected={lang === 'zh'} onClick={() => { onRequestClose(); navigate('/zh'); }}>{languagesByLocale['zh']}</LanguageSelectorItem>
          <LanguageSelectorItem selected={lang === 'th'} onClick={() => { onRequestClose(); navigate('/th'); }}>{languagesByLocale['th']}</LanguageSelectorItem>
          <LanguageSelectorItem selected={lang === 'ja'} onClick={() => { onRequestClose(); navigate('/ja'); }}>{languagesByLocale['ja']}</LanguageSelectorItem>
        </LanguageSelector>

      </ModalContent>
    </Modal>
  ); 
}

export default LanguageModal;

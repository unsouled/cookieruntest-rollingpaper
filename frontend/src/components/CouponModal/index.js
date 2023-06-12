import React, { useState } from 'react';
import { StaticImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import parseISO from 'date-fns/parseISO'
import format from 'date-fns/format';
import Button from '../Button';

Modal.setAppElement('#___gatsby');

const IdInput = styled.input`
  font-family: 'CookieRun';
  border: 0;
  background: #F3F1EC;
  font-size: 24px;
  width: 100%;
  padding: 20px 12px;

  ::placeholder {
    color: #D3CBC4;
    fontWeight: 700;
  }
`;

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
    padding: '30px 20px',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(28, 28, 30, 0.6)',
  }
};

const CouponModal = ({ isOpen, onRequestClose, messages: localizedMessages }) => {
  const [received, setReceived] = useState(false);

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', maxWidth: '280px', height: '100%' }}>
        <a href="#" onClick={onRequestClose} style={{ textAlign: 'right', display: 'block' }}>
          <StaticImage 
            loading="eager"
            src="../../images/btn-close.png" 
            srcSet="../../images/btn-close@3x.png 3x, ../../images/btn-close@2x.png 2x" 
            placeholder="none"
            alt="" 
          />
        </a>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: '280px' }}>
          <div style={{ 
            background: 'linear-gradient(180deg, #FFFCF0 0%, #FFFFFF 100%), #FFFFFF',
            borderRadius: '22px',
            width: '100%'
          }}>

            {received ? (
              <div style={{ 
                padding: '20px 15px' 
              }}>
                <p style={{
                  fontSize: '28px',
                  fontWeight: 700,
                }}>
                  {localizedMessages['couponSent']}
                </p>
              </div>
            ) : (
            <div style={{ 
              padding: '20px 15px' 
            }}>
              <p style={{
                fontSize: '28px',
                fontWeight: 700,
                marginBottom: '12px'
              }}>
                {localizedMessages['couponGiftReceived']}
              </p>
              <p style={{ height: '25px', justifyContent: 'center', alignItems: 'center',display: 'flex', background: '#E86D58', color: '#fff', fontSize: '14px', fontWeight: 700, marginBottom: '25px' }}>
                2023/06/27 - 2023/07/27
              </p>
              <p style={{ fontSize: '24px', color: '#D3CBC4', fontWeight: 700 }}>
                <IdInput type="text" placeholder={localizedMessages['couponInputId']} />
              </p>
              <p style={{ fontSize: '12px', fontWeight: 700, textAlign: 'right', color: '#D3CBC4', margin: '5px 0' }}>
                {localizedMessages['couponMyInfo']}
              </p>
            </div>
            )}
          </div>
            <p style={{ width: '100%' }}>
            {received ? (
              <Button style={{ width: '100%', background: '#FDCB27', height: '75px', fontSize: '25px' }} onClick={() => setReceived(true)}>
                {localizedMessages['couponLinkToGame']}
              </Button>
            ) : (
              <Button style={{ width: '100%', background: '#FDCB27', height: '75px', fontSize: '25px' }} onClick={() => setReceived(true)}>
                {localizedMessages['couponReceiveGift']}
              </Button>
            )}
            </p>
            <div style={{ marginTop: '28px' }}>
              {received ? (
                <a href="#" onClick={onRequestClose} style={{ textDecoration: 'none', color: '#DCC9BA' }}>
                  {localizedMessages['couponShowResult']}
                </a>
              ) : (
                <a href="#" onClick={onRequestClose} style={{ textDecoration: 'none', color: '#DCC9BA' }}>
                  {localizedMessages['couponTryLater']}
                </a>
              )}
            </div>
        </div>
      </div>
    </Modal>
  );
}

export default CouponModal;

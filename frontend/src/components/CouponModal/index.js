import React, { useState } from 'react';
import axios from 'axios';
import { StaticImage } from 'gatsby-plugin-image';
import styled from '@emotion/styled';
import Modal from 'react-modal';
import Button from '../Button';

Modal.setAppElement('#___gatsby');

const IdInput = styled.input`
  font-family: 'CookieRun';
  border: 0;
  background: #F3F1EC;
  font-size: 24px;
  width: 100%;
  padding: 20px 12px;
  font-weight: 700;

  ::placeholder {
    color: #D3CBC4;
    font-weight: 700;
  }
`;

const customStyles = {
  overlay: {
    border: 0,
    background: 'transparent',
    zIndex: 9999
  },
  content: {
    display: 'flex',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    width: '100%',
    height: '100%',
    border: 0,
    overflow: 'hidden',
    borderRadius: 0,
    marginRight: '-50%',
    textAlign: 'center',
    padding: '30px 20px',
    transform: 'translate(-50%, -50%)',
    background: 'rgba(28, 28, 30, 0.7)',
  }
};

const CouponModal = ({ isOpen, onRequestClose, messages: localizedMessages, mid, rewardId }) => {
  const [received, setReceived] = useState(false);
  const [userId, setUserId] = useState(mid);
  const claim = async () => {
    try {
      const params = new URLSearchParams();
      params.append('mid', userId);
      params.append('eventId', '1');
      params.append('rewardId', rewardId);
      const { data } = await axios.post(`${process.env.GATSBY_REWARD_API_HOST}/webevent/reward`, params);
      if (!data.success) {
        alert('a');
        alert(localizedMessages['alertInvalid']);
      }
      setReceived(true);
    } catch (e) {
      if (e.response.data['already_rewarded']) {
        alert(localizedMessages['alertAlreadyReceived']);
      } else {
        alert(localizedMessages['alertInvalid']);
      }
      setUserId('');
      setReceived(false);
    }
  }

  return (
    <Modal 
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      style={customStyles}
    >
      <div style={{ display: 'flex', flexDirection: 'column', margin: '0 auto', maxWidth: '280px', height: '100%' }}>
        <div style={{ position: 'absolute', width: '360px', height: '480px', margin: '0 auto', left: 0, right: 0, top: 120, bottom: 0 }}>
        </div>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', minWidth: '280px', zIndex: 10 }}>
          <div style={{ 
            background: 'linear-gradient(180deg, #FFFCF0 0%, #FFFFFF 100%), #FFFFFF',
            borderRadius: '22px',
            width: '100%'
          }}>
            <StaticImage
              src="../../images/img-coin@3x.png"
              width={120}
              height={137}
              placeholder="none"
              style={{ position: 'relative', left: -120, top: 20, zIndex: 10 }}
            />
            <StaticImage
              src="../../images/img-cookie-3@3x.png"
              width={96}
              height={92}
              placeholder="none"
              style={{ position: 'relative', left: -20, top: -70, zIndex: 10 }}
            />
            <StaticImage
              src="../../images/img-crystal2@3x.png"
              width={99}
              height={98}
              placeholder="none"
                style={{ position: 'relative', right: -256, top: 36, zIndex: 10 }}
            />
            <StaticImage
              src="../../images/img-crystal@3x.png"
              width={91}
              height={88}
              placeholder="none"
              style={{ position: 'relative', left: -80, top: -320 }}
            />
            
            <StaticImage
              src="../../images/img-result-bg-part1@3x.png"
              width={45}
              height={28}
              placeholder="none"
              style={{ position: 'relative', right: -20, top: -280 }}
            />
            <StaticImage
              src="../../images/img-result-bg-part2@3x.png"
              width={37}
              height={35}
              placeholder="none"
              style={{ position: 'relative', right: -44, top: -24 }}
            />
            <StaticImage
              src="../../images/img-result-bg-part3@3x.png"
              width={43}
              height={28}
              placeholder="none"
              style={{ position: 'relative', left: -156, top: 20 }}
            />

            <div style={{ marginTop: -260 }}>
            {received ? (
              <div style={{ 
                minHeight: '190px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px 15px' 
              }}>
                <p style={{
                  fontSize: '28px',
                  fontWeight: 700,
                  whiteSpace: 'pre-wrap',
                }}>
                  {localizedMessages['couponSentRich']}
                </p>
              </div>
            ) : (
            <div style={{ 
              padding: '20px 15px' 
            }}>
              <p style={{
                fontSize: '28px',
                fontWeight: 700,
                marginBottom: '12px',
                whiteSpace: 'pre-wrap',
              }}>
                {localizedMessages['couponGiftReceivedRich']}
              </p>
              <p style={{ height: '25px', justifyContent: 'center', alignItems: 'center',display: 'flex', background: 'url("/images/img-coupon-bg@3x.png") no-repeat', backgroundSize: 'cover', color: '#fff', fontSize: '14px', fontWeight: 700, marginBottom: '25px' }}>
                {localizedMessages['eventStartAtText']} ~ {localizedMessages['eventEndAtText']}
              </p>
              <p style={{ fontSize: '24px', color: '#D3CBC4', fontWeight: 700 }}>
                <IdInput type="text" placeholder={localizedMessages['couponInputId']} 
                  value={userId}
                  onChange={(e) => {
                    setUserId(e.target.value);
                  }}
                />
              </p>
              <p style={{ fontSize: '12px', fontWeight: 600, textAlign: 'right', color: '#D3CBC4', margin: '5px 0' }}>
                {localizedMessages['couponMyInfo']}
              </p>
            </div>
            )}
            </div>
          </div>
            <p style={{ width: '100%' }}>
            {received ? (
              <Button style={{ width: '100%', background: 'url("/images/img-button-bg@3x.png") no-repeat', backgroundSize: 'cover', height: '75px', fontSize: '25px' }} onClick={() => {
                window.location.href = 'https://ckie.run/test';
              }}>
                <span style={{ fontSize: 19 }}>{localizedMessages['couponGameName']}</span><br />
                <span style={{ fontSize: 25 }}>{localizedMessages['couponLink']}</span>
              </Button>
            ) : (
              <Button style={{ width: '100%', background: 'url("/images/img-button-bg@3x.png") no-repeat', backgroundSize: 'cover', height: '75px', fontSize: '25px' }} onClick={claim}
                >
                {localizedMessages['couponReceiveGift']}
              </Button>
            )}
            </p>
            <div style={{ marginTop: '28px' }}>
              {received ? (
                <div style={{ display: 'flex', position: 'absolute', left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                  <div onClick={onRequestClose} style={{ justifyContent: 'center', alignItems: 'center', textDecoration: 'none', color: '#DCC9BA', marginRight: 12 }}>
                    {localizedMessages['couponShowResult']}
                  </div>
                  <div onClick={onRequestClose} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'right', display: 'flex' }}>
                    <StaticImage 
                      loading="eager"
                      width={18}
                      height={18}
                      src="../../images/btn-close2@3x.png" 
                      placeholder="none"
                      alt="" 
                    />
                  </div>
                </div>
              ) : (
                <div style={{ display: 'flex', position: 'absolute', left: 0, right: 0, justifyContent: 'center', alignItems: 'center' }}>
                  <div onClick={onRequestClose} style={{ justifyContent: 'center', alignItems: 'center', textDecoration: 'none', color: '#DCC9BA', marginRight: 12 }}>
                    {localizedMessages['couponTryLater']}
                  </div>
                  <div onClick={onRequestClose} style={{ justifyContent: 'center', alignItems: 'center', textAlign: 'right', display: 'flex' }}>
                    <StaticImage 
                      loading="eager"
                      width={18}
                      height={18}
                      src="../../images/btn-close2@3x.png" 
                      placeholder="none"
                      alt="" 
                    />
                  </div>
                </div>
              )}
            </div>
        </div>
      </div>
    </Modal>
  );
}

export default CouponModal;

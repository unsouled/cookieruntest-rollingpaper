import React from 'react';
import styled from '@emotion/styled';

const Button = styled.button`
  border: 0;
  background: #925318;
  border-radius: 22px;
  color: #fff;
  font-weight: 700;
  font-size: 18px;
`;

export default (props) => (
  <Button {...props} />
);

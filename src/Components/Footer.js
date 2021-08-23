import React from 'react';
import styled from '@emotion/styled';

const FooterWrapper = styled.footer`
  display: grid;
  background: #f5f5f5;
  place-items: center;
  margin-top: auto;
  padding: 50px 0;
  font-size: 15px;
  text-align: center;
  line-height: 1.5;
`;

const Footer = () => {
  return (
    <FooterWrapper>
      <span role="img" aria-label="like">
        Thank You for Visiting Site, Have a Good Day 😆 <br /> © 2021
        Developer Nully Powered By React.
      </span>
    </FooterWrapper>
  );
};

export default Footer;

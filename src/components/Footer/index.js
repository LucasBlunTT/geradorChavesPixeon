import React from 'react';
import { FooterStyle } from './styles';
import { Container } from '../../styles/global';
import Image from 'next/image';
import LogoPixeonFooter from '../../assets/pixeonFooter.png';

export function Footer() {
  return (
    <FooterStyle>
      <Container>
        <Image src={LogoPixeonFooter} alt="image pixeon" />
        <div className="copyright">          
          <p>2003 - 2023 © Copyright Pixeon | Todos os direitos reservados</p>
          <p>Empresa Certificada MPS-SW | ANVISA - 80370219001</p>
        </div>
      </Container>
    </FooterStyle>
  );
}

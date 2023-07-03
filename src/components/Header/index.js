import { HeaderStyle } from './styles';
import { Container } from '../../styles/global';
import Image from 'next/image';
import LogoPixeon from '../../assets/logo-pixeon.png.webp';

export function Header() {
  return (
    <HeaderStyle>
      <Container>
        <div className="logo">
          <Image src={LogoPixeon} alt="logo da pixeon" />
        </div>
      </Container>
    </HeaderStyle>
  );
}

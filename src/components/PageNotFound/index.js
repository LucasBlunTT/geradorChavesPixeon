import Link from 'next/link';
import { Container } from '../../styles/global';
import { StyleSection404 } from './styles';
import Image404 from '../../assets/image-not-found.png';
import Image from 'next/image';

export function Section404() {
  return (
    <>
      <StyleSection404>
        <Container>
          <h1>Whoops, essa página sumiu.</h1>
          <p>
            OHHH, parece que não conseguimos encontrar a página que você está
            procurando. Tente voltar à página anterior ou consulte nossa Central
            de Ajuda para obter mais informações.
          </p>
          <Link href="/">Voltar</Link>
          <Image src={Image404} alt="Image not found" />
        </Container>
      </StyleSection404>
    </>
  );
}

import { PageTitle } from '../components/PageTitle';
import { Footer } from '../components/Footer/index';
import { Header } from '../components/Header/index';
import { SectionHero } from '../components/SectionHero';

export default function Home() {
  return (
    <>
      <PageTitle
        title="Gerador de Chaves - Pixeon"
        description="Gerador de licenças da Pixeon"
      />
      <Header />
      <SectionHero/>
      {/*<Footer />*/}
    </>
  );
}

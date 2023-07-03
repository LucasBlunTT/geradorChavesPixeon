import Head from 'next/head';

export function PageTitle({ title, description }) {
  return (
    <Head>
      <title>{title}</title>
      <meta name="description" content={description}></meta>
    </Head>
  );
}

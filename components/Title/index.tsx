import Head from 'next/head';
import { NextFunctionComponent } from 'next';

type TitleProps = { text: string };

const Title: NextFunctionComponent<TitleProps> = ({ text }) => (
  <Head>
    <title>
CFOP -
      {' '}
      {text}
    </title>
  </Head>
);

export default Title;

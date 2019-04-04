import Head from 'next/head';
import { NextFunctionComponent } from 'next';

const Title: NextFunctionComponent<{text: string}> = ({ text }) => (
  <Head>
    <title>
CFOP -
      {' '}
      {text}
    </title>
  </Head>
);

export default Title;

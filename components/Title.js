import Head from 'next/head';
import { string } from 'prop-types';

const Title = ({ text }) => (
  <Head>
    <title>
CFOP -
      {' '}
      {text}
    </title>
  </Head>
);

Title.propTypes = {
  text: string.isRequired,
};

export default Title;

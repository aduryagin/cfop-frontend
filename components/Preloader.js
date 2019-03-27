import { useState, useEffect } from 'react';
import Router from 'next/router';
import '@material/react-linear-progress/dist/linear-progress.css';
import LinearProgress from '@material/react-linear-progress';

const Preloader = () => {
  const [isClosed, setIsClosed] = useState(true);
  useEffect(() => {
    Router.events.on('routeChangeStart', () => {
      setIsClosed(false);
    });
    Router.events.on('routeChangeComplete', () => {
      setIsClosed(true);
    });
    Router.events.on('routeChangeError', () => {
      setIsClosed(true);
    });
  }, []);

  return (
    <LinearProgress
      indeterminate
      closed={isClosed}
    />
  );
};

export default Preloader;

import { Body1 } from '@material/react-typography';
import { Grid } from '@material/react-layout-grid';
import Title from '../components/Title';
 
const Links = () => (
  <Grid>
    <Title text="Links" />
    <Body1>
  All information was taken from
      {' '}
      <a href="https://www.speedsolving.com/" target="_blank" rel="noopener noreferrer">https://www.speedsolving.com/</a>
    </Body1>
  </Grid>
);

export default Links;

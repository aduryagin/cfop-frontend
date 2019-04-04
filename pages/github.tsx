import { Body1 } from '@material/react-typography';
import { Grid } from '@material/react-layout-grid';
import Title from '../components/Title';

const Github = () => (
  <Grid>
    <Title text="Github" />
    <Body1>
  Back-end
      {' '}
      <a href="https://github.com/aduryagin/cfop-backend" target="_blank" rel="noopener noreferrer">https://github.com/aduryagin/cfop-backend</a>
    </Body1>

    <Body1>
  Front-end
      {' '}
      <a href="https://github.com/aduryagin/cfop-frontend" target="_blank" rel="noopener noreferrer">https://github.com/aduryagin/cfop-frontend</a>
    </Body1>
  </Grid>
);

export default Github;

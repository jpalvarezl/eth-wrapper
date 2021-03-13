import styled from 'styled-components';
import EthBalance from './components/EthBalance';
import WethBalance from './components/WethBalance';
import Wrapper from './components/Wrapper';
import { CardContent, Card, makeStyles, CardActions } from '@material-ui/core';

const Container = styled.form`
  margin-bottom: 2rem;
  width: 100%;
  max-width: 480px;

  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

const useStyles = makeStyles({
  root: {
    maxWidth: "300px",
    maxHeight: "200px"
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


const App: React.FC = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root} >
      <CardContent>
        <EthBalance />
        <WethBalance />
      </CardContent>
      <CardActions>
        <Wrapper />
      </CardActions>
    </Card>
  );
};

export default App;

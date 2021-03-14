import styled from 'styled-components';
import EthBalance from './components/EthBalance';
import WethBalance from './components/WethBalance';
import Wrapper from './components/Wrapper';
import { CardContent, Card, makeStyles, CardActions } from '@material-ui/core';
import { Title } from '@gnosis.pm/safe-react-components';
import React, { useState } from 'react';

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
    maxHeight: "300px"
  },
});


const App: React.FC = () => {
  const classes = useStyles();
  const [wrap, setWrap] = useState(true);

  return (
    <Card className={classes.root} onClick={() => setWrap(!wrap)} >
      <CardContent>
        <Title size="lg">{wrap ? "WRAP" : "UNWRAP"}</Title>
        {wrap ?
          <EthBalance />
          : <WethBalance />}
      </CardContent>
      <CardActions>
        <Wrapper />
      </CardActions>
    </Card>
  );
};

export default App;

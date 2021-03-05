import React from 'react';
import styled from 'styled-components';
import EthBalance from './components/EthBalance';
import WethBalance from './components/WethBalance';
import Wrapper from './components/Wrapper';
import { Grid } from '@material-ui/core';

const Container = styled.form`
  margin-bottom: 2rem;
  width: 100%;
  max-width: 480px;

  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 1rem;
  grid-row-gap: 1rem;
`;

const App: React.FC = () => {

  return (
    <Grid
      container
      spacing={5}>
      <Grid container direction="column" alignContent="center">
        <EthBalance />
        <WethBalance />
      </Grid>
      <Grid container item>
        <Wrapper maxEth={10} />
      </Grid>
    </Grid>
  );
};

export default App;

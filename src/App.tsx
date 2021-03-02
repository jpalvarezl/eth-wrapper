import React, { useCallback, useState, useEffect } from 'react';
import { BigNumber, ethers } from 'ethers';
import styled from 'styled-components';
import { Button, Loader, Title } from '@gnosis.pm/safe-react-components';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import EthBalance from './components/EthBalance';
import WethBalance from './components/WethBalance';
import Wrapper from './components/Wrapper';

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
  const { sdk, safe } = useSafeAppsSDK();

  return (
    <Container>
      <EthBalance />
      <WethBalance />
      <Wrapper />
    </Container>
  );
};

export default App;

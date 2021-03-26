import styled from 'styled-components';
import EthBalance from './components/EthBalance';
import WethBalance from './components/WethBalance';
import Wrapper from './components/Wrapper';
import { CardContent, Card, makeStyles, CardActions, CardHeader, IconButton, Avatar } from '@material-ui/core';
import { ReactComponent as EthLogo } from './assets/svg/eth.svg';
import { ReactComponent as WethLogo } from './assets/svg/weth.svg';
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
  logo: {
    width: "32px",
    height: "32px",
  }
});


const App: React.FC = () => {
  const classes = useStyles();
  const [wrap, setWrap] = useState(true);

  return (
    <Card className={classes.root}  >
      <CardHeader
        avatar={

          wrap ?
            <Avatar alt="wrap" > <EthLogo className={classes.logo} /></Avatar> :
            <Avatar alt="unwrap" ><WethLogo className={classes.logo} /></Avatar>
        }
        title={wrap ? "WRAP" : "UNWRAP"}
        subheader="Tap to toggle (un)wrap"
        onClick={() => setWrap(!wrap)}
      />
      <CardContent>
        {wrap ?
          <EthBalance />
          : <WethBalance />}
      </CardContent>
      <CardActions>
        <Wrapper wrap={wrap} />
      </CardActions>
    </Card >
  );
};

export default App;

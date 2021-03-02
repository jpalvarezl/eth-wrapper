import React, { useCallback, useState } from 'react';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { TextField } from '@material-ui/core';
import { Title } from '@gnosis.pm/safe-react-components';

const Wrapper: React.FC = () => {
    const { sdk, safe } = useSafeAppsSDK();

    return <Title size="md">WRAP</Title>
}

export default Wrapper;

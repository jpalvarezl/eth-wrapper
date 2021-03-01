import React, { useCallback, useState } from 'react';
import { Button, Loader, Title } from '@gnosis.pm/safe-react-components';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';

interface BalanceProps {
    ethBalance: string
}

// export const Balance: React.FC<BalanceProps> = () => { }



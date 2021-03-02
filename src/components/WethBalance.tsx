import React, { useEffect, useState } from 'react';
import { Title } from '@gnosis.pm/safe-react-components';
import { ethers } from 'ethers';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';

const WethBalance: React.FC = () => {
    const [balance, setBalance] = useState("loading state");
    const { sdk, safe } = useSafeAppsSDK();

    async function fetchBalance() {
        const balanceEth = await sdk.eth.getBalance([safe.safeAddress]);
        setBalance(ethers.utils.formatEther(balanceEth));
    }

    useEffect(() => {
        fetchBalance();
        console.log("Updating balance");
    }, []);

    return <Title size="md" >{balance}</Title>
}

export default WethBalance;


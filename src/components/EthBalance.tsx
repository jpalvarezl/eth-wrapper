import React, { useEffect, useState } from 'react';
import { ethers } from 'ethers';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { Typography } from '@material-ui/core';

const EthBalance: React.FC = () => {
    const [balance, setBalance] = useState("loading state");
    const { sdk, safe } = useSafeAppsSDK();

    async function fetchBalance() {
        const balanceEth = await sdk.eth.getBalance([safe.safeAddress]);
        setBalance(ethers.utils.formatEther(balanceEth));
    }

    useEffect(() => {
        fetchBalance();
        console.log("Updating ETH balance");
    }, []);

    return <Typography variant="body2" component="p" >ETH balance: {balance}</Typography>
}

export default EthBalance;


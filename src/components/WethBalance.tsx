import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { SafeAppsSdkProvider } from '@gnosis.pm/safe-apps-ethers-provider';
import { ethers } from 'ethers';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { Erc20, getWethAddress } from '../utils/Erc20Constants'
import { Typography } from '@material-ui/core';

const WethBalance: React.FC = () => {
    const [balance, setBalance] = useState("");

    const { sdk, safe } = useSafeAppsSDK();
    const provider = useMemo(() => new SafeAppsSdkProvider(safe, sdk), [safe, sdk]);
    const weth = useMemo(() => new ethers.Contract(getWethAddress(safe.network.toLowerCase()), Erc20, provider), [provider]);

    async function fetchBalance() {
        const balanceWeth = await weth.balanceOf(safe.safeAddress);
        setBalance(ethers.utils.formatEther(balanceWeth));
    }

    useEffect(() => {
        fetchBalance();
        console.log("Updating WETH balance");
    }, []);

    return <Typography variant="body2" component="p" >Your WETH Balance: {balance}</Typography>
}

export default WethBalance;


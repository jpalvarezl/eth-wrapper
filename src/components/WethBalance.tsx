import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Title } from '@gnosis.pm/safe-react-components';
import { SafeAppsSdkProvider } from '@gnosis.pm/safe-apps-ethers-provider';
import { ethers } from 'ethers';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { WETH_ADDRESS, Erc20 } from '../utils/Erc20Constants'

const WethBalance: React.FC = () => {
    const [balance, setBalance] = useState("");

    const { sdk, safe } = useSafeAppsSDK();
    const provider = useMemo(() => new SafeAppsSdkProvider(safe, sdk), [safe, sdk]);
    const weth = useMemo(() => new ethers.Contract(WETH_ADDRESS, Erc20, provider), [provider]);

    async function fetchBalance() {
        const balanceWeth = await weth.balanceOf(safe.safeAddress);
        setBalance(ethers.utils.formatEther(balanceWeth));
    }

    useEffect(() => {
        fetchBalance();
        console.log("Updating WETH balance");
    }, []);

    return <Title size="md" >WETH Balance: {balance}</Title>
}

export default WethBalance;


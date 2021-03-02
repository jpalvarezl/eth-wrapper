import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { Title } from '@gnosis.pm/safe-react-components';
import { SafeAppsSdkProvider } from '@gnosis.pm/safe-apps-ethers-provider';
import { ethers } from 'ethers';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
const WETH_ADDRESS = "0xc778417E063141139Fce010982780140Aa0cD5Ab";

const Erc20 = [
    "function approve(address _spender, uint256 _value) public returns (bool success)",
    "function allowance(address _owner, address _spender) public view returns (uint256 remaining)",
    "function balanceOf(address _owner) public view returns (uint256 balance)",
    "event Approval(address indexed _owner, address indexed _spender, uint256 _value)"
];

const Erc20Interface = new ethers.utils.Interface(Erc20)

const WethBalance: React.FC = () => {
    const [balance, setBalance] = useState("loading state");

    const { sdk, safe } = useSafeAppsSDK();
    const provider = useMemo(() => new SafeAppsSdkProvider(safe, sdk), [safe, sdk]);
    const weth = useMemo(() => new ethers.Contract(WETH_ADDRESS, Erc20, provider), [provider]);

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


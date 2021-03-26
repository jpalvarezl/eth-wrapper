import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { Button, CardActions, Snackbar, TextField } from '@material-ui/core';
import { WETH_ADDRESS } from '../utils/Erc20Constants';
import { ethers } from 'ethers';
import { SafeAppsSdkProvider } from '@gnosis.pm/safe-apps-ethers-provider';
import { WETHwithdraw } from '../utils/WETHConstants';

interface WrapperProps {
    wrap: boolean
}

const Wrapper: React.FC<WrapperProps> = (props: WrapperProps) => {
    const { sdk, safe } = useSafeAppsSDK();
    const [amountToWrap, setAmountToWrap] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [availableEth, setAvailableEth] = useState(0.0);
    const [isError, setIsError] = useState(false);

    const provider = useMemo(() => new SafeAppsSdkProvider(safe, sdk), [safe, sdk]);
    const weth = useMemo(() => new ethers.Contract(WETH_ADDRESS, WETHwithdraw, provider), [provider]);

    const wrapEth = useCallback(async () => {
        if (isError) {
            return;
        }

        if (props.wrap) {
            try {
                const parsedAmount = ethers.utils.parseEther(amountToWrap)
                const safeTx = await sdk.txs.send({
                    txs: [{
                        to: WETH_ADDRESS,
                        value: parsedAmount.toString(),
                        data: '0x'
                    }]
                })
                console.log(safeTx.safeTxHash);
            } catch (e) {
                console.error(e)
            }
        } else {
            const parsedAmount = ethers.utils.parseEther(amountToWrap)
            await weth.withdraw(parsedAmount);
            console.log("UNWRAP")
        }
    }, [sdk, amountToWrap, isError, props.wrap])

    useEffect(() => {
        fetchAvailableEth();
    }, [safe, sdk]);

    async function fetchAvailableEth() {
        const balanceEth = await sdk.eth.getBalance([safe.safeAddress]);
        const a = ethers.utils.formatEther(balanceEth);
        setAvailableEth(Number.parseFloat(a));
    };

    const validateAmout = useCallback((newValue: string) => {
        console.log(newValue);
        if (isNaN(Number(newValue))) {
            setIsError(true);
            setErrorMessage("Not a number");
        }
        else if (Number.parseFloat(newValue) > availableEth) {
            setIsError(true);
            setErrorMessage("Insufficient funds");
        }
        else {
            setIsError(false);
            setErrorMessage("");
            setAmountToWrap(newValue);
        }
    }, [availableEth])

    return (
        <div>
            <TextField
                value={amountToWrap}
                label={props.wrap ? "ETH amount" : "WETH amount"}
                error={isError}
                helperText={errorMessage}
                onChange={e => validateAmout(e.target.value)} />

            <CardActions>
                <Button
                    size="small"
                    color="primary"
                    onClick={() => wrapEth()}>
                    {props.wrap ? "Wrap" : "Unwrap"}
                </Button>
            </CardActions>
        </div>);
}

export default Wrapper;

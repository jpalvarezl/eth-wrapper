import React, { useCallback, useEffect, useState, useMemo } from 'react';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { Button, CardActions, Snackbar, TextField } from '@material-ui/core';
import { getWethAddress } from '../utils/Erc20Constants';
import { ethers } from 'ethers';
import { WETHwithdraw_function } from '../utils/WETHConstants';

interface WrapperProps {
    wrap: boolean
}

const Wrapper: React.FC<WrapperProps> = (props: WrapperProps) => {
    const { sdk, safe } = useSafeAppsSDK();
    // const weth = useMemo(() => new ethers.Contract(WETH_ADDRESS, WETH_ABI, new SafeAppsSdkProvider(safe, sdk)), [sdk, safe]);

    const [amountToWrap, setAmountToWrap] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [availableEth, setAvailableEth] = useState(0.0);
    const [isError, setIsError] = useState(false);
    const [safeTxHash, setSafeTxHash] = useState("");

    const wrapEth = useCallback(async () => {
        if (isError) {
            return;
        }

        if (props.wrap) {
            try {
                const parsedAmount = ethers.utils.parseEther(amountToWrap)
                const safeTx = await sdk.txs.send({
                    txs: [{
                        to: getWethAddress(safe.network.toLowerCase()),
                        value: parsedAmount.toString(),
                        data: '0x'
                    }]
                })
                setSafeTxHash(safeTx.safeTxHash);
                console.log(safeTx.safeTxHash);
            } catch (e) {
                console.error(e)
            }
        } else {
            try {
                const parsedAmount = ethers.utils.parseEther(amountToWrap);
                const withdraw = new ethers.utils.Interface(WETHwithdraw_function);
                const safeTx = await sdk.txs.send({
                    txs: [{
                        to: getWethAddress(safe.network.toLowerCase()),
                        value: '0',
                        data: withdraw.encodeFunctionData("withdraw", [parsedAmount])
                    }]
                })
                setSafeTxHash(safeTx.safeTxHash);
                console.log(safeTx.safeTxHash);
            } catch (e) {
                console.error(e);
            }
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
            <Snackbar
                open={safeTxHash.length != 0}
                autoHideDuration={3000}
                onClose={() => setSafeTxHash("")}
                message="You transaction has been submitted"
            />
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

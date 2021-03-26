import React, { useCallback, useEffect, useState } from 'react';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { Button, CardActions, Snackbar, TextField } from '@material-ui/core';
import { WETH_ADDRESS } from '../utils/Erc20Constants';
import { ethers } from 'ethers';
import { TxHook, TxStatus } from '../hooks/TxHook';

interface WrapperProps {
    wrap: boolean
}

const Wrapper: React.FC<WrapperProps> = (props: WrapperProps) => {
    const { sdk, safe } = useSafeAppsSDK();
    const [amountToWrap, setAmountToWrap] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [availableEth, setAvailableEth] = useState(0.0);
    const [isError, setIsError] = useState(false);
    const [wrappingState, setWrappingState] = useState<TxStatus | null>(null);
    const [submittedSafeTxHash, setSumittedSafeTxHash] = useState<string | null>(null);

    const wrapEth = useCallback(async () => {
        if (isError) {
            return;
        }
        try {
            const parsedAmount = ethers.utils.parseEther(amountToWrap)
            const safeTx = await sdk.txs.send({
                txs: [{
                    to: WETH_ADDRESS,
                    value: parsedAmount.toString(),
                    data: '0x'
                }]
            })
            // setWrappingState(TxHook(sdk, safeTx.safeTxHash));
            setSumittedSafeTxHash(safeTx.safeTxHash);
            setWrappingState(TxStatus.Executing);

        } catch (e) {
            console.error(e)
        }
    }, [sdk, amountToWrap, isError])

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
                open={wrappingState == TxStatus.Executing}
                autoHideDuration={6000}
                message={"Submitted SafeTxHash: " + submittedSafeTxHash} />
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

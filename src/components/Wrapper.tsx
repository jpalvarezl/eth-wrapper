import React, { useCallback, useEffect, useState } from 'react';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { Snackbar, TextField } from '@material-ui/core';
import { Button, CopyToClipboardBtn, } from '@gnosis.pm/safe-react-components';
import { WETH_ADDRESS } from '../utils/Erc20Constants';
import { ethers } from 'ethers';
import { TxHook, TxStatus } from '../hooks/TxHook';

const Wrapper: React.FC = () => {
    const { sdk, safe } = useSafeAppsSDK();
    const [amountToWrap, setAmountToWrap] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [availableEth, setAvailableEth] = useState(0.0);
    const [isError, setIsError] = useState(false);
    const [wrappingState, setWrappingState] = useState<TxStatus | null>(null);
    const [submittedSafeTxHash, setSumittedSafeTxHash] = useState<string | null>(null);
    const [copiedValue, setCopiedValue] = useState("");

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
            setErrorMessage("Not enough Ether");
        }
        else {
            setIsError(false);
            setErrorMessage("");
            setAmountToWrap(newValue);
        }
    }, [availableEth])

    const copySafeTxHash = useCallback((value: string) => {
        document.execCommand("copy", false, value);
        setCopiedValue(value);
    }, [submittedSafeTxHash]);

    return (
        <div>
            <Snackbar
                open={wrappingState == TxStatus.Executing}
                autoHideDuration={6000}
                action={() => copySafeTxHash(submittedSafeTxHash!)}
                message={"Tap to copy your safeTxHash: " + submittedSafeTxHash} />
            <TextField
                value={amountToWrap}
                label="How much ETH you want wrap?"
                error={isError}
                helperText={errorMessage}
                onChange={e => validateAmout(e.target.value)}
                InputProps={{
                    endAdornment: <Button
                        size="md"
                        variant="contained"
                        color="primary"
                        onClick={() => wrapEth()}>
                        Wrap
            </Button>
                }}
            />
        </div>);
}

export default Wrapper;

import React, { useCallback, useState } from 'react';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { TextField } from '@material-ui/core';
import { Button, Title } from '@gnosis.pm/safe-react-components';
import { WETH_ADDRESS } from '../utils/Erc20Constants';
import { ethers } from 'ethers';

const Wrapper: React.FC = () => {
    const { sdk, safe } = useSafeAppsSDK();
    const [amountToWrap, setAmountToWrap] = useState("");

    const wrapEth = useCallback(async () => {
        try {
            console.log("Trying to wrap: ");
            console.log(amountToWrap);

            const parsedAmount = ethers.utils.parseEther(amountToWrap)
            await sdk.txs.send({
                txs: [{
                    to: WETH_ADDRESS,
                    value: parsedAmount.toString(),
                    data: '0x'
                }]
            })
        } catch (e) {
            console.error(e)
        }
    }, [sdk])

    return (
        <TextField
            value={amountToWrap}
            label="How much ETH you want wrap?"
            onChange={e => setAmountToWrap(e.target.value)}
            InputProps={{
                endAdornment: <Button
                    size="md"
                    variant="contained"
                    color="primary"
                    onClick={() => wrapEth()}>
                    Wrap
            </Button>
            }}
        />);
}

export default Wrapper;

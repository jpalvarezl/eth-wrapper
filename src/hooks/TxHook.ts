import { useEffect, useState } from "react";
import SafeAppsSDK from '@gnosis.pm/safe-apps-sdk';

export enum TxStatus {
    Executing,
    Done
}

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))

export function TxHook(sdk: SafeAppsSDK, safeTxHash: string) {
    const [isExecuting, setIsExecuting] = useState<TxStatus | null>(null)

    useEffect(() => {
        pollSafeTxHash()
    })

    async function pollSafeTxHash() {
        while (true) {
            const safeTx = await sdk.txs.getBySafeTxHash(safeTxHash);
            console.log({ safeTx });
            if (safeTx.isExecuted) {
                setIsExecuting(TxStatus.Done);
                return;
            } else {
                setIsExecuting(TxStatus.Executing);
                await delay(5000);
            }
        }
    }

    return isExecuting;
}

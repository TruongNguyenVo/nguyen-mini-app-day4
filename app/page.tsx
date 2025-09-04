'use client'
import { SwapDefault } from '@coinbase/onchainkit/swap'
import { useAccount } from 'wagmi'
import {
  ConnectWallet,
} from "@coinbase/onchainkit/wallet";
import {
  Name,
} from "@coinbase/onchainkit/identity";

export default function Page() {
  const { address } = useAccount()

  return (
    <main>
      <h1>Mini Swap</h1>
      <ConnectWallet>
        <Name className="text-inherit" />
      </ConnectWallet>
      <SwapDefault />
      <p className="muted">Connected: {address ?? 'not connected'}</p>
    </main>
  )
}

'use client'

import { useEffect, useState } from 'react'
import { getSwapQuote } from '@coinbase/onchainkit/api'
import { setOnchainKitConfig } from '@coinbase/onchainkit'
import type { Token } from '@coinbase/onchainkit/token';

setOnchainKitConfig({ apiKey: process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY })
console.log('API Key:', process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY);

type Quote = {
  fromAmount: string;
  toAmount: string;
  slippage: number;
  priceImpact: number;
};

export default function Page() {
  const [quote, setQuote] = useState<Quote | null>(null)

  useEffect(() => {
    const fetchQuote = async () => {
    const fromToken: Token = {
      name: 'ETH',
      address: '',
      symbol: 'ETH',
      decimals: 18,
      image: 'https://wallet-api-production.s3.amazonaws.com/uploads/tokens/eth_288.png',
      chainId: 8453,
    };

      const toToken: Token = {
        name: 'USDC',
        address: '0x833589fcd6edb6e08f4c7c32d4f71b54bda02913',
        symbol: 'USDC',
        decimals: 6,
        image: 'https://d3r81g40ycuhqg.cloudfront.net/wallet/wais/442b80bd16af0c0d9b22e03a16753823fe826e5bfd457292b55fa0ba8c1ba213-ZWUzYjJmZGUtMDYxNy00NDcyLTg0NjQtMWI4OGEwYjBiODE2',
        chainId: 8453,
      }

      const result = await getSwapQuote({
        from: fromToken,
        to: toToken,
        amount: '0.01',
        useAggregator: false,
      })

      console.log('Swap Quote:', result);
      setQuote(result as unknown as Quote);
    }

    fetchQuote()
  }, [])

  return (
    <main className="p-4">
      <h1 className="text-xl font-bold mb-2">Swap Quote</h1>
      {quote ? (
        <div>
          <p>API Key: {process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}</p>
          <p>From: {quote.fromAmount} USD</p>
          <p>To: {quote.toAmount} USD</p>
          <p>Slippage: {quote.slippage}%</p>
          <p>Price Impact: {quote.priceImpact}</p>
        </div>
      ) : (
        <p>Đang lấy báo giá...API Key: {process.env.NEXT_PUBLIC_ONCHAINKIT_API_KEY}</p>
      )}
    </main>
  )
}

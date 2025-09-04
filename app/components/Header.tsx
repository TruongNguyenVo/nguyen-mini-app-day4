import { Wallet, ConnectWallet} from '@coinbase/onchainkit/wallet';
import { Avatar, Name, Address} from '@coinbase/onchainkit/identity';

import { useAccount } from 'wagmi';

export default function Header() {
  const { isConnected } = useAccount();
  return (
    <Wallet>
      <ConnectWallet>
        <Avatar className="h-6 w-6" />
        <Name />
      </ConnectWallet>
      {isConnected && <Address />}
    </Wallet>
  );
}
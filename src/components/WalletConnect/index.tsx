/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAccount, useConnect, useDisconnect, useSwitchChain } from "wagmi";
import { injected } from "wagmi/connectors";
import { Flex, Box } from "@chakra-ui/react";
import {
  mainnet,
  sepolia,
  optimism,
  polygon,
  arbitrum,
  base,
} from "wagmi/chains";
import { useState, useEffect, useRef } from "react";
const WalletConnect = () => {
  const { address, isConnected, chainId } = useAccount();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { switchChainAsync } = useSwitchChain();
  const [currentChainId, setCurrentChaind] = useState(0);

  const diaRef = useRef<HTMLDialogElement>(null);

  const shortenAddress = (address?: string, length = 6) => {
    if (!address) return "";
    return `${address.slice(0, length)}...${address.slice(-length)}`;
  };
  useEffect(() => {
    if (chainId) {
      const chainIds: number[] = [
        mainnet.id,
        sepolia.id,
        optimism.id,
        polygon.id,
        arbitrum.id,
        base.id,
      ];
      if (!chainIds.includes(Number(chainId))) {
        diaRef.current?.showModal();
      } else {
        setCurrentChaind(chainId);
      }
    }
  }, [chainId]);
  const chainUpdate = (e: any) => {
    if (e.target.value) {
      switchChainAsync({ chainId: Number(e.target.value) });
    }
  };
  return (
    <div className="nes-ui" style={{ width: "90%", textAlign: "center" }}>
      {isConnected ? (
        <Flex alignItems={"center"} flexDirection={"column"}>
          <Box margin={"10px 0"}>Connected: {shortenAddress(address)}</Box>
          <Flex alignItems={"center"} justify={"space-around"} w={"100%"}>
            <div className="nes-select">
              <select value={currentChainId} onChange={(e) => chainUpdate(e)}>
                <option value={mainnet.id}>{mainnet.name}</option>
                <option value={sepolia.id}>{sepolia.name}</option>
                <option value={optimism.id}>{optimism.name}</option>
                <option value={polygon.id}>{polygon.name}</option>
                <option value={arbitrum.id}>{arbitrum.name}</option>
                <option value={base.id}>{base.name}</option>
              </select>
            </div>

            <button
              className="nes-btn is-error is-small"
              onClick={() => disconnect()}
            >
              Disconnect
            </button>
          </Flex>
        </Flex>
      ) : (
        <button
          className="nes-btn is-primary"
          onClick={() => connect({ connector: injected() })}
        >
          Connect Wallet
        </button>
      )}

      <dialog className="nes-dialog" ref={diaRef}>
        <form method="dialog">
          <p className="title">Wrong Chain</p>
          <p>Please switch to a supported chain.</p>
          <menu className="dialog-menu">
            <button className="nes-btn">Cancel</button>
            <button className="nes-btn is-primary">Confirm</button>
          </menu>
        </form>
      </dialog>
    </div>
  );
};

export default WalletConnect;

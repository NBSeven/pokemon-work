/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import {
  useAccount,
  useSendTransaction,
  useSwitchChain,
  useTransactionCount,
  useEstimateFeesPerGas,
  useChains,
} from "wagmi";
import { waitForTransactionReceipt } from "@wagmi/core";
import { config } from "./config";
import { parseUnits } from "ethers";
// import { ConnectButton } from "@rainbow-me/rainbowkit";
import { Flex, Stack } from "@chakra-ui/react";
import { FollowMouseFramer } from "../FollowMouseFramer";
import WalletConnect from "../WalletConnect";
// import "@rainbow-me/rainbowkit/styles.css";
import { base } from "wagmi/chains";

export const TransactionForm = () => {
  const { address, chain, chainId } = useAccount();
  const chains = useChains();
  const { sendTransactionAsync, isPending } = useSendTransaction();
  const { switchChainAsync } = useSwitchChain();
  const { data: nonceData, refetch } = useTransactionCount({
    address: address,
    query: { enabled: !!address },
  });

  const [toAddress, setToAddress] = useState(
    "0x9D266AD2b7c9C7F31E30C393974d4150CeaE28AC"
  );
  const [nonce, setNonce] = useState<number>(0);
  const [maxFee, setMaxFee] = useState("");
  const [maxPriorityFee, setMaxPriorityFee] = useState("");
  const [error, setError] = useState("");
  const [txHash, setTxHash] = useState("");
  const [result, setResult] = useState("");
  // 自动填充nonce
  useEffect(() => {
    if (nonceData !== undefined) {
      setNonce(nonceData);
    }
  }, [nonceData]);

  //动态获取Gas价格
  const { data: feeData } = useEstimateFeesPerGas();
  useEffect(() => {
    if (feeData) {
      const { maxFeePerGas, maxPriorityFeePerGas } = feeData.formatted;
      if (maxFeePerGas && maxPriorityFeePerGas) {
        setMaxFee(maxFeePerGas);
        setMaxPriorityFee(maxPriorityFeePerGas);
      }
    }
  }, [feeData]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setTxHash("");
    setResult("");
    const chainIds = chains.map((item) => item.id);
    try {
      if (!address || !toAddress) {
        throw new Error(
          "Please connect your wallet and fill in the target address first"
        );
      }
      // 网络切换处理 自动切换成base
      if (chainId && !chainIds.includes(chainId)) {
        await switchChainAsync({ chainId: base.id });
      }
      if (nonceData && nonce < nonceData) {
        throw new Error(
          `Current nonce:${nonce} cannot be less than nonceData:${nonceData}`
        );
      }
      const txParams = {
        to: toAddress as `0x${string}`,
        account: address,
        nonce: Number(nonce),
        maxFeePerGas: parseUnits(maxFee, "gwei"),
        maxPriorityFeePerGas: parseUnits(maxPriorityFee, "gwei"),
        chainId: chain?.id,
        value: 0n, // 默认不发送ETH
      };
      const hash = await sendTransactionAsync(txParams);
      setTxHash(hash);
      const receipt = await waitForTransactionReceipt(config, { hash: hash });
      if (receipt.status === "success") {
        console.log("交易成功！", receipt);
        setResult("Operation successful");
        refetch();
      } else {
        console.log("交易失败！", receipt);
      }
    } catch (err: any) {
      setError(err.shortMessage || err.message);
    }
  };

  return (
    <div className="nes-ui">
      <Flex direction="column" align={"center"}>
        {/* <ConnectButton
          showBalance={false}
          chainStatus="icon"
          label="Connect Wallet"
        /> */}
        <WalletConnect></WalletConnect>
        <Stack gap={"20px"} w={"600px"} padding={"20px"}>
          <FollowMouseFramer>
            <Flex justifyContent={"space-around"}>
              <i className="nes-pokeball"></i>
              <i className="nes-bulbasaur"></i>
              <i className="nes-charmander"></i>
              <i className="nes-squirtle"></i>
            </Flex>
          </FollowMouseFramer>
          <div className="nes-field">
            <label>Address</label>
            <input
              type="text"
              id="name_field"
              className="nes-input"
              value={toAddress}
              onChange={(e) => setToAddress(e.target.value)}
              placeholder="0x..."
              pattern="^0x[a-fA-F0-9]{40}$"
            />
          </div>
          <div className="nes-field">
            <label>Nonce</label>
            <input
              type="number"
              className="nes-input"
              value={nonce.toString()}
              onChange={(e) => setNonce(Number(e.target.value))}
              min={nonceData?.toString()}
            />
          </div>
          <div className="nes-field">
            <label>MaxFee (Gwei)</label>
            <input
              type="number"
              className="nes-input"
              value={maxFee}
              onChange={(e) => setMaxFee(e.target.value)}
              step="0.1"
              min={0}
            />
          </div>
          <div className="nes-field">
            <label>MaxPriorityFee (Gwei)</label>
            <input
              type="number"
              className="nes-input"
              value={maxPriorityFee}
              onChange={(e) => setMaxPriorityFee(e.target.value)}
              step="0.1"
              min={0}
            />
          </div>
          <button
            onClick={handleSubmit}
            className="nes-btn is-primary text-3xl"
            disabled={isPending}
          >
            Submit
          </button>
          {isPending && <div>Transaction Pending...</div>}
          {error && <div>{error}</div>}
          {txHash && <div>Transaction has been sent: {txHash}</div>}
          {result && <div>{result}</div>}
        </Stack>
      </Flex>
    </div>
  );
};

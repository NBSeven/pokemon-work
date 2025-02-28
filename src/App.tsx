import { getDefaultConfig, RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { WagmiProvider } from "wagmi";
import {
  mainnet,
  sepolia,
  optimism,
  polygon,
  arbitrum,
  base,
} from "wagmi/chains";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Box, Flex } from "@chakra-ui/react";
import { TransactionForm } from "./components/TransactionForm";
import GameBoy from "./components/GameBoy";
import "@rainbow-me/rainbowkit/styles.css";
import "nes.css/css/nes.min.css";

// 初始化配置
const config = getDefaultConfig({
  appName: "My RainbowKit App",
  projectId: "YOUR_PROJECT_ID",
  chains: [mainnet, sepolia, optimism, polygon, base, arbitrum],
  ssr: false,
});
const queryClient = new QueryClient();
export default function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          <Box p={4} bg={"url(./back.jpg) no-repeat"} bgSize={"cover"}>
            <Flex justify={"center"} justifyItems={"center"} align={"center"}>
              <GameBoy>
                <TransactionForm />
              </GameBoy>
            </Flex>
          </Box>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

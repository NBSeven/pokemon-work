import {
    mainnet,
    sepolia,
    optimism,
    polygon,
    arbitrum,
    base,
} from '@wagmi/core/chains'
import { http, createConfig } from '@wagmi/core'

export const config = createConfig({
    chains: [mainnet, sepolia, optimism, polygon, arbitrum, base],
    transports: {
        [mainnet.id]: http(),
        [sepolia.id]: http(),
        [optimism.id]: http(),
        [polygon.id]: http(),
        [arbitrum.id]: http(),
        [base.id]: http(),
    },
})
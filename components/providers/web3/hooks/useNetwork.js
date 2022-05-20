import { useEffect } from "react"
import useSWR from "swr"

const NETWORK = {
    1: "Ethereum Mainnet Network",
    3: "Ropsten Test Network",
    4: "Rinkeby Test Network",
    5: "Goerli Test Network",
    42: "Kovan Test Network",
    56: "Binance Smart Chain",
    1337: "Ganache",
    4919: "Truffle Develop",
}

const targetNetwork = NETWORK[process.env.NEXT_PUBLIC_TARGET_CHAIN_ID]

export const handler = (web3, provider) => () => {

    const { data, error, mutate, ...reset } = useSWR(() =>
        web3 ? "web3/network" : null,
        async () => {
            //const netId = await web3.eth.net.getId()
            const chanId = await web3.eth.getChainId()
            return NETWORK[parseInt(chanId, 16)]
        }
    )

    useEffect(() => {
        provider &&
            provider.on("chainChanged", chainId => {
                mutate(NETWORK[parseInt(chainId, 16)])
            })

    }, [web3])

    return {
        network: {
            data,
            hasFinishedFirstFetch: data || error,
            mutate,
            isLoading: !data && !error,
            targetNetwork: targetNetwork,
            isSupported: data === targetNetwork,
            ...reset,
        }
    }
}
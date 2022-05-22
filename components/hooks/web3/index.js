
import { useHooks } from "@components/providers/web3"

const enhanceHook = swrRes => {
    return {
        ...swrRes,
        hasInitialResponse: swrRes.data || swrRes.error
    }
}

export const useAccount = () => {
    const swr = enhanceHook(useHooks(hooks => hooks.useAccount)())
    return {
        account: swr
    }
}

export const useNetwork = () => {
    const swr = enhanceHook(useHooks(hooks => hooks.useNetwork)())
    return {
        network: swr
    }
}

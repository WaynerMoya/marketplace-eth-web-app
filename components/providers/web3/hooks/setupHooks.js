
import { handler as createAccountHook } from "./useAccount";
import { handler as crateNetworkHook } from "./useNetwork";

export const setupHooks = (...deps) => {
  return {
    useAccount: createAccountHook(...deps),
    useNetwork: crateNetworkHook(...deps),
  }
}



import { useEffect } from "react"
import useSWR from "swr"

const adminAddresses = {
  "0x5898a5C7b2c887512e335d28E84F89fD606CAC5A": true
}

export const handler = (web3, provider) => () => {

  const { data, mutate, ...rest } = useSWR(() =>
    web3 ? "web3/accounts" : null,
    async () => {
      const accounts = await web3.eth.getAccounts()
      return accounts[0]
    }
  )

  useEffect(() => {
    provider &&
    provider.on("accountsChanged",
      accounts => mutate(accounts[0] ?? null)
    )
  }, [provider])

  return {
    account: {
      data,
      isAdmin: (
        data &&
        //adminAddresses[web3.utils.keccak256(data)]) ?? false,
        adminAddresses[data]) ?? false,
      mutate,
      ...rest
    }
  }
}

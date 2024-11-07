import { useQuery } from "@tanstack/react-query";

import { client } from "@/lib/rpc";

export const useCurrentUser = () => {
  const query = useQuery({
    queryKey: ["currentUser"],
    queryFn: async () => {
      const response = await client.api.auth.currentUser.$get()

      if (!response.ok) {
        return null
      }

      const { data } = await response.json()

      return data
    }
  })

  return query
}


// Why not wrap resposne in trycatch -> Because it is a fetch method and it will not throw error inside catch block unlike axios
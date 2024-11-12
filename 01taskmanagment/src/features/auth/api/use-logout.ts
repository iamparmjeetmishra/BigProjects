import { useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>

type RequestType = InferRequestType<typeof client.api.auth.logout["$post"]>


export const useLogout = () => {
  const router = useRouter()

  const queryClient = useQueryClient()

  const mutation = useMutation<
  ResponseType,
    Error
  >({
    mutationFn: async () => {
      const response = await client.api.auth.logout["$post"]();

      if (!response.ok) {
        throw new Error(response.statusText || "Failed to logout");
      }

      return await response.json();
    },
    onSuccess: () => {
      toast.success("Logged out successfully")
      router.refresh()
      // window.location.reload();
      queryClient.invalidateQueries({queryKey: ["currentUser"]})
      queryClient.invalidateQueries({queryKey: ["workspaces"]})
    },
    onError: (error) => {
      toast.error(error.message || "Failed to logged out")
    }
  });
  return mutation;
}
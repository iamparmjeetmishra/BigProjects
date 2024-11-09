import { QueryClient, useMutation, useQueryClient } from "@tanstack/react-query";
import { InferRequestType, InferResponseType } from "hono";

import { client } from "@/lib/rpc";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.register["$post"]>

type RequestType = InferRequestType<typeof client.api.auth.register["$post"]>


export const useRegister = () => {
  const router = useRouter()
  const queryClient = useQueryClient()
  const mutation = useMutation<
    ResponseType,
    Error,
    RequestType
  >({
    mutationFn: async ({json}) => {
      const response = await client.api.auth.register["$post"]({ json });

      if (!response.ok) {
        throw new Error(response.statusText || "Failed to register");
      }
      
      return await response.json();
    },
    onSuccess: () => {
      toast.success("Registered successfully")
      router.refresh()
      queryClient.invalidateQueries({ queryKey: ["currentUser"] })
    },
    onError: (error) => {
      toast.error(error.message || "Failed to register user")
    }
  });
  return mutation;
}
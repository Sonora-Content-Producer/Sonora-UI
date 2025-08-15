import { api } from "@/lib/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface SocialAccount {
  id: number;
  provider: string;
  uid: string;
  extra_data: {
    email?: string;
    name?: string;
    picture?: string;
  };
  date_joined: string;
}

interface SocialAccountsResponse {
  social_accounts: SocialAccount[];
  total_count: number;
}

export const useSocialAccounts = () => {
  const queryClient = useQueryClient();

  const {
    data: socialAccounts,
    isLoading,
    error,
    refetch,
  } = useQuery({
    queryKey: ["social-accounts"],
    queryFn: async (): Promise<SocialAccountsResponse> => {
      const response = await api.get("/api/v1/auth/social-accounts/");
      return response.data;
    },
  });

  const disconnectAccountMutation = useMutation({
    mutationFn: async (accountId: number) => {
      await api.delete(`/api/v1/auth/social-accounts/${accountId}/disconnect/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["social-accounts"] });
      toast.success("Conta desconectada com sucesso!");
    },
    onError: (error) => {
      console.error("Erro ao desconectar conta:", error);
      toast.error("Erro ao desconectar conta");
    },
  });

  const googleAccount = socialAccounts?.social_accounts?.find(
    (acc) => acc.provider === "google"
  );

  return {
    socialAccounts: socialAccounts?.social_accounts || [],
    totalCount: socialAccounts?.total_count || 0,
    googleAccount,
    isLoading,
    error,
    refetch,
    disconnectAccount: disconnectAccountMutation.mutate,
    isDisconnecting: disconnectAccountMutation.isPending,
  };
};

import { api } from "@/lib/api";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

interface IdeaData {
  title: string;
  description: string;
  content: string;
  platform: string;
  content_type: string;
  variation_type: string;
}

interface Campaign {
  id: number;
  name: string;
  description: string;
  // Add other campaign properties as needed
}

export const useIdeaOperations = () => {
  const queryClient = useQueryClient();

  const deleteIdeaMutation = useMutation({
    mutationFn: async (id: number) => {
      await api.delete(`/api/v1/ideabank/ideas/${id}/`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns-with-ideas"] });
      queryClient.invalidateQueries({ queryKey: ["campaign-stats"] });
      toast.success("Ideia deletada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao deletar ideia");
    },
  });

  const deleteCampaignMutation = useMutation({
    mutationFn: async (id: number) => {
      const response = await api.delete(`/api/v1/ideabank/campaigns/${id}/`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns-with-ideas"] });
      toast.success("Campanha excluída com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao excluir campanha");
      console.error("Error deleting campaign:", error);
    },
  });

  const addIdeaMutation = useMutation({
    mutationFn: async ({
      campaignId,
      ideaData,
    }: {
      campaignId: number;
      ideaData: IdeaData;
    }) => {
      const response = await api.post(
        `/api/v1/ideabank/campaigns/${campaignId}/generate-idea/`,
        ideaData
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns-with-ideas"] });
      toast.success("Ideia criada com IA com sucesso!");
    },
    onError: (error) => {
      toast.error("Erro ao criar ideia");
      console.error("Error creating idea:", error);
    },
  });

  const updateCampaignMutation = useMutation({
    mutationFn: async ({
      id,
      data,
    }: {
      id: number;
      data: Partial<Campaign>;
    }) => {
      const response = await api.patch(
        `/api/v1/ideabank/campaigns/${id}/`,
        data
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["campaigns-with-ideas"] });
      queryClient.invalidateQueries({ queryKey: ["campaign-stats"] });
      toast.success("Campanha atualizada com sucesso!");
    },
    onError: () => {
      toast.error("Erro ao atualizar campanha");
    },
  });

  return {
    deleteIdea: deleteIdeaMutation.mutate,
    deleteCampaign: deleteCampaignMutation.mutate,
    addIdea: addIdeaMutation.mutate,
    updateCampaign: updateCampaignMutation.mutate,
    isDeletingIdea: deleteIdeaMutation.isPending,
    isDeletingCampaign: deleteCampaignMutation.isPending,
    isAddingIdea: addIdeaMutation.isPending,
    isUpdatingCampaign: updateCampaignMutation.isPending,
  };
};

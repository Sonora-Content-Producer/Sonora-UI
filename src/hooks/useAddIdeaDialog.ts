import { api } from "@/lib/api";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

interface GenerateIdeaRequest {
  campaignId: number;
  requestData: {
    title?: string;
    description?: string;
    content?: string;
    platform: string;
    content_type: string;
    variation_type: string;
  };
}

interface GeneratedIdea {
  title: string;
  description: string;
  content: string;
}

export const useAddIdeaDialog = () => {
  const generateIdeaMutation = useMutation({
    mutationFn: async ({
      campaignId,
      requestData,
    }: GenerateIdeaRequest): Promise<GeneratedIdea> => {
      const response = await api.post(
        `/api/v1/ideabank/campaigns/${campaignId}/generate-idea/`,
        requestData
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success(
        "Ideia gerada com IA com sucesso! Revise e ajuste conforme necessário."
      );
    },
    onError: (error) => {
      console.error("Error generating idea:", error);
      toast.error("Erro ao conectar com o servidor");
    },
  });

  return {
    generateIdea: generateIdeaMutation.mutateAsync,
    isGenerating: generateIdeaMutation.isPending,
  };
};

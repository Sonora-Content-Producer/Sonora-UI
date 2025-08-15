import { api } from "@/lib/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "sonner";

interface PublicIdeaGenerationOptions {
  objectives: { value: string; label: string }[];
  content_types: Record<string, string[]>;
  platforms: { value: string; label: string }[];
  voice_tones: { value: string; label: string }[];
}

interface PublicIdeaGenerationFormData {
  title: string;
  description?: string;
  objectives: string[];
  platforms: string[];
  content_types?: Record<string, string[]>;
  voice_tone: string;
  persona_age?: string;
  persona_location?: string;
  persona_income?: string;
  persona_interests?: string;
  persona_behavior?: string;
  persona_pain_points?: string;
  product_description?: string;
  value_proposition?: string;
  campaign_urgency?: string;
}

interface GeneratedIdea {
  title: string;
  description: string;
  content: string;
  platform: string;
  content_type: string;
}

interface PublicIdeaGenerationResponse {
  ideas: GeneratedIdea[];
}

export const usePublicIdeaGeneration = () => {
  // Query para buscar opções
  const {
    data: options,
    isLoading: isLoadingOptions,
    error: optionsError,
  } = useQuery({
    queryKey: ["public-idea-options"],
    queryFn: async (): Promise<PublicIdeaGenerationOptions> => {
      const response = await api.get("/api/v1/ideabank/public/options/");
      return response.data;
    },
  });

  // Mutation para gerar ideias
  const generateIdeasMutation = useMutation({
    mutationFn: async (
      formData: PublicIdeaGenerationFormData
    ): Promise<PublicIdeaGenerationResponse> => {
      const response = await api.post(
        "/api/v1/ideabank/public/generate/",
        formData
      );
      return response.data;
    },
    onSuccess: () => {
      toast.success("Ideias geradas com sucesso!");
    },
    onError: (error: Error) => {
      const errorMessage = error.message || "Erro ao gerar ideias";
      toast.error(errorMessage);
    },
  });

  return {
    options,
    isLoadingOptions,
    optionsError,
    generateIdeas: generateIdeasMutation.mutate,
    generateIdeasAsync: generateIdeasMutation.mutateAsync,
    isGenerating: generateIdeasMutation.isPending,
    generatedIdeas: generateIdeasMutation.data?.ideas || [],
  };
};

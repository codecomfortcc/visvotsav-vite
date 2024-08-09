import { useToast } from "@/components/ui/use-toast";
import { postQuery, postSubmit } from "@/services/api";
import { useMutation } from "@tanstack/react-query";

export const useQuerySubmit = () => {
  const toast = useToast();
  return useMutation({
    mutationFn: postQuery,
    onError: (data) => {
      toast({
        variant: "destructive",
        title: "Error",
        message: `${data.message}`,
      });
    },
  });
};
export const useFormSubmit = () => {
  return useMutation({
    mutationFn: postSubmit,
  });
};

import API from "lib/configs/axios";
import { useMutation, useQueryClient } from "react-query";

export const useAddRecordsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.post("records", content), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["records"] }, { cancelRefetch: true });
		},
	});
};
export const useEditRecordsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.put(`records/${content.id}`, content.body), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["records"] }, { cancelRefetch: true });
		},
	});
};
export const useDeleteRecordsMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.delete(`records/${content}`), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["records"] }, { cancelRefetch: true });
		},
	});
};

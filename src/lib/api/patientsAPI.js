import API from "lib/configs/axios";
import { useMutation, useQueryClient } from "react-query";

export const useAddPatientMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.post("patients", content), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["patients"] }, { cancelRefetch: true });
		},
	});
};
export const useEditPatientMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.put(`patients/${content.id}`, content.body), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["patients"] }, { cancelRefetch: true });
		},
	});
};
export const useDeletePatientMutation = () => {
	const queryClient = useQueryClient();
	return useMutation((content) => API.delete(`patients/${content}`), {
		onSuccess: async () => {
			await queryClient.invalidateQueries({ queryKey: ["patients"] }, { cancelRefetch: true });
		},
	});
};

import { useQueryClient } from "react-query";

export const useFetchQuery = (key) => {
	const queryClient = useQueryClient();

	return queryClient.getQueryData(key);
};

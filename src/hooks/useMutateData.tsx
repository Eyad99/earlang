import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'react-toastify';

interface MutationOptions {
	mutationFn: (...args: any[]) => Promise<any>;
	closeDialog?: () => void;
	onSuccessFn?: (...options: any) => void;
	onErrorFn?: (...options: any) => void;
	invalidateKeys?: any[];
	multipleKeys?: boolean;
	displaySuccess?: boolean;
}

export const useMutateData = (options: MutationOptions) => {
	const queryClient = useQueryClient();

	const data = useMutation({
		mutationFn: options.mutationFn,
		onSuccess(data, variables) {
			if (options.multipleKeys && options.invalidateKeys) {
				options.invalidateKeys.map((key) => queryClient.invalidateQueries(key));
			} else if (options.invalidateKeys) {
				queryClient.invalidateQueries(options.invalidateKeys as any);
			}

			if (options.displaySuccess) {
				toast.success(data?.data?.message ?? `success`);
			}

			if (options.onSuccessFn) {
				options.onSuccessFn({ data: data?.data, variables: variables });
			}

			if (options.closeDialog) {
				options.closeDialog();
			}
		},

		onError: (error: any, variables: any) => {
			if (Array.isArray(error.message)) {
				error.message.map((el: any) => toast.error(el));
			} else {
				toast.error(error.message ?? 'Error');
			}

			if (options.onErrorFn) {
				options.onErrorFn(error?.message ?? 'Error', variables);
			}
		},
	});

	return data;
};

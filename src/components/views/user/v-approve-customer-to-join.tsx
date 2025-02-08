import FormBuilder from '@/components/formBuilder';
import { Skeleton } from '@/components/ui/skeleton';
import { Approve_Customer_To_join_Req, authApi } from '@/core';
import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { useMutateData } from '@/hooks/useMutateData';
import * as yup from 'yup';

const VApproveCustomerToJoin = ({
	customerId,
	setCustomerId,
	setIsOpen,
}: {
	customerId: string;
	setCustomerId: (status: string) => void;
	setIsOpen: (status: boolean) => void;
}) => {
	const {
		data: planData,
		isLoading: planLoading,
		isFetching: planFetching,
	} = useFetchDataRQ({
		queryKey: ['plans'],
		queryFn: () => authApi.plans(),
	});

	const {
		data: busnissTypeData,
		isLoading: busnissTypeLoading,
		isFetching: busnissTypeFetching,
	} = useFetchDataRQ({
		queryKey: ['busniss-types'],
		queryFn: () => authApi.busnissTypes(),
	});

	const approveCustomerToJoinMutate = useMutateData({
		mutationFn: (data) => authApi.approveCustomerTojoin(data, customerId),
		invalidateKeys: ['users'],
		displaySuccess: true,
		onSuccessFn({}) {
			setCustomerId('');
			setIsOpen(false);
		},
	});

	const initialValues = { plan: undefined, economice: undefined };

	const validationSchema = yup.object().shape({
		plan: yup.string().required('Plan is required'),
		economice: yup.string().required('Business type is required'),
	});

	const submitHandler = (values: Approve_Customer_To_join_Req) => {
		approveCustomerToJoinMutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: approveCustomerToJoinMutate?.isPending,
		formSchema: [
			{
				name: 'plan',
				type: 'select',
				label: `Plan`,
				colSpan: 'col-span-2',
				chosenFieldName: 'id',
				elements: planData?.data ?? [],
			},
			{
				name: 'economice',
				type: 'select',
				label: `Business type`,
				colSpan: 'col-span-2',
				chosenFieldName: 'id',
				elements: busnissTypeData?.data ?? [],
			},
		],
	};

	if (busnissTypeFetching || planFetching)
		return (
			<div className=' rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white '>
				<Skeleton className='h-[300px] rounded-xl bg-[#E9EDF5]' />
			</div>
		);
	return (
		<div>
			<div>
				<h2 className='text-lg font-bold text-navy-700 dark:text-white'>Approve Customer to join</h2>
			</div>

			<FormBuilder {...formBuilderArgs} />
		</div>
	);
};

export default VApproveCustomerToJoin;

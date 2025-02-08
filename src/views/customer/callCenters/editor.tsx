import { authApi, CallCenter_C_Req } from '@/core';
import { useNavigate, useParams } from 'react-router-dom';
import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { callCenterApi } from '@/core/services/callCenter';
import { useMutateData } from '@/hooks/useMutateData';
import { Skeleton } from '@/components/ui/skeleton';
import FormBuilder from '@/components/formBuilder';
import * as yup from 'yup';

const CallCenterEditor = () => {
	const navigate = useNavigate();
	const { callCenterId } = useParams();
	const Add = callCenterId === 'add';

	const { data, isLoading } = useFetchDataRQ({
		queryKey: ['call-center', callCenterId],
		queryFn: () => callCenterApi.callCenterById(callCenterId),
		enableCondition: !Add,
	});

	const {
		data: busnissTypeData,
		isLoading: busnissTypeLoading,
		isFetching: busnissTypeFetching,
	} = useFetchDataRQ({
		queryKey: ['busniss-types'],
		queryFn: () => authApi.busnissTypes(),
		enableCondition: !Add,
	});

	const createCallCenterMutate = useMutateData({
		mutationFn: (data) => callCenterApi.addCallCenter(data),
		displaySuccess: true,
		onSuccessFn: () => {
			navigate(-1);
		},
	});

	const updateCallCenterMutate = useMutateData({
		mutationFn: (data) => callCenterApi.updateCallCenter(data, callCenterId),
		displaySuccess: true,
		onSuccessFn: () => {
			navigate(-1);
		},
	});

	const initialValues = {
		name: data?.data?.name || '',
		business_type: data?.data?.economice?.name || undefined,
		location: data?.data?.location || '',
		number_of_seats: data?.data?.number_of_seats || 0,
		number_of_agents: data?.data?.number_of_agents || 0,
		number_of_supers: data?.data?.number_of_supers || 0,
		number_of_tls: data?.data?.number_of_tls || 0,
		total_no_agents: data?.data?.total_no_agents || 0,
		staff_dedicated_QA: data?.data?.staff_dedicated_QA || '',
		staff_dedicated_scheduling: data?.data?.staff_dedicated_scheduling || '',
		staff_dedicated_training: data?.data?.staff_dedicated_training || '',
		it_staff_available: data?.data?.it_staff_available || '',
		Working_hours: data?.data?.Working_hours || 0,
		Working_days: data?.data?.Working_days || 0,
		number_of_skill_groups: data?.data?.number_of_skill_groups || 0,
		list_of_skill_groups: data?.data?.list_of_skill_groups || '',
		notices: data?.data?.notices || '',
	};

	const validationSchema = yup.object().shape({
		name: yup.string().required('Name is required'),
		location: yup.string().required('Location is required'),
	});

	const submitHandler = (values: CallCenter_C_Req) => {
		Add ? createCallCenterMutate.mutate(values) : updateCallCenterMutate.mutate(values);
	};

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: submitHandler,
		validationSchema: validationSchema,
		loading: Add ? createCallCenterMutate?.isPending : updateCallCenterMutate.isPending,
		formSchema: [
			{
				name: 'name',
				type: 'text',
				label: `Name`,
				placeholder: `Name`,
			},
			!Add && {
				name: 'business_type',
				type: 'select',
				label: `Business Type`,
				elements: busnissTypeData?.data ?? [],
			},
			{
				name: 'location',
				type: 'text',
				label: `Location`,
				placeholder: `Location`,
			},
			{
				name: 'number_of_seats',
				type: 'number',
				label: `Number Of Seats`,
				placeholder: `Number Of Seats`,
			},
			{
				name: 'number_of_agents',
				type: 'number',
				label: `Number Of Agents`,
				placeholder: `Number Of Agents`,
			},
			{
				name: 'number_of_supers',
				type: 'number',
				label: `Number Of Supers`,
				placeholder: `Number Of Supers`,
			},
			{
				name: 'number_of_tls',
				type: 'number',
				label: `Number Of Tls`,
				placeholder: `Number Of Tls`,
			},
			{
				name: 'total_no_agents',
				type: 'number',
				label: `Number Of Agents`,
				placeholder: `Number Of Agents`,
			},
			{
				name: 'staff_dedicated_QA',
				type: 'text',
				label: `Agent Dedicated QA`,
				placeholder: `Agent Dedicated QA`,
			},
			{
				name: 'staff_dedicated_scheduling',
				type: 'text',
				label: `Agent Dedicated Scheduling`,
				placeholder: `Agent Dedicated Scheduling`,
			},
			{
				name: '_dedicated_training',
				type: 'text',
				label: `Agent Dedicated Training`,
				placeholder: `Agent Dedicated Training`,
			},
			{
				name: 'Working_hours',
				type: 'text',
				label: `Working Hours`,
				placeholder: `Working Hours`,
			},
			{
				name: 'Working_days',
				type: 'text',
				label: `Working Days`,
				placeholder: `Working Days`,
			},
			{
				name: 'number_of_skill_groups',
				type: 'text',
				label: `Number Of Skill Groups`,
				placeholder: `Number Of Skill Groups`,
			},
			{
				name: 'list_of_skill_groups',
				type: 'text',
				label: `List Of Skill Groups`,
				placeholder: `List Of Skill Groups`,
			},
			{
				name: 'it_staff_available',
				type: 'text',
				label: `Availability of agents`,
				placeholder: `Availability of agents`,
			},
			{
				name: 'notices',
				type: 'textarea',
				label: `Notices`,
				placeholder: `Notices`,
			},
		],
	};

	if (isLoading || busnissTypeLoading || busnissTypeFetching)
		return (
			<div className=' rounded-[20px] bg-white bg-clip-border shadow-3xl shadow-shadow-500 dark:!bg-navy-800 dark:text-white '>
				<Skeleton className='h-[300px] rounded-xl bg-[#E9EDF5]' />
			</div>
		);
	return <FormBuilder {...formBuilderArgs} />;
};

export default CallCenterEditor;

import { authApi, CallCenter_Profile_Req } from '@/core';
import { KEY_USER_COOKIE } from '@/variables/constants';
import { useFetchDataRQ } from '@/hooks/useFetchDataRQ';
import { useMutateData } from '@/hooks/useMutateData';
import VInformation from '@/components/views/profiles/customer/v-information';
import Cookies from 'js-cookie';
import * as yup from 'yup';
import AccountInforationSkeleton from '@/utils/skeletons/account-inforation-skeleton';

const Information = () => {
	let user: any = Cookies.get(KEY_USER_COOKIE);
	user = user ? JSON.parse(user) : {};

	const { data, isLoading } = useFetchDataRQ({
		queryKey: ['callCenterProfile'],
		queryFn: () => authApi.callCenterProfile('3'),
	});

	const updateCallCenterInforationMutate = useMutateData({
		mutationFn: (data: CallCenter_Profile_Req) => authApi.updateCallCenterProfile(data, '3'),
		invalidateKeys: ['callCenterProfile', '3'],
	});

	const initialValues = {
		name: (data && data?.data?.name) || '',
		location: (data && data?.data?.location) || '',
		number_of_seats: (data && data?.data?.number_of_seats) || 0,
		number_of_agents: (data && data?.data?.number_of_agents) || 0,
		number_of_supers: (data && data?.data?.number_of_supers) || 0,
		number_of_tls: (data && data?.data?.number_of_tls) || 0,
		total_no_agents: (data && data?.data?.total_no_agents) || 0,
		staff_dedicated_QA: (data && data?.data?.staff_dedicated_QA) || '',
		staff_dedicated_scheduling: (data && data?.data?.staff_dedicated_scheduling) || '',
		staff_dedicated_training: (data && data?.data?.staff_dedicated_training) || '',
		it_staff_available: (data && data?.data?.it_staff_available) || false,
		Working_hours: (data && data?.data?.Working_hours) || '',
		Working_days: (data && data?.data?.Working_days) || '',
		number_of_skill_groups: (data && data?.data?.number_of_skill_groups) || 0,
		list_of_skill_groups: (data && data?.data?.list_of_skill_groups) || 0,
		notices: (data && data?.data?.notices) || '',
		business_type: (data && data?.data?.business_type) || '',
	};

	const handleFormSubmit = (values: CallCenter_Profile_Req) => {
		updateCallCenterInforationMutate.mutate(values);
	};

	const validationSchema = yup.object().shape({});

	const formBuilderArgs = {
		initialValues: initialValues,
		handleSubmit: handleFormSubmit,
		validationSchema: validationSchema,
		loading: updateCallCenterInforationMutate?.isPending,
		formClassName: '',
		gridClassName: 'mt-7 mb-2 grid grid-cols-2 gap-3',
		formSchema: [
			{
				name: 'name',
				type: 'text',
				label: `Call center Name`,
				placeholder: 'Call center Name',
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
				label: `Total No Agents`,
				placeholder: `Total No Agents`,
			},
			{
				name: 'staff_dedicated_QA',
				type: 'text',
				label: `Staff Dedicated Qa`,
				placeholder: `Staff Dedicated Qa`,
			},
			{
				name: 'staff_dedicated_scheduling',
				type: 'text',
				label: `Staff Dedicated Scheduling`,
				placeholder: `Staff Dedicated Scheduling`,
			},
			{
				name: 'staff_dedicated_training',
				type: 'text',
				label: `Staff Dedicated Training`,
				placeholder: `Staff Dedicated Training`,
			},
			{
				name: 'Working_hours',
				type: 'number',
				label: `Working Hours`,
				placeholder: `Working Hours`,
			},
			{
				name: 'Working_days',
				type: 'number',
				label: `Working_days`,
				placeholder: `Working_days`,
			},
			{
				name: 'number_of_skill_groups',
				type: 'number',
				label: `Number Of Skill Groups`,
				placeholder: `Number Of Skill Groups`,
			},
			{
				name: 'list_of_skill_groups',
				type: 'number',
				label: `List Of Skil Groups`,
				placeholder: `List Of Skil Groups`,
			},
			{
				name: 'notices',
				type: 'text',
				label: `Notices`,
				placeholder: `Notices`,
			},
			{
				name: 'business_type',
				type: 'select',
				label: `Busines Type`,
				placeholder: `Busines Type`,

				elements: [
					{ id: 'Business Process Outsourcing (BPO)', name: 'Business Process Outsourcing (BPO)' },
					{ id: 'Healthcare and Telemedicine', name: 'Healthcare and Telemedicine' },
					{ id: 'Automotive', name: 'Automotive' },
					{ id: 'Telecommunication', name: 'Telecommunication' },
					{ id: 'Banking and Financial Services', name: 'Banking and Financial Services' },
					{ id: 'Restaurants and Food Services', name: 'Restaurants and Food Services' },
					{ id: 'Travel and Transportation', name: 'Travel and Transportation' },
					{ id: 'Retail', name: 'Retail' },
					{ id: 'Government Sector', name: 'Government Sector' },
					{ id: 'Insurance', name: 'Insurance' },
				],
			},
			{
				name: 'it_staff_available',
				type: 'switch',
				label: `Staff Available`,
			},
		],
	};

	if (isLoading) return <AccountInforationSkeleton />;

	return <VInformation formBuilderArgs={formBuilderArgs} />;
};

export default Information;

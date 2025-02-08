import DataTable from '@/components/dataTable/DataTable';
import { DataTableProps } from '@/core';

export const CallCenters = () => {
	const tableProps: DataTableProps = {
		fetchUrl: 'auth/callcenters/',
		queryKey: 'call-centers',
		columns: [
			{ header: 'Name', accessor: 'name' },
			{ header: 'Plan', accessor: 'plan.name' },
			{ header: 'Business type', accessor: 'economice.name' },
			{
				header: 'Number of agents',
				accessor: 'total_no_agents',
				formatter: (value: any) => value ?? 0,
			},
		],
		actions: {
			add: {},
			edit: {},
		},
	};

	return (
		<div className='mt-5 grid h-full grid-cols-1 gap-5  md:grid-cols-1'>
			<DataTable {...tableProps} />
		</div>
	);
};

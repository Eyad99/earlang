import DataTable from '@/components/dataTable/DataTable';
import { Button } from '@/components/ui/button';
import { DataTableProps, Staff_Res } from '@/core';
import { useNavigate, useParams } from 'react-router-dom';

const AllStaffsCallCenter = () => {
	const { callCenterId } = useParams();
	const navigate = useNavigate();

	const tableProps: DataTableProps<Staff_Res> = {
		fetchUrl: `auth/callcenter/${callCenterId}/staff/`,
		queryKey: `staffs-by-callcenter-${callCenterId}`,
		columns: [
			{ header: 'Name', accessor: 'user.fullname' },
			{ header: 'Email', accessor: 'user.email' },
			{ header: 'Call Center Name', accessor: 'callcenter.name' },
		],
		actions: {
			custom: {
				component: (rowData: any) => {
					return (
						<Button
							onClick={() => {
								navigate(`/admin/call-centers/${rowData.row.original.id}/staffs/${rowData.row.original.user.id}/files`);
							}}
						>
							View Files
						</Button>
					);
				},
			},
		},
	};

	return (
		<div className='mt-5 grid h-full grid-cols-1 gap-5  md:grid-cols-1'>
			<DataTable {...tableProps} />
		</div>
	);
};

export default AllStaffsCallCenter;

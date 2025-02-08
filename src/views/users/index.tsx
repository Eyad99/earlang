import React, { useState } from 'react';
import { DataTableProps } from '@/core';
import { Button } from '@/components/ui/button';
import VApproveCustomerToJoin from '@/components/views/user/v-approve-customer-to-join';
import EControlledDialog from '@/components/reusable/dialog/controlled-dialog';
import DataTable from '@/components/dataTable/DataTable';
import SwitchField from '@/components/reusable/fields/SwitchField';

export const UsersList = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [customerId, setCustomerId] = useState('');

	const tableProps: DataTableProps = {
		fetchUrl: 'auth/users/',
		queryKey: 'users',
		columns: [
			{ header: 'Name', accessor: 'fullname' },
			{ header: 'Email', accessor: 'email' },
			{ header: 'Role', accessor: 'role' },
		],
		actions: {
			edit: {},
			custom: {
				component: (rowData: any) => {
					return (
						<React.Fragment>
							{/* <SwitchField label={''} onChange={() => {}} checked={rowData.row.original?.active} /> */}
							{rowData.row.original?.role == 'customer' && (
								<Button
									variant={'greenOutline'}
									size={'sm'}
									onClick={() => {
										setIsOpen(true);
										setCustomerId(rowData.row.original?.id);
									}}
								>
									Approve
								</Button>
							)}
						</React.Fragment>
					);
				},
			},
		},
	};

	return (
		<React.Fragment>
			<EControlledDialog
				isOpen={isOpen}
				setOpen={setIsOpen}
				contentClassName='md:max-w-[425px] max-w-full'
				dialogBody={<VApproveCustomerToJoin customerId={customerId} setCustomerId={setCustomerId} setIsOpen={setIsOpen} />}
			/>
			<div className='mt-5 grid h-full grid-cols-1 gap-5  md:grid-cols-1'>
				<DataTable {...tableProps} />
			</div>{' '}
		</React.Fragment>
	);
};

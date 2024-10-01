import Banner from './banner';
import Information from './information';

const CustomerProfile = () => {
	return (
		<div className='flex w-full flex-col gap-5 lg:gap-5'>
			<div className='w-ful mt-3 flex h-fit flex-col gap-5 lg:grid lg:grid-cols-12'>
				<div className='col-span-4 lg:!mb-0 h-fit'>
					<Banner />
				</div>

				<div className='col-span-8 lg:!mb-0'>
					<Information />
				</div>
			</div>
		</div>
	);
};

export default CustomerProfile;

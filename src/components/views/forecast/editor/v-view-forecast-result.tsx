import React from 'react';
import Cookies from 'js-cookie';
import VWeight from './v-weight';
import moment from 'moment';
import Card from '@/components/reusable/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { useNavigate, useParams } from 'react-router-dom';
import { LoaderIcon } from 'lucide-react';
import { Button } from '@/components/ui/button';

const VViewForecastResult = ({ data, formProperities }: { data: any; formProperities: any }) => {
	const { forecastId, forecastType } = useParams();
	const navigate = useNavigate();

	let user: any = Cookies.get('user');
	user = user ? JSON.parse(user) : {};

	const headClassName = 'text-sm font-bold text-gray-600 dark:text-white pb-2 pr-4 pt-4 text-center';
	const bodyCellCassName = 'min-w-[100px] border-white/0 py-3 pr-4 text-[14px] text-navy-700 dark:text-white text-center';

	return (
		<React.Fragment>
			<div className='flex flex-col gap-6'>
				<div className='flex justify-between'>
					<div className='flex gap-2'>
						<Button
							variant={forecastType == 'volume' ? 'green' : 'greenOutline'}
							size={'sm'}
							onClick={() => navigate(`/${user?.role == 'customer' ? 'customer' : 'admin'}/forecast/${forecastId}/volume`)}
						>
							View By Volume
						</Button>
						<Button
							variant={forecastType == 'aht' ? 'blue' : 'blueOutline'}
							size={'sm'}
							onClick={() => navigate(`/${user?.role == 'customer' ? 'customer' : 'admin'}/forecast/${forecastId}/aht`)}
						>
							View By Aht
						</Button>
					</div>
					<div className='flex gap-2 items-center justify-center'>
						{formProperities.errors?.weeklyData?.['wednesday'] && (
							<div className='text-red-500 text-sm mt-1'>{formProperities.errors?.weeklyData?.['wednesday'] as any}</div>
						)}
						<Button
							variant={'default'}
							size={'sm'}
							onClick={() => formProperities.handleSubmit()}
							disabled={formProperities.errors?.weeklyData || formProperities.changeWeightLoading}
						>
							{formProperities.changeWeightLoading ? (
								<div className='flex gap-2'>
									<span>Save Changes</span>
									<LoaderIcon className='animate-spin' />
								</div>
							) : (
								'Save Changes'
							)}
						</Button>
					</div>
				</div>
				{/* ['12.6', '14.6', '15.6', '16.6', '16.6', '16.6'] */}
				<VWeight
					dailyForecast={data.daily_forecast}
					// weights={data.next_week_forecast[0]?.Weights?.map((weight: string) => parseFloat(weight))}
					weights={['12.6', '14.6', '15.6', '16.6', '16.6', '16.6']}
					formProperities={formProperities}
				/>

				<Card extra={`w-full overflow-y-auto max-h-[450px] `}>
					<Table>
						<TableHeader className='sticky top-0 bg-white z-5'>
							<TableRow>
								<TableHead className={headClassName + ' bg-gray-50'}>Forecasted Calls Date</TableHead>
								{data?.next_week_forecast?.map((item: any, index: number) => (
									<TableHead key={`${index}_${item.Day}`} className={`${bodyCellCassName} bg-gray-50`}>
										{moment(item.Date_Day).format('llll')}
									</TableHead>
								))}
							</TableRow>
							<TableRow className='border-b border-black'>
								<TableHead className={headClassName}>Total</TableHead>
								{data?.next_week_forecast?.map((item: any, index: number) => (
									<TableHead
										key={`${index}_${item.next_forecast_Aht || item.Number_of_calls_or_contacts}`}
										className={`${bodyCellCassName}`}
									>
										{item.next_forecast_Aht || item.Number_of_calls_or_contacts}
									</TableHead>
								))}
							</TableRow>
						</TableHeader>

						<TableBody>
							{data?.next_week_forecast?.[0]?.Intervals?.map((item: any, index: number) => {
								return (
									<TableRow key={`${index}`}>
										<TableCell key={index} className={`${bodyCellCassName} bg-gray-50`}>
											{item.From_Time}
										</TableCell>
										{data?.next_week_forecast?.map((_el: any, ind: number) => {
											const intervalInd = data?.next_week_forecast[ind]?.Intervals[index];
											return (
												<TableCell
													key={`${index}_${ind}`}
													className={`${bodyCellCassName}`}
													style={{
														background:
															forecastType == 'aht'
																? ''
																: intervalInd?.New_Forecasted_Contacts &&
																  intervalInd?.Forecasted_Contacts !== intervalInd?.New_Forecasted_Contacts
																? '#DADEEC'
																: '',
													}}
												>
													{forecastType == 'aht'
														? intervalInd?.Forecasted_Aht
														: intervalInd?.New_Forecasted_Contacts ?? intervalInd?.Forecasted_Contacts}
												</TableCell>
											);
										})}
									</TableRow>
								);
							})}
						</TableBody>
					</Table>
				</Card>
			</div>
		</React.Fragment>
	);
};

export default VViewForecastResult;

import VCreateForecast from '@/components/views/forecast/editor/v-create-forecast';
import { useMutateData } from '@/hooks/useMutateData';
import { Forecast_Req } from '@/core';
import { useNavigate } from 'react-router-dom';
import { forecastApi } from '@/core/services/forecast';

const ForecastEditor = () => {
	const navigate = useNavigate();

	const createForecatMutate = useMutateData({
		mutationFn: (data: Forecast_Req) => forecastApi.createForecast(data),
		invalidateKeys: ['forcast-list'],
		displaySuccess: true,
		onSuccessFn: ({ data }) => {
			navigate(-1);
			console.log('data', data);
		},
	});

	return <VCreateForecast createForecatMutate={createForecatMutate} />;
};

export default ForecastEditor;

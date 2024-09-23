import { LoaderIcon } from 'lucide-react';
import { ComponentType, FC } from 'react';

interface WithLoadingProps {
	loading: boolean;
}

const withLoading = <P extends Object>(Component: ComponentType<P>): FC<P & WithLoadingProps> => {
	const WrappedComponent: FC<P & WithLoadingProps> = ({ loading, ...props }) => {
		return (
			<div className={'relative '}>
				<Component {...(props as any)} />
				{loading && (
					<div className={'absolute top-0 left-0 z-[2] flex justify-center items-center w-full h-full backdrop-blur-[1.5px]'}>
						<LoaderIcon className='animate-spin ' size={36} />
					</div>
				)}
			</div>
		);
	};

	WrappedComponent.displayName = `withLoading(${Component.displayName || Component.name})`;

	return WrappedComponent;
};

export default withLoading;

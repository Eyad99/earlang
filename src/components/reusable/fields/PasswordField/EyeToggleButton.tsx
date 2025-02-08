import { FC } from 'react';
import { Button } from '@/components/ui/button';
import { Eye, EyeOff } from 'lucide-react';

type EyeToggleButtonProps = {
	show: boolean;
	click: () => void;
};

const EyeToggleButton: FC<EyeToggleButtonProps> = ({ show, click }) => {
	return (
		<Button variant='link' size='icon' aria-label='Search database' className='!border-none !bg-none' onClick={click} type='button'>
			{show ? <Eye className='h-4 w-4' /> : <EyeOff className='h-4 w-4' />}
		</Button>
	);
};

export default EyeToggleButton;

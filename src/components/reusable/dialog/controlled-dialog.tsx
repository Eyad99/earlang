import { Dialog, DialogHeader, DialogFooter, DialogContent, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import { FC } from 'react';

interface EControlledDialogProps {
	isOpen: boolean;
	setOpen: any;
	dialogHeader?: { title: string; description: string };
	dialogBody: any;
	dialogFooter?: null;
	contentClassName?: string;
}

const EControlledDialog: FC<EControlledDialogProps> = ({
	isOpen,
	setOpen,
	dialogHeader,
	dialogBody,
	dialogFooter,
	contentClassName = 'max-w-fit',
}) => {
	return (
		<Dialog open={isOpen} onOpenChange={setOpen}>
			<DialogContent className={contentClassName}>
				{dialogHeader && (
					<DialogHeader>
						<DialogTitle>{dialogHeader?.title}</DialogTitle>
						<DialogDescription>{dialogHeader?.description}</DialogDescription>
					</DialogHeader>
				)}
				{dialogBody && dialogBody}
				{dialogFooter && <DialogFooter>{dialogFooter}</DialogFooter>}
			</DialogContent>
		</Dialog>
	);
};

export default EControlledDialog;

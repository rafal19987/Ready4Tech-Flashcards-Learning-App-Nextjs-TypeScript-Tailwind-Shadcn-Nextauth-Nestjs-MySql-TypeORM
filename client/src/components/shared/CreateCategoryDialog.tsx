import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/components/shared/Dialog';
import { CreateCategoryForm } from '@/components/shared/forms/CreateCategoryForm';
import { Button } from './Button';

export const CreateCategoryDialog: React.FC = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>Add category</Button>
      </DialogTrigger>
      <DialogContent>
        <CreateCategoryForm />
      </DialogContent>
    </Dialog>
  );
};

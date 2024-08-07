import { SignoutDialog } from './SignoutDialog';
import { SigninDialog } from './SigninDialog';
import { Button } from '@components/shared/Button';

export const AuthButtons: React.FC = async () => {
  return (
    <div className='flex gap-4'>
      <SignoutDialog />
      <SigninDialog />
      {/* TODO REGISTRATION */}
      {/* <Button variant='default'>Register</Button> */}
    </div>
  );
};

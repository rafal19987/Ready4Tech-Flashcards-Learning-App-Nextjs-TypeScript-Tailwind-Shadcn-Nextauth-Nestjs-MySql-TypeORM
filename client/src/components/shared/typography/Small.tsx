import { cn } from '@/lib/utils';
import { TypographyProps } from './types';

export const Small: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <small
      className={cn(`text-sm font-medium leading-none`, className)}
      {...props}
    >
      {children}
    </small>
  );
};

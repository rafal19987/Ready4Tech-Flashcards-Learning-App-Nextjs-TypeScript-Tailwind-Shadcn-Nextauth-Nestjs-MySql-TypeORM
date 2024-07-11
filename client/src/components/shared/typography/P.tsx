import { cn } from '@/lib/utils';
import { TypographyProps } from './types';

export const P: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <p
      className={cn(`leading-7 [&:not(:first-child)]:mt-6`, className)}
      {...props}
    >
      {children}
    </p>
  );
};

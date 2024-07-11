import { cn } from '@/lib/utils';
import { TypographyProps } from './types';

export const H2: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h2
      className={cn(
        `scroll-m-20 border-b pb-2 text-3xl font-semibold tracking-tight first:mt-0`,
        className
      )}
      {...props}
    >
      {children}
    </h2>
  );
};

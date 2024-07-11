import { cn } from '@/lib/utils';
import { TypographyProps } from './types';

export const H4: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h4
      className={cn(
        `scroll-m-20 text-xl font-semibold tracking-tight`,
        className
      )}
      {...props}
    >
      {children}
    </h4>
  );
};

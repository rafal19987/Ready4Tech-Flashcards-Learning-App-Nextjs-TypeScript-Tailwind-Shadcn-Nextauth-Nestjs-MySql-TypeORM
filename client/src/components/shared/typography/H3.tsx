import { cn } from '@/lib/utils';
import { TypographyProps } from './types';

export const H3: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h3
      className={cn(
        `scroll-m-20 text-2xl font-semibold tracking-tight`,
        className
      )}
      {...props}
    >
      {children}
    </h3>
  );
};

import { cn } from '@/lib/utils';
import { TypographyProps } from './types';

export const H1: React.FC<TypographyProps> = ({
  children,
  className,
  ...props
}) => {
  return (
    <h1
      className={cn(
        `scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl`,
        className
      )}
      {...props}
    >
      {children}
    </h1>
  );
};

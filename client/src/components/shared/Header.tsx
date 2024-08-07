import { cn } from '@/lib/utils';

export const Header: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <header
      className={cn(
        `container flex items-center justify-between w-full max-w-3xl 4xl:max-w-4xl h-full`,
        className
      )}
    >
      {children}
    </header>
  );
};

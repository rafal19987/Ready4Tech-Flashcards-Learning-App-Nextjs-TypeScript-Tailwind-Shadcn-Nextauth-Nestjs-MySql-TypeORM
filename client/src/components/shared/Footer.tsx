import { cn } from '@/lib/utils';

export const Footer: React.FC<{
  children?: React.ReactNode;
  className?: string;
}> = ({ children, className }) => {
  return (
    <footer
      className={cn(
        `container flex items-center justify-between w-full max-w-3xl 4xl:max-w-4xl h-full py-4`,
        className
      )}
    >
      {children}
    </footer>
  );
};

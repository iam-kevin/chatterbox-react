import { cn } from '@/ui/style-utils';
import React from 'react';

const Container = function ({ children }: { children: React.ReactNode }) {
  return <div>{children}</div>;
};

/**
 * Mobile friendly layout
 */
const BaseLayout = function ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <div className="relative min-h-screen bg-gray-100">
      <div
        className={cn(
          'container absolute left-1/2 top-1/2 mx-auto h-full w-full max-w-5xl -translate-x-1/2 -translate-y-1/2 md:h-2/3',
          className
        )}
      >
        {children}
      </div>
    </div>
  );
};

export { BaseLayout, Container };

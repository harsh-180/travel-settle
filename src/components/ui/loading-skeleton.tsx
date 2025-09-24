import { cn } from '@/lib/utils';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {}

export function Skeleton({ className, ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        "animate-pulse rounded-md bg-muted",
        className
      )}
      {...props}
    />
  );
}

export function TripCardSkeleton() {
  return (
    <div className="space-y-4 p-6 border rounded-lg">
      <div className="flex items-center space-x-4">
        <Skeleton className="h-12 w-12 rounded-xl" />
        <div className="space-y-2 flex-1">
          <Skeleton className="h-4 w-3/4" />
          <Skeleton className="h-3 w-1/2" />
        </div>
      </div>
      <div className="grid grid-cols-3 gap-4">
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-8 mx-auto" />
          <Skeleton className="h-3 w-full" />
        </div>
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-16 mx-auto" />
          <Skeleton className="h-3 w-full" />
        </div>
        <div className="text-center space-y-2">
          <Skeleton className="h-6 w-12 mx-auto" />
          <Skeleton className="h-3 w-full" />
        </div>
      </div>
      <Skeleton className="h-10 w-full" />
    </div>
  );
}

export function TransactionRowSkeleton() {
  return (
    <div className="flex items-center space-x-4 p-4">
      <Skeleton className="h-10 w-10 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
      <div className="text-right space-y-2">
        <Skeleton className="h-4 w-20" />
        <Skeleton className="h-3 w-16" />
      </div>
    </div>
  );
}
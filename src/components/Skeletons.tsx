import { Skeleton } from "@/components/ui/skeleton";

export const BlogPostSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-48 w-full rounded-lg" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <Skeleton className="h-4 w-2/3" />
  </div>
);

export const BlogGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <BlogPostSkeleton key={i} />
    ))}
  </div>
);

export const BlogListSkeleton = ({ count = 6 }: { count?: number }) => (
  <BlogGridSkeleton count={count} />
);

export const TestimonialSkeleton = () => (
  <div className="space-y-4 p-6 border rounded-lg">
    <div className="flex items-center gap-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="flex-1 space-y-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-24" />
      </div>
    </div>
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="flex gap-1">
      {Array.from({ length: 5 }).map((_, i) => (
        <Skeleton key={i} className="h-4 w-4 rounded-full" />
      ))}
    </div>
  </div>
);

export const TestimonialGridSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <TestimonialSkeleton key={i} />
    ))}
  </div>
);

export const EventSkeleton = () => (
  <div className="space-y-4 p-6 border rounded-lg">
    <Skeleton className="h-48 w-full rounded-lg" />
    <Skeleton className="h-6 w-3/4" />
    <Skeleton className="h-4 w-full" />
    <Skeleton className="h-4 w-5/6" />
    <div className="flex justify-between pt-4">
      <Skeleton className="h-4 w-24" />
      <Skeleton className="h-10 w-24 rounded" />
    </div>
  </div>
);

export const EventListSkeleton = ({ count = 4 }: { count?: number }) => (
  <div className="space-y-4">
    {Array.from({ length: count }).map((_, i) => (
      <EventSkeleton key={i} />
    ))}
  </div>
);

export const PartnerGridSkeleton = ({ count = 6 }: { count?: number }) => (
  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
    {Array.from({ length: count }).map((_, i) => (
      <Skeleton key={i} className="h-24 w-full rounded-lg" />
    ))}
  </div>
);

export const HeroSkeleton = () => (
  <div className="space-y-6 py-20">
    <Skeleton className="h-12 w-3/4 mx-auto" />
    <Skeleton className="h-6 w-2/3 mx-auto" />
    <div className="flex gap-4 justify-center">
      <Skeleton className="h-12 w-32 rounded" />
      <Skeleton className="h-12 w-32 rounded" />
    </div>
  </div>
);

export const FeaturesSkeleton = ({ count = 3 }: { count?: number }) => (
  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-12">
    {Array.from({ length: count }).map((_, i) => (
      <div key={i} className="space-y-4">
        <Skeleton className="h-16 w-16 rounded-lg mx-auto" />
        <Skeleton className="h-6 w-2/3 mx-auto" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-5/6 mx-auto" />
      </div>
    ))}
  </div>
);

export const FormFieldSkeleton = () => (
  <div className="space-y-2">
    <Skeleton className="h-4 w-32" />
    <Skeleton className="h-10 w-full rounded" />
  </div>
);

export const FormSkeleton = () => (
  <div className="space-y-6 max-w-md">
    <FormFieldSkeleton />
    <FormFieldSkeleton />
    <FormFieldSkeleton />
    <Skeleton className="h-12 w-full rounded" />
  </div>
);

export const DashboardCardSkeleton = () => (
  <div className="space-y-2 p-6 border rounded-lg">
    <Skeleton className="h-4 w-24" />
    <Skeleton className="h-8 w-16" />
    <Skeleton className="h-4 w-32 mt-4" />
  </div>
);

export const DashboardSkeleton = () => (
  <div className="space-y-6">
    <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
      {Array.from({ length: 4 }).map((_, i) => (
        <DashboardCardSkeleton key={i} />
      ))}
    </div>
    <Skeleton className="h-64 w-full rounded-lg" />
    <Skeleton className="h-96 w-full rounded-lg" />
  </div>
);

export default {
  BlogPostSkeleton,
  BlogGridSkeleton,
  TestimonialSkeleton,
  TestimonialGridSkeleton,
  EventSkeleton,
  EventListSkeleton,
  PartnerGridSkeleton,
  HeroSkeleton,
  FeaturesSkeleton,
  FormFieldSkeleton,
  FormSkeleton,
  DashboardCardSkeleton,
  DashboardSkeleton,
};

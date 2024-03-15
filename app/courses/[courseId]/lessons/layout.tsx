import { PropsWithChildren, Suspense } from 'react';
import { LessonsNavigationSkeleton } from './LessonsNavigationSkeleton';
import { LessonsNavigation } from './LessonsNavigation ';

export default function layout({
    children,
    params,
}: PropsWithChildren<{
    params: {
        courseId: string;
    };
}>) {
    return (
        <div className="relative flex items-start gap-4 p-4">
            <Suspense fallback={<LessonsNavigationSkeleton />}>
                <LessonsNavigation courseId={params.courseId} />
            </Suspense>
            {children}
        </div>
    );
}

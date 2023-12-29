/* eslint-disable @next/next/no-img-element */
import {
    Layout,
    LayoutActions,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
} from '@/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRequiredAuthSession } from '@/lib/auth';
import { notFound } from 'next/navigation';
import { getCourseLessons } from './lessons.query';
import { LessonItem } from './lessonItem';
import Link from 'next/link';
import { buttonVariants } from '@/components/ui/button';

export default async function CourseLessonsPage({
    params,
}: {
    params: {
        courseId: string;
    };
}) {
    const session = await getRequiredAuthSession();

    const course = await getCourseLessons({
        courseId: params.courseId,
        userId: session.user.id,
    });

    if (!course) {
        notFound();
    }

    return (
        <Layout>
            <LayoutHeader>
                <LayoutTitle>Lessons · {course.name}</LayoutTitle>
            </LayoutHeader>
            <LayoutContent className="flex flex-col gap-4 lg:flex-row">
                <Card className="flex-[2]">
                    <CardHeader>
                        <CardTitle>Lessons</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        {course.lessons.map((lesson) => (
                            <LessonItem key={lesson.id} lesson={lesson} />
                        ))}
                        <LayoutActions className='flex'>
                            <Link
                                href={`/admin/courses/${params.courseId}/lessons`}
                                className={buttonVariants({ variant: 'outline', size: 'lg' })}
                            >
                                Create lesson
                            </Link>
                        </LayoutActions>
                    </CardContent>
                </Card>
            </LayoutContent>
        </Layout >
    );
}
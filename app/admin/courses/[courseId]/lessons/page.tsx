/* eslint-disable @next/next/no-img-element */
import {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
} from '@/components/layout/layout';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRequiredAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { notFound, redirect } from 'next/navigation';
import { getCourseLessons } from './lessons.query';
import { AdminLessonSortable } from './AdminLessonSortable';
import { SubmitButton } from '@/components/form/submitButton';

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
                <LayoutTitle>Leçons · {course.name}</LayoutTitle>
            </LayoutHeader>
            <LayoutContent className="flex flex-col gap-4 lg:flex-row">
                <Card className="flex-[2]">
                    <CardHeader>
                        <CardTitle>Leçons</CardTitle>
                    </CardHeader>
                    <CardContent className="flex flex-col gap-2">
                        <AdminLessonSortable items={course.lessons} />
                        <form>
                            <SubmitButton
                                size="sm"
                                variant="secondary"
                                className="w-full"
                                formAction={async () => {
                                    'use server';

                                    const session = await getRequiredAuthSession();

                                    const courseId = params.courseId;

                                    // Authorize the user
                                    await prisma.course.findFirstOrThrow({
                                        where: {
                                            creatorId: session.user.id,
                                            id: courseId,
                                        },
                                    });

                                    const lesson = await prisma.lesson.create({
                                        data: {
                                            name: 'Brouillon Lesson',
                                            rank: 'aaaaa',
                                            state: 'HIDDEN',
                                            courseId: courseId,
                                            content: '## Default content',
                                        },
                                    });

                                    redirect(`/admin/courses/${courseId}/lessons/${lesson.id}`);
                                }}
                            >
                                Créer une leçon
                            </SubmitButton>
                        </form>
                    </CardContent>
                </Card>
            </LayoutContent>
        </Layout>
    );
}
import {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
} from '@/components/layout/layout';
import { Card, CardContent } from '@/components/ui/card';
import { getRequiredAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { CourseForm } from './CourseForm';
import { notFound } from 'next/navigation';

export default async function EditPage({
    params,
}: {
    params: {
        courseId: string;
    },
}) {
    const session = await getRequiredAuthSession();

    const course = await prisma.course.findUnique({
        where: {
            id: params.courseId,
            creatorId: session?.user.id
        },
        select: {
            id: true,
            name: true,
            image: true,
            presentation: true,
            state: true,
        }
    });

    if (!course) {
        notFound();
    }

    return (
        <Layout>
            <LayoutHeader>
                <LayoutTitle>Editer cours</LayoutTitle>
            </LayoutHeader>
            <LayoutContent>
                <Card className="flex-[2]">
                    <CardContent className="mt-6">
                        <CourseForm defaultValue={course} />
                    </CardContent>
                </Card>
            </LayoutContent>
        </Layout>
    );
}
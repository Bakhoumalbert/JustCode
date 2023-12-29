import {
    Layout,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
} from '@/components/layout/layout';
import { Card, CardContent } from '@/components/ui/card';
import { getRequiredAuthSession } from '@/lib/auth';
import { z } from 'zod';
import { CourseForm } from '../[courseId]/edit/CourseForm';


export default async function NewCoursePage({
    params,
    searchParams,
}: {
    params: {
        courseId: string;
    },
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const session = await getRequiredAuthSession();

    const page = Number(searchParams.page ?? 0);

    return (
        <Layout>
            <LayoutHeader>
                <LayoutTitle>New course</LayoutTitle>
            </LayoutHeader>

            <LayoutContent>
                <Card className="bg-background">
                    <CardContent className="mt-6">
                        <CourseForm />
                    </CardContent>
                </Card>
            </LayoutContent>
        </Layout >
    );
}
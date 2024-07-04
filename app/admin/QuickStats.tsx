import { Typography } from '@/components/ui/Typography';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { getRequiredAuthSession } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { BookCheck, Presentation, User2 } from 'lucide-react';


export const QuickStats = async () => {
    const session = await getRequiredAuthSession();

    await new Promise((resolve) => setTimeout(resolve, 1000));
    const users = await prisma.user.count({
        where: {
            ownedCourses: {
                some: {
                    course: {
                        creatorId: session.user.id,
                    },
                },
            },
        },
    });

    const lessons = await prisma.lesson.count({
        where: {
            course: {
                creatorId: session.user.id,
            },
        },
    });

    const courses = await prisma.course.count({
        where: {
            creatorId: session.user.id,
        },
    });

    return (
        <Card>
            <CardHeader>
                <CardTitle>Statistiques rapides</CardTitle>
            </CardHeader>
            <CardContent>
                <Typography className="">
                    <User2 className="inline" size={16} /> {users} utilisateurs
                </Typography>
                <Typography>
                    <BookCheck className="inline" size={16} /> {lessons} leçons
                </Typography>
                <Typography>
                    <Presentation className="inline" size={16} /> {courses} cours
                </Typography>
            </CardContent>
        </Card>
    );
};
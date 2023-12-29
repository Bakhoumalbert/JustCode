import {
    Layout,
    LayoutActions,
    LayoutContent,
    LayoutHeader,
    LayoutTitle,
} from '@/components/layout/layout';
import { Typography } from '@/components/ui/Typography';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { getRequiredAuthSession } from '@/lib/auth';
import Link from 'next/link';
import { DropdownMenu } from '@/components/ui/dropdown-menu';
import { getAdminCourse } from './admin-course.query';
import { CoursePagination } from '../../../../src/components/features/pagination/PaginationButton';
import { Badge } from '@/components/ui/badge';

export default async function CoursePage({
    params,
    searchParams,
}: {
    params: {
        courseId: string;
    };
    searchParams: { [key: string]: string | string[] | undefined };
}) {
    const page = Number(searchParams.page ?? 0);


    const session = await getRequiredAuthSession();

    const course = await getAdminCourse({
        courseId: params.courseId,
        userId: session.user.id,
        userPage: page
    });

    return (
        <Layout className='flex'>
            <LayoutHeader>
                <LayoutTitle>Courses</LayoutTitle>
            </LayoutHeader>
            <LayoutActions>
                <Link
                    href="/admin/courses/new"
                    className={buttonVariants({
                        variant: 'secondary',
                    })}
                >
                    New Course
                </Link>
            </LayoutActions>
            <LayoutContent className='flex flex-col gap-4 lg:flex-row'>
                <Card className='flex-[2]'>
                    <CardContent className="mt-4">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Image</TableHead>
                                    <TableHead>Name</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {course.users?.map((user) => (
                                    <TableRow key={user.id}>
                                        <TableCell>
                                            <Avatar className="rounded">
                                                <AvatarFallback>{user.email?.[0]}</AvatarFallback>
                                                {user.image && (
                                                    <AvatarImage src={user.image} alt={user.email ?? ""} />
                                                )}
                                            </Avatar>
                                        </TableCell>
                                        <TableCell>
                                            <Typography
                                                as={Link}
                                                variant="large"
                                                href={`/admin/users/${user.id}`}
                                            >
                                                {user.email}
                                            </Typography>
                                        </TableCell>
                                        <TableCell>
                                            Active
                                        </TableCell>
                                        <TableCell>
                                            <DropdownMenu />
                                        </TableCell>
                                    </TableRow>

                                ))}
                            </TableBody>
                        </Table>
                        <CoursePagination totalPage={course._count?.users ?? 0 / 5} page={page} baseURL={`/admin/courses/${course.id}`} />
                    </CardContent>
                </Card>
                <Card className='flex-1'>
                    <CardHeader className='flex-row items-center gap-4 space-y-0'>

                        <Avatar className="rounded">
                            <AvatarFallback>{course.name ? [0] : ""}</AvatarFallback>
                            {course.image && (
                                <AvatarImage src={course.image} alt={course.name ?? ""} />
                            )}
                        </Avatar>
                        <CardTitle>
                            {course.name}
                        </CardTitle>
                    </CardHeader>
                    <CardContent className='flex flex-col gap-2'>
                        <Badge className="mr-auto">{course.state}</Badge>
                        <Typography>{course._count?.users} users</Typography>
                        <Typography>{course._count?.lessons} lessons</Typography>
                        <Link href={`/admin/courses/${course.id}/edit`} className={buttonVariants({ variant: 'outline' })}>
                            Edit
                        </Link>
                        <Link href={`/admin/courses/${course.id}/lessons`} className={buttonVariants({ variant: 'outline' })}>
                            Edit Lessons
                        </Link>
                    </CardContent>
                </Card>
            </LayoutContent>
        </Layout>
    );
}
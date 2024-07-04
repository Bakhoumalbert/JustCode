import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import Link from 'next/link';
import { CoursesCard } from './course.query';
import { Typography } from '@/components/ui/Typography';

type CourseCardProps = {
    course: CoursesCard;
};

export const CourseCard = (props: CourseCardProps) => {
    return (
        <Link href={`/courses/${props.course.id}`}>
            <Card className="hover:bg-accent">
                <CardHeader className="flex flex-col gap-3 space-y-2">
                    <CardTitle>{props.course.name}</CardTitle>
                    <Avatar className="h-32 w-full rounded">
                        <AvatarFallback>
                            {props.course.name.charAt(0) +
                                props.course.name.charAt(props.course.name.length - 1)}
                        </AvatarFallback>
                        {props.course.image ? <AvatarImage src={props.course.image} /> : null}
                    </Avatar>
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row items-center gap-2">
                            <Avatar className="h-8 w-8">
                                <AvatarFallback>{props.course.name[0]}</AvatarFallback>
                                {props.course.creator.image ? (
                                    <AvatarImage src={props.course.creator.image} />
                                ) : null}
                            </Avatar>
                            <Typography variant="base" className=" text-muted-foreground">
                                {props.course.creator.name}
                            </Typography>
                        </div>
                    </div>
                </CardHeader>
            </Card>
        </Link>
    );
};
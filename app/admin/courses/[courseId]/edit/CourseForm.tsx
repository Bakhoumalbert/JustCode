'use client';

import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
    useZodForm,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { courseActionCreate, courseActionEdit } from './course.action';
import { COURSE_STATE, CourseFormSchema } from './course.schema';

export type CourseFormProps = {
    defaultValue?: CourseFormSchema & {
        id: string;
    };
};

export const CourseForm = ({ defaultValue }: CourseFormProps) => {
    const form = useZodForm({
        schema: CourseFormSchema,
        defaultValues: defaultValue,
    });
    const router = useRouter();

    return (
        <Form
            form={form}
            className="flex flex-col gap-4"
            onSubmit={async (values) => {
                const { data, serverError } = defaultValue?.id
                    ? await courseActionEdit({
                        courseId: defaultValue.id,
                        data: values,
                    })
                    : await courseActionCreate(values);

                if (data) {
                    toast.success(data.message);
                    router.push(`/admin/courses/${data.course.id}`);
                    router.refresh();
                    return;
                }

                toast.error('Some error occurred', {
                    description: serverError,
                });
                return;
            }}
        >
            <FormField
                control={form.control}
                name="image"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Image</FormLabel>
                        <FormControl>
                            <Input placeholder="https://googleimage.com" {...field} />
                        </FormControl>
                        <FormDescription>
                            Héberger et utiliser une image. Vous pouvez utiliser{' '}
                            <Link href="https://imgur.com">Imgur</Link> pour héberger une image.
                        </FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                            <Input placeholder="NextReact" {...field} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />
            <FormField
                control={form.control}
                name="presentation"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Présentation</FormLabel>
                        <FormControl>
                            <Textarea placeholder="## Some title" {...field} />
                        </FormControl>
                        <FormDescription>Le format Markdown est pris en charge.</FormDescription>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <FormField
                control={form.control}
                name="state"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel>Etat</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                                <SelectTrigger>
                                    <SelectValue placeholder="Selectionner un état" />
                                </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                                {COURSE_STATE.map((state, index) => (
                                    <SelectItem key={index} value={state} className="capitalize">
                                        {state}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <Button type="submit">Soumettre</Button>
        </Form>
    );
};
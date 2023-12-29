"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export type CoursePaginationProps = {
    totalPage: number
    page: number
    baseURL: string
}

export const CoursePagination = (props: CoursePaginationProps) => {
    const router = useRouter()
    return (
        <div className="flex gap-4 pt-2">
            <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => {
                    const searchParams = new URLSearchParams({
                        page: String(props.page - 1)
                    })
                    const url = `${props.baseURL}?${searchParams.toString()}`
                    router.push(url)
                }}
            >
                Previous
            </Button>
            <Button
                variant={"outline"}
                size={"sm"}
                onClick={() => {
                    const searchParams = new URLSearchParams({
                        page: String(props.page + 1)
                    })
                    const url = `${props.baseURL}?${searchParams.toString()}`
                    router.push(url)
                }}
            >
                Next
            </Button>

        </div>)
}
"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
    CalendarIcon,
    CheckCircledIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CubeIcon,
    DotsVerticalIcon,
    FileTextIcon,
} from "@radix-ui/react-icons";
import { getConnectionAggRunLogs } from "@/app/connections/[connectionId]/api";
import useApiCall from "@/hooks/useApiCall";
import { ColumnDef } from "@tanstack/react-table";
import { StreamTable } from "./StreamTable";
import RunLogTable from "./RunLogTable";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

export function DatePickerWithRange({ className }: React.HTMLAttributes<HTMLDivElement>) {
    const [date, setDate] = React.useState<DateRange | undefined>({
        from: new Date(2022, 0, 20),
        to: addDays(new Date(2022, 0, 20), 20),
    });

    return (
        <div className={cn("grid gap-2", className)}>
            <Popover>
                <PopoverTrigger asChild>
                    <Button
                        id="date"
                        variant={"outline"}
                        className={cn("w-[230px] justify-start text-left font-normal", !date && "text-muted-foreground")}
                    >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {date?.from ? (
                            date.to ? (
                                <>
                                    {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                                </>
                            ) : (
                                format(date.from, "LLL dd, y")
                            )
                        ) : (
                            <span>Pick a date</span>
                        )}
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                        initialFocus
                        mode="range"
                        defaultMonth={date?.from}
                        selected={date}
                        onSelect={setDate}
                        numberOfMonths={2}
                    />
                </PopoverContent>
            </Popover>
        </div>
    );
}

export default function RunHistory({ connectionData }) {
    // const [logData, setLogData] = React.useState(null);

    // const { data, makeApiCall } = useApiCall(getConnectionAggRunLogs, "GET");
    // React.useEffect(() => {
    //     (async () => {
    //         await makeApiCall(connectionData.id);
    //         console.log(data);
    //     })();
    // }, []);

    // React.useEffect(() => {
    //     if (data) {
    //         setLogData(data);
    //         console.log(logData);
    //     }
    // }, [data, setLogData]);

    const logData = [
        {
            id: "1",
            status: "success",
            start_time: "10:00 AM 2021/09/01 ",
            end_time: "2021-09-01 10:30:00",
            duration: "30 mins",
            size: "10 MB",
            documents_fetched: 8,
            destination_record_updated: 14,
            records_per_stream: [
                {
                    stream: "pdf",
                    documents_fetched: 500,
                    destination_record_updated: 500,
                },
                {
                    stream: "csv",
                    documents_fetched: 500,
                    destination_record_updated: 500,
                },
            ],
        },
        {
            id: "2",
            status: "partial",
            start_time: "10:00 AM 2021/09/01 ",
            end_time: "2021-09-01 10:30:00",
            duration: "30 mins",
            size: "10 MB",
            documents_fetched: 8,
            destination_record_updated: 14,
            records_per_stream: [
                {
                    stream: "pdf",
                    documents_fetched: 500,
                    destination_record_updated: 500,
                },
                {
                    stream: "csv",
                    documents_fetched: 500,
                    destination_record_updated: 500,
                },
            ],
        },
        {
            id: "3",
            status: "failed",
            start_time: "10:00 AM 2021/09/01 ",
            end_time: "2021-09-01 10:30:00",
            duration: "30 mins",
            size: "10 MB",
            documents_fetched: 8,
            destination_record_updated: 14,
            records_per_stream: [
                {
                    stream: "pdf",
                    documents_fetched: 500,
                    destination_record_updated: 500,
                },
                {
                    stream: "csv",
                    documents_fetched: 500,
                    destination_record_updated: 500,
                },
            ],
        },
    ];

    return (
        <div className="p-5 mr-12 bg-[#FFFFFF]">
            <div className="flex flex-col border rounded-md">
                <div className="flex flex-row justify-between items-center border-b px-5 py-3">
                    <p className="text-xl font-semibold font-inter">Run History</p>
                    <div>
                        <DatePickerWithRange />
                    </div>
                </div>

                {logData.map((log) => (
                    <RunLogTable logInstance={log} />
                ))}

                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious href="#" />
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">1</PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#" isActive>
                                2
                            </PaginationLink>
                        </PaginationItem>
                        <PaginationItem>
                            <PaginationLink href="#">3</PaginationLink>
                        </PaginationItem>

                        <PaginationItem>
                            <PaginationNext href="#" />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </div>
        </div>
    );
}

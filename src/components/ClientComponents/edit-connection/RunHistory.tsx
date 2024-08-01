"use client";

import * as React from "react";
import { DateRange } from "react-day-picker";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { addDays, format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { getConnectionAggRunLogs, getConnectionViewLogs } from "@/app/connections/[connectionId]/api";
import useApiCall from "@/hooks/useApiCall";
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
import Loading from "@/app/connections/[connectionId]/loading";

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
                        className="w-10"
                        variant={"ghost"}
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
    const [logData, setLogData] = React.useState([]);
    const [viewlogs, setViewlogs] = React.useState([]);

    const { data: runHistoryData, loading, makeApiCall } = useApiCall(getConnectionAggRunLogs, "GET");
    const {
        data: viewLogsData,
        loading: viewLogsLoader,
        makeApiCall: getViewLogsCall,
    } = useApiCall(getConnectionViewLogs, "GET");

    React.useEffect(() => {
        (async () => {
            await makeApiCall(connectionData.id);
            await getViewLogsCall(connectionData.id);
        })();
    }, []);

    React.useEffect(() => {
        if (runHistoryData) {
            setLogData(runHistoryData.data.runs);
        }
    }, [runHistoryData]);

    React.useEffect(() => {
        if (viewLogsData) {
            setViewlogs(viewLogsData.data);
        }
    }, [viewLogsData]);

    const TestlogData = [
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

    const [currentPage, setCurrentPage] = React.useState(1);
    const logsPerPage = 5;

    const totalPages = Math.ceil(logData.length / logsPerPage);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    const startIndex = (currentPage - 1) * logsPerPage;
    const endIndex = startIndex + logsPerPage;
    const currentLogs = logData.slice(startIndex, endIndex);

    return (
        <div className="p-5 mr-12">
            {loading ? (
                <Loading />
            ) : (
                <div className="flex flex-col border rounded-md">
                    <div className="flex flex-row justify-between items-center border-b px-5 py-3">
                        <p className="text-xl font-semibold font-inter">Run History</p>
                        <div>
                            <DatePickerWithRange />
                        </div>
                    </div>
                    {logData.length > 0 ? (
                        currentLogs.map((log, index) => <RunLogTable key={index} logInstance={log} viewLogs={viewlogs} />)
                    ) : (
                        <div className="w-full border-b">
                            <p className="text-center py-10">No Run History Found</p>
                        </div>
                    )}

                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <Button className="w-10" variant={"ghost"} disabled={currentPage === 1}>
                                    <PaginationPrevious onClick={() => handlePageChange(currentPage - 1)} />
                                </Button>
                            </PaginationItem>
                            {Array.from({ length: totalPages }, (_, index) => (
                                <PaginationItem key={index}>
                                    <PaginationLink
                                        href="#"
                                        isActive={currentPage === index + 1}
                                        onClick={() => handlePageChange(index + 1)}
                                    >
                                        {index + 1}
                                    </PaginationLink>
                                </PaginationItem>
                            ))}
                            <PaginationItem>
                                <Button className="w-10" variant={"ghost"} disabled={currentPage === totalPages}>
                                    <PaginationNext onClick={() => handlePageChange(currentPage + 1)} />
                                </Button>
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </div>
    );
}

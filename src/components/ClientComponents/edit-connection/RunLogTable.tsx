import React from "react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ColumnDef } from "@tanstack/react-table";
import { StreamTable } from "./StreamTable";
import {
    CheckCircledIcon,
    ChevronDownIcon,
    ChevronRightIcon,
    CrossCircledIcon,
    CubeIcon,
    DotsVerticalIcon,
    ExclamationTriangleIcon,
    FileTextIcon,
} from "@radix-ui/react-icons";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card } from "@/components/ui/card";
import { LazyLog, ScrollFollow } from "react-lazylog";
import CircularLoader from "@/components/ui/circularLoader";

export type Streams = {
    name: string;
    documents: number;
    records: number;
};

export const columns: ColumnDef<Streams>[] = [
    {
        accessorKey: "stream",
        header: "Name",
    },
    {
        accessorKey: "documents_fetched",
        header: "No of Documents Fetched",
    },
    {
        accessorKey: "destination_record_updated",
        header: "No of Records Fetched",
    },
];

function RunLogTable({ logInstance, viewLogs }: { logInstance: any; viewLogs: any }) {
    const [arrow, setArrow] = React.useState(false);

    const toggleArrow = () => {
        setArrow(!arrow);
    };

    const convertLogs = () => {
        let allLogs = "";

        viewLogs.forEach((log) => {
            const json_msg = JSON.parse(log.message);
            const curLog = `${log.created_at} : ${log.updated_at} | ${json_msg.level} | ${json_msg.message}`;
            allLogs += `${curLog}\n`;
        });

        return allLogs;
    };

    let showLogs = convertLogs();

    const downloadLogs = () => {
        const blob = new Blob([showLogs], { type: "text/plain" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `Logs-${logInstance?.start_time}.txt`;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    };

    return (
        <div className="flex-col py-6 px-5 border-b">
            <div className="flex xl:flex-row flex-col xl:justify-between space-y-2">
                <div className="flex flex-row space-x-3 items-center">
                    {logInstance.status != "FAILED" && (
                        <>
                            {arrow ? (
                                <ChevronDownIcon className="cursor-pointer" width={25} height={25} onClick={toggleArrow} />
                            ) : (
                                <ChevronRightIcon className="cursor-pointer" width={25} height={25} onClick={toggleArrow} />
                            )}
                        </>
                    )}

                    {logInstance.status === "SUCCESS" ? (
                        <CheckCircledIcon width={30} height={30} color="#047857" />
                    ) : logInstance.status === "FAILED" ? (
                        <CrossCircledIcon width={30} height={30} color="#DC2626" />
                    ) : logInstance.status === "RUNNING" ? (
                        <CircularLoader />
                    ) : (
                        <ExclamationTriangleIcon width={30} height={30} color="#A16207" />
                    )}

                    <p className="font-semibold">
                        {logInstance?.status === "SUCCESS"
                            ? "Run Successful"
                            : logInstance.status === "FAILED"
                            ? "Run Failed"
                            : logInstance.status === "RUNNING"
                            ? "Running..."
                            : "Partial Success"}
                    </p>
                    {logInstance.status != "FAILED" && (
                        <p className="text-muted-foreground"> Duration : {logInstance?.duration}</p>
                    )}
                </div>

                <div className="flex flex-row space-x-3 items-center ml-9 xl:ml-0">
                    {logInstance.status != "FAILED" && (
                        <>
                            {/* <div className="flex flex-row items-center space-x-1 border px-2 py-1 rounded-lg font-semibold hover:shadow-md">
                                <FileTextIcon width={15} height={15} />
                                <p>{logInstance?.documents_fetched} Documents</p>
                            </div> */}
                            <div className="flex flex-row items-center space-x-1 border px-2 py-1 rounded-lg font-semibold hover:shadow-md">
                                <CubeIcon width={15} height={15} />
                                <p>{logInstance?.records_updated} Records</p>
                            </div>
                        </>
                    )}

                    <p className="text-muted-foreground"> {logInstance?.start_time}</p>

                    <Dialog>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <DotsVerticalIcon width={20} height={20} className="cursor-pointer" />
                            </DropdownMenuTrigger>

                            <DropdownMenuContent className="w-28 text-muted-foreground">
                                <DialogTrigger className="w-full">
                                    <DropdownMenuItem>
                                        <span>View Logs</span>
                                    </DropdownMenuItem>
                                </DialogTrigger>

                                <DropdownMenuItem onClick={downloadLogs}>
                                    <span>Download Logs</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                        <DialogContent className="size-10/12 max-w-none">
                            <Card className="p-5 m-4">
                                <DialogHeader>
                                    <DialogTitle className="mb-2">Run Logs</DialogTitle>
                                    {showLogs.length > 0 ? (
                                        <DialogDescription className="h-[470px]">
                                            <ScrollFollow
                                                startFollowing
                                                render={({ follow }) => (
                                                    <LazyLog extraLines={1} enableSearch text={showLogs} stream follow={follow} />
                                                )}
                                            />
                                        </DialogDescription>
                                    ) : (
                                        <DialogDescription className="flex justify-center">
                                            <div>No Run Logs to Display</div>
                                        </DialogDescription>
                                    )}
                                </DialogHeader>
                            </Card>
                        </DialogContent>
                    </Dialog>
                </div>
            </div>

            {arrow && (
                <div className="w-11/12 xl:w-9/12 mt-5 mb-8 xl:ml-10 mx-auto">
                    <StreamTable columns={columns} data={logInstance?.records_per_stream} />
                </div>
            )}
        </div>
    );
}

export default RunLogTable;

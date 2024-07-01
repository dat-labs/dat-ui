import React from "react";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuPortal,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuSub,
    DropdownMenuSubContent,
    DropdownMenuSubTrigger,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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

function RunLogTable({ logInstance }: { logInstance: any }) {
    const [arrow, setArrow] = React.useState(false);

    const toggleArrow = () => {
        setArrow(!arrow);
    };

    return (
        <div className="flex-col py-6 px-5 border-b">
            <div className="flex xl:flex-row flex-col xl:justify-between space-y-2">
                <div className="flex flex-row space-x-3 items-center">
                    {logInstance.status != "failed" && (
                        <>
                            {arrow ? (
                                <ChevronDownIcon className="cursor-pointer" width={25} height={25} onClick={toggleArrow} />
                            ) : (
                                <ChevronRightIcon className="cursor-pointer" width={25} height={25} onClick={toggleArrow} />
                            )}
                        </>
                    )}

                    {logInstance.status === "success" ? (
                        <CheckCircledIcon width={30} height={30} color="#047857" />
                    ) : logInstance.status === "failed" ? (
                        <CrossCircledIcon width={30} height={30} color="#DC2626" />
                    ) : (
                        <ExclamationTriangleIcon width={30} height={30} color="#A16207" />
                    )}

                    <p className="font-semibold">{logInstance?.status === "success" ? "Run Successful" : "Run Failed"} </p>
                    {logInstance.status != "failed" && <p className="text-[#64748B]"> Size : {logInstance?.size}</p>}
                </div>

                <div className="flex flex-row space-x-3 items-center">
                    {logInstance.status != "failed" && (
                        <>
                            <div className="flex flex-row items-center space-x-1 border px-2 py-1 rounded-lg font-semibold hover:shadow-md">
                                <FileTextIcon width={15} height={15} />
                                <p>{logInstance?.documents_fetched} Documents</p>
                            </div>
                            <div className="flex flex-row items-center space-x-1 border px-2 py-1 rounded-lg font-semibold hover:shadow-md">
                                <CubeIcon width={15} height={15} />
                                <p>{logInstance?.destination_record_updated} Records</p>
                            </div>
                        </>
                    )}

                    <p className="text-[#64748B]"> {logInstance?.start_time}</p>

                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <DotsVerticalIcon width={20} height={20} className="cursor-pointer" />
                        </DropdownMenuTrigger>

                        <DropdownMenuContent className="w-28 border-[#E4E4E7] bg-[#FFFFFF] text-[#64748B]">
                            <DropdownMenuItem>
                                <span>View Logs</span>
                            </DropdownMenuItem>

                            <DropdownMenuItem>
                                <span>Download Logs</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
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

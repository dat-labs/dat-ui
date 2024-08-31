import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { GithubFollow } from "@/assets";

export default function JoinDat() {
    return (
        <div className="w-1/2 flex flex-col">
            <div className="ml-24 mt-12">
                <div className="leading-[4rem] text-5xl font-semibold bg-gradient-to-b from-[#FFD9D2] to-[#99827E] bg-clip-text text-transparent">
                    Join, <br />
                    growing <br />
                    <span className="font-[Comfortaa] text-black">dat</span> <br />
                    Community
                </div>
                <div className="mt-4">
                    <Link href={"https://github.com/dat-labs/dat-main"} target="_blank">
                        <Button variant={"outline"} className="gap-2">
                            <GithubFollow className="size-6" /> Follow us on Github
                        </Button>
                    </Link>
                </div>
            </div>
        </div>
    );
}

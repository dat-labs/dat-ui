import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ImageIcon, SunIcon, HomeIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@/components/ui/button";
import clsx from "clsx";
import { ModeToggle } from "../ClientComponents/theme-toggle";

const Sidebar = () => {
    return (
        <div className="flex flex-col w-full h-screen p-4 bg-primary-foreground border-r">
            <div className="flex flex-col items-center">
                <h1 className="text-xl font-semibold mb-4">dat</h1>
            </div>
            <div className="flex-grow pt-8">
                <nav className="flex flex-col space-y-4">
                    <Link className={clsx(buttonVariants({ variant: "ghost" }))} href="/dashboard">
                        <HomeIcon className={"w-5 h-5 "} />
                    </Link>
                    <Link className={clsx(buttonVariants({ variant: "ghost" }))} href="/orders">
                        <SunIcon className={"w-5 h-5 "} />
                    </Link>
                    <Link className={clsx(buttonVariants({ variant: "ghost" }))} href="/products">
                        <SunIcon className={"w-5 h-5 "} />
                    </Link>
                    <Link className={clsx(buttonVariants({ variant: "ghost" }))} href="/settings">
                        <ImageIcon className={"w-5 h-5 "} />
                    </Link>
                </nav>
            </div>
            <div className="pt-8">
            <nav className="flex flex-col space-y-4">
                <ModeToggle />
                <Button variant="outline" size="sm">
                    Log out
                </Button>
            </nav>
            </div>
        </div>
    );
};

export default Sidebar;

"use client";

import React, { useState } from "react";
import AccountSettings from "./accountSettings";
import PageBreadcrumb from "../page-breadcrumb";
import AddUsers from "./addUsers";
import SettingsTable from "./members";
import Members from "./members";

const navItems = [
    {
        label: "Account Settings",
        component: <AccountSettings />,
    },
    {
        label: "Members",
        component: <Members />,
    },
    // {
    //     label: "Invite Members",
    //     component: <div>InviteMembers</div>,
    // },
    // {
    //     label: "Set Up Alerts",
    //     component: <div>Set Up Alerts</div>,
    // },
    // {
    //     label: "Your Github Contributions",
    //     component: <div>Your Github Contributions</div>,
    // },
    // {
    //     label: "Time Zone",
    //     component: <div>Time Zone</div>,
    // },
];

const Settings = () => {
    const [option, setOption] = useState(0);

    return (
        <>
            <PageBreadcrumb
                breadCrumbData={[
                    {
                        pageName: "Settings",
                        pageUrl: `/settings`,
                    },
                ]}
            />
            <div className="flex flex-row w-full">
                <div className="flex flex-col p-2 h-screen border-r w-1/3 xl:w-1/6 space-y-1">
                    {navItems.map((node, ind) => (
                        <div
                            key={ind}
                            className={`cursor-pointer rounded hover:bg-muted ${option === ind && "bg-muted"} p-2 text-md`}
                            onClick={() => setOption(ind)}
                        >
                            {node.label}
                        </div>
                    ))}
                </div>
                <div className="flex w-2/3 xl:w-5/6">{navItems[option].component}</div>
            </div>
        </>
    );
};

export default Settings;

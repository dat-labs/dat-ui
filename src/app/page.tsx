"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

const HomePage = async () => {
    const router = useRouter();
    useEffect(() => {
        // Redirect to /connections on load
        router.push("/connections");
    }, [router]);

    // return <div>HOMEPAGE</div>;
};

export default HomePage;

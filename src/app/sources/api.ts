import { SourcesData } from "./sources-table";

export const getSourcesData = async (): Promise<SourcesData[]> => {
    // const response = await fetch("http://localhost:8000//actor_instances/source/list");
    // const data = await response.json();
    // return data;
    const data: SourcesData[] = await new Promise((resolve) =>
        setTimeout(() => {
            resolve([
                {
                    id: "0980-0-912300-91023-0",
                    name: "GCS",
                    actor: {
                        id: "str",
                        name: "Google Cloud Storage",
                        icon: "str",
                        actor_type: "source",
                        status: "ACTIVE",
                    },
                    created_at: "2021-11-09 14:47:00",
                    user_id: "09922bd9-7872-4664-99d0-08eae42fb554",
                },
                {
                    id: "0980-0-912300-91023-0",
                    name: "GCS",
                    actor: {
                        id: "str",
                        name: "Google Cloud Storage",
                        icon: "str",
                        actor_type: "source",
                        status: "ACTIVE",
                    },
                    created_at: "2021-11-09 14:47:00",
                    user_id: "09922bd9-7872-4664-99d0-08eae42fb554",
                },
            ]);
        }, 4000)
    );
    return data;
};

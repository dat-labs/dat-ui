import { ActorInstanceData } from "./actors-table";

export const getActorsData = async (actorType : string): Promise<ActorInstanceData[]> => {
    const response = await fetch(`http://localhost:8002/actor_instances/${actorType}/list`);
    const data = await response.json();
    // // wrap data in an array of ActorInstanceData

    const actorData: ActorInstanceData[] = data.map((actor: any) => {
        return {
            id: actor.id,
            actor_id: actor.actor_id,
            actor_type: actor.actor_type,
            user_id: actor.user_id,
            workspace_id: actor.workspace_id,
            name: actor.name,
            status: actor.status,
            configuration: actor.configuration,
            actor: actor.actor,
        };
    }
    );
    return actorData;
    // return data;
    // const data: ActorInstanceData[] = await new Promise((resolve) =>
    //     setTimeout(() => {
    //         resolve([
    //             {
    //                 id: "0980-0-912300-91023-0",
    //                 name: "GCS",
    //                 actor: {
    //                     id: "str",
    //                     name: "Google Cloud Storage",
    //                     icon: "str",
    //                     actor_type: "source",
    //                     status: "ACTIVE",
    //                 },
    //                 created_at: "2021-11-09 14:47:00",
    //                 user_id: "09922bd9-7872-4664-99d0-08eae42fb554",
    //             },
    //             {
    //                 id: "0980-0-912300-91023-0",
    //                 name: "GCS",
    //                 actor: {
    //                     id: "str",
    //                     name: "Google Cloud Storage",
    //                     icon: "str",
    //                     actor_type: "source",
    //                     status: "ACTIVE",
    //                 },
    //                 created_at: "2021-11-09 14:47:00",
    //                 user_id: "09922bd9-7872-4664-99d0-08eae42fb554",
    //             },
    //         ]);
    //     }, 4000)
    // );
    // return data;
};

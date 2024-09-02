import { ActorInstanceData, ConnectorSpecification } from "./actors-table";

export const getActorsData = async (actorType: string, wkspc_id: string) => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actor_instances/${actorType}/list?workspace_id=${wkspc_id}`);
    const data = await response.json();

    // wrap data in an array of ActorInstanceData
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
            connected_connections: actor.connected_connections,
            number_of_connections: actor.connected_connections.length,
        };
    });

    return { actorData, status: response.status };
};

export const getActorData = async (actorId: string, wkspc_id: string): Promise<ActorInstanceData> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actor_instances/${actorId}?workspace_id=${wkspc_id}`);
    const data = await response.json();
    return {
        id: data.id,
        actor_id: data.actor_id,
        actor_type: data.actor_type,
        user_id: data.user_id,
        workspace_id: data.workspace_id,
        name: data.name,
        status: data.status,
        configuration: data.configuration,
        actor: data.actor,
        connected_connections: data.connected_connections,
        number_of_connections: data.connected_connections.length,
    };
};

export const getActorSpec = async (actorId: string): Promise<ConnectorSpecification> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/actors/${actorId}/spec`);
    const data = await response.json();
    return data;
};

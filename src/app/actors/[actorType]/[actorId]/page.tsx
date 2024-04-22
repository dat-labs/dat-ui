

interface ActorDetailsPageProps {
    params: {
        actorType: string;
        actorId: string;
    }
}

function ActorDetailsPage(
    { params }: ActorDetailsPageProps
) {
    const { actorType, actorId } = params
    return (
        <div>ActorDetailsPage {actorId}</div>
    )
}

export default ActorDetailsPage
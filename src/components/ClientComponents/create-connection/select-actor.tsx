import React, { Suspense } from "react";
import { FromDataContext } from ".";
import { getActorsData } from "@/app/actors/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeFirstLetter, getIconComponent } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ActorForm from "@/app/actors/[actorType]/create/actor-form";
import clsx from "clsx";
import CircularLoader from "@/components/ui/circularLoader";

const IconComponent = React.memo(({ actorName }) => {
    let Comp = getIconComponent(actorName);
    if (Comp) {
        return <Comp />;
    } else {
        return null;
    }
});

export default function SelectSource({ actorType }: { actorType: string }) {
    const { state, updateState } = React.useContext(FromDataContext);
    console.log(state, "state");

    const [actors, setActors] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getActorsData(actorType);
            setActors(data);
        };
        fetchData();
    }, [actorType]);

    React.useEffect(() => {
        if (state[actorType].subStep === "createNew") {
            updateState("showNavButtons", false);
        } else {
            updateState("showNavButtons", true);
        }
    }, [state[actorType].subStep]);

    const handleSourceSelect = (actor: any) => {
        updateState(actorType, { ...state[actorType], value: actor });
    };

    const handleSubStepChange = (val: any) => {
        updateState(actorType, { ...state[actorType], subStep: val });
    };

    return (
        <div>
            <Card className="p-3">
                <RadioGroup
                    value={state[actorType].subStep}
                    className="w-full"
                    onValueChange={(val: any) => handleSubStepChange(val)}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 items-center w-6/12 p-4 border rounded-lg border">
                            <RadioGroupItem value="selectConfigured" id="selectConfigured" />
                            <Label htmlFor="selectConfigured" className="w-full">
                                Select a configured {actorType}
                                <p className="text-xs text-muted-foreground">
                                    You can select an already configured {actorType} by choosing this option
                                </p>
                            </Label>
                        </div>
                        <div className="flex gap-2 items-center w-6/12 p-4  border rounded-lg border">
                            <RadioGroupItem value="createNew" id="createNew" />
                            <Label htmlFor="createNew" className="w-full">
                                Create a new {actorType}
                                <p className="text-xs text-muted-foreground">
                                    You can create a new {actorType} by choosing this option
                                </p>
                            </Label>
                        </div>
                    </div>
                </RadioGroup>
            </Card>

            {state[actorType].subStep === "selectConfigured" && (
                <>
                    <div className="flex gap-4 w-full mt-4">
                        {actors.map((actor: any) => (
                            <Card
                                onClick={() => handleSourceSelect(actor)}
                                className={clsx(
                                    "w-4/12 cursor-pointer transition duration-400 bg-card-background hover:bg-accent",
                                    { "border-foreground": state[actorType]?.value?.id === actor.id }
                                )}
                            >
                                <CardHeader>
                                    <CardTitle className="text-sm">
                                        <div className="flex gap-2 items-center">
                                            <Suspense fallback={<CircularLoader />}>
                                                {getIconComponent(actor.actor.icon).then((IconComponent) =>
                                                    IconComponent ? <IconComponent className="h-7 w-7 stroke-foreground" /> : null
                                                )}
                                            </Suspense>
                                            <p>{actor.name}</p>
                                        </div>
                                    </CardTitle>
                                    <CardDescription className="text-xs">
                                        {capitalizeFirstLetter(actorType)} Type - {actor.actor.name}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        {actors.length === 0 && (
                            <div className="w-4/12 transition duration-400 bg-card-background hover:bg-accent p-4 rounded-xl shadow mt-4 mb-4">
                                <h1 className="text-sm text-center">No {capitalizeFirstLetter(actorType)} found</h1>
                            </div>
                        )}
                    </div>
                </>
            )}
            {state[actorType].subStep === "createNew" && (
                <div className="flex justify-center mt-4">
                    <div className="w-full">
                        <ActorForm actorType={actorType} />
                    </div>
                </div>
            )}
        </div>
    );
}

import React from "react";
import { FromDataContext } from ".";
import { getActorsData } from "@/app/actors/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ActorForm from "@/app/actors/[actorType]/create/actor-form";

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

    const handleSourceSelect = (actor: any) => {
        updateState(actorType, { ...state[actorType], value: actor });
    };

    const handleSubStepChange = (val: any) => {
        updateState(actorType, { ...state[actorType], subStep: val });
    };

    return (
        <div>
            <RadioGroup
                value={state[actorType].subStep}
                className="w-full"
                onValueChange={(val: any) => handleSubStepChange(val)}
            >
                <div className="flex items-center gap-4">
                    <div className="flex gap-2 items-center w-6/12 p-4 border-muted-foreground rounded-lg border">
                        <RadioGroupItem value="selectConfigured" id="selectConfigured" />
                        <Label htmlFor="selectConfigured" className="w-full">
                            Select a configured {actorType}
                            <p className="text-xs text-muted-foreground">
                                You can select an already configured {actorType} by choosing this option
                            </p>
                        </Label>
                    </div>
                    <div className="flex gap-2 items-center w-6/12 p-4  border-muted-foreground rounded-lg border">
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

            {state[actorType].subStep === "selectConfigured" && (
                <>
                    <div className="flex gap-4 w-full mt-4">
                        {actors.map((actor: any) => (
                            <Card
                                onClick={() => handleSourceSelect(actor)}
                                className="w-4/12 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition duration-400 bg-slate-50 dark:bg-slate-900"
                            >
                                <CardHeader>
                                    <CardTitle className="text-sm">Name : {actor.name}</CardTitle>
                                    <CardDescription className="text-xs">
                                        {actorType} Type - {actor.actor.name}
                                    </CardDescription>
                                </CardHeader>
                            </Card>
                        ))}
                    </div>
                    <div className="flex justify-center">
                        {actors.length === 0 && (
                            <div className="w-4/12 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl shadow mt-4 mb-4">
                                <h1 className="text-sm text-center">No {capitalizeFirstLetter(actorType)} found</h1>
                            </div>
                        )}
                    </div>
                </>
            )}
            {state[actorType].subStep === "createNew" && (
                <div className="flex justify-center mt-4">
                    <div className="w-6/12">
                        <ActorForm actorType={actorType} />
                    </div>
                </div>
            )}
        </div>
    );
}

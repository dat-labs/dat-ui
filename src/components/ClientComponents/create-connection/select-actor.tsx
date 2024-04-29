import React from "react";
import { FromDataContext } from ".";
import { getActorsData } from "@/app/actors/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeFirstLetter } from "@/lib/utils";

export default function SelectSource({ actorType }: { actorType: string }) {
    const { state, updateState } = React.useContext(FromDataContext);

    const [actors, setActors] = React.useState([]);

    React.useEffect(() => {
        const fetchData = async () => {
            const data = await getActorsData(actorType);
            setActors(data);
        };
        fetchData();
    }, [actorType]);

    const handleSourceSelect = (actor: any) => {
        updateState(`selected${capitalizeFirstLetter(actorType)}`, actor);
        updateState("step", state.step + 1);
    };

    return (
        <div>
            <div className="flex gap-4 justify-center">
                {actors.map((actor: any) => (
                    <Card
                        onClick={() => handleSourceSelect(actor)}
                        className="w-4/12 cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 transition bg-slate-50 dark:bg-slate-900"
                    >
                        <CardHeader>
                            <CardTitle>Name : {actor.name}</CardTitle>
                            <CardDescription>
                                {actorType} Type - {actor.actor.name}
                            </CardDescription>
                        </CardHeader>
                    </Card>
                ))}
                {actors.length === 0 && (
                    <div className="w-4/12 bg-slate-50 dark:bg-slate-900 p-4 rounded-xl shadow mt-4 mb-4">
                        <h1 className="text-sm text-center">No {capitalizeFirstLetter(actorType)} found</h1>
                    </div>
                )}
            </div>
        </div>
    );
}

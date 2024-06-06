import React, { Suspense, useCallback } from "react";
import { FromDataContext } from ".";
import { getActorsData } from "@/app/actors/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeFirstLetter, cn, importIcon } from "@/lib/utils.ts";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ActorForm from "@/app/actors/[actorType]/create/actor-form";
import clsx from "clsx";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

const Search = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <div className="relative h-10 w-full">
            <MagnifyingGlassIcon className="absolute h-6 w-6 left-3 top-[18px] transform -translate-y-1/2 text-gray-500 z-10" />
            <Input
                {...props}
                ref={ref}
                className={cn(
                    "pl-10 pr-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:border-transparent",
                    className
                )} // Add additional styling as needed
            />
        </div>
    );
});

Search.displayName = "Search";

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
            <Card className="p-5">
                <div className="mb-3">
                    <p className="text-lg font-semibold">Define {capitalizeFirstLetter(actorType)}</p>
                    <p className="text-sm text-muted-foreground mt-2 mb-4">Select the mode of setup</p>
                </div>
                <RadioGroup
                    value={state[actorType].subStep}
                    className="w-full"
                    onValueChange={(val: any) => handleSubStepChange(val)}
                >
                    <div className="flex items-center gap-4">
                        <div className="flex gap-2 items-center w-6/12 p-4">
                            <RadioGroupItem value="selectConfigured" id="selectConfigured" />
                            <Label htmlFor="selectConfigured" className="w-full cursor-pointer">
                                Select a configured {actorType}
                                <p className="text-xs text-muted-foreground mt-1">
                                    You can select an already configured {actorType} by choosing this option
                                </p>
                            </Label>
                        </div>
                        <div className="flex gap-2 items-center w-6/12 p-4 ">
                            <RadioGroupItem value="createNew" id="createNew" />
                            <Label htmlFor="createNew" className="w-full cursor-pointer">
                                Create a new {actorType}
                                <p className="text-xs text-muted-foreground mt-1">
                                    You can create a new {actorType} by choosing this option
                                </p>
                            </Label>
                        </div>
                    </div>
                </RadioGroup>
            </Card>

            {state[actorType].subStep === "selectConfigured" && (
                <>
                    <Search
                        type="search"
                        placeholder={`Search your ${capitalizeFirstLetter(actorType)}`}
                        className="mt-6 rounded-lg"
                    />
                    <div className="grid grid-cols-4 gap-4 w-full mt-4 p-3">
                        {actors.map((actor: any) => {
                            const IconComponent = importIcon(actor.actor.icon);
                            console.log(IconComponent);
                            return (
                                <Card
                                    onClick={() => handleSourceSelect(actor)}
                                    className={clsx("cursor-pointer transition duration-400 bg-card-background hover:bg-accent", {
                                        "border-foreground": state[actorType]?.value?.id === actor.id,
                                    })}
                                >
                                    <CardHeader className="p-3">
                                        <CardTitle className="text-sm">
                                            <div className="flex gap-2 items-center">
                                                {IconComponent !== null ? (
                                                    <IconComponent className="h-6 w-6 stroke-foreground fill-foreground" />
                                                ) : (
                                                    <img
                                                        src={`https://ui-avatars.com/api/?name=${actor.actor.name}`}
                                                        alt="icon"
                                                        className="h-7 w-7 rounded-md"
                                                    />
                                                )}
                                                <p>{actor.name}</p>
                                            </div>
                                        </CardTitle>
                                        <CardDescription className="text-xs">
                                            {capitalizeFirstLetter(actorType)} Type - {actor.actor.name}
                                        </CardDescription>
                                    </CardHeader>
                                </Card>
                            );
                        })}
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
                <div className="flex justify-center mt-6">
                    <div className="w-full">
                        <Card>
                            <ActorForm actorType={actorType} />
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}

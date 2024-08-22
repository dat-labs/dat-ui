import React, { Suspense, useCallback, useEffect } from "react";
import { FromDataContext } from ".";
import { getActorsData } from "@/app/actors/api";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeFirstLetter, importIcon } from "@/lib/utils.ts";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import ActorForm from "@/app/actors/[actorType]/create/actor-form";
import clsx from "clsx";
import useSearch from "@/hooks/useSearch";
import { Search } from "@/components/commom/search-bar";
import useApiCall from "@/hooks/useApiCall";
import Loading from "@/app/actors/loading";

export type SearchProps = React.InputHTMLAttributes<HTMLInputElement>;

/**
 * SelectSource component allows the user to select an actor type as per the search query.
 * @param actorType - The type of actor to select.
 * @returns The rendered SelectSource component with searchbar and actor list.
 */
export default function SelectSource({ actorType }: { actorType: string }) {
    const { state, updateState, updateCombinedState } = React.useContext(FromDataContext);

    const [actors, setActors] = React.useState([]);

    const { data, loading, makeApiCall } = useApiCall(getActorsData);

    React.useEffect(() => {
        const fetchData = async () => {
            await makeApiCall(actorType);
        };
        fetchData();
    }, [actorType]);

    useEffect(() => {
        if (data) {
            setActors(data);
        }
    }, [data, setActors]);

    React.useEffect(() => {
        if (state.step === 4) {
            updateState("showNavButtons", true);
        } else {
            if (state[actorType].subStep === "createNew") {
                updateState("showNavButtons", false);
            } else {
                updateState("showNavButtons", true);
            }
        }
    }, [state.step, state[actorType].subStep]);

    /**
     * Handles the selection of an actor.
     * @param actor - The selected actor.
     */
    const handleSourceSelect = (actor: any) => {
        updateState(actorType, { ...state[actorType], value: actor });
    };
    /**
     * Handles the change of the sub-step.
     * @param val - The value of the selected sub-step.
     */
    const handleSubStepChange = (val: any) => {
        updateState(actorType, { ...state[actorType], subStep: val });
    };

    const postCreateInstance = (actor: any) => {
        updateCombinedState(actorType, actor);
    };

    //Using useSearch Hook
    const { query, setQuery, filteredData } = useSearch(actors, "name", false);

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
                        handleSearch={(e) => setQuery(e.target.value)}
                        search={query}
                    />
                    {loading ? (
                        <div className="mt-4 p-3">
                            <Loading height="100px" />
                        </div>
                    ) : filteredData.length === 0 ? (
                        <div className="w-4/12 transition duration-400 bg-card-background hover:bg-accent mx-auto p-4 rounded-xl shadow mt-4 mb-4">
                            <h1 className="text-sm text-center">No {capitalizeFirstLetter(actorType)} found</h1>
                        </div>
                    ) : (
                        <div className="grid lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4 w-full mt-4 p-3">
                            {filteredData.map((actor: any) => {
                                const IconComponent = importIcon(actor.actor.icon);
                                return (
                                    <Card
                                        onClick={() => handleSourceSelect(actor)}
                                        className={clsx(
                                            "cursor-pointer transition duration-400 bg-card-background hover:bg-accent",
                                            {
                                                "border-foreground": state[actorType]?.value?.id === actor.id,
                                            }
                                        )}
                                    >
                                        <CardHeader className="p-3">
                                            <CardTitle className="text-sm">
                                                <div className="flex gap-2 items-center">
                                                    <Card className="p-1 bg-white">
                                                        {IconComponent !== null ? (
                                                            <IconComponent className="h-6 w-6" />
                                                        ) : (
                                                            <img
                                                                src={`https://ui-avatars.com/api/?name=${actor.actor.name}`}
                                                                alt="icon"
                                                                className="h-7 w-7 rounded-md"
                                                            />
                                                        )}
                                                    </Card>

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
                    )}
                </>
            )}
            {state[actorType].subStep === "createNew" && (
                <div className="flex justify-center mt-6">
                    <div className="w-full">
                        <Card>
                            <ActorForm
                                actorType={actorType}
                                postFormSubmitActions={postCreateInstance}
                                inCreateConnection={true}
                            />
                        </Card>
                    </div>
                </div>
            )}
        </div>
    );
}

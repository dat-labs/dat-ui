import React, { Suspense } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { capitalizeFirstLetter } from "@/lib/utils";
import clsx from "clsx";
import CircularLoader from "@/components/ui/circularLoader";

const importIcon = (iconName) => {
    try {
        console.log(iconName);
        const iconModule = require(`@/assets/actors/${iconName}`);
        return iconModule.default;
    } catch (err) {
        console.error(`Error importing icon "${iconName}":`, err);
        return null;
    }
};

const ActorListing = ({ actors, onChangeHandler, actorType, selectedActor }) => {
    if (!actors || actors.length === 0) {
        return null;
    }

    return (
        <div>
            <div className="flex gap-4 w-full mt-4">
                {actors.map((actor: any) => {
                    const IconComponent = importIcon(actor.icon);
                    return (
                        <Card
                            onClick={() => onChangeHandler(actor)}
                            className={clsx("w-4/12 cursor-pointer transition duration-400 bg-card-background hover:bg-accent", {
                                "border-foreground": selectedActor?.id === actor.id,
                            })}
                        >
                            <CardHeader>
                                <CardTitle className="text-sm">
                                    <div className="flex justify-between">
                                        <div className="flex gap-2 items-center">
                                            <Suspense fallback={<CircularLoader />}>
                                                {IconComponent ? (
                                                    <IconComponent className="h-7 w-7" />
                                                ) : (
                                                    <img
                                                        src={`https://ui-avatars.com/api/?name=${actor.name}`}
                                                        alt="icon"
                                                        className="h-7 w-7 rounded-md"
                                                    />
                                                )}
                                            </Suspense>
                                            <p className="ml-2 font-normal">{actor.name}</p>
                                        </div>
                                        <p className="rounded bg-zinc-100 text-black px-4 py-2">Verified</p>
                                    </div>
                                </CardTitle>
                            </CardHeader>
                        </Card>
                    );
                })}
            </div>
        </div>
    );
};

export default ActorListing;

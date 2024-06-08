import React, { Suspense } from "react";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import CircularLoader from "@/components/ui/circularLoader";
import { Search } from "@/components/commom/search-bar";
import useSearch from "@/hooks/useSearch";
import { capitalizeFirstLetter } from "@/lib/utils";

/**
 * Dynamically imports an icon based on the provided icon name.
 * @param me - The name of the icon to import.
 * @returns The imported icon component or null if there's an error.
 */
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

/**
 * ActorListing component displays a list of actors with a search functionality.
 * @param actors - List of actors to display.
 * @param onChangeHandler - Handler function to call when an actor is selected.
 * @param actorType - The type of actor being displayed.
 * @param selectedActor - The currently selected actor.
 *
 * @returns {JSX.Element|null} The rendered actor listing component or null if no actors are provided.
 */

const ActorListing = ({ actors, onChangeHandler, actorType, selectedActor }) => {
    if (!actors || actors.length === 0) {
        return null;
    }

    const { query, setQuery, filteredData } = useSearch(actors, "name");

    return (
        <div>
            {/* Replaced the old searchbar */}
            {/* <SearchBar handleChange={(e) => setQuery(e.target.value)} search={query} /> */}
            <Search
                type="search"
                placeholder={`Search your ${capitalizeFirstLetter(actorType)}`}
                className="mt-6 rounded-lg"
                handleSearch={(e) => setQuery(e.target.value)}
                search={query}
            />

            <div className="flex gap-4 w-full mt-4">
                {filteredData.map((actor: any) => {
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

import React, { Suspense } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import clsx from "clsx";
import CircularLoader from "@/components/ui/circularLoader";
import { Search } from "@/components/commom/search-bar";
import useSearch from "@/hooks/useSearch";
import { capitalizeFirstLetter } from "@/lib/utils";
import { PlusIcon } from "@radix-ui/react-icons";

/**
 * Dynamically imports an icon based on the provided icon name.
 * @param me - The name of the icon to import.
 * @returns The imported icon component or null if there's an error.
 */
const importIcon = (iconName) => {
    try {
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
 * @returns {JSX.Element|null} The rendered actor listing component or null if no actors are provided.
 */

const ActorListing = ({ actors, onChangeHandler, actorType, selectedActor }) => {
    if (!actors || actors.length === 0) {
        return null;
    }

    const { query, setQuery, filteredData } = useSearch(actors, "name", false);

    return (
        <div className="p-5">
            {/* Replaced the old searchbar */}
            {/* <SearchBar handleChange={(e) => setQuery(e.target.value)} search={query} /> */}
            <Search
                type="search"
                placeholder={`Search your ${capitalizeFirstLetter(actorType)}`}
                className="mt-6 rounded-lg"
                handleSearch={(e) => setQuery(e.target.value)}
                search={query}
            />

            <div className="flex flex-col mx-auto gap-4 w-11/12 mt-4 flex-wrap">
                <div className="grid lg:grid-cols-3 grid-cols-2 gap-3">
                    {filteredData.map((actor: any) => {
                        const IconComponent = importIcon(actor.icon);
                        return (
                            <Card
                                onClick={() => onChangeHandler(actor)}
                                className={clsx(
                                    "w-full cursor-pointer transition duration-400 bg-card-background hover:bg-accent",
                                    {
                                        "border-foreground": selectedActor?.id === actor.id,
                                    }
                                )}
                            >
                                <CardHeader>
                                    <CardTitle className="text-sm">
                                        <div className="flex lg:flex-row flex-col justify-between">
                                            <div className="flex items-center">
                                                <Suspense fallback={<CircularLoader />}>
                                                    <Card className="p-1 bg-white">
                                                        {IconComponent ? (
                                                            <IconComponent className="h-7 w-7" />
                                                        ) : (
                                                            <img
                                                                src={`https://ui-avatars.com/api/?name=${actor.name}`}
                                                                alt="icon"
                                                                className="h-7 w-7 rounded-md"
                                                            />
                                                        )}
                                                    </Card>
                                                </Suspense>
                                                <p className="ml-2 font-normal text-md">{actor.name}</p>
                                            </div>
                                            {/* <p className="rounded-xl text-center bg-muted text-gray-500 pl-2 pr-2 pt-1 pb-1 mt-3 lg:mt-0 border-2">
                                                VERIFIED
                                            </p> */}
                                            <div className="flex items-center mt-4 lg:mt-0">
                                                <p className="text-[11px] border border-blue-400 rounded-lg py-[2px] px-[5px] text-blue-500">
                                                    VERIFIED
                                                </p>
                                            </div>
                                        </div>
                                    </CardTitle>
                                </CardHeader>
                            </Card>
                        );
                    })}
                </div>

                {/* <Card className="mt-4 flex flex-row items-center p-2 space-x-2 text-muted-foreground">
                    <Card className="rounded-md">
                        <PlusIcon className="h-6 w-6 text-muted-foreground" />
                    </Card>

                    <p>Couldn't Find what you looking for? Request a new Connector</p>
                </Card> */}
            </div>
        </div>
    );
};

export default ActorListing;

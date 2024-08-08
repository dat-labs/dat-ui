import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import "./markdownStyles.css";
import Loading from "@/app/actors/loading";

const DocWrapper = ({ doc, url }) => {
    const clickHandler = () => {
        window.open(url, "_blank");
    };

    return (
        <div className="p-6">
            <div className="flex justify-end">
                <Button variant="outline" onClick={clickHandler}>
                    <ArrowTopRightIcon className="mr-2" /> Open Full Docs
                </Button>
            </div>
            {doc == "loading" ? (
                <div className="mt-3">
                    <Loading />
                </div>
            ) : (
                <div className="pr-5">
                    <Markdown className="markdown" remarkPlugins={[remarkGfm]}>
                        {doc}
                    </Markdown>
                </div>
            )}
        </div>
    );
};

export default DocWrapper;

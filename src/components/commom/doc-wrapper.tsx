import { Button } from "@/components/ui/button";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";

const DocWrapper = ({ children, doc, url }) => {

    const clickHandler = () => {
        window.open(url, '_blank');
    }
    return (
        <div className="flex justify-between">
            <div className="flex-1">{children}</div>
            <div className="flex-1 border-l">
                <div className="w-full p-6">
                    <div className="flex justify-end">
                        <Button variant="outline" onClick={clickHandler}>
                            <ArrowTopRightIcon className="mr-2" /> Open Full Docs
                        </Button>
                    </div>
                    {doc}
                    <h3 className="text-xl font-semibold mb-4">How to create a source?</h3>
                    <p className="text-sm">
                        Morbi tristique senectus et netus et malesuada. Commodo nulla facilisi nullam vehicula ipsum a arcu
                        cursus. Fringilla est ullamcorper eget nulla facilisi etiam dignissim. Aliquam sem et tortor consequat id
                        porta nibh venenatis. Id faucibus nisl tincidunt eget nullam.
                    </p>
                    <p className="text-sm">
                        Sit amet dictum sit amet. Consectetur a erat nam at. Et malesuada fames ac turpis. Elit eget gravida cum
                        sociis natoque penatibus et magnis dis. Porta non pulvinar neque laoreet suspendisse interdum consectetur
                        libero id. Ridiculus mus mauris vitae ultricies leo. Mauris vitae ultricies leo integer malesuada nunc
                        vel. Gravida dictum fusce ut placerat orci. Lacinia at quis risus sed. Ut consequat semper viverra nam
                        libero justo laoreet sit amet.
                    </p>
                    <ul className="list-disc p-10 li">
                        <li className="text-sm">
                            Morbi tristique senectus et netus et malesuada. Commodo nulla facilisi nullam vehicula ipsum a arcu
                            cursus. Fringilla
                        </li>
                        <li className="text-sm">
                            Morbi tristique senectus et netus et malesuada. Commodo nulla facilisi nullam vehicula ipsum a arcu
                            cursus. Fringilla
                        </li>
                        <li className="text-sm">
                            Morbi tristique senectus et netus et malesuada. Commodo nulla facilisi nullam vehicula ipsum a arcu
                            cursus. Fringilla
                        </li>
                    </ul>
                    <p className="text-sm">
                        Sit amet dictum sit amet. Consectetur a erat nam at. Et malesuada fames ac turpis. Elit eget gravida cum
                        sociis natoque penatibus et magnis dis. Porta non pulvinar neque laoreet suspendisse interdum consectetur
                        libero id. Ridiculus mus mauris vitae ultricies leo. Mauris vitae ultricies leo integer malesuada nunc
                        vel. Gravida dictum fusce ut placerat orci. Lacinia at quis risus sed. Ut consequat semper viverra nam
                        libero justo laoreet sit amet.
                    </p>
                    <ul className="list-disc p-10 li">
                        <li className="text-sm">
                            Morbi tristique senectus et netus et malesuada. Commodo nulla facilisi nullam vehicula ipsum a arcu
                            cursus. Fringilla
                        </li>
                        <li className="text-sm">
                            Morbi tristique senectus et netus et malesuada. Commodo nulla facilisi nullam vehicula ipsum a arcu
                            cursus. Fringilla
                        </li>
                        <li className="text-sm">
                            Morbi tristique senectus et netus et malesuada. Commodo nulla facilisi nullam vehicula ipsum a arcu
                            cursus. Fringilla
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DocWrapper;

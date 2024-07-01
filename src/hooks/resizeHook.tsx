import { useState, useCallback, useEffect } from "react";

const useResizable = (initialWidth = 50) => {
    const [width, setWidth] = useState(initialWidth);
    const [dragging, setDragging] = useState(false);

    const startDragging = useCallback(() => setDragging(true), []);
    const stopDragging = useCallback(() => setDragging(false), []);
    const handleDrag = useCallback(
        (e) => {
            if (dragging) {
                const newWidth = (e.clientX / window.innerWidth) * 100;
                if (newWidth > 20 && newWidth < 80) {
                    // Adjust these values as needed
                    setWidth(newWidth);
                }
            }
        },
        [dragging]
    );

    useEffect(() => {
        if (dragging) {
            document.addEventListener("mousemove", handleDrag);
            document.addEventListener("mouseup", stopDragging);
        } else {
            document.removeEventListener("mousemove", handleDrag);
            document.removeEventListener("mouseup", stopDragging);
        }

        return () => {
            document.removeEventListener("mousemove", handleDrag);
            document.removeEventListener("mouseup", stopDragging);
        };
    }, [dragging, handleDrag, stopDragging]);

    return { width, startDragging };
};

export default useResizable;

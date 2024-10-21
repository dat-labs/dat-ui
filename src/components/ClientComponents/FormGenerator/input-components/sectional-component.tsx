import React, { useEffect } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import clsx from "clsx";

export default function SectionalComponent({ title, field_name, sortedProperties, renderFormField,handleUnregister, order, type }) {
    useEffect(() => {
        return () => {
            handleUnregister(field_name);
        };
    }, [handleUnregister, field_name]);
    return (
        <div className={clsx({ "border border-muted p-3 rounded-md": type === "object" })} key={order}>
            <Accordion type="single" collapsible className="data-entry-divider border-background">
                <AccordionItem value="item-1">
                    <AccordionTrigger>{title}</AccordionTrigger>
                    <AccordionContent>
                        <label htmlFor={field_name} className="flex flex-col space-y-1">
                            {/* ... (existing code for rendering different field types) ... */}
                            <div className="pl-4">
                                <div className="flex flex-col space-y-4">
                                    {sortedProperties.map((prop: any) => renderFormField(prop, `${field_name}`))}
                                </div>
                            </div>
                        </label>
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

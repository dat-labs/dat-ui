import React from "react";
import { getFormDataForSource } from "./api";
import FormGenerator from "@/components/ClientComponents/FormGenerator";

export default async function CreatePage() {
    const formData: any = await getFormDataForSource("sourceId");
    return (
        <div>
            create page{" "}
            <div className="flex justify-center">
                <div className="w-6/12">
                    {formData?.connectionSpecification?.properties && (
                        <FormGenerator properties={formData?.connectionSpecification?.properties} />
                    )}
                </div>
            </div>
        </div>
    );
}

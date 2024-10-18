import React, { useRef, useState, useEffect } from "react";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { UploadIcon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { uploadActorInstanceFile } from "../api";
interface FileUploadProps {
  field_name: string;
  required?: boolean;
  allowedFileTypes?: string[];
  onUploadResponse?: (responses: any[]) => void;
  existingFiles?: string[];
  handleUnregister: (name: string) => void;
  targetPath: string | null; 
}

export default function FileUpload({
  field_name,
  required = false,
  allowedFileTypes = [],
  onUploadResponse,
  existingFiles = [], 
  handleUnregister,
  targetPath,
}: FileUploadProps) {
  const { control, setValue } = useFormContext();
  const [isDragging, setIsDragging] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [fileError, setFileError] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const [uploadSuccessMessage, setUploadSuccessMessage] =
    useState<string | null>(null);
  const [uploadSuccess, setUploadSuccess] = useState(false); // New state for upload success
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFileType = (file: File) => {
    if (allowedFileTypes.length > 0) {
      const fileExtension = file.name.split(".").pop()?.toLowerCase();
      return allowedFileTypes.some(
        (type) => type.replace(".", "").toLowerCase() === fileExtension
      );
    }
    return true;
  };

  useEffect(() => {
    return () => {
      handleUnregister(field_name);
    };
  }, [handleUnregister, field_name]);

  const handleFileChange = (newFiles: FileList | null) => {
    setFileError(null);
    if (newFiles) {
      const validFiles: File[] = [];
      for (let i = 0; i < newFiles.length; i++) {
        const file = newFiles[i];
        if (validateFileType(file)) {
          validFiles.push(file);
        } else {
          setFileError(
            `Some files have an invalid type. Allowed types: ${allowedFileTypes.join(
              ", "
            )}`
          );
        }
      }

      if (validFiles.length > 0) {
        const updatedFiles = [...files, ...validFiles];
        setFiles(updatedFiles);
        setValue(field_name, updatedFiles);
      }
    }
  };

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    const droppedFiles = e.dataTransfer.files;
    if (droppedFiles) {
      handleFileChange(droppedFiles);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const removeFile = (index: number) => {
    const updatedFiles = files.filter((_, i) => i !== index);
    setFiles(updatedFiles);
    setValue(field_name, updatedFiles);
  };

  const handleUploadFiles = async () => {
    if (files.length === 0) {
      setUploadError("No files selected for upload.");
      return;
    }

    setUploading(true);
    setUploadError(null);
    setUploadSuccessMessage(null);
    try {
      const uploadResult = await uploadActorInstanceFile(files, targetPath);

      if (onUploadResponse) {
        onUploadResponse([uploadResult]);
      }

      if (uploadResult.status === 200) {
        setUploadSuccess(true); // Set upload success
        setUploadSuccessMessage("Files uploaded successfully! Submit the form to save your changes.");
        setValue(field_name, [
          ...existingFiles,
          ...files.map((file) => file.name),
        ]);
        setFiles([]);
      } else {
        throw new Error("Upload failed");
      }
    } catch (error) {
      console.error("Upload error:", error);
      setUploadError("An error occurred during file upload.");
      toast.error("An error occurred during file upload.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <FormField
      control={control}
      name={field_name}
      rules={{ required: required ? "Please upload a file" : false }}
      render={() => (
        <FormItem>
          <FormControl>
            <>
              {/* Remove Existing Files Box on Upload Success */}
              {!uploadSuccess && existingFiles.length > 0 && (
                <div className="mt-4 w-full p-4 border rounded-lg">
                  <h4 className="text-sm font-semibold mb-2 ">
                    Existing Files:
                  </h4>
                  <ul className="text-sm ">
                    {existingFiles.map((fileName, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center mb-2"
                      >
                        {fileName}
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Success Message Box */}
              {uploadSuccessMessage && (
                <div className="mt-4 w-full p-4 border border-dashed border-green-500 bg-green-50 dark:bg-green-900 rounded-lg">
                  <p className="text-sm text-green-600 dark:text-green-300">
                    {uploadSuccessMessage}
                  </p>
                </div>
              )}

              {/* File Input Area */}
              {!uploadSuccess && (
                <div
                  className={`flex flex-col items-center justify-center w-full h-64 border-2 border-dashed rounded-lg transition-colors ${
                    isDragging
                      ? "border-gray-500 bg-gray-100 dark:bg-gray-700 dark:border-gray-500"
                      : "border-gray-300 dark:border-gray-600 dark:bg-gray-800"
                  }`}
                  onDragEnter={handleDragEnter}
                  onDragOver={handleDragEnter}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                >
                  <Input
                    type="file"
                    ref={fileInputRef}
                    onChange={(e) => handleFileChange(e.target.files)}
                    className="hidden"
                    accept={allowedFileTypes
                      .map((type) =>
                        type.startsWith(".") ? type : `.${type}`
                      )
                      .join(",")}
                    multiple
                  />
                  {files.length === 0 ? (
                    <>
                      <UploadIcon className="w-12 h-12 mb-4" />
                      <p className="mb-2 text-sm ">
                        <span className="font-semibold">
                          Drag and drop files here
                        </span>
                      </p>
                      <p className="text-xs ">
                        Allowed types: {allowedFileTypes.join(", ") || "Any"}
                      </p>
                      <Button
                        type="button"
                        onClick={handleUploadClick}
                        className="mt-4 px-4 py-2"
                      >
                        Select Files
                      </Button>
                      {fileError && (
                        <p className="mt-2 text-sm text-red-500">{fileError}</p>
                      )}
                    </>
                  ) : (
                    <>
                      <p className="text-sm mb-2">
                        {files.length} file(s) selected
                      </p>
                      <Button
                        type="button"
                        onClick={handleUploadClick}
                        className="mt-2"
                      >
                        Add Files
                      </Button>
                    </>
                  )}
                </div>
              )}

              {/* Display Uploaded Files */}
              {files.length > 0 && (
                <div className="mt-4 w-full   p-4 border  rounded-lg">
                  <h4 className="text-sm font-semibold mb-2 ">
                    Uploaded Files:
                  </h4>
                  <ul className="text-sm ">
                    {files.map((file, index) => (
                      <li
                        key={index}
                        className="flex justify-between items-center mb-2"
                      >
                        {file.name}
                        <Button
                          type="button"
                          onClick={() => removeFile(index)}
                          variant="outline"
                          size="sm"
                          className="ml-4"
                        >
                          Remove
                        </Button>
                      </li>
                    ))}
                  </ul>
                  <Button
                    type="button"
                    onClick={handleUploadFiles}
                    disabled={uploading}
                    className="mt-2"
                  >
                    {uploading ? "Uploading..." : "Upload Files"}
                  </Button>
                  {uploadError && (
                    <p className="mt-2 text-sm text-red-500">{uploadError}</p>
                  )}
                </div>
              )}
            </>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}

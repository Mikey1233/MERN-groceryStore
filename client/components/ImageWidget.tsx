"use client";
import { useState } from "react";
import {
  CldUploadWidget,
  CloudinaryUploadWidgetInfo,
} from "next-cloudinary";

function ImageWidget() {
  const [resource, setResource] = useState<CloudinaryUploadWidgetInfo | undefined>(undefined);

  return (
    <CldUploadWidget
      signatureEndpoint="/api/sign-cloudinary-params"
      onSuccess={(result, { widget }) => {
        if (result?.info && typeof result.info !== "string") {
          setResource(result.info); // ✅ type-safe
          console.log("Uploaded image:", result.info);
        }
      }}
      onQueuesEnd={(result, { widget }) => {
        widget.close();
      }}
    >
      {({ open }) => {
        function handleOnClick() {
          setResource(undefined);
          open();
        }
        return <button onClick={handleOnClick}>Upload an Image</button>;
      }}
    </CldUploadWidget>
  );
}

export default ImageWidget;


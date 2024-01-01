import { ChangeEvent } from "react";

export interface ImageUploadProps {
  imageUrl?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onDelete?: () => void;
}

export const ImageUpload = (props: ImageUploadProps) => {
  const { imageUrl, onChange, onDelete } = props;
  const isImageUploaded = imageUrl && imageUrl?.length > 0;

  return (
    <div className="relative border-dashed border-2 border-gray-300 rounded-md p-4 flex justify-center items-center">
      <input
        type="file"
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
        onChange={(event) => {
          if (onChange) onChange(event);
        }}
        disabled={!!isImageUploaded}
      />
      <div className="flex flex-col items-center justify-center">
        {isImageUploaded ? (
          <>
            <img
              src={imageUrl}
              alt="Uploaded"
              className="max-w-full max-h-36"
            />
            <button
              type="button"
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={() => {
                if (onDelete) onDelete();
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-12 w-12 text-gray-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </div>
    </div>
  );
};

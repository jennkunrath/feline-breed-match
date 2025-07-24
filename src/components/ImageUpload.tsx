import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ImageUploadProps {
  onImageUpload: (file: File) => void;
  uploadedImage: File | null;
}

export const ImageUpload: React.FC<ImageUploadProps> = ({
  onImageUpload,
  uploadedImage,
}) => {
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      onImageUpload(file);
      
      // Create preview URL
      const reader = new FileReader();
      reader.onload = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, [onImageUpload]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.png', '.jpg', '.jpeg', '.gif', '.webp']
    },
    multiple: false,
    maxSize: 10 * 1024 * 1024, // 10MB
  });

  const removeImage = () => {
    setImagePreview(null);
    onImageUpload(null as any);
  };

  return (
    <div className="space-y-4">
      {!imagePreview ? (
        <Card
          {...getRootProps()}
          className={cn(
            "border-2 border-dashed transition-all duration-300 cursor-pointer hover:shadow-warm",
            isDragActive 
              ? "border-primary bg-primary/5 shadow-warm" 
              : "border-border hover:border-primary/50"
          )}
        >
          <input {...getInputProps()} />
          <div className="p-12 text-center">
            <div className="mx-auto w-16 h-16 bg-gradient-warm rounded-full flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-white" />
            </div>
            <h3 className="text-lg font-semibold mb-2">
              {isDragActive ? "Drop your cat photo here" : "Upload a cat photo"}
            </h3>
            <p className="text-muted-foreground mb-4">
              Drag and drop an image, or click to browse
            </p>
            <p className="text-sm text-muted-foreground">
              Supports PNG, JPG, JPEG, GIF, WebP (max 10MB)
            </p>
          </div>
        </Card>
      ) : (
        <Card className="relative overflow-hidden shadow-soft">
          <div className="relative">
            <img
              src={imagePreview}
              alt="Uploaded cat"
              className="w-full h-64 object-cover"
            />
            <Button
              onClick={removeImage}
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2"
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="p-4 bg-gradient-card">
            <div className="flex items-center space-x-2 text-sm text-muted-foreground">
              <ImageIcon className="h-4 w-4" />
              <span>Image uploaded successfully</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
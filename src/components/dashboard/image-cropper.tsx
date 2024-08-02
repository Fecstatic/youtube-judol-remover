'use client';

import 'react-image-crop/dist/ReactCrop.css';

import { CropIcon, Trash2Icon } from 'lucide-react';
import { useTranslations } from 'next-intl';
import React, { type SyntheticEvent } from 'react';
import ReactCrop, {
  centerCrop,
  type Crop,
  makeAspectCrop,
  type PixelCrop,
} from 'react-image-crop';

import type { FileWithPreview } from '@/components/account/change-avatar-form';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogTrigger,
} from '@/components/ui/dialog';

interface ImageCropperProps {
  dialogOpen: boolean;
  setDialogOpen: React.Dispatch<React.SetStateAction<boolean>>;
  selectedFile: FileWithPreview | null;
  setSelectedFile: React.Dispatch<React.SetStateAction<any>>;
}

// Helper function to center the crop
export function centerAspectCrop(
  mediaWidth: number,
  mediaHeight: number,
  aspect: number,
): Crop {
  return centerCrop(
    makeAspectCrop(
      {
        unit: '%',
        width: 50,
        height: 50,
      },
      aspect,
      mediaWidth,
      mediaHeight,
    ),
    mediaWidth,
    mediaHeight,
  );
}

export function ImageCropper({
  dialogOpen,
  setDialogOpen,
  selectedFile,
  setSelectedFile,
}: ImageCropperProps) {
  const aspect = 1;

  const imgRef = React.useRef<HTMLImageElement | null>(null);

  const [crop, setCrop] = React.useState<Crop>();
  const [croppedImageUrl, setCroppedImageUrl] = React.useState<string>('');
  const [croppedImage, setCroppedImage] = React.useState<string>('');

  const t = useTranslations('Avatar');

  function onImageLoad(e: SyntheticEvent<HTMLImageElement>) {
    if (aspect) {
      const { width, height } = e.currentTarget;
      setCrop(centerAspectCrop(width, height, aspect));
    }
  }

  function getCroppedImg(image: HTMLImageElement, croping: PixelCrop): string {
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    canvas.width = croping.width * scaleX;
    canvas.height = croping.height * scaleY;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(
        image,
        croping.x * scaleX,
        croping.y * scaleY,
        croping.width * scaleX,
        croping.height * scaleY,
        0,
        0,
        croping.width * scaleX,
        croping.height * scaleY,
      );
    }

    return canvas.toDataURL('image/png', 1.0);
  }

  function onCropComplete(croping: PixelCrop) {
    if (imgRef.current && croping.width && croping.height) {
      const croppedImageLink = getCroppedImg(imgRef.current, croping);
      setCroppedImageUrl(croppedImageLink);
    }
  }

  function dataURLtoFile(dataurl: string) {
    const arr = dataurl.split(',');
    // @ts-ignore
    const mime = arr[0].match(/:(.*?);/)[1];
    // @ts-ignore
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    // eslint-disable-next-line no-plusplus
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }

    // Generate a default filename
    const defaultFileName = `cropped_image_${Date.now()}.png`;

    const file = new File([u8arr], defaultFileName, { type: mime });
    const fileWithPreview = Object.assign(file, {
      preview: URL.createObjectURL(file),
    });
    return fileWithPreview;
  }

  async function onCrop() {
    if (croppedImageUrl) {
      setCroppedImage(croppedImageUrl);
      setDialogOpen(false);
      const croppedImageFile = dataURLtoFile(croppedImageUrl);
      setSelectedFile(croppedImageFile);
    }
  }

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
      <DialogTrigger>
        <Avatar className="size-36 cursor-pointer ring-2 ring-slate-200 ring-offset-2">
          <AvatarImage
            src={croppedImage || selectedFile?.preview}
            alt="Fecstatic"
          />
          <AvatarFallback>{t('error')}</AvatarFallback>
        </Avatar>
      </DialogTrigger>
      <DialogContent className="gap-0 p-0">
        <div className="size-full p-6">
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(c) => onCropComplete(c)}
            aspect={aspect}
            className="w-full"
          >
            <Avatar className="size-full rounded-none">
              <AvatarImage
                ref={imgRef}
                className="aspect-auto size-full rounded-none"
                alt="Image Cropper Shell"
                src={selectedFile?.preview}
                onLoad={(e) => onImageLoad(e)}
              />
              <AvatarFallback className="size-full min-h-[460px] rounded-none">
                {t('loading')}
              </AvatarFallback>
            </Avatar>
          </ReactCrop>
        </div>
        <DialogFooter className="flex justify-between p-6 pt-0 ">
          <DialogClose asChild>
            <Button
              size="sm"
              type="reset"
              className="w-full"
              variant="outline"
              onClick={() => {
                setSelectedFile(null);
              }}
            >
              <Trash2Icon className="mr-1.5 size-4" />
              {t('cancel')}
            </Button>
          </DialogClose>
          <Button
            type="submit"
            size="sm"
            className="w-full"
            onClick={() => onCrop()}
          >
            <CropIcon className="mr-1.5 size-4" />
            {t('crop')}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

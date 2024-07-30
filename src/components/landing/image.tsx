'use client';

import { useInView } from 'framer-motion';
import { PlayCircle } from 'lucide-react';
import Image from 'next/image';
import { useRef } from 'react';

import { BorderBeam } from '@/components/ui/border-beam';
import { Button } from '@/components/ui/button';
import {
  VideoModal,
  VideoModalContent,
  VideoModalDescription,
  VideoModalTitle,
  VideoModalTrigger,
  VideoModalVideo,
  VideoPlayButton,
  VideoPlayer,
  VideoPreview,
} from '@/components/ui/video-modal';

export default function ImageShowcase() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <VideoModal>
      <VideoModalTrigger>
        <div
          ref={ref}
          className="relative mt-14 animate-fade-up opacity-0 [--animation-delay:400ms] [perspective:2000px] after:absolute after:inset-0 after:z-50 after:[background:linear-gradient(to_top,hsl(var(--background))_20%,transparent)]"
        >
          <div
            className={`rounded-xl border border-white/10 bg-white bg-opacity-[0.01] before:absolute before:bottom-1/2 before:left-0 before:top-0 before:size-full before:opacity-0 before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)] before:[filter:blur(180px)] ${
              inView ? 'before:animate-image-glow' : ''
            }`}
          >
            <BorderBeam size={250} duration={12} delay={11} />
            <Image
              src="/dashboard-dark.png"
              alt="Hero Image"
              height={1000}
              width={1000}
              className="relative hidden size-full rounded-[inherit] border object-contain dark:block"
            />
            <Image
              src="/dashboard-light.png"
              alt="Hero Image"
              height={1000}
              width={1000}
              className="relative block size-full rounded-[inherit] border object-contain dark:hidden"
            />
          </div>
        </div>
      </VideoModalTrigger>
      <VideoModalContent>
        <VideoModalTitle>Modal Video Demo</VideoModalTitle>
        <VideoModalDescription>
          Your subtitle or description here
        </VideoModalDescription>
        <VideoModalVideo>
          <VideoPlayer>
            <VideoPreview>
              <Image
                src="/video.png"
                height={1600}
                width={1200}
                alt="Video preview"
              />
            </VideoPreview>
            <VideoPlayButton>
              <Button className="absolute inset-0 m-auto flex size-32 items-center justify-center rounded-full border border-white bg-white/50 transition duration-300 hover:bg-white/75 dark:border-white/10">
                <PlayCircle className="size-20 stroke-1 text-white" />
              </Button>
            </VideoPlayButton>
            <iframe
              title="Video"
              className="size-full"
              src="https://cdn.magicui.design/globe.mp4"
              allow="accelerometer; gyroscope; autoplay; encrypted-media; picture-in-picture;"
              allowFullScreen
            />
          </VideoPlayer>
        </VideoModalVideo>
      </VideoModalContent>
    </VideoModal>
  );
}

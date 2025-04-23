import Image from 'next/image';

import { Card, CardContent } from '@/components/ui/card';

interface Channel {
  id: string;
  snippet: {
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
      };
    };
  };
}

export function ProfileCard({ channels }: { channels: Channel[] }) {
  return (
    <Card className="w-full">
      <CardContent>
        {channels.map((channel) => (
          <div key={channel.id} className="flex gap-4">
            <Image
              src={channel.snippet.thumbnails.default.url}
              alt={channel.snippet.title}
              height={50}
              width={50}
            />
            <div>
              <h3 className="font-medium">{channel.snippet.title}</h3>
              <p className="line-clamp-2 text-sm">
                {channel.snippet.description}
              </p>
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}

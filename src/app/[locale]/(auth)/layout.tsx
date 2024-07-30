import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { extractRouterConfig } from 'uploadthing/server';

import { ourFileRouter } from '@/app/api/uploadthing/core';
import Layout from '@/components/dashboard/admin-panel-layout';

export default function PanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout>
      <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
      {children}
    </Layout>
  );
}

'use client';

import { usePathname } from 'next/navigation';
import { Provider } from 'react-redux';

import { Navbar } from '@/components/dashboard/navbar';
import { Sidebar } from '@/components/dashboard/sidebar';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { useSidebarToggle } from '@/hooks/UseSidebarToggle';
import { useStore } from '@/hooks/UseStore';
import store from '@/redux/store';
import { cn } from '@/utils/Helpers';

export default function AdminPanelLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const breadcrumb = pathname.replaceAll('/id', '').split('/').slice(1);
  const sidebar = useStore(useSidebarToggle, (state) => state);

  if (!sidebar) return null;

  return (
    <Provider store={store}>
      <Sidebar />
      <main
        className={cn(
          'min-h-[calc(100vh_-_56px)] bg-zinc-50 transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900',
          sidebar?.isOpen === false ? 'lg:ml-[70px]' : 'lg:ml-72',
        )}
      >
        <div>
          <Navbar />
          <div className="p-4">
            <Breadcrumb className="mb-4">
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink href="/">Home</BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumb.map((item, index) => (
                  <>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                      {index === breadcrumb.length - 1 ? (
                        <BreadcrumbPage className="capitalize">
                          {item}
                        </BreadcrumbPage>
                      ) : (
                        <BreadcrumbLink
                          href={`/${item}`}
                          className="capitalize"
                        >
                          {item}
                        </BreadcrumbLink>
                      )}
                    </BreadcrumbItem>
                  </>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
            {children}
          </div>
        </div>
      </main>
    </Provider>
  );
}

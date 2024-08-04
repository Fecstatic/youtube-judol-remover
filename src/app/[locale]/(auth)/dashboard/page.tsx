/* eslint-disable react/button-has-type */

'use client';

import Cookies from 'js-cookie';

import { sendNotification } from '@/actions/Notification';
import { Button } from '@/components/ui/button';
import {
  ResponsiveDialog,
  ResponsiveDialogBody,
  ResponsiveDialogClose,
  ResponsiveDialogContent,
  ResponsiveDialogDescription,
  ResponsiveDialogFooter,
  ResponsiveDialogHeader,
  ResponsiveDialogTitle,
  ResponsiveDialogTrigger,
} from '@/components/ui/responsive-dialog';

const DashboardIndexPage = () => {
  const id = Cookies.get('next-auth.session-token');
  const Notification = async () => {
    await sendNotification(
      'Your message here',
      // @ts-ignore
      id,
      'https://boilerplate.fecstatic.site/favicon-32x32.png',
      'App name',
    );
  };

  return (
    <div>
      <ResponsiveDialog>
        <ResponsiveDialogTrigger asChild>
          <button>Open modal</button>
        </ResponsiveDialogTrigger>
        <ResponsiveDialogContent>
          <ResponsiveDialogHeader>
            <ResponsiveDialogTitle>ResponsiveDialog</ResponsiveDialogTitle>
            <ResponsiveDialogDescription>
              A responsive modal component for shadcn/ui.
            </ResponsiveDialogDescription>
          </ResponsiveDialogHeader>
          <ResponsiveDialogBody>
            <Button onClick={() => Notification()}>Send Notification</Button>
          </ResponsiveDialogBody>
          <ResponsiveDialogFooter>
            <ResponsiveDialogClose asChild>
              <button>Close</button>
            </ResponsiveDialogClose>
          </ResponsiveDialogFooter>
        </ResponsiveDialogContent>
      </ResponsiveDialog>
    </div>
  );
};

export default DashboardIndexPage;

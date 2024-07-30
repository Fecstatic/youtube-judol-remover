/* eslint-disable react/button-has-type */
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
            This component is built using shadcn/ui&apos;s dialog and drawer
            component, which is built on top of Vaul.
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

'use client';

import { Device } from '@prisma/client';
import { useQueryClient } from '@tanstack/react-query';
import Cookies from 'js-cookie';
import { BellOff, BellRing } from 'lucide-react';
import React, { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
  addNotification,
  deleteNotification,
  getNotifications,
} from '@/actions/Notification';
import { Button } from '@/components/ui/button';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@/components/ui/tooltip';
import { useMediaQuery } from '@/hooks/UseMediaQuery';
import { urlB64ToUint8Array } from '@/utils/Helpers';

interface NotificationProps {
  id: string;
  userId: string;
  email: string;
  device: Device;
  notification: string | null;
}

export default function NotificationRequest() {
  const id = Cookies.get('next-auth.session-id');
  const email = Cookies.get('next-auth.session-email');
  const queryClient = useQueryClient();
  const isMobile = useMediaQuery(`(max-width: 768px)`);
  const device = isMobile ? Device.MOBILE : Device.DESKTOP;
  const [notification, setNotification] = useState<NotificationProps>();

  const [notificationPermission, setNotificationPermission] = useState<
    'granted' | 'denied' | 'default'
  >('granted');

  const getNotification = async () => {
    // @ts-ignore
    const data = await getNotifications(id);
    // @ts-ignore
    return setNotification(data);
  };

  const generateSubscribeEndPoint = async (
    newRegistration: ServiceWorkerRegistration,
  ) => {
    const applicationServerKey = urlB64ToUint8Array(
      process.env.NEXT_PUBLIC_VAPID_KEY!,
    );
    const options = {
      applicationServerKey,
      userVisibleOnly: true,
    };
    const subscription = await newRegistration.pushManager.subscribe(options);

    const { succes, error } = await addNotification(
      // @ts-ignore
      id,
      email,
      device,
      JSON.stringify(subscription),
    );

    if (error) {
      toast.error(error);
    } else {
      toast.success(succes);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  };

  const removeNotification = async () => {
    setNotificationPermission('denied');
    // @ts-ignore
    const { succes, error } = await deleteNotification(id, device);

    if (error) {
      toast.error(error);
    } else {
      toast.success(succes);
      queryClient.invalidateQueries({ queryKey: ['user'] });
    }
  };

  async function subscribeUser() {
    if ('serviceWorker' in navigator) {
      try {
        const registration = await navigator.serviceWorker.getRegistration();
        if (registration) {
          generateSubscribeEndPoint(registration);
        } else {
          const newRegistration =
            await navigator.serviceWorker.register('/sw.js');
          generateSubscribeEndPoint(newRegistration);
        }
      } catch (error) {
        toast.error(
          'Error during service worker registration or subscription:',
        );
      }
    } else {
      toast.error('Service workers are not supported in this browser');
    }
  }

  const showNotification = () => {
    if ('Notification' in window) {
      Notification.requestPermission().then((permission) => {
        setNotificationPermission(permission);
        if (permission === 'granted' && notification) {
          subscribeUser();
        } else {
          toast.info('please go to setting and enable noitification.');
        }
      });
    } else {
      toast.info('This browser does not support notifications.');
    }
  };

  useEffect(() => {
    getNotification();
    setNotificationPermission(Notification.permission);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <TooltipProvider disableHoverableContent>
      <Tooltip delayDuration={100}>
        <TooltipTrigger asChild>
          <Button
            className="size-8 rounded-full bg-background"
            variant="outline"
            size="icon"
            onClick={() =>
              notificationPermission === 'granted'
                ? removeNotification()
                : showNotification()
            }
          >
            {notificationPermission === 'granted' ? (
              <BellRing className="size-5" />
            ) : (
              <BellOff className="size-5" />
            )}
          </Button>
        </TooltipTrigger>
        <TooltipContent side="bottom">Notification</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}

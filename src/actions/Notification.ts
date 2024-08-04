'use server';

import type { Device } from '@prisma/client';
import webpush from 'web-push';

import { db } from '@/libs/Db';

export const sendNotification = async (
  message: string,
  user_id: string,
  icon: string,
  name: string,
) => {
  const vapidKeys = {
    publicKey: process.env.NEXT_PUBLIC_VAPID_KEY!,
    privateKey: process.env.VAPID_PRIVATE_KEY!,
  };
  // setting our previously generated VAPID keys
  webpush.setVapidDetails(
    'mailto:myuserid@email.com',
    vapidKeys.publicKey,
    vapidKeys.privateKey,
  );

  const data = await db.notification.findMany({
    where: { userId: user_id },
  });

  if (!data) {
    return JSON.stringify({ error: "Notification doesn't exist" });
  }
  if (data) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-shadow
      data.forEach(async (data) => {
        await webpush.sendNotification(
          // @ts-ignore
          JSON.parse(data.notification),
          JSON.stringify({
            message: name,
            icon,
            body: message,
          }),
        );
      });
      // data.map(async (data) => {
      //   await webpush.sendNotification(
      //     // @ts-ignore
      //     JSON.parse(data.notification),
      //     JSON.stringify({
      //       message: name,
      //       icon,
      //       body: message,
      //     }),
      //   );
      // });
      // await webpush.sendNotification(
      //   // @ts-ignore
      //   JSON.parse(data.notification),
      //   JSON.stringify({
      //     message: name,
      //     icon,
      //     body: message,
      //   }),
      // );
      return '{}';
    } catch (e) {
      return JSON.stringify({ error: 'failed to send notification' });
    }
  }
  return '{}';
};

export const addNotification = async (
  userId: string,
  email: string,
  device: Device,
  notification: string,
) => {
  try {
    const data = await db.notification.findFirst({
      where: { userId, device },
    });
    if (data) {
      await db.notification.update({
        where: { id: data.id },
        data: {
          notification,
        },
      });
      return { succes: 'Notification updated' };
    }
    await db.notification.create({
      data: {
        userId,
        email,
        device,
        notification,
      },
    });
    return { succes: 'Notification created' };
  } catch {
    return { error: 'Failed to send notification' };
  }
};

export const deleteNotification = async (userId: string, device: Device) => {
  try {
    const data = await db.notification.findFirst({
      where: { userId, device },
    });
    if (!data) {
      return { error: "Notification doesn't exist" };
    }
    await db.notification.delete({
      where: { id: data.id },
    });
    return { succes: 'Notification deleted' };
  } catch {
    return { error: 'Failed to send notification' };
  }
};

export const getNotifications = async (userId: string) => {
  try {
    const data = await db.notification.findMany({
      where: { userId },
    });
    return data;
  } catch {
    return [];
  }
};

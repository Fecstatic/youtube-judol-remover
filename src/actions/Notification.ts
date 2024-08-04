'use server';

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

  const data = await db.notification.findFirst({
    where: { userId: user_id },
  });

  if (!data) {
    return JSON.stringify({ error: "Notification doesn't exist" });
  }
  if (data) {
    try {
      await webpush.sendNotification(
        // @ts-ignore
        JSON.parse(data.notification),
        JSON.stringify({
          message: name,
          icon,
          body: message,
        }),
      );
      return '{}';
    } catch (e) {
      return JSON.stringify({ error: 'failed to send notification' });
    }
  }
  return '{}';
};

export const addNotification = async (userId: string, notification: string) => {
  try {
    const data = await db.notification.findFirst({
      where: { userId },
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
        notification,
      },
    });
    return { succes: 'Notification created' };
  } catch {
    return { error: 'Failed to send notification' };
  }
};

export const deleteNotification = async (userId: string) => {
  try {
    const data = await db.notification.findFirst({
      where: { userId },
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

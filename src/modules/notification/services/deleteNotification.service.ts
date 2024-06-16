import { notificationProps } from "../domain/notificationProps.interface";
import Notification from "../model/notification.model";



export const deleteNotificationService = async (notificationData: notificationProps) => {

      // Utiliza el método deleteOne para eliminar la notificación según ciertos criterios
      console.log(notificationData.notify_by, notificationData.notify_to, notificationData.post, notificationData.type)
      const result = await Notification.deleteOne({
        notify_by: notificationData.notify_by,
        notify_to: notificationData.notify_to,
        post: notificationData.post,
        type: notificationData.type
      });
  
      if (result.deletedCount === 1) {
        // Si se eliminó una notificación, devuelve un mensaje de éxito
        return { success: true, message: 'Notificación eliminada exitosamente' };
      } else {
        // Si no se encontró ninguna notificación para eliminar, devuelve un mensaje de que no se encontró
        return { success: false, message: 'No se encontró ninguna notificación para eliminar' };
      }

  };
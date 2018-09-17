import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATIONS_KEY = 'UdacityFlashCards:notifications'

function createNotification () {
  return {
    title: 'Study Today!',
    body: 'Don´t forget to study today!',
    ios: {
      sound: true
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true
    }
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATIONS_KEY).then(JSON.parse).then(result => {
    if (result === null) {
      Permissions.askAsync(Permissions.NOTIFICATIONS).then(({ status }) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync()
          let nextDay = new Date()
          nextDay.setDate(nextDay.getDate() + 1)
          nextDay.setHours(14)
          nextDay.setMinutes(0)

          Notifications.scheduleLocalNotificationAsync(createNotification(), {
            time: nextDay,
            repeat: 'day'
          })
          AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
        } else {
          console.log('You don´t have permission')
        }
      })
    }
  })
}

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY).then(
    Notifications.cancelScheduledNotificationAsync
  )
}

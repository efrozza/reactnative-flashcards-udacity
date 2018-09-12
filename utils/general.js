import React from 'react'
import { AsyncStorage } from 'react-native'
import { Notifications, Permissions } from 'expo'

const NOTIFICATIONS_KEY = 'UdacityFlashCards: notifications'

function insertNotification () {
  return {
    text: 'Study Today!',
    body: 'Don´t forget to study today!'
  }
}

export function setLocalNotification () {
  AsyncStorage.getItem(NOTIFICATIONS_KEY).then(JSON.parse).then(result => {
    if (result === null) {
      Permissions.askAsync(Permissions.Notifications).then(({ status }) => {
        if (status === 'granted') {
          Notifications.cancelAllScheduledNotificationsAsync()
          let nextDay = new Date()
          nextDay.setDate(nextDay.getDate() + 1)
          nextDay.setHours(13)
          nextDay.SetMinutes(34)

          Notifications.scheduleLocalNotificationAsync(insertNotification(), {
            time: nextDay,
            repeat: 'day'
          })
          AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true))
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

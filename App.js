/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
  View,Text
} from 'react-native';
// import {AsyncStorage, Alert, Platform} from 'react-native';
// import firebase from 'react-native-firebase';
// import {Actions} from 'react-native-router-flux';

 import Routes from './Routes'

export default class App extends React.Component {
  async componentDidMount() {
    this.checkPermission();
    // this.createNotificationListeners();
  }
  componentWillUnmount() {
    // this.notificationListener();
    // this.notificationOpenedListener();
  }
  async createNotificationListeners() {
    const channel = new firebase.notifications.Android.Channel(
      'test-channel',
      'Test Channel',
      firebase.notifications.Android.Importance.Max,
    ).setDescription('My apps test channel');

    // Create the channel
    firebase.notifications().android.createChannel(channel);

    this.notificationListener = firebase
      .notifications()
      .onNotification(async notification => {
        const {title, body, data} = notification;

        // this.showAlert(title, body);
        if (Platform.OS === 'android') {
          const localNotification = new firebase.notifications.Notification({
            sound: 'default',
            show_in_foreground: true,
          })
            .setNotificationId(notification.notificationId)
            .setTitle(notification.title)
            .setBody(notification.body)
            .setData(notification.data)
            .android.setChannelId('test-channel') // e.g. the id you chose above
            //.android.setSmallIcon('ic_launcher') // create this icon in Android Studio
            .android.setColor('#000000') // you can set a color here
            .android.setPriority(firebase.notifications.Android.Priority.High);

          firebase
            .notifications()
            .displayNotification(localNotification)
            .catch(err => console.error(err));
        }
        console.log('hoeforegorund');
        // await this.updateLocalData(data)
      });

    /*
     * If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
     * */
    this.notificationOpenedListener = firebase
      .notifications()
      .onNotificationOpened(notificationOpen => {
        const {title, body, data} = notificationOpen.notification;

        console.log('bg', data);

        /*
             if(notif == null){
               AsyncStorage.setItem('notification', JSON.stringify(data));
             }else{
               
               AsyncStorage.setItem('notification', JSON.stringify(newnotif));
 
             }*/

        Actions.notificationDetail({
          dataNotification: JSON.parse(data.message),
        });
        console.log('onNotificationOpened');
      });

    /*
     * If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
     * */
    const notificationOpen = await firebase
      .notifications()
      .getInitialNotification()
      .catch();
    if (notificationOpen) {
      const {title, body, data} = notificationOpen.notification;
      console.log('closed', data);

      Actions.notificationDetail({dataNotification: JSON.parse(data.message)});

      //Actions.tripDetail({tripId: tripId});
      console.log(notificationOpen.notification);

      // Actions.announcement()
    }
    /*
     * Triggered for data only payload in foreground and background (content_available: true , fcm-node)
     * */
    this.messageListener = firebase.messaging().onMessage(async message => {
      console.log('donlu', message);
      await this.updateLocalData(message._data);
    });
  }
  async updateLocalData(data) {
    // let dataNotification = await AsyncStorage.getItem('notification');
    // if (dataNotification === null || dataNotification === undefined) {
    //   let newnotif = [];
    //   let datam = JSON.parse(data.message);
    //   newnotif.push(datam);
    //   console.log(JSON.stringify(newnotif));
    //   await AsyncStorage.setItem('notification', JSON.stringify(newnotif));
    // } else {
    //   let newnotif = JSON.parse(dataNotification);
    //   console.log(newnotif);
    //   let datam = JSON.parse(data.message);
    //   newnotif.push(datam);

    //   console.log('isi', JSON.stringify(newnotif));
    //   await AsyncStorage.setItem('notification', JSON.stringify(newnotif));
    // }
  }
  async checkPermission() {
    // const enabled = await firebase.messaging().hasPermission().catch();
    // if (enabled) {
    //   // this.getToken();
    // } else {
    //   // this.requestPermission();
    // }
  }
  async requestPermission() {
    // try {
    //   await firebase.messaging().requestPermission();
    //   // User has authorised
    //   this.getToken();
    // } catch (error) {
    //   // User has rejected permissions
    //   console.log('permission rejected');
    // }
  }
  async getToken() {
    // try {
    //   let fcmToken = await AsyncStorage.getItem('fcmToken');

    //   //AsyncStorage.getItem('token', (error, result) => {
    //   if (fcmToken === undefined || fcmToken === null) {
    //     fcmToken = await firebase.messaging().getToken();
    //     console.log(fcmToken);
    //     if (fcmToken) {
    //       // user has a device token
    //       await AsyncStorage.setItem('fcmToken', fcmToken);
    //     }
    //   }
    // } catch (error) {
    //   console.log(error);
    // }
  }
  render() {
    return <View>
      <Text>
        RUN
      </Text>
    </View>;
  }
}

import React from 'react';
import {
  Router,
  Scene,
  Stack,
  Lightbox,
  Drawer,
  Tabs,
} from 'react-native-router-flux';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import thunk from 'redux-thunk';
import reducers from './src/reducers';

import {View, Text} from 'react-native';

// import Login from './src/components/Login'
// import Register from './src/components/Register'
// import ReportUser from './src/components/ReportUser'

// import HomeUser from './src/components/HomeUser'
// import HomeAdmin from './src/components/HomeAdmin'
import FirstLoad from './src/components/FirstLoad'
// import ProgressReport from './src/components/ProgressReport'
// import DetailReportUser from './src/components/DetailReportUser'
// import DetailReportAdmin from './src/components/DetailReportAdmin'
// import NotificationList from './src/components/NotificationList'
// import NotificationDetail from './src/components/NotificationDetail'

// import Faq from './src/components/Faq'
// import Information from './src/components/Information'
// import Contact from './src/components/Contact'

// import ShareApp from './src/components/ShareApp'

// import DrawerMenu from './src/components/DrawerMenu'

const store = createStore(reducers, applyMiddleware(thunk));

export default class Routes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      hasToken: false,
    };
  }
  async componentDidMount() {
    let token = await AsyncStorage.getItem('fcmToken');
    if (token !== null || token === '') {
      this.setState({hasToken: true});
    } else {
      this.setState({hasToken: false});
    }
  }
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Scene>
             <Scene key="firstLoad" component={FirstLoad} hideNavBar initial = {true}/>
          </Scene>
        </Router>
      </Provider>
      //   <View>
      //   <Text>
      //     aksjdhaskdh
      //   </Text>
      // </View>
      // ==============
      // <Provider store={store}>
      // <Router >
      //      <Scene>
      //         <Scene key="firstLoad" component={FirstLoad} hideNavBar initial = {true}/>
      //         <Scene
      //             key="login"
      //             component={Login}
      //             type="reset"
      //             //initial = {true}
      //             hideNavBar
      //         />
      //         <Drawer
      //             hideNavBar
      //             key="drawerMenu"
      //             contentComponent={DrawerMenu}
      //             drawerWidth={250}
      //             drawerPosition="left"
      //             //nitial = {true}

      //             style={{backgroundColor:"#1E1E1E"}}
      //         >
      //             <Scene key="homeUser" component={HomeUser} hideNavBar/>
      //             <Scene key = "faq" component={Faq}  hideNavBar/>
      //             <Scene key = "contact" component={Contact}  hideNavBar/>
      //             <Scene key = "information" component={Information}  hideNavBar/>

      //         </Drawer>
      //         <Drawer
      //             hideNavBar
      //             key="drawerMenuAdmin"
      //             contentComponent={DrawerMenu}
      //             drawerWidth={250}
      //             drawerPosition="left"
      //             style={{backgroundColor:"#1E1E1E"}}
      //         >
      //           <Scene key="homeAdmin" component={HomeAdmin} hideNavBar/>
      //           <Scene key = "faq" component={Faq}  hideNavBar/>
      //           <Scene key = "contact" component={Contact}  hideNavBar/>
      //           <Scene key = "information" component={Information}  hideNavBar/>

      //         </Drawer>
      //         <Scene key = "reportUser" component={ReportUser}  hideNavBar/>
      //         <Scene key = "progressReport" component={ProgressReport}  hideNavBar/>
      //         <Scene key = "detailReportUser" component={DetailReportUser}  hideNavBar/>
      //         <Scene key = "detailReportAdmin" component={DetailReportAdmin}  hideNavBar/>
      //         <Scene key = "notificationList" component={NotificationList}  hideNavBar/>
      //         <Scene key = "notificationDetail" component={NotificationDetail}  hideNavBar/>
      //         <Scene key = "shareApp" component={ShareApp}  hideNavBar/>
      //         <Scene key = "register" component={Register}  hideNavBar/>

      //     </Scene>
      // </Router>
      // </Provider>
    );
  }
}

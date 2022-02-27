import React, {Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  ActivityIndicator,
  View,
} from 'react-native';

import {Actions} from 'react-native-router-flux';

import {connect} from 'react-redux';

import {saveFcmToken} from '../actions/PagesAction';

/* Styles ==================================================================== */
const MENU_BG_COLOR = '#1E1E1E';

/* Component ==================================================================== */
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidUpdate(prevProps) {}
  async componentDidMount() {
    //AsyncStorage.removeItem('notification')
    AsyncStorage.getItem('token', (error, result) => {
      //alert(result)
      if (result !== null) {
        AsyncStorage.getItem('role', (error, resultRole) => {
          //alert(resultRole)
          if (resultRole == 'admin') {
            // Actions.drawerMenuAdmin({type: 'reset'});
          } else {
            // Actions.drawerMenu({type: 'reset'});
          }
        });
      } else {
        // Actions.login();

        /* AsyncStorage.getItem('fcmToken', (error, result) => {
              //this.props.saveFcmToken(result)
              Actions.login({fcmToken:result})
            })*/
      }
    });
  }

  render() {
    return (
      <View style={[styles.container, styles.horizontal]}>
        <ActivityIndicator size="large" color="#DB1500" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    color: MENU_BG_COLOR
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-around",
    padding: 10
  }
});

const mapStateToProps = ({auth, user, agent}) => {
  return {};
};

mapDispatchToProps = dispatch => {
  return {
    saveFcmToken: token => dispatch(saveFcmToken(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

import React, {Component} from 'react';

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {GoogleSignin} from 'react-native-google-signin';
import {Actions} from 'react-native-router-flux';
import messaging from '@react-native-firebase/messaging';
import {connect} from 'react-redux';
import {Thumbnail, Icon} from 'native-base';

/* Styles ==================================================================== */
const MENU_BG_COLOR = '#1E1E1E';

/* Component ==================================================================== */
class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      token: '',
      agentId: '',
      adminId: '',
      refreshToken: '',
      name: null,
      avatar: null,
      superadmin: '',
      imageDate: new Date(),
      fcmToken: '',
    };
    this.doLogout = this.doLogout.bind(this);
  }
  componentDidUpdate(prevProps) {}
  async componentDidMount() {
    this._isMounted = true;

    AsyncStorage.getItem('name', (error, result) => {
      if (this._isMounted) {
        this.setState({
          name: result || 'User',
        });
      }
    });
    AsyncStorage.getItem('fcmToken', (error, result) => {
      if (this._isMounted) {
        this.setState({
          fcmToken: result,
        });
      }
    });
  }

  doLogout() {
    var current_access_token = '';
    /*AccessToken.getCurrentAccessToken().then((data) => {
      current_access_token = data.accessToken.toString();
    }).then(() => {
      let logout =
      new GraphRequest(
        "me/permissions/",
        {
            accessToken: current_access_token,
            httpMethod: 'DELETE'
        },
        (error, result) => {
            if (error) {
                console.log('Error fetching data: ' + error.toString());
            } else {
                LoginManager.logOut();
            }
        });
      new GraphRequestManager().addRequest(logout).start();
    })
    .catch(error => {
      console.log(error)
    });  */

    AsyncStorage.removeItem('token');
    messaging().unsubscribeFromTopic('admin');
    this.signOut();
    Actions.login({fcmToken: this.state.fcmToken});
  }
  componentWillUnmount() {
    this._isMounted = false;
  }
  signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      //this.setState({ user: null }); // Remember to remove the user from your app's state as well
    } catch (error) {
      console.error(error);
    }
  };

  render() {
    return (
      <View style={{backgroundColor: '#1E1E1E'}}>
        <ScrollView>
          <View style={[styles.profile, {paddingBottom: 40}]}>
            {this.state.avatar ? (
              <Thumbnail
                large
                source={{uri: `${url(avatarAgent)}?${this.state.imageDate}`}}
                style={styles.iconProfile}
              />
            ) : (
              <Icon
                type="FontAwesome"
                name="user-circle"
                style={[{color: '#DB1500', fontSize: 70}, styles.iconProfile]}
              />
            )}

            <Text style={[styles.emailProfile, {textAlign: 'center'}]}>
              {this.state.name}
            </Text>
          </View>
          <View style={{backgroundColor: '#232323'}}>
            {/*<View style={{borderBottomWidth:2, borderBottomColor:'#1E1E1E', paddingBottom:10 }}>
             <TouchableOpacity  style={{height:45}} >
                <View style={styles.linkMenuUser}>
                  <View style={{width:50}}>
                    <Icon type="FontAwesome" name="bell" style={{color: '#fff'}} /> 
                  </View>
                  <View style={{width:100}}>
                    <Text style={styles.emailProfile}>Notifikasi</Text>
                  </View>
                </View>
            </TouchableOpacity>
            </View>*/}
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#1E1E1E',
                paddingBottom: 10,
              }}>
              <TouchableOpacity
                style={{height: 45}}
                onPress={() => {
                  Actions.faq();
                }}>
                <View style={styles.linkMenuUser}>
                  <View style={{width: 50}}>
                    <Icon
                      type="FontAwesome"
                      name="book"
                      style={{color: '#fff'}}
                    />
                  </View>
                  <View style={{width: 100}}>
                    <Text style={styles.emailProfile}>FAQ</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#1E1E1E',
                paddingBottom: 10,
              }}>
              <TouchableOpacity
                style={{height: 45}}
                onPress={() => {
                  Actions.contact();
                }}>
                <View style={styles.linkMenuUser}>
                  <View style={{width: 50}}>
                    <Icon
                      type="FontAwesome"
                      name="address-book"
                      style={{color: '#fff'}}
                    />
                  </View>
                  <View style={{width: 100}}>
                    <Text style={styles.emailProfile}>Kontak</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View
              style={{
                borderBottomWidth: 2,
                borderBottomColor: '#1E1E1E',
                paddingBottom: 10,
              }}>
              <TouchableOpacity
                style={{height: 45}}
                onPress={() => {
                  this.doLogout();
                }}>
                <View style={styles.linkMenuUser}>
                  <View style={{width: 50}}>
                    <Icon
                      type="FontAwesome"
                      name="toggle-off"
                      style={{color: '#fff'}}
                    />
                  </View>
                  <View style={{width: 100}}>
                    <Text style={styles.emailProfile}>Logout</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </View>
    );
  }
}
const styles = StyleSheet.create({
  menuContainer: {
    flex: 5,
    flexDirection: 'column',
    backgroundColor: MENU_BG_COLOR,
    fontFamily: 'OpenSans',
  },
  profile: {
    alignSelf: 'center',
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 40,
    paddingBottom: 30,
    fontFamily: 'OpenSans',
  },
  menuUser: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#232323',
    width: '100%',
    height: 150,
  },
  menuUserSetting: {
    flex: 2,
    flexDirection: 'column',
    backgroundColor: '#232323',
    width: '100%',
    height: 150,
  },
  linkMenuUser: {
    flex: 2,
    flexDirection: 'row',
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: 15,
    alignSelf: 'center',
    backgroundColor: '#232323',
  },
  linkMenuUserAdmin: {
    flex: 2,
    flexDirection: 'row',
    left: 0,
    right: 0,
    bottom: 0,
    marginTop: 15,
    alignSelf: 'center',
    backgroundColor: '#232323',
  },
  iconProfile: {
    alignSelf: 'center',
    left: 0,
    right: 0,
    padding: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  nameProfile: {
    alignSelf: 'center',
    left: 0,
    right: 0,
    paddingTop: 20,
    color: 'white',
    fontSize: 18,
    fontFamily: 'OpenSans',
  },
  emailProfile: {
    textAlign: 'left',
    color: 'white',
    fontSize: 14,
    fontFamily: 'OpenSans',
  },
  menuItem: {
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
    paddingBottom: 10,
  },
  menuItem_text: {
    fontSize: 16,
    lineHeight: parseInt(16 + 16 * 0.5, 10),
    fontWeight: '500',
    marginTop: 14,
    marginBottom: 8,
    color: '#EEEFF0',
  },

  // Menu Bottom
  menuBottom: {
    flex: 1,
    left: 0,
    right: 0,
    justifyContent: 'flex-end',
    paddingBottom: 10,
  },
  menuBottom_text: {
    color: '#EEEFF0',
    fontFamily: 'OpenSans',
  },
});
const mapStateToProps = ({auth, user, agent}) => {
  return {};
};

mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Menu);

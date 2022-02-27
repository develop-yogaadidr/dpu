import React, {Component} from 'react';

import {
  StyleSheet,
  Image,
  PermissionsAndroid,
  DeviceEventEmitter,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import {
  Container,
  Content,
  Text,
  Left,
  Right,
  Button,
  Icon,
  View,
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import HeaderComp from '../commons/HeaderComp';
import {fonts} from '../styles/skeleton';
import gs from '../styles/styles';
import LocationServicesDialogBox from 'react-native-android-location-services-dialog-box';

class HomeUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      backCount: 0,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  async componentDidMount() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Permintaan akses lokasi',
          message: 'Aplikasi membutuhkan izin lokasi',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log('You can use the location');
      } else {
        console.log('location permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  goToReportUser() {
    LocationServicesDialogBox.checkLocationServicesIsEnabled({
      message:
        '<h2>Gunakan Lokasi ?</h2>Jalan cantik ingin mengganti pengaturan lokasi:<br/><br/>Hidupkan pengaturan lokasi anda untuk melanjutkan<br/><br/>',
      ok: 'Ya',
      cancel: 'Tidak',
      enableHighAccuracy: true, // true => GPS AND NETWORK PROVIDER, false => GPS OR NETWORK PROVIDER
      showDialog: true, // false => Opens the Location access page directly
      openLocationServices: true, // false => Directly catch method is called if location services are turned off
      preventOutSideTouch: false, //true => To prevent the location services popup from closing when it is clicked outside
      preventBackClick: false, //true => To prevent the location services popup from closing when it is clicked back button
      providerListener: true, // true ==> Trigger "locationProviderStatusChange" listener when the location state changes
    })
      .then(function (success) {
        //console.log(success)
        if (success.enabled === true) {
          Actions.reportUser();
        }
      })
      .catch(error => {
        console.log(error.message);
      });

    DeviceEventEmitter.addListener(
      'locationProviderStatusChange',
      function (status) {
        // only trigger when "providerListener" is enabled
        console.log(status); //  status => {enabled: false, status: "disabled"} or {enabled: true, status: "enabled"}
        if (status.enabled === true) {
          Actions.reportUser();
        }
      },
    );
  }
  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
    LocationServicesDialogBox.stopListener(); // Stop the "locationProviderStatusChange" listener.
  }
  componentWillUnmount() {
    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    const scene = Actions.currentScene;
    this.setState({backCount: this.state.backCount + 1});
    if (scene === '_homeUser') {
      if (this.state.backCount > 1) {
        BackHandler.exitApp();
      }
    } else {
      Actions.pop();
    }
    return true;
  }

  render() {
    return (
      <Container>
        <HeaderComp
          Left={
            <Left>
              <Button
                transparent
                onPress={() => {
                  Actions.drawerOpen();
                }}>
                <Icon name="menu" />
              </Button>
            </Left>
          }
          title="DPU BMCK"
          Right={
            <Right>
              <Button
                transparent
                onPress={() => {
                  Actions.notificationList();
                }}>
                <Icon type="FontAwesome" name="bell" />
              </Button>
            </Right>
          }
          style={{paddingTop: 17}}
        />
        <Content style={{paddingTop: 25}}>
          <View>
            <Image
              source={require('../../assets/images/logo_dpu.png')}
              style={{alignSelf: 'center', width: 150, height: 150}}
            />
          </View>
          <Text
            style={{
              fontSize: fonts.lg,
              textAlign: 'center',
              alignItems: 'center',
            }}>
            AYO LAPORKAN JALAN DAN JEMBATAN YANG RUSAK DI JAWA TENGAH
          </Text>
          <View style={[gs.centerAll]}>
            <View style={{marginTop: 20}}>
              <TouchableOpacity
                style={{height: 70}}
                onPress={() => {
                  this.goToReportUser();
                }}>
                <View style={styles.linkMenuUser}>
                  <View style={{width: 50}}>
                    <Icon name="camera" style={{color: '#FFF', fontSize: 30}} />
                  </View>
                  <View style={{width: 180}}>
                    <Text style={styles.textMenu}>LAPORKAN KERUSAKAN</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 15}}>
              <TouchableOpacity
                style={{height: 70}}
                onPress={() => {
                  Actions.progressReport();
                }}>
                <View style={styles.linkMenuUser}>
                  <View style={{width: 50}}>
                    <Icon
                      type="FontAwesome"
                      active
                      name="tasks"
                      style={{color: '#FFF', fontSize: 30}}
                    />
                  </View>
                  <View style={{width: 180}}>
                    <Text style={styles.textMenu}>PROGRES LAPORAN</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
            <View style={{marginTop: 15}}>
              <TouchableOpacity
                style={{height: 70}}
                onPress={() => {
                  Actions.information();
                }}>
                <View style={styles.linkMenuUser}>
                  <View style={{width: 50}}>
                    <Icon
                      type="FontAwesome"
                      active
                      name="info"
                      style={{color: '#FFF', fontSize: 30}}
                    />
                  </View>
                  <View style={{width: 180}}>
                    <Text style={styles.textMenu}>INFORMASI</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>
          </View>
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E7E6ED',
  },
  modal: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal3: {
    height: 300,
    width: 300,
  },
  footerList: {
    backgroundColor: '#E7E6ED',
  },
  header: {
    backgroundColor: '#DB1500',
  },
  footerText: {
    fontFamily: 'Zocial',
    fontSize: 12,
    color: '#9F9EA4',
  },
  destination: {
    fontFamily: 'OpenSans',
    color: '#9F9EA4',
  },

  upIcon: {
    marginRight: 10,
  },
  downIcon: {
    marginRight: 10,
  },
  people: {
    fontSize: 12,
    color: '#9F9EA4',
    alignSelf: 'center',
  },
  budgePeople: {
    fontSize: 12,
    marginTop: 1,
  },
  imageHide: {
    position: 'absolute',
    left: 0,
    top: '50%',
  },
  time: {
    marginBottom: 20,
  },
  buttonSave: {
    backgroundColor: '#DB1500',
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
  },
  buttonSaveTripByTemplate: {
    backgroundColor: '#DB1500',
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '90%',
    marginBottom: 30,
  },
  popupBox: {
    width: '70%',
    minHeight: 100,
    backgroundColor: 'white',
    borderColor: 'white',
    borderWidth: 1,
    borderRadius: 3,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
  },
  popupTitle: {
    fontSize: 18,
    color: '#313539',
    fontWeight: 'bold',
    marginVertical: 10,
  },
  popupDesc: {
    fontSize: 14,
    color: '#313539',
    marginVertical: 10,
  },
  successButton: {
    backgroundColor: '#1d86bf',
    marginVertical: 10,
    minHeight: 40,
    minWidth: 80,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  buttonCancel: {
    width: 145,
    backgroundColor: '#EAEAEA',
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  buttonSaveNew: {
    width: 165,
    backgroundColor: '#DB1500',
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  linkMenuUser: {
    flex: 2,
    flexDirection: 'row',
    marginTop: 15,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: '#ff4800',
    paddingLeft: 20,
    paddingRight: 20,
    borderRadius: 5,
  },
  textMenu: {
    textAlign: 'left',
    color: 'white',
    fontSize: 16,
    fontFamily: 'OpenSans',
  },
});

const mapStateToProps = ({}) => {
  return {};
};

mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeUser);

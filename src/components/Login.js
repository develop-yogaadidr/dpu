import React, {Component} from 'react';
import {
  StatusBar,
  Text,
  View,
  ToastAndroid,
  Image,
  ScrollView,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  Container,
  Content,
  Row,
  Col,
  Form,
  Label,
  Item,
  Input,
  Button,
} from 'native-base';
import {colors, size, fonts} from '../styles/skeleton';
import gs from '../styles/styles';
import {Actions} from 'react-native-router-flux';
import {loginUser, loginWithFb, loginWithGmail} from '../actions/AuthAction';
import Spinner from 'react-native-loading-spinner-overlay';
import {connect, store} from 'react-redux';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from 'react-native-google-signin';

class Login extends Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: '',
        password: '',
        fcmToken: '',
      },
    };
    this.doLogin = this.doLogin.bind(this);
    this.focusNextField = this.focusNextField.bind(this);
    this.signIn = this.signIn.bind(this);
    //this.submitLoginFb = this.submitLoginFb.bind(this)
  }

  componentDidMount() {
    this._isMounted = true;
    //this.setState({fcmToken:this.props.dataFcm})
    //alert(this.props.fcmToken)
    GoogleSignin.configure({
      webClientId:
        '30490452599-k6vh74jibgsb2ig4ng6tcv2560i9579t.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
      offlineAccess: true,
    });
    this.getDataUser();
    //this.getCurrentUserInfo()
  }

  getDataUser = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    if (this._isMounted) {
      console.log('yeye', fcmToken);
      this.setState({fcmToken: fcmToken});
    }
  };
  componentWillUnmount() {
    this._isMounted = false;
  }

  focusNextField(key) {
    this.refs[key]._root.focus();
  }
  validateForm() {
    let {email, password} = this.state.user;
    if (email == '') {
      return {
        valid: false,
        message: 'Email harus diisi',
      };
    }
    if (password == '') {
      return {
        valid: false,
        message: 'Password harus diisi',
      };
    }

    return {
      valid: true,
    };
  }
  doLogin = async () => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');
    let {email, password} = this.state.user;

    const params = {
      email,
      password,
      fcmToken,
    };

    let valid = this.validateForm();
    if (valid.valid == true) {
      this.props.loginUser(params);
    } else {
      alert(valid.message);
    }
  };

  submitLoginFb = async data => {
    let fcmToken = await AsyncStorage.getItem('fcmToken');

    console.log(data);
    const params = {
      name: data.name,
      id: data.id,
      fcmToken: fcmToken,
    };

    this.props.loginWithFb(params);
  };
  componentDidUpdate(prevProps, prevState) {
    const {user} = this.state;
    if (
      JSON.stringify(this.props.dataLogin) !==
      JSON.stringify(prevProps.dataLogin)
    ) {
      //this.props.fetchUser(token,agentId)
      console.log(this.props.dataLogin);
      if (this.props.dataLogin.success === true) {
        ToastAndroid.show('Login Berhasil', ToastAndroid.SHORT);
        if (this.props.dataLogin.message.role == 'admin') {
          Actions.drawerMenuAdmin({type: 'reset'});
        } else {
          Actions.drawerMenu({type: 'reset'});
        }
      } else {
        ToastAndroid.show('Email atau Password anda salah', ToastAndroid.SHORT);
      }
    }
    if (
      JSON.stringify(this.props.dataFailed) !==
      JSON.stringify(prevProps.dataFailed)
    ) {
      if (this.props.dataFailed.success === false) {
        ToastAndroid.show(
          'Email atau password anda salah.',
          ToastAndroid.SHORT,
        );
      }
    }

    if (this.state.fcmToken !== prevState.fcmToken) {
      this.setState({fcmToken: this.state.fcmToken});
    }
  }

  _responseInfoCallback(error, result) {
    if (error) {
      console.log('Error fetching data: ' + error.toString());
    } else {
      console.log('Success fetching data: ' + result.toString());
      console.log(result);
      let fcmToken;
      const params = {
        name: result.id,
        id: result.id,
        //fcmToken: resultFcm
      };
      this.props.loginWithFb(params);
      /*AsyncStorage.getItem('fcmToken', (errorFcm, resultFcm) => {
                  //alert(resultRole)
                  console.log(result)
                 //fcmToken = result
                  const params = {
                    name:result.id,
                    id:result.id,
                    fcmToken: resultFcm
                  }
                   this.submitLoginFb(params);
        })*/
    }
  }
  getCurrentUserInfo = async () => {
    try {
      const userInfo = await GoogleSignin.signInSilently();
      console.log(userInfo);
    } catch (error) {
      console.log(error);
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // user has not signed in yet
      } else {
        // some other error
      }
    }
  };

  signIn = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      //this.setState({ userInfo });
      let fcmToken = await AsyncStorage.getItem('fcmToken');

      const params = {
        name: userInfo.user.name,
        email: userInfo.user.email,
        fcmToken: fcmToken,
      };
      this.props.loginWithGmail(params);
    } catch (error) {
      console.log('what', {error});
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        console.log('SIGN_IN_CANCELLED');
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        console.log('IN_PROGRESS');

        // operation (f.e. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        console.log('PLAY_SERVICES_NOT_AVAILABLE');

        // play services not available or outdated
      } else {
        // some other error happened
      }
    }
  };

  render() {
    return (
      <Container>
        <Spinner visible={this.props.isLoading} color="#DB1500" />
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'light-content'}
          translucent
        />

        <Content contentContainerStyle={{flex: 1}}>
          <View style={[gs.centerAll, {height: 250, paddingTop: 50}]}>
            <Image source={require('../../assets/images/logo_dpu.png')} />

            <Text
              style={{fontSize: fonts.lg, fontWeight: '700', color: 'white'}}>
              LOGO
            </Text>
          </View>

          <ScrollView>
            <Row style={[gs.centerAll, {padding: size.paddingLG}]}>
              <Col>
                <Item
                  stackedLabel
                  style={[
                    {borderColor: colors.primary, marginBottom: size.marginSM},
                  ]}>
                  <Label style={[{color: colors.primary}]}>Email</Label>
                  <Input
                    onChangeText={text => {
                      this.setState(prevState => ({
                        user: {
                          ...prevState.user,
                          email: text,
                        },
                      }));
                    }}
                    autoCapitalize="none"
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      this.focusNextField('passwordInput');
                    }}
                    blurOnSubmit={false}
                  />
                </Item>
                <Item
                  stackedLabel
                  style={[
                    {borderColor: colors.primary, marginBottom: size.marginSM},
                  ]}>
                  <Label style={[{color: colors.primary}]}>Password</Label>
                  <Input
                    onChangeText={text => {
                      this.setState(prevState => ({
                        user: {
                          ...prevState.user,
                          password: text,
                        },
                      }));
                    }}
                    ref="passwordInput"
                    secureTextEntry
                    autoCapitalize="none"
                  />
                </Item>

                <Button
                  onPress={this.doLogin}
                  rounded
                  style={[
                    gs.btnPrimary,
                    {
                      width: 300,
                      alignSelf: 'center',
                      marginBottom: size.marginSM,
                    },
                  ]}>
                  <Text style={[gs.btnPrimaryText]}>LOGIN</Text>
                </Button>
                <View
                  style={[gs.centerAll, {height: 20, flexDirection: 'row'}]}>
                </View>
                <View
                  style={[gs.centerAll, {height: 30, flexDirection: 'row'}]}>
                  <GoogleSigninButton
                    style={{width: 192, height: 48}}
                    size={GoogleSigninButton.Size.Wide}
                    color={GoogleSigninButton.Color.Dark}
                    onPress={this.signIn}
                    disabled={this.state.isSigninInProgress}
                  />
                </View>
                <View
                  style={[gs.centerAll, {height: 30, flexDirection: 'row'}]}>
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      width: 60,
                      height: 0,
                      marginRight: size.marginSM,
                    }}
                  />
                  <Text style={{color: colors.primary, fontSize: fonts.sm}}>
                    Tidak Punya Akun?{' '}
                  </Text>
                  <View
                    style={{
                      borderBottomColor: 'black',
                      borderBottomWidth: 1,
                      width: 60,
                      height: 0,
                      marginLeft: size.marginSM,
                    }}
                  />
                </View>
                <Button
                  onPress={() => {
                    Actions.register();
                  }}
                  rounded
                  style={[
                    gs.btnDefault,
                    {width: 300, alignSelf: 'center', marginTop: size.marginSM},
                  ]}>
                  <Text style={[gs.btnDefaultText]}>REGISTER</Text>
                </Button>
              </Col>
            </Row>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = ({auth, page}) => {
  return {
    isLoading: auth.isLoading,
    isLogin: auth.isLogin,
    dataLogin: auth.dataLogin,
    dataFcm: page.dataFcm,
    dataFailed: auth.dataFailed,
  };
};

mapDispatchToProps = dispatch => {
  return {
    loginUser: params => dispatch(loginUser(params)),
    loginWithFb: params => dispatch(loginWithFb(params)),
    loginWithGmail: params => dispatch(loginWithGmail(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);

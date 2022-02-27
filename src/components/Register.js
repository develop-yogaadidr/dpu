import React, {Component} from 'react';
import {StatusBar, Text, View, ScrollView, ToastAndroid} from 'react-native';
import {
  Container,
  Content,
  Row,
  Col,
  Label,
  Item,
  Input,
  Button,
} from 'native-base';
import {colors, size, fonts} from '../styles/skeleton';
import gs from '../styles/styles';
import {Actions} from 'react-native-router-flux';
import {registerUser} from '../actions/AuthAction';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from '@react-native-community/checkbox';
import {connect} from 'react-redux';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        phone: '',
        name: '',
        email: '',
        password: '',
        role: 'user',
        terms: false,
      },
      showAlert: false,
    };
    this.focusNextField = this.focusNextField.bind(this);
  }
  focusNextField(key) {
    this.refs[key]._root.focus();
  }
  validateForm() {
    const {phone, email, password, name, terms} = this.state.user;
    if (name == '') {
      return {
        valid: false,
        message: 'Nama harus diisi',
      };
    }

    if (email == '') {
      return {
        valid: false,
        message: 'Email harus diisi',
      };
    }

    if (phone == '') {
      return {
        valid: false,
        message: 'Telepon harus diisi',
      };
    }

    if (password == '') {
      return {
        valid: false,
        message: 'Password harus diisi',
      };
    }

    if (password.length < 6) {
      return {
        valid: false,
        message: 'Karakter password kurang dari 6 ',
      };
    }
    
    if (!terms) {
      return {
        valid: false,
        message: 'Anda harus menyetujui syarat dan ketentuan yang berlaku',
      };
    }

    return {
      valid: true,
    };
  }
  doRegister() {
    const {phone, email, password, name, role, terms} = this.state.user;

    const params = {
      phone,
      email,
      password,
      name,
      role,
      terms
    };
    let valid = this.validateForm();
    console.log(valid)
    if (valid.valid == true) {
      this.props.registerUser(params);
    } else {
      alert(valid.message);
    }
  }
  componentDidMount() {
    //db.test()
    console.log(this.props.isLoading);
  }

  componentDidUpdate(prevProps) {
    const {user} = this.state;
    if (
      JSON.stringify(this.props.isRegister) !==
      JSON.stringify(prevProps.isRegister)
    ) {
      //this.props.fetchUser(token,agentId)
      if (this.props.isRegister.success === true) {
        ToastAndroid.show('Registrasi Berhasil', ToastAndroid.SHORT);
        Actions.pop();
      } else {
        ToastAndroid.show(this.props.isRegister.message, ToastAndroid.SHORT);
      }
    }
  }

  render() {
    return (
      <Container>
        <Spinner visible={this.props.isLoading} color="#DB1500" />
        <StatusBar
          backgroundColor={'transparent'}
          barStyle={'light-content'}
          translucent
        />
        <View style={[gs.centerAll, {height: 100}]}>
          <Text
            style={{
              fontSize: fonts.lg,
              fontWeight: '700',
              color: colors.primary,
            }}>
            Registrasi
          </Text>
        </View>

        <Content contentContainerStyle={{flex: 1}}>
          <ScrollView>
            <Row style={[gs.centerAll, {padding: size.paddingMD}]}>
              <Col>
                <Item
                  stackedLabel
                  style={[
                    {borderColor: colors.primary, marginBottom: size.marginSM},
                  ]}>
                  <Label style={[{color: colors.primary}]}>Nama</Label>
                  <Input
                    onChangeText={text => {
                      this.setState(prevState => ({
                        user: {
                          ...prevState.user,
                          name: text,
                        },
                      }));
                    }}
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      this.focusNextField('emailInput');
                    }}
                    blurOnSubmit={false}
                    autoCapitalize="none"
                  />
                </Item>
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
                    ref="emailInput"
                    returnKeyType={'next'}
                    onSubmitEditing={() => {
                      this.focusNextField('numberInput');
                    }}
                    blurOnSubmit={false}
                    autoCapitalize="none"
                  />
                </Item>
                <Item
                  stackedLabel
                  style={[
                    {borderColor: colors.primary, marginBottom: size.marginSM},
                  ]}>
                  <Label style={[{color: colors.primary}]}>No Telepon</Label>
                  <Input
                    onChangeText={text => {
                      this.setState(prevState => ({
                        user: {
                          ...prevState.user,
                          phone: text,
                        },
                      }));
                    }}
                    ref="numberInput"
                    keyboardType={'numeric'}
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
                    secureTextEntry
                    autoCapitalize="none"
                    ref="passwordInput"
                  />
                </Item>
                <View style={{flexDirection: 'column', marginRight: 28}}>
                  <View style={{flexDirection: 'row'}}>
                    <CheckBox
                      value={this.state.user.terms}
                      onValueChange={() => {
                        this.setState(prevState => ({
                          user : {
                            ...prevState,
                            terms: !this.state.user.terms
                          }
                        }));
                      }}
                    />
                    <Text style={{lineHeight: 20, fontSize: 16}}>
                      Saya setuju dengan{' '}
                      <Text
                        onPress={() => {
                          Actions.syaratKetentuan();
                        }}
                        style={{color: '#29C5F6'}}>
                        Syarat dan Ketentuan{' '}
                      </Text>
                      yang berlaku.
                    </Text>
                  </View>
                </View>
                <Button
                  onPress={() => {
                    this.doRegister();
                  }}
                  rounded
                  style={[
                    gs.btnPrimary,
                    {width: 300, alignSelf: 'center', marginTop: size.marginLG},
                  ]}>
                  <Text style={[gs.btnPrimaryText]}>REGISTER</Text>
                </Button>

                <Button
                  onPress={() => {
                    Actions.pop();
                  }}
                  rounded
                  style={[
                    gs.btnDefault,
                    {width: 300, alignSelf: 'center', marginTop: size.marginSM},
                  ]}>
                  <Text style={[gs.btnDefaultText]}>BACK</Text>
                </Button>
              </Col>
            </Row>
          </ScrollView>
        </Content>
      </Container>
    );
  }
}
const mapStateToProps = ({auth}) => {
  return {
    isLoading: auth.isLoading,
    isRegister: auth.isRegister,
  };
};

mapDispatchToProps = dispatch => {
  return {
    registerUser: params => dispatch(registerUser(params)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);

import React, {Component} from 'react';
import {url} from '../actions/Config';

import {StyleSheet, FlatList} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Container,
  Content,
  Body,
  Text,
  Left,
  Right,
  Button,
  Icon,
  ListItem,
  Thumbnail,
  View,
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import HeaderComp from '../commons/HeaderComp';

class NotificationList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredReport: [],
      token: '',
      id_user: '',
      data: [],
      role: '',
    };
  }

  async componentDidMount() {
    this.getDataUser();
    AsyncStorage.getItem('notification', (error, result) => {
      //console.log(result)
      console.log(JSON.parse(result));
      let data = JSON.parse(result);
      if (data) {
        data.reverse();
      }
      this.setState({data});
    });
  }
  getDataUser = async () => {
    let role = await AsyncStorage.getItem('role');

    this.setState({role}, () => {});
  };

  /*componentWillUnmount(){
    this._isMounted = false
  }*/
  showImage(data) {
    let show = null;
    /*return(
        <Image source={{uri: `${url(data.image1)}`}} style={[{width: 120, height: 120}]}/> 
        )*/

    if (data.image1) {
      return <Thumbnail square source={{uri: `${url(data.image1)}`}} />;
    } else if (data.image2) {
      return <Thumbnail square source={{uri: `${url(data.image2)}`}} />;
    } else if (data.image3) {
      return <Thumbnail square source={{uri: `${url(data.image3)}`}} />;
    } else if (data.image4) {
      return <Thumbnail square source={{uri: `${url(data.image4)}`}} />;
    }
  }
  readed(index) {
    let data = this.state.data;
    let value = data[index];
    let output = {...value, read: 1};
    alert(JSON.stringify(output));
  }
  render() {
    return (
      <Container>
        <Spinner visible={this.props.isLoading} color="#DB1500" />
        <HeaderComp
          Left={
            <Left>
              <Button
                transparent
                onPress={() => {
                  if (this.state.role == 'admin') {
                    Actions.homeAdmin();
                  } else {
                    Actions.homeUser();
                  }
                }}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
          }
          title="Notifikasi"
          Right={<Right />}
          style={{paddingTop: 17}}
        />
        <Content>
          <FlatList
            data={this.state.data}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <View
                style={{backgroundColor: item.read == 0 ? '#EAEAEA' : null}}>
                <ListItem
                  thumbnail
                  onPress={() => {
                    Actions.notificationDetail({dataNotification: item});
                  }}>
                  <Left>{this.showImage(item.data_report)}</Left>
                  <Body>
                    <Text>{item.title}</Text>
                    <Text note numberOfLines={3}>
                      {item.body}
                    </Text>
                  </Body>
                  <Right>
                    <Button
                      transparent
                      onPress={() => {
                        Actions.notificationDetail({dataNotification: item});
                      }}>
                      <Text>View</Text>
                    </Button>
                  </Right>
                </ListItem>
              </View>
            )}
          />
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

const mapStateToProps = ({report}) => {
  return {};
};

mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationList);

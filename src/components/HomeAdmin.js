import React, {Component} from 'react';
import messaging from '@react-native-firebase/messaging';

import {
  StyleSheet,
  Image,
  FlatList,
  RefreshControl,
  BackHandler,
  TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Container,
  Content,
  Text,
  Col,
  Left,
  Right,
  Button,
  Icon,
  View,
  Item,
  Label,
  Picker,
  Row,
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';
import {url} from '../actions/Config';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import HeaderComp from '../commons/HeaderComp';
import {colors, size, fonts} from '../styles/skeleton';
import gs from '../styles/styles';
import {reportAll} from '../actions/ReportAction';
import Moment from 'moment';

import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {
  faBell,
  faTasks,
  faInfo,
  faCamera,
  faBars,
  faArrowLeft
} from '@fortawesome/free-solid-svg-icons';

class HomeAdmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredReport: [],
      token: '',
      id_user: '',
      refreshing: false,
      selectedStatus: '',
      selectedCity: '',
      backCount: 0,
      page: 1,
    };
    this.handleBackButtonClick = this.handleBackButtonClick.bind(this);
  }

  componentDidMount() {
    messaging().subscribeToTopic('admin');
    console.log(this.props.dataReportAll);
    //if(this.props.dataReportAll.message.data.length>0){
    this.setState({filteredReport: this.props.dataReportAll});
    this.arrayholder = this.props.dataReportAll;
    //}
    this.getDataUser();
  }
  getDataUser = async () => {
    this._isMounted = true;
    let token = await AsyncStorage.getItem('token');
    let id_user = await AsyncStorage.getItem('id_user');
    let page = this.state.page;
    console.log(token);
    if (this._isMounted) {
      this.setState({token}, () => {
        this.props.reportAll(token, page);
      });
    }
  };

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.dataReportAll) !==
      JSON.stringify(prevProps.dataReportAll)
    ) {
      this.setState({filteredReport: this.props.dataReportAll});
      this.arrayholder = this.props.dataReportAll;
      console.log('ss', this.props.dataReportAll);

      const selectedStatus = this.state.selectedStatus;

      const selectedCity = this.state.selectedCity;

      let filter = this.props.dataReportAll.filter((result, index) => {
        if (selectedStatus != '' && selectedCity != '') {
          return (
            result.city.toLowerCase().indexOf(selectedCity.toLowerCase()) !==
              -1 &&
            result.status
              .toLowerCase()
              .indexOf(selectedStatus.toLowerCase()) !== -1
          );
        } else if (selectedCity == '' && selectedStatus != '') {
          return (
            result.status
              .toLowerCase()
              .indexOf(selectedStatus.toLowerCase()) !== -1
          );
        } else if (selectedCity != '') {
          return (
            result.city.toLowerCase().indexOf(selectedCity.toLowerCase()) !== -1
          );
        } else if (selectedCity == '') {
          return result;
        }
      });

      this.setState({
        filteredReport: filter,
      });
    }
  }

  componentDidMount() {
    BackHandler.addEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }
  componentWillUnmount() {
    this._isMounted = false;

    BackHandler.removeEventListener(
      'hardwareBackPress',
      this.handleBackButtonClick,
    );
  }

  handleBackButtonClick() {
    const scene = Actions.currentScene;
    this.setState({backCount: this.state.backCount + 1});
    if (scene === '_homeAdmin') {
      if (this.state.backCount > 1) {
        BackHandler.exitApp();
      }
    } else {
      Actions.pop();
    }
    return true;
  }
  colorStatus(name) {
    if (name == 'Selesai') {
      return (
        <Text
          style={{
            backgroundColor: 'red',
            color: 'white',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            borderRadius: 3,
          }}>
          {name}
        </Text>
      );
    } else if (name == 'Laporan Diterima') {
      return (
        <Text
          style={{
            backgroundColor: 'blue',
            color: 'white',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            borderRadius: 3,
          }}>
          {name}
        </Text>
      );
    } else if (name == 'Laporan Ditolak') {
      return (
        <Text
          style={{
            backgroundColor: 'black',
            color: 'white',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            borderRadius: 3,
          }}>
          {name}
        </Text>
      );
    } else if (name == 'Proses Pengerjaan') {
      return (
        <Text
          style={{
            backgroundColor: '#EDA72B',
            color: 'white',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            borderRadius: 3,
          }}>
          {name}
        </Text>
      );
    } else if (name == 'Menunggu Konfirmasi') {
      return (
        <Text
          style={{
            backgroundColor: 'green',
            color: 'white',
            paddingTop: 5,
            paddingBottom: 5,
            paddingLeft: 5,
            borderRadius: 3,
          }}>
          {name}
        </Text>
      );
    }
  }

  showImage(data) {
    let show = null;
    /*return(
        <Image source={{uri: `${url(data.image1)}`}} style={[{width: 120, height: 120}]}/> 
        )*/

    if (data.image1) {
      return (
        <Image
          source={{uri: `${url(data.image1)}`}}
          style={[{width: 100, height: 100}]}
        />
      );
    } else if (data.image2) {
      return (
        <Image
          source={{uri: `${url(data.image2)}`}}
          style={[{width: 100, height: 100}]}
        />
      );
    } else if (data.image3) {
      return (
        <Image
          source={{uri: `${url(data.image3)}`}}
          style={[{width: 100, height: 100}]}
        />
      );
    } else if (data.image4) {
      return (
        <Image
          source={{uri: `${url(data.image4)}`}}
          style={[{width: 100, height: 100}]}
        />
      );
    }
  }
  _onRefresh = () => {
    const {token} = this.state;
    this.setState({refreshing: true});
    this.props.reportAll(token, 1);
    this.setState({refreshing: false});
  };
  onCityChange(value) {
    this.setState({
      selectedCity: value,
    });
    const selectedStatus = this.state.selectedStatus;

    let filter = this.arrayholder.filter((result, index) => {
      if (selectedStatus != '' && value != '') {
        return (
          result.city.toLowerCase().indexOf(value.toLowerCase()) !== -1 &&
          result.status.toLowerCase().indexOf(selectedStatus.toLowerCase()) !==
            -1
        );
      } else if (value == '' && selectedStatus != '') {
        return (
          result.status.toLowerCase().indexOf(selectedStatus.toLowerCase()) !==
          -1
        );
      } else if (value != '') {
        return result.city.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      } else if (value == '') {
        return result;
      }
    });

    this.setState({
      filteredReport: filter,
    });
  }

  onStatusChange(value) {
    this.setState({
      selectedStatus: value,
    });
    const selectedCity = this.state.selectedCity;

    let filter = this.arrayholder.filter((result, index) => {
      if (selectedCity != '' && value != '') {
        return (
          result.status.toLowerCase().indexOf(value.toLowerCase()) !== -1 &&
          result.city.toLowerCase().indexOf(selectedCity.toLowerCase()) !== -1
        );
      } else if (value == '' && selectedCity != '') {
        return (
          result.city.toLowerCase().indexOf(selectedCity.toLowerCase()) !== -1
        );
      } else if (value != '') {
        return result.status.toLowerCase().indexOf(value.toLowerCase()) !== -1;
      } else if (value == '') {
        return result;
      }
    });
    this.setState({
      filteredReport: filter,
    });
  }

  modalSearchTourChangeText(searchText) {
    console.log(searchText);
    if (searchText != '') {
      let filter = this.arrayholder.filter((result, index) => {
        return (
          result.city.toLowerCase().indexOf(searchText.toLowerCase()) !== -1
        );
      });
      if (this._isMounted) {
        this.setState({
          dataCity: filter,
          modalPickerSearchBarShowClearTextInput: true,
          searchText: searchText,
        });
      }
    } else {
      if (this._isMounted) {
        this.setState({
          dataCity: this.props.dataDomesticCity,
          modalPickerSearchBarShowClearTextInput: false,
          searchText: '',
        });
      }
    }
  }
  loadAgain() {
    const {token, filteredReport} = this.state;
    console.log(this.props.dataReportMessage);
    console.log(filteredReport);
    let page = this.props.dataReportMessage.current_page + 1;

    this.props.reportAll(token, page, filteredReport);
  }

  render() {
    console.log(this.props.dataReportMessage.current_page);
    console.log(this.props.dataReportMessage.last_page);

    return (
      <Container>
        <Spinner visible={this.props.isLoading} color="#DB1500" />
        <HeaderComp
          Left={
            <Left>
              <Button
                transparent
                onPress={() => {
                  Actions.drawerOpen();
                }}>
                <FontAwesomeIcon icon={faArrowLeft} style={{color: '#FFF', fontSize: 30}}/>
              </Button>
            </Left>
          }
          title="ADMIN DPU"
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
        <Content
          refreshControl={
            <RefreshControl
              refreshing={this.state.refreshing}
              onRefresh={this._onRefresh}
            />
          }>
          <View>
            <Label style={{paddingTop: 10, paddingLeft: 10}}>
              Filter Kota/Kabupaten
            </Label>

            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                placeholder="Pilih Kota"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selectedCity}
                onValueChange={this.onCityChange.bind(this)}>
                <Picker.Item label="Pilih Kota/Kabupaten" value="" />
                <Picker.Item
                  label="Kabupaten Banjarnegara"
                  value="Laporan Ditolak"
                />
                <Picker.Item
                  label="Kabupaten Banyumas"
                  value="Laporan Diterima"
                />
                <Picker.Item
                  label="Kabupaten Batang"
                  value="Kabupaten Batang"
                />
                <Picker.Item label="Kabupaten Blora" value="Kabupaten Blora" />
                <Picker.Item
                  label="Kabupaten Boyolali"
                  value="Kabupaten Boyolali"
                />
                <Picker.Item
                  label="Kabupaten Brebes"
                  value="Kabupaten Brebes"
                />
                <Picker.Item
                  label="Kabupaten Cilacap"
                  value="Kabupaten Cilacap"
                />
                <Picker.Item label="Kabupaten Demak" value="Kabupaten Demak" />
                <Picker.Item
                  label="Kabupaten Grobogan"
                  value="Kabupaten Grobogan"
                />
                <Picker.Item
                  label="Kabupaten Jepara"
                  value="Kabupaten Jepara"
                />
                <Picker.Item
                  label="Kabupaten Karanganyar"
                  value="Kabupaten Karanganyar"
                />
                <Picker.Item
                  label="Kabupaten Kebumen"
                  value="Kabupaten Kebumen"
                />
                <Picker.Item
                  label="Kabupaten Kendal"
                  value="Kabupaten Kendal"
                />
                <Picker.Item
                  label="Kabupaten Klaten"
                  value="Kabupaten Klaten"
                />
                <Picker.Item label="Kabupaten Kudus" value="Kabupaten Kudus" />
                <Picker.Item
                  label="Kabupaten Magelang"
                  value="Kabupaten Magelang"
                />
                <Picker.Item label="Kabupaten Pati" value="Kabupaten Pati" />
                <Picker.Item
                  label="Kabupaten Pekalongan"
                  value="Kabupaten Pekalongan"
                />
                <Picker.Item
                  label="Kabupaten Pemalang"
                  value="Kabupaten Pemalang"
                />
                <Picker.Item
                  label="Kabupaten Purbalingga"
                  value="Kabupaten Purbalingga"
                />
                <Picker.Item
                  label="Kabupaten Purworejo"
                  value="Kabupaten Purworejo"
                />
                <Picker.Item
                  label="Kabupaten Rembang"
                  value="Kabupaten Rembang"
                />
                <Picker.Item
                  label="Kabupaten Semarang"
                  value="Kabupaten Semarang"
                />
                <Picker.Item
                  label="Kabupaten Sragen"
                  value="Kabupaten Sragen"
                />
                <Picker.Item
                  label="Kabupaten Sukoharjo"
                  value="Kabupaten Sukoharjo"
                />
                <Picker.Item label="Kabupaten Tegal" value="Kabupaten Tegal" />
                <Picker.Item
                  label="Kabupaten Temanggung"
                  value="Kabupaten Temanggung"
                />
                <Picker.Item
                  label="Kabupaten Wonogiri"
                  value="Kabupaten Wonogiri"
                />
                <Picker.Item
                  label="Kabupaten Wonosobo"
                  value="Kabupaten Wonosobo"
                />
                <Picker.Item label="Kota Magelang" value="Kota Magelang" />
                <Picker.Item label="Kota Pekalongan" value="Kota Pekalongan" />
                <Picker.Item label="Kota Salatiga" value="Kota Salatiga" />
                <Picker.Item label="Kota Semarang" value="Kota Semarang" />
                <Picker.Item label="Kota Surakarta" value="Kota Surakarta" />
                <Picker.Item label="Kota Tegal" value="Kota Tegal" />
              </Picker>
            </Item>
            <Label style={{paddingTop: 10, paddingLeft: 10}}>
              Filter Tahapan
            </Label>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{width: undefined}}
                placeholder="Select your SIM"
                placeholderStyle={{color: '#bfc6ea'}}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selectedStatus}
                onValueChange={this.onStatusChange.bind(this)}>
                <Picker.Item label="Semua Tahapan" value="" />
                <Picker.Item
                  label="Menunggu Konfirmasi"
                  value="Menunggu Konfirmasi"
                />
                <Picker.Item label="Laporan Ditolak" value="Laporan Ditolak" />
                <Picker.Item
                  label="Laporan Diterima"
                  value="Laporan Diterima"
                />
                <Picker.Item
                  label="Proses Pengerjaan"
                  value="Proses Pengerjaan"
                />
                <Picker.Item label="Selesai" value="Selesai" />
              </Picker>
            </Item>
          </View>
          <FlatList
            data={this.state.filteredReport}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item, index}) => (
              <TouchableOpacity
                key={index}
                onPress={() => {
                  Actions.detailReportAdmin({reportId: item.id, report: item});
                }}>
                <Row
                  style={[
                    gs.contentPadding,
                    styles.transactionList,
                    {backgroundColor: '#F5F5F5', marginBottom: 3},
                  ]}>
                  <Col style={{width: 110}}>{this.showImage(item)}</Col>
                  <Col>
                    <Row>
                      <Col>
                        <View style={{paddingBottom: 7}}>
                          {this.colorStatus(item.status)}
                        </View>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Text
                          style={{color: colors.backgroundGrayContainerText}}>
                          no. {item.id}
                        </Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Text
                          style={{color: colors.backgroundGrayContainerText}}>
                          {item.type}
                        </Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Text
                          style={{color: colors.backgroundGrayContainerText}}>
                          {item.city}
                        </Text>
                      </Col>
                    </Row>
                    <Row>
                      <Col>
                        <Text
                          style={{color: colors.backgroundGrayContainerText}}>
                          Tgl Laporan :
                          {Moment(item.created_at).format('dddd, DD MMMM YYYY')}
                        </Text>
                      </Col>
                    </Row>

                    <Row style={[gs.centerAll]}>
                      <Col style={[gs.alignRight]}>
                        <TouchableOpacity
                          onPress={() => {
                            Actions.detailReportUser({
                              reportId: item.id,
                              report: item,
                            });
                          }}>
                          <Text style={{color: '#187ED3', fontWeight: '600'}}>
                            Selengkapnya
                          </Text>
                        </TouchableOpacity>
                      </Col>
                    </Row>
                  </Col>
                </Row>

                {/*<View style={styles.container}>
                    <View style={{backgroundColor:"#eaeaea",paddingLeft:15, paddingRight:15, paddingBottom : 20, paddingTop:15}}>
                    <Grid>
                      <Col>
                        <Text style={{fontSize:18}}>Laporan {item.type}</Text>
                        <Text>Waktu Laporan : { Moment(item.created_at).format('dddd, DD MMMM YYYY')}</Text>
                        <Text>Status Terakhir : {item.status}</Text>
                        
                      </Col>
                    </Grid>
                    </View>
                    
                  </View>*/}
              </TouchableOpacity>
            )}
          />
          {this.props.dataReportMessage.current_page !==
          this.props.dataReportMessage.last_page ? (
            <Button
              style={styles.loadMore}
              small
              danger
              rounded
              onPress={() => {
                this.loadAgain();
              }}>
              <Text>Muat Lagi</Text>
            </Button>
          ) : null}
          {/* <TouchableOpacity style={styles.loadMore}>
              <Text style={{color:'#FFF', alignSelf:'center', alignItems:'center'}}>Muat Lagi</Text>
            </TouchableOpacity>*/}
        </Content>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  loadMore: {
    //backgroundColor: "#DB1500",
    /*width:250, 
      textAlign:'center', 
      borderRadius:15, 
      alignItems:'center',
      alignSelf:'center' ,
      height: 30, 
      marginBottom:10,
      marginTop:10*/
    backgroundColor: '#DB1500',
    color: '#ffffff',
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    width: '50%',
    marginTop: 20,
    marginBottom: 10,
  },
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
  return {
    isLoading: report.isLoading,
    dataReportAll: report.dataReportAll,
    dataReportMessage: report.dataReportMessage,
  };
};

mapDispatchToProps = dispatch => {
  return {
    reportAll: (token, page, reportData) =>
      dispatch(reportAll(token, page, reportData)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeAdmin);

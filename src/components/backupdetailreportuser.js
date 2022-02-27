import React, {Component} from 'react';
import {fetchProgressByAdmin} from '../actions/ReportAction';
import Spinner from 'react-native-loading-spinner-overlay';

import {connect} from 'react-redux';
import ImageViewer from 'react-native-image-zoom-viewer';
import MapView from 'react-native-maps';
import {url} from '../actions/Config';

import {StyleSheet, Image, ScrollView, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {
  Container,
  Content,
  Text,
  Grid,
  Col,
  Left,
  Right,
  Button,
  Icon,
  Separator,
  View
} from 'native-base';
import {Actions} from 'react-native-router-flux';
import HeaderComp from '../commons/HeaderComp';
import Moment from 'moment';
import 'moment/locale/id';
Moment.locale('id');

class DetailReportUser extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filteredProgress: [],
      token: '',
      id_user: '',
      detailReport: this.props.report,
      mapRegion: {
        latitude: -6.961684,
        longitude: 110.397877,
        latitudeDelta: 0.043,
        longitudeDelta: 0.043,
      },
      latlng: {
        latitude: parseFloat(this.props.report.latitude),
        longitude: parseFloat(this.props.report.longitude),
      },
      image1: this.props.report.image1,
      image2: this.props.report.image2,
      image3: this.props.report.image3,
      image4: this.props.report.image4,
      image5: this.props.report.image5,
      image6: this.props.report.image6,
      modalVisible: false,
      indexZoom: 0,
      images: [
        {
          url: url(this.props.report.image1),
        },
        {
          url: url(this.props.report.image2),
        },
        {
          url: url(this.props.report.image3),
        },
        {
          url: url(this.props.report.image4),
        },
        {
          url: url(this.props.report.image5),
        },
        {
          url: url(this.props.report.image6),
        },
      ],
      modalVisibleSelesai: false,
      indexZoomSelesai: 0,
      imagesSelesai: [],
    };
  }
  saveImagesSelesai(data) {
    this.setState({
      imagesSelesai: [...this.state.imagesSelesai, {url: data}],
    });
  }
  setModalVisible(visible, data) {
    this.setState({modalVisible: visible, indexZoom: data});
  }
  setModalVisibleSelesai(visible, data) {
    //this.setState({modalVisibleSelesai: visible, indexZoomSelesai: data});
  }

  componentDidMount() {
    this.getDataUser();
    console.log(this.props.reportId);
    this.setState({
      mapRegion: {
        latitude: parseFloat(this.props.report.latitude),
        longitude: parseFloat(this.props.report.longitude),
        latitudeDelta: 0.043,
        longitudeDelta: 0.043,
      },
    });
    //this.setState({filteredProgress: this.props.dataProgress.message});
  }
  getDataUser = async () => {
    let token = await AsyncStorage.getItem('token');
    let id_user = await AsyncStorage.getItem('id_user');
    let id_report = this.props.reportId;
    console.log(id_report);
    this.setState({token, id_user}, () => {
      this.props.fetchProgressByAdmin(token, id_report);
    });
  };
  /* getDataUser(){
    let token
    let id_user
     AsyncStorage.getItem('token', (error, result) => {
          token = result
        })
     AsyncStorage.getItem('id_user', (error, result) => {
          id_user = result
        })
     this.props.reportByUser(token, id_user)

  }*/

  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.dataProgress) !==
      JSON.stringify(prevProps.dataProgress)
    ) {
      this.setState({filteredProgress: this.props.dataProgress.message});
      this.props.dataProgress.message.map((item, index) => {
        if (item.status === 'Selesai') {
          imagesSelesai: [
            {url: item.image1},
            {url: item.image2},
            {url: item.image3},
          ];
        }
      });
    }
  }

  render() {
    //console.log(this.state.filteredProgress)
    const {detailReport} = this.state;

    return (
      <Container>
        <Spinner visible={this.props.isLoading} color="#DB1500" />
        <HeaderComp
          Left={
            <Left>
              <Button
                transparent
                onPress={() => {
                  Actions.pop();
                }}>
                <Icon name="arrow-back" />
              </Button>
            </Left>
          }
          title="Detail  Laporan"
          Right={<Right />}
          style={{paddingTop: 17}}
        />
        <Content>
          <View style={{paddingTop: 10, paddingBottom: 15, paddingLeft: 10}}>
            <Grid>
              <Col width={50}>
                <Text>No Laporan</Text>
              </Col>
              <Col>
                <Text>{detailReport.id}</Text>
              </Col>
            </Grid>
            <Grid>
              <Col width={50}>
                <Text>Jenis Laporan</Text>
              </Col>
              <Col>
                <Text>{detailReport.type}</Text>
              </Col>
            </Grid>
            <Grid>
              <Col width={50}>
                <Text>Kota/Kabupaten</Text>
              </Col>
              <Col>
                <Text>{detailReport.city}</Text>
              </Col>
            </Grid>
            <Grid>
              <Col width={50}>
                <Text>Tanggal Laporan</Text>
              </Col>
              <Col>
                <Text>
                  {Moment(detailReport.created_at).format('dddd, DD MMMM YYYY')}
                </Text>
              </Col>
            </Grid>
            <Grid>
              <Col width={50}>
                <Text>Status Terakhir</Text>
              </Col>
              <Col>
                <Text>{detailReport.status}</Text>
              </Col>
            </Grid>
            <Grid>
              <Col width={50}>
                <Text>Coordinate</Text>
              </Col>
              <Col>
                <Text>
                  {detailReport.latitude},{detailReport.longitude}
                </Text>
                {/*<TouchableOpacity  onPress={()=>{openMap()}}>
                    <Text style={{color: colors.default, fontWeight: '600'}}>Buka di Google Maps</Text>
                  </TouchableOpacity>*/}
              </Col>
            </Grid>
            <Grid></Grid>
          </View>
          <View style={{height: 300, paddingBottom: 15}}>
            <MapView
              style={{flex: 1, ...StyleSheet.absoluteFillObject}}
              initialRegion={this.state.mapRegion}
              //region={this.state.mapRegion}
            >
              <MapView.Marker
                coordinate={this.state.latlng}
                title={'title'}
                description={'description'}
              />
            </MapView>
          </View>
          <Grid>
            <ScrollView
              horizontal
              style={[{paddingTop: 15, paddingLeft: 5, paddingBottom: 15}]}>
              <View style={{marginRight: 5}}>
                {this.state.image1 ? (
                  <TouchableOpacity
                    onPress={() => this.setModalVisible(true, 0)}>
                    <Image
                      source={{uri: `${url(this.state.image1)}`}}
                      style={[{width: 120, height: 120}]}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
              <View style={{marginRight: 5}}>
                {this.state.image2 ? (
                  <TouchableOpacity
                    onPress={() => this.setModalVisible(true, 1)}>
                    <Image
                      source={{uri: `${url(this.state.image2)}`}}
                      style={[{width: 120, height: 120}]}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={{marginRight: 5}}>
                {this.state.image3 ? (
                  <TouchableOpacity
                    onPress={() => this.setModalVisible(true, 2)}>
                    <Image
                      source={{uri: `${url(this.state.image3)}`}}
                      style={[{width: 120, height: 120}]}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={{marginRight: 5}}>
                {this.state.image4 ? (
                  <TouchableOpacity
                    onPress={() => this.setModalVisible(true, 3)}>
                    <Image
                      source={{uri: `${url(this.state.image4)}`}}
                      style={[{width: 120, height: 120}]}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={{marginRight: 5}}>
                {this.state.image5 ? (
                  <TouchableOpacity
                    onPress={() => this.setModalVisible(true, 4)}>
                    <Image
                      source={{uri: `${url(this.state.image5)}`}}
                      style={[{width: 120, height: 120}]}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>

              <View style={{marginRight: 5}}>
                {this.state.image6 ? (
                  <TouchableOpacity
                    onPress={() => this.setModalVisible(true, 5)}>
                    <Image
                      source={{uri: `${url(this.state.image6)}`}}
                      style={[{width: 120, height: 120}]}
                    />
                  </TouchableOpacity>
                ) : null}
              </View>
            </ScrollView>
          </Grid>
          <Separator bordered>
            <Text style={{fontSize: 20}}>Progress</Text>
          </Separator>
          <FlatList
            data={this.state.filteredProgress}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity onPress={() => {}}>
                <View style={styles.container}>
                  <View
                    style={{
                      backgroundColor: '#F5F5F5',
                      paddingLeft: 15,
                      paddingRight: 15,
                      paddingBottom: 20,
                      paddingTop: 15,
                    }}>
                    <Grid>
                      <Col>
                        <Text>Status : {item.status}</Text>
                        <Text>
                          Waktu Update :{' '}
                          {Moment(item.created_at).format('dddd, DD MMMM YYYY')}
                        </Text>
                        <Text>Oleh : {item.updated_by}</Text>
                        <Text>Info : {item.info}</Text>
                      </Col>
                    </Grid>
                  </View>
                  <ScrollView
                    horizontal
                    style={[
                      {paddingTop: 15, paddingLeft: 5, paddingBottom: 15},
                    ]}>
                    <View style={{marginRight: 5}}>
                      {item.status == 'Selesai' && item.image1 ? (
                        <TouchableOpacity
                          onPress={() => this.setModalVisibleSelesai(true, 0)}>
                          <Image
                            source={{uri: `${url(item.image1)}`}}
                            style={[{width: 120, height: 120}]}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                    <View style={{marginRight: 5}}>
                      {item.status == 'Selesai' && item.image2 ? (
                        <TouchableOpacity
                          onPress={() => this.setModalVisibleSelesai(true, 1)}>
                          <Image
                            source={{uri: `${url(item.image2)}`}}
                            style={[{width: 120, height: 120}]}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                    <View style={{marginRight: 5}}>
                      {item.status == 'Selesai' && item.image3 ? (
                        <TouchableOpacity
                          onPress={() => this.setModalVisibleSelesai(true, 2)}>
                          <Image
                            source={{uri: `${url(item.image3)}`}}
                            style={[{width: 120, height: 120}]}
                          />
                        </TouchableOpacity>
                      ) : null}
                    </View>
                  </ScrollView>
                </View>
              </TouchableOpacity>
            )}
          />

          <View style={{marginBottom: 30}}></View>
        </Content>

        <Modal
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
          <ImageViewer
            imageUrls={this.state.images}
            index={this.state.indexZoom}
          />
        </Modal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: '#E7E6ED',
    borderBottomWidth: 1,
  },
});

const mapStateToProps = ({report}) => {
  return {
    isLoading: report.isLoading,
    dataProgress: report.dataProgress,
  };
};

mapDispatchToProps = dispatch => {
  return {
    fetchProgressByAdmin: (token, id_report) =>
      dispatch(fetchProgressByAdmin(token, id_report)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DetailReportUser);

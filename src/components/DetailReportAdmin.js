import React, {Component} from 'react';
import {fetchProgressByAdmin, updateReportStatus, reportAll} from '../actions/ReportAction'
import Spinner from 'react-native-loading-spinner-overlay';
import { url } from '../actions/Config'
import Share from 'react-native-share';
import { connect } from 'react-redux'
import ImageViewer from 'react-native-image-zoom-viewer';
import {StyleSheet, ScrollView ,Image, FlatList, Modal, ToastAndroid, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 
{
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
    View,
    Item,
    Label,
    Textarea,
    Picker,
    Row
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeaderComp from '../commons/HeaderComp';
import { colors, size, fonts } from '../styles/skeleton'
import gs from '../styles/styles'
import Moment from 'moment'
import MapView, {AnimatedRegion, Marker}  from 'react-native-maps'
import ImagePicker from 'react-native-image-picker';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import 'moment/locale/id';
Moment.locale('id');

const WHATSAPP_ICON = "data:image/png;base64,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";
class DetailReportAdmin extends Component{
  constructor(props){
    super(props);

    this.state = {
      filteredProgress:[],
      name:'',
      token:'',
      id_user:'',
      id_report:'',
      detailReport:this.props.report,
      info:'',
      selectedStatus:'',
      mapRegion : {
        latitude: -6.961684,
        longitude: 110.397877,
        latitudeDelta:  0.043,
        longitudeDelta: 0.043
      },
      latlng:{
        latitude: parseFloat(this.props.report.latitude),
        longitude: parseFloat(this.props.report.longitude),
      },
      image1:this.props.report.image1,
      image2:this.props.report.image2,
      image3:this.props.report.image3,
      image4:this.props.report.image4,
      image5:this.props.report.image5,
      image6:this.props.report.image6,

      photo1: '',
      photo2: '',
      photo3: '',
      dataPhoto1: '',
      dataPhoto2: '',
      dataPhoto3: '',

      modalVisible:false,
      indexZoom:0,
      images :[
        {
          url: url(this.props.report.image1)
        },
         {
          url: url(this.props.report.image2)
        },
         {
          url: url(this.props.report.image3)
        },
         {
          url: url(this.props.report.image4)
        },
         {
          url: url(this.props.report.image5)
        },
         {
          url: url(this.props.report.image6)
        },

      ],
      modalVisibleDone:false,
      imageDone:[],

    }

  }
   selectPhotoTapped(no) {

    photoValue= this.state.photoValue
    const options = {
      quality: 0.5,
      maxWidth: 500,
      maxHeight: 500,
      storageOptions: {
        skipBackup: true,
        path: 'imagesdpu',
      },
    };

    ImagePicker.showImagePicker(options, (response) => {
      console.log('Response = ', response);
      //alert(JSON.Stringify(response))
      if (response.didCancel) {
        console.log('User cancelled photo picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else if (response.customButton) {
        console.log('User tapped custom button: ', response.customButton);
      } else {
        const source = { uri: response.uri };
       
          if(no===1){
            this.setState({
              photo1: source.uri,
              dataPhoto1: response,
            })
          }
          if(no===2){
            this.setState({
              photo2: source.uri,
              dataPhoto2: response,
            })
          }
          if(no===3){
            this.setState({
              photo3: source.uri,
              dataPhoto3: response,

            })
          }
        console.log('photo', this.state.photo1)
        console.log('uri', source)
      }
    });
  }
  setModalVisible(visible, data) {

    this.setState({modalVisible: visible, indexZoom: data});
  }

  componentDidMount(){
    this.getDataUser()
    console.log(this.props.reportId)
    this.setState({
      mapRegion:{
        latitude:parseFloat(this.props.report.latitude),
        longitude: parseFloat(this.props.report.longitude),
        latitudeDelta:  0.043,
        longitudeDelta: 0.043
      }
    })
    this.setState({filteredProgress: this.props.dataProgressAdmin.message});
  }
  getDataUser = async () => {

    let token = await AsyncStorage.getItem('token');
    let id_user = await AsyncStorage.getItem('id_user');
    let id_report = this.props.reportId
    let name = await AsyncStorage.getItem('name');

    console.log(id_report)
    this.setState({ token, id_user, id_report, name}, () => {
      this.props.fetchProgressByAdmin(token, id_report)

    })
  }

  onStatusChange(value) {
    this.setState({
      selectedStatus: value
    });
  }
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
   validateForm(){
     let {
      selectedStatus
     } = this.state


  
    if(selectedStatus == ''){
        return {
          valid: false,
          message: 'Maaf Anda belum memilih tindak lanjut'
        }
      }
    

    return {
      valid: true
    }
  }
  setModalVisibleDone(visible, data) {

    this.setState({
      modalVisibleDone: visible, 
      imageDone:[{
          url: url(data)
        }]
    });
  }
  updateReport(){
   // const {dataDetail, messageAdded, isLoadingTraveler} = this.props
    const {
      name,
      token,
      id_user,
      id_report,
      info,
      selectedStatus,
      photo1,
      photo2,
      photo3,
      dataPhoto1,
      dataPhoto2,
      dataPhoto3
    } = this.state

    const params = {
      id_user,
      id_report,
      status:selectedStatus,
      info:info,
      updated_by:name
    }
    let valid = this.validateForm()

    if(valid.valid == true){
       let data = new FormData()
    
    
      
        if(photo1){
          data.append('image1',{uri: dataPhoto1.uri, type: dataPhoto1.type, name: dataPhoto1.fileName})
        }
        if (photo2) {
          data.append('image2', {uri: dataPhoto2.uri, type: dataPhoto2.type, name: dataPhoto2.fileName})
        }
        if(photo3){
          data.append('image3', {uri: dataPhoto3.uri, type: dataPhoto3.type, name: dataPhoto3.fileName})
        }
         data.append('info', info)
         data.append('id_user', id_user)
         data.append('id_report', id_report)
         data.append('status', selectedStatus)
         data.append('updated_by', name)


        this.props.updateReportStatus(token, data)
         this.setState({
          selectedStatus: '',
          info:'',
        });
    }else{
      alert(valid.message)
    }

  }

  componentDidUpdate(prevProps) {

      if (JSON.stringify(this.props.dataProgressAdmin) !== JSON.stringify(prevProps.dataProgressAdmin)) {
       this.setState({filteredProgress: this.props.dataProgressAdmin.message});
      }
       if (JSON.stringify(this.props.isUpdate) !== JSON.stringify(prevProps.isUpdate)) {
        //this.props.fetchUser(token,agentId)
          //console.log(this.props.dataLogin)
          if(this.props.dataUpdate.success===true){
              ToastAndroid.show('Status laporan berhasil diperbarui', ToastAndroid.SHORT)
              this.props.fetchProgressByAdmin(this.state.token, this.state.id_report)
              this.props.reportAll(this.state.token)
          }else{
              ToastAndroid.show('Terjadi Kesalahan, silahkan ulang lagi', ToastAndroid.SHORT)
          }
        
      }
  }

   readyShare = async () => {
     let id_report = this.props.reportId
    //const image1= 'data:image/jpeg;base64,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'
    const shareOptions = {
      title: "Jalan Cantik",
      url: `http://jalancantik.dpubinmarcipka.jatengprov.go.id/laporan/${id_report}`,
      subject: "Laporan Jalan Cantik" //  for email
    };

    await Share.open(shareOptions);

   // https://www.google.com/maps/dir//-6.9773443,110.392237/@-6.977339,110.3900483,17z

   
  }

  openMap(lat,lng){
    var url = `https://www.google.com/maps/dir/?api=1&travelmode=driving&dir_action=navigate&destination=${lat},${lng}`;
    Linking.canOpenURL(url).then(supported => {
        if (!supported) {
            console.log('Can\'t handle url: ' + url);
        } else {
            return Linking.openURL(url);
        }
    }).catch(err => console.error('An error occurred', err)); 
  }
  
  render() {
    console.log(this.state.filteredProgress)
     const {detailReport} = this.state
    return (
      <Container>
       <Spinner
          visible={this.props.isLoading}
          color="#DB1500"
        />
       <HeaderComp
          Left={<Left>
            <Button transparent onPress={()=>{Actions.pop()}}>
            <FontAwesomeIcon icon={faArrowLeft} style={{color: '#FFF', fontSize: 30}}/>
            </Button>
          </Left>}
          title="Detail  Laporan"
          Right={<Right>
             <Button transparent onPress={()=>{this.readyShare()}}>
              <Icon type="FontAwesome" name="share-alt-square" /> 
            </Button>
            </Right>
            /*<Right/>*/
          }
          style={{paddingTop:17}}
        />
          <Content>
           <View style={{paddingTop:10,paddingBottom:15, paddingLeft:10}}>
           <Grid>
                <Col width={50}><Text>No Laporan</Text></Col>
                <Col><Text>{detailReport.id}</Text></Col>
            </Grid>
             <Grid>
                <Col width={50}><Text>Jenis Laporan</Text></Col>
                <Col><Text>{detailReport.type}</Text></Col>
            </Grid>
             <Grid>
                <Col width={50}><Text>Kota/Kabupaten</Text></Col>
                <Col><Text>{detailReport.city}</Text></Col>
            </Grid>
             <Grid>
                <Col width={50}><Text>Tanggal Laporan</Text></Col>
                <Col><Text>{ Moment(detailReport.created_at).format('dddd, DD MMMM YYYY')}</Text></Col>
            </Grid>
             <Grid>
                <Col width={50}><Text>Status Terakhir</Text></Col>
                <Col><Text>{detailReport.status}</Text></Col>
            </Grid>
            <Grid>
                <Col width={50}><Text>Coordinate</Text></Col>
                <Col>
                <Text>{detailReport.latitude},{detailReport.longitude}</Text>
                 <TouchableOpacity  onPress={()=>{this.openMap(detailReport.latitude,detailReport.longitude)}}>
                    <Text style={{color: colors.default, fontWeight: '600'}}>Buka di Google Maps</Text>
                  </TouchableOpacity>
                </Col>
            </Grid>
            <Grid>
             
            </Grid>

           </View>
           <View style={{height:300,paddingBottom: 15}}>
                  <MapView
                       style={{flex: 1, ...StyleSheet.absoluteFillObject}}
                       initialRegion={this.state.mapRegion}
                        //region={this.state.mapRegion}
                        >
                       <MapView.Marker
                            coordinate={this.state.latlng}
                            title={"title"}
                            description={"description"}
                         />
                             
                  </MapView>
                  
            </View>
          <Grid>
            <ScrollView horizontal style={[ {paddingTop: 15, paddingLeft: 5, paddingBottom: 15}]}>
                  <View style={{marginRight:5}}>
                  {this.state.image1?
                     <TouchableOpacity onPress={()=>this.setModalVisible(true, 0)}>
                        <Image source={{uri: `${url(this.state.image1)}`}} style={[{width: 120, height: 120}]}/> 
                      </TouchableOpacity>
                    :null
                  }
                  </View>
                  <View style={{marginRight:5}}>
                  {this.state.image2?
                    <TouchableOpacity onPress={()=>this.setModalVisible(true, 1)}>
                      <Image source={{uri: `${url(this.state.image2)}`}} style={[{width: 120, height: 120}]}/> 
                    </TouchableOpacity>
                    :null
                  }
                  </View>

                  <View style={{marginRight:5}}>
                  {this.state.image3?
                    <TouchableOpacity onPress={()=>this.setModalVisible(true, 2)}>
                      <Image source={{uri: `${url(this.state.image3)}`}} style={[{width: 120, height: 120}]}/> 
                    </TouchableOpacity>
                    :null
                  }
                  </View>

                  <View style={{marginRight:5}}>
                  {this.state.image4?
                    <TouchableOpacity onPress={()=>this.setModalVisible(true, 3)}>
                    <Image source={{uri: `${url(this.state.image4)}`}} style={[{width: 120, height: 120}]}/> 
                    </TouchableOpacity>
                    :null
                  }
                  </View>

                  <View style={{marginRight:5}}>

                  {this.state.image5?
                    <TouchableOpacity onPress={()=>this.setModalVisible(true, 4)}>
                    <Image source={{uri: `${url(this.state.image5)}`}} style={[{width: 120, height: 120}]}/>  
                    </TouchableOpacity>
                    :null
                  }
                  </View>

                  <View style={{marginRight:5}}>

                  {this.state.image6?
                    <TouchableOpacity onPress={()=>this.setModalVisible(true, 5)}>
                    <Image source={{uri: `${url(this.state.image6)}`}} style={[{width: 120, height: 120}]}/> 
                    </TouchableOpacity>
                    :null
                  }
                  </View>

            </ScrollView>
          </Grid>
          <Separator bordered>
            <Text style={{fontSize:20}}>Progress</Text>
          </Separator>
            <FlatList
              data={this.state.filteredProgress}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => 
                <TouchableOpacity onPress={()=>{}}>
                 <View style={styles.container}>
                    <View style={{backgroundColor:"#F5F5F5",paddingLeft:15, paddingRight:15, paddingBottom : 20, paddingTop:15}}>
                    <Grid>
                      <Col>
                        <Text>Status  : {item.status}</Text>
                        <Text>Waktu Update : { Moment(item.created_at).format('dddd, DD MMMM YYYY')}</Text>
                        <Text>Oleh  : {item.updated_by}</Text>
                        <Text>Info  : {item.info}</Text>
                        <ScrollView horizontal style={[ {paddingTop: 15, paddingLeft: 5, paddingBottom: 15}]}>

                            <View style={{marginRight:5}}>
                              {item.status=='Selesai' && item.image1?
                                <TouchableOpacity onPress={()=>this.setModalVisibleDone(true, item.image1)}>
                                <Image source={{uri: `${url(item.image1)}`}} style={[{width: 120, height: 120}]}/>  
                                </TouchableOpacity>
                                :null
                              }
                            </View>
                            <View style={{marginRight:5}}>
                              {item.status=='Selesai' && item.image2?
                                <TouchableOpacity onPress={()=>this.setModalVisibleDone(true, item.image2)}>
                                <Image source={{uri: `${url(item.image2)}`}} style={[{width: 120, height: 120}]}/>  
                                </TouchableOpacity>
                                :null
                              }
                            </View>
                            <View style={{marginRight:5}}>
                              {item.status=='Selesai' && item.image3?
                                <TouchableOpacity onPress={()=>this.setModalVisibleDone(true, item.image3)}>
                                <Image source={{uri: `${url(item.image3)}`}} style={[{width: 120, height: 120}]}/>  
                                </TouchableOpacity>
                                :null
                              }
                            </View>
                          </ScrollView>
                      </Col>
                    </Grid>
                    </View>
                    
                  </View>
                </TouchableOpacity>
              }
            />
            <Label style={{paddingTop:10, paddingLeft:10}}>Tindak Lanjut</Label>
            <Item picker>
              <Picker
                mode="dropdown"
                iosIcon={<Icon name="arrow-down" />}
                style={{ width: undefined }}
                placeholder="Select your SIM"
                placeholderStyle={{ color: "#bfc6ea" }}
                placeholderIconColor="#007aff"
                selectedValue={this.state.selectedStatus}
                onValueChange={this.onStatusChange.bind(this)}
              >
                <Picker.Item label="Pilih Tindak Lanjut" value="" />
                <Picker.Item label="Laporan Ditolak" value="Laporan Ditolak" />
                <Picker.Item label="Laporan Diterima" value="Laporan Diterima" />
                <Picker.Item label="Proses Pengerjaan" value="Proses Pengerjaan" />
                <Picker.Item label="Selesai" value="Selesai" />
              </Picker>
            </Item>
            <Label style={{paddingTop:10, paddingLeft:10}}>Keterangan</Label>
            <Textarea  bordered 
                        style={{width:'95%', height:120, marginBottom:30,alignItems: 'center',
                              justifyContent: 'center',
                              alignSelf: 'center', }} 
                        //bordered={this.state.editor} 
                        //disabled={this.state.isTextArea} 
                        value={this.state.info}
                        onChangeText={text => {
                          this.setState({ info: text })
                      }}/>
            <Label style={{paddingLeft:10, marginBottom:10}}>{this.state.selectedStatus=='Selesai'?'foto setelah perbaikan':null}</Label>
            <View style={{marginBottom:30}}>
            {this.state.selectedStatus=='Selesai'?
             <Row style={[gs.centerAllFit]}>
                {/*poto 1*/}
                <Col>
                  <View>
                      {this.state.photo1 ? 
                     <TouchableOpacity onPress={()=>{
                                      this.setState({
                                        photo1: '',
                                      })
                                    }}>
                      <Icon name="close-circle" style={{color: '#ff4800', fontSize: 20,  zIndex:50,}}/>
                      </TouchableOpacity> 
                      :null
                      }
                      <TouchableOpacity  style={{marginRight:7}}onPress={()=>{this.selectPhotoTapped(1)}}>
                          {
                            this.state.photo1 == '' ? 
                              <View style={[styles.headerProfilePhoto, {backgroundColor:'grey', justifyContent:'center', alignItems:'center', borderRadius:5}]}>
                                <Icon name="camera" style={{color: 'white', fontSize: 60, fontWeight: '700'}}/>
                              </View>
                              :
                            <Image source={{uri: this.state.photo1}} style={styles.headerProfilePhoto}/>
                          }
                      </TouchableOpacity>
                  </View>
                </Col>
                {/*poto 2*/}
                <Col>
                  <View>
                      {this.state.photo2 ? 
                     <TouchableOpacity onPress={()=>{
                                      this.setState({
                                        photo2: '',
                                      })
                                    }}>
                      <Icon name="close-circle" style={{color: '#ff4800', fontSize: 20,  zIndex:50,}}/>
                      </TouchableOpacity> 
                      :null
                      }
                      <TouchableOpacity  style={{marginRight:7}}onPress={()=>{this.selectPhotoTapped(2)}}>
                          {
                            this.state.photo2 == '' ? 
                              <View style={[styles.headerProfilePhoto, {backgroundColor:'grey', justifyContent:'center', alignItems:'center', borderRadius:5}]}>
                                <Icon name="camera" style={{color: 'white', fontSize: 60, fontWeight: '700'}}/>
                              </View>
                              :
                            <Image source={{uri: this.state.photo2}} style={styles.headerProfilePhoto}/>
                          }
                      </TouchableOpacity>
                  </View>
                </Col>
                {/*poto 3*/}
                <Col>
                  <View>
                      {this.state.photo3 ? 
                     <TouchableOpacity onPress={()=>{
                                      this.setState({
                                        photo3: '',
                                      })
                                    }}>
                      <Icon name="close-circle" style={{color: '#ff4800', fontSize: 20,  zIndex:50,}}/>
                      </TouchableOpacity> 
                      :null
                      }
                      <TouchableOpacity  style={{marginRight:7}}onPress={()=>{this.selectPhotoTapped(3)}}>
                          {
                            this.state.photo3 == '' ? 
                              <View style={[styles.headerProfilePhoto, {backgroundColor:'grey', justifyContent:'center', alignItems:'center',borderRadius:5}]}>
                                <Icon name="camera" style={{color: 'white', fontSize: 60, fontWeight: '700'}}/>
                              </View>
                              :
                            <Image source={{uri: this.state.photo3}} style={styles.headerProfilePhoto}/>
                          }
                      </TouchableOpacity>
                  </View>
                </Col>
              </Row>
              :null
            }
            </View>
            <View style={[{marginBottom:50}]}>
                  <Button block  rounded light  style={[styles.buttonSave]} onPress={() => this.updateReport()}>
                      <Text style={{color: '#FFFFFF'}}>Simpan</Text>
                  </Button>
            </View>
         </Content>
         <Modal 
         visible={this.state.modalVisible} 
         transparent={true} 
         onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>
                <ImageViewer imageUrls={this.state.images}  index={this.state.indexZoom}/>
            </Modal>
          <Modal visible={this.state.modalVisibleDone} transparent={true}  onRequestClose={() => {
                this.setModalVisibleDone(!this.state.modalVisibleDone);
              }}>
                <ImageViewer imageUrls={this.state.imageDone}/>
            </Modal>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: "#E7E6ED",
      borderBottomWidth:1
    },
     buttonSave: {
      backgroundColor: "#DB1500",
      color: "#ffffff",
      width:"90%",
     textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    headerProfilePhoto:{
      width: 100, 
      height: 100,
    },

});


const mapStateToProps = ({report}) => {
  return {
      isLoading: report.isLoading,
      dataProgressAdmin: report.dataProgressAdmin,
      isUpdate: report.isUpdate,
      dataUpdate: report.dataUpdate
    }
}

mapDispatchToProps = dispatch => {
  return {
      fetchProgressByAdmin:(token,id_report) =>dispatch(fetchProgressByAdmin(token,id_report)),
      updateReportStatus:(token,params) =>dispatch(updateReportStatus(token,params)),
      reportAll:(token) =>dispatch(reportAll(token))
    
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailReportAdmin)
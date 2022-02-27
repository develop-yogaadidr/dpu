import React, {Component} from 'react';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, {AnimatedRegion, Marker, Polyline}  from 'react-native-maps'
import axios from 'axios'
import {addReport} from '../actions/ReportAction'
import Spinner from 'react-native-loading-spinner-overlay';

//import data_province from '../commons/data_province.json';
import { connect } from 'react-redux'
import {StyleSheet, Image, Modal, ToastAndroid, TouchableOpacity} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import 
{
    Container, 
    Content,
    Body,
    Text,
    Grid,
    Col,
    Badge,
    Header,
    Left,
    Right,
    Button,
    Icon,
    Title,
    List, 
    ListItem,
    Separator, 
    View,
    Fab,
    Item,
    Label,
    Form,
    Input,
    Textarea,
    Picker,
    Radio,
    Row
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeaderComp from '../commons/HeaderComp';
import { colors, size, fonts } from '../styles/skeleton'
import gs from '../styles/styles'
import ImagePicker from 'react-native-image-picker';

class ReportUser extends Component{
  constructor(props){
    super(props);

    this.state = {
      photo1: '',
      photo2: '',
      photo3: '',
      photo4: '',
      photo5: '',
      photo6: '',
      dataPhoto1: '',
      dataPhoto2: '',
      dataPhoto3: '',
      dataPhoto4: '',
      dataPhoto5: '',
      dataPhoto6: '',
      photoValue : 0,
      modalVisible:false,
      mapRegion: null,
      latitude: null,
      longitude: null,
      info: '',
      selectedRadio: '',
      poiLat:null,
      poiLong:null,
      poi:[],
      id_user:'',
      token:'',
      markers:[],
      selectedCity:'',
      polylines : []
    }
     this.mapRefForm = null
    this.onPoiClick = this.onPoiClick.bind(this)


  }
  selectedReport(value){
     this.setState({
              selectedRadio: value
            })
  }
  onCityChange(value) {
    this.setState({
      selectedCity: value
    });
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
              photoValue: photoValue + 1
            })
          }
          if(no===2){
            this.setState({
              photo2: source.uri,
              dataPhoto2: response,
              photoValue: photoValue + 1
            })
          }
          if(no===3){
            this.setState({
              photo3: source.uri,
              dataPhoto3: response,
              photoValue: photoValue + 1

            })
          }
          if(no===4){
            this.setState({
              photo4: source.uri,
              dataPhoto4: response,
              photoValue: photoValue + 1

            })
          }
          if(no===5){
            this.setState({
              photo5: source.uri,
              dataPhoto5: response,
              photoValue: photoValue + 1

            })
          }
          if(no===6){
            this.setState({
              photo6: source.uri,
              dataPhoto6: response,
              photoValue: photoValue + 1

            })
          }
        
        console.log('photo', this.state.photo1)
        console.log('uri', source)
      }
    });
  }
  selectDestination(data){
      console.log(data.structured_formatting.main_text)
      this.setState({ listViewDisplayed:false });
       axios.get('https://maps.googleapis.com/maps/api/geocode/json?address=' + data.description + '&key=AIzaSyBwbxMpU_eEr-u2ZUXECFh6leIm-UGVSeI')
        .then(response => {
          //console.log(response.data.results[0].geometry.location)
          let location = response.data.results[0].geometry.location;
          let coordinate = new AnimatedRegion({
            latitude: location.lat,
            longitude: location.lng
          })
          this.setState({poi:coordinate,
                         poiLat:location.lat, poiLong:location.lng
                        })
          /*this.marker.animateMarkerToCoordinate(
                    coordinate,
                    500
          );*/
            
          //let region = getRegionForCoordinates([{ latitude: location.lat,longitude: location.lng}])
          //console.log(region)
          //alert(JSON.Stringify(region))
           this.mapRefForm.animateToRegion({
            latitude: location.lat,
            longitude: location.lng,
            latitudeDelta: 0.0043,
            longitudeDelta:0.0043
          });


        })
        /*.then((response) =>{*/
         
        .catch(error => console.warn(error)); 
     
    }
  getDataUser = async () => {
    let token = await AsyncStorage.getItem('token')
    let id_user = await AsyncStorage.getItem('id_user')
    console.log(token,id_user)
    this.setState({ token, id_user})
  }
  componentDidMount() {
    this.getDataUser()

    this.watchID = navigator.geolocation.watchPosition((position) => {
      // Create the object to update this.state.mapRegion through the onRegionChange function
      let region = {
        latitude:       position.coords.latitude,
        longitude:      position.coords.longitude,
        latitudeDelta:  0.0043,
        longitudeDelta: 0.0043
      }
      this.onRegionChange(region, region.latitude, region.longitude);
    }, (error)=>console.log(error));
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

   onRegionChange(region, lastLat, lastLong) {
    this.setState({
      mapRegion: region,
      // If there are no new values set the current ones
      latitude: lastLat || this.state.lastLat,
      longitude: lastLong || this.state.lastLong
    });
    this.setState({
        markers: [ 
          { latlng:{latitude:lastLat, longitude: lastLong} }
        ]
      })
  }
  setModalVisible(visible) {

     let {
      photo1,
      photo2,
      photo3,
      photo4,
      photo5,
      photo6,
      photoValue
     } = this.state

     let sos=`${photo1}${photo2}${photo3}${photo4}${photo5}${photo6}`;
     console.log(sos)
    if(photoValue < 3 ){
      alert('mohon isi foto minimal 3 untuk melanjutkan ke tahap selanjutnya.')
    }else{
     this.setState({modalVisible: visible, 
                });
    }
    //this.setState({modalVisible: visible});
  }
  onPoiClick(e) {
      const poi = e.nativeEvent;
      //this.setState({poi});

      //alert(JSON.stringify(poi))
      //console.log(poi.coordinate.longitude)
      this.setState({
        latitude:poi.coordinate.latitude,
        longitude:poi.coordinate.longitude,
      });

       this.mapRefForm.animateToRegion({
            latitude: poi.coordinate.latitude,
            longitude: poi.coordinate.longitude,
            latitudeDelta: 0.0043,
            longitudeDelta:0.0043
          });
      //this.setState({poi: coordinate, poiLat:parseFloat(poi.coordinate.latitude), poiLong:parseFloat(poi.coordinate.longitude)})


      this.setState({
        markers: [ 
          { latlng: poi.coordinate }
        ]
      })
      //this.setState({ travelers: travelers })
  }
  validateForm(){
     let {
      photo1,
      photo2,
      photo3,
      photo4,
      photo5,
      photo6,
      latitude,
      longitude,
      info,
      selectedRadio,
      poiLat,
      poiLong,
      poi,
      photoValue,
      selectedCity
     } = this.state

    let sos=`${photo1}${photo2}${photo3}${photo4}${photo5}${photo6}`;

    
    if(selectedRadio == ''){
        return {
          valid: false,
          message: 'Silahkan pilih salah satu keluhan laporan'
        }
      }
    if(selectedCity == ''){
        return {
          valid: false,
          message: 'Silahkan pilih salah satu Kota/Kabupaten'
        }
      }
   

    return {
      valid: true
    }
  }
  saveReport(){
      let {
      photo1,
      photo2,
      photo3,
      photo4,
      photo5,
      photo6,
      dataPhoto1,
      dataPhoto2,
      dataPhoto3,
      dataPhoto4,
      dataPhoto5,
      dataPhoto6,
      info,
      selectedRadio,
      poiLat,
      poiLong,
      token,
      id_user,
      selectedCity,
      latitude,
      longitude
     } = this.state

     console.log(dataPhoto1)
     console.log(dataPhoto2)
     console.log(dataPhoto3)
     console.log(dataPhoto4)
     console.log(dataPhoto5)
     console.log(dataPhoto6)

     let valid = this.validateForm()
      if(valid.valid == true){
       
      let data = new FormData()
    
    /*  data.append('image1', {uri: dataPhoto1.uri, type: dataPhoto1.type, name: dataPhoto1.fileName})
      data.append('image2', {uri: dataPhoto2.uri, type: dataPhoto2.type, name: dataPhoto2.fileName})
      data.append('image3', {uri: dataPhoto3.uri, type: dataPhoto3.type, name: dataPhoto3.fileName})
      data.append('image4', {uri: dataPhoto4.uri, type: dataPhoto4.type, name: dataPhoto4.fileName})
      data.append('image5', {uri: dataPhoto5.uri, type: dataPhoto5.type, name: dataPhoto5.fileName})
      data.append('image6', {uri: dataPhoto6.uri, type: dataPhoto6.type, name: dataPhoto6.fileName})
    */
      
      if(photo1){
        data.append('image1',{uri: dataPhoto1.uri, type: dataPhoto1.type, name: dataPhoto1.fileName})
      }
      if (photo2) {
        data.append('image2', {uri: dataPhoto2.uri, type: dataPhoto2.type, name: dataPhoto2.fileName})
      }
      if(photo3){
        data.append('image3', {uri: dataPhoto3.uri, type: dataPhoto3.type, name: dataPhoto3.fileName})
      }
      if(photo4){
        data.append('image4', {uri: dataPhoto4.uri, type: dataPhoto4.type, name: dataPhoto4.fileName})
      }
      if (photo5) {
        data.append('image5', {uri: dataPhoto5.uri, type: dataPhoto5.type, name: dataPhoto5.fileName})

      }
      if (photo6) {
        data.append('image6', {uri: dataPhoto6.uri, type: dataPhoto6.type, name: dataPhoto6.fileName})

      }
      data.append('type', selectedRadio)
      data.append('latitude', latitude)
      data.append('longitude', longitude)
      data.append('info', info)
      data.append('id_user', id_user)
      data.append('city',selectedCity)


        console.log(data)

      this.props.addReport(token, data)
      }else{
        alert(valid.message)
      }
  }

  componentDidUpdate(prevProps){
     const {
      user
    } = this.state
    if (JSON.stringify(this.props.isAdd) !== JSON.stringify(prevProps.isAdd)) {
        //this.props.fetchUser(token,agentId)
          //console.log(this.props.dataLogin)
          if(this.props.dataAdd.success===true){
              ToastAndroid.show('Terima kasih, Laporan anda berhasil disimpan. kami akan segera meninjaklanjuti laporan anda', ToastAndroid.SHORT)
            this.setModalVisible(!this.state.modalVisible);
              Actions.pop()
          }else{
              ToastAndroid.show('Terjadi Kesalahan, silahkan ulang lagi', ToastAndroid.SHORT)
          }
        
      }
      
  }
  render() {

     
    return (
      <Container>
       <Spinner
          visible={this.props.isLoading}
          color="#DB1500"
        />
       <HeaderComp
          Left={<Left>
            <Button transparent onPress={()=>{Actions.pop()}}>
             <Icon name='arrow-back'/>
            </Button>
          </Left>}
          title="Input Laporan"
          Right={<Right/>}
          style={{paddingTop:17}}
        />
        <Content style={{paddingTop:100, paddingLeft:10}}>
          <Label style={{paddingLeft:15, fontSize:20, marginBottom:10}}>Masukan foto kondisi tempat(minimal 3)</Label>
          <Row style={[gs.centerAllFit]}>
          {/*poto 1*/}
            <Col>
            <View>
                {this.state.photo1 ? 
               <TouchableOpacity onPress={()=>{
                                this.setState({
                                  photo1: '',
                                  photoValue: this.state.photoValue - 1
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
                                   photoValue: this.state.photoValue - 1
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
                                   photoValue: this.state.photoValue - 1
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
          {/*poto 4*/}

          <Row style={[gs.centerAllFit,{marginTop:10}]}>
          <Col>
           <View>
              {this.state.photo4 ? 
               <TouchableOpacity onPress={()=>{
                                this.setState({
                                  photo4: '',
                                   photoValue: this.state.photoValue - 1
                                })
                              }}>
                <Icon name="close-circle" style={{color: '#ff4800', fontSize: 20,  zIndex:50,}}/>
                </TouchableOpacity> 
                :null
                }
              <TouchableOpacity  style={{marginRight:7}}onPress={()=>{this.selectPhotoTapped(4)}}>
                  {
                    this.state.photo4 == '' ? 
                      <View style={[styles.headerProfilePhoto, {backgroundColor:'grey', justifyContent:'center', alignItems:'center', borderRadius:5}]}>
                        <Icon name="camera" style={{color: 'white', fontSize: 60, fontWeight: '700'}}/>
                      </View>
                      :
                    <Image source={{uri: this.state.photo4}} style={styles.headerProfilePhoto}/>
                  }
              </TouchableOpacity>
            </View>
          </Col>
          <Col>
           <View>
              {this.state.photo5 ? 
               <TouchableOpacity onPress={()=>{
                                this.setState({
                                  photo5: '',
                                   photoValue: this.state.photoValue - 1
                                })
                              }}>
                <Icon name="close-circle" style={{color: '#ff4800', fontSize: 20,  zIndex:50,}}/>
                </TouchableOpacity> 
                :null
                }
              <TouchableOpacity  style={{marginRight:7}}onPress={()=>{this.selectPhotoTapped(5)}}>
                  {
                    this.state.photo5 == '' ? 
                      <View style={[styles.headerProfilePhoto, {backgroundColor:'grey', justifyContent:'center', alignItems:'center', borderRadius:5}]}>
                        <Icon name="camera" style={{color: 'white', fontSize: 60, fontWeight: '700'}}/>
                      </View>
                      :
                    <Image source={{uri: this.state.photo5}} style={styles.headerProfilePhoto}/>
                  }
              </TouchableOpacity>
            </View>
          </Col>
          <Col>
            <View>
              {this.state.photo6 ? 
               <TouchableOpacity onPress={()=>{
                                this.setState({
                                  photo6: '',
                                   photoValue: this.state.photoValue - 1
                                })
                              }}>
                <Icon name="close-circle" style={{color: '#ff4800', fontSize: 20,  zIndex:50,}}/>
                </TouchableOpacity> 
                :null
                }
              <TouchableOpacity  style={{marginRight:7}}onPress={()=>{this.selectPhotoTapped(6)}}>
                  {
                    this.state.photo6 == '' ? 
                      <View style={[styles.headerProfilePhoto, {backgroundColor:'grey', justifyContent:'center', alignItems:'center', borderRadius:5}]}>
                        <Icon name="camera" style={{color: 'white', fontSize: 60, fontWeight: '700'}}/>
                      </View>
                      :
                    <Image source={{uri: this.state.photo6}} style={styles.headerProfilePhoto}/>
                  }
              </TouchableOpacity>
            </View>
          </Col>
          </Row>
           <View style={[gs.centerAll]}>
            <View style={{marginTop:40}}>
             <TouchableOpacity style={{height:70}} onPress={()=>{this.setModalVisible(true)}} >
                
                    <View style={{
                        backgroundColor: "#ff4800", 
                        width:150, 
                        height:50, 
                        textAlign: 'center',
                        alignItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',}}>
                        <Text style={{color:'white'}}>Set Lokasi</Text>
                    </View>
                
              </TouchableOpacity>
            </View>
            </View>
        </Content>
         <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            this.setModalVisible(!this.state.modalVisible);
          }}>

          <Container style={{backgroundColor:'#F3F2FA'}}>
            <HeaderComp
              Left={<Left/>}
              title='Set Peta Lokasi'
              Right={<Right>
                <Button hasText transparent  onPress={() =>{ 
                  this.setModalVisible(!this.state.modalVisible)
                }}>
                  <Image source={require('../../assets/images/icons/close.png')} />
                </Button></Right>}
              backgroundStyle={{height:60}}
              style={{paddingBottom:25}}
            />
            
           
              <Content>
                <Label style={{marginLeft:15, marginTop:15}}>Pencarian Lokasi</Label>

                 <GooglePlacesAutocomplete
                    placeholder='Pencarian'
                    minLength={2} // minimum length of text to search
                    autoFocus={false}
                    returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                    listViewDisplayed={this.state.listViewDisplayed}    // true/false/undefined
                    fetchDetails={false}
                    renderDescription={row => row.description} // custom description render
                    onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                      //this.setState({ destination: data.description })
                      this.selectDestination(data)
                      console.log(data, details);
                    }}
                    
                    getDefaultValue={() => ''}
                    
                    query={{
                      // available options: https://developers.google.com/places/web-service/autocomplete
                      key: 'AIzaSyBwbxMpU_eEr-u2ZUXECFh6leIm-UGVSeI',
                      language: 'en', // language of the results
                      //types: '(cities)' // default: 'geocode'
                    }}
                    
                    styles={{
                      textInputContainer: {
                        width: '97%',
                        height:50,
                        backgroundColor:"#FFF",
                        alignSelf:'center',
                        borderTopWidth: 0,
                      },
                      textInput: {
                        marginLeft: 0,
                        marginRight: 0,
                        height: 40,
                        color: '#5d5d5d',
                        fontSize: 16
                      },
                      description: {
                        fontWeight: 'bold'
                      },
                      predefinedPlacesDescription: {
                        color: '#1faadb'
                      }
                    }}
                    
                    currentLocation={false} // Will add a 'Current location' button at the top of the predefined places list
                    currentLocationLabel="Current location"
                    nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                    GoogleReverseGeocodingQuery={{
                      // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                    }}
                    GooglePlacesSearchQuery={{
                      // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                      rankby: 'distance',
                      types: 'food'
                    }}

                    filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities

                    debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                    
                  />
                <Label style={{marginLeft:15, marginTop:15, marginBottom:5, fontSize:15}}>klik di peta untuk menandai lokasi</Label>
                <View style={{height:300}}>
                  <MapView
                       style={{flex: 1, ...StyleSheet.absoluteFillObject}}
                       initialRegion={this.state.mapRegion}
                        //region={this.state.mapRegion}
                        showsUserLocation={true}
                        onPress={this.onPoiClick}
                        onPoiClick={this.onPoiClick}
                        ref={(ref) => { this.mapRefForm = ref }}
                        
                        >
                         {
                            this.state.markers.map((marker, i) => (
                              <MapView.Marker key={i} coordinate={marker.latlng} 
                                   />
                            ))
                          }
                          
                        
                          {this.state.polylines.map((coordinates, i) => (
                              //console.log(i,coordinates)
                                    <MapView.Polyline
                                        key={i}
                                        coordinates={coordinates}
                                        strokeColor="#ff8800"
                                        strokeWidth={8}
                                        />
                                ))
                          }

                        
                  </MapView>
                  
                </View>

                <Label style={{paddingTop:10, paddingLeft:10}}>Tindak Lanjut</Label>
                <Item picker>
                  <Picker
                    mode="dropdown"
                    iosIcon={<Icon name="arrow-down" />}
                    style={{ width: undefined }}
                    placeholder="Pilih Kota"
                    placeholderStyle={{ color: "#bfc6ea" }}
                    placeholderIconColor="#007aff"
                    selectedValue={this.state.selectedCity}
                    onValueChange={this.onCityChange.bind(this)}
                  >
                    <Picker.Item label="Pilih Kota/Kabupaten" value="" />
                    <Picker.Item label="Kabupaten Banjarnegara" value="Laporan Ditolak" />
                    <Picker.Item label="Kabupaten Banyumas" value="Laporan Diterima" />
                    <Picker.Item label="Kabupaten Batang" value="Kabupaten Batang" />
                    <Picker.Item label="Kabupaten Blora" value="Kabupaten Blora" />
                    <Picker.Item label="Kabupaten Boyolali" value="Kabupaten Boyolali" />
                    <Picker.Item label="Kabupaten Brebes" value="Kabupaten Brebes" />
                    <Picker.Item label="Kabupaten Cilacap" value="Kabupaten Cilacap" />
                    <Picker.Item label="Kabupaten Demak" value="Kabupaten Demak" />
                    <Picker.Item label="Kabupaten Grobogan" value="Kabupaten Grobogan" />
                    <Picker.Item label="Kabupaten Jepara" value="Kabupaten Jepara" />
                    <Picker.Item label="Kabupaten Karanganyar" value="Kabupaten Karanganyar" />
                    <Picker.Item label="Kabupaten Kebumen" value="Kabupaten Kebumen" />
                    <Picker.Item label="Kabupaten Kendal" value="Kabupaten Kendal" />
                    <Picker.Item label="Kabupaten Klaten" value="Kabupaten Klaten" />
                    <Picker.Item label="Kabupaten Kudus" value="Kabupaten Kudus" />
                    <Picker.Item label="Kabupaten Magelang" value="Kabupaten Magelang" />
                    <Picker.Item label="Kabupaten Pati" value="Kabupaten Pati" />
                    <Picker.Item label="Kabupaten Pekalongan" value="Kabupaten Pekalongan" />
                    <Picker.Item label="Kabupaten Pemalang" value="Kabupaten Pemalang" />
                    <Picker.Item label="Kabupaten Purbalingga" value="Kabupaten Purbalingga" />
                    <Picker.Item label="Kabupaten Purworejo" value="Kabupaten Purworejo" />
                    <Picker.Item label="Kabupaten Rembang" value="Kabupaten Rembang" />
                    <Picker.Item label="Kabupaten Semarang" value="Kabupaten Semarang" />
                    <Picker.Item label="Kabupaten Sragen" value="Kabupaten Sragen" />
                    <Picker.Item label="Kabupaten Sukoharjo" value="Kabupaten Sukoharjo" />
                    <Picker.Item label="Kabupaten Tegal" value="Kabupaten Tegal" />
                    <Picker.Item label="Kabupaten Temanggung" value="Kabupaten Temanggung" />
                    <Picker.Item label="Kabupaten Wonogiri" value="Kabupaten Wonogiri" />
                    <Picker.Item label="Kabupaten Wonosobo" value="Kabupaten Wonosobo" />
                    <Picker.Item label="Kota Magelang" value="Kota Magelang" />
                    <Picker.Item label="Kota Pekalongan" value="Kota Pekalongan" />
                    <Picker.Item label="Kota Salatiga" value="Kota Salatiga" />
                    <Picker.Item label="Kota Semarang" value="Kota Semarang" />
                    <Picker.Item label="Kota Surakarta" value="Kota Surakarta" />
                    <Picker.Item label="Kota Tegal" value="Kota Tegal" />
                  </Picker>
                </Item>
                <Label style={{marginLeft:15, marginTop:15, marginBottom:5, fontSize:15}}>Keluhan</Label>

                 <ListItem onPress={()=>{this.selectedReport('Jalan Rusak')}}>
                    <Left>
                      <Text>Jalan Rusak</Text>
                    </Left>
                    <Right>
                      <Radio onPress={()=>{this.selectedReport('Jalan Rusak')}} selected={this.state.selectedRadio ==='Jalan Rusak' ? true : false} />
                    </Right>
                  </ListItem>
                  <ListItem onPress={()=>{this.selectedReport('Jembatan Rusak')}}>
                    <Left>
                      <Text>Jembatan Rusak</Text>
                    </Left>
                    <Right>
                      <Radio onPress={()=>{this.selectedReport('Jembatan Rusak')}} selected={this.state.selectedRadio ==='Jembatan Rusak' ? true : false} />
                    </Right>
                </ListItem>
                <ListItem onPress={()=>{this.selectedReport('Saluran Drainase')}}>
                    <Left>
                      <Text>Saluran Drainase</Text>
                    </Left>
                    <Right>
                      <Radio onPress={()=>{this.selectedReport('Saluran Drainase')}} selected={this.state.selectedRadio ==='Saluran Drainase' ? true : false} />
                    </Right>
                  </ListItem>
                <ListItem onPress={()=>{this.selectedReport('Lainnya')}}>
                    <Left>
                      <Text>Lainnya</Text>
                    </Left>
                    <Right>
                      <Radio onPress={()=>{this.selectedReport('Lainnya')}} selected={this.state.selectedRadio ==='Lainnya' ? true : false} />
                    </Right>
                </ListItem>
                <Label style={{marginLeft:15, marginTop:15, marginTop:15}}>Keterangan</Label>
                <View style={{paddingLeft: 15, paddingRight: 15, justifyContent: 'center'}}>

                        <Textarea  
                        style={{width:'100%', height:150, backgroundColor: 'white', marginBottom:30}} 
                        //bordered={this.state.editor} 
                        //disabled={this.state.isTextArea} 
                        value={this.state.info || ''}
                        onChangeText={text => {
                          this.setState({ info: text })
                      }}/>
                </View>
                <View style={{marginBottom:50}}>
                  <Button block  rounded light  style={styles.buttonSave} onPress={() => this.saveReport()}>
                      <Text style={{color: '#FFFFFF'}}>Laporkan</Text>
                  </Button>
                </View>
              </Content>

          </Container>
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
    
    },
    buttonSave: {
      backgroundColor: "#DB1500",
      color: "#ffffff",
    },
    headerProfilePhoto:{
      width: 100, 
      height: 100,
    },
     modal: {
      justifyContent: 'center',
      alignItems: 'center'
    },
    modal3: {
      height: 300,
      width: 300
    },
    footerList : {
        backgroundColor: "#E7E6ED",
    },
    header : {
      backgroundColor: "#DB1500",
    },
    footerText:{
        fontFamily: 'Zocial',
        fontSize: 12,
        color:'#9F9EA4',
    },
    destination:{
      fontFamily:'OpenSans',
      color:'#9F9EA4',
    },

    upIcon: {
      marginRight: 10
    },
    downIcon: {
      marginRight: 10
    },
    people:{
      fontSize: 12,
      color:'#9F9EA4',
      alignSelf: 'center'
    },
    budgePeople: {
      fontSize: 12,
      marginTop: 1,
    },
    imageHide: {
      position:'absolute',
      left: 0,
      top: '50%'
    },
    time:{
      marginBottom :20,
    },
    buttonSave: {
      backgroundColor: "#DB1500",
      color: "#ffffff",
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width:'90%'
    },
    buttonSaveTripByTemplate: {
      backgroundColor: "#DB1500",
      color: "#ffffff",
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
      width:'90%',
      marginBottom:30
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
    padding: 10
  },
  popupTitle: {
    fontSize: 18,
    color: '#313539',
    fontWeight: 'bold',
    marginVertical: 10
  },
  popupDesc: {
    fontSize: 14,
    color: '#313539',
    marginVertical: 10
  },
  successButton: {
    backgroundColor: '#1d86bf',
    marginVertical: 10,
    minHeight: 40,
    minWidth: 80,
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center'
  },
  successButtonText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold'
  },
  buttonCancel: {
        width:145,
        backgroundColor: "#EAEAEA",
        color: "#ffffff",
          textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
  buttonSaveNew: {
        width:165,
        backgroundColor: "#DB1500",
        color: "#ffffff",
         textAlign: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignSelf: 'center',
    },
});


const mapStateToProps = ({report}) => {
  return {
    isLoading: report.isLoading,
      isAdd: report.isAdd,
      dataAdd:report.dataAdd
    }
}

mapDispatchToProps = dispatch => {
  return {
      addReport:(token,params) =>dispatch(addReport(token,params))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReportUser)
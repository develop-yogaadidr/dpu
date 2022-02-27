import React, {Component} from 'react';

import {StyleSheet } from 'react-native';
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
    View
} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux'
import HeaderComp from '../commons/HeaderComp';
import gs from '../styles/styles'
import Moment from 'moment'

class NotificationDetail extends Component{
  constructor(props){
    super(props);
     this.state = {
      filteredReport:[],
      token:'',
      id_user:'',
      data:'',
      role:''
     
    }

  }

 async componentDidMount(){
    this.getDataUser()
     let data = this.props.dataNotification
      console.log(data)
     this.setState({data})

    //this.props.dataNotification.data_report.city

      let dataNotif = {...this.props.dataNotification};

      let output = {...dataNotif, read: 1}

      //alert(JSON.stringify(output))
      let dataNotification = await AsyncStorage.getItem('notification')
      let newnotif = JSON.parse(dataNotification);


      let yy=[...newnotif]
      //console.log(newnotif[0].body)

      newnotif.map((item, idx)=>{

        //console.log(JSON.parse(item))
        let notifBody=item.body
        let outputBody=output.body
        newnotif[idx] = {...item}
                if(JSON.stringify(notifBody)== JSON.stringify(outputBody)){
                  console.log('here')
                  newnotif[idx] = {...item, read:1};
                }
      })
      //newnotif.push(output)
      console.log(newnotif)
      console.log(JSON.stringify(newnotif))
      await AsyncStorage.setItem('notification', JSON.stringify(newnotif));

  }

  hangeDesc( value, desc ) {
     for (var i in projects) {
       if (projects[i].value == value) {
          projects[i].desc = desc;
          break; //Stop this loop, we found it!
       }
     }
  }

  componentDidUpdate(prevProps){
     
    if (JSON.stringify(this.props.dataNotification) !== JSON.stringify(prevProps.dataNotification)) {
        let data = this.props.dataNotification
        this.setState({data})
      }
      
  }


  getDataUser = async () => {
    let role = await AsyncStorage.getItem('role');

    this.setState({role}, () => {
    })
      
  }
 
  /*componentWillUnmount(){
    this._isMounted = false
  }*/

  render() {
   //let datar = JSON.parse(this.state.data.data_report)
    
    /* datarJSON.parse(item).data_report
    alert(datar.data_report.type)*/
    return (
      <Container>
       <Spinner
          visible={this.props.isLoading}
          color="#DB1500"
        />
       <HeaderComp
          Left={<Left>
            <Button transparent onPress={()=>{Actions.notificationList()}}>
             <Icon name='arrow-back'/>
            </Button>
          </Left>}
          title="Detail Notifikasi"
          Right={<Right/>}
          style={{paddingTop:17}}
        />
        <Content style={gs.contentPadding}>
          <View>
              <Text style={{fontSize: 18, fontWeight: '700'}}>{this.state.data.title}</Text>
              <Text>{this.state.data.body}</Text>
          </View>
          <View style={{paddingTop:10}}>
            <Grid>
                <Col width={50}><Text>Jenis Laporan</Text></Col>
                <Col><Text>{this.props.dataNotification.data_report.type}</Text></Col>
            </Grid>
            <Grid>
                <Col width={50}><Text>Kota/Kabupaten</Text></Col>
                <Col><Text>{this.props.dataNotification.data_report.city}</Text></Col>
            </Grid>
             <Grid>
                <Col width={50}><Text>Tanggal Laporan</Text></Col>
                <Col><Text>{ Moment(this.props.dataNotification.data_report.created_at).format('dddd, DD MMMM YYYY')}</Text></Col>
            </Grid>
             <Grid>
                <Col width={50}><Text>Status Terakhir</Text></Col>
                <Col><Text>{this.props.dataNotification.data_report.status}</Text></Col>
            </Grid>
            
          </View>
          <View style={[{marginBottom:50, marginTop:50}]}>
                  {this.state.role ==='admin'?
                  <Button block  rounded light  style={[styles.buttonSave]} onPress={() => Actions.detailReportAdmin({reportId:this.props.dataNotification.data_report.id, report:this.props.dataNotification.data_report})}>
                      <Text style={{color: '#FFFFFF'}}>Lihat Detail </Text>
                  </Button>
                  :
                  <Button block  rounded light  style={[styles.buttonSave]} onPress={() => Actions.detailReportUser({reportId:this.props.dataNotification.data_report.id, report:this.props.dataNotification.data_report})}>
                      <Text style={{color: '#FFFFFF'}}>Lihat Detail </Text>
                  </Button>
                  }
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
      backgroundColor: "#E7E6ED",
    
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
  linkMenuUser:{
    flex: 2,
    flexDirection: 'row',
    marginTop:15,
    alignSelf: 'center',
    alignItems: 'center',
    backgroundColor: "#ff4800",
    paddingLeft:20,
    paddingRight:20,
    borderRadius:5

  },
  textMenu:{
    textAlign: 'left',
    color:"white",
    fontSize:16,
    fontFamily:'OpenSans'
  },
});


const mapStateToProps = ({report}) => {
  return {
     
    }
}

mapDispatchToProps = dispatch => {
  return {
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotificationDetail)
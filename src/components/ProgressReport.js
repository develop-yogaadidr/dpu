import React, {Component} from 'react';
import {reportByUser} from '../actions/ReportAction'
import Spinner from 'react-native-loading-spinner-overlay';

import { connect } from 'react-redux'
import {StyleSheet, FlatList, TouchableOpacity} from 'react-native';
import ListView from "deprecated-react-native-listview";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

import 
{
    Container, 
    Content,
    Text,
    Col,
    Left,
    Right,
    Button,
    Icon,
    Row
} from 'native-base';
import { Actions } from 'react-native-router-flux';
import HeaderComp from '../commons/HeaderComp';
import { colors } from '../styles/skeleton'
import gs from '../styles/styles'
import Moment from 'moment'
import 'moment/locale/id';
Moment.locale('id');

class ProgressReport extends Component{
  constructor(props){
    super(props);

    this.state = {
      filteredReport:[],
      token:'',
      id_user:''
     
    }
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 });

  }

  componentDidMount(){
    this.getDataUser()
    this.setState({filteredReport: this.props.dataReportUser.message});
  }
  getDataUser = async () => {

    let token = await AsyncStorage.getItem('token');
    let id_user = await AsyncStorage.getItem('id_user');

    console.log(token)
    this.setState({ token, id_user}, () => {
      this.props.reportByUser(token, id_user)

    })
  }

  componentDidUpdate(prevProps) {
      if (JSON.stringify(this.props.dataReportUser) !== JSON.stringify(prevProps.dataReportUser)) {
       this.setState({filteredReport: this.props.dataReportUser.message});
      }
  }
  
  render() {
    console.log(this.state.filteredReport)
     
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
          title="Progress Laporan"
          Right={<Right/>}
          style={{paddingTop:17}}
        />
          <Content>
            <FlatList
              data={this.state.filteredReport}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => 
                <TouchableOpacity key={item.id} onPress={()=>{Actions.detailReportUser({reportId:item.id,report:item})}}>
                  <Row style={[gs.contentPadding, styles.transactionList, {backgroundColor:'#F5F5F5', marginBottom:3}]} >
                    <Col>
                      <Row>
                        <Col><Text style={{color: colors.backgroundGrayContainerText}}>No : </Text></Col>
                        <Col><Text style={{color: colors.backgroundGrayContainerText}}>{item.id}</Text></Col>
                      </Row>
                       <Row>
                        <Col><Text style={{color: colors.backgroundGrayContainerText}}>Jenis : </Text></Col>
                        <Col><Text style={{color: colors.backgroundGrayContainerText}}>{item.type}</Text></Col>
                      </Row>
                       <Row>
                        <Col><Text style={{color: colors.backgroundGrayContainerText}}>Waktu : </Text></Col>
                        <Col><Text style={{color: colors.backgroundGrayContainerText}}>{ Moment(item.created_at).format('dddd, DD MMMM YYYY')}</Text></Col>
                      </Row>
                       <Row>
                        <Col><Text style={{color: colors.backgroundGrayContainerText}}>Status Terakhir : </Text></Col>
                        <Col><Text style={{color: colors.backgroundGrayContainerText}}>{item.status}</Text></Col>
                      </Row>
                      <Row style={[gs.centerAll]}>
                        <Col style={[gs.alignRight]}>
                          <TouchableOpacity  onPress={()=>{Actions.detailReportUser({reportId:item.id,report:item})}}>
                            <Text style={{color: colors.primary, fontWeight: '600'}}>Selengkapnya</Text>
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
              }
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
      backgroundColor: "#E7E6ED",
      borderBottomWidth:1
    },

});


const mapStateToProps = ({report}) => {
  return {
      isLoading: report.isLoading,
      dataReportUser: report.dataReportUser
    }
}

mapDispatchToProps = dispatch => {
  return {
      reportByUser:(token,id_user) =>dispatch(reportByUser(token,id_user))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProgressReport)
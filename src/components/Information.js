import React, {Component} from 'react';
import HTMLView from 'react-native-htmlview';
import {StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {Container, Content, Left, Right, Button, Icon} from 'native-base';
import Spinner from 'react-native-loading-spinner-overlay';

import {Actions} from 'react-native-router-flux';
import {connect} from 'react-redux';
import HeaderComp from '../commons/HeaderComp';
import gs from '../styles/styles';
import {fetchInformation} from '../actions/PagesAction';
import {FontAwesomeIcon} from '@fortawesome/react-native-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons';

class Information extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredReport: [],
      token: '',
      data: '',
    };
  }

  componentDidMount() {
    //console.log()
    this.setState({
      data: this.props.dataInformation.text,
    });
    this.getDataUser();
  }

  getDataUser = async () => {
    this._isMounted = true;
    let token = await AsyncStorage.getItem('token');

    console.log(token);
    if (this._isMounted) {
      this.setState({token}, () => {
        this.props.fetchInformation(token);
      });
    }
  };
  componentDidUpdate(prevProps) {
    if (
      JSON.stringify(this.props.dataInformation) !==
      JSON.stringify(prevProps.dataInformation)
    ) {
      this.setState({
        data: this.props.dataInformation.text,
      });
      console.log(this.props.dataInformation);
    }
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
                  Actions.pop();
                }}>
                <FontAwesomeIcon icon={faArrowLeft} style={{color: '#FFF', fontSize: 30}}/>
              </Button>
            </Left>
          }
          title="Informasi"
          Right={<Right />}
          style={{paddingTop: 17}}
        />
        <Content style={[gs.contentPadding]}>
          <HTMLView value={this.state.data} />
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

const mapStateToProps = ({page}) => {
  return {
    isLoading: page.isLoading,
    dataInformation: page.dataInformation,
  };
};

mapDispatchToProps = dispatch => {
  return {
    fetchInformation: token => dispatch(fetchInformation(token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Information);

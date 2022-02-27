import React from "react";
import {ImageBackground, Platform, StatusBar, StyleSheet, NetInfo} from 'react-native'
import { Header, Body, Title , View, Separator, Text} from 'native-base';

export default class HeaderComp extends React.Component {
  constructor(props){
    super(props);

    this.state = {
        status:null
    };

  }
  

render() {

    return (
      <View>
        <ImageBackground  source={require('../../assets/images/header_bg.png')} style={[styles.backgroundStyle, this.props.backgroundStyle]}>
          <Header style={[styles.headerStyle, this.props.style]}
            hasTabs = {this.props.hasTabs}
          >
            {this.props.Left}
              <Body style={{flex: 3}}>
                <Title style={[styles.title, this.props.titleStyle]}>
                  {this.props.title}
                </Title>
              </Body>
            {this.props.Right}
          </Header>
          <StatusBar
              backgroundColor={'transparent'}
              barStyle="light-content"
              translucent
            />
        </ImageBackground>

      </View>
      )

}
}
const styles = StyleSheet.create({
  headerStyle: {
    backgroundColor: 'transparent',
    elevation: 0,             
    shadowOpacity: 0,
    borderBottomWidth: 0,
    paddingTop:17,
   
    marginTop: Platform.OS === 'ios' ? undefined : 10
  }, 
  title: {
    color: 'white',
    fontFamily:'OpenSans',
    fontSize: 20,
    
    //fontWeight: '500',
    marginLeft:50,
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    alignSelf: 'center'

  },
  backgroundStyle: {
    width: '100%', 
    height: Platform.OS === 'ios' ? 75 : 75,
  }
})

//export {HeaderOrange};
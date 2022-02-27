import React from "react";
import {Platform, View, Text, Alert} from 'react-native'
import { Footer, FooterTab, Button, Icon } from 'native-base';
import { colors } from '../styles/skeleton'
import {Actions} from 'react-native-router-flux'
const FooterComp = (props) => {
  return (
    <Footer>
      <FooterTab style={styles.footerTab}>
        <Button onPress={()=>{
            if(Actions.currentScene == 'payout'){
              Alert.alert('Warning', 'You are going to leave payout and loss your cart. Are you sure?', [
                {
                  text: 'No', onPress: () => {
                    //
                  }
                },
                {
                  text: 'Yes', onPress: () => {
                    //
                    Actions.reset('transactionList')
                  }
                }
              ])
            }else{
              Actions.transactionList()
            }
            
          }}>
          <Icon active name="pricetags" style={props.transaction ? styles.footerIconActive : styles.footerIcon}/>
          <Text style={props.transaction ? styles.footerTextActive : styles.footerText}> Transaction </Text>
        </Button>
        {/* <Button>
          <Icon name="cube" style={props.purchase ? styles.footerIconActive : styles.footerIcon}/> 
          <Text style={props.purchase ? styles.footerTextActive : styles.footerText}> Purchase </Text>
        </Button> */}
        <Button onPress={()=>{
          if(Actions.currentScene == 'payout'){
            Alert.alert('Warning', 'You are going to leave payout and loss your cart. Are you sure?', [
              {
                text: 'No', onPress: () => {
                  //
                }
              },
              {
                text: 'Yes', onPress: () => {
                  //
                  Actions.reset('report')
                }
              }
            ])
          }else{
            Actions.report()
          }
          
          }}>
          <Icon name="pie" style={props.report ? styles.footerIconActive : styles.footerIcon}/> 
          <Text style={props.report ? styles.footerTextActive : styles.footerText}> Report </Text>
        </Button>
        <Button onPress={()=>{
          if(Actions.currentScene == 'payout'){
            Alert.alert('Warning', 'You are going to leave payout and loss your cart. Are you sure?', [
              {
                text: 'No', onPress: () => {
                  //
                }
              },
              {
                text: 'Yes', onPress: () => {
                  //
                  Actions.reset('more')
                }
              }
            ])
          }else{
            Actions.more()
          }
          
          }}>
          <Icon name="menu" style={props.menus ? styles.footerIconActive : styles.footerIcon}/>
          <Text style={props.menus ? styles.footerTextActive : styles.footerText}> More </Text>
        </Button>
      </FooterTab>
    </Footer>
  );
};

const styles = {
	footerTab: {
    backgroundColor: 'white', 
    paddingTop:0
  },
  footerButtonActive: {
    backgroundColor: colors.primary, marginTop:0
  },
  footerIcon: {
    color: '#aab7c3'
  },
  footerText:{
    color: '#aab7c3',
    fontSize: 12
  },
  footerIconActive: {
    color: colors.primary
  },
  footerTextActive:{
    color: colors.primary,
    fontSize: 12
  }
};

export {FooterComp};

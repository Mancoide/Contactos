import React, {useRef, useCallback, useState} from 'react';
import { 
     View,
     ScrollView, 
     TextInput, 
     Text,
     StyleSheet
} from 'react-native';
import { Button, Box, NativeBaseProvider } from 'native-base';
import Styles from '../css/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const home = () => {

     const textInputRef = useRef();
     const [disableSubmit, setDisableSubmit] = useState(true);
     
     const updateInputsProps = useCallback(() => {

          if(textInputRef.current.isFocused()) 
          {
               textInputRef.current.setNativeProps({ style: {borderColor: '#0891b2'} })
          } else 
          {
               textInputRef.current.setNativeProps({ style: {borderColor: '#737373'} })
          }
     }, []);

     const submitSync = () => {
          
     }

     const changeUrl = (text) => {
          if(text !== '')
          {
               // console.log(document.getElementById('button_submit'))
               setDisableSubmit(false)
          }
          else
          {
               setDisableSubmit(true)
          }
     }

     return (
          <ScrollView style={Styles.form}>
               <View>
                    <Text>Ingrese URL</Text>
                    <TextInput
                         ref={textInputRef}
                         style={Styles.input}
                         placeholder={'www.example.com'}
                         onFocus={ updateInputsProps }
                         onBlur={ updateInputsProps }
                         onChangeText={ text => changeUrl(text) }
                    />
               </View>
               <View style={Styles.view}>
                    <NativeBaseProvider>
                         <Box>
                              <Button key='sm' size='sm' id="button_submit" isDisabled={disableSubmit} onClick={submitSync}>
                                   Sincronizar
                              </Button>
                         </Box>
                    </NativeBaseProvider>
               </View>
          </ScrollView>
     );
};

export default home;
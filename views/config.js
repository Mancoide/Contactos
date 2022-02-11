import React, {useRef, useCallback} from 'react';
import { 
     NativeBaseProvider,
     ScrollView,
     View, 
     Text, 
    
} from 'native-base';
import Styles from '../css/styles';
import ConfigInputs from '../components/inputs';

const config = () => {

     return (
          <NativeBaseProvider>
               <ScrollView style={Styles.form}>
                    <View>
                         <Text fontSize="3xl">Header</Text>
                    </View>
                    <ConfigInputs type_inputs="header" />

                    <View pt="30">
                         <Text fontSize="3xl">Body</Text>
                    </View>
               </ScrollView>
          </NativeBaseProvider>
     );
};

export default config;


import { View,  
    Text,
    AddIcon,
    CloseIcon,
    Button,
    useContrastText,
    Center,
} from 'native-base';
import React, {useState, useRef, useEffect} from 'react';
import { TextInput } from 'react-native';
import Styles from '../css/styles';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ConfigInputs = ({ type_inputs }) => 
{   
    const [number, setNumber] = useState(0);
    const keyRefs = useRef([]);
    const valueRefs = useRef([]);
    const butonRefs = useRef([]);
    const keyTextRefs = useRef([]);
    const valueTextRefs = useRef([]);
    const colorContrastDark = useContrastText("gray.900");

    useEffect( () => {
        const getText = async () => {
            try {
                const keyTexts = await AsyncStorage.getItem('keyTextValues'+type_inputs)
                const valueText = await AsyncStorage.getItem('valueTextValues'+type_inputs)

                if(keyTexts !== null) 
                {
                    const keyTextsArray = JSON.parse(keyTexts)
                    keyTextRefs.current = keyTextsArray;
                }

                if(valueText !== null) 
                {
                    const textsArray = JSON.parse(valueText)
                    valueTextRefs.current = textsArray;
                    setNumber(textsArray.length)
                }

            } catch (error) {
                console.log(error)
            }
        }

        getText();
    }, []);

    const saveInputsValues = async () => {
        try {
            await AsyncStorage.setItem('keyTextValues'+type_inputs, JSON.stringify(keyTextRefs.current))
            await AsyncStorage.setItem('valueTextValues'+type_inputs, JSON.stringify(valueTextRefs.current))
          } catch (error) {
            console.log(error)
          }
    }

    const addInputs = () => {
        // inputRefs.push('hola')
        setNumber(value => value + 1)
    }

    const updateInputsProps = (position, type, typeInput) => {

        if(type === 'key') 
        {
            if(keyRefs.current[position].type_input === typeInput && keyRefs.current[position].objets.isFocused()) 
            {
                keyRefs.current[position].objets.setNativeProps({ style: {borderColor: '#0891b2'} })
            } else 
            {
                keyRefs.current[position].objets.setNativeProps({ style: {borderColor: '#737373'} })
            }

        } 
        else 
        {
            if(valueRefs.current[position].type_input === typeInput && valueRefs.current[position].objets.isFocused()) 
            {
                valueRefs.current[position].objets.setNativeProps({ style: {borderColor: '#0891b2'} })
            } else 
            {
                valueRefs.current[position].objets.setNativeProps({ style: {borderColor: '#737373'} })
            }
        }
       
    };

    const deleteInputs = (position, typeInput) => 
    {
        if(keyRefs.current[position].type_input === typeInput) 
        {
            keyRefs.current.splice(position, 1);
        } 

        if(valueRefs.current[position].type_input === typeInput) 
        {
            keyRefs.current.splice(position, 1);
        }

        keyTextRefs.current.splice(position, 1);
        valueTextRefs.current.splice(position, 1);

        setNumber(value => value - 1)
    }

    const inputArray: JSX.Element[] = [];
    for(let index = inputArray.length; index < number; index++) 
    {
        inputArray.push(
            <View key={index}>
                {   
                    <>
                        <View pt="30" />
                        <Button leftIcon={<CloseIcon size="4" />} bg={`red.500`} variant="solid"  
                            _text={{color: colorContrastDark}} 
                            ref={ element => butonRefs.current[index] = {type_input:type_inputs , objets:element} } 
                            onPress={() => deleteInputs(index, type_inputs)}
                        />
                    </> 
                }
                <TextInput 
                    defaultValue={ keyTextRefs.current[index] && keyTextRefs.current[index].type_input == type_inputs ? keyTextRefs.current[index].text : ''}
                    placeholder='Key'
                    ref={ element => keyRefs.current[index] = {type_input:type_inputs , objets:element} }
                    style={Styles.input}
                    onFocus={ () => updateInputsProps(index, "key", type_inputs) }
                    onBlur={ () =>  updateInputsProps(index, "key", type_inputs) }
                    onChangeText={ keyValue => keyTextRefs.current[index] = {type_input:type_inputs, text: keyValue } }
                    Key={index}
                />
                <TextInput 
                    defaultValue={ valueTextRefs.current[index] && valueTextRefs.current[index].type_input == type_inputs ? valueTextRefs.current[index].text : '' }
                    multiline
                    placeholder='Value'
                    ref={ elementVal => valueRefs.current[index] = {type_input:type_inputs , objets:elementVal} }
                    style={Styles.input}
                    onFocus={ () =>  updateInputsProps(index, "value", type_inputs) }
                    onBlur={ () =>  updateInputsProps(index, "value", type_inputs) }
                    onChangeText={ value => valueTextRefs.current[index] = {type_input:type_inputs, text: value } }
                    Key={index}
                />
            </View>
        );
    }

    return (
        <>
            {
               inputArray.length > 0 ? inputArray : <View style={Styles.view}>
                    <Center>
                        <Text _text={{
                            fontWeight: "bold"
                        }}>No hay parametros.</Text>
                    </Center>
               </View>
            }
            <View style={Styles.view}>
                <Button 
                    leftIcon={<AddIcon name="add" size="xs" />} size="xs" 
                    onPress={ () => addInputs()}
                >
                    Agregar
                </Button>
            </View>

            <View style={Styles.view}>
                <Button 
                    onPress={ () => saveInputsValues()}
                >
                    Guardar
                </Button>
            </View>
        </>
    );
}


export default ConfigInputs;

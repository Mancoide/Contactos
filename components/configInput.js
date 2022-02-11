import React, { useRef, useState } from 'react';

const ConfigInputs = () => {

    const username = useRef();

    return (
        <>
            <TextInput 
                defaultValue={ keyTextRefs.current[index] && keyTextRefs.current[index].type_input == type_inputs ? keyTextRefs.current[index].text : ''}
                placeholder='Usuario'
                ref={ element => .current =  element}
                style={Styles.input}
                onFocus={ () => updateInputsProps(index, "key", type_inputs) }
                onBlur={ () =>  updateInputsProps(index, "key", type_inputs) }
                onChangeText={ keyValue => keyTextRefs.current[index] = {type_input:type_inputs, text: keyValue } }
                Key={index}
            />
        </>
    )
}

export default ConfigInputs;
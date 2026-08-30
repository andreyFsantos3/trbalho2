import React, {useState}from 'react'
import {Text, View, Button, } from 'react-native'


export default()=>{
    let [text, adiciona] = useState ("faama");

    function add (){
        adiciona(text += "A")
        
    }

      function addB (){
        adiciona(text += "B")
        
    }

    return(
        <View>
            <Text>{text}</Text>
            <Button
                title= 'A'
                onPress={add}
            />
            <Button
                title= 'B'
                onPress={addB}
            />
        </View>
    )
}
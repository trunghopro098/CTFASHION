import React from "react";
import {View} from "react-native";
import Label, {Orientation} from "react-native-label";

export default function Test2(){
    return(
        <View>
                 <Label
    orientation={Orientation.TOP_RIGHT}
    containerStyle={{ 
      width: 100,
      height: 100,
    }}
    
    title="31%"
    color="red"
    distance={10}
    extent={0.0}
    style={{ fontSize: 13, color: 'white', textAlign: 'center', alignItems: 'center', justifyContent: 'center' }}
    ratio={0.2}
  >
    <View
      style={{
        flex: 1,
        backgroundColor: "green",
      }}
    />
  </Label>
      </View>
    )

};
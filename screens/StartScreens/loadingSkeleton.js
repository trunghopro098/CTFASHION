import React from "react";
import {View, Text} from 'react-native';
import SkeletonContent from "react-native-skeleton-content";


export default function LoadingSkeleton(){
 return (
     <View>
         

    <SkeletonContent
    containerStyle={{flex: 1, width: 300}}
    isLoading={true}
    layout={[
    { width: 220, height: 20, marginBottom: 6 },
    { width: 180, height: 20, marginBottom: 6 },
    ]}
    >

    <Text style={styles.normalText}>
        Your content
    </Text>

    <Text style={styles.bigText}>
        Other content
    </Text>

</SkeletonContent>
</View>

 )
}
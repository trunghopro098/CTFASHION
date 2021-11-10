import React from 'react';
import {FlatList,ScrollView} from 'react-native';
// import { ScrollView } from 'react-native-gesture-handler';
export default function VirtualizedView(props) {
    return(
      <ScrollView 
      
      // nestedScrollEnabled
        contentContainerStyle={{ paddingTop:90,elevation:5 }}
        onScroll={(e)=>{
          props.setValue(e);
        }} 
      >
        {props.children}
      </ScrollView>
    )
    // return (
    //   <FlatList
    //     bounces={false}
    //     data={[]}
    //     contentContainerStyle={{ paddingTop:90,elevation:5 }}
    //     scrollEventThrottle={16}
    //     ListEmptyComponent={null}
    //     keyExtractor={() => "dummy"}
    //     renderItem={null}
    //     onScroll={(e)=>{
    //       props.setValue(e);
    //     }}
    //     ListHeaderComponent={() => (
    //       <React.Fragment>{props.children}</React.Fragment>
    //     )}
    //   >
        
    //   </FlatList>
    // );
  }
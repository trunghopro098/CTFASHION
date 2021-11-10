import React from "react";
import { View, Text, StyleSheet, FlatList} from "react-native";

export default function GetfullProduct(props){


    const renderItem = ({item})=>{
        return(
            <View>
                <Text>{item.name}</Text>
            </View>
        )
    }

    return(
        <View>
            {/* <FlatList
                    removeClippedSubviews={true}
                    nestedScrollEnabled={true}
                    initialNumToRender={2}
            numColumns={2}
            data={props.DatafullProduct}
            keyExtractor={item=>item.id}
            renderItem={renderItem}
            /> */}
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex:1,
        backgroundColor: 'white',

    }
})
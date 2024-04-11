import MaskedView from "@react-native-masked-view/masked-view";
import { Text, View } from "react-native";

export default function MaskedViewText() {
  return (
    <MaskedView
      style={{ flex: 1, flexDirection: 'row' }}
      maskElement={
        <View
          style={{
            // Transparent background because mask is based off alpha channel.
            backgroundColor: 'transparent',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            AI Apex
          </Text>
        </View>
      }
    >

      {/* Shows behind the mask, you can put anything here, such as an image */}
      <View style={{ flex: 1, height: '100%', backgroundColor: '#324376' }} />
      <View style={{ flex: 1, height: '100%', backgroundColor: '#F5DD90' }} />
      <View style={{ flex: 1, height: '100%', backgroundColor: '#F76C5E' }} />
      <View style={{ flex: 1, height: '100%', backgroundColor: '#000' }} />


    </MaskedView>)
}
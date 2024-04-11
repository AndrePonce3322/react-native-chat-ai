import { Edit, Menu, Sparkles } from "lucide-react-native";
import { Pressable, Text, View } from "react-native";

export default function Header() {
  return (
    <View className="mt-5 flex-row justify-between items-center px-1">
      <Menu size={26} color={'black'} />
      <Pressable className="h-[32px] bg-black/5 rounded px-4 flex flex-row items-center justify-center">
        <Text className="font-bold3" >AI Apex</Text>
        <Sparkles size={16} color={'black'} className="ml-2" />
      </Pressable>
      <Edit size={26} color={'black'} />
    </View>
  )
}
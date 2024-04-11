import { ActivityIndicator, Image, Text, View } from "react-native";

export default function MessageCard({ role, message, status }: { role: string, message: string, status?: 'loading' | 'success' }) {

  const isBot = role === 'CHATBOT';

  const images = {
    bot: 'https://chort.vercel.app/sgyr6',
    user: 'https://www.xtrafondos.com/wallpapers/deadpool-logo-minimalista-12233.jpg',
  }

  return (
    <View className='flex flex-row mb-3 mt-5'>

      <Image className="w-7 rounded-full aspect-square" source={{
        uri: isBot ? images.bot : images.user,
      }} />

      <View className='flex-1 ml-2 align-text-top'>
        <Text className='font-medium text-gray-800'>{isBot ? 'AI APEX' : 'You'}</Text>

        <Text className='text-black' selectable>{message}</Text>

        {status === 'loading' && (
          <View className="flex items-start relative -mt-3">
            <ActivityIndicator size='small' color='#B4B4B8' />
          </View>
        )}
      </View>
    </View>
  )
}

// https://chort.vercel.app/sgyr6 -> Bot
// https://www.xtrafondos.com/wallpapers/deadpool-logo-minimalista-12233.jpg -> User
// 
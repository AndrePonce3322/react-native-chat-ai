import Constanst from 'expo-constants';
import { StatusBar } from 'expo-status-bar';
import { Brain, Headphones, SendHorizonal } from 'lucide-react-native';
import { createRef, useEffect, useState } from 'react';
import { BackHandler, NativeSyntheticEvent, Pressable, ScrollView, TextInput, TextInputContentSizeChangeEventData, ToastAndroid, Vibration, View } from 'react-native';
import Header from './components/header';

import { useBackHandler } from '@react-native-community/hooks';
import MessageCard from './components/message-card';
import { ChatAI } from './types/chat';

interface Message {
  role: 'USER' | 'CHATBOT',
  message: string
}

export default function App() {

  const [messageStatus, setMessageStatus] = useState('' as | 'loading' | 'success')

  // Input
  const [inputHeight, setInputHeight] = useState(50)
  const [inputText, setInputText] = useState('')

  const [BackPressCount, setBackPressCount] = useState(0);

  // Chat
  const [chatHistory, setChatHistory] = useState<Array<Message>>([])

  // Ref
  const scrollViewRef = createRef<ScrollView>()

  const sendMessage = async (message: string) => {

    if (!message) return
    setMessageStatus('loading')

    // Limpiar el input
    setInputText('')
    Vibration.vibrate(100)
    setInputHeight(50) // Reset the input height
    setChatHistory([...chatHistory, { role: 'USER', message }])
    const res = await fetch('https://chatai-api.vercel.app/api/hello', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ text: message })
    })

    const data = await res.json() as ChatAI
    // Send to the chat history
    setChatHistory(prevHistory => [...prevHistory, { role: 'CHATBOT', message: data.text }])

    // Set the message status
    setMessageStatus('success')
  }

  const handleContentSizeChange = (e: NativeSyntheticEvent<TextInputContentSizeChangeEventData>) => {
    setInputHeight(e.nativeEvent.contentSize.height)
  }

  useEffect(() => {
    (async () => {
      const res = await fetch('https://chatai-api.vercel.app/api/hello')

      const data = await res.json() as ChatAI
      // Send to the chat history
      setChatHistory(data.chatHistory)
    })()
  }, [])

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [chatHistory])

  // @ts-ignore
  useBackHandler(() => {
    if (BackPressCount == 0) {
      ToastAndroid.show("Pulsa de nuevo para salir", ToastAndroid.SHORT)
      setBackPressCount(1)

      const timer = setTimeout(() => {
        setBackPressCount(0)
      }, 2000)

      return () => {
        clearTimeout(timer)
        return true
      }
    } else if (BackPressCount == 1) {
      BackHandler.exitApp()
    }

    return true
  })

  const isMessagesInView = chatHistory.length > 0;

  return (
    <View className={`flex-1`} style={{ marginTop: Constanst.statusBarHeight, paddingHorizontal: 8 }}>
      <StatusBar style="auto" />

      <Header />

      {!isMessagesInView ? (
        <View className='flex-1 items-center justify-center flex mb-3'>
          <View className='flex items-center justify-center bg-black p-2 rounded-full'>
            <Brain fill='white' color='black' strokeWidth={1} absoluteStrokeWidth size={33} />
          </View>
        </View>
      ) : (
        <ScrollView ref={scrollViewRef} className='my-3' showsVerticalScrollIndicator={false} >
          {chatHistory.map(((messagge, index) => (
            <MessageCard key={index} role={messagge.role} message={messagge.message} />
          )))}

          {messageStatus === 'loading' && (
            <MessageCard role='CHATBOT' message={inputText} status='loading' />
          )}

        </ScrollView>
      )}

      <View style={{ flexDirection: 'row', marginBottom: 12, gap: 6 }}>
        <TextInput
          multiline
          autoFocus
          value={inputText}
          onChangeText={(text) => {
            setInputText(text)
          }}
          selectionColor={'rgba(0, 0, 0, 0.2)'}
          style={{ flex: 1, padding: 10, borderRadius: 25, height: Math.max(50, inputHeight), textAlignVertical: 'center', maxHeight: 150 }}
          placeholder='Message'
          className='text-base p-3 bg-black/5'
          cursorColor={'black'}
          onContentSizeChange={handleContentSizeChange}
        />

        {!inputText ? (
          <Pressable onPress={() => {
            Vibration.vibrate(100)
            alert("Desarrollada Por André Ponce visita mi página web (https://andrepg.me)")
          }} style={{ width: 50, aspectRatio: 1, borderRadius: 25, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', alignSelf: "flex-end" }}>
            <Headphones fill={'black'} color={'white'} strokeWidth={1} absoluteStrokeWidth />
          </Pressable>
        )
          : (
            <Pressable onPress={() => {
              sendMessage(inputText)
            }} style={{ width: 50, aspectRatio: 1, borderRadius: 25, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', alignSelf: "flex-end" }}>
              <SendHorizonal fill={'black'} color={'white'} strokeWidth={1} absoluteStrokeWidth />
            </Pressable>
          )
        }
      </View>
    </View>
  );
}

import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { useLocalSearchParams, Stack } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import events from '~/assets/events.json';

dayjs.locale('es');

export default function EventPage() {
  const { id } = useLocalSearchParams();

  const event = events.find((event) => event.id === id);

  if (!event) {
    return <Text>Evento no encontrado</Text>;
  }

  return (
    <View className="flex-1 gap-3 bg-white p-4">
      <Stack.Screen options={{ title: 'Evento' }} />
      <Image source={{ uri: event.image }} className="aspect-video w-full rounded-xl" />

      <Text className="text-3xl font-bold" numberOfLines={2}>
        {event.title}
      </Text>
      <Text className="text-lg font-semibold uppercase text-yellow-600">
        {dayjs(event.datetime).format('ddd D MMM · HH:mm A')}
      </Text>

      <Text className="text-lg" numberOfLines={2}>
        {event.description}
      </Text>

      <View className="absolute bottom-0 left-0 right-0 flex-row items-center justify-between border-t-2 border-gray-300 p-5 pb-10">
        <Text className="text-xl font-semibold">Gratis</Text>
        <Pressable className="rounded-md bg-rose-500 p-4 px-10">
          <Text className="text-lg font-bold text-white">Asistir</Text>
        </Pressable>
      </View>
    </View>
  );
}

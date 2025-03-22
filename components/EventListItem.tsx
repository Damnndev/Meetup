import Feather from '@expo/vector-icons/Feather';
import dayjs from 'dayjs';
import { Link } from 'expo-router';
import { Image, Pressable, Text, View } from 'react-native';

import 'dayjs/locale/es';
dayjs.locale('es');

interface Event {
  id: string;
  image: string;
  location: string;
  title: string;
  datetime: string;
}
export default function EventListItem({ event }: { event: Event }) {
  return (
    <Link href={`/${event.id}`} asChild>
      <Pressable className="m-3 gap-3 border-b-2 border-gray-100 pb-3">
        <View className="flex-row">
          <View className="flex-1 gap-2">
            <Text className="text-lg font-semibold uppercase text-yellow-600">
              {dayjs(event.datetime).format('ddd D MMM · HH:mm A')}
            </Text>
            <Text className="text-xl font-bold" numberOfLines={2}>
              {event.title}
            </Text>

            <Text className="text-gray-700">{event.location}</Text>
          </View>

          <Image source={{ uri: event.image }} className="aspect-video w-2/5 rounded-xl" />
        </View>

        <View className="flex-row gap-3">
          <Text className="mr-auto text-gray-600">20 asistentes</Text>
          <Feather name="share" size={20} color="gray" />
          <Feather name="bookmark" size={20} color="gray" />
        </View>
      </Pressable>
    </Link>
  );
}

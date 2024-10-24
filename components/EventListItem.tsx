import Feather from '@expo/vector-icons/Feather';
import React from 'react';
import { Image, Text, View } from 'react-native';

interface EventListItemProps {
  event: {
    title: string;
    location: string;
    image: string;
  };
  // onSave?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  // onCancel?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  // isOpen: boolean;
  // disableSave?: boolean;
  // children: ReactNode;
}

export default function EventListItem({ event }: EventListItemProps) {
  return (
    <View className="gap-3 p-3">
      <View className="flex-row">
        <View className="flex-1 gap-2">
          <Text className="text-lg font-semibold uppercase text-yellow-700">
            Wed 23, Oct • 21:00 CET
          </Text>
          <Text className="text-xl font-bold" numberOfLines={2}>
            {event.title}
          </Text>
          <Text className="text-gray-700">{event.location}</Text>
        </View>

        {/* Event image */}
        <Image source={{ uri: event.image }} className="aspect-video w-2/5 rounded-xl" />
      </View>

      {/* Footer */}
      <View className="flex-row gap-3">
        <Text className="mr-auto text-gray-700">12 going</Text>
        <Feather name="share" size={20} color="gray" />
        <Feather name="bookmark" size={20} color="gray" />
      </View>
    </View>
  );
}

import { Stack } from 'expo-router';
import { useEffect, useState } from 'react';
import { FlatList } from 'react-native';

import EventListItem from '~/components/EventListItem';
import { supabase } from '~/utils/supabase';

export default function Home() {
  const [events, setEvents] = useState<any[] | null>([]);

  const fetchEvents = async () => {
    const { data, error } = await supabase.from('events').select('*');
    setEvents(data);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Eventos', headerTitleAlign: 'center' }} />
      <FlatList
        data={events}
        renderItem={({ item }) => <EventListItem event={item} />}
        className="bg-white"
      />
    </>
  );
}

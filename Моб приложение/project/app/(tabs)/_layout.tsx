import { Tabs } from 'expo-router';
import { StyleSheet } from 'react-native';
import { Chrome as Home, User, BookOpen, Award } from 'lucide-react-native';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#2E86DE',
        tabBarInactiveTintColor: '#95A5A6',
        tabBarLabelStyle: styles.tabLabel,
        tabBarStyle: styles.tabBar,
        headerShown: true,
        headerTitleStyle: styles.headerTitle,
        headerStyle: styles.header,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Главная',
          tabBarIcon: ({ color, size }) => <Home size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="game"
        options={{
          title: 'Игра',
          tabBarIcon: ({ color, size }) => <BookOpen size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="achievements"
        options={{
          title: 'Достижения',
          tabBarIcon: ({ color, size }) => <Award size={size} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Профиль',
          tabBarIcon: ({ color, size }) => <User size={size} color={color} />,
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#FFFFFF',
    borderTopColor: '#EEEEEE',
    height: 60,
  },
  tabLabel: {
    fontSize: 12,
    fontWeight: '500',
  },
  header: {
    backgroundColor: '#2E86DE',
  },
  headerTitle: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 18,
  },
});
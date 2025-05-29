import { StyleSheet, View, Text, ScrollView, Image } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AchievementCard } from '@/components/AchievementCard';

export default function AchievementsScreen() {
  const achievements = [
    {
      id: '1',
      title: 'Первые шаги',
      description: 'Пройдите первый уровень игры',
      completed: true,
      icon: 'award',
    },
    {
      id: '2',
      title: 'Финансовый словарь',
      description: 'Выучите 10 финансовых терминов',
      completed: true,
      icon: 'book',
    },
    {
      id: '3',
      title: 'Мастер бюджета',
      description: 'Составьте свой первый бюджет',
      completed: false,
      icon: 'clipboard',
    },
    {
      id: '4',
      title: 'Супер экономия',
      description: 'Сэкономьте виртуальные 1000 рублей',
      completed: false,
      icon: 'piggy-bank',
    },
    {
      id: '5',
      title: 'Инвестор',
      description: 'Сделайте первую инвестицию',
      completed: false,
      icon: 'trending-up',
    },
  ];

  const completedCount = achievements.filter(a => a.completed).length;
  const progress = (completedCount / achievements.length) * 100;

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.title}>Достижения</Text>
          <Text style={styles.subtitle}>Ваш прогресс в обучении финансам</Text>
        </View>

        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            {completedCount} из {achievements.length} достижений
          </Text>
        </View>

        <View style={styles.achievementsContainer}>
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              title={achievement.title}
              description={achievement.description}
              completed={achievement.completed}
              icon={achievement.icon}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    marginBottom: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    marginTop: 4,
  },
  progressContainer: {
    marginBottom: 24,
  },
  progressBar: {
    height: 10,
    backgroundColor: '#E9ECEF',
    borderRadius: 5,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#10AC84',
  },
  progressText: {
    fontSize: 14,
    color: '#495057',
    textAlign: 'center',
  },
  achievementsContainer: {
    marginBottom: 16,
  },
});
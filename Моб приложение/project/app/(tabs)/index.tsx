import { StyleSheet, View, Text, ScrollView } from 'react-native';
import { Card } from '@/components/Card';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text style={styles.greeting}>Добро пожаловать!</Text>
          <Text style={styles.subtitle}>Учимся финансовой грамотности вместе</Text>
        </View>

        <View style={styles.cardsContainer}>
          <Text style={styles.sectionTitle}>Категории</Text>
          <View style={styles.cardRow}>
            <Card
              title="Бюджет"
              description="Научитесь планировать свои расходы"
              color="#2E86DE"
              icon="wallet"
            />
            <Card
              title="Экономия"
              description="Как сберегать деньги правильно"
              color="#10AC84"
              icon="piggy-bank"
            />
          </View>
          <View style={styles.cardRow}>
            <Card
              title="Инвестиции"
              description="Основы инвестирования для детей"
              color="#FF9F43"
              icon="trending-up"
            />
            <Card
              title="Банк"
              description="Что такое банк и как он работает"
              color="#9B59B6"
              icon="landmark"
            />
          </View>
        </View>

        <View style={styles.tipsContainer}>
          <Text style={styles.sectionTitle}>Совет дня</Text>
          <View style={styles.tipCard}>
            <Text style={styles.tipTitle}>Копилка помогает копить!</Text>
            <Text style={styles.tipText}>
              Используйте копилку, чтобы собирать мелочь. За год это может превратиться 
              в приличную сумму для покупки чего-то особенного!
            </Text>
          </View>
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
  greeting: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  subtitle: {
    fontSize: 16,
    color: '#6C757D',
    marginTop: 4,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1E1E1E',
  },
  cardsContainer: {
    marginBottom: 24,
  },
  cardRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 16,
  },
  tipsContainer: {
    marginBottom: 24,
  },
  tipCard: {
    backgroundColor: '#FFF9DB',
    borderRadius: 12,
    padding: 16,
    borderLeftWidth: 4,
    borderLeftColor: '#FF9F43',
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 8,
    color: '#1E1E1E',
  },
  tipText: {
    fontSize: 14,
    color: '#495057',
    lineHeight: 22,
  },
});
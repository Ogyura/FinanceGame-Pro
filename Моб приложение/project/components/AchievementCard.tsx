import { View, Text, StyleSheet } from 'react-native';
import { Award, Book, ClipboardList, PiggyBank, TrendingUp } from 'lucide-react-native';

type AchievementCardProps = {
  title: string;
  description: string;
  completed: boolean;
  icon: string;
};

export function AchievementCard({ title, description, completed, icon }: AchievementCardProps) {
  const renderIcon = () => {
    const color = completed ? '#10AC84' : '#ADB5BD';
    const size = 24;

    switch (icon) {
      case 'award':
        return <Award color={color} size={size} />;
      case 'book':
        return <Book color={color} size={size} />;
      case 'clipboard':
        return <ClipboardList color={color} size={size} />;
      case 'piggy-bank':
        return <PiggyBank color={color} size={size} />;
      case 'trending-up':
        return <TrendingUp color={color} size={size} />;
      default:
        return <Award color={color} size={size} />;
    }
  };

  return (
    <View style={[styles.card, completed ? styles.completedCard : styles.incompleteCard]}>
      <View style={styles.iconContainer}>{renderIcon()}</View>
      <View style={styles.contentContainer}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
      <View style={[styles.statusDot, completed ? styles.completedDot : styles.incompleteDot]} />
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  completedCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#10AC84',
  },
  incompleteCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#ADB5BD',
  },
  iconContainer: {
    marginRight: 16,
  },
  contentContainer: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  description: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 2,
  },
  statusDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
  },
  completedDot: {
    backgroundColor: '#10AC84',
  },
  incompleteDot: {
    backgroundColor: '#DEE2E6',
  },
});
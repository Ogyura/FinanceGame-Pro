import { View, Text, StyleSheet } from 'react-native';
import { Lock } from 'lucide-react-native';

type GameCardProps = {
  title: string;
  difficulty: string;
  color: string;
  locked?: boolean;
};

export function GameCard({ title, difficulty, color, locked }: GameCardProps) {
  return (
    <View style={[styles.card, { borderLeftColor: color }, locked && styles.lockedCard]}>
      <View>
        <Text style={[styles.title, locked && styles.lockedText]}>{title}</Text>
        <Text style={[styles.difficulty, locked && styles.lockedText]}>{difficulty}</Text>
      </View>
      {locked ? (
        <Lock size={24} color="#ADB5BD" />
      ) : (
        <View style={[styles.badge, { backgroundColor: color }]}>
          <Text style={styles.badgeText}>Играть</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    borderLeftWidth: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  lockedCard: {
    opacity: 0.7,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
  },
  difficulty: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 4,
  },
  lockedText: {
    color: '#ADB5BD',
  },
  badge: {
    paddingVertical: 6,
    paddingHorizontal: 12,
    borderRadius: 16,
  },
  badgeText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
});
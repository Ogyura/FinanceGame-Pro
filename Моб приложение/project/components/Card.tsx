import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Wallet, PiggyBank, TrendingUp, Landmark } from 'lucide-react-native';

type CardProps = {
  title: string;
  description: string;
  color: string;
  icon: string;
};

export function Card({ title, description, color, icon }: CardProps) {
  const renderIcon = () => {
    switch (icon) {
      case 'wallet':
        return <Wallet color="#FFFFFF" size={24} />;
      case 'piggy-bank':
        return <PiggyBank color="#FFFFFF" size={24} />;
      case 'trending-up':
        return <TrendingUp color="#FFFFFF" size={24} />;
      case 'landmark':
        return <Landmark color="#FFFFFF" size={24} />;
      default:
        return <Wallet color="#FFFFFF" size={24} />;
    }
  };

  return (
    <TouchableOpacity style={styles.container}>
      <View style={[styles.card, { shadowColor: color }]}>
        <View style={[styles.iconContainer, { backgroundColor: color }]}>
          {renderIcon()}
        </View>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    width: '48%',
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  iconContainer: {
    width: 48,
    height: 48,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 4,
  },
  description: {
    fontSize: 13,
    color: '#6C757D',
    lineHeight: 18,
  },
});
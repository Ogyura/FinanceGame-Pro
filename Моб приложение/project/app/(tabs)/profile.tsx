import { StyleSheet, View, Text, Image, TouchableOpacity, ScrollView } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Settings, LogOut, CircleHelp as HelpCircle, Heart, MessageCircle } from 'lucide-react-native';

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.profileHeader}>
          <View style={styles.avatarContainer}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1416736/pexels-photo-1416736.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2' }}
              style={styles.avatar}
            />
          </View>
          <Text style={styles.username}>Пользователь</Text>
          <Text style={styles.level}>Уровень: Начинающий</Text>
          
          <View style={styles.statsContainer}>
            <View style={styles.statItem}>
              <Text style={styles.statValue}>2</Text>
              <Text style={styles.statLabel}>Уровня</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>120</Text>
              <Text style={styles.statLabel}>Баллов</Text>
            </View>
            <View style={styles.statDivider} />
            <View style={styles.statItem}>
              <Text style={styles.statValue}>7</Text>
              <Text style={styles.statLabel}>Дней</Text>
            </View>
          </View>
        </View>

        <View style={styles.menuSection}>
          <Text style={styles.sectionTitle}>Настройки</Text>
          
          <TouchableOpacity style={styles.menuItem}>
            <Settings size={22} color="#1E1E1E" />
            <Text style={styles.menuItemText}>Настройки профиля</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <Heart size={22} color="#1E1E1E" />
            <Text style={styles.menuItemText}>Избранные темы</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <MessageCircle size={22} color="#1E1E1E" />
            <Text style={styles.menuItemText}>Обратная связь</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.menuItem}>
            <HelpCircle size={22} color="#1E1E1E" />
            <Text style={styles.menuItemText}>Помощь</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={[styles.menuItem, styles.logoutItem]}>
            <LogOut size={22} color="#E74C3C" />
            <Text style={[styles.menuItemText, styles.logoutText]}>Выйти</Text>
          </TouchableOpacity>
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
  profileHeader: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  avatar: {
    width: '100%',
    height: '100%',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1E1E1E',
  },
  level: {
    fontSize: 16,
    color: '#6C757D',
    marginTop: 4,
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    flex: 1,
    alignItems: 'center',
  },
  statValue: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2E86DE',
  },
  statLabel: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 4,
  },
  statDivider: {
    width: 1,
    height: '100%',
    backgroundColor: '#E9ECEF',
  },
  menuSection: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 16,
    color: '#1E1E1E',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    borderBottomWidth: 1,
    borderBottomColor: '#E9ECEF',
  },
  menuItemText: {
    fontSize: 16,
    color: '#1E1E1E',
    marginLeft: 12,
  },
  logoutItem: {
    borderBottomWidth: 0,
  },
  logoutText: {
    color: '#E74C3C',
  },
});
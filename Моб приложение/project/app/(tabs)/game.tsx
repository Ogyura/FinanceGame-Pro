import { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, ScrollView, Animated } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { GameCard } from '@/components/GameCard';

type Question = {
  id: string;
  text: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
};

const questions: Record<string, Question[]> = {
  '1': [
    {
      id: '1-1',
      text: 'Что такое бюджет?',
      options: [
        'План доходов и расходов',
        'Только деньги в кошельке',
        'Список покупок',
        'Банковская карта'
      ],
      correctAnswer: 0,
      explanation: 'Бюджет - это финансовый план, который учитывает все доходы и расходы за определенный период.'
    },
    {
      id: '1-2',
      text: 'Как лучше всего экономить деньги?',
      options: [
        'Тратить всё сразу',
        'Откладывать часть каждого дохода',
        'Брать в долг',
        'Не вести учет расходов'
      ],
      correctAnswer: 1,
      explanation: 'Регулярное откладывание части дохода - основа финансовой стабильности.'
    },
    {
      id: '1-3',
      text: 'Что такое накопления?',
      options: [
        'Деньги, которые мы тратим',
        'Сбережения на будущее',
        'Долги друзьям',
        'Карманные деньги'
      ],
      correctAnswer: 1,
      explanation: 'Накопления - это деньги, которые мы откладываем для достижения финансовых целей.'
    },
    {
      id: '1-4',
      text: 'Зачем нужна копилка?',
      options: [
        'Для украшения комнаты',
        'Чтобы прятать вещи',
        'Для накопления денег',
        'Это просто игрушка'
      ],
      correctAnswer: 2,
      explanation: 'Копилка помогает формировать привычку к сбережению и учит финансовой дисциплине.'
    }
  ]
};

export default function GameScreen() {
  const [selectedLevel, setSelectedLevel] = useState<string | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [showExplanation, setShowExplanation] = useState(false);
  const [score, setScore] = useState(0);
  const [progress, setProgress] = useState(0);

  const levels = [
    { id: '1', title: 'Основы', difficulty: 'Легко', color: '#2ECC71' },
    { id: '2', title: 'Бюджет', difficulty: 'Средне', color: '#3498DB' },
    { id: '3', title: 'Экономия', difficulty: 'Средне', color: '#F1C40F' },
    { id: '4', title: 'Инвестиции', difficulty: 'Сложно', color: '#E74C3C' },
  ];

  const handleAnswerSelect = (answerIndex: number) => {
    if (selectedAnswer !== null) return;
    
    setSelectedAnswer(answerIndex);
    const currentQuestion = questions[selectedLevel!][currentQuestionIndex];
    
    if (answerIndex === currentQuestion.correctAnswer) {
      setScore(prev => prev + 1);
    }
    
    setShowExplanation(true);
    setProgress((currentQuestionIndex + 1) / questions[selectedLevel!].length * 100);
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions[selectedLevel!].length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer(null);
      setShowExplanation(false);
    } else {
      // End of level
      setSelectedLevel(null);
      setCurrentQuestionIndex(0);
      setSelectedAnswer(null);
      setShowExplanation(false);
      setProgress(0);
    }
  };

  const renderQuestion = () => {
    const question = questions[selectedLevel!][currentQuestionIndex];
    const totalQuestions = questions[selectedLevel!].length;
    
    return (
      <View style={styles.questionContainer}>
        <View style={styles.progressContainer}>
          <View style={styles.progressBar}>
            <View style={[styles.progressFill, { width: `${progress}%` }]} />
          </View>
          <Text style={styles.progressText}>
            Вопрос {currentQuestionIndex + 1} из {totalQuestions}
          </Text>
        </View>

        <Text style={styles.questionText}>{question.text}</Text>
        <View style={styles.optionsContainer}>
          {question.options.map((option, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.optionButton,
                selectedAnswer === index && (
                  index === question.correctAnswer
                    ? styles.correctAnswer
                    : styles.wrongAnswer
                )
              ]}
              onPress={() => handleAnswerSelect(index)}
              disabled={selectedAnswer !== null}
            >
              <Text style={[
                styles.optionText,
                selectedAnswer === index && styles.selectedOptionText
              ]}>
                {option}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
        
        {showExplanation && (
          <View style={styles.explanationContainer}>
            <Text style={styles.explanationText}>{question.explanation}</Text>
            <TouchableOpacity
              style={styles.nextButton}
              onPress={handleNextQuestion}
            >
              <Text style={styles.nextButtonText}>
                {currentQuestionIndex < questions[selectedLevel!].length - 1
                  ? 'Следующий вопрос'
                  : 'Завершить уровень'}
              </Text>
            </TouchableOpacity>
          </View>
        )}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container} edges={['bottom']}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        {!selectedLevel ? (
          <>
            <View style={styles.header}>
              <Text style={styles.title}>Игровые уровни</Text>
              <Text style={styles.subtitle}>Выберите уровень, чтобы начать игру</Text>
              {score > 0 && (
                <View style={styles.scoreContainer}>
                  <Text style={styles.scoreText}>Ваши баллы: {score}</Text>
                </View>
              )}
            </View>

            <View style={styles.levelsContainer}>
              {levels.map((level) => (
                <TouchableOpacity
                  key={level.id}
                  onPress={() => setSelectedLevel(level.id)}
                  disabled={level.id !== '1'} // Only first level is available
                >
                  <GameCard
                    title={level.title}
                    difficulty={level.difficulty}
                    color={level.color}
                    locked={level.id !== '1'}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : (
          <View style={styles.levelContainer}>
            <View style={styles.levelHeader}>
              <TouchableOpacity
                style={styles.backButton}
                onPress={() => {
                  setSelectedLevel(null);
                  setCurrentQuestionIndex(0);
                  setSelectedAnswer(null);
                  setShowExplanation(false);
                  setProgress(0);
                }}
              >
                <Text style={styles.backButtonText}>← Назад</Text>
              </TouchableOpacity>
              <Text style={styles.levelTitle}>
                Уровень: {levels.find(l => l.id === selectedLevel)?.title}
              </Text>
            </View>
            {renderQuestion()}
          </View>
        )}
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
    flexGrow: 1,
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
  scoreContainer: {
    marginTop: 12,
    backgroundColor: '#2ECC71',
    padding: 8,
    borderRadius: 8,
    alignSelf: 'flex-start',
  },
  scoreText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
  levelsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  levelContainer: {
    flex: 1,
  },
  levelHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  levelTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1E1E1E',
    marginLeft: 12,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    fontSize: 16,
    color: '#2E86DE',
    fontWeight: '600',
  },
  progressContainer: {
    marginBottom: 20,
  },
  progressBar: {
    height: 8,
    backgroundColor: '#E9ECEF',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#2ECC71',
  },
  progressText: {
    fontSize: 14,
    color: '#6C757D',
    marginTop: 8,
    textAlign: 'center',
  },
  questionContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  questionText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1E1E1E',
    marginBottom: 20,
  },
  optionsContainer: {
    marginBottom: 20,
  },
  optionButton: {
    backgroundColor: '#F8F9FA',
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    borderWidth: 1,
    borderColor: '#DEE2E6',
  },
  correctAnswer: {
    backgroundColor: '#D4EDDA',
    borderColor: '#C3E6CB',
  },
  wrongAnswer: {
    backgroundColor: '#F8D7DA',
    borderColor: '#F5C6CB',
  },
  optionText: {
    fontSize: 16,
    color: '#1E1E1E',
  },
  selectedOptionText: {
    fontWeight: '600',
  },
  explanationContainer: {
    backgroundColor: '#E8F4FD',
    borderRadius: 8,
    padding: 16,
    marginTop: 16,
  },
  explanationText: {
    fontSize: 14,
    color: '#2E86DE',
    marginBottom: 16,
  },
  nextButton: {
    backgroundColor: '#2E86DE',
    borderRadius: 8,
    padding: 12,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});
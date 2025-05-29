"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  BarChart3,
  Users,
  Trophy,
  BookOpen,
  TrendingUp,
  Target,
  Award,
  Smartphone,
  Play,
  Coins,
  CheckCircle,
  User,
  LogOut,
  Calendar,
} from "lucide-react"

export default function TeacherPlatform() {
  const [activeTab, setActiveTab] = useState("dashboard")
  const [currentQuiz, setCurrentQuiz] = useState(null)
  const [userAnswers, setUserAnswers] = useState({})
  const [quizScore, setQuizScore] = useState(0)
  const [gameCoins, setGameCoins] = useState(1250)
  const [activeScenario, setActiveScenario] = useState(null)
  const [scenarioStep, setScenarioStep] = useState(0)
  const [playerMoney, setPlayerMoney] = useState(50000)
  const [qrScannerActive, setQrScannerActive] = useState(false)
  const [scannedQR, setScannedQR] = useState(null)
  const [arActive, setArActive] = useState(false)
  const [arVisualization, setArVisualization] = useState(null)

  // Состояние авторизации
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [showLogin, setShowLogin] = useState(true)
  const [user, setUser] = useState(null)

  // Расширенная база квизов
  const quizCategories = [
    {
      id: "budgeting",
      title: "Бюджетирование",
      description: "Основы планирования личного бюджета",
      icon: "💰",
      reward: 50,
      difficulty: "Легкий",
      questions: [
        {
          id: 1,
          question: "Что такое правило 50/30/20 в бюджетировании?",
          options: [
            "50% на развлечения, 30% на еду, 20% на одежду",
            "50% на необходимые расходы, 30% на желания, 20% на сбережения",
            "50% на сбережения, 30% на инвестиции, 20% на расходы",
            "50% на аренду, 30% на транспорт, 20% на еду",
          ],
          correct: 1,
          explanation:
            "Правило 50/30/20 помогает распределить доходы: 50% на необходимые расходы, 30% на желания и развлечения, 20% на сбережения и инвестиции.",
        },
        {
          id: 2,
          question: "Какой первый шаг при составлении бюджета?",
          options: [
            "Определить цели сбережений",
            "Подсчитать все доходы",
            "Составить список всех расходов",
            "Открыть сберегательный счет",
          ],
          correct: 1,
          explanation:
            "Первый шаг - точно знать, сколько денег поступает. Только после этого можно планировать расходы.",
        },
        {
          id: 3,
          question: "Что означает 'экстренный фонд'?",
          options: [
            "Деньги на отпуск",
            "Средства на непредвиденные расходы",
            "Деньги на покупки",
            "Инвестиционный портфель",
          ],
          correct: 1,
          explanation:
            "Экстренный фонд - это резерв денег на случай непредвиденных ситуаций (потеря работы, болезнь, срочный ремонт).",
        },
        {
          id: 4,
          question: "Какой процент дохода рекомендуется тратить на жилье?",
          options: ["Не более 20%", "Не более 30%", "Не более 50%", "Не более 70%"],
          correct: 1,
          explanation: "Финансовые эксперты рекомендуют тратить не более 30% дохода на жилье (аренда или ипотека).",
        },
        {
          id: 5,
          question: "Что такое 'нулевой бюджет'?",
          options: [
            "Бюджет без доходов",
            "Бюджет, где доходы минус расходы равны нулю",
            "Бюджет только на необходимые расходы",
            "Бюджет без сбережений",
          ],
          correct: 1,
          explanation:
            "Нулевой бюджет означает, что каждый рубль дохода распределен по категориям, включая сбережения.",
        },
      ],
    },
    {
      id: "savings",
      title: "Сбережения",
      description: "Стратегии накопления и сохранения денег",
      icon: "🏦",
      reward: 60,
      difficulty: "Легкий",
      questions: [
        {
          id: 1,
          question: "Какой размер экстренного фонда рекомендуют финансовые эксперты?",
          options: ["1-2 месячных дохода", "3-6 месячных расходов", "Половина годового дохода", "10% от зарплаты"],
          correct: 1,
          explanation:
            "Экстренный фонд должен покрывать 3-6 месяцев ваших обычных расходов для финансовой безопасности.",
        },
        {
          id: 2,
          question: "Что такое сложный процент?",
          options: [
            "Процент, который сложно рассчитать",
            "Процент на процент от предыдущих периодов",
            "Высокий процент по кредиту",
            "Процент по валютным вкладам",
          ],
          correct: 1,
          explanation:
            "Сложный процент - это начисление процентов не только на основную сумму, но и на ранее начисленные проценты.",
        },
        {
          id: 3,
          question: "Какой принцип помогает регулярно откладывать деньги?",
          options: [
            "Откладывать то, что останется в конце месяца",
            "Сначала заплати себе",
            "Копить только крупные суммы",
            "Откладывать только премии",
          ],
          correct: 1,
          explanation:
            "Принцип 'Сначала заплати себе' означает откладывать определенную сумму сразу после получения дохода.",
        },
        {
          id: 4,
          question: "Где лучше хранить экстренный фонд?",
          options: [
            "В акциях",
            "На депозите с высокой доходностью",
            "На легкодоступном сберегательном счете",
            "В криптовалюте",
          ],
          correct: 2,
          explanation: "Экстренный фонд должен быть легкодоступным, поэтому лучше держать его на сберегательном счете.",
        },
      ],
    },
    {
      id: "investments",
      title: "Инвестиции",
      description: "Основы инвестирования и управления рисками",
      icon: "📈",
      reward: 80,
      difficulty: "Средний",
      questions: [
        {
          id: 1,
          question: "Что означает диверсификация инвестиций?",
          options: [
            "Инвестирование только в акции",
            "Распределение инвестиций по разным активам",
            "Покупка дорогих акций",
            "Инвестирование в одну компанию",
          ],
          correct: 1,
          explanation:
            "Диверсификация - это распределение инвестиций между разными типами активов для снижения рисков.",
        },
        {
          id: 2,
          question: "Что такое ИИС (Индивидуальный инвестиционный счет)?",
          options: [
            "Обычный банковский счет",
            "Счет с налоговыми льготами для инвестиций",
            "Кредитная карта",
            "Депозит в банке",
          ],
          correct: 1,
          explanation: "ИИС - специальный счет, который дает налоговые льготы при инвестировании в ценные бумаги.",
        },
        {
          id: 3,
          question: "Какой принцип важен для долгосрочного инвестирования?",
          options: [
            "Покупать на пике рынка",
            "Регулярность и терпение",
            "Следовать эмоциям",
            "Инвестировать все сбережения",
          ],
          correct: 1,
          explanation:
            "Долгосрочное инвестирование требует регулярности, терпения и дисциплины, а не эмоциональных решений.",
        },
        {
          id: 4,
          question: "Что такое ETF?",
          options: ["Отдельная акция компании", "Биржевой инвестиционный фонд", "Банковский депозит", "Криптовалюта"],
          correct: 1,
          explanation:
            "ETF (Exchange Traded Fund) - это биржевой фонд, который отслеживает индекс или корзину активов.",
        },
      ],
    },
    {
      id: "taxes",
      title: "Налоги",
      description: "Основы налогообложения и налогового планирования",
      icon: "📋",
      reward: 70,
      difficulty: "Средний",
      questions: [
        {
          id: 1,
          question: "Какая ставка подоходного налога в России для резидентов?",
          options: ["10%", "13%", "15%", "20%"],
          correct: 1,
          explanation: "Базовая ставка подоходного налога (НДФЛ) для резидентов РФ составляет 13%.",
        },
        {
          id: 2,
          question: "Что такое налоговый вычет?",
          options: [
            "Дополнительный налог",
            "Сумма, уменьшающая налогооблагаемый доход",
            "Штраф за неуплату налогов",
            "Налог на имущество",
          ],
          correct: 1,
          explanation:
            "Налоговый вычет - это сумма, на которую уменьшается налогооблагаемый доход или уплаченный налог.",
        },
        {
          id: 3,
          question: "До какого числа нужно подать декларацию о доходах?",
          options: ["31 марта", "30 апреля", "31 мая", "30 июня"],
          correct: 0,
          explanation: "Декларацию о доходах за прошлый год нужно подать до 31 марта текущего года.",
        },
        {
          id: 4,
          question: "Какой максимальный размер имущественного вычета при покупке жилья?",
          options: ["1 млн рублей", "2 млн рублей", "3 млн рублей", "5 млн рублей"],
          correct: 1,
          explanation: "Максимальный размер имущественного вычета при покупке жилья составляет 2 млн рублей.",
        },
      ],
    },
    {
      id: "entrepreneurship",
      title: "Предпринимательство",
      description: "Основы ведения бизнеса и предпринимательской деятельности",
      icon: "🚀",
      reward: 90,
      difficulty: "Сложный",
      questions: [
        {
          id: 1,
          question: "Что такое бизнес-план?",
          options: [
            "План отпуска",
            "Документ, описывающий стратегию развития бизнеса",
            "Список покупок",
            "Расписание работы",
          ],
          correct: 1,
          explanation:
            "Бизнес-план - это документ, который описывает цели бизнеса, стратегию их достижения и финансовые прогнозы.",
        },
        {
          id: 2,
          question: "Что означает аббревиатура ИП?",
          options: [
            "Индивидуальный предприниматель",
            "Инвестиционный проект",
            "Интеллектуальная собственность",
            "Информационный портал",
          ],
          correct: 0,
          explanation: "ИП - это индивидуальный предприниматель, форма ведения бизнеса физическим лицом.",
        },
        {
          id: 3,
          question: "Что такое точка безубыточности?",
          options: [
            "Момент закрытия бизнеса",
            "Объем продаж, при котором доходы равны расходам",
            "Максимальная прибыль",
            "Минимальная зарплата",
          ],
          correct: 1,
          explanation: "Точка безубыточности - это объем продаж, при котором общие доходы равны общим расходам.",
        },
        {
          id: 4,
          question: "Какая система налогообложения часто выгодна для малого бизнеса?",
          options: ["ОСНО", "УСН", "ЕНВД", "ПСН"],
          correct: 1,
          explanation: "УСН (упрощенная система налогообложения) часто выгодна для малого бизнеса из-за низких ставок.",
        },
      ],
    },
    {
      id: "banking",
      title: "Банковские услуги",
      description: "Работа с банками и финансовыми учреждениями",
      icon: "🏛️",
      reward: 55,
      difficulty: "Легкий",
      questions: [
        {
          id: 1,
          question: "Что такое овердрафт?",
          options: [
            "Вид депозита",
            "Возможность тратить больше, чем есть на счете",
            "Банковская карта",
            "Процент по вкладу",
          ],
          correct: 1,
          explanation:
            "Овердрафт - это возможность тратить деньги сверх остатка на счете, фактически краткосрочный кредит.",
        },
        {
          id: 2,
          question: "Что означает аббревиатура АСВ?",
          options: [
            "Агентство по страхованию вкладов",
            "Ассоциация современных банков",
            "Автоматическая система выплат",
            "Агентство социального развития",
          ],
          correct: 0,
          explanation: "АСВ - Агентство по страхованию вкладов, которое гарантирует возврат вкладов до 1,4 млн рублей.",
        },
        {
          id: 3,
          question: "Какая максимальная сумма страхования вкладов в России?",
          options: ["1 млн рублей", "1,4 млн рублей", "2 млн рублей", "5 млн рублей"],
          correct: 1,
          explanation:
            "Максимальная сумма страхования вкладов в России составляет 1,4 млн рублей на одного вкладчика в одном банке.",
        },
        {
          id: 4,
          question: "Что такое эквайринг?",
          options: ["Открытие счета в банке", "Прием платежей по картам", "Выдача кредитов", "Обмен валюты"],
          correct: 1,
          explanation: "Эквайринг - это услуга по приему платежей с банковских карт через терминалы или онлайн.",
        },
      ],
    },
    {
      id: "crypto",
      title: "Криптовалюты",
      description: "Основы цифровых валют и блокчейн технологий",
      icon: "₿",
      reward: 85,
      difficulty: "Сложный",
      questions: [
        {
          id: 1,
          question: "Что такое блокчейн?",
          options: ["Вид криптовалюты", "Распределенная база данных", "Банковская система", "Платежная карта"],
          correct: 1,
          explanation:
            "Блокчейн - это распределенная база данных, состоящая из цепочки блоков с информацией о транзакциях.",
        },
        {
          id: 2,
          question: "Кто создал Bitcoin?",
          options: ["Илон Маск", "Сатоши Накамото", "Виталик Бутерин", "Марк Цукерберг"],
          correct: 1,
          explanation: "Bitcoin был создан под псевдонимом Сатоши Накамото, личность которого остается неизвестной.",
        },
        {
          id: 3,
          question: "Что такое майнинг?",
          options: [
            "Покупка криптовалют",
            "Процесс создания новых блоков в блокчейне",
            "Обмен криптовалют",
            "Хранение криптовалют",
          ],
          correct: 1,
          explanation: "Майнинг - это процесс создания новых блоков в блокчейне с помощью вычислительных мощностей.",
        },
        {
          id: 4,
          question: "Что такое волатильность криптовалют?",
          options: ["Стабильность цены", "Высокая изменчивость цены", "Низкая ликвидность", "Скорость транзакций"],
          correct: 1,
          explanation:
            "Волатильность - это высокая изменчивость цены криптовалют, что делает их рискованными инвестициями.",
        },
      ],
    },
    {
      id: "retirement",
      title: "Пенсионное планирование",
      description: "Подготовка к пенсии и долгосрочное планирование",
      icon: "👴",
      reward: 75,
      difficulty: "Средний",
      questions: [
        {
          id: 1,
          question: "Из чего состоит пенсионная система России?",
          options: [
            "Только государственная пенсия",
            "Государственная, обязательная накопительная и добровольная",
            "Только накопительная пенсия",
            "Только добровольная пенсия",
          ],
          correct: 1,
          explanation:
            "Пенсионная система России состоит из трех уровней: государственного, обязательного накопительного и добровольного.",
        },
        {
          id: 2,
          question: "Что такое НПФ?",
          options: [
            "Налоговый пенсионный фонд",
            "Негосударственный пенсионный фонд",
            "Национальный пенсионный фонд",
            "Накопительный пенсионный фонд",
          ],
          correct: 1,
          explanation: "НПФ - негосударственный пенсионный фонд, который управляет накопительной частью пенсии.",
        },
        {
          id: 3,
          question: "Во сколько лет можно выйти на пенсию в России?",
          options: ["55/60 лет", "60/65 лет", "65/70 лет", "70/75 лет"],
          correct: 1,
          explanation:
            "После пенсионной реформы пенсионный возраст в России составляет 60 лет для женщин и 65 лет для мужчин.",
        },
        {
          id: 4,
          question: "Какой процент от зарплаты рекомендуется откладывать на пенсию?",
          options: ["5-10%", "10-15%", "15-20%", "20-25%"],
          correct: 1,
          explanation: "Финансовые консультанты рекомендуют откладывать 10-15% от дохода на пенсионные накопления.",
        },
      ],
    },
  ]

  // Компонент авторизации
  const AuthComponent = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [name, setName] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleLogin = (e) => {
      e.preventDefault()
      // Симуляция входа
      const userData = {
        id: 1,
        name: "Иван Петров",
        email: email,
        role: "teacher",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: "2024-01-15",
        totalCoins: gameCoins,
        completedQuizzes: 12,
        completedScenarios: 5,
        badges: 8,
        level: "Продвинутый",
      }
      setUser(userData)
      setIsAuthenticated(true)
    }

    const handleRegister = (e) => {
      e.preventDefault()
      // Симуляция регистрации
      const userData = {
        id: 1,
        name: name,
        email: email,
        role: "teacher",
        avatar: "/placeholder.svg?height=40&width=40",
        joinDate: new Date().toISOString().split("T")[0],
        totalCoins: 0,
        completedQuizzes: 0,
        completedScenarios: 0,
        badges: 0,
        level: "Новичок",
      }
      setUser(userData)
      setIsAuthenticated(true)
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center mx-auto mb-4">
              <Trophy className="w-8 h-8 text-white" />
            </div>
            <CardTitle className="text-2xl">FinanceGame Pro</CardTitle>
            <CardDescription>{showLogin ? "Войдите в свой аккаунт" : "Создайте новый аккаунт"}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={showLogin ? handleLogin : handleRegister} className="space-y-4">
              {!showLogin && (
                <div className="space-y-2">
                  <Label htmlFor="name">Имя</Label>
                  <Input
                    id="name"
                    type="text"
                    placeholder="Введите ваше имя"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              )}
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Введите ваш email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Пароль</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Введите пароль"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              {!showLogin && (
                <div className="space-y-2">
                  <Label htmlFor="confirmPassword">Подтвердите пароль</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Подтвердите пароль"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                  />
                </div>
              )}
              <Button type="submit" className="w-full">
                {showLogin ? "Войти" : "Зарегистрироваться"}
              </Button>
            </form>
            <div className="mt-4 text-center">
              <Button variant="link" onClick={() => setShowLogin(!showLogin)}>
                {showLogin ? "Нет аккаунта? Зарегистрируйтесь" : "Уже есть аккаунт? Войдите"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  // Компонент профиля
  const ProfileComponent = () => {
    const [profileTab, setProfileTab] = useState("overview")

    return (
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <div className="flex items-center space-x-4">
              <Avatar className="w-20 h-20">
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback className="text-2xl">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1">
                <h2 className="text-2xl font-bold">{user.name}</h2>
                <p className="text-muted-foreground">{user.email}</p>
                <div className="flex items-center space-x-4 mt-2">
                  <Badge variant="outline">{user.level}</Badge>
                  <div className="flex items-center space-x-1">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm">С {new Date(user.joinDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <Button variant="outline" onClick={() => setIsAuthenticated(false)}>
                <LogOut className="w-4 h-4 mr-2" />
                Выйти
              </Button>
            </div>
          </CardHeader>
        </Card>

        <Tabs value={profileTab} onValueChange={setProfileTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview">Обзор</TabsTrigger>
            <TabsTrigger value="achievements">Достижения</TabsTrigger>
            <TabsTrigger value="statistics">Статистика</TabsTrigger>
            <TabsTrigger value="settings">Настройки</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Общие монеты</CardTitle>
                  <Coins className="h-4 w-4 text-yellow-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.totalCoins.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">FinanceCoins</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Пройдено квизов</CardTitle>
                  <BookOpen className="h-4 w-4 text-blue-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.completedQuizzes}</div>
                  <p className="text-xs text-muted-foreground">из {quizCategories.length * 5} доступных</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Завершено сценариев</CardTitle>
                  <Play className="h-4 w-4 text-green-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.completedScenarios}</div>
                  <p className="text-xs text-muted-foreground">из 10 доступных</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Получено бейджей</CardTitle>
                  <Award className="h-4 w-4 text-purple-600" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{user.badges}</div>
                  <p className="text-xs text-muted-foreground">из 20 доступных</p>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Прогресс по категориям</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quizCategories.slice(0, 5).map((category) => {
                    const progress = Math.floor(Math.random() * 100)
                    return (
                      <div key={category.id} className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="flex items-center space-x-2">
                            <span>{category.icon}</span>
                            <span>{category.title}</span>
                          </span>
                          <span>{progress}%</span>
                        </div>
                        <Progress value={progress} className="h-2" />
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Последняя активность</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { action: "Завершен квиз 'Инвестиции'", time: "2 часа назад", icon: "📈" },
                    { action: "Получен бейдж 'Мастер бюджета'", time: "1 день назад", icon: "🏆" },
                    { action: "Пройден сценарий 'Первая зарплата'", time: "2 дня назад", icon: "💰" },
                    { action: "Отсканирован QR-код", time: "3 дня назад", icon: "📱" },
                  ].map((activity, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="text-2xl">{activity.icon}</div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{activity.action}</p>
                        <p className="text-xs text-muted-foreground">{activity.time}</p>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="achievements" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { name: "Первые шаги", description: "Завершите первый квиз", icon: "🎯", earned: true },
                {
                  name: "Мастер бюджета",
                  description: "Пройдите все квизы по бюджетированию",
                  icon: "💰",
                  earned: true,
                },
                { name: "Инвестор", description: "Изучите основы инвестирования", icon: "📈", earned: true },
                { name: "Налоговый эксперт", description: "Освойте налоговое планирование", icon: "📋", earned: false },
                {
                  name: "Предприниматель",
                  description: "Пройдите курс по предпринимательству",
                  icon: "🚀",
                  earned: false,
                },
                { name: "Криптоэнтузиаст", description: "Изучите мир криптовалют", icon: "₿", earned: false },
                { name: "Пенсионный планировщик", description: "Подготовьтесь к пенсии", icon: "👴", earned: false },
                { name: "AR-исследователь", description: "Используйте все AR-элементы", icon: "🥽", earned: true },
                { name: "QR-мастер", description: "Отсканируйте 50 QR-кодов", icon: "📱", earned: false },
              ].map((achievement, index) => (
                <Card key={index} className={achievement.earned ? "border-yellow-200 bg-yellow-50" : ""}>
                  <CardHeader>
                    <div className="flex items-center space-x-3">
                      <div className="text-3xl">{achievement.icon}</div>
                      <div>
                        <CardTitle className="text-lg">{achievement.name}</CardTitle>
                        <CardDescription>{achievement.description}</CardDescription>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {achievement.earned ? (
                      <Badge variant="default" className="bg-yellow-600">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        Получено
                      </Badge>
                    ) : (
                      <Badge variant="outline">Не получено</Badge>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="statistics" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Статистика квизов</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {quizCategories.map((category) => {
                    const completed = Math.floor(Math.random() * category.questions.length)
                    const accuracy = Math.floor(Math.random() * 40) + 60
                    return (
                      <div key={category.id} className="flex items-center justify-between p-3 border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <span className="text-2xl">{category.icon}</span>
                          <div>
                            <p className="font-medium">{category.title}</p>
                            <p className="text-sm text-muted-foreground">
                              {completed}/{category.questions.length} вопросов
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-green-600">{accuracy}%</p>
                          <p className="text-xs text-muted-foreground">точность</p>
                        </div>
                      </div>
                    )
                  })}
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Заработанные монеты</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {[
                    { source: "Квизы", amount: 850, icon: "📚" },
                    { source: "Сценарии", amount: 400, icon: "🎮" },
                    { source: "Бонусы", amount: 200, icon: "🎁" },
                    { source: "Достижения", amount: 150, icon: "🏆" },
                  ].map((earning, index) => (
                    <div key={index} className="flex items-center justify-between p-3 border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{earning.icon}</span>
                        <span className="font-medium">{earning.source}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Coins className="w-4 h-4 text-yellow-600" />
                        <span className="font-bold">{earning.amount}</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="settings" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Настройки профиля</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="profile-name">Имя</Label>
                  <Input id="profile-name" defaultValue={user.name} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-email">Email</Label>
                  <Input id="profile-email" type="email" defaultValue={user.email} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="profile-bio">О себе</Label>
                  <Textarea id="profile-bio" placeholder="Расскажите о себе..." />
                </div>
                <Button>Сохранить изменения</Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Уведомления</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email уведомления</p>
                    <p className="text-sm text-muted-foreground">Получать уведомления о новых достижениях</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Включено
                  </Button>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Push уведомления</p>
                    <p className="text-sm text-muted-foreground">Уведомления в браузере</p>
                  </div>
                  <Button variant="outline" size="sm">
                    Выключено
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    )
  }

  // Остальные компоненты (QuizInterface, ScenarioPlayer, QRScanner) остаются без изменений
  const QuizInterface = ({ quiz, onComplete, onBack, userAnswers, setUserAnswers }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [score, setScore] = useState(0)

    const handleAnswer = (questionId, answerIndex) => {
      setUserAnswers((prev) => ({
        ...prev,
        [questionId]: answerIndex,
      }))
    }

    const handleNext = () => {
      if (currentQuestion < quiz.questions.length - 1) {
        setCurrentQuestion((prev) => prev + 1)
      } else {
        calculateScore()
      }
    }

    const calculateScore = () => {
      let correctAnswers = 0
      quiz.questions.forEach((question) => {
        if (userAnswers[question.id] === question.correct) {
          correctAnswers++
        }
      })
      const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100)
      const earnedCoins = Math.round((finalScore / 100) * quiz.reward)
      setScore(finalScore)
      setShowResult(true)
      setTimeout(() => {
        onComplete(finalScore, earnedCoins)
      }, 3000)
    }

    const question = quiz.questions[currentQuestion]

    if (showResult) {
      const earnedCoins = Math.round((score / 100) * quiz.reward)
      return (
        <Card className="max-w-2xl mx-auto">
          <CardHeader className="text-center">
            <div className="text-6xl mb-4">{score >= 80 ? "🏆" : score >= 60 ? "🥈" : score >= 40 ? "🥉" : "📚"}</div>
            <CardTitle className="text-2xl">Квиз завершен!</CardTitle>
            <CardDescription>Результаты по теме: {quiz.title}</CardDescription>
          </CardHeader>
          <CardContent className="text-center space-y-4">
            <div className="text-4xl font-bold text-blue-600">{score}%</div>
            <p className="text-lg">
              Правильных ответов: {Math.round((score / 100) * quiz.questions.length)} из {quiz.questions.length}
            </p>
            <div className="flex items-center justify-center space-x-2 bg-yellow-100 px-4 py-2 rounded-full">
              <span className="text-2xl">🪙</span>
              <span className="font-bold text-yellow-800">+{earnedCoins} FinanceCoins</span>
            </div>
          </CardContent>
        </Card>
      )
    }

    return (
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <div className="flex justify-between items-center">
            <Button variant="outline" onClick={onBack}>
              ← Назад к квизам
            </Button>
            <Badge variant="outline">
              {currentQuestion + 1} из {quiz.questions.length}
            </Badge>
          </div>
          <CardTitle className="flex items-center space-x-3">
            <span className="text-2xl">{quiz.icon}</span>
            <span>{quiz.title}</span>
          </CardTitle>
          <Progress value={((currentQuestion + 1) / quiz.questions.length) * 100} className="w-full" />
        </CardHeader>
        <CardContent className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-4">{question.question}</h3>
            <div className="space-y-3">
              {question.options.map((option, index) => (
                <div
                  key={index}
                  className={`p-4 border rounded-lg cursor-pointer transition-colors ${
                    userAnswers[question.id] === index
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                  onClick={() => handleAnswer(question.id, index)}
                >
                  <div className="flex items-center space-x-3">
                    <div
                      className={`w-4 h-4 rounded-full border-2 ${
                        userAnswers[question.id] === index ? "border-blue-500 bg-blue-500" : "border-gray-300"
                      }`}
                    >
                      {userAnswers[question.id] === index && (
                        <div className="w-full h-full rounded-full bg-white scale-50"></div>
                      )}
                    </div>
                    <span>{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center">
            <Button
              variant="outline"
              onClick={() => setCurrentQuestion((prev) => Math.max(0, prev - 1))}
              disabled={currentQuestion === 0}
            >
              Предыдущий
            </Button>
            <Button onClick={handleNext} disabled={userAnswers[question.id] === undefined}>
              {currentQuestion === quiz.questions.length - 1 ? "Завершить" : "Следующий"}
            </Button>
          </div>
        </CardContent>
      </Card>
    )
  }

  // Если пользователь не авторизован, показываем форму входа
  if (!isAuthenticated) {
    return <AuthComponent />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Trophy className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FinanceGame Pro</h1>
                <p className="text-sm text-gray-500">Добро пожаловать, {user.name}!</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
                <Coins className="w-4 h-4 text-yellow-600" />
                <span className="font-bold text-yellow-800">{gameCoins.toLocaleString()}</span>
              </div>
              <Button variant="outline" size="sm" onClick={() => setActiveTab("profile")}>
                <User className="w-4 h-4 mr-2" />
                Профиль
              </Button>
              <Avatar className="cursor-pointer" onClick={() => setActiveTab("profile")}>
                <AvatarImage src={user.avatar || "/placeholder.svg"} />
                <AvatarFallback>
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="dashboard" className="flex items-center space-x-2">
              <BarChart3 className="w-4 h-4" />
              <span>Дашборд</span>
            </TabsTrigger>
            <TabsTrigger value="students" className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Ученики</span>
            </TabsTrigger>
            <TabsTrigger value="quizzes" className="flex items-center space-x-2">
              <BookOpen className="w-4 h-4" />
              <span>Квизы</span>
            </TabsTrigger>
            <TabsTrigger value="scenarios" className="flex items-center space-x-2">
              <Play className="w-4 h-4" />
              <span>Сценарии</span>
            </TabsTrigger>
            <TabsTrigger value="gamification" className="flex items-center space-x-2">
              <Trophy className="w-4 h-4" />
              <span>Геймификация</span>
            </TabsTrigger>
            <TabsTrigger value="integration" className="flex items-center space-x-2">
              <Smartphone className="w-4 h-4" />
              <span>Интеграция</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center space-x-2">
              <User className="w-4 h-4" />
              <span>Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileComponent />
          </TabsContent>

          <TabsContent value="quizzes" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold">Интерактивные квизы</h2>
              <div className="flex items-center space-x-4">
                <div className="flex items-center space-x-2 bg-yellow-100 px-3 py-1 rounded-full">
                  <span className="text-2xl">🪙</span>
                  <span className="font-bold text-yellow-800">{gameCoins.toLocaleString()}</span>
                </div>
              </div>
            </div>

            {!currentQuiz ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {quizCategories.map((category) => (
                  <Card key={category.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="text-3xl">{category.icon}</div>
                          <div>
                            <CardTitle className="text-lg">{category.title}</CardTitle>
                            <CardDescription>{category.description}</CardDescription>
                          </div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex justify-between items-center">
                        <div className="flex items-center space-x-2">
                          <span className="text-2xl">🪙</span>
                          <span className="font-bold text-green-600">+{category.reward}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge variant="outline">{category.questions.length} вопросов</Badge>
                          <Badge
                            variant={
                              category.difficulty === "Легкий"
                                ? "default"
                                : category.difficulty === "Средний"
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {category.difficulty}
                          </Badge>
                        </div>
                      </div>
                      <Button className="w-full" onClick={() => setCurrentQuiz(category)}>
                        Начать квиз
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <QuizInterface
                quiz={currentQuiz}
                onComplete={(score, earnedCoins) => {
                  setQuizScore(score)
                  setGameCoins((prev) => prev + earnedCoins)
                  setCurrentQuiz(null)
                  setUserAnswers({})
                }}
                onBack={() => {
                  setCurrentQuiz(null)
                  setUserAnswers({})
                }}
                userAnswers={userAnswers}
                setUserAnswers={setUserAnswers}
              />
            )}
          </TabsContent>

          {/* Остальные вкладки остаются без изменений */}
          <TabsContent value="dashboard" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Активные ученики</CardTitle>
                  <Users className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">24</div>
                  <p className="text-xs text-muted-foreground">+2 за последнюю неделю</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Завершенные игры</CardTitle>
                  <Target className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">156</div>
                  <p className="text-xs text-muted-foreground">+12% от прошлого месяца</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Средний прогресс</CardTitle>
                  <TrendingUp className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">78%</div>
                  <p className="text-xs text-muted-foreground">+5% улучшение</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Выданные бейджи</CardTitle>
                  <Award className="h-4 w-4 text-muted-foreground" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">89</div>
                  <p className="text-xs text-muted-foreground">За текущий месяц</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Игровая валюта</CardTitle>
                  <div className="text-2xl">🪙</div>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{gameCoins.toLocaleString()}</div>
                  <p className="text-xs text-muted-foreground">FinanceCoins заработано</p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  )
}

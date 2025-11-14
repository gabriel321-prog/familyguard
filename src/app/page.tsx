"use client"

import { useState, useEffect } from "react"
import { 
  Smartphone, 
  Clock, 
  MapPin, 
  Shield, 
  AlertTriangle,
  TrendingUp,
  Battery,
  Wifi,
  Lock,
  Unlock,
  Settings,
  Bell,
  Search,
  Filter,
  MoreVertical,
  CheckCircle2,
  XCircle,
  Eye,
  MessageSquare,
  Image as ImageIcon,
  Video,
  Globe,
  Calendar,
  Trophy,
  Star,
  Gift,
  BookOpen,
  Utensils,
  Bed,
  Trash2,
  Plus,
  Crown,
  Zap,
  Check,
  X as XIcon,
  Moon,
  Sun
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Switch } from "@/components/ui/switch"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Planos de assinatura
const subscriptionPlans = [
  {
    id: "free",
    name: "Gratuito",
    price: "R$ 0",
    period: "/mês",
    description: "Perfeito para começar",
    icon: Shield,
    color: "from-gray-400 to-gray-500",
    features: [
      { name: "1 dispositivo", included: true },
      { name: "Monitoramento básico", included: true },
      { name: "Limite de tempo de tela", included: true },
      { name: "Relatórios semanais", included: true },
      { name: "Sistema de tarefas", included: false },
      { name: "Bloqueio de apps", included: false },
      { name: "Localização GPS", included: false },
      { name: "Alertas em tempo real", included: false },
      { name: "Suporte prioritário", included: false }
    ],
    popular: false
  },
  {
    id: "family",
    name: "Família",
    price: "R$ 29,90",
    period: "/mês",
    description: "Ideal para famílias",
    icon: Star,
    color: "from-blue-500 to-purple-600",
    features: [
      { name: "Até 3 dispositivos", included: true },
      { name: "Monitoramento completo", included: true },
      { name: "Limite de tempo de tela", included: true },
      { name: "Relatórios diários", included: true },
      { name: "Sistema de tarefas", included: true },
      { name: "Bloqueio de apps", included: true },
      { name: "Localização GPS", included: true },
      { name: "Alertas em tempo real", included: true },
      { name: "Suporte prioritário", included: false }
    ],
    popular: true
  },
  {
    id: "premium",
    name: "Premium",
    price: "R$ 49,90",
    period: "/mês",
    description: "Proteção máxima",
    icon: Crown,
    color: "from-yellow-500 to-orange-600",
    features: [
      { name: "Dispositivos ilimitados", included: true },
      { name: "Monitoramento avançado", included: true },
      { name: "Limite de tempo de tela", included: true },
      { name: "Relatórios personalizados", included: true },
      { name: "Sistema de tarefas", included: true },
      { name: "Bloqueio de apps", included: true },
      { name: "Localização GPS", included: true },
      { name: "Alertas em tempo real", included: true },
      { name: "Suporte prioritário 24/7", included: true }
    ],
    popular: false
  },
  {
    id: "enterprise",
    name: "Empresarial",
    price: "R$ 99,90",
    period: "/mês",
    description: "Para escolas e instituições",
    icon: Zap,
    color: "from-emerald-500 to-teal-600",
    features: [
      { name: "Dispositivos ilimitados", included: true },
      { name: "Dashboard administrativo", included: true },
      { name: "Gestão de múltiplas famílias", included: true },
      { name: "Relatórios avançados", included: true },
      { name: "Sistema de tarefas", included: true },
      { name: "Bloqueio de apps", included: true },
      { name: "Localização GPS", included: true },
      { name: "Alertas em tempo real", included: true },
      { name: "Suporte dedicado + treinamento", included: true }
    ],
    popular: false
  }
]

// Tipos de tarefas por idade
const taskTemplates = {
  "3-6": [
    { name: "Guardar brinquedos", icon: Gift, time: 15, points: 10 },
    { name: "Escovar os dentes", icon: Star, time: 5, points: 5 },
    { name: "Arrumar a cama", icon: Bed, time: 10, points: 8 },
  ],
  "7-10": [
    { name: "Fazer lição de casa", icon: BookOpen, time: 30, points: 20 },
    { name: "Organizar o quarto", icon: Bed, time: 20, points: 15 },
    { name: "Ajudar na cozinha", icon: Utensils, time: 15, points: 12 },
    { name: "Ler por 20 minutos", icon: BookOpen, time: 20, points: 15 },
  ],
  "11-14": [
    { name: "Estudar 1 hora", icon: BookOpen, time: 60, points: 30 },
    { name: "Lavar a louça", icon: Utensils, time: 20, points: 15 },
    { name: "Tirar o lixo", icon: Trash2, time: 10, points: 10 },
    { name: "Limpar o quarto", icon: Bed, time: 30, points: 20 },
  ],
  "15-17": [
    { name: "Estudar 2 horas", icon: BookOpen, time: 120, points: 50 },
    { name: "Ajudar nas tarefas domésticas", icon: Utensils, time: 30, points: 25 },
    { name: "Organizar espaço pessoal", icon: Bed, time: 30, points: 20 },
    { name: "Ler livro educativo", icon: BookOpen, time: 45, points: 30 },
  ]
}

// Dados simulados
const devices = [
  {
    id: 1,
    name: "iPhone de Maria",
    child: "Maria Silva",
    avatar: "MS",
    age: 12,
    ageGroup: "11-14",
    status: "online",
    battery: 78,
    location: "Casa",
    screenTime: 180, // minutos usados
    screenTimeLimit: 240, // limite em minutos (4h)
    bonusTime: 30, // tempo bônus disponível
    lastActivity: "Agora",
    alerts: 2,
    points: 85,
    tasksCompleted: 3,
    tasksTotal: 5
  },
  {
    id: 2,
    name: "Samsung de João",
    child: "João Silva",
    avatar: "JS",
    age: 8,
    ageGroup: "7-10",
    status: "online",
    battery: 45,
    location: "Escola",
    screenTime: 90,
    screenTimeLimit: 180, // 3h para criança menor
    bonusTime: 15,
    lastActivity: "5 min atrás",
    alerts: 0,
    points: 120,
    tasksCompleted: 4,
    tasksTotal: 4
  },
  {
    id: 3,
    name: "iPad de Ana",
    child: "Ana Silva",
    avatar: "AS",
    age: 5,
    ageGroup: "3-6",
    status: "offline",
    battery: 92,
    location: "Casa",
    screenTime: 45,
    screenTimeLimit: 120, // 2h para criança pequena
    bonusTime: 0,
    lastActivity: "30 min atrás",
    alerts: 1,
    points: 45,
    tasksCompleted: 2,
    tasksTotal: 3
  }
]

const activities = [
  {
    id: 1,
    child: "Maria Silva",
    avatar: "MS",
    type: "app",
    app: "Instagram",
    action: "Abriu o aplicativo",
    time: "2 min atrás",
    duration: "45 min",
    icon: ImageIcon,
    status: "warning"
  },
  {
    id: 2,
    child: "João Silva",
    avatar: "JS",
    type: "web",
    app: "YouTube",
    action: "Assistindo vídeos",
    time: "5 min atrás",
    duration: "1h 20min",
    icon: Video,
    status: "alert"
  },
  {
    id: 3,
    child: "Ana Silva",
    avatar: "AS",
    type: "message",
    app: "WhatsApp",
    action: "Enviou 12 mensagens",
    time: "15 min atrás",
    duration: "30 min",
    icon: MessageSquare,
    status: "normal"
  },
]

const topApps = [
  { name: "Instagram", time: "3h 45min", percentage: 85, icon: ImageIcon, color: "from-pink-500 to-purple-500" },
  { name: "YouTube", time: "2h 30min", percentage: 65, icon: Video, color: "from-red-500 to-red-600" },
  { name: "WhatsApp", time: "1h 50min", percentage: 45, icon: MessageSquare, color: "from-green-500 to-green-600" },
  { name: "TikTok", time: "1h 20min", percentage: 35, icon: Video, color: "from-cyan-500 to-blue-500" },
  { name: "Jogos", time: "45min", percentage: 20, icon: Smartphone, color: "from-orange-500 to-red-500" }
]

const alerts = [
  {
    id: 1,
    child: "Maria Silva",
    avatar: "MS",
    type: "time",
    message: "Excedeu o limite de 4h de tela",
    time: "30 min atrás",
    severity: "high"
  },
  {
    id: 2,
    child: "João Silva",
    avatar: "JS",
    type: "content",
    message: "Tentou acessar conteúdo bloqueado",
    time: "1h atrás",
    severity: "medium"
  },
  {
    id: 3,
    child: "Ana Silva",
    avatar: "AS",
    type: "location",
    message: "Saiu da área segura definida",
    time: "2h atrás",
    severity: "high"
  }
]

export default function ParentalControlApp() {
  const [darkMode, setDarkMode] = useState(false)
  const [selectedDevice, setSelectedDevice] = useState(devices[0])
  const [searchQuery, setSearchQuery] = useState("")
  const [showPlansDialog, setShowPlansDialog] = useState(false)
  const [currentPlan, setCurrentPlan] = useState("free")
  const [tasks, setTasks] = useState<any[]>([
    { id: 1, childId: 1, name: "Fazer lição de casa", icon: BookOpen, time: 30, points: 20, completed: true, completedAt: "14:30" },
    { id: 2, childId: 1, name: "Organizar o quarto", icon: Bed, time: 20, points: 15, completed: true, completedAt: "16:00" },
    { id: 3, childId: 1, name: "Ajudar na cozinha", icon: Utensils, time: 15, points: 12, completed: false },
    { id: 4, childId: 1, name: "Ler por 20 minutos", icon: BookOpen, time: 20, points: 15, completed: true, completedAt: "19:00" },
    { id: 5, childId: 2, name: "Fazer lição de casa", icon: BookOpen, time: 30, points: 20, completed: true, completedAt: "15:00" },
    { id: 6, childId: 2, name: "Guardar brinquedos", icon: Gift, time: 15, points: 10, completed: true, completedAt: "18:00" },
  ])
  const [showAddTaskDialog, setShowAddTaskDialog] = useState(false)
  const [newTaskName, setNewTaskName] = useState("")
  const [newTaskTime, setNewTaskTime] = useState("15")
  const [newTaskPoints, setNewTaskPoints] = useState("10")

  // Aplicar modo escuro ao body
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }, [darkMode])

  const formatTime = (minutes: number) => {
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    if (hours > 0) {
      return `${hours}h ${mins}min`
    }
    return `${mins}min`
  }

  const getTimeRemaining = (device: any) => {
    const remaining = device.screenTimeLimit - device.screenTime
    return Math.max(0, remaining)
  }

  const getTimePercentage = (device: any) => {
    return Math.min(100, (device.screenTime / device.screenTimeLimit) * 100)
  }

  const handleCompleteTask = (taskId: number) => {
    setTasks(tasks.map(task => 
      task.id === taskId 
        ? { ...task, completed: true, completedAt: new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' }) }
        : task
    ))
  }

  const handleUnlockTime = (device: any, minutes: number) => {
    // Simula desbloquear tempo bônus
    alert(`${minutes} minutos desbloqueados para ${device.child}!`)
  }

  const getChildTasks = (childId: number) => {
    return tasks.filter(task => task.childId === childId)
  }

  const getCompletedTasksToday = (childId: number) => {
    return tasks.filter(task => task.childId === childId && task.completed).length
  }

  const getTotalPointsToday = (childId: number) => {
    return tasks
      .filter(task => task.childId === childId && task.completed)
      .reduce((sum, task) => sum + task.points, 0)
  }

  const handleAddTask = () => {
    const newTask = {
      id: tasks.length + 1,
      childId: selectedDevice.id,
      name: newTaskName,
      icon: BookOpen,
      time: parseInt(newTaskTime),
      points: parseInt(newTaskPoints),
      completed: false
    }
    setTasks([...tasks, newTask])
    setShowAddTaskDialog(false)
    setNewTaskName("")
    setNewTaskTime("15")
    setNewTaskPoints("10")
  }

  const getCurrentPlanName = () => {
    const plan = subscriptionPlans.find(p => p.id === currentPlan)
    return plan?.name || "Gratuito"
  }

  return (
    <div className={`min-h-screen ${darkMode ? 'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900' : 'bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50'}`}>
      {/* Header */}
      <header className={`border-b ${darkMode ? 'bg-gray-900/80' : 'bg-white/80'} backdrop-blur-sm sticky top-0 z-50`}>
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  FamilyGuard
                </h1>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Proteja e incentive seus filhos</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="icon"
                onClick={() => setDarkMode(!darkMode)}
                className="relative"
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setShowPlansDialog(true)}
                className="hidden sm:flex items-center gap-2"
              >
                <Crown className="w-4 h-4" />
                {getCurrentPlanName()}
              </Button>
              <Button variant="ghost" size="icon" className="relative">
                <Bell className="w-5 h-5" />
                {alerts.length > 0 && (
                  <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                    {alerts.length}
                  </span>
                )}
              </Button>
              <Button variant="ghost" size="icon">
                <Settings className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Plans Dialog */}
      <Dialog open={showPlansDialog} onOpenChange={setShowPlansDialog}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">Escolha seu Plano</DialogTitle>
            <DialogDescription>
              Selecione o plano ideal para proteger sua família
            </DialogDescription>
          </DialogHeader>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-6">
            {subscriptionPlans.map((plan) => {
              const Icon = plan.icon
              const isCurrentPlan = currentPlan === plan.id
              
              return (
                <Card 
                  key={plan.id}
                  className={`relative transition-all hover:shadow-xl ${
                    plan.popular 
                      ? 'border-2 border-blue-500 shadow-lg' 
                      : isCurrentPlan
                      ? 'border-2 border-green-500'
                      : ''
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-blue-500 to-purple-600">
                        Mais Popular
                      </Badge>
                    </div>
                  )}
                  
                  {isCurrentPlan && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                      <Badge className="bg-gradient-to-r from-green-500 to-emerald-600">
                        Plano Atual
                      </Badge>
                    </div>
                  )}

                  <CardHeader className="text-center pb-4">
                    <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${plan.color} flex items-center justify-center`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-xl">{plan.name}</CardTitle>
                    <CardDescription className="text-sm">{plan.description}</CardDescription>
                    <div className="mt-4">
                      <span className="text-4xl font-bold">{plan.price}</span>
                      <span className="text-muted-foreground">{plan.period}</span>
                    </div>
                  </CardHeader>

                  <CardContent className="space-y-4">
                    <Separator />
                    
                    <div className="space-y-3">
                      {plan.features.map((feature, index) => (
                        <div key={index} className="flex items-start gap-2">
                          {feature.included ? (
                            <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          ) : (
                            <XIcon className="w-5 h-5 text-gray-300 flex-shrink-0 mt-0.5" />
                          )}
                          <span className={`text-sm ${!feature.included ? 'text-muted-foreground line-through' : ''}`}>
                            {feature.name}
                          </span>
                        </div>
                      ))}
                    </div>

                    <Button 
                      className={`w-full mt-4 ${
                        plan.popular 
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700' 
                          : ''
                      }`}
                      variant={isCurrentPlan ? "outline" : "default"}
                      disabled={isCurrentPlan}
                      onClick={() => {
                        setCurrentPlan(plan.id)
                        setShowPlansDialog(false)
                      }}
                    >
                      {isCurrentPlan ? 'Plano Atual' : 'Selecionar Plano'}
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>

          <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950 rounded-lg p-6 mt-4">
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-500 rounded-lg">
                <Shield className="w-6 h-6 text-white" />
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-lg mb-2">Garantia de 7 dias</h3>
                <p className="text-sm text-muted-foreground">
                  Experimente qualquer plano por 7 dias. Se não ficar satisfeito, devolvemos 100% do seu dinheiro.
                </p>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <div className="container mx-auto px-4 py-6 space-y-6">
        {/* Stats Overview */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <Card className="border-none shadow-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Smartphone className="w-4 h-4" />
                Dispositivos Ativos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">2/3</div>
              <p className="text-xs text-blue-100 mt-1">Online agora</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Clock className="w-4 h-4" />
                Tempo Total Hoje
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">5h 15min</div>
              <p className="text-xs text-purple-100 mt-1">Dentro dos limites</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-orange-500 to-red-500 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Trophy className="w-4 h-4" />
                Tarefas Completas
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">9/12</div>
              <p className="text-xs text-orange-100 mt-1">Hoje</p>
            </CardContent>
          </Card>

          <Card className="border-none shadow-lg bg-gradient-to-br from-green-500 to-emerald-600 text-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium flex items-center gap-2">
                <Star className="w-4 h-4" />
                Pontos Ganhos
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">250</div>
              <p className="text-xs text-green-100 mt-1">Esta semana</p>
            </CardContent>
          </Card>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Devices */}
          <div className="lg:col-span-1 space-y-6">
            <Card className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Smartphone className="w-5 h-5" />
                  Dispositivos
                </CardTitle>
                <CardDescription>Monitore todos os aparelhos</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                {devices.map((device) => {
                  const timeRemaining = getTimeRemaining(device)
                  const timePercentage = getTimePercentage(device)
                  const isLimitReached = timeRemaining === 0

                  return (
                    <div
                      key={device.id}
                      onClick={() => setSelectedDevice(device)}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all hover:shadow-md ${
                        selectedDevice.id === device.id
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-950"
                          : "border-gray-200 dark:border-gray-700 hover:border-blue-300"
                      }`}
                    >
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <Avatar className="w-10 h-10">
                            <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                              {device.avatar}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-semibold text-sm">{device.child}</h3>
                            <p className="text-xs text-muted-foreground">{device.age} anos</p>
                          </div>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          {device.alerts > 0 && (
                            <Badge variant="destructive" className="text-xs">
                              {device.alerts}
                            </Badge>
                          )}
                          <Badge variant="secondary" className="text-xs">
                            <Trophy className="w-3 h-3 mr-1" />
                            {device.points}
                          </Badge>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-center justify-between text-xs">
                          <span className="flex items-center gap-1 text-muted-foreground">
                            <Clock className="w-3 h-3" />
                            Tempo restante
                          </span>
                          <span className={`font-medium ${isLimitReached ? 'text-red-500' : ''}`}>
                            {isLimitReached ? 'Limite atingido' : formatTime(timeRemaining)}
                          </span>
                        </div>
                        <Progress value={timePercentage} className={`h-2 ${isLimitReached ? '[&>div]:bg-red-500' : ''}`} />

                        {device.bonusTime > 0 && (
                          <div className="flex items-center justify-between pt-1">
                            <span className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                              <Gift className="w-3 h-3" />
                              Tempo bônus disponível
                            </span>
                            <span className="text-xs font-medium text-green-600 dark:text-green-400">
                              +{device.bonusTime}min
                            </span>
                          </div>
                        )}

                        <div className="flex items-center justify-between pt-2">
                          <span className="flex items-center gap-1 text-xs">
                            <div className={`w-2 h-2 rounded-full ${device.status === 'online' ? 'bg-green-500' : 'bg-gray-400'}`} />
                            {device.status === 'online' ? 'Online' : 'Offline'}
                          </span>
                          <span className="text-xs text-muted-foreground">
                            {device.tasksCompleted}/{device.tasksTotal} tarefas
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </CardContent>
            </Card>

            {/* Alerts Card */}
            <Card className="shadow-lg border-red-200 dark:border-red-900">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertTriangle className="w-5 h-5" />
                  Alertas Recentes
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                {alerts.map((alert) => (
                  <div key={alert.id} className="p-3 rounded-lg bg-red-50 dark:bg-red-950 border border-red-200 dark:border-red-900">
                    <div className="flex items-start gap-3">
                      <Avatar className="w-8 h-8">
                        <AvatarFallback className="bg-red-500 text-white text-xs">
                          {alert.avatar}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-red-900 dark:text-red-100">
                          {alert.child}
                        </p>
                        <p className="text-xs text-red-700 dark:text-red-300 mt-1">
                          {alert.message}
                        </p>
                        <p className="text-xs text-red-600 dark:text-red-400 mt-1">
                          {alert.time}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Device Details */}
            <Card className="shadow-lg">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle className="flex items-center gap-2">
                      {selectedDevice.child}
                      <Badge variant={selectedDevice.status === 'online' ? 'default' : 'secondary'}>
                        {selectedDevice.status === 'online' ? 'Online' : 'Offline'}
                      </Badge>
                    </CardTitle>
                    <CardDescription>{selectedDevice.age} anos • {selectedDevice.name}</CardDescription>
                  </div>
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    Ver Tela
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="time" className="w-full">
                  <TabsList className="grid w-full grid-cols-4">
                    <TabsTrigger value="time">Tempo</TabsTrigger>
                    <TabsTrigger value="tasks">Tarefas</TabsTrigger>
                    <TabsTrigger value="apps">Apps</TabsTrigger>
                    <TabsTrigger value="controls">Controles</TabsTrigger>
                  </TabsList>

                  <TabsContent value="time" className="space-y-4 mt-4">
                    {/* Time Management */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <Card className="border-2 border-blue-200 dark:border-blue-900">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            Tempo de Tela Hoje
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold">{formatTime(selectedDevice.screenTime)}</div>
                          <Progress value={getTimePercentage(selectedDevice)} className="mt-3 h-2" />
                          <div className="flex items-center justify-between mt-2">
                            <p className="text-xs text-muted-foreground">
                              Limite: {formatTime(selectedDevice.screenTimeLimit)}
                            </p>
                            <p className={`text-xs font-medium ${getTimeRemaining(selectedDevice) === 0 ? 'text-red-500' : 'text-green-600'}`}>
                              {getTimeRemaining(selectedDevice) === 0 ? 'Esgotado' : `${formatTime(getTimeRemaining(selectedDevice))} restante`}
                            </p>
                          </div>
                        </CardContent>
                      </Card>

                      <Card className="border-2 border-green-200 dark:border-green-900">
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium text-muted-foreground flex items-center gap-2">
                            <Gift className="w-4 h-4" />
                            Tempo Bônus
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-3xl font-bold text-green-600 dark:text-green-400">
                            +{selectedDevice.bonusTime}min
                          </div>
                          <p className="text-xs text-muted-foreground mt-3">
                            Ganho completando tarefas
                          </p>
                          {selectedDevice.bonusTime > 0 && (
                            <Button 
                              size="sm" 
                              className="w-full mt-3 bg-gradient-to-r from-green-500 to-emerald-600"
                              onClick={() => handleUnlockTime(selectedDevice, selectedDevice.bonusTime)}
                            >
                              <Unlock className="w-4 h-4 mr-2" />
                              Desbloquear Agora
                            </Button>
                          )}
                        </CardContent>
                      </Card>
                    </div>

                    {/* Time Rewards Info */}
                    <Card className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950 dark:to-blue-950 border-purple-200 dark:border-purple-900">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <Trophy className="w-5 h-5 text-purple-600" />
                          Como Ganhar Mais Tempo
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="space-y-3">
                        <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                          <div className="p-2 bg-purple-500 rounded-lg">
                            <CheckCircle2 className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Complete tarefas diárias</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Cada tarefa concluída libera tempo bônus
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                          <div className="p-2 bg-blue-500 rounded-lg">
                            <Star className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Acumule pontos</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              100 pontos = 30 minutos extras
                            </p>
                          </div>
                        </div>

                        <div className="flex items-start gap-3 p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg">
                          <div className="p-2 bg-green-500 rounded-lg">
                            <Gift className="w-4 h-4 text-white" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Recompensas especiais</p>
                            <p className="text-xs text-muted-foreground mt-1">
                              Conquistas desbloqueiam bônus extras
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="tasks" className="space-y-4 mt-4">
                    {/* Tasks Progress */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Tarefas Hoje
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="text-2xl font-bold">
                            {getCompletedTasksToday(selectedDevice.id)}/{getChildTasks(selectedDevice.id).length}
                          </div>
                          <Progress 
                            value={(getCompletedTasksToday(selectedDevice.id) / getChildTasks(selectedDevice.id).length) * 100} 
                            className="mt-2 h-2" 
                          />
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Pontos Ganhos
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <Star className="w-5 h-5 text-yellow-500" />
                            <div className="text-2xl font-bold">{getTotalPointsToday(selectedDevice.id)}</div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">Hoje</p>
                        </CardContent>
                      </Card>

                      <Card>
                        <CardHeader className="pb-3">
                          <CardTitle className="text-sm font-medium text-muted-foreground">
                            Tempo Ganho
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="flex items-center gap-2">
                            <Gift className="w-5 h-5 text-green-500" />
                            <div className="text-2xl font-bold">+{selectedDevice.bonusTime}min</div>
                          </div>
                          <p className="text-xs text-muted-foreground mt-2">Disponível</p>
                        </CardContent>
                      </Card>
                    </div>

                    {/* Tasks List */}
                    <Card>
                      <CardHeader>
                        <div className="flex items-center justify-between">
                          <CardTitle className="text-base">Tarefas de Hoje</CardTitle>
                          <Dialog open={showAddTaskDialog} onOpenChange={setShowAddTaskDialog}>
                            <DialogTrigger asChild>
                              <Button size="sm" variant="outline">
                                <Plus className="w-4 h-4 mr-2" />
                                Adicionar
                              </Button>
                            </DialogTrigger>
                            <DialogContent>
                              <DialogHeader>
                                <DialogTitle>Adicionar Nova Tarefa</DialogTitle>
                                <DialogDescription>
                                  Crie uma tarefa personalizada para {selectedDevice.child}
                                </DialogDescription>
                              </DialogHeader>
                              <div className="space-y-4 py-4">
                                <div className="space-y-2">
                                  <Label htmlFor="taskName">Nome da Tarefa</Label>
                                  <Input
                                    id="taskName"
                                    placeholder="Ex: Fazer lição de casa"
                                    value={newTaskName}
                                    onChange={(e) => setNewTaskName(e.target.value)}
                                  />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                  <div className="space-y-2">
                                    <Label htmlFor="taskTime">Tempo (min)</Label>
                                    <Input
                                      id="taskTime"
                                      type="number"
                                      value={newTaskTime}
                                      onChange={(e) => setNewTaskTime(e.target.value)}
                                    />
                                  </div>
                                  <div className="space-y-2">
                                    <Label htmlFor="taskPoints">Pontos</Label>
                                    <Input
                                      id="taskPoints"
                                      type="number"
                                      value={newTaskPoints}
                                      onChange={(e) => setNewTaskPoints(e.target.value)}
                                    />
                                  </div>
                                </div>
                              </div>
                              <DialogFooter>
                                <Button variant="outline" onClick={() => setShowAddTaskDialog(false)}>
                                  Cancelar
                                </Button>
                                <Button onClick={handleAddTask} disabled={!newTaskName}>
                                  Adicionar Tarefa
                                </Button>
                              </DialogFooter>
                            </DialogContent>
                          </Dialog>
                        </div>
                        <CardDescription>
                          Tarefas adequadas para {selectedDevice.age} anos
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <ScrollArea className="h-[400px] pr-4">
                          <div className="space-y-3">
                            {getChildTasks(selectedDevice.id).map((task) => {
                              const Icon = task.icon
                              return (
                                <div 
                                  key={task.id} 
                                  className={`p-4 rounded-lg border-2 transition-all ${
                                    task.completed 
                                      ? 'bg-green-50 dark:bg-green-950 border-green-200 dark:border-green-900' 
                                      : 'bg-white dark:bg-gray-900 border-gray-200 dark:border-gray-700'
                                  }`}
                                >
                                  <div className="flex items-start gap-3">
                                    <div className={`p-2 rounded-lg ${
                                      task.completed 
                                        ? 'bg-green-500' 
                                        : 'bg-gradient-to-br from-blue-500 to-purple-600'
                                    }`}>
                                      <Icon className="w-4 h-4 text-white" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                      <div className="flex items-center justify-between mb-2">
                                        <h4 className={`font-semibold text-sm ${task.completed ? 'line-through text-muted-foreground' : ''}`}>
                                          {task.name}
                                        </h4>
                                        {task.completed && (
                                          <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300">
                                            <CheckCircle2 className="w-3 h-3 mr-1" />
                                            Completa
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="flex items-center gap-4 text-xs text-muted-foreground">
                                        <span className="flex items-center gap-1">
                                          <Clock className="w-3 h-3" />
                                          {task.time} min
                                        </span>
                                        <span className="flex items-center gap-1">
                                          <Star className="w-3 h-3 text-yellow-500" />
                                          {task.points} pontos
                                        </span>
                                        {task.completed && task.completedAt && (
                                          <span className="flex items-center gap-1 text-green-600 dark:text-green-400">
                                            Concluída às {task.completedAt}
                                          </span>
                                        )}
                                      </div>
                                      {!task.completed && (
                                        <Button 
                                          size="sm" 
                                          className="w-full mt-3 bg-gradient-to-r from-green-500 to-emerald-600"
                                          onClick={() => handleCompleteTask(task.id)}
                                        >
                                          <CheckCircle2 className="w-4 h-4 mr-2" />
                                          Marcar como Completa
                                        </Button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              )
                            })}
                          </div>
                        </ScrollArea>
                      </CardContent>
                    </Card>

                    {/* Suggested Tasks */}
                    <Card className="bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950 dark:to-purple-950">
                      <CardHeader>
                        <CardTitle className="text-base flex items-center gap-2">
                          <BookOpen className="w-5 h-5" />
                          Tarefas Sugeridas para {selectedDevice.age} anos
                        </CardTitle>
                        <CardDescription>
                          Baseadas na idade e desenvolvimento
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                          {taskTemplates[selectedDevice.ageGroup as keyof typeof taskTemplates].map((template, index) => {
                            const Icon = template.icon
                            return (
                              <div key={index} className="p-3 bg-white/50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                                <div className="flex items-center gap-2 mb-2">
                                  <Icon className="w-4 h-4 text-blue-600" />
                                  <p className="font-medium text-sm">{template.name}</p>
                                </div>
                                <div className="flex items-center gap-3 text-xs text-muted-foreground">
                                  <span>{template.time} min</span>
                                  <span>•</span>
                                  <span className="flex items-center gap-1">
                                    <Star className="w-3 h-3 text-yellow-500" />
                                    {template.points} pts
                                  </span>
                                </div>
                              </div>
                            )
                          })}
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="apps" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Apps Mais Usados</CardTitle>
                        <CardDescription>Tempo de uso hoje</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-4">
                        {topApps.map((app, index) => {
                          const Icon = app.icon
                          return (
                            <div key={index} className="space-y-2">
                              <div className="flex items-center justify-between">
                                <div className="flex items-center gap-3">
                                  <div className={`p-2 rounded-lg bg-gradient-to-br ${app.color}`}>
                                    <Icon className="w-4 h-4 text-white" />
                                  </div>
                                  <div>
                                    <p className="font-medium text-sm">{app.name}</p>
                                    <p className="text-xs text-muted-foreground">{app.time}</p>
                                  </div>
                                </div>
                                <Button variant="ghost" size="sm">
                                  <Lock className="w-4 h-4" />
                                </Button>
                              </div>
                              <Progress value={app.percentage} className="h-2" />
                            </div>
                          )
                        })}
                      </CardContent>
                    </Card>
                  </TabsContent>

                  <TabsContent value="controls" className="space-y-4 mt-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Controles e Restrições</CardTitle>
                        <CardDescription>Configure limites e bloqueios</CardDescription>
                      </CardHeader>
                      <CardContent className="space-y-6">
                        <div className="space-y-4">
                          <div className="flex items-center justify-between p-4 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Clock className="w-5 h-5 text-blue-500" />
                              <div>
                                <p className="font-medium text-sm">Limite de Tempo de Tela</p>
                                <p className="text-xs text-muted-foreground">{formatTime(selectedDevice.screenTimeLimit)} por dia</p>
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Trophy className="w-5 h-5 text-yellow-500" />
                              <div>
                                <p className="font-medium text-sm">Sistema de Tarefas</p>
                                <p className="text-xs text-muted-foreground">Ganhe tempo completando tarefas</p>
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Shield className="w-5 h-5 text-green-500" />
                              <div>
                                <p className="font-medium text-sm">Filtro de Conteúdo</p>
                                <p className="text-xs text-muted-foreground">Bloquear conteúdo impróprio</p>
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>

                          <div className="flex items-center justify-between p-4 rounded-lg border">
                            <div className="flex items-center gap-3">
                              <Lock className="w-5 h-5 text-red-500" />
                              <div>
                                <p className="font-medium text-sm">Bloqueio Noturno</p>
                                <p className="text-xs text-muted-foreground">22:00 - 07:00</p>
                              </div>
                            </div>
                            <Switch defaultChecked />
                          </div>
                        </div>

                        <Separator />

                        <div className="space-y-3">
                          <h4 className="font-semibold text-sm">Ações Rápidas</h4>
                          <div className="grid grid-cols-2 gap-3">
                            <Button variant="outline" className="w-full">
                              <Lock className="w-4 h-4 mr-2" />
                              Bloquear Agora
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Unlock className="w-4 h-4 mr-2" />
                              Desbloquear
                            </Button>
                            <Button variant="outline" className="w-full">
                              <Gift className="w-4 h-4 mr-2" />
                              Dar Bônus
                            </Button>
                            <Button variant="outline" className="w-full">
                              <MapPin className="w-4 h-4 mr-2" />
                              Localizar
                            </Button>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}

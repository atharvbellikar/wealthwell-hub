import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Trophy, Star, Target, TrendingUp } from "lucide-react";

const Rewards = () => {
  const achievements = [
    {
      title: "First Transaction",
      description: "Add your first income or expense",
      icon: Star,
      completed: false,
      points: 10
    },
    {
      title: "Budget Master",
      description: "Create your first monthly budget",
      icon: Target,
      completed: false,
      points: 25
    },
    {
      title: "Investment Starter",
      description: "Track your first investment",
      icon: TrendingUp,
      completed: false,
      points: 50
    },
    {
      title: "Week Tracker",
      description: "Log transactions for 7 consecutive days",
      icon: Trophy,
      completed: false,
      points: 100
    }
  ];

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold text-foreground">Rewards & Achievements</h1>
        <p className="text-muted-foreground">
          Earn points and unlock achievements for good financial habits
        </p>
      </div>

      {/* Points Overview */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="h-16 w-16 rounded-full bg-gradient-primary flex items-center justify-center">
                <Trophy className="h-8 w-8 text-white" />
              </div>
              <div>
                <h3 className="text-2xl font-bold text-foreground">0 Points</h3>
                <p className="text-muted-foreground">Start earning by completing achievements</p>
              </div>
            </div>
            <Badge variant="secondary" className="text-lg px-4 py-2">
              Level 1
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Achievements */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-foreground">Achievements</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {achievements.map((achievement, index) => (
            <Card key={achievement.title} className={`transition-all duration-300 ${achievement.completed ? 'bg-success/5 border-success/20' : ''}`}>
              <CardContent className="p-6">
                <div className="flex items-center space-x-4">
                  <div className={`h-12 w-12 rounded-lg flex items-center justify-center ${
                    achievement.completed 
                      ? 'bg-success text-success-foreground' 
                      : 'bg-muted text-muted-foreground'
                  }`}>
                    <achievement.icon className="h-6 w-6" />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold text-foreground">{achievement.title}</h3>
                      <Badge variant={achievement.completed ? "default" : "secondary"}>
                        {achievement.points} pts
                      </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground mt-1">
                      {achievement.description}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Rewards;
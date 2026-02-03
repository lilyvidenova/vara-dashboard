import * as React from 'react'
import {
  Megaphone,
  Users,
  MessageCircle,
  Target,
  Heart,
  Sparkles,
  DollarSign,
  Zap,
} from 'lucide-react'

import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import { cn } from '@/lib/utils'
import { GOALS } from '@/types/onboarding'

const goalIcons: Record<string, React.ReactNode> = {
  'increase-brand-awareness': <Megaphone className="h-5 w-5" />,
  'grow-audience': <Users className="h-5 w-5" />,
  'boost-engagement': <MessageCircle className="h-5 w-5" />,
  'reach-right-people': <Target className="h-5 w-5" />,
  'build-loyalty': <Heart className="h-5 w-5" />,
  'improve-content-quality': <Sparkles className="h-5 w-5" />,
  'drive-revenue-roi': <DollarSign className="h-5 w-5" />,
  'work-efficiently': <Zap className="h-5 w-5" />,
}

interface GoalsStepProps {
  selectedGoals: string[]
  onGoalsChange: (goals: string[]) => void
}

export function GoalsStep({ selectedGoals, onGoalsChange }: GoalsStepProps) {
  const toggleGoal = (goalId: string) => {
    if (selectedGoals.includes(goalId)) {
      onGoalsChange(selectedGoals.filter((id) => id !== goalId))
    } else {
      onGoalsChange([...selectedGoals, goalId])
    }
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="text-center">
        <h1 className="text-2xl font-semibold tracking-tight md:text-3xl">
          What are your goals?
        </h1>
        <p className="mt-2 text-muted-foreground">
          Select all the goals you want to achieve with your content.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
        {GOALS.map((goal) => {
          const isSelected = selectedGoals.includes(goal.id)

          return (
            <button
              key={goal.id}
              type="button"
              onClick={() => toggleGoal(goal.id)}
              className={cn(
                'flex items-center gap-3 rounded-lg border p-4 text-left transition-colors',
                'hover:border-primary hover:bg-primary/5',
                'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2',
                isSelected && 'border-primary bg-primary/5'
              )}
            >
              <Checkbox
                checked={isSelected}
                onCheckedChange={() => toggleGoal(goal.id)}
                className="pointer-events-none"
                aria-hidden="true"
              />
              <div
                className={cn(
                  'flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted',
                  isSelected && 'bg-primary/10 text-primary'
                )}
              >
                {goalIcons[goal.id]}
              </div>
              <Label className="cursor-pointer text-sm font-medium">
                {goal.label}
              </Label>
            </button>
          )
        })}
      </div>

      {selectedGoals.length === 0 && (
        <p className="text-center text-sm text-muted-foreground">
          Please select at least one goal to continue.
        </p>
      )}
    </div>
  )
}

import { LucideIcon, Radio, Sparkles, Target, Repeat, CircleDollarSign } from 'lucide-react'

export type OutcomeId =
  | 'brand-awareness'
  | 'engagement'
  | 'targeting'
  | 'audience-satisfaction'
  | 'audience-loyalty'

export interface OutcomeConfig {
  id: OutcomeId
  name: string
  slug: string
  icon: LucideIcon
  subtitle: string
}

export const OUTCOMES: OutcomeConfig[] = [
  {
    id: 'brand-awareness',
    name: 'Brand Awareness',
    slug: 'brand-awareness',
    icon: Radio,
    subtitle: 'Reach, visibility & impressions',
  },
  {
    id: 'engagement',
    name: 'Engagement',
    slug: 'engagement',
    icon: Sparkles,
    subtitle: 'Likes, comments, shares & interactions',
  },
  {
    id: 'targeting',
    name: 'Targeting',
    slug: 'targeting',
    icon: Target,
    subtitle: 'Demographic alignment with target audience',
  },
  {
    id: 'audience-satisfaction',
    name: 'Audience Satisfaction',
    slug: 'audience-satisfaction',
    icon: Repeat,
    subtitle: 'Reach, visibility & Impressions',
  },
  {
    id: 'audience-loyalty',
    name: 'Audience Loyalty',
    slug: 'audience-loyalty',
    icon: CircleDollarSign,
    subtitle: 'Platform-generated revenue',
  },
]

export const getOutcomeById = (id: OutcomeId): OutcomeConfig | undefined =>
  OUTCOMES.find((o) => o.id === id)

export const getOutcomeBySlug = (slug: string): OutcomeConfig | undefined =>
  OUTCOMES.find((o) => o.slug === slug)

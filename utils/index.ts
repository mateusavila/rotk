import { z } from 'zod'

export interface LoggedUser {
  id: string
  name: string
  email: string
  avatar: string
  level: number
}

export const login = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'Must be at least 8 characters')
}).required()

export type Login = z.output<typeof login>

export interface FamousGenerals {
  name: string
  slug: string
  image: string
  width: number
  height: number
}

export interface NamesGenerals {
  key: string
  label: string
  avatar: string
}

export interface GeneralData {
  id: string
  name: string
  avatar: string
  slug: string
  skills: string[]
  bio: string
  birth: number | string
  luck: number
  soldiers: number
  loyalty: number
  health: number
  navigation: boolean
  is_ruler: boolean
  navy_command: number
  army_command: number
  stats: {
    rotk1: {
      active: boolean
      intelligence: number | null
      power: number | null
      charisma: number | null
    }
    rotk2: {
      active: boolean
      intelligence: number | null
      power: number | null
      charisma: number | null
    }
    rotk3: {
      active: boolean
      intelligence: number | null
      power: number | null
      politics: number
      charisma: number | null
    }
    rotk4: {
      active: boolean
      lead: number | null
      intelligence: number | null
      power: number | null
      charisma: number | null
      politics: number | null
    }
    rotk7: {
      active: boolean
      intelligence: number | null
      power: number | null
      charisma: number | null
      politics: number | null
    }
    rotk8: {
      active: boolean
      intelligence: number | null
      power: number | null
      charisma: number | null
      politics: number | null
    }
    rotk9: {
      active: boolean
      intelligence: number | null
      power: number | null
      lead: number | null
      politics: number | null
    }
    rotk10: {
      active: boolean
      intelligence: number | null
      power: number | null
      charisma: number | null
      lead: number | null
      politics: number | null
    }
    rotk11: {
      active: boolean
      intelligence: number | null
      power: number | null
      charisma: number | null
      lead: number | null
      politics: number | null
    }
  },
  advanced_stats: {
    averages_per_game: {
      rotk1: number
      rotk2: number
      rotk3: number
      rotk4: number
      rotk7: number
      rotk8: number
      rotk9: number
      rotk10: number
      rotk11: number
    }
    totals_per_game: {
      rotk1: number
      rotk2: number
      rotk3: number
      rotk4: number
      rotk7: number
      rotk8: number
      rotk9: number
      rotk10: number
      rotk11: number
    }
    stats_averages: {
      intelligence: number
      power: number
      charisma: number
      politics: number
      lead: number
    }
    stats_max: {
      intelligence: number
      power: number
      charisma: number
      politics: number
      lead: number
    }
    stats_min: {
      intelligence: number
      power: number
      charisma: number
      politics: number
      lead: number
    }
  }
}
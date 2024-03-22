export interface FamousGenerals {
  name: string
  slug: string
  image: string
  width: number
  height: number
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
      intelligence: number
      power: number
      charisma: number
    } | false
    rotk2: {
      intelligence: number
      power: number
      charisma: number
    } | false
    rotk3: {
      intelligence: number
      power: number
      politics: number
      charisma: number
    } | false
    rotk4: {
      lead: number
      intelligence: number
      power: number
      charisma: number
      politics: number
    } | false
    rotk7: {
      intelligence: number
      power: number
      charisma: number
      politics: number
    } | false
    rotk8: {
      intelligence: number
      power: number
      charisma: number
      politics: number
    } | false
    rotk9: {
      intelligence: number
      power: number
      lead: number
      politics: number
    } | false
    rotk10: {
      intelligence: number
      power: number
      charisma: number
      lead: number
      politics: number
    } | false
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
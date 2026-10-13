export interface Topic {
  id: number
  title: string
  description: string
  icon: string
  difficulty: 'beginner' | 'intermediate' | 'advanced'
}

export interface Lesson {
  id: number
  topic_id: number
  title: string
  content: string
  order: number
}

export interface Command {
  id: number
  topic_id: number
  name: string
  syntax: string
  description: string
  example: string
}

export interface TopicDetail extends Topic {
  lessons: Lesson[]
  commands: Command[]
}



// ═══════════════════════════════════════════
//  AUTH
// ═══════════════════════════════════════════
export interface User {
  id: number
  username: string
  is_admin: boolean
  created_at: string
}

export interface AuthResponse {
  access_token: string
  token_type: string
  user: User
}

import { UserType } from '@/models/report'

export default function colorForUser (user: UserType) {
  return {
    MODERATION: 'red',
    BOT: 'blue',
    TARGET: 'green'
  }[user]
}

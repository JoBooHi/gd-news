import { supabase } from './supabase'

export async function issueWarning(userId: string, reason: string) {
  const { data: user, error } = await supabase
    .from('users')
    .select('warn_count, achievements')
    .eq('id', userId)
    .single()

  if (error || !user) return null

  const nextWarns = user.warn_count + 1

  if (nextWarns >= 5) {
    // 5-й варн: выдаем ачивку и перманентный бан
    const newAchievements = Array.from(new Set([...(user.achievements || []), '😂 ЛОХ']))

    await supabase
      .from('users')
      .update({
        warn_count: 5,
        is_banned: true,
        achievements: newAchievements,
        last_warn_at: new Date().toISOString()
      })
      .eq('id', userId)

    return { banned: true, achievementUnlocked: '😂 ЛОХ' }
  }

  // Обычный варн (1-4)
  await supabase
    .from('users')
    .update({
      warn_count: nextWarns,
      last_warn_at: new Date().toISOString()
    })
    .eq('id', userId)

  await supabase.from('notifications').insert({
    user_id: userId,
    type: 'warn',
    message: `Вы получили предупреждение (${nextWarns}/5): ${reason}`
  })

  return { banned: false, warnCount: nextWarns }
}

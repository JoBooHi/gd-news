const BAD_WORDS = ['хуй', 'пизда', 'ебать', 'блять', 'сука', 'fuck', 'shit', 'bitch']

export function checkSwears(text: string, context: 'chat' | 'post' | 'news'): { isValid: boolean; count: number } {
  if (context === 'chat') {
    return { isValid: true, count: 0 } // Чат и ЛС — без ограничений
  }

  const words = text.toLowerCase().replace(/[.,!?()]/g, '').split(/\s+/)
  let swearCount = 0

  for (const word of words) {
    if (BAD_WORDS.some((bad) => word.includes(bad))) {
      swearCount++
    }
  }

  if (context === 'news') {
    return { isValid: swearCount === 0, count: swearCount } // Новости — строго 0
  }

  return { isValid: swearCount <= 10, count: swearCount } // Посты — до 10 слов
}

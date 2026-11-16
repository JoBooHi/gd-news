'use client'
import { useState } from 'react'

export default function HomePage() {
  const [theme, setTheme] = useState<'dark' | 'light'>('dark')
  const [lang, setLang] = useState<'RU' | 'EN'>('RU')
  const [feed, setFeed] = useState<'verified' | 'fresh'>('verified')
  const [category, setCategory] = useState<'all' | 'trends' | 'archive' | 'hardcore' | 'major'>('all')

  const isDark = theme === 'dark'

  const t = {
    verified: lang === 'RU' ? 'Проверенные новости' : 'Verified News',
    fresh: lang === 'RU' ? 'Свежее / Предложка' : 'Fresh / Community',
    random: lang === 'RU' ? '🎲 Случайная новость' : '🎲 Random News',
    discussing: lang === 'RU' ? '🔥 Сейчас обсуждают' : '🔥 Trending Discussions',
    topDemons: lang === 'RU' ? '😈 Топ-3 демона прямо сейчас' : '😈 Top 3 Demons Right Now',
    login: lang === 'RU' ? 'Войти через Google' : 'Sign in with Google',
    pubDate: lang === 'RU' ? 'Опубликовано' : 'Published',
    eventDate: lang === 'RU' ? 'Дата события в ГД' : 'GD Event Date'
  }

  return (
    <div className={isDark ? 'min-h-screen bg-[#0a0a12] text-white' : 'min-h-screen bg-gray-50 text-gray-900'}>
      {/* Бегущая строка Breaking News */}
      <div className="bg-gradient-to-r from-purple-700 via-cyan-600 to-lime-500 text-black font-bold text-xs py-1 px-4 overflow-hidden">
        BREAKING NEWS: Aeternus verification progress reaches new milestone! • Geometry Dash 2.21 update rumors
      </div>

      {/* Шапка */}
      <header className={`border-b ${isDark ? 'border-purple-900/50 bg-[#0f0f1a]' : 'border-gray-200 bg-white'} px-6 py-4 flex flex-wrap items-center justify-between gap-4`}>
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-lime-400 border-2 border-cyan-400 rounded-sm shadow-[0_0_12px_#22d3ee]" />
          <span className="text-xl font-black tracking-wider bg-gradient-to-r from-cyan-400 to-lime-400 bg-clip-text text-transparent">
            GD PULSE
          </span>
        </div>

        <div className="flex items-center gap-3">
          {/* Переключатель языка */}
          <button 
            onClick={() => setLang(lang === 'RU' ? 'EN' : 'RU')}
            className="px-3 py-1.5 rounded border border-cyan-500/40 text-xs font-bold hover:bg-cyan-500/10"
          >
            {lang}
          </button>

          {/* Переключатель темы */}
          <button 
            onClick={() => setTheme(isDark ? 'light' : 'dark')}
            className="px-3 py-1.5 rounded border border-purple-500/40 text-xs font-bold hover:bg-purple-500/10"
          >
            {isDark ? '☀️ Light' : '🌙 Neon Dark'}
          </button>

          {/* Случайная новость */}
          <button className="px-3 py-1.5 rounded bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold">
            {t.random}
          </button>

          {/* Вход через Google */}
          <button className="px-4 py-1.5 rounded bg-lime-400 hover:bg-lime-300 text-black text-xs font-black">
            {t.login}
          </button>
        </div>
      </header>

      {/* Основной контент */}
      <main className="max-w-6xl mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Левая колонка: Ленты и фильтры */}
        <div className="lg:col-span-2 space-y-6">
          {/* Переключатель 2 лент */}
          <div className="flex gap-2 border-b border-purple-500/30 pb-3">
            <button
              onClick={() => setFeed('verified')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                feed === 'verified' ? 'bg-cyan-500 text-black' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {t.verified}
            </button>
            <button
              onClick={() => setFeed('fresh')}
              className={`px-4 py-2 rounded-lg font-bold text-sm transition ${
                feed === 'fresh' ? 'bg-lime-400 text-black' : 'opacity-70 hover:opacity-100'
              }`}
            >
              {t.fresh}
            </button>
          </div>

          {/* Категории-фильтры */}
          <div className="flex flex-wrap gap-2">
            {[
              { id: 'all', label: lang === 'RU' ? 'Все' : 'All' },
              { id: 'trends', label: lang === 'RU' ? 'Тренды' : 'Trends' },
              { id: 'archive', label: lang === 'RU' ? 'Давнее' : 'Archive' },
              { id: 'hardcore', label: lang === 'RU' ? 'Сложнейшее' : 'Hardcore' },
              { id: 'major', label: lang === 'RU' ? 'Крупнейшее' : 'Major' }
            ].map((cat) => (
              <button
                key={cat.id}
                onClick={() => setCategory(cat.id as typeof category)}
                className={`px-3 py-1 rounded-full text-xs font-semibold border ${
                  category === cat.id
                    ? 'border-cyan-400 bg-cyan-400/20 text-cyan-300'
                    : 'border-gray-600/40 opacity-75'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>

          {/* Пример карточки новости с ДВУМЯ датами */}
          <article className={`p-5 rounded-xl border ${isDark ? 'bg-[#121222] border-purple-500/30' : 'bg-white border-gray-200 shadow-sm'}`}>
            <div className="flex flex-wrap items-center justify-between gap-2 text-xs mb-3">
              <span className="px-2 py-0.5 rounded bg-red-600/20 text-red-400 border border-red-500/40 font-bold">
                Extreme Demon • Сложнейшее
              </span>
              <div className="flex gap-4 opacity-80">
                <span>📅 {t.eventDate}: <b>14.11.2026</b></span>
                <span>🕒 {t.pubDate}: <b>16.11.2026</b></span>
              </div>
            </div>
            <h2 className="text-xl font-extrabold mb-2">
              {lang === 'RU' 
                ? 'База данных готова к запуску! Добавьте первую новость через панель модератора' 
                : 'Database is ready! Add your first news via the moderator panel'}
            </h2>
            <p className="text-sm opacity-80">
              {lang === 'RU'
                ? 'Здесь будут отображаться одобренные статьи с авто-ссылками на уровни и встроенными плеерами YouTube/Twitch.'
                : 'Approved articles with auto-linked levels and embedded YouTube/Twitch players will appear here.'}
            </p>
          </article>
        </div>

        {/* Правая колонка: Виджеты удержания */}
        <aside className="space-y-6">
          <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#121222] border-cyan-500/30' : 'bg-white border-gray-200'}`}>
            <h3 className="font-black text-sm uppercase tracking-wider text-cyan-400 mb-3">{t.topDemons}</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex justify-between"><span>#1 Tidal Wave</span><span className="text-xs opacity-60">OniLink</span></li>
              <li className="flex justify-between"><span>#2 Avernus</span><span className="text-xs opacity-60">PockeWindfish</span></li>
              <li className="flex justify-between"><span>#3 Acheron</span><span className="text-xs opacity-60">ryamu</span></li>
            </ul>
          </div>

          <div className={`p-4 rounded-xl border ${isDark ? 'bg-[#121222] border-lime-500/30' : 'bg-white border-gray-200'}`}>
            <h3 className="font-black text-sm uppercase tracking-wider text-lime-400 mb-3">{t.discussing}</h3>
            <p className="text-xs opacity-70">
              {lang === 'RU' ? 'Пока нет активных обсуждений за 24 часа.' : 'No active discussions in the last 24h yet.'}
            </p>
          </div>
        </aside>
      </main>
    </div>
  )
}

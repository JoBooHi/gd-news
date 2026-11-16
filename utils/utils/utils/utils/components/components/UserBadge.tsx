'use client'
import { useState } from 'react'
import { supabase } from '@/utils/supabase'

interface Props {
  targetUser: {
    id: string
    username: string
    role: 'USER' | 'MODERATOR' | 'OWNER'
    equipped_badges?: string[]
  }
  viewerRole: 'USER' | 'MODERATOR' | 'OWNER' | null
}

export default function UserBadge({ targetUser, viewerRole }: Props) {
  const [showTooltip, setShowTooltip] = useState(false)
  const [role, setRole] = useState(targetUser.role)

  const makeModerator = async () => {
    const { error } = await supabase
      .from('users')
      .update({ role: 'MODERATOR' })
      .eq('id', targetUser.id)

    if (!error) {
      setRole('MODERATOR')
      setShowTooltip(false)
    }
  }

  return (
    <div 
      className="relative inline-flex items-center gap-1.5"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <span className="font-bold">{targetUser.username}</span>

      {/* Плашка Владельца */}
      {role === 'OWNER' && (
        <span className="px-1.5 py-0.5 text-xs font-extrabold bg-gradient-to-r from-purple-600 to-cyan-500 text-white rounded">
          Владелец
        </span>
      )}

      {/* Синяя буква М для Модератора */}
      {role === 'MODERATOR' && (
        <span className="px-1.5 py-0.5 text-xs font-black bg-blue-600 text-white rounded">
          М
        </span>
      )}

      {/* До 5 выбранных ачивок */}
      {targetUser.equipped_badges?.slice(0, 5).map((badge, idx) => (
        <span key={idx} className="text-xs bg-zinc-800 px-1 rounded border border-zinc-700">
          {badge}
        </span>
      ))}

      {/* Всплывающая кнопка ТОЛЬКО для Владельца при наведении на обычного юзера */}
      {viewerRole === 'OWNER' && role === 'USER' && showTooltip && (
        <div className="absolute left-0 -top-9 z-20 bg-zinc-900 border border-cyan-400 px-2 py-1 rounded shadow-xl whitespace-nowrap">
          <button 
            onClick={makeModerator}
            className="text-xs font-semibold text-cyan-400 hover:text-lime-400"
          >
            + Назначить модератором
          </button>
        </div>
      )}
    </div>
  )
}

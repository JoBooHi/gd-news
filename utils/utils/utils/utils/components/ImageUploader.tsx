'use client'
import { useState } from 'react'
import * as nsfwjs from 'nsfwjs'
import { issueWarning } from '@/utils/banHandler'

interface Props {
  userId: string
  maxSizeMB: 5 | 10 // 5 МБ для аватара/баннера, 10 МБ для постов
  onVerified: (file: File) => void
}

export default function ImageUploader({ userId, maxSizeMB, onVerified }: Props) {
  const [checking, setChecking] = useState(false)
  const [statusMsg, setStatusMsg] = useState<string | null>(null)

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > maxSizeMB * 1024 * 1024) {
      setStatusMsg(`Файл превышает лимит ${maxSizeMB} МБ!`)
      return
    }

    setChecking(true)
    setStatusMsg('Нейросеть проверяет изображение...')

    try {
      const model = await nsfwjs.load()
      const img = document.createElement('img')
      img.src = URL.createObjectURL(file)
      await new Promise((res) => { img.onload = res })

      const predictions = await model.classify(img)
      const isNSFW = predictions.some(
        (p) => (p.className === 'Porn' || p.className === 'Hentai') && p.probability > 0.65
      )

      if (isNSFW) {
        setStatusMsg('БЛОКИРОВКА: Обнаружен 18+ контент! Начислен варн.')
        const res = await issueWarning(userId, 'Попытка загрузки NSFW-изображения')
        if (res?.banned) {
          alert('ДОСТИЖЕНИЕ ПОЛУЧЕНО: 😂 ЛОХ\nВаш аккаунт заблокирован.')
          window.location.reload()
        }
      } else {
        setStatusMsg('Проверка пройдена!')
        onVerified(file)
      }
    } catch {
      setStatusMsg('Ошибка анализа изображения.')
    } finally {
      setChecking(false)
    }
  }

  return (
    <div className="p-3 border border-purple-500/40 rounded-lg">
      <input type="file" accept="image/*" onChange={handleFileChange} disabled={checking} />
      {statusMsg && <p className="mt-2 text-sm text-cyan-300">{statusMsg}</p>}
    </div>
  )
}

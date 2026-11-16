import Link from 'next/link'

const KNOWN_ENTITIES: Record<string, string> = {
  'GRIEF': '/entity/grief',
  'Aeternus': '/entity/aeternus',
  'Doggie': '/entity/doggie',
  'A6': '/entity/a6',
  'Zoink': '/entity/zoink'
}

export function renderTextWithEntities(text: string) {
  const regex = new RegExp(`\\b(${Object.keys(KNOWN_ENTITIES).join('|')})\\b`, 'g')
  const parts = text.split(regex)

  return parts.map((part, index) => {
    if (KNOWN_ENTITIES[part]) {
      return (
        <Link 
          key={index} 
          href={KNOWN_ENTITIES[part]}
          className="text-cyan-400 hover:text-lime-400 underline font-semibold transition-colors"
        >
          {part}
        </Link>
      )
    }
    return part
  })
}

import { MetadataRoute } from 'next'
import { supabase } from '@/utils/supabase'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://твой-домен.vercel.app'

  const { data: news } = await supabase.from('news').select('slug, published_at')

  const newsUrls = (news || []).map((item) => ({
    url: `${baseUrl}/news/${item.slug}`,
    lastModified: new Date(item.published_at),
    changeFrequency: 'daily' as const,
    priority: 0.8
  }))

  return [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'hourly', priority: 1.0 },
    ...newsUrls
  ]
}

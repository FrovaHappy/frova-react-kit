export default async function useFetchMd(url: string) {
  const file = await fetch(url).catch(() => {
    throw new Error('fetch: File not found')
  })
  if (!file.ok) {
    throw new Error('fetch: Error fetching file')
  }
  const headerType = file.headers.get('content-type')
  if (!(headerType?.includes('text/plain') || headerType?.includes('text/markdown'))) {
    console.warn(file.headers.get('content-type'))
    throw new Error('fetch: content type is not text/plain')
  }

  return await file.text()
}

export default async function useFetchMd(url: string) {
  const file = await fetch(url).catch(() => {
    throw new Error('fetch: File not found')
  })
  if (!file.ok) {
    throw new Error('fetch: Error fetching file')
  }
  if (file.headers.get('content-type') !== 'text/plain; charset=utf-8') {
    throw new Error('fetch: content type is not text/plain')
  }

  return await file.text()
}

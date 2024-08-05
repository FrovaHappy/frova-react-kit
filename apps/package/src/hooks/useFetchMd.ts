export const ErrorMessages = {
  noFound: 'fetch: File not found',
  fetch: 'fetch: Error fetching file',
  contentType: 'fetch: content type is not text/plain'
}

export default async function useFetchMd(url: string) {
  const file = await fetch(url).catch(() => {
    throw new Error(ErrorMessages.noFound)
  })
  if (!file.ok) {
    throw new Error(ErrorMessages.fetch)
  }
  const headerType = file.headers.get('content-type')
  if (!(headerType?.includes('text/plain') || headerType?.includes('text/markdown'))) {
    console.warn(file.headers.get('content-type'))
    throw new Error(ErrorMessages.contentType)
  }

  return await file.text()
}

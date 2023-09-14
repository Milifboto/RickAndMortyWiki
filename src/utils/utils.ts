export const getPageNumer = (url: string): number | null => {
  const urlObj = new URL(url);
  const pageNumber = urlObj.searchParams.get('page')
  
  if (pageNumber !== null) {
    return parseInt(pageNumber)
  }
  
  return null
}

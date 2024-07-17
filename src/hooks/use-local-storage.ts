const useLocalStorage = <T>(localStorageReference: string) => {
  const getFromLocal = () => {
    const dataAsString = localStorage.getItem(localStorageReference)
    if (!dataAsString) return null
    const data: T = JSON.parse(dataAsString)
    return data
  }

  const setLocal = (data: T | null) => {
    localStorage.setItem(localStorageReference, JSON.stringify(data))
  }

  if (!getFromLocal) {
    setLocal(null)
  }

  return { getFromLocal, setLocal }
}

export { useLocalStorage }

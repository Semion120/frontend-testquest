import type ICitizen from '@/types/citizen'
import type ICity from '@/types/city'

async function fetchCitizens() {
  try {
    const result: ICitizen[] = await (
      await fetch('https://api.convert-file.ru/cityzen')
    ).json()
    return { data: result, error: undefined }
  } catch (err: unknown) {
    return {
      data: undefined,
      error:
        err instanceof Error
          ? err.message
          : 'Ошибка при запросе горожан с сервера',
    }
  }
}

async function fetchCities() {
  try {
    const result: ICity[] = await (
      await fetch('https://api.convert-file.ru/city')
    ).json()
    return { data: result, error: undefined }
  } catch (err: unknown) {
    return {
      data: undefined,
      error:
        err instanceof Error
          ? err.message
          : 'Ошибка при запросе городов с сервера',
    }
  }
}

async function addUserToDataBase(newCitizen: ICitizen) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const newCitizenDatabase: any = {}
  newCitizenDatabase.name = newCitizen.name
  newCitizenDatabase.id = newCitizen.id
  newCitizenDatabase.city_id = newCitizen.city_id
  newCitizenDatabase.groups = []

  for (const key in newCitizen.groups) {
    newCitizenDatabase.groups.push({ type: key, name: newCitizen.groups[key] })
  }

  const result = await fetch('https://api.convert-file.ru/cityzen/add', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newCitizenDatabase),
  })
  return { status: result.status }
}

export default { fetchCitizens, fetchCities, addUserToDataBase }

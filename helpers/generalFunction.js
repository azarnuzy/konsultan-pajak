export const convertDate = (inputDate) => {
  if (inputDate === null) {
    return null
  }
  const date = new Date(inputDate)

  const day = date.getDate().toString().padStart(2, '0')
  const month = new Intl.DateTimeFormat('en-US', { month: 'long' }).format(date)
  const year = date.getFullYear()
  const hours = date.getHours() % 12 || 12
  const minutes = date.getMinutes().toString().padStart(2, '0')
  const amPm = date.getHours() < 12 ? 'AM' : 'PM'

  const formattedDate = `${day} ${month} ${year}  |  ${hours}:${minutes} ${amPm}`
  return formattedDate
}

export function convertToRupiah(value) {
  const formatter = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  })

  return formatter.format(value)
}

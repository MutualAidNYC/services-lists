export const formatDate = (
  date: string | number | Date,
  locales: string | string[] = 'en-US',
  monthFormat?: 'numeric' | '2-digit' | 'long' | 'short' | 'narrow',
  dayFormat?: 'numeric' | '2-digit',
  yearFormat?: 'numeric' | '2-digit'
): string => {
  return new Date(date).toLocaleDateString(locales, {
    month: monthFormat,
    day: dayFormat,
    year: yearFormat,
  })
}

export class DateConversion {
  public static formatDate(unixTime: number, format: 'short' | 'full'): string {
    const date = new Date(unixTime * 1000)
    if (format === 'short') {
      return date.toLocaleDateString(undefined, {
        weekday: 'short',
        month: 'short',
        day: '2-digit',
      })
    } else {
      return date.toISOString()
    }
  }
}

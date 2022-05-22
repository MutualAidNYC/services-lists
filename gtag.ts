export const sendPageView = (url?: string) => {
  window.gtag('config', process.env.NEXT_PUBLIC_GOOGLE_ANALYTICS as string, {
    page_path: url,
  })
}

export const sendEvent = (
  eventName: string,
  category?: string,
  label?: string,
  value?: number
) => {
  window.gtag('event', eventName, {
    event_category: category,
    event_label: label,
    value: value,
  })
}

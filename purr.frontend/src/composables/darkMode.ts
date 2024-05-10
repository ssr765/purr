export function useDarkMode() {
  const darkModeListener = () => {
    document.addEventListener('DOMContentLoaded', function () {
      // Check if the user prefers dark mode
      const prefersDarkMode = window.matchMedia(
        '(prefers-color-scheme: dark)',
      ).matches

      // Assign the 'dark' or 'light' class to the <html> element according to the preference
      if (prefersDarkMode) {
        document.documentElement.classList.add('dark')
      } else {
        document.documentElement.classList.add('light')
      }

      // Listen for changes in the prefers-color-scheme media query
      window
        .matchMedia('(prefers-color-scheme: dark)')
        .addEventListener('change', (event) => {
          if (event.matches) {
            document.documentElement.classList.replace('light', 'dark')
          } else {
            document.documentElement.classList.replace('dark', 'light')
          }
        })
    })
  }

  return { darkModeListener }
}

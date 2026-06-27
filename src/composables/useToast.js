import { useToast as usePrimeToast } from 'primevue/usetoast'

export function useToast() {
  const toast = usePrimeToast()

  return {
    success(message, title = 'Success') {
      toast.add({ severity: 'success', summary: title, detail: message, life: 3000 })
    },
    error(message, title = 'Error') {
      toast.add({ severity: 'error', summary: title, detail: message, life: 5000 })
    },
    warn(message, title = 'Warning') {
      toast.add({ severity: 'warn', summary: title, detail: message, life: 4000 })
    },
    info(message, title = 'Info') {
      toast.add({ severity: 'info', summary: title, detail: message, life: 3000 })
    },
  }
}

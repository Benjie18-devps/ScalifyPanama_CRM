import { useConfirm as usePrimeConfirm } from 'primevue/useconfirm'

export function useConfirm() {
  const confirm = usePrimeConfirm()

  /**
   * Show a delete confirmation dialog.
   * @param {string} message
   * @returns {Promise<boolean>}
   */
  function confirmDelete(message = 'Are you sure you want to delete this item? This action cannot be undone.') {
    return new Promise((resolve) => {
      confirm.require({
        message,
        header: 'Confirm Delete',
        icon: 'pi pi-exclamation-triangle',
        rejectLabel: 'Cancel',
        acceptLabel: 'Delete',
        acceptClass: 'p-button-danger',
        rejectClass: 'p-button-secondary p-button-outlined',
        accept: () => resolve(true),
        reject: () => resolve(false),
      })
    })
  }

  /**
   * Show a generic confirmation dialog.
   * @param {Object} options
   * @returns {Promise<boolean>}
   */
  function confirmAction({ message, header = 'Confirm', icon = 'pi pi-question-circle', acceptLabel = 'Confirm', rejectLabel = 'Cancel' } = {}) {
    return new Promise((resolve) => {
      confirm.require({
        message,
        header,
        icon,
        acceptLabel,
        rejectLabel,
        rejectClass: 'p-button-secondary p-button-outlined',
        accept: () => resolve(true),
        reject: () => resolve(false),
      })
    })
  }

  return { confirmDelete, confirmAction }
}

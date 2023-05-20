import Form from './ContactForm'
import { createFormDialog } from 'el-form-dialog'

export default createFormDialog({
  stateOneTitle: 'Add contact',
  stateTwoTitle: 'Edit contact',
  confirmText: 'Save',
  cancelText: 'Cancel'
})(Form)

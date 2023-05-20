import AboutForm from './AboutForm'
import { createFormDialog } from 'el-form-dialog'

export default createFormDialog({
  stateOneTitle: 'Add about',
  stateTwoTitle: 'Edit about',
  confirmText: 'Save',
  cancelText: 'Cancel'
})(AboutForm)

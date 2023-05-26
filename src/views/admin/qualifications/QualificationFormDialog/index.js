import Form from './QualificationForm'
import { createFormDialog } from 'el-form-dialog'

export default createFormDialog({
  stateOneTitle: 'Add qualification',
  stateTwoTitle: 'Edit qualification',
  confirmText: 'Save',
  cancelText: 'Cancel'
})(Form)

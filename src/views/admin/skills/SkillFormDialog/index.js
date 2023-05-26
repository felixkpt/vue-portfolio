import Form from './SkillForm'
import { createFormDialog } from 'el-form-dialog'

export default createFormDialog({
  stateOneTitle: 'Add skill',
  stateTwoTitle: 'Edit skill',
  confirmText: 'Save',
  cancelText: 'Cancel'
})(Form)

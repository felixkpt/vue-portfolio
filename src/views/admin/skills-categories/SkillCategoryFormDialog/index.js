import Form from './SkillCategoryForm'
import { createFormDialog } from 'el-form-dialog'

export default createFormDialog({
  stateOneTitle: 'Add skill category',
  stateTwoTitle: 'Edit skill category',
  confirmText: 'Save',
  cancelText: 'Cancel'
})(Form)

import CompanyForm from './CompanyForm'
import { createFormDialog } from 'el-form-dialog'

export default createFormDialog({
  stateOneTitle: 'Add company',
  stateTwoTitle: 'Edit company',
  confirmText: 'Save',
  cancelText: 'Cancel'
})(CompanyForm)

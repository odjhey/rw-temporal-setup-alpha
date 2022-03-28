import { Select } from '@mantine/core'
import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  Submit,
  useForm,
} from '@redwoodjs/forms'

const WorkflowRunForm = (props) => {
  const onSubmit = (data) => {
    props.onSave(data, props?.workflowRun?.id)
  }

  const formMethods = useForm()
  const fileSelect = formMethods.register('fileInput', { required: true })

  return (
    <div className="rw-form-wrapper">
      <Form formMethods={formMethods} onSubmit={onSubmit} error={props.error}>
        <FormError
          error={props.error}
          wrapperClassName="rw-form-error-wrapper"
          titleClassName="rw-form-error-title"
          listClassName="rw-form-error-list"
        />

        <Label
          name="temporalWorkflowId"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Temporal workflow id
        </Label>

        <TextField
          name="temporalWorkflowId"
          defaultValue={props.workflowRun?.temporalWorkflowId}
          className="rw-input"
          errorClassName="rw-input rw-input-error"
          validation={{ required: true }}
        />

        <FieldError name="temporalWorkflowId" className="rw-field-error" />

        <Label
          name={fileSelect.name}
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Input file
        </Label>

        <Select
          name={fileSelect.name}
          onChange={(value) => {
            fileSelect.onChange({
              target: { value, name: fileSelect.name },
            })
          }}
          data={props.selections.files}
        ></Select>
        <FieldError name={fileSelect.name} className="rw-field-error" />

        <div className="rw-button-group">
          <Submit disabled={props.loading} className="rw-button rw-button-blue">
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default WorkflowRunForm

import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'



const WorkflowRunResultForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    props.onSave(data, props?.workflowRunResult?.id)
  }

  return (
    <div className="rw-form-wrapper">
      <Form onSubmit={onSubmit} error={props.error}>
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
            defaultValue={props.workflowRunResult?.temporalWorkflowId}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="temporalWorkflowId" className="rw-field-error" />

        <Label
          name="result"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Result
        </Label>
        
          <TextAreaField
            name="result"
            defaultValue={JSON.stringify(props.workflowRunResult?.result)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ valueAsJSON: true, required: true }}
          />
        

        <FieldError name="result" className="rw-field-error" />

        <div className="rw-button-group">
          <Submit
            disabled={props.loading}
            className="rw-button rw-button-blue"
          >
            Save
          </Submit>
        </div>
      </Form>
    </div>
  )
}

export default WorkflowRunResultForm

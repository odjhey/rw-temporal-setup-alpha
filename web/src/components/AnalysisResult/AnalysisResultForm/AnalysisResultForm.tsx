import {
  Form,
  FormError,
  FieldError,
  Label,
  TextField,
  TextAreaField,
  Submit,
} from '@redwoodjs/forms'



const AnalysisResultForm = (props) => {
  const onSubmit = (data) => {

  
    
    
  
    
    
  
    
    
  
    
    
  
    props.onSave(data, props?.analysisResult?.id)
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
          name="ref"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Ref
        </Label>
        
          <TextField
            name="ref"
            defaultValue={props.analysisResult?.ref}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="ref" className="rw-field-error" />

        <Label
          name="source"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Source
        </Label>
        
          <TextField
            name="source"
            defaultValue={props.analysisResult?.source}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="source" className="rw-field-error" />

        <Label
          name="rawJson"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Raw json
        </Label>
        
          <TextAreaField
            name="rawJson"
            defaultValue={JSON.stringify(props.analysisResult?.rawJson)}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ valueAsJSON: true, required: true }}
          />
        

        <FieldError name="rawJson" className="rw-field-error" />

        <Label
          name="schemaVersion"
          className="rw-label"
          errorClassName="rw-label rw-label-error"
        >
          Schema version
        </Label>
        
          <TextField
            name="schemaVersion"
            defaultValue={props.analysisResult?.schemaVersion}
            className="rw-input"
            errorClassName="rw-input rw-input-error"
            validation={{ required: true }}
          />
        

        <FieldError name="schemaVersion" className="rw-field-error" />

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

export default AnalysisResultForm

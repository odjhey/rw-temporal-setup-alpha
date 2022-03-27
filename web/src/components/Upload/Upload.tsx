import {
  Form,
  Submit,
  FileField,
  TextField,
  FieldError,
  Label,
} from '@redwoodjs/forms'

function UploadC() {
  const onSubmit = async (data) => {
    console.log('submit data', data)
    const url = `http://localhost:8910/.redwood/functions/upload?name=${encodeURIComponent(
      data.objectName
    )}`

    const uploadUrl = await (await fetch(url, { method: 'GET' })).json()

    fetch(uploadUrl.url, {
      method: 'PUT',
      body: data['file'][0],
    })
  }

  return (
    <Form onSubmit={onSubmit}>
      <Label
        name="objectName"
        className="rw-label"
        errorClassName="rw-label rw-label-error"
      >
        Object Name
      </Label>

      <TextField
        name="objectName"
        className="rw-input"
        errorClassName="rw-input rw-input-error"
        validation={{ required: true }}
      />

      <FieldError name="objectName" className="rw-field-error" />

      <FileField name="file" validation={{ required: true }} />
      <FieldError name="file" className="rw-field-error" />
      <Submit>Upload</Submit>
    </Form>
  )
}

export default UploadC

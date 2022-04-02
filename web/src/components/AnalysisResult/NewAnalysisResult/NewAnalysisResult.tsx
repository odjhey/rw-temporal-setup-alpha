import { useMutation } from '@redwoodjs/web'
import { toast } from '@redwoodjs/web/toast'
import { navigate, routes } from '@redwoodjs/router'
import AnalysisResultForm from 'src/components/AnalysisResult/AnalysisResultForm'

const CREATE_ANALYSIS_RESULT_MUTATION = gql`
  mutation CreateAnalysisResultMutation($input: CreateAnalysisResultInput!) {
    createAnalysisResult(input: $input) {
      id
    }
  }
`

const NewAnalysisResult = () => {
  const [createAnalysisResult, { loading, error }] = useMutation(CREATE_ANALYSIS_RESULT_MUTATION, {
    onCompleted: () => {
      toast.success('AnalysisResult created')
      navigate(routes.analysisResults())
    },
    onError: (error) => {
      toast.error(error.message)
    },
  })

  const onSave = (input) => {
    createAnalysisResult({ variables: { input } })
  }

  return (
    <div className="rw-segment">
      <header className="rw-segment-header">
        <h2 className="rw-heading rw-heading-secondary">New AnalysisResult</h2>
      </header>
      <div className="rw-segment-main">
        <AnalysisResultForm onSave={onSave} loading={loading} error={error} />
      </div>
    </div>
  )
}

export default NewAnalysisResult

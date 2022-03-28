import EditWorkflowRunResultCell from 'src/components/WorkflowRunResult/EditWorkflowRunResultCell'

type WorkflowRunResultPageProps = {
  id: number
}

const EditWorkflowRunResultPage = ({ id }: WorkflowRunResultPageProps) => {
  return <EditWorkflowRunResultCell id={id} />
}

export default EditWorkflowRunResultPage

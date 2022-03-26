import EditWorkflowRunCell from 'src/components/WorkflowRun/EditWorkflowRunCell'

type WorkflowRunPageProps = {
  id: number
}

const EditWorkflowRunPage = ({ id }: WorkflowRunPageProps) => {
  return <EditWorkflowRunCell id={id} />
}

export default EditWorkflowRunPage

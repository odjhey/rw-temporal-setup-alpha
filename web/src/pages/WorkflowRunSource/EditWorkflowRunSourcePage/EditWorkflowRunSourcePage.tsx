import EditWorkflowRunSourceCell from 'src/components/WorkflowRunSource/EditWorkflowRunSourceCell'

type WorkflowRunSourcePageProps = {
  id: number
}

const EditWorkflowRunSourcePage = ({ id }: WorkflowRunSourcePageProps) => {
  return <EditWorkflowRunSourceCell id={id} />
}

export default EditWorkflowRunSourcePage

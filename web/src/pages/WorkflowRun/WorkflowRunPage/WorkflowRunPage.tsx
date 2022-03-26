import WorkflowRunCell from 'src/components/WorkflowRun/WorkflowRunCell'

type WorkflowRunPageProps = {
  id: number
}

const WorkflowRunPage = ({ id }: WorkflowRunPageProps) => {
  return <WorkflowRunCell id={id} />
}

export default WorkflowRunPage

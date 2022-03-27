import WorkflowRunSourceCell from 'src/components/WorkflowRunSource/WorkflowRunSourceCell'

type WorkflowRunSourcePageProps = {
  id: number
}

const WorkflowRunSourcePage = ({ id }: WorkflowRunSourcePageProps) => {
  return <WorkflowRunSourceCell id={id} />
}

export default WorkflowRunSourcePage

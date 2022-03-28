import WorkflowRunResultCell from 'src/components/WorkflowRunResult/WorkflowRunResultCell'

type WorkflowRunResultPageProps = {
  id: number
}

const WorkflowRunResultPage = ({ id }: WorkflowRunResultPageProps) => {
  return <WorkflowRunResultCell id={id} />
}

export default WorkflowRunResultPage

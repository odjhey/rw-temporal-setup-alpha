import EditAnalysisResultCell from 'src/components/AnalysisResult/EditAnalysisResultCell'

type AnalysisResultPageProps = {
  id: string
}

const EditAnalysisResultPage = ({ id }: AnalysisResultPageProps) => {
  return <EditAnalysisResultCell id={id} />
}

export default EditAnalysisResultPage

import AnalysisResultCell from 'src/components/AnalysisResult/AnalysisResultCell'

type AnalysisResultPageProps = {
  id: string
}

const AnalysisResultPage = ({ id }: AnalysisResultPageProps) => {
  return <AnalysisResultCell id={id} />
}

export default AnalysisResultPage

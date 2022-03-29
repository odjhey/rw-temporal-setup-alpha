import { MetaTags } from '@redwoodjs/web'
import TestRunWf from 'src/components/TestRunWf/TestRunWf'

const TestRunWfPage = () => {
  return (
    <>
      <MetaTags title="TestRunWf" description="TestRunWf page" />

      <h1>TestRunWfPage</h1>
      <TestRunWf></TestRunWf>
    </>
  )
}

export default TestRunWfPage

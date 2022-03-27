import { MetaTags } from '@redwoodjs/web'
import UploadC from 'src/components/Upload/Upload'

const UploadPage = () => {
  return (
    <>
      <MetaTags title="Upload" description="Upload page" />

      <h1>UploadPage</h1>
      <UploadC></UploadC>
    </>
  )
}

export default UploadPage

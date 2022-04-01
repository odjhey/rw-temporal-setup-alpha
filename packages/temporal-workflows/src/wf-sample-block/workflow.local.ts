import { activityReadNumbers } from './activities'
import { WorkflowUnblockOrCancel } from './workflow'

const runLocal: typeof WorkflowUnblockOrCancel = async ({
  bucket,
  filePath,
  wfId,
}) => {
  const result = await activityReadNumbers({ bucket, filePath, wfId })
  console.log(result)
}

;(() => {
  runLocal({
    bucket: 'bucket123',
    filePath: 'some-epod-excel',
    wfId: 'wanda1',
  })
})()

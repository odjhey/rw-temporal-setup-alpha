import { activityReadAndSaveRaw } from './activities'
import { WorkflowUnblockOrCancel } from './workflow'

const runLocal: typeof WorkflowUnblockOrCancel = async ({
  bucket,
  filePath,
  wfId,
}) => {
  const rawRefId = await activityReadAndSaveRaw({ bucket, filePath, wfId })
  console.log('rawRefId', rawRefId)
}

;(() => {
  runLocal({
    bucket: 'bucket123',
    filePath: 'some-epod-excel',
    wfId: '',
  })
})()

import { activityReadNumbers } from './read-file.activity'
;(async () => {
  await activityReadNumbers({
    wfId: '1123',
    bucket: 'bucket123',
    filePath: 'some-epod-excel-v2.xlsx',
  })
})().then(() => {
  console.log('done')
})

import { getClient, readFileStream } from '../../lib/object-store-client'
import { streamReader } from '../../lib/readers'

export async function activityReadNumbers({
  wfId,
  bucket,
  filePath,
}: {
  wfId: string
  bucket: string
  filePath: string
}): Promise<any> {
  console.log('hello from activity readline ', `${bucket} ${filePath}`)

  const readable = await readFileStream(getClient(), { bucket, filePath })
  const result = await streamReader(readable)
  console.log('result', result, wfId)
}

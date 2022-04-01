import { readFile, getClient, readFileStream } from '../lib/object-store-client'
import { streamReader } from '../lib/readers'
import { saveResult } from '../lib/repos/workflow-run-results'

export async function activityReadLine({
  bucket,
  filePath,
}: {
  bucket: string
  filePath: string
}): Promise<void> {
  console.log('hello from activity readline ', `${bucket} ${filePath}`)

  await readFile(getClient(), { bucket, filePath })
}

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
  await saveResult({ wfId, result })
}

// input -> logic -> save -> result saveId

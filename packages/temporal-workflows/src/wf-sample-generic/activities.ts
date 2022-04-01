import {
  readFile,
  getClient,
  getFileAsStream,
} from '../lib/object-store-client'
import { serializeStream } from '../lib/readers'
import * as RawDataRepo from '../lib/repos/raw-data'

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

export async function activityReadAndSaveRaw({
  bucket,
  filePath,
}: {
  wfId: string
  bucket: string
  filePath: string
}): Promise<any> {
  // TODO: add a decent logger
  const readable = await getFileAsStream(getClient(), { bucket, filePath })
  const result = await serializeStream(readable)

  const saveId = await RawDataRepo.saveResultMultiple({
    results: result as any[],
  })

  return saveId.refId
}

// input -> logic -> save -> result saveId

import { analyzeRawFrame } from '../lib/analyzers'
import { getClient, getFileAsStream } from '../lib/object-store-client'
import { serializeStream } from '../lib/readers'
import * as RawDataRepo from '../lib/repos/raw-data'

export async function activityReadAndSaveRaw({
  bucket,
  filePath,
}: {
  bucket: string
  filePath: string
}): Promise<any> {
  // TODO: add a decent logger

  const readable = await getFileAsStream(getClient(), { bucket, filePath })
  const result = await serializeStream(readable)

  const analysis = await analyzeRawFrame(result as any[])

  console.log(analysis)

  /*
  const saveId = await RawDataRepo.saveResultMultiple({
    results: result as any[],
  })

  return saveId.refId
  */
}

// input -> logic -> save -> result saveId

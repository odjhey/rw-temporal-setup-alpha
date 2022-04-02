import { nanoid } from 'nanoid'
import { analyzeRawFrame } from '../lib/analyzers'
import { getClient, getFileAsStream } from '../lib/object-store-client'
import { serializeStream } from '../lib/readers'
import * as AnalysisRepo from '../lib/repos/analysis'

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

  // TODO: add typing to saveResult
  const saveId = await AnalysisRepo.saveResult({
    ref: `${bucket}/${filePath}--${nanoid(10)}`,
    result: analysis,
    source: `${bucket}/${filePath}`,
    schemaVersion: analysis.schemaVersion,
  })

  return saveId.refId
}

// input -> logic -> save -> result saveId

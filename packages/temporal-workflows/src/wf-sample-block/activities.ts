import { readFile, getClient, readFileStream } from '../lib/object-store-client'
import { streamReader } from '../lib/readers'

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
  bucket,
  filePath,
}: {
  bucket: string
  filePath: string
}): Promise<void> {
  console.log('hello from activity readline ', `${bucket} ${filePath}`)

  const readable = await readFileStream(getClient(), { bucket, filePath })
  await streamReader(readable)
}

import { readFile, getClient } from '../lib/object-store-client'

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

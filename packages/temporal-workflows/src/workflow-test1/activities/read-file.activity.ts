import { getClient, readFileStream } from '../../lib/object-store-client'
import { streamReader } from '../../lib/readers'
import { DataFrame } from 'data-forge'
import * as dfd from 'danfojs-node'

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
  // const df = new DataFrame(result as any)
  // console.log(df.detectTypes().toString())
  // console.log(df.detectValues().toString())
  // df.forEach((row) => void console.log(row))
  /*
  for (const a of df.groupBy((row) => row.Delivery)) {
    console.log('----', a.toArray())
  }
  */

  const df2 = new dfd.DataFrame(result)
  // console.log(df2.nUnique())
  df2.nUnique(0).print()
  df2.print()
  console.log(df2.shape)
  console.log(df2.axis)
  console.log(df2.values)

  const group = df2.groupby(['Delivery', 'CustomerName'])
  // group.getGroup(['5001113806']).print()
  console.log(group.keyToValue)
}

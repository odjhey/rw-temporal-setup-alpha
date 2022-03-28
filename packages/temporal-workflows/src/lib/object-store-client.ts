import * as Minio from 'minio'
import * as Readline from 'readline'

export const getClient = () => {
  const client = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'johncena',
    secretKey: 'password',
  })

  return client
}

export const readFile = async (
  client: Minio.Client,
  { bucket, filePath }: { bucket: string; filePath: string }
) => {
  const readStream = await client.getObject(bucket, filePath)
  const rl = Readline.createInterface({
    input: readStream,
    terminal: false,
  })

  await new Promise((resolve, reject) => {
    rl.on('line', (line) => {
      console.log('line', line)
    })
    rl.on('error', (err) => {
      console.log('error')
      reject(err)
    })
    rl.on('close', function () {
      console.log('closed')
      resolve([])
    })
  })
}

export const getFileList = async (client: Minio.Client) => {
  const files = await new Promise((resolve, reject) => {
    const items: any[] = []
    client
      .listObjectsV2('bucket123', '', true)
      .on('data', (item) => {
        items.push(item)
      })
      .on('end', () => {
        resolve(items)
      })
      .on('error', (err) => reject(err))
  })
  return files
}

import * as Minio from 'minio'

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

export const getFileList = async (client: Minio.Client) => {
  const files = await new Promise((resolve, reject) => {
    const items = []
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

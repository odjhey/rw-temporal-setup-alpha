import type { APIGatewayEvent, Context } from 'aws-lambda'
import { logger } from 'src/lib/logger'
// import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'
// import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import * as Minio from 'minio'

/**
 * The handler function is your code that processes http request events.
 * You can use return and throw to send a response or error, respectively.
 *
 * Important: When deployed, a custom serverless function is an open API endpoint and
 * is your responsibility to secure appropriately.
 *
 * @see {@link https://redwoodjs.com/docs/serverless-functions#security-considerations|Serverless Function Considerations}
 * in the RedwoodJS documentation for more information.
 *
 * @typedef { import('aws-lambda').APIGatewayEvent } APIGatewayEvent
 * @typedef { import('aws-lambda').Context } Context
 * @param { APIGatewayEvent } event - an object which contains information from the invoker.
 * @param { Context } context - contains information about the invocation,
 * function, and execution environment.
 */
export const handler = async (event: APIGatewayEvent, _context: Context) => {
  logger.info('Invoked /upload function')

  const fileName = event.queryStringParameters['name']

  const client = new Minio.Client({
    endPoint: 'localhost',
    port: 9000,
    useSSL: false,
    accessKey: 'johncena',
    secretKey: 'password',
  })

  const url = await new Promise((resolve, reject) => {
    client.presignedPutObject('bucket123', fileName, (err, url) => {
      if (err) reject(err)
      resolve(url)
    })
  })

  // give up na sa pag gamit ng aws-sdk for s3 access sa both cloudserver and minio
  /*
  const command = new PutObjectCommand({
    Bucket: 'bucket123',
    Key: 'afile',
    Body: 'hello world',
    ContentType: 'text/plain',
  })
  const client = new S3Client({
    endpoint: 'http://localhost:9000',
    credentials: { accessKeyId: 'johncena', secretAccessKey: 'password' },
    forcePathStyle: true,
  })

  // const res = await client.send(command)
  // console.log('res', res)
  const url = await getSignedUrl(client, command, { expiresIn: 3600 })
  console.log('url', url)
  */

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
    }),
  }
}

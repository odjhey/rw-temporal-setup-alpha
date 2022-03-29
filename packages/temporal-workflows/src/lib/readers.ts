import * as XLSX from 'xlsx'
import { Readable } from 'stream'
import { z } from 'zod'

export const streamReader = async (readable: Readable) => {
  return await new Promise((resolve, reject) => {
    const buffers: any[] = []

    readable.on('data', function (data) {
      buffers.push(data)
    })
    readable.on('error', (err) => {
      reject(err)
    })
    readable.on('end', function () {
      const buffer = Buffer.concat(buffers)
      const workbook = XLSX.read(buffer, { type: 'buffer' })

      const jsa = XLSX.utils.sheet_to_json(
        workbook.Sheets[workbook.SheetNames[0]]
      )

      resolve(jsa)

      // console.log('first sheet', jsa)
      /*

      const zodNumberOrString = z.string().or(z.number())
      const epodSchema = z.array(
        z.object({
          Delivery: z.string().or(z.number()),
          ScheduledDate: z.string().or(z.number()),
          ScheduledTime: z.string().or(z.number()),
          CustomerName: z.string(),
          CustomerAddress: z.string(),
          CustomerEmail: z.string(),
          CustomerMobile: z.string().or(z.number()),
          ShipmentNumber: z.string().or(z.number()),
          UserId: z.string(),
          PlateNumber: z.string(),
          Trucker: z.string(),
          Porter: z.string(),
          Source: z.string(),
          ItemNumber: z.number(),
          Material: z.string(),
          MaterialNumber: z.number(),
          PricePerUnit: z.number().optional(),
          UoM: z.string(),
          Quantity: z.number(),
          Route: z.string(),
          Invoice: z.string().or(z.number()),
          Barcode: z.string().or(z.number()),
          Batch: zodNumberOrString,
        })
      )

      const res = epodSchema.safeParse(jsa)

      if (res.success === false) {
        resolve({
          error: res.error,
          data: jsa.map((d: any, idx) => ({ ...d, _idx: idx })),
        })
      } else {
        resolve({ data: res.data, error: undefined })
      }
      */

      /*
Delivery: 1120110001,
ScheduledDate: 44208,
ScheduledTime: '9:00',
CustomerName: 'MORECO MULTIPURPOSE COOPERATIVE',
CustomerAddress: 'YNARES ARCADE TOMAS CLAUDIO BGY SAN JUAN MORONG 1960',
CustomerEmail: 'customer@gmail.com',
CustomerMobile: 636420980,
ShipmentNumber: 21201001,
DriverId: 'ALBERTBUENA',
PlateNumber: 'E 44350',
Trucker: 'RBC-MDC CORPORATION',
Porter: 'LYNDON BAUTISTA',
Source: 'WH1',
ItemNumber: 10,
Material: 'ASCOF (STRAWBERRY) SYR 300MG/5ML 120ML',
MaterialNumber: 214500013,
PricePerUnit: 0,
UoM: 'BOT',
Quantity: 10,
Route: 'South Luzon',
Invoice: 8000000130,
Barcode: 1334500013,
Batch: '330SWB'
      */

      resolve({})
    })
  })
}

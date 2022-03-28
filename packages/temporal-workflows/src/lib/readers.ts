import * as XLSX from 'xlsx'
import { Readable } from 'stream'
import { z } from 'zod'

export const streamReader = async (readable: Readable) => {
  await new Promise((resolve, reject) => {
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
      // console.log('first sheet', jsa)

      const epodSchema = z.array(
        z.object({
          Delivery: z.string(),
          ScheduledDate: z.string(),
          ScheduledTime: z.string(),
          CustomerName: z.string(),
          CustomerAddress: z.string(),
          CustomerEmail: z.string(),
          CustomerMobile: z.string(),
          ShipmentNumber: z.string(),
          DriverId: z.string(),
          PlateNumber: z.string(),
          Trucker: z.string(),
          Porter: z.string(),
          Source: z.string(),
          ItemNumber: z.string(),
          Material: z.string(),
          MaterialNumber: z.string(),
          PricePerUnit: z.string(),
          UoM: z.string(),
          Quantity: z.string(),
          Route: z.string(),
          Invoice: z.string(),
          Barcode: z.string(),
          Batch: z.string(),
        })
      )

      const res = epodSchema.safeParse(jsa)
      console.log('resss', res)

      if (res.success === false) {
        console.log(res.error.issues)
      }

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

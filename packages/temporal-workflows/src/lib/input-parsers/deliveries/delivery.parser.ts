import { z } from 'zod'
import type { TParseResult } from '../../../types/util'

export const parse = (input: any): TParseResult<any, any> => {
  const schema = z.object({
    Delivery: z.string(),
  })

  const result = schema.safeParse(input)
  if (result.success) {
    return { ok: true, data: result.data }
  }

  return { ok: false, error: result.error.flatten() }
}

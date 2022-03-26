import { z } from 'zod'
export async function activityA(name: string): Promise<string> {
  console.log('hello from activityA', name)

  const shc = z.object({
    hey: z.string(),
  })

  console.log('zod', shc.safeParse({ hey: 1 }))

  return `ActivityA result: A-${name}!`
}

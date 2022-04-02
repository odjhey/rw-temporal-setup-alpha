import type { Prisma } from '@prisma/client'

import { db } from 'src/lib/db'

export const analysisResults = () => {
  return db.analysisResult.findMany()
}

export const analysisResult = ({
  id,
}: Prisma.AnalysisResultWhereUniqueInput) => {
  return db.analysisResult.findUnique({
    where: { id },
  })
}

interface CreateAnalysisResultArgs {
  input: Prisma.AnalysisResultCreateInput
}

export const createAnalysisResult = ({ input }: CreateAnalysisResultArgs) => {
  return db.analysisResult.create({
    data: input,
  })
}

interface UpdateAnalysisResultArgs
  extends Prisma.AnalysisResultWhereUniqueInput {
  input: Prisma.AnalysisResultUpdateInput
}

export const updateAnalysisResult = ({
  id,
  input,
}: UpdateAnalysisResultArgs) => {
  return db.analysisResult.update({
    data: input,
    where: { id },
  })
}

export const deleteAnalysisResult = ({
  id,
}: Prisma.AnalysisResultWhereUniqueInput) => {
  return db.analysisResult.delete({
    where: { id },
  })
}

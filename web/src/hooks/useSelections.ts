import { useQuery } from '@redwoodjs/web'

const FIND_FILE_SOURCES = gql`
  query FindFileSources {
    fileSources {
      slug
    }
  }
`

export const useSelections = () => {
  const { data: rawData, loading } = useQuery(FIND_FILE_SOURCES)

  const data =
    rawData && rawData.fileSources
      ? rawData.fileSources.map((f) => ({
          label: f.slug,
          value: f.slug,
        }))
      : []

  return { data, loading }
}

export default useSelections

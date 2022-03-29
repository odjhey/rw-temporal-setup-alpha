import { Box, Button, Group, Text } from '@mantine/core'
import useFetchOnClick from 'src/hooks/useFetchOnClick'

const TestRunWf = () => {
  return (
    <div>
      <h2>{'TestRunWf'}</h2>
      <Group direction="column">
        <TestButton url="/.redwood/functions/test-wf?name=wftest">
          Wf Test
        </TestButton>
        <TestButton url="/.redwood/functions/test-wf?name=some1">
          Some 1
        </TestButton>
        <TestButton url="/.redwood/functions/test-wf?name=some2">
          Some 2
        </TestButton>
      </Group>
    </div>
  )
}

const TestButton = ({ url, children }) => {
  const [{ data, error, idle }, { onClick }] = useFetchOnClick(url)

  return (
    <Group direction="column">
      <Button onClick={() => void onClick()}>{children}</Button>
      <Box sx={{ minHeight: '50px' }}>
        {idle && <p>idle</p>}
        {error && <Text>Something Wrong: {error.message}</Text>}
        {!data && !error && !idle && <Text>...loading</Text>}
        {data && <pre>{JSON.stringify(data)}</pre>}
      </Box>
    </Group>
  )
}

export default TestRunWf

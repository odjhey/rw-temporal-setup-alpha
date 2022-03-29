import { useReducer, useRef } from 'react'

interface State<T> {
  data?: T
  error?: Error
  idle?: boolean
}

type Cache<T> = { [url: string]: T }

// discriminated union type
type Action<T> =
  | { type: 'idle' }
  | { type: 'loading' }
  | { type: 'fetched'; payload: T }
  | { type: 'error'; payload: Error }

function useFetchOnClick<T = unknown>(
  url?: string,
  options?: RequestInit
): [State<T>, { onClick: () => void }] {
  const cache = useRef<Cache<T>>({})

  // Used to prevent state update if the component is unmounted
  const cancelRequest = useRef<boolean>(false)

  const initialState: State<T> = {
    error: undefined,
    data: undefined,
    idle: true,
  }

  // Keep state logic separated
  const fetchReducer = (state: State<T>, action: Action<T>): State<T> => {
    switch (action.type) {
      case 'idle':
        return { ...initialState, idle: true }
      case 'loading':
        return { ...initialState, idle: false }
      case 'fetched':
        return { ...initialState, data: action.payload, idle: false }
      case 'error':
        return { ...initialState, error: action.payload, idle: false }
      default:
        return state
    }
  }

  const [state, dispatch] = useReducer(fetchReducer, initialState)

  const onClick = () => {
    // Do nothing if the url is not given
    if (!url) return

    const fetchData = async () => {
      dispatch({ type: 'loading' })

      // no cache for testing
      // // If a cache exists for this url, return it
      // if (cache.current[url]) {
      //   dispatch({ type: 'fetched', payload: cache.current[url] })
      //   return
      // }

      try {
        const response = await fetch(url, options)
        if (!response.ok) {
          throw new Error(response.statusText)
        }

        const data = (await response.json()) as T
        cache.current[url] = data
        if (cancelRequest.current) return

        dispatch({ type: 'fetched', payload: data })
      } catch (error) {
        if (cancelRequest.current) return

        dispatch({ type: 'error', payload: error as Error })
      }
    }

    void fetchData()

    // Use the cleanup function for avoiding a possibly...
    // ...state update after the component was unmounted
    return () => {
      cancelRequest.current = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }

  return [state, { onClick }]
}

export default useFetchOnClick

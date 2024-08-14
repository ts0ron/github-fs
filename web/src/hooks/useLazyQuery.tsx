import {useQuery} from "react-query";


function useLazyQuery (key: string, fn: () => any, options = {}) {
  const {refetch} = useQuery(key, fn, {
    ...options,
    enabled: false
  })

  return [refetch]
}

export default  useLazyQuery
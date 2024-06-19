import {useQuery, QueryFunction, QueryKey, UseQueryResult, UseQueryOptions} from '@tanstack/react-query';

const useFetch = <TQueryFnData, TError>(
    queryKey: QueryKey | string,
    fetchFunction: QueryFunction<TQueryFnData>,
    options?: UseQueryOptions<TQueryFnData, TError>
): UseQueryResult<TQueryFnData, TError> => {
    return useQuery<TQueryFnData, TError>({
        queryKey: [queryKey],
        queryFn: fetchFunction,
        ...options
    });
};

export default useFetch;
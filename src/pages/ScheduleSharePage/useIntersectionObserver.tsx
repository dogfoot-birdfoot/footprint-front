import { useEffect, useRef, useState } from "react"
import { useInfiniteQuery } from "@tanstack/react-query"
import { TravelPlan } from "./type"
export default function useIntersectionObserver() {
  const [loading, setLoading] = useState<boolean>(false)
  const target = useRef<HTMLDivElement>(null)
  const [lastPageIndex, setLastPageIndex] = useState<number>(-1)

  const getSchedules = async ({ page }: getSchedulesType) => {
    const data = await fetch(`${process.env.REACT_APP_API_URL}/api/plans?&page=${page}&size=16&sort=id,desc`).then(
      response => response.json()
    )

    const content: TravelPlan[] = data.data.content

    setLoading(true)
    setLastPageIndex(data.data.totalPages - 1)
    return content
  }

  const { fetchNextPage, data, status, hasNextPage, isFetchingNextPage, isPending } = useInfiniteQuery({
    queryKey: ["schedules"],
    initialPageParam: 0,
    queryFn: ({ pageParam }) => getSchedules({ page: pageParam }),
    getNextPageParam: (lastPage, allPages, lastPageParam, allPageParams) => {
      if (lastPageIndex != -1) {
        return lastPageParam < lastPageIndex ? lastPageParam + 1 : undefined
      }
    }
  })

  const observer = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && hasNextPage) {
          // 로딩 Div를 보면 다음 페이지 fetch.
          fetchNextPage()
        }
      })
    },
    { threshold: 0.5 }
  )

  // fetch가 된 이후에 target을 observe. (loading 이전에는 target이 ref로 심어지지 않아 로딩이 되지 않음.)
  useEffect(() => {
    if (loading && target.current) observer.observe(target.current)
    return () => {
      observer.disconnect()
    }
  }, [loading])

  return [data, target, hasNextPage] as const
}

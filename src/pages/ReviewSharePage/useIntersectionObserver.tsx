import { MutableRefObject, RefObject, useEffect, useRef } from "react"
import { InfiniteQueryObserverResult } from "@tanstack/react-query"

interface useIntersectionObserverProps {
  target: RefObject<HTMLElement>
  hasNextPage: boolean | undefined
  fetchNextPage: any
}

export default function useIntersectionObserver({ target, hasNextPage, fetchNextPage }: useIntersectionObserverProps) {
  const observer = useRef(
    new IntersectionObserver(
      (entries, observer) => {
        entries.forEach(entry => {
          if (entry.isIntersecting && hasNextPage) {
            fetchNextPage()
          }
        })
      },
      { threshold: 1 }
    )
  )

  // useEffect(() => {
  //   if (!target) return

  //   if (target.current) observer.current.observe(target.current)

  //   return() =>
  //     // 서버에서 cardList에 받아올 값이 더 없다면 unobserve.
  //     observer.current.unobserve(target.current)
  //   }
  // }, [])

  const observe = (element: Element) => {
    observer.current.observe(element)
  }
  const unobserve = (element: HTMLElement) => {
    observer.current.unobserve(element)
  }

  return [observe, unobserve]
}

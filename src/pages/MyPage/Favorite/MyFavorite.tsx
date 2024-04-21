import { CiStar } from "react-icons/ci"
import { Favorite, FavoriteList, FavoriteTitle, ListBox, ViewAllButton } from "@/pages/MyPage/Favorite/MyFavorite.style"
import CardItem from "@/components/Card/CardItem"
import { useEffect, useState } from "react"
import getMemberId from "@/hooks/getMemberId"
import useCustomFetch from "@/hooks/useCustomFetch"

const MyFavorite = () => {
  const [bookmarks, setBookmarks] = useState([])

  useEffect(() => {
    const fetchData = async () => {
      const memberId = getMemberId()
      const url = `https://ke4f765103c24a.user-app.krampoline.com/api/my/bookmarks?memberId=${memberId}&page=0&size=10&sort=id%2Cdesc`

      try {
        const response = await useCustomFetch(url, { method: "GET" })
        if (!response.ok) {
          throw new Error("Failed to fetch bookmarks")
        }
        const data = await response.json()
        setBookmarks(data)
      } catch (error) {
        console.error("Failed to fetch bookmarks:", error)
      }
    }

    fetchData()
  }, [])
  return (
    <Favorite>
      <FavoriteTitle>
        <CiStar size="1.8rem" />
        일정 즐겨찾기 목록
      </FavoriteTitle>
      <FavoriteList>
        <ListBox>
          <CardItem
            id={undefined}
            title={""}
            dates={""}
            bookMarkCount={0}
            likeCount={0}
            author={""}
            daySchedules={[]}
            createdAt={""}
          />
        </ListBox>
      </FavoriteList>
      <ViewAllButton>VIEW ALL</ViewAllButton>
    </Favorite>
  )
}

export default MyFavorite

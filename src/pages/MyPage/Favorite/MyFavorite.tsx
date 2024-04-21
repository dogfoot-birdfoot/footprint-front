import { CiStar } from "react-icons/ci"
import { Favorite, FavoriteList, FavoriteTitle, ListBox, ViewAllButton } from "@/pages/MyPage/Favorite/MyFavorite.style"
import CardItem from "@/components/card/CardItem"

const MyFavorite = () => {
  return (
    <Favorite>
      <FavoriteTitle>
        <CiStar size="1.8rem" />
        일정 즐겨찾기 목록
      </FavoriteTitle>
      <FavoriteList>
        <ListBox>
          <CardItem />
          <CardItem />
          <CardItem />
        </ListBox>
        <ListBox>
          <CardItem />
          <CardItem />
          <CardItem />
        </ListBox>
      </FavoriteList>
      <ViewAllButton>VIEW ALL</ViewAllButton>
    </Favorite>
  )
}

export default MyFavorite

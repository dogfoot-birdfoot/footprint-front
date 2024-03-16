import SideBar from "@/components/Sidebar/SideBar"
import { CiStar } from "react-icons/ci"
import { MyPageWrapper } from "@/styles/styles"
import { Favorite, FavoriteList, FavoriteTitle, ListBox, ViewAllButton } from "@/pages/MyFavoritePage/MyFavorite.style"
import CardItem from "@/components/Card/CardItem"

const MyFavorite = () => {
  return (
    <MyPageWrapper>
      <SideBar />
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
    </MyPageWrapper>
  )
}

export default MyFavorite

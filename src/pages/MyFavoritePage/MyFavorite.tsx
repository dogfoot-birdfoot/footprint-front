import SideBar from "@/components/sidebar/SideBar"
import { MyPageWrapper } from "@/styles/styles"
import { Favorite } from "@/pages/MyFavoritePage/MyFavoriteStyle"

const MyFavorite = () => {
  return (
    <MyPageWrapper>
      <SideBar />
      <Favorite />
    </MyPageWrapper>
  )
}

export default MyFavorite

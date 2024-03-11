import { Box, Divider } from "@chakra-ui/react"
import { BannerStyle, CardListBox, ReviewTitle, Title, TitleBox } from "@/styles/MainPageStyle"
import CardItem from "@/components/card/CardItem"
import Reviews from "@/pages/MainPage/ReviewsGallery"

const MainPage = () => {
  return (
    <>
      <BannerStyle>
        <img src="/mainImage.jpg" alt="mainImage" width={"80%"} />
      </BannerStyle>
      <TitleBox>
        <Title>Latest Plans</Title>
      </TitleBox>
      <CardListBox>
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </CardListBox>
      <TitleBox>
        <Title>Popular Plans</Title>
      </TitleBox>
      <CardListBox>
        <CardItem />
        <CardItem />
        <CardItem />
        <CardItem />
      </CardListBox>
      <Box display="flex" justifyContent="center" width="100%">
        <Divider orientation="horizontal" mt="20" width="400px" />
      </Box>
      <TitleBox>
        <ReviewTitle>Popular Reviews</ReviewTitle>
      </TitleBox>
      <Reviews></Reviews>
    </>
  )
}

export default MainPage

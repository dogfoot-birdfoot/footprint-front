import { Box, Divider } from "@chakra-ui/react"
import Layout from "../../components/layout/Layout"
import { BannerStyle, CardListBox, ReviewTitle, Title, TitleBox } from "./styles/MainPageStyle"
import CardItem from "@/components/card/CardItem"
import Reviews from "./Reviews"

const MainPage = () => {
  return (
    <>
      <Layout>
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
      </Layout>
    </>
  )
}

export default MainPage

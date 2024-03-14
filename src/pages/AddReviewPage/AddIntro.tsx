import { Box, Image } from "@chakra-ui/react"
import React from "react"
import { AddIntroProps } from "./type"
import { AddReviewIntro, ReviewIntroBody, ReviewIntroHeader } from "./AddIntro.style"

const AddIntro: React.FC<AddIntroProps> = ({ nextStep }) => {
  return (
    <Box>
      <AddReviewIntro>
        <ReviewIntroHeader>나만의 리뷰를 만들어보세요</ReviewIntroHeader>
        <ReviewIntroBody>최근에 다녀온 여행지가 있으신가요?</ReviewIntroBody>
        <ReviewIntroBody>내가 다녀온 여행지를 리뷰해주세요.</ReviewIntroBody>
      </AddReviewIntro>
      <Box as="button" onClick={nextStep}>
        <Image
          src="https://images.unsplash.com/photo-1676705909846-2d6183d8bc1e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="강원도 산 사진"
          borderRadius="lg"
          width={"330px"}
          height={"230px"}
        />
      </Box>
    </Box>
  )
}

export default AddIntro

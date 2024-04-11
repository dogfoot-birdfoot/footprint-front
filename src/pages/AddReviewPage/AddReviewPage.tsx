import { Button } from "@chakra-ui/react"
import { AddReview, ButtonBox, ContentBox, ReviewPage } from "./AddReviewPage.style"
import React, { useState } from "react"
import AddPictures from "./AddPictures"
import AddIntro from "@/pages/AddReviewPage/AddIntro"
import AddPost from "@/pages/AddReviewPage/AddPost"
import { AddReviewPageProps } from "@/pages/AddReviewPage/type"

const AddReviewPage: React.FC<AddReviewPageProps> = ({ initialStep }) => {
  const [step, setStep] = useState<number>(initialStep)

  // 리뷰에 추가할 이미지 주소 배열
  const [sources, setSources] = useState<string[]>([
    "https://images.unsplash.com/photo-1676705909846-2d6183d8bc1e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1676705909846-2d6183d8bc1e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1676705909846-2d6183d8bc1e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1676705909846-2d6183d8bc1e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1676705909846-2d6183d8bc1e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1676705909846-2d6183d8bc1e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    "https://images.unsplash.com/photo-1676705909846-2d6183d8bc1e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  ])

  function prevStep() {
    setStep(Math.max(1, step - 1))
  }

  function nextStep() {
    setStep(Math.min(3, step + 1))
  }

  return (
    <ReviewPage>
      <AddReview>
        <ButtonBox>
          {step === 3 && (
            <Button
              size="xs"
              borderRadius="20px"
              marginTop="20px"
              marginBottom="20px"
              backgroundColor="white"
              onClick={prevStep}
            >
              {"<"}
            </Button>
          )}
        </ButtonBox>
        <ContentBox>
          {step === 1 && <AddIntro nextStep={nextStep} />}
          {step === 2 && <AddPictures sources={sources} setSources={setSources} />}
          {step === 3 && <AddPost sources={sources} />}
        </ContentBox>

        <ButtonBox>
          {step === 2 && (
            <Button
              size="xs"
              borderRadius="20px"
              marginTop="20px"
              marginBottom="20px"
              backgroundColor="white"
              onClick={nextStep}
            >
              {">"}
            </Button>
          )}
        </ButtonBox>
      </AddReview>
    </ReviewPage>
  )
}

export default AddReviewPage

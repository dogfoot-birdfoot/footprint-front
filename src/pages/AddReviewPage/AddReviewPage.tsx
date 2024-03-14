import { Box, Button } from "@chakra-ui/react"
import { AddReview, ButtonBox, ReviewPage } from "./AddReviewPage.style"
import React, { useState } from "react"
import AddIntro from "@/pages/AddReviewPage/AddIntro"
import AddPictures from "./AddPictures"
import { AddReviewPageProps } from "./type"

const AddReviewPage: React.FC<AddReviewPageProps> = ({ initialStep }) => {
  const [step, setStep] = useState<number>(initialStep)

  function prevStep() {
    setStep(Math.max(1, step - 1))
  }

  function nextStep() {
    setStep(Math.min(3, step + 1))
  }

  return (
    <ReviewPage>
      <AddReview>
        <ButtonBox></ButtonBox>
        {step === 1 && <AddIntro nextStep={nextStep} />}
        {step === 2 && <AddPictures prevStep={prevStep} nextStep={nextStep} />}
        {step === 3 && <Box>AddPost</Box>}

        <ButtonBox>
          {step !== 1 && (
            <Button borderRadius="20px" marginBottom="20px" onClick={nextStep}>
              {">"}
            </Button>
          )}
        </ButtonBox>
      </AddReview>
    </ReviewPage>
  )
}

export default AddReviewPage

export interface AddReviewPageProps {
  initialStep: number
}

export interface AddIntroProps {
  nextStep: () => void
}

export interface AddPicturesProps {
  prevStep: () => void
  nextStep: () => void
}

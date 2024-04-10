export interface AddReviewPageProps {
  initialStep: number
}

export interface AddIntroProps {
  nextStep: () => void
}

export interface AddPictureProps {
  sources: stirng[]
  setSources: React.Dispatch<React.SetStateAction<string[]>>
}

export interface AddPostProps {
  sources: stirng[]
}

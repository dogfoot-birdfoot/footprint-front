export interface AddReviewPageProps {
  initialStep: number
}

export interface AddIntroProps {
  nextStep: () => void
}

export interface AddPictureProps {
  sources: File[]
  setSources: React.Dispatch<React.SetStateAction<File[]>>
  previewImages: string[]
  setPreviewImages: React.Dispatch<React.SetStateAction<string[]>>
}

export interface AddPostProps {
  sources: File[]
  previewImages: string[]
}

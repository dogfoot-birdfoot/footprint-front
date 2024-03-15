import React, { useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { ArrowButton, ImageNumber, SlideImage, SliderContainer } from "./ImageSlider.style"
import { Box } from "@chakra-ui/react"

const images = [
  "https://plus.unsplash.com/premium_photo-1661963130289-aa70dd516940?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1591520284162-8e64eceebacf?q=80&w=1171&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1615256871065-e12d4b97a260?q=80&w=1074&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1546385040-d48180ede560?q=80&w=1031&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  "https://images.unsplash.com/photo-1599577644020-2d5b3ad2db60?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  // 더 많은 이미지 URL 추가 가능
]

export const ImageSlider: React.FC<ImageSliderProps> = ({ size }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  const goToPrevious = () => {
    const isFirstImage = currentIndex === 0
    const newIndex = isFirstImage ? images.length - 1 : currentIndex - 1
    setCurrentIndex(newIndex)
  }

  const goToNext = () => {
    const isLastImage = currentIndex === images.length - 1
    const newIndex = isLastImage ? 0 : currentIndex + 1
    setCurrentIndex(newIndex)
  }

  return (
    <SliderContainer size={size}>
      <ImageNumber>{currentIndex + 1}</ImageNumber>
      <SlideImage src={images[currentIndex]} alt={`Slide ${currentIndex + 1}`} />
      <ArrowButton className="left" onClick={goToPrevious}>
        <IoIosArrowBack />
      </ArrowButton>
      <ArrowButton className="right" onClick={goToNext}>
        <IoIosArrowForward />
      </ArrowButton>
    </SliderContainer>
  )
}

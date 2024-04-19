import React, { useState } from "react"
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io"
import { ArrowButton, ImageNumber, SlideImage, SliderContainer } from "./ImageSlider.style"
import { Box, Flex } from "@chakra-ui/react"

export const ImageSlider: React.FC<ImageSliderProps> = ({ size, images = [] }) => {
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
    <>
      {images.length !== 0 && (
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
      )}

      {images.length === 0 && (
        <SliderContainer size={size}>
          <Flex width="100%" height="100%" justifyContent={"center"} alignItems={"center"} userSelect={"none"}>
            <SlideImage
              src={
                "https://images.unsplash.com/photo-1676705909846-2d6183d8bc1e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
              alt={`Slide`}
            />
          </Flex>
        </SliderContainer>
      )}
    </>
  )
}

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
            No Image
          </Flex>
        </SliderContainer>
      )}
    </>
  )
}

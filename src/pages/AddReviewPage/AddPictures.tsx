import { Box, Button, Image, Input, Text, keyframes } from "@chakra-ui/react"
import React, { ChangeEvent, useRef, useState } from "react"
import { AddPictureProps } from "./type"

const textframes = keyframes`  
    0% {transform: translate(0%,0%)}
    60%{transform: translate(0%,0%)}
    70% {transform: translate(0%,-20%)} 
    80% {transform: translate(0%,0)}
    100% {transform: translate(0%,0)} 
  `

const textAnimation = `${textframes} infinite 2s linear`

const AddPictures: React.FC<AddPictureProps> = ({ sources, setSources, previewImages, setPreviewImages }) => {
  const fileUpload = useRef<HTMLInputElement>(null)

  const clickFileUpload = () => {
    if (fileUpload.current) fileUpload.current.click()
  }

  const changeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setSources(sources => [...sources, e.target.files![0]])
      const reader = new FileReader()
      reader.readAsDataURL(e.target.files[0])
      reader.onload = () => {
        setPreviewImages(previewImages => [...previewImages, reader.result as string])
      }
    }
  }
  // 추가 버튼을 누르면 임시로 사진 추가(사용자가 사진을 직접 올리는 방식으로 변경 필요)

  function deleteImage(index: number) {
    setPreviewImages(previewImages.filter((item, idx) => idx !== index))
    setSources(sources.filter((item, idx) => idx !== index))
  }

  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="center">
        {/* 이미지가 하나라도 존재하면 출력 */}
        {previewImages.length !== 0 && (
          <Image src={previewImages[0]} borderRadius="lg" width="380px" height="300px" margin="10px 0px 10px 0px" />
        )}

        {/* 이미지가 없을 떄 출력 */}
        {previewImages.length === 0 && (
          <Box
            pos="relative"
            color="white"
            fontWeight={"800"}
            display="flex"
            justifyContent={"center"}
            alignItems={"center"}
            borderRadius="lg"
            width="380px"
            height="300px"
            margin="10px 0px 10px 0px"
          >
            <Image
              boxSize="full"
              borderRadius="lg"
              opacity={"0.7"}
              src={
                "https://plus.unsplash.com/premium_photo-1711117960822-ac591c668a84?q=80&w=2920&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              }
            />
            <Text userSelect={"none"} display="flex" pos="absolute" top="25%">
              사진을 추가해주세요
              <Text marginLeft="5px" animation={textAnimation}>
                !
              </Text>
            </Text>
          </Box>
        )}
      </Box>
      <Box display="flex" flexWrap="wrap" width="400px" height="200px">
        {previewImages.map((image, index) => (
          <Box
            width="80px"
            height="80px"
            margin="10px 10px 10px 10px"
            position="relative"
            key={index}
            onClick={() => deleteImage(index)}
            transition="all .3s ease"
            _hover={{ opacity: "0.7", color: "white", transform: "scale(1.1)" }}
          >
            <Image src={image} borderRadius="lg" width="80px" height="80px" />
            <Text
              display="flex"
              justifyContent={"center"}
              alignItems={"center"}
              width="20px"
              height="20px"
              userSelect={"none"}
              pos="absolute"
              top="40%"
              left="40%"
            >
              X
            </Text>
          </Box>
        ))}

        {sources.length < 8 && (
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            width="80px"
            height="80px"
            margin="10px 10px 10px 10px"
          >
            <Button onClick={clickFileUpload} borderRadius="20px" backgroundColor="white">
              +
            </Button>
          </Box>
        )}

        {/* File Upload를 위한 Input Element(hidden) */}
        <Input
          ref={fileUpload}
          onChange={changeFile}
          accept=".png, .jpeg, .jpg"
          type="file"
          style={{ display: "none" }}
        />
      </Box>
    </Box>
  )
}

export default AddPictures

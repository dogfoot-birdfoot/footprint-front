import { Box, Button, Image, Text, keyframes } from "@chakra-ui/react"
import React from "react"
import { AddPictureProps } from "./type"

const AddPictures: React.FC<AddPictureProps> = ({ sources, setSources }) => {
  const textframes = keyframes`  
    0% {transform: translate(0%,0%)}
    60%{transform: translate(0%,0%)}
    70% {transform: translate(0%,-20%)} 
    80% {transform: translate(0%,0)}
    100% {transform: translate(0%,0)} 
  `

  const textAnimation = `${textframes} infinite 2s linear`

  function deleteImage(index: number) {
    setSources(sources.filter((item, idx) => idx !== index))
  }

  // 추가 버튼을 누르면 임시로 사진 추가(사용자가 사진을 직접 올리는 방식으로 변경 필요)
  function addImage() {
    setSources(sources => [
      ...sources,
      "https://images.unsplash.com/photo-1676705909846-2d6183d8bc1e?q=80&w=1335&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
    ])
  }
  return (
    <Box display="flex" flexDirection="column">
      <Box display="flex" justifyContent="center">
        {/* 이미지가 하나라도 존재하면 출력 */}
        {sources.length !== 0 && (
          <Image src={sources[0]} borderRadius="lg" width="380px" height="300px" margin="10px 0px 10px 0px" />
        )}

        {/* 이미지가 없을 떄 출력 */}
        {sources.length === 0 && (
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
        {sources.map((source, index) => (
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
            <Image src={source} borderRadius="lg" width="80px" height="80px" />
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
            <Button onClick={addImage} borderRadius="20px" backgroundColor="white">
              +
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  )
}

export default AddPictures

import React, { useEffect } from "react"
import { Box, Button } from "@chakra-ui/react"

function RouteMap() {
  const { kakao } = window

  useEffect(() => {
    const mapContainer = document.getElementById("mapContainer") // 지도를 표시할 div
    const options = {
      center: new kakao.maps.LatLng(33.438201, 126.578667), // 지도의 중심좌표
      level: 5 // 지도의 확대 레벨
    }

    const map = new kakao.maps.Map(mapContainer, options) // 지도 표기

    const positions = [
      {
        title: "좌표 1",
        latlng: new kakao.maps.LatLng(33.444101, 126.570337)
      },
      {
        title: "좌표 2",
        latlng: new kakao.maps.LatLng(33.431101, 126.571337)
      },
      {
        title: "좌표 3",
        latlng: new kakao.maps.LatLng(33.443101, 126.581337)
      },
      {
        title: "좌표 4",
        latlng: new kakao.maps.LatLng(33.442101, 126.583337)
      }
    ]

    const linePositions = []

    for (let i = 0; i < positions.length; i++) {
      // 표기할 선 위치
      linePositions.push(positions[i].latlng)

      // 마커 표기
      const marker = new kakao.maps.Marker({
        map: map,
        title: positions[i].title,
        text: "Hello",
        position: positions[i].latlng
      })
    }

    const polyline = new kakao.maps.Polyline({
      map: map,
      path: linePositions, // 선을 구성하는 좌표배열 입니다
      strokeWeight: 4, // 선의 두께 입니다
      strokeColor: "#10bbd5", // 선의 색깔입니다
      strokeOpacity: 0.7, // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
      strokeStyle: "solid" // 선의 스타일입니다
    })
  }, [])

  return (
    <Box width="550px" height="450px" mt="100px" ml="50px" position="sticky" top="100px">
      <Box id="mapContainer" width="550px" height="450px"></Box>
    </Box>
  )
}

export default RouteMap

// import React, { useEffect } from "react"
// import { Box, Button } from "@chakra-ui/react"

// function RouteMap() {
//   const { kakao } = window

//   useEffect(() => {
//     const mapContainer = document.getElementById("mapContainer") // 지도를 표시할 div
//     const options = {
//       center: new kakao.maps.LatLng(33.438201, 126.578667), // 지도의 중심좌표
//       level: 5 // 지도의 확대 레벨
//     }

//     const map = new kakao.maps.Map(mapContainer, options) // 지도 표기

//     const positions = [
//       {
//         title: "좌표 1",
//         latlng: new kakao.maps.LatLng(33.444101, 126.570337)
//       },
//       {
//         title: "좌표 2",
//         latlng: new kakao.maps.LatLng(33.431101, 126.571337)
//       },
//       {
//         title: "좌표 3",
//         latlng: new kakao.maps.LatLng(33.443101, 126.581337)
//       },
//       {
//         title: "좌표 4",
//         latlng: new kakao.maps.LatLng(33.442101, 126.583337)
//       }
//     ]

//     const linePositions = []

//     function createMarkerImageWithText(text: string) {
//       // SVG 요소 생성
//       const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
//       svg.setAttribute("width", "20")
//       svg.setAttribute("height", "20")

//       // 배경 사각형 생성
//       const rect = document.createElementNS("http://www.w3.org/2000/svg", "circle")
//       rect.setAttribute("cx", "10")
//       rect.setAttribute("cy", "10")
//       rect.setAttribute("r", "10")
//       rect.setAttribute("fill", "black") // 배경 색상 설정
//       svg.appendChild(rect)

//       // 텍스트 생성
//       const textNode = document.createElementNS("http://www.w3.org/2000/svg", "text")
//       textNode.setAttribute("x", "10")
//       textNode.setAttribute("y", "10")
//       textNode.setAttribute("font-family", "Arial")
//       textNode.setAttribute("font-size", "10")
//       textNode.setAttribute("fill", "white") // 텍스트 색상 설정
//       textNode.setAttribute("text-anchor", "middle")
//       textNode.setAttribute("alignment-baseline", "middle")
//       textNode.textContent = text
//       svg.appendChild(textNode)

//       // SVG를 Data URL로 변환하여 반환
//       const svgData = new XMLSerializer().serializeToString(svg)
//       const svg64 = btoa(svgData)
//       const dataURL = "data:image/svg+xml;base64," + svg64
//       return dataURL
//     }

//     for (let i = 0; i < positions.length; i++) {
//       const markerImage = createMarkerImageWithText((i + 1).toString())
//       // 표기할 선 위치
//       linePositions.push(positions[i].latlng)

//       // 마커 표기
//       const marker = new kakao.maps.Marker({
//         map: map,
//         title: positions[i].title,
//         position: positions[i].latlng,
//         image: new kakao.maps.MarkerImage(
//           markerImage,
//           new kakao.maps.Size(20, 20),
//           new kakao.maps.Size(10, 20),
//           new kakao.maps.Size(10, 20)
//         )
//       })
//     }

//     // 경로 표기
//     const polyline = new kakao.maps.Polyline({
//       map: map,
//       path: linePositions, // 선을 구성하는 좌표배열
//       strokeWeight: 2,
//       strokeColor: "black",
//       strokeOpacity: 0.6,
//       strokeStyle: "dashed"
//     })
//   }, [])

//   return (
//     <Box width="550px" height="450px" mt="100px" ml="50px" position="sticky" top="100px">
//       <Box id="mapContainer" width="550px" height="450px"></Box>
//     </Box>
//   )
// }

// export default RouteMap
import React, { useEffect, useState } from "react"
import { Box } from "@chakra-ui/react"
import axios from "axios"
import { useParams } from "react-router-dom"

declare global {
  interface Window {
    kakao: any
  }
}

interface Place {
  title: string
  latlng: any
}

function RouteMap() {
  const { kakao } = window
  const [positions, setPositions] = useState<Place[]>([])
  const { id, memberId } = useParams<{ id: string; memberId: string }>()

  useEffect(() => {
    const fetchPositions = async () => {
      try {
        const response = await axios.get(
          `https://ke4f765103c24a.user-app.krampoline.com/api/plans/${id}?memberId=${memberId}`
        )
        const data = response.data.data
        const fetchedPositions = data.schedules.flatMap((schedule: { places: any[] }) =>
          schedule.places.map(place => ({
            title: place.placeName,
            latlng: new kakao.maps.LatLng(place.latitude, place.longitude)
          }))
        )
        setPositions(fetchedPositions)
      } catch (error) {
        console.error("Failed to fetch positions:", error)
      }
    }

    fetchPositions()
  }, [id, memberId])

  useEffect(() => {
    if (positions.length > 0) {
      const mapContainer = document.getElementById("mapContainer")
      const options = {
        center: positions[0].latlng,
        level: 5
      }

      const map = new kakao.maps.Map(mapContainer, options)

      positions.forEach((position, index) => {
        const markerImage = createMarkerImageWithText((index + 1).toString())
        new kakao.maps.Marker({
          map: map,
          position: position.latlng,
          title: position.title,
          image: new kakao.maps.MarkerImage(
            markerImage,
            new kakao.maps.Size(20, 20),
            new kakao.maps.Size(10, 20),
            new kakao.maps.Size(10, 20)
          )
        })

        // 이전 좌표와 현재 좌표를 잇는 선을 추가
        if (index > 0) {
          const line = new kakao.maps.Polyline({
            path: [positions[index - 1].latlng, position.latlng], // 선을 구성하는 좌표배열
            strokeWeight: 2, // 선의 두께
            strokeColor: "black", // 선 색깔
            strokeOpacity: 0.6, // 선 투명도
            strokeStyle: "dashed" // 선 스타일
          })
          line.setMap(map)
        }
      })
    }
  }, [positions])

  function createMarkerImageWithText(text: string) {
    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
    svg.setAttribute("width", "20")
    svg.setAttribute("height", "20")

    const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle")
    circle.setAttribute("cx", "10")
    circle.setAttribute("cy", "10")
    circle.setAttribute("r", "10")
    circle.setAttribute("fill", "black")
    svg.appendChild(circle)

    const textNode = document.createElementNS("http://www.w3.org/2000/svg", "text")
    textNode.setAttribute("x", "10")
    textNode.setAttribute("y", "15")
    textNode.setAttribute("font-family", "Arial")
    textNode.setAttribute("font-size", "10")
    textNode.setAttribute("fill", "white")
    textNode.setAttribute("text-anchor", "middle")
    textNode.textContent = text
    svg.appendChild(textNode)

    const svgData = new XMLSerializer().serializeToString(svg)
    const svg64 = btoa(svgData)
    const dataURL = `data:image/svg+xml;base64,${svg64}`
    return dataURL
  }

  return (
    <Box width="550px" height="450px" mt="100px" ml="50px" position="sticky" top="100px">
      <Box id="mapContainer" width="550px" height="450px"></Box>
    </Box>
  )
}

export default RouteMap

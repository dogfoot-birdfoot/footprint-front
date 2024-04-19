import React, { useEffect } from "react"
import { Box } from "@chakra-ui/react"

interface Place {
  title: string
  latlng: any
}

interface RouteMapProps {
  positions: Place[]
}

function RouteMap({ positions }: RouteMapProps) {
  useEffect(() => {
    if (positions.length > 0) {
      const mapContainer = document.getElementById("mapContainer")
      const options = {
        center: positions[0].latlng,
        level: 8
      }

      const map = new window.kakao.maps.Map(mapContainer, options)

      positions.forEach((position, index) => {
        const markerImage = createMarkerImageWithText((index + 1).toString())
        new window.kakao.maps.Marker({
          map: map,
          position: position.latlng,
          title: position.title,
          image: new window.kakao.maps.MarkerImage(
            markerImage,
            new window.kakao.maps.Size(20, 20),
            new window.kakao.maps.Size(10, 20),
            new window.kakao.maps.Size(10, 20)
          )
        })

        // 이전 좌표와 현재 좌표를 잇는 선을 추가
        if (index > 0) {
          const line = new window.kakao.maps.Polyline({
            path: [positions[index - 1].latlng, position.latlng],
            strokeWeight: 2,
            strokeColor: "black",
            strokeOpacity: 0.6,
            strokeStyle: "dashed"
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

import styled from "styled-components"

export const DayHeader = styled.h1`
  font-weight: bold;
  width: 50px;
  margin-right: 20px;
`
export const DestinationItem = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 14px;

  svg {
    margin: 0 6px 0 6px;
  }
`

export const DestinationSmallItem = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 10px;

  svg {
    margin: 0 3px;
  }
`

export const DayDestination = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
`

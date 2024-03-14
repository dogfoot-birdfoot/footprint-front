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

  & + & {
    margin-left: 8px;
  }

  svg {
    margin: 0 5px;
  }
`

export const DestinationSmallItem = styled.span`
  display: inline-flex;
  align-items: center;
  font-size: 12px;

  svg {
    margin: 0 3px;
  }
`

export const DayDestination = styled.div`
  display: flex;
  flex-wrap: wrap;
`

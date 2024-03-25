import styled from "styled-components"

export const Schedule = styled.div`
  width: 1024px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  overflow-y: hidden;
`

export const ScheduleTitle = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  height: 3rem;
  width: 90%;
  font-size: 1.3rem;
  font-weight: bold;
`
export const ScheduleText = styled.div`
  display: flex;
  align-items: center;
  height: 2rem;
`
export const WholeScheduleButton = styled.button`
  height: 2rem;
  width: 5rem;
  font-size: 0.7rem;
  border: 1px solid lightgray;
  border-radius: 0.5rem;
`
export const ScheduleList = styled.div`
  margin-top: 30px;
  margin-bottom: 30px;
  display: flex;
  width: 95%;
  flex-direction: column;
  flex-wrap: wrap;
`

import styled from "styled-components"

const StyleComponent = styled.div`
  background-color: blue;
`

function temp() {
  return (
    <StyleComponent>
      <div className="App">test styled component</div>
    </StyleComponent>
  )
}

export default temp

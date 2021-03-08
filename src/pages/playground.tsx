import { NavBar } from '@Components/NavBar'
import { OpenHours } from '@Components'
import styled from 'styled-components'
import Editor from '@monaco-editor/react'
import { useState } from 'react'

import sample1 from '../data/sample1.json'
import { OpenHoursObj } from '../interfaces'

const Playground = () => {
  const [openHours, setOpenHours] = useState<OpenHoursObj>(
    JSON.parse(JSON.stringify(sample1))
  )
  const onEdit = (json: string | undefined) => {
    try {
      if (typeof json === 'string') {
        setOpenHours(JSON.parse(json))
      }
    } catch {
      setOpenHours(JSON.parse('{}'))
    }
  }

  return (
    <div>
      <NavBar />
      <MainContainer>
        <EditorContainer>
          <Editor
            width="100%"
            height="100%"
            language="json"
            //theme="vs-dark"
            onChange={onEdit}
            defaultValue={JSON.stringify(sample1, null, 2)}
          />
        </EditorContainer>
        <OpenHoursContainer>
          <OpenHours openHours={openHours} />
        </OpenHoursContainer>
      </MainContainer>
    </div>
  )
}

export default Playground

const MainContainer = styled.div`
  background: ${({ theme }) => theme.colors.grey1};
  display: flex;
  flex-direction: row;
  width: 100%;
  height: calc(100vh - 144px);
  @media (max-width: 750px) {
    flex-direction: column;
  }
`

const OpenHoursContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex: 0;
  background: ${({ theme }) => theme.colors.grey1};
  padding: 1rem;
  @media (max-width: 750px) {
    flex: 1;
  }
`

const EditorContainer = styled.div`
  flex: 1;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
`

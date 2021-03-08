import { NavBar } from '@Components/NavBar'
import { OpenHours } from '@Components'
import styled from 'styled-components'
import { ChangeEvent, useCallback, useEffect, useState } from 'react'

import { getItems, isValid, removeItem, saveItem } from '../utils'
import { OpenHoursObj } from '../interfaces'

const Index = () => {
  const [openHourItems, setOpenHourItems] = useState<
    Record<string, OpenHoursObj>
  >({})
  const [selectedItem, setSelectedItem] = useState<string | null>(null)

  const [file, setFile] = useState<string>()
  const changeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const fileReader = new FileReader()
    if (!e?.target?.files?.length) return
    fileReader.readAsText(e.target?.files[0], 'UTF-8')
    fileReader.onload = (e) => {
      const res = e?.target?.result || '{}'
      setFile(res.toString())
    }
  }

  const loadOpenHourItems = useCallback(async () => {
    const items = await getItems()
    if (!items) return
    setOpenHourItems(items)
    if (!selectedItem) {
      setSelectedItem(Object.keys(items)[0])
    }
  }, [selectedItem])

  const onRemove = async (
    event: React.MouseEvent<HTMLDivElement>,
    key: string
  ) => {
    event.stopPropagation()
    if (selectedItem === key) {
      setSelectedItem(null)
    }
    removeItem(key)
    const items = await getItems()
    if (!items) return
    setOpenHourItems(items)
    if (!selectedItem) {
      setSelectedItem(Object.keys(items)[0])
    }
  }

  useEffect(() => {
    if (file) {
      try {
        const parsed = JSON.parse(file)
        if (!isValid(parsed)) throw new Error()
        saveItem(parsed)
      } catch (e) {
        alert('Invalid JSON')
      }
    }
  }, [file])

  useEffect(() => {
    loadOpenHourItems()
  }, [file, loadOpenHourItems])

  return (
    <div>
      <NavBar />
      <MainContainer>
        <DataContainer>
          <UploadContainer>
            <UploadLabel htmlFor="file-upload">Upload JSON</UploadLabel>
            <FileInput
              id="file-upload"
              type="file"
              name="file"
              onChange={changeHandler}
            />
          </UploadContainer>
          <ListContainer>
            {Object.keys(openHourItems).map((key, index) => (
              <ListItemContainer
                onClick={() => setSelectedItem(key)}
                key={key}
                selected={key === selectedItem}
              >
                <span>{`Sample ${index + 1}`}</span>
                <Remove onClick={(e) => onRemove(e, key)}>Remove</Remove>
              </ListItemContainer>
            ))}
          </ListContainer>
        </DataContainer>
        <OpenHoursContainer>
          <OpenHours
            openHours={selectedItem ? openHourItems[selectedItem] : {}}
          />
        </OpenHoursContainer>
      </MainContainer>
    </div>
  )
}

export default Index

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

const DataContainer = styled.div`
  flex: 1;
  display: flex;
  flex-direction: row;
  background: white;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  @media (max-width: 550px) {
    flex-direction: column;
  }
`

const UploadContainer = styled.div`
  padding: 2rem;
  display: flex;
  justify-content: center;
  align-items: flex-start;
`

const FileInput = styled.input`
  padding: 2rem;
  border-radius: 0.25rem;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  cursor: pointer;
  display: none;
`

const UploadLabel = styled.label`
  border: 1px solid ${({ theme }) => theme.colors.primary};
  border-radius: 0.25rem;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 16px;
  display: inline-block;
  padding: 0.5rem 1rem;

  cursor: pointer;

  &:hover {
    background: ${({ theme }) => theme.colors.grey1};
  }
`

const Remove = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 0.25rem;
  display: inline-block;
  padding: 0.5rem 1rem;

  &:hover {
    background: ${({ theme }) => theme.colors.white};
    color: ${({ theme }) => theme.colors.black};
  }
`
const ListContainer = styled.div`
  display: flex;
  overflow: auto;
  flex: 1;
  flex-direction: column;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
`

const ListItemContainer = styled.div<{ selected: boolean }>`
  height: 70px;
  display: flex;
  cursor: pointer;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
  flex-shrink: 0;
  flex-direction: row;
  background: ${({ selected, theme }) =>
    selected ? theme.colors.primary : theme.colors.white};
  color: ${({ selected, theme }) =>
    selected ? theme.colors.white : theme.colors.black};
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    background: ${({ selected, theme }) =>
      selected ? theme.colors.primary : theme.colors.grey1};
  }
`

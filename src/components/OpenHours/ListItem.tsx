import React from 'react'
import styled from 'styled-components'
import moment from 'moment'
import { Weekday } from '../../interfaces'

type ListItemProps = {
  day: Weekday
  hours: string[]
}

const ListItem = ({ day, hours }: ListItemProps) => {
  return (
    <Container>
      <Day>
        {moment().day(day).format('dddd')}
        {moment().day(day).isSame(Date.now(), 'day') && (
          <TodayIndicator>TODAY</TodayIndicator>
        )}
      </Day>
      {hours?.length ? (
        <Hours>
          {hours?.length < 3
            ? hours?.join(', ')
            : hours.map((h: string) => <span key={h}>{h}</span>)}
        </Hours>
      ) : (
        <Closed>Closed</Closed>
      )}
    </Container>
  )
}

export { ListItem }

const Day = styled.div`
  font-weight: 500;
`
const Hours = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 200px;
  font-size: calc(var(--column-width) / 1000);
`

const Closed = styled.div`
  color: ${({ theme }) => theme.colors.grey3};
`

const Container = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid ${({ theme }) => theme.colors.grey2};
  padding: 0.5rem 0;
  font-size: 16px;
`

const TodayIndicator = styled.span`
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.green};
  font-size: 12px;
  font-weight: bold;
  margin-left: 0.5rem;
`

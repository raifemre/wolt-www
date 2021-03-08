import React, { useMemo } from 'react'
import styled from 'styled-components'
import { theme } from '../../styles/global'
import { ListItem } from '@Components/OpenHours/ListItem'
import { weekDays, formatTime, isValid } from '../../utils'
import { Hour, IconProps, OpenHoursObj, OpenHoursProps } from '../../interfaces'

const ClockIcon = ({ color }: IconProps) => (
  <svg
    version="1.1"
    style={{ marginRight: 10 }}
    x="0px"
    y="0px"
    width="24px"
    height="24px"
    fill={color}
    stroke={color}
    strokeWidth={10}
    viewBox="0 0 512 512"
  >
    <g>
      <g>
        <path
          d="M347.216,301.211l-71.387-53.54V138.609c0-10.966-8.864-19.83-19.83-19.83c-10.966,0-19.83,8.864-19.83,19.83v118.978
			c0,6.246,2.935,12.136,7.932,15.864l79.318,59.489c3.569,2.677,7.734,3.966,11.878,3.966c6.048,0,11.997-2.717,15.884-7.952
			C357.766,320.208,355.981,307.775,347.216,301.211z"
        />
      </g>
    </g>
    <g>
      <g>
        <path
          d="M256,0C114.833,0,0,114.833,0,256s114.833,256,256,256s256-114.833,256-256S397.167,0,256,0z M256,472.341
			c-119.275,0-216.341-97.066-216.341-216.341S136.725,39.659,256,39.659c119.295,0,216.341,97.066,216.341,216.341
			S375.275,472.341,256,472.341z"
        />
      </g>
    </g>
  </svg>
)

const formatOpenHours = (openHours: OpenHoursObj): (string | boolean)[][] => {
  const s = isValid(openHours)
  if (!s) return []

  return [...weekDays].map((day, index) => {
    const opens = openHours[day]
      ?.filter((h: Hour) => h.type === 'open')
      .map((o: Hour) => o.value)
      .sort()
    const closes = openHours[day]
      ?.filter((h: Hour) => h.type === 'close')
      .map((o: Hour) => o.value)
      .sort()

    return opens
      .map((openHour: number) => {
        const closeHour =
          closes.find((c: number) => c > openHour) ||
          openHours[weekDays[index < 6 ? index + 1 : 0]]
            ?.filter((h: Hour) => h.type === 'close')
            .map((o: Hour) => o.value)
            .sort()[0]
        if (!closeHour) return false
        return `${formatTime(openHour)} - ${formatTime(closeHour)}`
      })
      .filter(Boolean)
  })
}

const OpenHours = ({ openHours }: OpenHoursProps) => {
  const formattedHours = useMemo(() => {
    return formatOpenHours(openHours)
  }, [openHours])

  return (
    <MainContainer>
      <Header>
        <ClockIcon color={theme.colors.grey3} /> Opening Hours
      </Header>
      <Divider />
      {formattedHours.length ? (
        formattedHours.map((hour, index) => (
          <ListItem
            key={weekDays[index]}
            day={weekDays[index]}
            hours={hour.map((h) => h.toString())}
          />
        ))
      ) : (
        <Message>Not provided by restaurant</Message>
      )}
    </MainContainer>
  )
}

export { OpenHours }

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 2rem;
  border: 1px solid ${({ theme }) => theme.colors.grey2};
  border-radius: 10px;
  width: 300px;
  min-height: 285px;
  background: #ffffff;
  box-shadow: 0px 2px 4px 0px rgba(50, 50, 50, 0.1);
`

const Header = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  font-size: 24px;
  font-weight: bold;
`

const Divider = styled.div`
  width: 100%;
  border-bottom: 1px solid ${({ theme }) => theme.colors.black};
  padding: 0.5rem 0;
`

const Message = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0.5rem 0;
`

import React from 'react'
import contrast from 'get-contrast'
import { Debug } from '.'
import { flatten } from './util'
import { Box, Code, Flex, Text } from './ui'

export const Swatch = ({ name, value, ...props }) => (
  <React.Fragment>
    <Box p={3} {...props}>
      <Box bg={value} p={[3, 4, 5]} />
      <Text>{name}</Text>
      <Code f={0}>{value}</Code>
    </Box>
  </React.Fragment>
)

export const Contrast = ({ color, bg, children }) => (
  <Box p={[3, 4, 5]} bg={bg} color={color}>
    <Text f={[5, 6, 128]} fontWeight='bold'>
      Aa
    </Text>
    <Flex alignItems='baseline'>
      <Code f={6}>{contrast.ratio(bg, color).toFixed(2)}</Code>
      <Text f={4} fontWeight='bold'>{contrast.score(bg, color)}</Text>
    </Flex>
    {children}
  </Box>
)

const Color = ({ colors }) => {
  const colorsObj = flatten(colors)
  const colorsArr = Object.keys(colorsObj).reduce((acc, key) =>
    acc.concat([{ key, name: key, value: colorsObj[key] }])
  , [])

  return (
    <Flex
      flexWrap='wrap'
      children={colorsArr.map(color =>
        <Swatch
          width={[1/2, 1/3, 1/5]}
          {...color}
        />
      )}
    />
  )
}

Color.Swatch = Swatch
Color.Contrast = Contrast

export default Color

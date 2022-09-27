import { Center, Flex, Text, Image } from '@chakra-ui/react'
import { observer } from 'mobx-react-lite'
import React from 'react'
import Lottie from 'react-lottie'
import { LottieAnimations, LottieConfig } from '../constants/lottie'
import { URL } from '../constants/url'
import btn from '../assets/images/googleBtn.png'

const Login = observer(() => {
  return (
    <Flex
      w='100vw'
      h='100vh'
      bg='sec.300'
      align='center'
      direction='column'
      justify='center'>
      <Center>
        <Lottie
          options={LottieConfig(LottieAnimations.Video)}
          height={280}
          width={320}
        />
      </Center>

      <Text color='grey.300'>React Starter Template</Text>
      <Image
        src={btn}
        mt={12}
        cursor='pointer'
        onClick={() => window.open(`${URL}login/google`)}
      />
    </Flex>
  )
})

export default Login

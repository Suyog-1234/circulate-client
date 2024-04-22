"use client"
import store from '@/integration/store'
import { CommonComponentProps } from '@/types/commonComponentProps'
import { FC } from 'react'
import { Provider } from 'react-redux'

interface ReduxStoreProvider extends CommonComponentProps{
  
}

const ReduxStoreProvider: FC<ReduxStoreProvider> = ({children}) => {
  return (
      <Provider store={store}>
          {children}
      </Provider>
  )
}

export default ReduxStoreProvider
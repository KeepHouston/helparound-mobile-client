import * as Google from 'expo-google-app-auth'
import React, { useEffect } from 'react'
import { Button } from 'react-native'
import { useLoginMutation, useMeLazyQuery } from '../graphql/generated/graphql'

export const LoginComponent = () => {
    const [login, { loading, data, error }] = useLoginMutation()
    const [loadMe, { data: me }] = useMeLazyQuery()

    useEffect(() => {
        data && loadMe()
    }, [data])

    useEffect(() => {
        console.log(me)
    }, [me])
    return (
        <Button
            title="Google login"
            onPress={async () => {
                const { accessToken, refreshToken, idToken }: any =
                    await Google.logInAsync({
                        clientId:
                            '265204013790-b59b6kqoj0j5d4cme3pqd94bvfosudr0.apps.googleusercontent.com',
                        scopes: ['profile'],
                    })

                login({
                    variables: {
                        loginInput: { accessToken, refreshToken, idToken },
                    },
                })
            }}
        />
    )
}
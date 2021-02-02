import React from 'react'
import { ApolloProvider } from "@apollo/client"
import { client } from "./client"
import { ThemeProvider } from "theme-ui"
import { deep, dark, swiss } from "@theme-ui/presets"

const newTheme = {
    ...swiss,
    sizes: {
        container: 1024
    }
}



export const wrapRootElement = ({ element }) => (
    <ThemeProvider theme={newTheme} >
        <ApolloProvider client={client} >
            {element}
        </ApolloProvider>
    </ThemeProvider>

);
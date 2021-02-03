import React from 'react'
import { ApolloProvider } from "@apollo/client"
import { client } from "./client"
import { ThemeProvider } from "theme-ui"
import { deep, dark, swiss, light } from "@theme-ui/presets"

const newTheme = {
    // ...deep,
    sizes: {
        container: 1024
    },



    fonts: {
        body: 'system-ui, sans-serif',
        heading: '"Avenir Next", sans-serif',
        monospace: 'Menlo, monospace',
      },
      colors: {
        text: '#000',
        background: '#fff',
        primary: '#33e',
      },
}



export const wrapRootElement = ({ element }) => (
    <ThemeProvider theme={newTheme} >
        <ApolloProvider client={client} >
            {element}
        </ApolloProvider>
    </ThemeProvider>

);
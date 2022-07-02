import NextApp from 'next/app'
import './_app.global.scss'

export default class App extends NextApp {
    public render() {
        const { Component, pageProps } = this.props

        return (
            <Component {...pageProps}/>
        )
    }
}

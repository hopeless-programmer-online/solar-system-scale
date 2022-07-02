import React, { PropsWithChildren } from 'react'
import Head from 'next/head'

export type Props = PropsWithChildren<{
    title? : string
}>
export type State = unknown

export default class PageComponent extends React.Component<Props, State> {
    public static defaultProps = {
        title : ``,
    }

    public render() {
        const { title, children } = this.props

        return (
            <>
                <Head>
                    <title>
                        {title}
                    </title>
                </Head>
                {children}
            </>
        )
    }
}

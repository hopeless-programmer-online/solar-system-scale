import React from 'react'
import PageComponent from '../components/page'

export type Props = unknown
export type State = unknown

export default class IndexPage extends React.Component<Props, State> {
    public render() {
        return (
            <PageComponent title={`Solar System Scale`}>
            </PageComponent>
        )
    }
}

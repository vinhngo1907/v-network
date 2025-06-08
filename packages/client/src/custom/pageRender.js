'use client'
import { useParams } from 'next/navigation'
import NotFound from '@/components/global/NotFound'
import dynamic from 'next/dynamic'

const PageRender = () => {
    const params = useParams()
    const { page, id } = params

    let PageComponent = null

    try {
        if (page && id) {
            PageComponent = dynamic(() => import(`@/pages/${page}/[id].js`))
        } else if (page) {
            PageComponent = dynamic(() => import(`@/pages/${page}/page.js`))
        } else {
            throw new Error("Invalid page")
        }
    } catch (err) {
        return <NotFound />
    }

    return PageComponent ? <PageComponent /> : <NotFound />
}

export default PageRender;
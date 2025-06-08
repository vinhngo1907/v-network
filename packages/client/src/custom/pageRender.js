import NotFound from "@/components/global/NotFound";
import { useParams } from "next/navigation";
import React from "react";
import { useSelector } from "react-redux";

const generatePage = (pageName) => {
    const component = () => require(`../pages/${pageName}`);
    try {
        return React.createElement(component());
    } catch (error) {
        return <NotFound />
    }
}

const PageRender = () => {
    const { auth } = useSelector(state => state);
    const { id, page } = useParams();

    let pageName = '';
    if (auth.token) {
        if (id) {
            pageName = `${page}/${id}`;
        } else {
            pageName = page;
        }
    }

    return generatePage(pageName);
}

export default PageRender;
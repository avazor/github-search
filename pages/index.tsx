import Repositories from "../components/Repositories";
import {NextPageWithLayout} from "./_app";
import {ReactElement} from "react";
import Layout from "../components/Layout";

const Home: NextPageWithLayout = () => {
    return (
        <Repositories/>
    )
}

Home.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}


export default Home

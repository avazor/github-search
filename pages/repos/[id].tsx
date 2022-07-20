import React, {ReactElement} from 'react';
import {useRouter} from "next/router";
import {NextPageWithLayout} from "../_app";
import Layout from "../../components/Layout";

const Id: NextPageWithLayout = () => {
    const router = useRouter();
    return <div>
        id = {router.query.id}
        <input type={"button"} onClick={()=>{router.back()}} value={'back'}/>
    </div>
};
Id.getLayout = function getLayout(page: ReactElement) {
    return (
        <Layout>
            {page}
        </Layout>
    )
}
export default Id;
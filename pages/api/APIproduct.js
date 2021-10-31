import * as Config from "../constant/config";




 const getStaticProps = async () => {
    
    const res = await fetch(Config.API_URL);
    const data = await res.json()
    
    return {
        props: {
            data,
        }
    }

}
export default getStaticProps;
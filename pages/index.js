import React,{useEffect, useState, Suspense} from 'react'
import Container from '@material-ui/core/Container';
import {getArticles} from '../api'
import PageData from './page_data'
const Main =() => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  useEffect(()=>{
    (async function getArticlesData() {
      const result = await getArticles()
      if(result.status === "OK"){
        setData(result.results)
        setLoading(false)
      }
    })();  
  },[])
  return(
    <Container maxWidth="lg" style={{marginTop: 40}}>
        <PageData data={data} loading={loading}  />
    </Container>
  )
}
export default Main
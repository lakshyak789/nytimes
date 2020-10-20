import React,{useEffect, useState} from 'react'
import PageDate from './about';
import Container from '@material-ui/core/Container';
import {getArticles} from '../api'

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
      <PageDate data={data} loading={loading}  />
    </Container>
  )
}
export default Main
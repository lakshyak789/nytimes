import React,{useEffect, useState, Suspense} from 'react'
import Container from '@material-ui/core/Container';
import {getArticles} from '../api'
import dynamic from 'next/dynamic'
import Pagination from '@material-ui/lab/Pagination';
import Grid from '@material-ui/core/Grid';

const PageData = dynamic(() => import('./page_data'))

const Main =() => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(9)
  const [indexOfLastTodo, setIndexOfLastTodo] = useState()
  const [indexOfFirstTodo, setIndexOfFirstTodo] = useState()
  const [pageNumbers, setPageNumbers] = useState([])

  useEffect(()=>{
    (async function getArticlesData() {
      const result = await getArticles()
      if(result.status === "OK"){
        setData(result.results)
        setLoading(false)
      }
    })();  
  },[])
  useEffect(()=>{
    if(data !== undefined){
        setPageNumbers(Math.ceil(data.length / dataPerPage))
      }
  },[data])

  useEffect(()=>{
    setIndexOfLastTodo(currentPage * dataPerPage)
    setIndexOfFirstTodo(indexOfLastTodo - dataPerPage)
  })
  return(
    <Container maxWidth="lg" style={{marginTop: 40}}>
        <PageData data={data} loading={loading} indexOfFirstTodo={indexOfFirstTodo} indexOfLastTodo={indexOfLastTodo}/>
        <Grid container spacing={6}>
          <Grid item xs={12} >
            <Pagination variant="outlined" color="primary" count={pageNumbers} page={currentPage} onChange={(e, value)=> setCurrentPage(value)} />
          </Grid>
        </Grid>
    </Container>
  )
}
export default Main
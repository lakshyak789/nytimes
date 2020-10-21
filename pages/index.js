import React,{useEffect, useState, useCallback} from 'react'
import Container from '@material-ui/core/Container';
import {getArticles} from '../api'
import dynamic from 'next/dynamic'
import { useBottomScrollListener } from 'react-bottom-scroll-listener'
const PageData = dynamic(() => import('./page_data'))

const Main =() => {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)
  const [dataPerPage, setDataPerPage] = useState(9)
  const [indexOfLastTodo, setIndexOfLastTodo] = useState()
  const [indexOfFirstTodo, setIndexOfFirstTodo] = useState(1)
  const [pageNumbers, setPageNumbers] = useState(1)
  let pageNo = 1

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

  const handleOnDocumentBottom = useCallback(() => {
    console.log("bottom",pageNumbers, currentPage)
    if(currentPage <= pageNumbers){
      pageNo = pageNo + 1
      setCurrentPage(pageNo)
    }
  }, [])

  useEffect(()=>{
    setIndexOfLastTodo(currentPage * dataPerPage)
  })
  useBottomScrollListener(handleOnDocumentBottom)
  return(
    <Container maxWidth="lg" style={{marginTop: 40}} >
        <PageData data={data} loading={loading} indexOfFirstTodo={indexOfFirstTodo} indexOfLastTodo={indexOfLastTodo} />
    </Container>
  )
}
export default Main
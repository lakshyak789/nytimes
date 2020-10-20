export const getArticles = async() =>{
  console.log(process.env.NEXT_PUBLIC_API_KEY)
  const response = await fetch(`https://api.nytimes.com/svc/mostpopular/v2/emailed/1.json?api-key=${process.env.NEXT_PUBLIC_API_KEY}`)
  const result = await response.json()
  return result
}
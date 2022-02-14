import { Search } from '@material-ui/icons'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const Wrapper = styled.div`
    height: 100vh auto;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    background: #faf5f5;
    padding-bottom: 2rem;
`
const Text = styled.h1`
  color: teal;
  font-size: 1.5rem;
`
const SearchContainer = styled.div`
    border: 1px solid #ccc;
    display: flex;
    align-items: center;
    width: 50%;
    height: 5.5vh;
`
const Input = styled.input`
  width: 100%;
  border:none;
  line-height: 29px;
  padding-left: 6px;
  outline: none;
`
const Button = styled.button`
  border: none;
  padding-top: 3px;
`

const Container = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;;
  align-items: center;
`

const Image = styled.img`
  width: 200px;
`
const PokeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 6px;
    box-shadow: 2px 2px 5px #ccc;
    background: white;
    border-radius: 5px;
    cursor: pointer;
    transition: .1s;
    &:hover{
      background-color: skyblue;
    }
    &:hover ${Image}{
      transform: scale(1,2)
    }
`

const PokeName = styled.h5`
  text-transform: uppercase;
  text-decoration: none;
`

function Dashboard() {
  const [data, setData] = useState([])
  const [pokes, setPokes] = useState('')
  const [error, setError] = useState('')
  const [name, setName] = useState('')

  const fetchHandler = async () => {
    let dl = []
    const fetchData = async (i) => {
      await fetch(`https://pokeapi.co/api/v2/pokemon/${i}/`)
        .then(res => res.json())
        .then(res => {
          dl.push(res)
        })
        .catch(err => {
          console.log('err', err)
        })
    }
    for (let i = 1; i <= 150; i++) {
      const data = await fetchData(i)
    }
    setData(dl)
    setPokes(dl)
  }
  console.log(data)
  useEffect(() => {
    fetchHandler()
  }, [])

  const searchHandler = () => {
    const matchData = pokes.filter(dt => dt.name.toLowerCase() === name.toLowerCase())
    setData(matchData)
  }
  const images = data && data.map(dt =>
    <Link to={`/pokemon/${dt.id}`} key={dt.id}>
      <PokeContainer>
        <Image src={dt.sprites.back_default} />
        <PokeName>{dt.name}</PokeName>
      </PokeContainer>
    </Link>
  )

  return (
    <Wrapper>
      <Text>Search Pokemon by Name</Text>
      <SearchContainer>
        <Input type="text" onChange={(e) => setName(e.target.value)} />
        <Button onClick={searchHandler}>
          <Search />
        </Button>
      </SearchContainer>
      {data.length>0? 
      <Container>
        {images}
      </Container>
      :
      <Text>
        <p> Data not found</p>
        <button onClick={()=>setData(pokes)} >back</button></Text>
      }
    </Wrapper>
  );
}

export default Dashboard;

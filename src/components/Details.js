import { useEffect, useState } from "react"
import { Link, useParams } from "react-router-dom"
import styled from "styled-components"

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;;
    align-items: center;
    background: #faf5f5;
    
`

const Container = styled.div`
    box-shadow: 2px 2px 5px #ccc;
    border-radius: 5px;
    background: white;
    background-color: #C7E87C;
`
const PokeContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    margin: 6px;
    cursor: pointer;
    border-radius: 5px;

`
const Image = styled.img`
  width: 200px;
`
const PokeName = styled.div`
    text-transform: uppercase;
    text-align: start;
    margin-top: 1rem;
    margin-right: 2rem;
    font-size: 20px;
    color: #fff;

`
const DetailContainer = styled.div`
    background-color: #fff;
    padding: 1rem;
    border-radius: 1rem 1rem 0 0;
`
const D = styled.h3`
`
const P = styled.h5`
    margin: .5rem;
    font-weight: 500;
    display: flex;
    justify-content: space-between;
    align-items:center;
`
const Specification = styled.div`
    display: flex;
    justify-content: space-between;
`
const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items:center;
    flex-wrap: wrap;
`
const Arrow = styled.div`
`
const Icon = styled.img`
    height: 20px;
    width: 20px;
    margin-left: 10px;
    cursor: pointer;
`

const Details = () => {
    const [poke, setPoke] = useState()
    const param = useParams()
    const fetchData = async () => {
        await fetch(`https://pokeapi.co/api/v2/pokemon/${param.id}/`)
            .then(res => res.json())
            .then(res => {
                setPoke(res)
            })
            .catch(err => {
                console.log('err', err)
            })
    }
    useEffect(() => {
        fetchData()
        console.log(poke)
    }, [])
    return (
        <Wrapper>
            <Container>
                <Header>
                    <Arrow>
                        <Link to="/">
                            <Icon src="https://firebasestorage.googleapis.com/v0/b/mystore-51bd6.appspot.com/o/icon%2Fback-arrow.png?alt=media&token=0297be42-cbbe-44a9-8b60-f793d66fdda2" />
                        </Link>
                    </Arrow>
                    <PokeName>{poke && poke.name}</PokeName>
                    <Arrow></Arrow>
                </Header>
                <PokeContainer>
                    <Image src={poke && poke.sprites.back_default} />
                </PokeContainer>
                <DetailContainer>
                    {/* <TabContainer>
                        <Tab></Tab>
                    </TabContainer> */}
                    <D>Details</D>
                    <Specification>
                        <P>Width</P>
                        <P>{poke && poke.weight}</P>
                    </Specification>
                    <Specification>
                        <P>Height</P>
                        <P>{poke && poke.height}</P>
                    </Specification>
                    <Specification>
                        <P>Abilities</P>
                        <P>
                            {poke && poke.abilities.map((abl, index) => <P key={index}>{abl.ability.name}</P>)}
                        </P>
                    </Specification>
                </DetailContainer>
            </Container>
        </Wrapper>

    )
}

export default Details
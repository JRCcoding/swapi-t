import React, { useEffect, useState } from 'react'
import axios from 'axios'

const CharacterCard = () => {
  const [chars, setChars] = useState()
  const [page, setPage] = useState(1)
  const [searchQuery, setSearchQuery] = useState('')
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const fetchChars = async () => {
    setLoading(true)
    try {
      const response = await axios.get(
        `https://swapi.dev/api/people/?search=${searchQuery}&page=${page}`
      )
      setChars(response.data.results)
      setLoading(false)
    } catch (error) {
      console.log('Error fetching chars:', error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchChars()
  }, [page, searchQuery])

  const handleNextPage = () => {
    if (page < 10) {
      setPage(page + 1)
      setOpen(false)
    }
  }

  const handlePreviousPage = () => {
    if (page > 1) {
      setPage(page - 1)
      setOpen(false)
    }
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value)
    setOpen(false)
  }

  const handleSearchSubmit = (event) => {
    event.preventDefault()
    setPage(1)
    setOpen(false)
  }
  const titleStyle = {
    width: '32%',
    marginLeft: 'auto',
    marginRight: 'auto',
  }
  const loadingStyle = {
    height: '90vh',
    width: '100vw',
    marginTop: '30%',
    marginRight: '50%',
    marginBottom: '70%',
    marginLeft: '50%',
    padding: 'auto',
  }
  const containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    gap: '30px',
  }
  const charCardStyle = {
    width: '50%',
    height: '50px',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: '.5% 2.5%',
    border: '2px solid black',
    borderRadius: '5px',
    listStyle: 'none',
    textDecoration: 'none',
    textAlign: 'center',
    backgroundColor: 'black',
    cursor: 'pointer',
  }
  const openCharCardStyle = {
    width: '50%',
    height: '300px',
    margin: '15px auto',
    padding: '2.5% 5%',
    border: '2px solid black',
    borderRadius: '5px',
    listStyle: 'none',
    textDecoration: 'none',
    backgroundColor: 'black',
    color: 'gold',
  }
  const paginationStyle = {
    width: '30%',
    display: 'flex',
    justifyContent: 'space-between',
    margin: 'auto',
  }

  return (
    <div>
      <form onSubmit={handleSearchSubmit} style={titleStyle}>
        <button
          type='button'
          onClick={() => {
            setSearchQuery('')
            setOpen(false)
          }}
        >
          Clear
        </button>
        <input
          type='text'
          value={searchQuery}
          onChange={handleSearchChange}
          placeholder='Search for people'
        />
        <button type='submit'>Search</button>

        <h3
          style={{
            fontFamily: 'DeathStar',
            scale: '1.5',
            marginLeft: 'auto',
            marginRight: 'auto',
            width: '40%',
            textAlign: 'center',
            color: 'gold',
          }}
        >
          Star Wars Characters:
        </h3>
      </form>
      {loading ? (
        <div style={loadingStyle}>
          <h1>Loading...</h1>
        </div>
      ) : (
        <div style={containerStyle}>
          {chars &&
            chars.map((char) => (
              <div
                key={char.name}
                value={char.name}
                style={open ? openCharCardStyle : charCardStyle}
                onClick={(e) => {
                  e.preventDefault()
                  setSearchQuery(char.name)
                  setPage(1)
                  setOpen(!open)
                }}
              >
                <h2
                  style={{
                    fontFamily: 'DeathStar',
                    marginTop: '-.0%',
                    scale: '1.2',
                    color: 'gold',
                  }}
                >
                  {char.name}
                </h2>
                <br />
                <br />
                {open && (
                  <div>
                    <h3>Information:</h3>
                    <p>
                      {char.gender !== 'n/a' && (
                        <>
                          <strong>Gender: </strong> {char.gender}
                        </>
                      )}
                      <br />
                      {char.birth_year !== 'n/a' && (
                        <>
                          <strong>Birth Year: </strong> {char.birth_year}
                        </>
                      )}
                      <br />
                      {char.height !== 'n/a' && (
                        <>
                          <strong>Height: </strong> {char.height}
                        </>
                      )}
                      <br />
                      {char.hair_color !== 'n/a' && (
                        <>
                          <strong>Hair Color: </strong> {char.hair_color}
                        </>
                      )}
                    </p>
                    <sub>* Some information omitted if not available</sub>
                  </div>
                )}
              </div>
            ))}
          <br />
          {!open && searchQuery < 3 && (
            <div style={paginationStyle}>
              <button onClick={handlePreviousPage}>Previous</button>
              {page}
              <button onClick={handleNextPage}>Next</button>
            </div>
          )}
        </div>
      )}
    </div>
  )
}

export default CharacterCard

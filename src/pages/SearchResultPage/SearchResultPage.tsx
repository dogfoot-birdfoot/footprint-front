import React from "react"
import { useLocation } from "react-router-dom"

const mockData = [
  { id: 1, title: "Apple", description: "An apple is an edible fruit produced by an apple tree." },
  { id: 2, title: "Banana", description: "A banana is an elongated, edible fruit." },
  { id: 3, title: "Cherry", description: "A cherry is the fruit of many plants of the genus Prunus." }
]

const SearchResultsPage: React.FC = () => {
  const location = useLocation()
  const searchParams = new URLSearchParams(location.search)
  const query = searchParams.get("query")?.toLowerCase()

  const filteredData = mockData.filter(
    item => item.title.toLowerCase().includes(query || "") || item.description.toLowerCase().includes(query || "")
  )

  return (
    <div>
      <h1>Search Results</h1>
      {filteredData.length > 0 ? (
        <ul>
          {filteredData.map(item => (
            <li key={item.id}>
              <h2>{item.title}</h2>
              <p>{item.description}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>No results found for `{query}`.</p>
      )}
    </div>
  )
}

export default SearchResultsPage

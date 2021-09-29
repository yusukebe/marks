const { useState, useEffect } = React

const App = () => {
  const [urls, setUrls] = useState([])

  const fetchData = async () => {
    const response = await fetch('/links')
    const data = await response.json()
    console.log(data)
    setUrls(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const [newUrl, setNewUrl] = useState('')
  const handleChange = e => {
    setNewUrl(e.target.value)
  }
  const createNewLink = async () => {
    const body = JSON.stringify({ url: newUrl })
    const headers = {
      'Content-Type': 'application/json',
    }
    const response = await fetch('/links', { method: 'POST', headers, body })
    fetchData()
  }

  return (
    <div>
      <div>
        <input
          value={newUrl}
          onChange={handleChange}
          className="block rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        />
        <button onClick={createNewLink}>Add</button>
      </div>
      <hr />
      <div>
        {urls.map((url, index) => (
          <Link key={url} url={url} />
        ))}
      </div>
    </div>
  )
}

const target = document.querySelector('#app')
ReactDOM.render(<App />, target)

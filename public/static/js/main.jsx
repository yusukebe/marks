const { useState, useEffect } = React

const App = () => {
  const [urls, setUrls] = useState([])

  const fetchData = async () => {
    const response = await fetch('/links')
    const data = await response.json()
    setUrls(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  const getParam = (name) => {
    const url = window.location.href
    name = name.replace(/[\[\]]/g, '\\$&')
    const regexp = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)')
    const results = regexp.exec(url)
    if (!results) return null
    if (!results[2]) return ''
    return decodeURIComponent(results[2].replace(/\+/g, ' '))
  }

  const initialUrl = getParam('url') || ''
  const [newUrl, setNewUrl] = useState(initialUrl)

  const handleChange = (e) => {
    setNewUrl(e.target.value)
  }

  const createNewLink = async () => {
    setNewUrl('')
    const body = JSON.stringify({ url: newUrl })
    const headers = {
      'Content-Type': 'application/json',
    }
    const response = await fetch('/links', { method: 'POST', headers, body })
    fetchData()
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    createNewLink()
  }

  return (
    <div>
      <div className="flex justify-center items-center">
        <form
          className="w-full flex flex-col p-6"
          onSubmit={handleSubmit.bind(this)}
        >
          <input
            value={newUrl}
            className="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
            type="text"
            placeholder="URL"
            onChange={handleChange}
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4">
            Add
          </button>
        </form>
      </div>
      <hr className="mt-2 mb-4" />
      <div className="items-center justify-center">
        {urls.map((url, index) => (
          <Link key={url} url={url} />
        ))}
      </div>
    </div>
  )
}

const target = document.querySelector('#app')
ReactDOM.render(<App />, target)

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
  const handleChange = (e) => {
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
      <div class="flex justify-center items-center">
        <form class="w-full flex flex-col p-6" action="">
          <input
            value={newUrl}
            onChange={handleChange}
            class="text-gray-700 shadow border rounded border-gray-300 focus:outline-none focus:shadow-outline py-1 px-3 mb-3"
            type="text"
            placeholder="URL"
          />
          <button
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold rounded py-2 px-4"
            onClick={createNewLink}
          >
            Add
          </button>
        </form>
      </div>
      <hr class="mt-2 mb-4" />
      <div class="items-center justify-center">
        {urls.map((url, index) => (
          <Link key={url} url={url} />
        ))}
      </div>
    </div>
  )
}

const target = document.querySelector('#app')
ReactDOM.render(<App />, target)

const Link = (props) => {
  const [meta, setMeta] = useState([])
  const link = props.link
  console.log(link)

  const fetchData = async (url) => {
    const queryParams = new URLSearchParams({ url: url })
    const response = await fetch('/ogp?' + queryParams)
    const meta = await response.json()
    setMeta(meta)
  }

  const truncateString = (str, length) => {
    if (!str) {
      return ''
    }
    return str.length > length ? str.substring(0, length - 3) + '...' : str
  }

  useEffect(() => {
    //fetchData(props.url)
  }, [])

  return (
    <div className="mb-4">
      <a href={link.url} target="_blank">
        <div className="p-2 bg-white flex items-center rounded-md shadow-md hover:scale-105 transition transform duration-500 cursor-pointer">
          <div className="">
            <img
              src={link.image}
              className="w-24 h-24 object-cover rounded-sm max-w-none"
            />
          </div>
          <div className=" px-2">
            <h1 className="text-sm font-bold text-gray-700 break-all">
              {link.title || link.url}
            </h1>
            <p className="text-gray-400 text-xs">
              {new URL(link.url).hostname}
            </p>
            <p className="text-gray-600 text-xs">
              {truncateString(link.description, 40)}
            </p>
          </div>
        </div>
      </a>
    </div>
  )
}

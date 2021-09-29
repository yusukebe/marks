const Link = props => {
  const [meta, setMeta] = useState([])

  const fetchData = async url => {
    const queryParams = new URLSearchParams({ url: url })
    const response = await fetch('/link?' + queryParams)
    const meta = await response.json()
    setMeta(meta)
  }

  useEffect(() => {
    fetchData(props.url)
  }, [])

  return (
    <div>
      <a href={props.url} target="_blank">
        {meta['og:title'] || props.url}
      </a>
    </div>
  )
}

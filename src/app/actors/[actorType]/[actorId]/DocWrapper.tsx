const DocWrapper = ({children, doc}) => {
  return (
    <div className="flex justify-between">
        <div className="flex-1">
            {children}
        </div>
        <div className="flex-1 border-l">
            <p>{doc}</p>
        </div>
    </div>
  )
}

export default DocWrapper
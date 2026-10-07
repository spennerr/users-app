interface SearchFieldProps {
  value: string
  onChange: (value: string) => void
  resultCount: number
  totalCount: number
}

export function SearchField({
  value,
  onChange,
  resultCount,
  totalCount,
}: SearchFieldProps) {
  return (
    <div className="search">
      <label className="search__label" htmlFor="user-search">
        Sök användare
      </label>
      <input
        id="user-search"
        className="search__input"
        type="search"
        value={value}
        placeholder="Sök på namn, användarnamn, stad eller roll"
        onChange={(event) => onChange(event.target.value)}
      />
      <p className="search__count">
        Visar {resultCount} av {totalCount} användare
      </p>
    </div>
  )
}
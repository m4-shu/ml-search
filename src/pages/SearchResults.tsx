import { useSearchParams } from 'react-router-dom';
import { useSearch } from '../api';
import '../styles/SearchResults.css';
import { NewTag, Tag } from '../styled';

function SearchResults() {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('search');
  if (!query) return <NoSearchResults />;
  return <SearchResultsWithQuery query={query} />;
}

function NoSearchResults() {
  return (
    <div className="search-results-container">
      <p>No hay resultados para tu búsqueda.</p>
    </div>
  );
}

function renderAsMoney(amount: number, currency = 'ARS') {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency,
  }).format(amount);
}

function SearchResultsWithQuery({ query }: { query: string }) {
  const { data, isLoading, isError } = useSearch(query);
  const results = data?.items || [];
  const categories = data?.categories || [];

  if (isError) return <p>Ocurrió un error al cargar los resultados.</p>;

  return (
    <div className="search-results-container">
      <h2>Resultados de la búsqueda: {query}</h2>
      <div className="categories">
        {categories.map((category) => (
          <Tag key={`cat-${category}`}>{category}</Tag>
        ))}
      </div>
      {isLoading && <span>Cargando...</span>}
      {!isLoading && results.length === 0 && <NoSearchResults />}
      {!isLoading && results.length > 0 && (
        <div className="result-list">
          {results.map((item) => (
            <a href={`/items/${item.id}`} key={item.id}>
              <img src={item.picture} alt={item.title} />
              <div>
                <div className="title">{item.title}</div>
                <div className="tags">
                  {item.free_shipping && <Tag color="#00AA00">Envío gratis</Tag>}
                  {item.condition === 'new' && <NewTag />}
                </div>
              </div>
              <div>{`${item.price.currency}` + renderAsMoney(item.price.amount, item.price.currency)}</div>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;

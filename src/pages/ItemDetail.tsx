import { useParams } from 'react-router-dom';
import { useItemDetail } from '../api';
import '../styles/ItemDetail.css';

function ItemDetail() {
  const { id } = useParams();
  const { data } = useItemDetail(id);
  const item = data?.item;

  if (!item) return <div>Cargando...</div>;

  return (
    <div className="item-detail-container">
      <h1 className="item-detail-title">{item.title}</h1>
      <img className="item-detail-image" src={item.picture} alt={item.title} />
      <p className="item-detail-description">{item.description}</p>
    </div>
  );
}

export default ItemDetail;

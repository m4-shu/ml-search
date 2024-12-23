interface Author {
  name: string;
  lastname: string;
}

interface Item {
  id: string;
  title: string;
  price: {
    currency: string;
    amount: number;
    decimals: number;
  };
  picture: string;
  condition: string;
  free_shipping: boolean;
  sold_quantity: number;
  description: string;
}
interface IItemDetailProps {
  author: Author;
  item: Item;
}

interface ISearchResponse {
  author: Author;
  categories: string[];
  items: Item[];
}

export type { Author, Item, IItemDetailProps, ISearchResponse };

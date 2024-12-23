import styled from 'styled-components';

interface TagProps {
  color?: string;
}

const Tag = styled.div<TagProps>`
  width: max-content;
  background-color: ${(props) => props.color || '#f1f1f1'}44;
  border: 1px solid ${(props) => props.color || '#f1f1f1'};
  border-radius: 9999999px;
  padding: 0.3em 1em;
  font-size: 0.5rem;
`;

function NewTag() {
  return <Tag color="#3483fa">Nuevo</Tag>;
}

export { Tag, NewTag };

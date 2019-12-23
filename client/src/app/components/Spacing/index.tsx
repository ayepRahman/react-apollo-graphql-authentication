import styled from 'styled-components';

interface ISpacing {
  margin?: string;
  padding?: string;
}

const Spacing = styled.div<ISpacing>`
  margin: ${p => p.margin && `${p.margin}`};
  padding: ${p => p.padding && `${p.padding}`};
`;

export default Spacing;

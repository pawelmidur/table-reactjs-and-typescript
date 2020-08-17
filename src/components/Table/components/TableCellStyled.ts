import styled, { css } from "styled-components";

type TableCellProps = {
  width: string | number;
  isFixed?: boolean;
  isOrder?: false | "desc" | "asc";
};

export const TableCellStyled = styled.td<TableCellProps>`
  cursor: ${({ isOrder }) => isOrder !== undefined ? 'pointer' : 'default'};
  width: ${({ width }) => (typeof width === "number" ? `${width}px` : width)};
  min-width: ${({ width }) =>
    typeof width === "number" ? `${width}px` : width};
  align-items: center;
  background: #fff;
  color: #222;
  padding: 16px;
  line-height: 1.5;
  font-size: 0.9rem;
  text-align: left;
  vertical-align: inherit;
  position: ${({ isFixed }) => (isFixed ? "sticky" : "static")};
  right: ${({ isFixed }) => (isFixed ? 0 : "initial")};
  box-shadow: ${({ isFixed }) =>
    isFixed ? "-3px 0px 15px 0px #f1f2f3" : "none"};

  ${({ isOrder }) =>
    isOrder !== undefined &&
    css`
      &::after {
        content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' height='20' fill='%23d6d9db' viewBox='0 0 20 20' width='20'><path d='M0 0h24v24H0z' fill='none'/><path d='M16 17.01V10h-2v7.01h-3L15 21l4-3.99h-3zM9 3L5 6.99h3V14h2V6.99h3L9 3z'/></svg>");
        display: inline-block;
        margin-left: 5px;
        transition: transform 0.2s ease-in-out;
        transform-origin: center;
      }
    `}
  

  ${({ isOrder }) =>
    isOrder &&
    isOrder === "asc" &&
    css`
      &::after {
        content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23d6d9db' width='18px' height='18px'><path d='M0 0h24v24H0z' fill='none'/><path d='M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z'/></svg>");
        transform: rotate(-90deg);
      }
    `}

  ${({ isOrder }) =>
    isOrder &&
    isOrder === "desc" &&
    css`
      &::after {
        content: url("data:image/svg+xml; utf8, <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='%23d6d9db' width='18px' height='18px'><path d='M0 0h24v24H0z' fill='none'/><path d='M21 11H6.83l3.58-3.59L9 6l-6 6 6 6 1.41-1.41L6.83 13H21z'/></svg>");
        transform: rotate(90deg);
      }
    `}
`;

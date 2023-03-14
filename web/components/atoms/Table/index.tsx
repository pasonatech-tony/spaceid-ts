import styled from "@emotion/styled";
import { CSSProperties } from "react";

type RowProps = {
  row1: React.ReactNode;
  row2: React.ReactNode;
};

type TableProps = {
  style?: CSSProperties;
  children?: React.ReactNode;
};

export const Row: React.FC<RowProps> = ({ row1, row2 }) => {
  return (
    <StyledTableRow>
      <StyledTableCell>{row1}</StyledTableCell>
      <StyledTableCellWithBorder>{row2}</StyledTableCellWithBorder>
    </StyledTableRow>
  );
};

const Table: React.FC<TableProps> = ({ style, children }) => {
  return (
    <StyledTable style={style}>
      <tbody>{children}</tbody>
    </StyledTable>
  );
};

const StyledTable = styled.table`
  border: 1px solid #595959;
  border-radius: 4px;
  border-collapse: collapse;
  font-size: 12px;
  font-family: "Hiragino Kaku Gothic Pro";
`;

const StyledTableRow = styled.tr`
  align-items: flex-start;
  color: #c7c5c5;
  height: 100%;
  border: 1px solid #595959;
`;

const StyledTableCell = styled.td`
  align-items: flex-start;
  box-sizing: border-box;
  color: #c7c5c5;
  height: 100%;
`;
const StyledTableCellWithBorder = styled(StyledTableCell)`
  border-left: 1px solid #595959;
  height: 100%;
`;

export default Table;

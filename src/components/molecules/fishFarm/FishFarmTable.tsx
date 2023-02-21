import * as React from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import { farms } from "../../../assets/data/modelData";
import Button from "@mui/material/Button";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import "./_index.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

function createData(
  name: string,
  calories: number,
  fat: number,
  carbs: number,
  protein: number
) {
  return { name, calories, fat, carbs, protein };
}

const rows = farms;

export default function FishFarmTable() {
  return (
    <TableContainer className="farm-table" component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell width="10%">ID</StyledTableCell>
            <StyledTableCell align="right">Image</StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Latitude</StyledTableCell>
            <StyledTableCell align="right">Longitude</StyledTableCell>
            <StyledTableCell align="right">Barge</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <StyledTableRow key={row.Id}>
              <StyledTableCell component="th" scope="row">
                {row.Id}
              </StyledTableCell>
              <StyledTableCell align="right">
                {<Avatar alt={row.Name} src={row.Image} />}
              </StyledTableCell>
              <StyledTableCell align="right">{row.Name}</StyledTableCell>

              <StyledTableCell align="right">{row.Latitude}</StyledTableCell>
              <StyledTableCell align="right">{row.Longitude}</StyledTableCell>
              <StyledTableCell align="right">
                {row.HasBarge ? <CheckIcon /> : <ClearIcon />}
              </StyledTableCell>

              <StyledTableCell align="right">
                {
                  <Button
                    variant="outlined"
                    color="secondary"
                    startIcon={<ModeEditOutlineIcon />}
                  >
                    Edit
                  </Button>
                }
              </StyledTableCell>
              <StyledTableCell align="right">
                {
                  <Button
                    variant="contained"
                    color="warning"
                    startIcon={<DeleteSweepIcon />}
                  >
                    Delete
                  </Button>
                }
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

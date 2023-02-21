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
import { useNavigate } from "react-router-dom";

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

const rows = farms;

export default function FishFarmTable() {
  const navigate = useNavigate();
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
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="right">
                {<Avatar alt={row.name} src={row.image} />}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>

              <StyledTableCell align="right">{row.latitude}</StyledTableCell>
              <StyledTableCell align="right">{row.longitude}</StyledTableCell>
              <StyledTableCell align="right">
                {row.hasBarge ? <CheckIcon /> : <ClearIcon />}
              </StyledTableCell>

              <StyledTableCell align="right">
                {
                  <Button
                    onClick={() => {
                      navigate("editFarm", {
                        state: {
                          name: row.name,
                          latitude: row.latitude,
                          longitude: row.longitude,
                          hasBarge: row.hasBarge ? "on" : "off",
                        },
                      });
                    }}
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

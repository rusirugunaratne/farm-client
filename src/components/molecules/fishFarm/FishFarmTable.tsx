import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, { tableCellClasses } from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import ModeEditOutlineIcon from "@mui/icons-material/ModeEditOutline";
import DeleteSweepIcon from "@mui/icons-material/DeleteSweep";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import "./_index.css";
import { useNavigate, useLocation } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import DeleteFarmPopup from "../popup/DeleteFarmPopup";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import { useQuery } from "@tanstack/react-query";
import useStore from "../../../hooks/UseStore";

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

export default function FishFarmTable() {
  const { farms, farmsLoading, farmsRefetch, deleteFarm, isFarmNotEmpty } =
    useStore();

  const location = useLocation();

  useEffect(() => {
    farmsRefetch();
  }, [location.key]);

  const [openPopup, setOpenPopup] = useState(false);
  const [currentId, setCurrentId] = useState(1);

  const navigate = useNavigate();

  return (
    <TableContainer className="farm-table" component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Latitude</StyledTableCell>
            <StyledTableCell align="right">Longitude</StyledTableCell>
            <StyledTableCell align="right">Barge</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {farmsLoading && (
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                justifyContent: "center",
                alignContent: "center",
                textAlign: "center",
                margin: 10,
                gap: 5,
              }}
            >
              <CircularProgress />
              <p>Loading...</p>
            </Box>
          )}
          {farms?.map((row: any) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center">
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
                          id: row.id,
                          name: row.name,
                          image: row.image,
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
                    disabled={isFarmNotEmpty(row.id)}
                    onClick={() => {
                      console.log(isFarmNotEmpty(row.id));
                      setOpenPopup(true);
                      setCurrentId(row.id);
                    }}
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
      {openPopup && (
        <DeleteFarmPopup
          open={openPopup}
          onDelete={() => deleteFarm(currentId)}
          id={currentId}
          setOpen={() => setOpenPopup(false)}
        />
      )}
    </TableContainer>
  );
}

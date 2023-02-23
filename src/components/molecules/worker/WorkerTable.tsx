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
import "./_index.css";
import { useLocation, useNavigate } from "react-router-dom";
import { createAPIEndpoint, ENDPOINTS } from "../../../api";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";
import DeleteFarmPopup from "../popup/DeleteFarmPopup";
import { useQuery } from "@tanstack/react-query";

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

export default function WorkerTable() {
  const [openPopup, setOpenPopup] = useState(false);
  const [currentId, setCurrentId] = useState(1);

  const navigate = useNavigate();

  const {
    data: rows,
    isLoading,
    refetch,
  } = useQuery(["worker"], () => {
    return createAPIEndpoint(ENDPOINTS.worker)
      .fetch()
      .then((res) => {
        return res.data;
      })
      .catch((err) => {
        console.log(err);
      });
  });

  const location = useLocation();

  useEffect(() => {
    refetch();
  }, [location.key]);

  const handleDelete = (id: number) => {
    createAPIEndpoint(ENDPOINTS.worker)
      .delete(id)
      .then((res) => refetch())
      .catch((err) => console.log(err));
  };

  return (
    <TableContainer className="farm-table" component={Paper}>
      <Table sx={{ minWidth: 600 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell align="right"></StyledTableCell>
            <StyledTableCell align="right">Name</StyledTableCell>
            <StyledTableCell align="right">Age</StyledTableCell>
            <StyledTableCell align="right">Email</StyledTableCell>
            <StyledTableCell align="right">Farm</StyledTableCell>
            <StyledTableCell align="right">Position</StyledTableCell>
            <StyledTableCell align="right">Certified Until</StyledTableCell>
            <StyledTableCell align="right">Edit</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {isLoading && (
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
          {rows?.map((row: any) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell align="center">
                {<Avatar alt={row.name} src={row.image} />}
              </StyledTableCell>
              <StyledTableCell align="right">{row.name}</StyledTableCell>

              <StyledTableCell align="right">{row.age}</StyledTableCell>
              <StyledTableCell align="right">{row.email}</StyledTableCell>

              <StyledTableCell align="right">{row.farm}</StyledTableCell>
              <StyledTableCell align="right">{row.position}</StyledTableCell>
              <StyledTableCell align="right">
                {row.certifiedUntil}
              </StyledTableCell>

              <StyledTableCell align="right">
                {
                  <Button
                    onClick={() => {
                      navigate("editWorker", {
                        state: {
                          id: row.id,
                          name: row.name,
                          age: row.age,
                          email: row.email,
                          farm: row.farm,
                          position: row.position,
                          certifiedUntil: row.certifiedUntil,
                          image: row.image,
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
                    onClick={() => {
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
          onDelete={() => handleDelete(currentId)}
          id={currentId}
          setOpen={() => setOpenPopup(false)}
        />
      )}
    </TableContainer>
  );
}

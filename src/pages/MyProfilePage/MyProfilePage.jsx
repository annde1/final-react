import {
  Typography,
  Avatar,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { normalizeDataProfilePage } from "./myProfileNormalization";
import styles from "./styles.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import { deleteProfileToast } from "../../service/toastifyService";
import { authActions } from "../../store/authSlice";
import { clearToken } from "../../service/storageService";
import { clear } from "@testing-library/user-event/dist/clear";
const MyProfilePage = () => {
  const [profileData, setProfileData] = useState({});
  const userData = useSelector((store) => store.authSlice.userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    const getUserData = async () => {
      try {
        if (userData) {
          const { data } = await axios.get("/users/" + userData._id);
          const normalize = normalizeDataProfilePage(data);
          setProfileData(normalize);
        }
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [userData]);
  const handleEditProfile = () => {
    navigate(ROUTES.EDITPROFILE);
  };
  const handleDeleteProfile = async () => {
    try {
      const { data } = await axios.delete("/users/" + userData._id);
      console.log("USER DELETED", data);
      deleteProfileToast();
      clearToken();
      dispatch(authActions.logout());
      navigate(ROUTES.HOME);
    } catch (err) {
      console.log("ERROR FROM DELETE USER", err);
    }
  };
  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          marginTop: "3rem",
          marginBottom: "3rem",
        }}
      >
        <Typography variant="h5" sx={{ marginBottom: "1rem" }}>
          Hello {profileData.first} {profileData.last}
        </Typography>
        <Avatar
          alt={profileData.alt}
          src={profileData.url ? profileData.url : ""}
          style={{ height: "6rem", width: "6rem", marginBottom: "1rem" }}
        />
        <Box sx={{ marginBottom: "3rem" }}>
          <IconButton
            onClick={() => {
              handleEditProfile();
            }}
          >
            <EditIcon />
          </IconButton>
          <IconButton onClick={handleDeleteProfile}>
            <DeleteIcon></DeleteIcon>
          </IconButton>
        </Box>
        <TableContainer
          component={Paper}
          sx={{ marginBottom: "3rem", width: "80%" }}
        >
          <Table>
            <TableBody>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Email:</TableCell>
                <TableCell>{profileData.email}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Phone:</TableCell>
                <TableCell>{profileData.phone}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>Address:</TableCell>
                <TableCell>
                  {profileData.street} {profileData.houseNumber},{" "}
                  {profileData.city}, {profileData.country}
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell sx={{ fontWeight: "bold" }}>User Status:</TableCell>
                <TableCell>
                  {profileData.isBusiness ? "Business" : "Regular"}
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default MyProfilePage;
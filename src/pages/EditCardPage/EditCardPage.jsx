import { useEffect, useState } from "react";
import {
  Container,
  TextField,
  Grid,
  Typography,
  Divider,
  Button,
  Paper,
} from "@mui/material";
import { Link, useParams } from "react-router-dom";
import ROUTES from "../../routes/ROUTES";
import axios from "axios";

const EditCardPage = () => {
  const [inputsValue, setInputValue] = useState({
    title: "",
    subtitle: "",
    phone: "",
    add: "",
    mail: "",
    description: "",
    web: "",
    url: "",
    alt: "",
    state: "",
    country: "",
    city: "",
    street: "",
    houseNumber: "",
    zip: "",
  });
  const [fetchedCardData, setFetchedCardData] = useState(null);
  const { id: _id } = useParams();
  console.log(_id);
  useEffect(() => {
    const getCardById = async () => {
      try {
        const { data } = await axios.get("/cards/" + _id);
        console.log(data);
        setFetchedCardData(data);
      } catch (err) {
        console.log(err);
      }
    };
    getCardById();
  }, [_id]);
  const handleInputChange = (e) => {
    setInputValue((currentState) => ({
      ...currentState,
      [e.target.id]: e.target.value,
    }));
  };
  const handleUpdateChangesClick = async () => {
    try {
      const { data } = await axios.put("/cards/" + _id, {
        title: inputsValue.title,
        subtitle: inputsValue.subtitle,
        description: inputsValue.description,
        phone: inputsValue.phone,
        email: inputsValue.mail,
        web: inputsValue.web,
        image: {
          url: inputsValue.url,
          alt: inputsValue.alt,
        },
        address: {
          state: inputsValue.state,
          country: inputsValue.country,
          city: inputsValue.city,
          street: inputsValue.street,
          houseNumber: inputsValue.houseNumber,
          zip: +inputsValue.zip,
        },
      });
      console.log("data from response", data);
    } catch (err) {
      console.log("err", err.response);
    }
  };
  const getPlaceholderValue = (fieldName) => {
    const value =
      fetchedCardData && fetchedCardData[fieldName]
        ? fetchedCardData[fieldName]
        : "";
    return value;
  };
  return (
    <Container sx={{ padding: "50px" }}>
      <Typography variant="h2" sx={{ mb: 1, padding: "10px", pb: "0px" }}>
        Card - Edit
      </Typography>
      <Typography variant="body1" sx={{ mb: 1, padding: "3px", ml: "7px" }}>
        Put a new values in the correct input
      </Typography>
      <Divider sx={{ mb: 3 }} />
      <Grid container flexDirection={"column"}>
        <TextField
          id="title"
          label="Title"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.title}
          placeholder={getPlaceholderValue("title")}
          required
        />
        <TextField
          id="subtitle"
          label="SubTitle"
          variant="outlined"
          def
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.subtitle}
          placeholder={getPlaceholderValue("subtitle")}
          required
        />
        <TextField
          id="phone"
          label="Phone Number"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.phone}
          placeholder={getPlaceholderValue("phone")}
          required
        />
        <TextField
          id="description"
          label="Description"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.description}
          placeholder={getPlaceholderValue("description")}
          required
        />
        <TextField
          id="web"
          label="Web"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.web}
          placeholder={getPlaceholderValue("web")}
        />
        <TextField
          id="mail"
          label="Email"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.mail}
          placeholder={getPlaceholderValue("email")}
          required
        />

        <TextField
          id="url"
          label="Url"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.url}
          placeholder={getPlaceholderValue("url")}
        />
        <TextField
          id="alt"
          label="Alt"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.alt}
          placeholder={getPlaceholderValue("alt")}
        />

        <TextField
          id="state"
          label="State"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.state}
          placeholder={getPlaceholderValue("state")}
        />
        <TextField
          id="country"
          label="Country"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.country}
          placeholder={getPlaceholderValue("country")}
          required
        />
        <TextField
          id="city"
          label="City"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.city}
          placeholder={getPlaceholderValue("city")}
          required
        />
        <TextField
          id="street"
          label="Street"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.street}
          placeholder={getPlaceholderValue("street")}
          required
        />
        <TextField
          id="houseNumber"
          label="House Number"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          value={inputsValue.houseNumber}
          placeholder={getPlaceholderValue("houseNumber")}
          required
        />
        <TextField
          id="zip"
          label="Zip"
          variant="outlined"
          sx={{ mt: "10px" }}
          onChange={handleInputChange}
          placeholder={getPlaceholderValue("zip")}
          value={inputsValue.zip}
        />
      </Grid>
      <Grid container spacing={2}>
        <Grid item lg={8} md={8} sm={8} xs>
          <Button
            variant="outlined"
            sx={{ mt: 2, width: "100%", ml: "0%", bgcolor: "lightskyblue" }}
            onClick={handleUpdateChangesClick}
          >
            Update Changes
          </Button>
        </Grid>
        <Grid item xs>
          <Link to={ROUTES.HOME}>
            <Button
              variant="outlined"
              sx={{
                mt: 2,
                width: "100%",
                ml: "0%",
                bgcolor: "navy",
                color: "gray",
              }}
            >
              Discard Changes
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  );
};
export default EditCardPage;

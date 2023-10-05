import { useState } from "react";
import Head from "next/head";
import { Layout as DashboardLayout } from "src/layouts/dashboard/layout";
import axios from "axios";
import {
  Button,
  Box,
  Stack,
  Typography,
  TextField,
  Container,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import moment from "moment";

const Page = () => {
  const [IsFormData, setIsFormData] = useState({
    keyItem: "",
    valueVn: "",
    valueEn: "",
    valueJp: "",
  });

  const [message, setMessage] = useState('')


  // const handleInputChange = (e) => {
  //   setIsFormData({
  //     ...IsFormData,
  //     [e.target.name]: e.target.value,
  //   });
  // };

  var date = moment().utcOffset("+07:00").format("YYYY-MM-DDThh:mm:ss");

  console.log(IsFormData);

  const handleSubmit = (event) => {
    event.preventDefault();
    InsertData();

    setIsFormData({
      keyItem: "",
      valueVn: "",
      valueEn: "",
      valueJp: "",
    });
  };

  const InsertData = () => {
    const form = new FormData();

    form.append("languageId", 2);
    form.append("keyItem", IsFormData.keyItem);
    form.append("valueVn", IsFormData.valueVn);
    form.append("valueEn", IsFormData.valueEn);
    form.append("valueJp", IsFormData.valueJp);
    form.append("valueFr", "1");
    form.append("valueKr", "1");
    form.append("languageDefault", "1");
    form.append("field1", "1");
    form.append("field2", "1");
    form.append("field3", "1");
    form.append("field4", "1");
    form.append("field5", "1");
    form.append("createdAt", date);
    form.append("createdBy", 1);
    form.append("createdByHidden", "1");
    form.append("lastModifedAt", "2003-10-04T04:12:43");
    form.append("lastModifedBy", 1);
    form.append("lastModifedByHidden", "1");
    form.append("flag", "s");

    let config = {
      headers: {
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    };

    // Gọi API POST để chèn sinh viên mới
    axios
      .post("http://ticket.itomo.vn/api/v1/ItemLanguage/insert", form)
      .then((response) => {
        console.log("Du lieu đã được thêm:", response.data);
        setMessage('Thêm dữ liệu thành công')
      })
      .catch((error) => {
        setMessage('Thêm dữ liệu thất bại')
        console.error("Lỗi khi thêm du lieu:", error);
      });
  };

  return (
    <>
      <Head>Language</Head>

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          py: 8,
        }}
      >
        <Container>
          <Stack alignItems={"center"}>
            <Typography variant="h4" spacing={4} marginBottom={3}>
              Add Language Keywords
            </Typography>
          </Stack>

          {/* <form onSubmit={handleSubmit}> */}
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              maxWidth: "700px",
              margin: "0 auto",
            }}
          >
            <Stack spacing={1} width={"100%"} marginBottom={"50px"}>
              <Typography>Key :</Typography>
              <TextField
                fullWidth
                label="Tu khoa"
                value={IsFormData.keyItem}
                type="text"
                sx={{
                  marginBottom: "20px",
                }}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setIsFormData({
                    ...IsFormData,
                    keyItem: newValue,
                  });
                }}
              />
            </Stack>

            <Stack spacing={3} width={"100%"} marginBottom={"20px"}>
              <TextField
                fullWidth
                type="text"
                label="Tieng Viet"
                value={IsFormData.valueVn}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setIsFormData({
                    ...IsFormData,
                    valueVn: newValue,
                  });
                }}
              />
              <TextField
                fullWidth
                type="text"
                label="Tieng Anh"
                value={IsFormData.valueEn}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setIsFormData({
                    ...IsFormData,
                    valueEn: newValue,
                  });
                }}
              />
              <TextField
                fullWidth
                type="text"
                label="Tieng Nhat"
                value={IsFormData.valueJp}
                onChange={(e) => {
                  const newValue = e.target.value;
                  setIsFormData({
                    ...IsFormData,
                    valueJp: newValue,
                  });
                }}
              />
            </Stack>

            <Stack>
              <Button color="success" variant="contained" onClick={handleSubmit}>
                Save
              </Button>
            </Stack>

            <Typography
              align="center"
              marginTop={"10px"}
              color={message == 'Thêm dữ liệu thành công' ? 'green' : 'red'}
            >
                {message}
            </Typography>
          </Box>
          {/* </form> */}
        </Container>
      </Box>
    </>
  );
};

Page.getLayout = (page) => <DashboardLayout>{page}</DashboardLayout>;

export default Page;

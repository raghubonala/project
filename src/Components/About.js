import React, { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function About() {
  const [open, setOpen] = useState(false);
  const [data, setData] = useState([]);
  const [formVisible, setFormVisible] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    address: "",
    pinCode: "",
    mobile: "",
  });
  const [isEditing, setIsEditing] = useState(false); // New state for edit mode
  const [editId, setEditId] = useState(null); // ID of the item being edited

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://667c337c3c30891b865bba8d.mockapi.io/api/bone/add"
      );
      setData(response.data);
      if (response.data.length === 0) {
        setFormVisible(true);
      } else {
        setFormVisible(false);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleOpen = () => {
    setOpen(true);
    if (data.length === 0) {
      setFormVisible(true);
    } else {
      setFormVisible(false);
    }
  };

  const handleOnChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const closebtn = () => {
    setOpen(false);
    setFormVisible(false);
    setIsEditing(false);
    setEditId(null); // Reset edit state
  };

  const addbtn = async () => {
    if (!formData.name || !formData.address || !formData.pinCode || !formData.mobile) {
      alert("Please fill in all fields");
      return;
    }

    try {
      if (isEditing) {
        // Update existing address
        await axios.put(
          `https://667c337c3c30891b865bba8d.mockapi.io/api/bone/add/${editId}`,
          formData
        );
        setIsEditing(false); // Reset edit mode
        setEditId(null); // Clear edit ID
      } else {
        // Add new address
        await axios.post(
          "https://667c337c3c30891b865bba8d.mockapi.io/api/bone/add",
          formData
        );
      }

      getData(); // Refresh data
      setFormData({
        name: "",
        address: "",
        pinCode: "",
        mobile: "",
      });
      setFormVisible(false);
    } catch (error) {
      console.log("Error adding/updating data:", error);
    }
  };

  const openAddAddressForm = () => {
    setFormData({
      name: "",
      address: "",
      pinCode: "",
      mobile: "",
    });
    setFormVisible(true);
  };

  const editData = (doc) => {
    setFormData({
      name: doc.name,
      address: doc.address,
      pinCode: doc.pinCode,
      mobile: doc.mobile,
    });
    setIsEditing(true);
    setEditId(doc.id);
    setFormVisible(true); // Show the form for editing
  };

  const deleteData = async (id) => {
    const confirmation = window.confirm("Are you sure you want to delete this address?");
    if (confirmation) {
      try {
        await axios.delete(`https://667c337c3c30891b865bba8d.mockapi.io/api/bone/add/${id}`);
        setData(data.filter((item) => item.id !== id)); // Update state after deletion
      } catch (error) {
        console.error("Error deleting data:", error);
      }
    }
  };

  return (
    <div>
      <Button onClick={handleOpen}>Show Addresses</Button>
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="div">
            <CloseIcon onClick={closebtn} style={{ cursor: "pointer" }} />
            <Box component="div">
              {!formVisible && data.length > 0 && (
                <>
                  {data.map((d) => (
                    <div key={d.id}>
                      <span><strong>Name:</strong> {d.name}</span>
                      <p><strong>Address:</strong> {d.address}</p>
                      <p><strong>Pin Code:</strong> {d.pinCode}</p>
                      <p><strong>Mobile:</strong> {d.mobile}</p>
                      <Button onClick={() => editData(d)} variant="outlined" style={{ margin: "5px" }}>Edit</Button>
                      <Button onClick={() => deleteData(d.id)} style={{ margin: "5px" }}>Delete</Button>
                      <hr />
                    </div>
                  ))}
                  <Button onClick={openAddAddressForm} variant="contained" color="primary">
                    Add More Address
                  </Button>
                  <Button variant="contained" color="secondary" onClick={() => setOpen(false)}>Continue</Button>
                </>
              )}
              {formVisible && (
                <Box component="form" sx={{ mt: 2 }}>
                  <input
                    value={formData.name}
                    name="name"
                    onChange={handleOnChange}
                    type="text"
                    placeholder="Name"
                    style={{ margin: "5px", padding: "5px" }}
                  />
                  <input
                    value={formData.address}
                    name="address"
                    onChange={handleOnChange}
                    type="text"
                    placeholder="Address"
                    style={{ margin: "5px", padding: "5px" }}
                  />
                  <input
                    value={formData.pinCode}
                    name="pinCode"
                    onChange={handleOnChange}
                    type="text"
                    placeholder="Pin Code"
                    style={{ margin: "5px", padding: "5px" }}
                  />
                  <input
                    value={formData.mobile}
                    name="mobile"
                    onChange={handleOnChange}
                    type="text"
                    placeholder="Mobile Number"
                    style={{ margin: "5px", padding: "5px" }}
                  />
                  <Button onClick={addbtn} variant="contained" color="primary" style={{ marginTop: "10px" }}>
                    {isEditing ? "Update" : "Add"}
                  </Button>
                </Box>
              )}
              {!formVisible && data.length === 0 && (
                <p>No data available</p>
              )}
            </Box>
          </Typography>
        </Box>
      </Modal>
    </div>
  );
}

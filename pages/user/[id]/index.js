import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import styled from "styled-components";
import Link from "next/link";
import DeleteNotificationModal from "../../../components/DeleteNotificationModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

const Button = styled.button`
  border-radius: 12px;
  background-color: lightskyblue;
  color: black;
  padding: 12px;
  font-size: 16px;
  outline: none;
  cursor: pointer;
  border: none;
  margin: 4px;
  transition: transform 0.2s ease;
  &:hover {
    background-color: #e38b06;
    transform: translateY(-0.5rem) scale(1.02);
    color: #000;
  }
`;
export const getStaticPaths = async () => {
  const res = await fetch("http://localhost:5035/users?size=40&page=0");
  const data = await res.json();

  const paths = data.tutorials.map((item) => {
    return {
      params: {
        id: item._id.toString(),
      },
    };
  });
  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async (context) => {
  const id = context.params.id;
  const res = await fetch("http://localhost:5035/users/" + id);
  const data = await res.json();
  return {
    props: {
      item: data,
    },
  };
};

function Form({ item }) {
  const [showModal, setShowModal] = useState(false);
  const [itemId, setItemId] = useState("false");
  const [name, setName] = useState(item.name);
  const [email, setEmail] = useState(item.email);
  const [sex, setSex] = useState("");
  const [phoneNumber, setPhoneNumber] = useState(item.phoneNumber);
  const [birthday, setBirthday] = useState();
  const [role, setRole] = useState(item.role);
  const [avatar, setAvatar] = useState(item.avatar);
  const [detailTable, setDetailTable] = useState([]);

  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "name") {
      setName(value);
    } else if (name == "email") {
      setEmail(value);
    } else if (name == "role") {
      setRole(value);
    } else if (name == "avatar") {
      setAvatar(value);
    } else if (name == "birthday") {
      setBirthday(value);
    } else if (name == "phoneNumber") {
      setPhoneNumber(value);
    } else if (name == "sex") {
      setSex(value);
    }
  };
//   useEffect(() =>{
//     var date = new Date(item.createDate)
    
//     var dd = date.getDate();
//     var mm = date.getMonth()+1; //January is 0!
//     var yyyy = date.getFullYear();
// console.log(date)
//   })
  const handleSubmit = async () => {
    const res = await axios.put("http://localhost:5035/users/" + item._id, {
      name: name,
      email: email,
      role: role,
      avatar: avatar,
    });
    console.log(res);
  };
  const handleDetail = async () => {
    if (item.role === "Shipper") {
      const res = await axios.get(
        "http://localhost:5035/users/" + item._id + "/shipper/bills"
      );
      setDetailTable(res.data);
      console.log(res);
    } else {
      const res = await axios.get(
        "http://localhost:5035/users/" + item._id + "/customer/bills"
      );
      setDetailTable(res.data);
      console.log(res);
    }
  };
  const handlResetPass = () => {
    axios.put("http://localhost:5035/users/" + item._id, {
      password: "abcd1234",
    });
    swal("Th??ng B??o!", "Reset m???t kh???u th??nh c??ng", "success");
  };
  return (
    <div className="container-md">
      <DeleteNotificationModal
        onClose={() => setShowModal(false)}
        show={showModal}
        id={itemId}
        prefix="bill"
      >
        Hello from the modal!
      </DeleteNotificationModal>
      <h2>Th??ng tin t??i kho???n</h2>
      <form method="POST" onSubmit={handleSubmit} action="/user">
        <div className="form-group mb-2">
          <label htmlFor="name">T??n ng?????i d??ng</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nh???p t??n ng?????i d??ng"
            required
            name="name"
            value={name}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="email">Email c?? nh??n</label>
          <input
            type="email"
            className="form-control"
            id="email"
            placeholder="Nh???p email"
            required
            name="email"
            aria-describedby="emailHelp"
            value={email}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="sex">Gi???i t??nh</label>
          <select
            className="form-control"
            id="sex"
            required
            name="sex"
            value={sex}
            onChange={handleChange()}
          >
            <option>Nam</option>
            <option>N???</option>
          </select>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="birthday">Ng??y sinh</label>
          <input
            type="date"
            className="form-control"
            id="birthday"
            required
            name="birthday"
            value={birthday}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="phoneNumber">S??? ??i???n tho???i</label>
          <input
            type="text"
            className="form-control"
            id="phoneNumber"
            placeholder="Nh???p s??? ??i???n tho???i li??n l???c"
            required
            name="phoneNumber"
            value={phoneNumber}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group">
          <label htmlFor="role">Vai tr??</label>
          <select
            className="form-control"
            id="role"
            required
            name="role"
            value={role}
            onChange={handleChange()}
          >
            <option>Manager</option>
            <option>Shipper</option>
            <option>Customer</option>
          </select>
        </div>
        {/* <div className="form-group mb-2">
          <label htmlFor="avatar">???nh ?????i di???n</label>
          <input
            type="text"
            className="form-control"
            id="avatar"
            placeholder="Nh???p t??n ng?????i d??ng"
            required
            name="avatar"
            value={avatar}
            onChange={handleChange()}
          />
        </div> */}
        <hr />
        <button type="submit" className="btn btn-primary">
          C???p nh???t t??i kho???n
        </button>
      </form>

      <hr />
      <Button onClick={handlResetPass}>Kh???i t???o l???i m???t kh???u</Button>
      {role === "Customer" && (
        <div>
          <Button onClick={handleDetail}>L???ch s??? mua h??ng</Button>
          <div className="table-responsive">
            <table className="table table-striped">
              <thead>
                <tr>
                  <th>Ng??y h??a ????n</th>
                  <th>Tr??? gi??</th>
                  <th>Tr???ng th??i</th>
                  <th>Thao t??c</th>
                </tr>
              </thead>
              <tbody>
                {detailTable.length > 0 ? (
                  detailTable.map((item,index) => (
                    <tr key={index}>
                      <td>{item.BillDate}</td>
                      <td>{item.TotalPrice}</td>
                      <td>{item.Status}</td>
                      <td>
                        <a
                          onClick={() => {
                            setShowModal(true), setItemId(item._id);
                          }}
                        >
                          <Button>
                            {" "}
                            <FontAwesomeIcon icon={faTrash} />{" "}
                          </Button>
                        </a>
                        <Link href={"/bill/" + item._id}>
                          <Button> Chi ti???t </Button>
                        </Link>
                      </td>
                    </tr>
                  ))
                ) : 
                  <h4>Kh??ng c?? l???ch s??? giao d???ch</h4>
                }
              </tbody>
            </table>
          </div>
        </div>
      )}
      {role === "Shipper" && (
        <>
        <Button onClick={handleDetail}>L???ch s??? giao h??ng</Button>
        <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Ng??y h??a ????n</th>
              <th>Tr??? gi??</th>
              <th>Tr???ng th??i</th>
              <th>Thao t??c</th>
            </tr>
          </thead>
          <tbody>
            {detailTable.length > 0 ? (
              detailTable.map((item,index) => (
                <tr key={index}>
                  <td>{item.BillDate}</td>
                  <td>{item.TotalPrice}</td>
                  <td>{item.Status}</td>
                  <td>
                    <a
                      onClick={() => {
                        setShowModal(true), setItemId(item._id);
                      }}
                    >
                      <Button>
                        {" "}
                        <FontAwesomeIcon icon={faTrash} />{" "}
                      </Button>
                    </a>
                    <Link href={"/bill/" + item._id}>
                      <Button> Chi ti???t </Button>
                    </Link>
                  </td>
                </tr>
              ))
            ) : 
              <h4>Kh??ng c?? l???ch s??? giao d???ch</h4>
            }
          </tbody>
        </table>
      </div>

    </>
      )}
    </div>
  );
}
export default Form;

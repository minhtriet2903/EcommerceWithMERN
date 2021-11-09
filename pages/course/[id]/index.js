import React, { useEffect, useState, useRef } from "react";
import { useRouter } from "next/router";
import axios from "axios";
import { faHome, faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import styled from "styled-components";

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
  const res = await fetch("http://localhost:5035/coursesAll");
  const data = await res.json();

  const paths = data.map((item) => {
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
  const res = await fetch("http://localhost:5035/courses/" + id);
  const data = await res.json();
  return {
    props: {
      item: data,
    },
  };
};

function Form({ item }) {
  const editorRef = useRef();
  const [formStatus, setFormStatus] = useState(false);
  const [name, setName] = useState(item.Name);
  const [description, setDescription] = useState(item.Description);
  const [sex, setSex] = useState(item.Sex);
  const [dateIn, setDateIn] = useState(item.DateIn);
  const [age, setAge] = useState(item.age);
  const [price, setPrice] = useState(item.Price);
  const [enteringQuantity, setEnteringQuantity] = useState(
    item.enteringQuantity
  );
  const [editorLoaded, setEditorLoaded] = useState(false);
  const [colors, setColors] = useState([
    "yello",
    "blue",
    "red",
    "pink",
    "purple",
    "green",
    "grey",
  ]);
  const [selectedColors, setSelectedColors] = useState(item.colors);
  const [sizes, setSizes] = useState(["XS", "S", "M", "L", "XL", "XXL"]);
  const [selectedSizes, setSelectedSizes] = useState(item.size);
  const [materials, setMaterials] = useState(["Cotton", "Thun", "Nilon"]);
  const [shirtTypes, setShirtTypes] = useState([
    "Áo sơ mi",
    "Áo thun",
    "Áo khoác",
    "Áo len",
    "Suit",
  ]);
  const [shortsTypes, setShortsTypes] = useState([
    "Quần jean",
    "Quần kaki",
    "Quần thể thao",
    "Đầm",
  ]);
  const [selectedMaterials, setSelectedMaterials] = useState(item.materials);

  const [soldQuantity, setSoldQuantity] = useState(item.soldQuantity);
  const [selectedImage, setSelectedImage] = useState(item.Image);
  const [isSucceed, setIsSucceed] = useState("");
  const [imageUrl, setImageUrl] = useState(item.Image);
  const [tag, setTag] = useState("");
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [data, setData] = useState(item.Description);
  useEffect(() => {
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);
  const handleChange = () => (e) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name == "name") {
      setName(value);
    } else if (name == "description") {
      setDescription(value);
    } else if (name == "imageUrl") {
      setImageUrl(value);
    } else if (name == "tag") {
      setTag(value);
    } else if (name == "sex") {
      setSex(value);
    } else if (name == "price") {
      let tmp = parseInt(value);
      setPrice(tmp);
    } else if (name == "enteringQuantity") {
      let tmp = parseInt(value);
      setEnteringQuantity(tmp);
    } else if (name == "age") {
      setAge(value);
    }
  };

  const handleSubmit = async () => {
    axios
      .put(
        "http://localhost:5035/courses/" + item._id,
        {
          Name: name,
          Description: description,
          Price: price,
          enteringQuantity,
          Sex: sex,
          enteringQuantity,
          age: age,
          colors: selectedColors,
          size: selectedSizes,
          materials,
          tag,
          Image: imageUrl,
        },
        {
          headers: { "Content-Type": "application/json" },
        }
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  const handleSelectColor = (color) => () => {
    setSelectedColors(color);
  };
  const handleSelectMaterial = (material) => () => {
    setSelectedMaterials(material);
  };
  const handleSelectSize = (size) => () => {
    setSelectedSizes(size);
  };
  const handleSelectType = (type) => () => {
    setSelectType(type);
  };
  return (
    <div className="container-md">
      <Link href={"/course"}>
        <Button>
          {" "}
          <FontAwesomeIcon icon={faHome} />{" "}
        </Button>
      </Link>
      <h2>Chi tiết sản phẩm</h2>
      <form method="PUT" onSubmit={handleSubmit}>
        <p style={{ margin: "8px 0", fontSize: "16px" }}>Ảnh sản phẩm</p>
        <img src={imageUrl} width="200px" height="200px" />
        <div className="form-group mb-2">
          <label htmlFor="imageUrl">Đường dẫn ảnh trên cloud</label>
          <input
            type="text"
            className="form-control"
            id="imageUrl"
            placeholder="Nhập đường dẫn của ảnh"
            required
            name="imageUrl"
            value={imageUrl}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="tag">Mã lô hàng</label>
          <input
            type="text"
            className="form-control"
            id="tag"
            placeholder="Nhập mã lô hàng"
            required
            name="tag"
            value={tag}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="name">Tên sản phẩm</label>
          <input
            type="text"
            className="form-control"
            id="name"
            placeholder="Nhập tên sản phẩm"
            required
            name="name"
            value={name}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="description">Mô tả</label>
          {editorLoaded ? (
            <CKEditor
              className="form-control"
              editor={ClassicEditor}
              config={{
                placeholder: "Hãy viết gì đó ...",
                language: "vi",
                toolbar: [
                  "heading",
                  "|",
                  "bold",
                  "italic",
                  "link",
                  "undo",
                  "redo",
                ],
              }}
              data={data}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setDescription(data);
              }}
            />
          ) : (
            <p>Carregando...</p>
          )}
        </div>
        <div className="form-group mb-2">
          <label htmlFor="price">Giá</label>
          <input
            type="number"
            className="form-control"
            id="price"
            placeholder="Giá sản phẩm"
            required
            name="price"
            value={price}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="Curentcolors">Màu hiện tại</label>
          <input
            type="text"
            className="form-control"
            id="Curentcolors"
            placeholder="Nhập mô tả sản phẩm"
            required
            name="Curentcolors"
            value={selectedColors}
            disabled
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="CurrentSizes">Kích cỡ hiện tại</label>
          <input
            type="text"
            className="form-control"
            id="CurrentSizes"
            placeholder="Nhập mô tả sản phẩm"
            required
            name="CurrentSizes"
            value={selectedSizes}
            disabled
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="CurrentMaterials">Chất liệu hiện tại</label>
          <input
            type="text"
            className="form-control"
            id="CurrentMaterials"
            placeholder="Nhập mô tả sản phẩm"
            required
            name="CurrentMaterials"
            value={selectedMaterials}
            disabled
          />
        </div>
        <div style={{ display: "flex" }}>
          <div className="form-group" style={{ marginTop: "12px" }}>
            <label htmlFor="sex">Màu</label>
            {colors.map((color,index) => (
              <div key={index}>
                <input
                  name="color"
                  type="radio"
                  onChange={handleSelectColor(color)}
                />
                <label style={{ marginLeft: "8px" }}>{color}</label>
              </div>
            ))}
          </div>
          <div
            className="form-group"
            style={{ marginTop: "12px", marginLeft: "12px" }}
          >
            <label htmlFor="size">Kích cỡ</label>
            {sizes.map((size,index) => (
              <div key={index}>
                <input
                  name="size"
                  type="radio"
                  onChange={handleSelectSize(size)}
                />
                <label style={{ marginLeft: "8px" }}>{size}</label>
              </div>
            ))}
          </div>
          <div
            className="form-group"
            style={{ marginTop: "12px", marginLeft: "12px" }}
          >
            <label htmlFor="material">Chất liệu</label>
            {materials.map((material,index) => (
              <div key={index}>
                <input
                  name="material"
                  type="radio"
                  onChange={handleSelectMaterial(material)}
                />
                <label style={{ marginLeft: "8px" }}>{material}</label>
              </div>
            ))}
          </div>
          <div
            className="form-group"
            style={{ marginTop: "12px", marginLeft: "12px" }}
          >
            <label htmlFor="material">Áo</label>
            {shirtTypes.map((shirt, index) => (
              <div key={index}>
                <input
                  name="type"
                  type="radio"
                  onClick={handleSelectType(shirt)}
                />
                <label style={{ marginLeft: "8px" }}>{shirt}</label>
              </div>
            ))}
          </div>
          <div
            className="form-group"
            style={{ marginTop: "12px", marginLeft: "12px" }}
          >
            <label htmlFor="material">Quần</label>
            {shortsTypes.map((short, index) => (
              <div key={index}>
                <input
                  name="type"
                  type="radio"
                  onClick={handleSelectType(short)}
                />
                <label style={{ marginLeft: "8px" }}>{short}</label>
              </div>
            ))}
          </div>
        </div>

        <div className="form-group">
          <label htmlFor="age">Độ tuổi</label>
          <select
            className="form-control"
            id="age"
            required
            name="age"
            value={age}
            onChange={handleChange()}
          >
            <option>Người lớn</option>
            <option>Trẻ em</option>
          </select>
        </div>
        <div className="form-group mb-2">
          <label htmlFor="enteringQuantity">Số lượng nhập kho</label>
          <input
            type="number"
            className="form-control"
            id="enteringQuantity"
            placeholder="Số lượng nhập kho"
            required
            name="enteringQuantity"
            value={enteringQuantity}
            onChange={handleChange()}
          />
        </div>
        <div className="form-group mb-2">
          <label htmlFor="soldQuantity">Số lượng đã bán</label>
          <input
            type="number"
            className="form-control"
            id="soldQuantity"
            placeholder="Số lượng nhập kho"
            required
            name="soldQuantity"
            value={soldQuantity}
            onChange={handleChange()}
          />
        </div>
        <hr />
        <button type="submit" className="btn btn-primary">
          Cập nhật sản phẩm
        </button>
      </form>
    </div>
  );
}
export default Form;

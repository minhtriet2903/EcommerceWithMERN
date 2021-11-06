import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom";
import styled from "styled-components";
import axios from "axios";
import { useRouter } from "next/router";

const Modal = ({ show, onClose, children, title, item }) => {
  const editorRef = useRef();
  const [isBrowser, setIsBrowser] = useState(false);
  const [shippers, setShippers] = useState([]);
  const [reason, setReason] = useState("");
  const { CKEditor, ClassicEditor } = editorRef.current || {};
  const [editorLoaded, setEditorLoaded] = useState(false);

  useEffect(() => {
    setIsBrowser(true);
    editorRef.current = {
      CKEditor: require("@ckeditor/ckeditor5-react").CKEditor, //Added .CKEditor
      ClassicEditor: require("@ckeditor/ckeditor5-build-classic"),
    };
    setEditorLoaded(true);
  }, []);

  const handleCloseClick = (e) => {
    e.preventDefault();
    onClose();
  };
  const cancelBillMessage=(biu)=>{
    var re="Đơn hàng ngày: ";
    for(let i=0; i<biu.BillDate.length; i++){
      if(biu.BillDate[i]>='A'&&biu.BillDate[i]<='Z'){
        break;
      }
      re+=biu.BillDate[i];
    }
    re+='\n';
    re+="Lý do hủy: "+reason;
    return re;
  };
  const cancelAndSend = () => {
    if(item.userId !== "NoLogin"){
      axios
        .put("http://localhost:5035/bills/" + item._id, {
          Status: "Đã hủy đơn",
        })
        .then((res) => {
          console.log(res.data);
          axios
            .get("http://localhost:5035/users/"+item.userId)
            .then((res) => {
              console.log(res);
              axios
                .post("http://localhost:5035/users",{
                  email: res.data.email,
                  subject: "Thông báo hủy đơn hàng",
                  htmlContent: cancelBillMessage(item)
                })
                .then((res) => {

                })
                .catch((err) => {
                  console.log(err);
                });
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          console.log(err);
        });
    }else{
    axios
      .put("http://localhost:5035/bills/" + item._id, {
        Status: "Đã hủy đơn",
      })
      .then((res) => {      
            axios
              .post("http://localhost:5035/users",{
                email: item.userEmail,
                subject: "Thông báo hủy đơn hàng",
                htmlContent: cancelBillMessage(item)
              })             
              .catch((err) => {
                console.log(err);
              });
          })
          .catch((err) => {
            console.log(err);
          });
     
     
    }
  };

  const modalContent = show ? (
    <StyledModalOverlay>
      <StyledModal>
        <StyledModalHeader>
          <a href="#" onClick={handleCloseClick}>
            x
          </a>
        </StyledModalHeader>
        {title }
        <StyledModalBody>
          <h2>
            Hủy đơn hàng id = {item._id} tại khu vực: {item.Province}
          </h2>
          <h4>Lý do hủy đơn</h4>
          {editorLoaded ? (
            <CKEditor
              className="form-control"
              editor={ClassicEditor}
              config={{
                placeholder: "Lý do hủy đơn hàng ...",
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
              data={reason}
              onReady={(editor) => {
                // You can store the "editor" and use when it is needed.
              }}
              onChange={(event, editor) => {
                const data = editor.getData();
                setReason(data);
              }}
            />
          ) : (
            <p>Carregando...</p>
          )}

          <button style={{ marginTop: "8px" }} onClick={cancelAndSend}>
            Gửi email đến người đặt
          </button>
        </StyledModalBody>
      </StyledModal>
    </StyledModalOverlay>
  ) : null;

  if (isBrowser) {
    return ReactDOM.createPortal(
      modalContent,
      document.getElementById("modal-root")
    );
  } else {
    return null;
  }
};

const StyledModalBody = styled.div`
  padding-top: 10px;
`;

const StyledModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
  font-size: 25px;
`;

const StyledModal = styled.div`
  background: white;
  width: 500px;
  height: 600px;
  border-radius: 15px;
  padding: 15px;
`;
const StyledModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

export default Modal;

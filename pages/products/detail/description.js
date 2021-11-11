import React, { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import cookieCutter from 'cookie-cutter';
import * as Message from "./../../constant/messages";

import * as Config from "./../../constant/config";
import { SwipeableDrawer } from "@material-ui/core";
import { route } from "next/dist/server/router";
import router from "next/router";
const Description = (props) => {
    const router = useRouter();
    const { detail } = props;
    const editorRef = useRef()
    const [commentAll, setCommentAll] = useState([]);
    const [user, setUser] = useState(null);
    const [editorLoaded, setEditorLoaded] = useState(false)
    const { CKEditor, ClassicEditor } = editorRef.current || {}
    const [data, setData] = useState('');
    useEffect(() => {
        editorRef.current = {
            CKEditor: require('@ckeditor/ckeditor5-react').CKEditor, //Added .CKEditor
            ClassicEditor: require('@ckeditor/ckeditor5-build-classic'),
        }
        setEditorLoaded(true)
        
    }, []);
    useEffect(() =>{
        setCommentAll(detail.Comments)
    },[detail])
    useEffect(() => {
        const Acc = cookieCutter.get("Acc")
        if (Acc) {
          const fetchUser = async () => {
            const res31 = await fetch("http://localhost:5035/users/" + Acc);
            const data = await res31.json();
            setUser(data.name);
          }
          fetchUser();

        }
        
      }, [router])
    const [comment, setComment] = useState('');
    var today = new Date(), datee = today.getDate() + '-' + (today.getMonth() + 1) + '-' + today.getFullYear() + " " + today.getHours()+ ':'+today.getMinutes();
        
    var ShowComment = detail.Comments ? detail.Comments.map((item, index) => {
         var content =  item.text;
        return (
            <li key={index}>
                <span className="img_user_cm"><img src="https://ln.hako.re/img/noava.png" alt="https://ln.hako.re/img/noava.png" /></span>
                <div className="detail_cm_body">
                    <h4>{item.userId}</h4>
                    <div className="cm_content" dangerouslySetInnerHTML={{ __html: content}} >                                
                    </div>
                    <time dateTime={item.date}>{item.date}</time>
                </div>
            </li>
        )
    }) : '';
    const handlePostCM = async (id) => {
        const response = await fetch(Config.API_URL + `/${id}` + '/comments', {
            method: 'POST',
            body: JSON.stringify({
                commentId: detail.Comments.length > 0 ? Number(detail.Comments[detail.Comments.length - 1].commentId) + 1 : 1,
                date: datee,
                text: comment,
                userId: user
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        })
        const data = await response.json()      
      /*   Router.reload(window.location.pathname); */
      setComment('');
      router.push(router.asPath)
    }
    
    return (
        <>
            <div className="product-detail">
                <div className="product-detail-content">
                    <div className="describe-para-body">
                        <div className="comment-detail">
                            <h3>Bình luận {detail.Comments ? '('+detail.Comments.length+')' : ''}</h3>
                            <div className={user !== null ? "wr-comment" : "wr-comment comment_hide"}>
                                {user ? '' :  <span className="warning_cm">Cần đăng nhập để sử dụng chức năng này</span>}
                               
                                {/*  <textarea placeholder="Thêm bình luận ..." className="wr-comment-field" onChange={(e) => { setComment(e.target.value) }} /> */}
                                {editorLoaded ? <CKEditor
                                     className="wr-comment-field" 
                                   
                                    editor={ClassicEditor}
                                    config={{
                                        placeholder: 'Hãy viết gì đó ...',
                                        language: 'vi',                                      
                                        toolbar: ['heading','|', 'bold', 'italic', 'link', 'undo', 'redo'],                                                                          
                                          }                                                                      
                                    }
                                    data={data}
                                    onReady={editor => {
                                        // You can store the "editor" and use when it is needed.
                                                                             
                                    }}                                   
                                    onChange={(event, editor) => {
                                       
                                        const data = editor.getData()
                                        setComment(data);                                      
                                    }}
                                /> : <p>Carregando...</p>
                                }
                                <div className="btn_cm_body">
                                     <button type="submit" className="wr-comment-btn" onClick={() => { handlePostCM(detail._id) }}  >Đăng bình luận</button>
                                </div>
                           
                            </div>
                            <div className="line_prevent">
                                <p></p>
                            </div>
                            <div className="comment-detail-title">
                                <ul>
                                    {user ? ShowComment : ''}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
export default Description;
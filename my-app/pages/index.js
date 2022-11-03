import Head from 'next/head'
import Image from 'next/image'
import {useEffect, useState} from "react"
import { render } from 'react-dom';
const axios = require("axios");
const cheerio = require("cheerio");
const {ethers, providers} = require("ethers");
import styles from '../styles/Home.module.css'
let MAX_COUNT=5;

export default function Home() {
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [lines, setLines]=useState(0);
  const [show, setShow] = useState(false);
  const[selectedFiles,setSelectedFiles] = useState([]);
  const [uploadedFiles, SetUploadedFiles] =useState([]);
  const [fileLimit, setFileLimit] = useState(false);


  const handleFileEvent = (e)=>{
    const arr = [];
    let count=0;
    let files = e.target.files;
    for(let i=0; i<files.length; i++){
      let reader = new FileReader();
      reader.readAsText(files[i]);
      reader.onload = (e)=>{
        let file = e.target.result;
        for(let j=0; j<file.length; j++){
          if(file[j]=='\n'){
            count+=1;
          }
        }
        setLines(count);
      }
    }
  }
  //for the url i am calculating lines from the pragma solidity statement
  useEffect(()=>{
    axios.get(url).then((response)=>{
      let $ = cheerio.load(response.data);
      const page = response.data;
      let t;
      let f=0;
      for(let i=0; i<page.length-6; i++){
          if(f==0){
              if(page.substr(i,6)=='pragma'){
                  t=i;
                  f=1;
              }
          }else {
              if(page.substr(i, 6)=='</pre>'){
                  f=i;
                  break;
              }
          }
          
      }
      let lines_loc=0;
      const code = (page.substr(t, f-t));
      //console.log(page.substr(t, f-t));
      //let lines=0;
      for(let i=0; i<code.length;  i++){
          if(code[i]=='\n'){
              lines_loc+=1;
          }
      }
      setLines(lines_loc);
      
  }).catch((err)=>{
      console.log(err)
  })
  },[url])
  useEffect(()=>{
    let lines_local=0;
    uploadedFiles.forEach((file)=>{
      for(let i=0; i<file.length; i++){
        if(file[i]=='\n'){
          lines_local+=1;
        }
      }
    })
    setLines(lines_local);
      
  }, [uploadedFiles])

  function render(){
    if(!show){
      return (
      <div>
        <div className={styles.fir}>
        <input id='fileUpload' type='file' multiple 
          onChange={handleFileEvent}
          disabled={fileLimit}
        />
        <label htmlFor='fileUpload'>
        <a  className={`btn btn-primary ${!fileLimit ? '' : 'disabled' } `}>Upload Files</a>
        </label>

        <div className="uploaded-files-list">
          {uploadedFiles.map((idx, key) => (
              <p key={key}>{idx.name}</p>
          ))} 
        </div>
        </div>
          <br></br>
        <div className={styles.second}>
        Upload url!
        <hr></hr>
          <input  type="text" onChange={(e)=>{
          setUrl(e.target.value)
        }}></input>
        </div>
      <br></br>
      <div className={styles.txt}>
      Upload Code!
      <hr></hr>
        <textarea onChange={(e)=>{
          setFile(e.target.value);
        }}/>
      </div>
        
        <br/>
        <br/>
        <div>
          <button className={styles.btn} onClick={()=>{
        setShow(true)
      }}>Click to Caclulate number of lines</button>
        </div>
        </div>      
      
  )}else{
    return (
      <div>
        {lines} Number of lines are there
      </div>
    )
  }}
  return (
    <div>
      <Head>
      <title>File upload</title>
      </Head>
      <div className={styles.main}>
      {render()}
      </div>
    </div>
    
  )
}

import Head from 'next/head'
import Image from 'next/image'
import {useEffect, useState} from "react"
import { render } from 'react-dom';
const axios = require("axios");
const cheerio = require("cheerio");
const {ethers, providers} = require("ethers");
import styles from '../styles/Home.module.css'

export default function Home() {
  const [file, setFile] = useState("");
  const [url, setUrl] = useState("");
  const [lines, setLines]=useState(0);
  const [show, setShow] = useState(false);
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
    if(file){
      let lines_local=0;
      for(let i=0; i<file.length; i++){
        if(file[i]=='\n'){
          lines_local+=1;
        }
      }
      setLines(lines_local);
    }
  }, [file])
  function render(){
    if(!show){
      return (
        <div>
        <div className={styles.fir}>
        <div className={styles.first}>
           Upload File! 
        </div>
          
        <hr></hr>
          <input className={styles.btn} type="file" name="file" onChange={(e)=>{
            let files = e.target.files;
            let reader = new FileReader();
            reader.readAsText(files[0]);
            reader.onload = (e)=>{
              const file = (e.target.result);
              setFile(file);
            }
          }}/>
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

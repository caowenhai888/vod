import React, { KeyboardEvent, useEffect, useState } from 'react';
import Head from "next/head";
import { LoadingOutlined,SmileOutlined } from '@ant-design/icons';
import { Spin } from 'antd';


import { Inter } from "next/font/google";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
    const [ search, setSearch] = useState('')
    const [ list, setList] = useState<any[]>([])
    const [ loadin, setloading] = useState<any>(false)
    const [qid, setQid] = useState<any>({})
    useEffect(() => {
        if(search !== '') return
        setQid({})
        setloading(true)
        fetch(`api/project/search?keywords=`).then(async res => {
            const {code, data } = await res.json() as any
            setList(data)
        }).finally(() => {
            setloading(false)
        })
    } , [search])

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };
    const handleKeyDown = async (event: KeyboardEvent<HTMLInputElement>)=> {
    
        if (event.key === 'Enter') {
            setQid({})
            setloading(true)
            fetch(`api/project/search?keywords=${search}`).then(async res => {
                const {code, data } = await res.json() as any
                setList(data)
            }).finally(() => {
                setloading(false)
            })
        }
    }
    const reFn = () => {
        setSearch('')
        setQid({})
    }
    
    return (
    <>
        <Head>
        <title>search</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
        <main>
        <div className="index-header">
            <section>
                <h1>Hello,</h1>
                <h2>What can we do to help?</h2>
            </section>
            <div className="search">
                <input placeholder="search" value={search}  onChange={handleInputChange} onKeyDown={ handleKeyDown} />
               { search === '' && <i className="icon-search"  onClick={ () => reFn()}></i>} 
                { search !== '' && <i className="icon-close" onClick={ () => reFn()}></i>}
            </div>
        </div>
        <div style={{height:"1rem"}}></div>
        {
            !qid.id && 
            <div>
                {loadin &&  <div style={{textAlign:"center"}}><Spin indicator={<LoadingOutlined style={{ fontSize: ".24rem", color:"#ae71f5" }} spin />} /></div>}
                { list .length === 0&&  <div className='no-data'>
                    <span>No results found for“</span>
                    <span style={{ color:"#ae71f5"}}>{search}</span>
                    <span>”</span>
                </div>}
                {!loadin && list.map((item, index) => (
                    <div key={index} className="question-list" >
                        <h3>{item.title}</h3>
                        <ul>
                        {item.list.map((question, index) => {
                            const searchRegex = new RegExp(search, 'gi'); // 'gi
                            const highlightedTitle = question.title.replaceAll(
                                searchRegex,
                                matched => `<span style="background-color: #ae71f5;">${matched}</span>`
                            );

                            return (
                                <li onClick={() => setQid(question)} key={index} dangerouslySetInnerHTML={{ __html: highlightedTitle }}></li>
                            );
                        })}
                        </ul>
                    </div>
                ))}
            </div>
        }
        {
            qid.id  &&
            <div className='q-box'>
                <div className='q-title'> {qid.title}</div>
                <div className='q-content'>
                    {qid.content}
                </div>
            </div>
        }
       
    
        </main>

    </>
    );
}

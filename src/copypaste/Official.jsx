import { Card, Space, Row, Col } from 'antd';
import React, { useState, useEffect } from 'react';
import E from 'wangeditor'
import * as service from './service/copypaste';
import { Button } from 'antd';

let editor = null
function Offical() {

    const [content, setContent] = useState('')
    const [saveContent] = useState('');
    const [preview, setPreview] = useState(false);
    const [list, setList] = useState([]);

    useEffect(() => {
        let a = " &nbsp; <br/>&nbsp; <br/>";
        let b = a.replaceAll("&nbsp;", "").replaceAll("<br/>", "").replaceAll(" ", '')
        console.log("a: ", a);
        console.log("b: ", b);
        console.log(a.length);
        console.log(b.length);

        editor = new E("#div1")

        editor.config.onchange = (newHtml) => {
            setContent(newHtml)
        }
        /**一定要创建 */
        editor.create()
        editor.$textElem.css('text-align', 'left');

        service.getAll().then(res => {
            console.log("getall res: ", res.data);
            setList(res.data);
        })

        return () => {
            editor.destroy()
        }
    }, [])

    // 获取html方法1
    function getHtml() {
        alert(content)
    }

    // 获取text
    function getText() {
        alert(editor.txt.text())
    }

    return (
        <div>
            <div id="div1"></div>

            <button onClick={getHtml}>获取html</button>
            <button onClick={getText}>获取text</button>
            <button onClick={() => { setPreview(!preview) }}>{preview ? '取消预览' : '预览'}</button>
            <div dangerouslySetInnerHTML={{ __html: content }} style={{ textAlign: 'left', display: preview ? 'block' : 'none' }} ></div>


            <div />
            <Space>
                <Button
                    type='primary'
                    onClick={async () => {
                        setPreview(false);
                        await service.addContent({text: content});
                        service.getAll().then(res => {
                            console.log("getall res: ", res.data);
                            setList(res.data);
                        })
                    }}>保存</Button>
            </Space>
            <div dangerouslySetInnerHTML={{ __html: saveContent }} style={{ textAlign: 'left' }}></div>
            <Row gutter={16}>
                {
                    list.map((value, index) => {
                        return (
                            <Col xs={24} sm={24} md={12} lg={8}  key={value.id}>
                                <Card title={<h2>{value.updatedTime}</h2>}>
                                    <div dangerouslySetInnerHTML={{ __html: value.text }} style={{ textAlign: 'left' }} ></div>
                                </Card>
                            </Col>

                        )
                    }).sort((a, b) => {
                        return b.key - a.key;
                    })
                }
            </Row>
        </div>

    );
}

export default Offical;
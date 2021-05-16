import React from 'react';
import { Descriptions, Button, message } from 'antd';
import { addCart } from "../../services/userService";


export class BookDetail extends React.Component{

    addToCart = () => {
        const data = this.props.info;
        const user = JSON.parse(localStorage.getItem("user"));
        if (user != null) {
            let json = {
                userId: user.userId,
                bookId: data.id,
                bookNumber: 1
            };
            console.log(json);
            const callback = (data) => {
                if(data.status >= 0) {
                    message.success(data.msg);
                } else {
                    message.error(data.msg);
                }
            }
            addCart(json, callback);
        } else {
            message.error("请登录")
        }
    }

    render() {
        const {info} = this.props;
        if(info == null){
            return null;
        }
        return (
            <div className={"content"}>
                <div className={"book-detail"}>
                    <div className={"book-image"}><img alt="image" src={info.image} style={{width:"250px", height:"350px"}}/></div>
                    <div className={"descriptions"}>
                        <Descriptions>
                            <Descriptions.Item className={"title"} span={3}>{info.name}</Descriptions.Item>
                            <Descriptions.Item label={"作者"} span={3}>{info.author}</Descriptions.Item>
                            <Descriptions.Item label={"分类"} span={3}>{info.type}</Descriptions.Item>
                            <Descriptions.Item label={"定价"} span={3}>{<span className={"price"}>{'¥' + (info.price)/100}</span>}</Descriptions.Item>
                            <Descriptions.Item label={"状态 "} span={3}>{info.inventory !== 0? <span>有货 <span className={"inventory"}>库存{info.inventory}件</span></span> : <span className={"status"}>无货</span>}</Descriptions.Item>
                            <Descriptions.Item label={"作品简介"} span={3} >{info.description}</Descriptions.Item>
                        </Descriptions>
                    </div>
                </div>
                <div className={"button-groups"}>
                    <Button type="danger" icon="shopping-cart" size={"large"} onClick={this.addToCart}>
                        加入购物车
                    </Button>
                    <Button type="danger" icon="pay-circle" size={"large"} style={{marginLeft:"15%"}}ghost>
                        立即购买
                    </Button>
                </div>
            </div>
        )
    }
}

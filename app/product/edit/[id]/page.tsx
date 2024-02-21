'use client';
import axios from "axios";

import React, { useEffect, useState, useRef } from "react";

import { IonPage, IonContent, IonItem, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonInput } from "@ionic/react";
import { useParams } from "next/navigation";

export default function page() {

    const {id} = useParams();
    const [product, setProduct] = useState<any>(null);

    const nameRef = useRef<HTMLIonInputElement>(null);
    const buyPriceRef = useRef<HTMLIonInputElement>(null);
    const sellPriceRef = useRef<HTMLIonInputElement>(null);


    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async() => {
        await axios.get('/product/api/'+id).then((res)=>{
            console.log("Product Data", res.data[0]);
            setProduct(res.data[0]);
        })
        // try {
        //     const res = await axios.get('/product/api/'+id);
        //     console.log("Product Data", res.data[0]);
        //     setProduct(res.data[0]);
        // } catch (error) {
        //     console.error("Error fetching products:", error);
        //     // Handle error: show a message, retry, or set a default value for products
        // }
    };

    const handleSave = async()=>{
        const formData = new FormData();
        formData.append('name', nameRef.current?.value?.toString() || "" );
        formData.append('buyPrice', buyPriceRef.current?.value?.toString() || "" );
        formData.append('sellPrice', sellPriceRef.current?.value?.toString() || "" );
        formData.append('id', id.toString());

        await axios.patch("/product/api", formData).then((res)=>{
            console.log("Update Response", res.data);
            if(res.data.status != "error"){
                window.location.href="/product";
            }else{
                alert(res.data.error);
            }
        })
    }

    return (
        <div>
            <IonPage>
                <IonHeader>
                    <IonToolbar>
                        <IonTitle>Edit Product</IonTitle>
                        <IonButtons slot="end">
                            <IonButton onClick={()=>handleSave()}>Save</IonButton>
                        </IonButtons>
                    </IonToolbar>
                </IonHeader>
                <IonContent>
                    <IonItem>
                        <IonInput 
                            value={product?.Name}
                            type="text"
                            label="Name"
                            labelPlacement="fixed"
                            placeholder="Name"
                            ref={nameRef}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput 
                            value={product?.BuyPrice}
                            type="number"
                            label="Buy Price"
                            labelPlacement="floating"
                            placeholder="Buy Price"
                            ref={buyPriceRef}
                        />
                    </IonItem>
                    <IonItem>
                        <IonInput 
                            value={product?.SellPrice}
                            type="number"
                            label="Sell Price"
                            labelPlacement="stacked"
                            placeholder="Sell Price"
                            ref={sellPriceRef}
                        />
                    </IonItem>
                </IonContent>
            </IonPage>
        </div>
    )

}
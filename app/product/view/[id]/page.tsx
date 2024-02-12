'use client';
import axios from "axios";
import React, { useEffect, useState } from "react";

import { IonPage, IonContent, IonItem, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonCard, IonCardContent } from "@ionic/react";
import { useParams } from "next/navigation";

export default function page() {

    const {id} = useParams();
    const [product, setProduct] = useState<any>(null);

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async() => {
        try {
            const res = await axios.get('/product/api/'+id);
            console.log("Product Data", res.data[0]);
            setProduct(res.data[0]);
        } catch (error) {
            console.error("Error fetching products:", error);
            // Handle error: show a message, retry, or set a default value for products
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Product View</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent className="ion-padding">
                <h1>{product?.Name}</h1>
                <p>Buy Price : {product?.BuyPrice}</p>
                <p>Sell Price : {product?.SellPrice}</p>

                <IonItem lines="none">
                    <h2>{product?.Name}</h2>
                </IonItem>
                <IonCard>
                    <IonCardContent>
                        <p>Buy Price : {product?.BuyPrice}</p>
                        <p>Sell Price : {product?.SellPrice}</p>
                    </IonCardContent>
                </IonCard>
            </IonContent>
        </IonPage>
    );

}
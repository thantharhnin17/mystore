'use client';
import axios from "axios";
import React, { useEffect, useState } from "react";

import { IonPage, IonContent, IonItem, IonHeader, IonToolbar, IonTitle } from "@ionic/react";

export default function ProductPage() {

    const [products, setProducts] = useState<any>([]);

    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async() => {
        try {
            const response = await axios.get('/product/api');
            console.log("Product Data", response.data);
            setProducts(response.data);
        } catch (error) {
            console.error("Error fetching products:", error);
            // Handle error: show a message, retry, or set a default value for products
        }
    };

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    <IonTitle>Product List</IonTitle>
                </IonToolbar>
            </IonHeader>
            <IonContent>
                {products.map((item: any, index: number) => (
                    <IonItem key={index}>
                        {item?.Name}
                    </IonItem>
                ))}
            </IonContent>
        </IonPage>
    );

}
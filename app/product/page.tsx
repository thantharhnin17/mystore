'use client';
import axios from "axios";
import React, { useEffect, useState } from "react";

import { IonPage, IonContent, IonItem, IonHeader, IonToolbar, IonTitle, IonButtons, IonButton } from "@ionic/react";

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

    const handleDelete = async(item:any)=>{
        await axios.delete('/product/api/'+item?.Id).then((res)=>{
            console.log("Delete Response", res.data);
            getProducts();
        })
    };

    const handleView = (item:any)=>{
        window.location.href = "/product/view/"+item?.Id;
    }

    const handleEdit = (item:any)=>{
        window.location.href = "/product/edit/"+item?.Id;
    }

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
                        <IonButtons slot = "end">
                            {/* start ka left end ka right */}

                            <IonButton onClick={()=>handleView(item)} fill="outline">View</IonButton>
                            <IonButton onClick={()=>handleEdit(item)} fill="outline">Edit</IonButton>
                            <IonButton color="danger" onClick={()=>handleDelete(item)}>Delete</IonButton>
                        </IonButtons>
                    </IonItem>
                ))}
            </IonContent>
        </IonPage>
    );

}
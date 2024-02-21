import { query } from "@/app/db";
import { NextResponse } from "next/server";

export async function GET(req:any) {
    const sql = "SELECT * FROM Products ORDER BY Id DESC";
    const result = await query(sql, "");

    try{
        return NextResponse.json(result);
    }
    catch(error){
        return NextResponse.json(error);
    }
}


export async function POST(req:NextResponse) {
    const data = await req.formData();

    const sql = `
                INSERT INTO Products
                (
                    Name,
                    BuyPrice,
                    SellPrice
                )
                VALUES(?,?,?)
                `;
    
    const values = [
        data.get("name" || ""),
        data.get("buyPrice" || ""),
        data.get("sellPrice" || ""),
    ];

    try{
        //Execute the SQL query
        await query(sql, values);

        return NextResponse.json({
            status: "success",
            message: "Successfully created",
        });
    }catch(error){
        console.error("Errpr:", error);
        return NextResponse.json({
            status: "error",
            message: "Error processing creation",
            error,
        });
    }
}

export async function PATCH(req:NextResponse) {
    const data = await req.formData();

    const sql = `
                UPDATE Products
                SET    
                    Name = ?,
                    BuyPrice = ?,
                    SellPrice = ?
                WHERE Id = ?
                `;
    
    const values = [
        data.get("name" || ""),
        data.get("buyPrice" || ""),
        data.get("sellPrice" || ""),
        data.get("id" || ""),
    ];

    try{
        //Execute the SQL query
        await query(sql, values);

        return NextResponse.json({
            status: "success",
            message: "Successfully updated",
        });
    }catch(error){
        console.error("Errpr:", error);
        return NextResponse.json({
            status: "error",
            message: "Error processing update",
            error,
        });
    }
}
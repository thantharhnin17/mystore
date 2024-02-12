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
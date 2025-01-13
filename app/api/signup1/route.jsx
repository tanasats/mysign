import mysql from  'mysql2/promise';
import {NextResponse,NextRequest} from "next/server";
import { mysqlPool } from "@/lib/db";

let connectionParams = {
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'sudjing',
    database: 'nextjs-auth'
    }

    // export async function GET(request) {
    //     try {
    //       // 2. connect to database   
    //       const connection = await mysql.createConnection(connectionParams)      
    //       // 3. create a query to fetch data      
    //       let get_exp_query = ''     
    //       get_exp_query = 'SELECT * FROM users'      
    //       // we can use this array to pass parameters to the SQL query      
    //       let values = []      
    //       // 4. exec the query and retrieve the results  
    //       const [results] = await connection.execute(get_exp_query, values)      
    //       // 5. close the connection when done      
    //       connection.end()     
    //       // return the results as a JSON API response      
    //       return NextResponse.json(results)

    //     } catch (err) {
    //       console.log('ERROR: API - ', err.message)      
    //       const response = {
    //         error: err.message,      
    //         returnedStatus: 200,
    //       }      
    //       return NextResponse.json(response, { status: 200 })
    //     }
    //   }

export async function GET(res) {
    const promisePool = mysqlPool.promise()
    const values = [2]
    const [rows, fields] = await promisePool.query(
      `SELECT * FROM users WHERE id=?;`,
      values
    )
    return NextResponse.json(rows)
}




export async function POST(req) {
    console.log(req);
    try{
        const reqbody = await req.json();
        if (!reqbody.password || !reqbody.email) throw new Error("xxxxx");
        console.log("reqbody",reqbody);
        //const keys = Object.keys(reqbody);
        //const values = Object.values(reqbody);
        const promisePool = mysqlPool.promise()
        const [rows, fields] = await promisePool.query(
          `INSERT INTO users SET ?`,
          [reqbody]
        )
        return NextResponse.json(rows)

    } catch(error){
        return NextResponse.json({
            status: "error",
            data: error.message
        })
    }

}
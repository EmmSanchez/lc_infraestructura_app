import { NextResponse } from "next/server";
import sql from "mssql";

type EnvConfig = {
  user: string;
  password: string;
  server: string;
  database: string;
};

function getConfig(): EnvConfig {
  const user = process.env.AZURE_SQL_USER;
  const password = process.env.AZURE_SQL_PASSWORD;
  const server = process.env.AZURE_SQL_SERVER;
  const database = process.env.AZURE_SQL_DATABASE;
  if (!user || !password || !server || !database) {
    throw new Error("Missing Azure SQL environment variables. Set AZURE_SQL_USER, AZURE_SQL_PASSWORD, AZURE_SQL_SERVER and AZURE_SQL_DATABASE");
  }
  return { user, password, server, database };
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    // log incoming body for debugging in dev
    console.log("/api/v1/contratos POST body:", body);
    const idContrato = body?.idContrato;
    if (!idContrato) {
      return new NextResponse(JSON.stringify({ error: "idContrato required" }), { status: 400 });
    }

    const cfg = getConfig();

    const pool = await sql.connect({
      user: cfg.user,
      password: cfg.password,
      server: cfg.server,
      database: cfg.database,
      options: {
        encrypt: true,
        enableArithAbort: true,
      },
      // you can add connectionTimeout, requestTimeout here if needed
    });

    const request = pool.request();
    request.input("id", sql.Int, Number(idContrato));
    const result = await request.query(
      `SELECT ImporteIVA, TotalContrato, contratoNombreCliente, fechaContratoCliente FROM dbo.Contratos WHERE idContrato = @id`
    );

    await pool.close();

    if (!result.recordset || result.recordset.length === 0) {
      return new NextResponse(JSON.stringify({ error: "Not found" }), { status: 404 });
    }

    // return first row
    return NextResponse.json(result.recordset[0]);
  } catch (err: any) {
    // log error server-side to see stack in terminal where `pnpm dev` runs
    console.error("/api/v1/contratos error:", err);
    return new NextResponse(JSON.stringify({ error: err?.message || String(err) }), { status: 500 });
  }
}

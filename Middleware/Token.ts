import { Request, Response } from "../types/Request";
import { Token } from "../security/token";

export async function TokenMiddleWare(
  req: Request,
  res: Response,
  next: () => void
) {
  if (req.body == null)
    return res.send({
      error: true,
      code: 500,
      message: "Please Add data to the request body",
    });

  if (req.path == "/v1/CreateToken") return next();

  if (req.body.token == null)
    return res.send({
      error: true,
      code: 401,
      message: "Please Add a token to the request body",
    });

  const token = req.body.token;

  const tokenInfo = await Token.Check(token);
    
  console.log(tokenInfo)

  if (tokenInfo.allow) return next();

  return res.send({
    error: true,
    code: 200,
    message: tokenInfo.message,
  });
}

import { Injectable, NestMiddleware } from '@nestjs/common';
import { Response, NextFunction } from 'express';
import { RequestToken } from 'src/common/interface';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { token } from 'src/utils';
import {member} from '@prisma/client'
@Injectable()
export class TokenAuthenMiddleware implements NestMiddleware {

  constructor(private prisma: PrismaService){}

  async use(req: RequestToken, res: Response, next: NextFunction) {
    try {
      const tokenCode = (req.headers?.token ? String(req.headers?.token) : req.params.token) || null;
      if(!tokenCode) return res.status(413).json({
        message: "Xác thực thất bại!"
      })
      
      let tokenData = token.decodeToken(tokenCode)

      req.tokenData = tokenData;

      let member = await this.prisma.member.findUnique({
        where: {
          id: (tokenData as member).id
        }
      })

      if(!member) throw false

      if(member.updateTime != (tokenData as member).updateTime) throw false

      next();
    }catch(err) {
      return res.status(413).json({
        message: "Xác thực thất bại!"
      })
    }
  }
}

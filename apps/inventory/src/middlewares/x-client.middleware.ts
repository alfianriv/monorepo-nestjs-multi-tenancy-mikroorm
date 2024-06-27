import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import axios from 'axios';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class XclientMiddleware implements NestMiddleware {
  async use(req: Request, res: Response, next: NextFunction) {
    const xClient = req.headers['x-client'];
    if (!xClient) {
      throw new UnauthorizedException();
    }
    const resp = await axios.get(
      `${process.env.IDENTITY_URL}/users/${xClient}`,
    );
    if (resp.status !== 200) {
      throw new UnauthorizedException();
    }
    next();
  }
}

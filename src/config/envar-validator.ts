import { Injectable, OnModuleInit } from '@nestjs/common';
import { cleanEnv, str, port } from 'envalid';

@Injectable()
export class EnvarValidator implements OnModuleInit {
  onModuleInit() {
    cleanEnv(process.env, {
      PORT: port(),
      NODE_ENV: str(),
      NODE_NAME: str(),
    });
  }
}

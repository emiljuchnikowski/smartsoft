import { Injectable } from "@nestjs/common";

@Injectable()
export class SharedConfig {
  tokenConfig?: {
    secretOrPrivateKey: string;
    expiredIn: number;
  };
  permissions?: {
    create?: Array<string>;
    read?: Array<string>;
    update?: Array<string>;
    delete?: Array<string>;
    [key: string]: Array<string>;
  };
}

export type PermissionType = "create" | "read" | "update" | "delete" | string;

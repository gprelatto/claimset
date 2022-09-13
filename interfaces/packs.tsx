import { Json } from "@thirdweb-dev/sdk";
import { ethers } from "ethers";

export interface Packs {
    id: number;
    description: string;
    price: number;
    throws: number;
    image: string;
    createdat: Date | null;
  }

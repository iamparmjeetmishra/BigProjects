import { hc } from "hono/client";

import { AppType } from "@/app/api/[[...route]]/route";
import { MAIN_URL } from "./constants";


export const client = hc<AppType>(MAIN_URL!);
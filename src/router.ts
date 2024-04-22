import { Express} from "express";
import {handlerRoot} from "./handler";

export function Router(app: Express ) {
    app.get("/", handlerRoot);
    app.get("/me", handlerRoot);
}

import { InjectionToken } from "@angular/core";
import { ApiConfig } from "../interfaces/appconfig.interface";

export const APP_SERVICE_CONFIG = new InjectionToken('app.config');

export const APP_CONFIG: ApiConfig = {
    baseUrl: "http://localhost:3000/"
}
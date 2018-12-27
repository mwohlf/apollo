import {ApplicationProperties, ConfigControllerService} from "../../generated";
import {Injectable} from "@angular/core";


export function initProperties(propertiesProvider: PropertiesProvider): () => Promise<boolean> {
    return () => propertiesProvider.init();
}


@Injectable()
export class PropertiesProvider {

    public static BASE_PATH: string  = ' ';

    private applicationProperties: ApplicationProperties = null;


    constructor(private configControllerService: ConfigControllerService) {
        console.info("<PropertiesProvider>");
    }

    public getApplicationProperties(): ApplicationProperties {
        return this.applicationProperties;
    }

    public init(): Promise<boolean> {
        console.info("<init> start...");
        return new Promise<boolean>((resolve) => {
            this.configControllerService.getApplicationProperties().subscribe(
                (applicationProperties: ApplicationProperties) => {
                    this.applicationProperties = applicationProperties;
                    console.info("<init> ...success ", this.applicationProperties);
                    resolve(true);
                },
                (fail: any) => {
                    console.info("<init> ...fail using backup config location", this.applicationProperties);
                    this.applicationProperties = {
                        streamSse: "/api/stream-sse"
                    };
                    resolve(true);
                });
        });
    }

}

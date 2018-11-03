import {ApplicationProperties, ConfigControllerService} from "../../generated";
import {Injectable} from "@angular/core";


export function initConfig(applicationPropertiesProvider: ApplicationPropertiesProvider): () => Promise<boolean> {
    return () => applicationPropertiesProvider.load();
}


@Injectable()
export class ApplicationPropertiesProvider {

    public static BASE_PATH: string  = ' ';

    private applicationProperties: ApplicationProperties = null;


    constructor(private configControllerService: ConfigControllerService) {
        console.info("<ApplicationPropertiesProvider>");
    }

    public getApplicationProperties(): ApplicationProperties {
        return this.applicationProperties;
    }

    public load(): Promise<boolean> {
        console.info("<load> init...");
        return new Promise<boolean>((resolve) => {
            this.configControllerService.configUsingGET().subscribe(
                (applicationProperties: ApplicationProperties) => {
                    this.applicationProperties = applicationProperties;
                    console.info("<load> success ", this.applicationProperties);
                    resolve(true);
                },
                (fail: any) => {
                    console.info("<load> fail ", this.applicationProperties);
                    resolve(false);
                });
        });
    }

}

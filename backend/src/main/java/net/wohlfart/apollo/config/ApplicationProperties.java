package net.wohlfart.apollo.config;

import io.swagger.annotations.ApiModel;
import lombok.Builder;
import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
@Builder
@ApiModel
public class ApplicationProperties {

    @NotNull
    String streamSse;

}

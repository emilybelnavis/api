import tracer from 'dd-trace';
import Constants from '@utils/Constants';

tracer.init({
    enabled: true,
    analytics: true,
    service: "samantharachelb-api",
    version: Constants.version
})

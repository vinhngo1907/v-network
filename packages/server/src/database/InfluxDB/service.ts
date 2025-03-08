import { Injectable } from '@nestjs/common';
import { InfluxDB, Point, WriteApi } from '@influxdata/influxdb-client';
import { AppConfigService } from 'src/config/service';
import { AppLoggerService } from 'src/common/logger/service';

@Injectable()
export class InfluxDBService {
    private influxDB: InfluxDB;
    private writeApi: WriteApi;
    private logger: AppLoggerService;

    constructor(private readonly appConfig: AppConfigService) {
        this.logger = new AppLoggerService(InfluxDBService.name);
    }

    private connectInfluxDB(): void {
        if (!this.influxDB) {
            this.influxDB = new InfluxDB({
                url: this.appConfig.influxConfig.url,
                token: this.appConfig.influxConfig.token,
            });

            this.writeApi = this.influxDB.getWriteApi(this.appConfig.influxConfig.org, this.appConfig.influxConfig.bucket);
            
            this.logger.log("InfluxDB connected");
        }
    }

    async writeData(measurement: string, fields: Record<string, any>): Promise<void> {
        this.connectInfluxDB();
        if (!this.writeApi) {
            this.logger.error("Write API is not available");
            return;
        }

        const point = new Point(measurement);
        for (const [key, value] of Object.entries(fields)) {
            point.stringField(key, value.toString());
        }

        await this.writeApi.writePoint(point);
    }

    async close(): Promise<void> {
        if (this.writeApi) {
            this.writeApi.close();
            this.logger.log("InfluxDB connection closed");
        }
    }
}

import { Injectable } from '@nestjs/common';
import * as request from 'request';
import { PowerBIReport } from 'src/entities/powerBIReports.entity';

@Injectable()
export class PowerBIReportService {

    async generateAccessToken(): Promise<any> {
        let formBody = [];
        let url = process.env.requestUrl.replace('tenant_id', process.env.tenantId);
        let rowData = {
            client_id: process.env.clientId,
            scope: process.env.scope,
            client_secret: process.env.clientSecret,
            username: process.env.userName,
            password: process.env.password,
            grant_type: process.env.grantType
        }

        for (let row in rowData) {
            let key = encodeURIComponent(row);
            let value = encodeURIComponent(rowData[row]);
            formBody.push(key + '=' + value);
        }
        let body = formBody.join('&');

        return new Promise(function (resolve, reject) {
            request(
                {
                    url: url,
                    method: 'POST',
                    shouldKeepAlive: false,
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                        'Access-Control-Allow-Origin': '*'
                    },
                    body: body,
                },
                function (error, res, data) {
                    resolve(JSON.parse(data));
                }
            );
        });
    }

    async generateEmbedToken(powerBIReport: PowerBIReport): Promise<any> {
        let url = process.env.embedUrl.replace('group_id', powerBIReport.groupId)
            .replace('report_id', powerBIReport.reportId);
        let rowData = {
            accessLevel: powerBIReport.accessLevel,
            allowSaveAs: powerBIReport.allowSaveAs
        }
        
        return new Promise(function (resolve, reject) {
            request(
                {
                    url: url,
                    method: 'POST',
                    shouldKeepAlive: false,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": `Bearer ${powerBIReport.accessToken}`,
                    },
                    body: JSON.stringify(rowData),
                },
                function (error, res, data) {
                    resolve(JSON.parse(data));
                }
            );
        });
    }
}

import { Injectable } from '@nestjs/common';
import * as request from 'request';
import { PowerBIReport } from 'src/entities/powerBIReports.entity';

@Injectable()
export class PowerBIReportService {

    async generateAccessToken(): Promise<any> {
        let formBody = [];
        let url = 'https://login.microsoftonline.com/369e99eb-38f4-4e0a-8786-2bf9cb835962/oauth2/v2.0/token'; //process.env.requestUrl.replace('tenant_id', process.env.tenantId);
        let rowData = {
            client_id: 'c48407f2-19b3-421c-afeb-e6a9b271e9af', //process.env.clientId,
            scope: 'https://analysis.windows.net/powerbi/api/.default', //process.env.scope,
            client_secret: 'LDO8Q~Hn5bxhUbPoGdg9ZA9q4QAEStrk8JRNjaLc', //process.env.clientSecret,
            username: 'ovatio@longarc.com', //process.env.userName,
            password: 'L0ng4rc2022!', //process.env.password,
            grant_type: 'client_credentials', //process.env.grantType
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
        let url = 'https://api.powerbi.com/v1.0/myorg/groups/group_id/reports/report_id/GenerateToken'.replace('group_id', powerBIReport.groupId).replace('report_id', powerBIReport.reportId); //process.env.embedUrl.replace('group_id', powerBIReport.groupId).replace('report_id', powerBIReport.reportId);
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

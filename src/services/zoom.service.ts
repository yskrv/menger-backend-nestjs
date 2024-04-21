import { HttpService } from "@nestjs/axios";
import { Injectable } from "@nestjs/common";
import { firstValueFrom } from "rxjs";

const { ZOOM_ACCOUNT_ID, ZOOM_CLIENT_ID, ZOOM_CLIENT_SECRET } = process.env;

@Injectable()
export class ZoomService {
  private readonly clientId: string;
  private readonly clientSecret: string;
  private readonly authUrl: string;
  private readonly apiUrl: string;

  constructor(private httpService: HttpService) {
    this.clientId = ZOOM_CLIENT_ID;
    this.clientSecret = ZOOM_CLIENT_SECRET;
    this.authUrl = "https://zoom.us/oauth/token";
    this.apiUrl = "https://api.zoom.us/v2";
  }

  async createMeeting(topic: string, startTime: string) {
    try {
      const authResponse = await firstValueFrom(
        this.httpService.post(
          `${this.authUrl}?grant_type=account_credentials&account_id=${ZOOM_ACCOUNT_ID}`,
          null,
          {
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            auth: {
              username: this.clientId,
              password: this.clientSecret,
            },
          },
        ),
      );

      if (authResponse.status !== 200) {
        console.log("Unable to get access token");
        return;
      }

      const accessToken = authResponse.data.access_token;

      const meetingRequestBody = {
        topic,
        duration: 30,
        start_time: startTime,
        type: 2,
      };

      const meetingRequestHeaders = {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      };

      const meetingResponse = await firstValueFrom(
        this.httpService.post(
          `${this.apiUrl}/users/me/meetings`,
          meetingRequestBody,
          meetingRequestHeaders,
        ),
      );

      if (meetingResponse.status !== 201) {
        console.log("Unable to generate meeting link");
        return;
      }

      return {
        joinUrl: meetingResponse.data.join_url,
        startUrl: meetingResponse.data.start_url,
        password: meetingResponse.data.password,
        meetingTime: meetingResponse.data.start_time,
        purpose: meetingResponse.data.topic,
        duration: meetingResponse.data.duration,
        message: "Success",
        status: 1,
      };
    } catch (error) {
      console.error(error);
    }
  }
}

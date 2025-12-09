import axios, { AxiosResponse } from "axios";
import { BASE_URL } from "../constants/constants";
import { getTokens } from "../util/token";
import { uriToFile } from "../util/utils";

export interface RegisterUserRequest {
  phoneNumber: string;
  // Add other fields if needed
}

export interface VerifyOtpRequest {
  phoneNumber: string;
  code: string;
}

export interface AuthResponse {
  accessToken: string;
  refreshToken: string;
  user:any
  // Add other fields if needed
}

export interface UserDTO {
  id: string;
  name: string;
  email?: string;
  // Add other user fields as needed
}

export interface UserWithPlayerResponse {
  user: UserDTO;
  playerDetails: any; // Replace `any` with proper type if known
}

class UserService {
  // Register user and send OTP
  async register(request: RegisterUserRequest): Promise<Record<string, any>> {
    const response: AxiosResponse<Record<string, any>> = await axios.post(
      `${BASE_URL}/user/register`,
      request
    );
    return response.data;
  }

  // Verify OTP and login
  async verifyOtp(request: VerifyOtpRequest): Promise<AuthResponse> {
    const response: AxiosResponse<AuthResponse> = await axios.post(
      `${BASE_URL}/user/verify-otp`,
      request
    );
    return response.data;
  }

  // Upload screenshots and create player profile
  async uploadScreenshots(
    basicInfoFile: string,
    statInfoFile: string
  ): Promise<UserDTO> {
    const formData = new FormData();
    formData.append("basicInfo", uriToFile(basicInfoFile,"basic_info.jpg") as any);
    formData.append("statInfo", uriToFile(statInfoFile,"stat_info.jpg") as any);

    const response: AxiosResponse<UserDTO> = await axios.post(
      `${BASE_URL}/user/upload-screenshots`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${(await getTokens()).accessToken}`,
        },
      }
    );

    return response.data;
  }

  // Get user profile
  async getUserProfile(): Promise<UserDTO> {
    const response: AxiosResponse<UserDTO> = await axios.get(
      `${BASE_URL}/user/get-profile`,
      {
        headers: { Authorization: `Bearer ${(await getTokens()).accessToken}` },
      }
    );
    return response.data;
  }

  // Get user with player details
  async getUserWithPlayer(): Promise<UserWithPlayerResponse> {
    const response: AxiosResponse<UserWithPlayerResponse> = await axios.get(
      `${BASE_URL}/user/with-player`,
      {
        headers: { Authorization: `Bearer ${(await getTokens()).accessToken}` },
      }
    );
    return response.data;
  }

  // Health check
  async health(): Promise<{ status: string }> {
    const response: AxiosResponse<{ status: string }> = await axios.get(
      `${BASE_URL}/user/health`
    );
    return response.data;
  }
}

export default new UserService();

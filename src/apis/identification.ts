// 여기 정리 바람
import {
  IdentifyConfirmOTPPostBody,
  IdentitySendOTPPostBody,
  IdentitySendOTPResponse,
  IPAddressGetResponse,
} from '@/types/identification'
import axios, { AxiosInstance } from 'axios'
const BASE = 'https://identification-2e6bwvkpzq-du.a.run.app'
const API_REQUEST_URL = 'https://api.ipify.org?format=json'
// TODO: 나중에 수정해야함
const SECRET_KEY = 'secret_tempkey_need'
// const DANAL_IDENTITY_EXPIRE_TIME = 7 * 60 * 1000
const IDENTITY_VERIFICATION_KEY = '__SAGO_LINK_IDENTITY_SESSION_KEY__'

const API_IDENTIFICATION_PATH = {
  send_otp: '/send_otp',
  confirm_otp: '/confirm_otp',
  resend_otp: '/resend_otp',
} as const

export const IdentificationMessage = {
  TimeOut: '제한 시간을 초과했습니다.',
  FailAuth: '본인 인증에 실패했어요',
  OTPFail: '인증번호 확인 후 다시 입력해주세요',
  SessionError: '세션이 만료되었습니다.',
  UnknownError: '알 수 없는 오류입니다.',
} as const

class APIIdentification {
  private axiosInstance: AxiosInstance
  constructor() {
    this.axiosInstance = axios.create({
      baseURL: BASE,
      headers: {
        Authorization: SECRET_KEY,
      },
    })
  }

  public getKakaoIdentify() {
    // TODO: 지금은 임시로 고정 아이디와 랜덤 시간을 이용하여 생성
    const now = new Date()
    const minutes = now.getMinutes()
    const seconds = now.getSeconds()

    const randomSeed = minutes * seconds
    const randomNumber = (randomSeed * Math.random()).toFixed()
    return 'd02645f3-32ee-4818-a83a-6696b02944f2' + randomNumber
  }
  public setIdentityVerificationId() {
    const kakaoId = this.getKakaoIdentify()

    sessionStorage.setItem(IDENTITY_VERIFICATION_KEY, kakaoId)
  }
  public getIdentityVerificationId() {
    const dataString = sessionStorage.getItem(IDENTITY_VERIFICATION_KEY)
    return dataString
  }
  public async getIP() {
    // 만일 다른 장소에서도 많이쓰인다면 따로 주소를 빼는 것을 고려
    try {
      const response = await axios.get<IPAddressGetResponse>(API_REQUEST_URL)
      return response.data
    } catch (e) {
      throw new Error('ip 주소를 얻는데 실패하였습니다.')
    }
  }
  public async sendOtp(requestData: IdentitySendOTPPostBody) {
    const path = API_IDENTIFICATION_PATH.send_otp
    this.setIdentityVerificationId()
    const identityVerificationId = this.getIdentityVerificationId()
    if (!identityVerificationId)
      throw new Error(IdentificationMessage.SessionError)
    try {
      const { ip } = await this.getIP()
      const { data } = await this.axiosInstance.post<IdentitySendOTPResponse>(
        path,
        {
          ipAddress: ip,
          identityVerificationId: identityVerificationId,
          ...requestData,
        }
      )
      return { type: 'success', message: data.message }
    } catch (e) {
      if (!axios.isAxiosError(e))
        throw new Error(IdentificationMessage.UnknownError)
      throw new Error(e.message)
    }
  }

  public async confirmOtp(requestData: IdentifyConfirmOTPPostBody) {
    const path = API_IDENTIFICATION_PATH.confirm_otp

    const identityVerificationId = this.getIdentityVerificationId()
    if (!identityVerificationId)
      throw new Error(IdentificationMessage.SessionError)
    try {
      const { data } = await this.axiosInstance.post(path, {
        identityVerificationId: identityVerificationId,
        ...requestData,
      })
      return { type: 'success', message: data.message }
    } catch (e) {
      console.log(e)
      if (!axios.isAxiosError(e))
        throw new Error(IdentificationMessage.UnknownError)
      if (e.status === 500) throw new Error(IdentificationMessage.OTPFail)
      throw new Error(e.message)
    }
  }
}

export const apiIdentification = new APIIdentification()

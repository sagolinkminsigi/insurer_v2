export interface IPAddressGetResponse {
  ip: string
}
export interface IdentitySendOTPResponse {
  message: string
}
export interface IdentitySendOTPPostBody {
  // identityVerificationId: string
  name: string
  phoneNumber: string
  identityNumber: string
  operator: IdentityVerificationOperator
  method: IdentityVerificationMethod
}
export interface IdentifyConfirmOTPResponse {
  data: VerifiedIdentityVerification
  message: string
}
export interface IdentifyConfirmOTPPostBody {
  // identityVerificationId: string
  otp: string
}

export interface IdentityVerificationSendBody {
  storeId?: string // 상점 아이디 (접근 권한이 있는 상점 아이디만 입력 가능하며, 미입력시 토큰에 담긴 상점 아이디를 사용합니다.)
  channelKey: string // 채널 키
  customer: SendIdentityVerificationBodyCustomer // 본인인증 요청을 위한 고객 정보
  customData?: string // 사용자 지정 데이터
  bypass?: object // PG사별 추가 파라미터 ("PG사별 연동 가이드" 참고)
  operator: IdentityVerificationOperator
  method: IdentityVerificationMethod
}

export interface IdentityVerificationResendBody {
  storeId?: string // 상점 아이디 (접근 권한이 있는 상점 아이디만 입력 가능하며, 미입력시 토큰에 담긴 상점 아이디를 사용합니다.)
}

export interface IdentifyVerificationConfirmBody {
  storeId?: string // 상점 아이디 (접근 권한이 있는 상점 아이디만 입력 가능하며, 미입력시 토큰에 담긴 상점 아이디를 사용합니다.)
  otp: string
}

export type SendIdentityVerificationBodyCustomer = {
  id?: string // 식별 아이디
  name: string // 이름
  phoneNumber: string // 전화번호 (특수 문자(-) 없이 숫자만 입력합니다.)
  identityNumber?: string // 주민등록번호 앞 7자리 (SMS 방식의 경우 필수로 입력합니다.)
  ipAddress: string // IP 주소 (고객의 요청 속도 제한에 사용됩니다. client ip)
}

export type IdentityVerificationVerifiedCustomer = {
  id?: string // 식별 아이디
  name: string // 이름
  operator?: IdentityVerificationOperator // 본인인증 통신사
  phoneNumber?: string // 전화번호 , 특수 문자(-) 없이 숫자로만 이루어진 번호 형식입니다. 다날: 별도 계약이 필요합니다. KG이니시스: 항상 제공합니다.
  birthDate: string // 생년월일 (yyyy-MM-dd) 날짜를 나타내는 문자열로, yyyy-MM-dd 형식을 따릅니다.
  gender?: Gender // 성별
  isForeigner?: boolean // 외국인 여부 다날: 별도 계약이 필요합니다. KG이니시스: 항상 제공합니다.
  ci?: string // CI (개인 고유 식별키) 개인을 식별하기 위한 고유 정보입니다. 다날: 항상 제공합니다. KG이니시스: 카카오를 제외한 인증사에서 제공합니다.
  di?: string // DI (사이트별 개인 고유 식별키) 중복 가입을 방지하기 위해 개인을 식별하는 사이트별 고유 정보입니다. 다날: 항상 제공합니다. KG이니시스: 제공하지 않습니다.
}

// 완료된 본인인증 내역
export type VerifiedIdentityVerification = {
  status: string // 본인인증 상태 ex) "VERIFIED"
  id: string // 본인인증 내역 아이디
  channel?: SelectedChannel // (결제, 본인인증 등에) 선택된 채널 정보
  verifiedCustomer: IdentityVerificationVerifiedCustomer
  customData?: string
  requestedAt: string // (RFC 3339 date-time) 본인인증 요청 시점
  updatedAt: string // (RFC 3339 date-time) 업데이트 시점
  statusChangedAt: string // (RFC 3339 date-time) 상태 업데이트 시점
  verifiedAt: string // (RFC 3339 date-time) 본인인증 완료 시점
  pgTxId: string // 본인인증 내역 PG사 아이디
  pgRawResponse: string // PG사 응답 데이터
}

export type SelectedChannel = {
  type: SelectedChannelType // 채널 타입
  id?: string // 채널 아이디
  key?: string // 채널키
  name?: string // 채널명
  pgProvider: string // PG사 결제 모듈
  pgMerchantId: string // PG사 고객사 식별 아이디
}

export enum SelectedChannelType {
  LIVE = 'LIVE',
  TEST = 'TEST',
}

export enum IdentityVerificationOperator {
  SKT = 'SKT',
  KT = 'KT',
  KT_MVNO = 'KT 알뜰폰',
  LGU_MVNO = 'LGU 알뜰폰',
  SKT_MVNO = 'SKT 알뜰폰',
  LGU = 'LGU',
}

export enum IdentityVerificationMethod {
  SMS = 'SMS',
  APP = 'APP',
}

export enum Gender {
  MALE = '남성',
  FEMALE = '여성',
  OTHER = '그 외 성별',
}

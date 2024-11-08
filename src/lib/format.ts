import { Gender } from '@/types/identification'

export type inputFormatType = 'phone' | 'resident'

const RESIDENT_NUMBER_LENGTH = 10
const PHONE_NUMBER_LENGTH = 13

class Format {
  public date(date: Date) {
    const year = date.getFullYear()
    const month = String(date.getMonth() + 1).padStart(2, '0')
    const day = String(date.getDate()).padStart(2, '0')

    return `${year}년 ${month}월 ${day}일`
  }
  public ratio(n: number) {
    const [tensDigit, unitDigit] = [Math.floor(n / 10), n % 10]
    if (unitDigit >= 8) return (tensDigit + 1) * 10
    if (unitDigit >= 3) return tensDigit * 10 + 5
    return tensDigit * 10
  }
  public onlyGetNumber(str: string) {
    return str.replace(/\D/g, '')
  }
  public residentRegisterNumber(str: string, gender: Gender) {
    const onlyNumber = this.onlyGetNumber(str)

    const genderNumber = gender === Gender.MALE ? 1 : 2
    const generationNumber = Number(onlyNumber.slice(0, 4)) < 2000 ? 0 : 2
    return onlyNumber.slice(2) + (genderNumber + generationNumber)
  }
  public timeMSS(time: number) {
    const totalSeconds = Math.floor(time / 1000)
    const minutes = Math.floor(totalSeconds / 60)
    const seconds = totalSeconds % 60

    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`
  }
  public maskingString(input: string) {
    return input.length > 1 ? input[0] + '*'.repeat(input.length - 1) : input
  }
  public phoneNumber(number: string) {
    return number
      .replace(/\D/g, '')
      .replace(/(\d{3})(\d{1,4})?(\d{1,4})?/, (_, p1, p2, p3) =>
        [p1, p2, p3].filter(Boolean).join('-')
      )
      .slice(0, PHONE_NUMBER_LENGTH)
  }
  public residentNumber(number: string) {
    return number
      .replace(/\D/g, '')
      .replace(/(\d{4})(\d{1,2})?(\d{1,2})?/, (_, p1, p2, p3) =>
        [p1, p2, p3].filter(Boolean).join('/')
      )
      .slice(0, RESIDENT_NUMBER_LENGTH)
  }
  public input(n: string, type?: inputFormatType) {
    switch (type) {
      case 'phone':
        return this.phoneNumber(n)
      case 'resident':
        return this.residentNumber(n)
      default:
        return n
    }
  }
}

export const format = new Format()

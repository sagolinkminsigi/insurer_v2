type InjuryDetail = {
  grade: number;
  description: string;
};

type BodyPartInjuries = {
  [key: string]: InjuryDetail;
};

type InjuriesByBodyPart = {
  headAndNeck: BodyPartInjuries;
  shoulderAndClavicle: BodyPartInjuries;
  lumbarAndRib: BodyPartInjuries;
  armAndElbow: BodyPartInjuries;
  pelvis: BodyPartInjuries;
  handAndWrist: BodyPartInjuries;
  legAndKnee: BodyPartInjuries;
  footAndAnkle: BodyPartInjuries;
};

type InjuryMapping = {
  style: string;
  name: string;
  bodyPart: keyof InjuriesByBodyPart;
};

export const injuriesbyBodyPart: InjuriesByBodyPart = {
  headAndNeck: {
    cervicalSprain: { grade: 12, description: "경추(목뼈) 염좌(통증)" },
    concussion: { grade: 11, description: "뇌진탕" },
    herniatedDisc: { grade: 12, description: "디스크(추간판 탈출증)" },
    cerebralHemorrhage: { grade: 6, description: "뇌출혈" },
    dentalInjury: { grade: 14, description: "치아" },
    otherInjury: { grade: 14, description: "기타 손상" },
    otherFracture: { grade: 7, description: "기타 골절" },
  },
  shoulderAndClavicle: {
    contusion: { grade: 14, description: "타박상" },
    otherPain: { grade: 12, description: "기타 통증" },
    clavicleFracture: { grade: 7, description: "쇄골 골절" },
    shoulderFracture: { grade: 7, description: "어깨 골절" },
    otherFracture: { grade: 7, description: "기타 골절" },
  },
  lumbarAndRib: {
    lumbarSprain: { grade: 12, description: "요추(허리뼈) 염좌" },
    contusion: { grade: 14, description: "타박상" },
    herniatedDisc: { grade: 12, description: "디스크(추간판 탈출증)" },
    lumbarFracture: { grade: 2, description: "요추 골절" },
    otherFracture: { grade: 7, description: "기타 골절" },
  },
  armAndElbow: {
    contusion: { grade: 14, description: "타박상" },
    otherPain: { grade: 12, description: "기타 통증" },
    armFracture: { grade: 8, description: "팔 골절" },
    elbowFracture: { grade: 5, description: "팔꿈치 골절" },
    otherFracture: { grade: 7, description: "기타 골절" },
  },
  pelvis: {
    contusion: { grade: 14, description: "타박상" },
    otherPain: { grade: 12, description: "기타 통증" },
    pelvicFracture: { grade: 4, description: "골반(골반골) 골절" },
    hipFracture: { grade: 8, description: "엉덩이뼈(미골) 골절" },
    otherFracture: { grade: 8, description: "기타 골절" },
  },
  handAndWrist: {
    contusion: { grade: 14, description: "타박상" },
    otherPain: { grade: 12, description: "기타 통증" },
    fingerFracture: { grade: 8, description: "손가락(수족지골) 골절" },
    wristFracture: { grade: 7, description: "손목(수근골) 골절" },
    backHandFracture: { grade: 8, description: "손등(중수골) 골절" },
    otherFracture: { grade: 8, description: "기타 골절" },
  },
  legAndKnee: {
    contusion: { grade: 13, description: "타박상" },
    otherPain: { grade: 12, description: "기타 통증" },
    ligamentTear: { grade: 5, description: "십자인대 파열" },
    kneeFracture: { grade: 4, description: "무릎(슬관절) 골절" },
    shinFracture: { grade: 7, description: "정강이(비골 골절) 골절" },
    thighFracture: { grade: 3, description: "허벅지(대퇴부) 골절" },
    otherFracture: { grade: 5, description: "기타 골절" },
  },
  footAndAnkle: {
    contusion: { grade: 14, description: "타박상" },
    otherPain: { grade: 12, description: "기타 통증" },
    toeFracture: { grade: 8, description: "발가락 골절" },
    footFracture: { grade: 5, description: "발등(중족골) 골절" },
    ankleFracture: { grade: 5, description: "발목(족근골) 골절" },
    otherFracture: { grade: 8, description: "기타 골절" },
  },
} as const;

export const injuriesMapping: InjuryMapping[] = [
  {
    style: 'top-[1%] left-[44%]',
    name: '머리, 목',
    bodyPart: 'headAndNeck'
  },
  {
    style: 'top-[20%] left-[55%]',
    name: '어깨, 쇄골',
    bodyPart: 'shoulderAndClavicle'
  },
  {
    style: 'top-[30%] left-[60%]',
    name: '허리, 갈비',
    bodyPart: 'lumbarAndRib'
  },
  {
    style: 'top-[45%] left-[10%]',
    name: '팔, 팔꿈치',
    bodyPart: 'armAndElbow'
  },
  {
    style: 'top-[42%] left-[44%]',
    name: '손, 손목',
    bodyPart: 'handAndWrist'
  },
  {
    style: 'top-[55%] left-[55%]',
    name: '골반',
    bodyPart: 'pelvis'
  },
  {
    style: 'top-[70%] left-[44%]',
    name: '다리, 무릎',
    bodyPart: 'legAndKnee'
  },
  {
    style: 'top-[89%] left-[55%]',
    name: '발, 발목',
    bodyPart: 'footAndAnkle'
  },
]
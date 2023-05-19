export interface FilterEntity {
  remoteWork: boolean|string,
  inOffice: boolean|string,
  employmentContract: boolean|string,
  b2b: boolean|string,
  mandateContract: boolean|string,
  workContract: boolean|string,
  min: string|number,
  max: string|number,
  canTakeApprenticeship: boolean|null|string,
  monthsOfCommercialExp: string|null,
  courseCompletion: string|number,
  courseEngagement: string|number,
  projectDegree: string|number,
  teamProjectDegree: string|number,
  page: string|number,
  rowsPerPage : string|number,
  hrId?:string,
}